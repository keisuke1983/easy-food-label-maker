// ── クラウド同期モジュール (Supabase REST API) ─────────────────────────
//
// ■ セットアップ手順:
//   1. https://supabase.com でプロジェクトを作成
//   2. SQL Editor で以下を実行:
//
//      CREATE TABLE IF NOT EXISTS products (
//        id          TEXT PRIMARY KEY,
//        name        TEXT,
//        updated_at  TEXT,
//        data        TEXT NOT NULL
//      );
//
//   3. Settings > API から「Project URL」と「anon public」キーをコピー
//   4. FoodPilot の 設定 > クラウド同期 に貼り付けて保存
//
// ■ 依存: safeGet, safeSet, products, cloudSyncStatus, cloudSyncLastAt,
//         cloudSyncMessage, render (すべてグローバル)

let _cloudSyncTimer = null;

// ── 認証情報 ──────────────────────────────────────────────────────────
function getSupabaseCfg() {
  return {
    url: (safeGet("fmcc-supabase-url") || "").trim(),
    key: (safeGet("fmcc-supabase-key") || "").trim(),
  };
}

function isCloudEnabled() {
  const { url, key } = getSupabaseCfg();
  return !!(url && key);
}

function sanitizeSupabaseUrl(url) {
  // trailing slash を除去、https:// がなければ付加
  let u = url.replace(/\/+$/, "");
  if (u && !u.startsWith("http")) u = "https://" + u;
  return u;
}

// ── topbar インジケーター更新 ──────────────────────────────────────────
function updateCloudSyncIndicator() {
  const btn = document.getElementById("cloud-sync-topbar-btn");
  if (!btn) return;
  const state = {
    idle:    { icon: "☁",  color: "#94a3b8", tip: "クラウド未接続" },
    syncing: { icon: "↻",  color: "#2563eb", tip: "同期中..." },
    success: { icon: "☁",  color: "#16a34a", tip: `最終同期: ${cloudSyncLastAt}` },
    error:   { icon: "⚠",  color: "#ef4444", tip: `同期エラー: ${cloudSyncMessage}` },
  };
  const s = state[cloudSyncStatus] || state.idle;
  btn.textContent = s.icon;
  btn.style.color  = s.color;
  btn.title = s.tip;
  btn.classList.toggle("cloud-spinning", cloudSyncStatus === "syncing");
}

// ── 自動同期スケジューラー ────────────────────────────────────────────
function scheduleCloudSync() {
  if (!isCloudEnabled()) return;
  clearTimeout(_cloudSyncTimer);
  _cloudSyncTimer = setTimeout(() => supabaseAutoSync(), 3000);
}

// ── バックグラウンド自動同期 ──────────────────────────────────────────
async function supabaseAutoSync() {
  if (!isCloudEnabled()) return;
  const raw = getSupabaseCfg();
  const url = sanitizeSupabaseUrl(raw.url);
  const key = raw.key;
  console.log("[FoodPilot CloudSync] url=", url, "key=", key.slice(0, 20) + "...");

  cloudSyncStatus = "syncing";
  updateCloudSyncIndicator();

  try {
    // STEP 1: 現在の商品を全件 upsert
    if (products.length > 0) {
      const payload = products.map(p => ({
        id:         p.id,
        name:       p.name || "",
        updated_at: p.updatedAt || "",
        data:       JSON.stringify(p),
      }));
      const res = await fetch(`${url}/rest/v1/products`, {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          "apikey":        key,
          "Authorization": "Bearer " + key,
          "Prefer":        "resolution=merge-duplicates",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    }

    // STEP 2: ローカルで削除された商品をクラウドからも削除
    const deletedIds = JSON.parse(safeGet("fmcc-cloud-deleted-ids") || "[]");
    if (deletedIds.length > 0) {
      const idList = deletedIds.join(",");
      const delRes = await fetch(`${url}/rest/v1/products?id=in.(${idList})`, {
        method: "DELETE",
        headers: { "apikey": key, "Authorization": "Bearer " + key },
      });
      if (delRes.ok) safeSet("fmcc-cloud-deleted-ids", "[]");
    }

    cloudSyncStatus  = "success";
    cloudSyncLastAt  = new Date().toLocaleString("ja-JP");
    cloudSyncMessage = "";
    safeSet("fmcc-last-sync", cloudSyncLastAt);
  } catch (e) {
    cloudSyncStatus  = "error";
    cloudSyncMessage = e.message;
    console.error("[FoodPilot CloudSync]", e);
  }

  updateCloudSyncIndicator();
}

// ── 手動プッシュ（設定画面ボタン） ────────────────────────────────────
async function supabasePush() {
  if (!isCloudEnabled()) {
    showStatus("設定画面でSupabase URL・APIキーを登録してください");
    return;
  }
  await supabaseAutoSync();
  if (cloudSyncStatus === "success") {
    showStatus(`☁ クラウドに保存しました（${products.length}件）`);
  } else {
    showStatus("クラウド保存に失敗: " + cloudSyncMessage);
  }
}

// ── 手動プル（設定画面ボタン） ────────────────────────────────────────
async function supabasePull() {
  const raw = getSupabaseCfg();
  const url = sanitizeSupabaseUrl(raw.url);
  const key = raw.key;
  if (!url || !key) {
    showStatus("設定画面でSupabase URL・APIキーを登録してください");
    return;
  }
  try {
    cloudSyncStatus = "syncing";
    updateCloudSyncIndicator();
    const res = await fetch(`${url}/rest/v1/products?select=data&order=updated_at.desc`, {
      headers: { "apikey": key, "Authorization": "Bearer " + key },
    });
    if (!res.ok) throw new Error(await res.text());
    const rows = await res.json();
    if (!rows.length) { showStatus("クラウドにデータがありません"); return; }
    const pulled = rows.map(r => { try { return JSON.parse(r.data); } catch { return null; } }).filter(Boolean);
    products = pulled;
    safeSet("food-label-products-static", JSON.stringify(products));
    cloudSyncStatus = "success";
    cloudSyncLastAt = new Date().toLocaleString("ja-JP");
    safeSet("fmcc-last-sync", cloudSyncLastAt);
    updateCloudSyncIndicator();
    showStatus(`☁ クラウドから${products.length}件を復元しました`);
    render();
  } catch (e) {
    cloudSyncStatus  = "error";
    cloudSyncMessage = e.message;
    updateCloudSyncIndicator();
    showStatus("クラウド取得に失敗: " + e.message);
  }
}

// ── 起動時クラウド初期化（マージ同期） ────────────────────────────────
async function initCloudSync() {
  if (!isCloudEnabled()) return;
  const raw = getSupabaseCfg();
  const url = sanitizeSupabaseUrl(raw.url);
  const key = raw.key;

  try {
    const res = await fetch(`${url}/rest/v1/products?select=id,data,updated_at&order=updated_at.desc`, {
      headers: { "apikey": key, "Authorization": "Bearer " + key },
    });
    if (!res.ok) {
      cloudSyncStatus  = "error";
      cloudSyncMessage = `HTTP ${res.status}`;
      updateCloudSyncIndicator();
      return;
    }

    const rows = await res.json();

    // クラウドが空でローカルにデータあり → クラウドに初回プッシュ
    if (!rows.length && products.length > 0) {
      await supabaseAutoSync();
      return;
    }

    if (!rows.length) {
      cloudSyncStatus = "idle";
      updateCloudSyncIndicator();
      return;
    }

    const cloudProducts = rows
      .map(r => { try { return JSON.parse(r.data); } catch { return null; } })
      .filter(Boolean);

    // マージ: 商品IDごとに updatedAt が新しい方を採用
    const mergedMap = new Map(products.map(p => [p.id, p]));
    let hasNewFromCloud = false;
    for (const cp of cloudProducts) {
      const local = mergedMap.get(cp.id);
      if (!local) {
        mergedMap.set(cp.id, cp);
        hasNewFromCloud = true;
      } else if ((cp.updatedAt || "") > (local.updatedAt || "")) {
        mergedMap.set(cp.id, cp);
        hasNewFromCloud = true;
      }
    }

    if (hasNewFromCloud) {
      products = [...mergedMap.values()];
      safeSet("food-label-products-static", JSON.stringify(products));
      render();
    }

    cloudSyncStatus  = "success";
    cloudSyncLastAt  = safeGet("fmcc-last-sync") || new Date().toLocaleString("ja-JP");
    cloudSyncMessage = "";
    updateCloudSyncIndicator();
  } catch (e) {
    cloudSyncStatus  = "error";
    cloudSyncMessage = e.message;
    console.warn("[FoodPilot] initCloudSync failed:", e.message);
    updateCloudSyncIndicator();
  }
}

// ── 削除IDトラッキング ────────────────────────────────────────────────
function trackCloudDelete(productId) {
  if (!isCloudEnabled()) return;
  try {
    const ids = JSON.parse(safeGet("fmcc-cloud-deleted-ids") || "[]");
    if (!ids.includes(productId)) {
      ids.push(productId);
      safeSet("fmcc-cloud-deleted-ids", JSON.stringify(ids));
    }
  } catch {}
}
