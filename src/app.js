/* ── チュートリアル ── */
const TUTORIAL_STEPS = [
  {
    icon: "🎉", color: "#2563eb", bg: "#eff6ff",
    title: "FoodPilotへようこそ",
    desc: "食品メーカー・小規模食品事業者のための商品管理＆食品表示ラベル作成ツールです。このガイドで主な使い方を説明します（約2分）。",
    features: ["食品表示ラベルを自動生成", "AIで法令チェック・表示文作成", "複数商品をクラウドで一元管理"],
    tip: "すでに使い方を知っている場合は「スキップ」してください。",
  },
  {
    icon: "📦", color: "#7c3aed", bg: "#f5f3ff",
    title: "商品を登録する",
    desc: "左メニューの「商品管理」→「＋ 新しい商品を登録」から商品情報を入力します。",
    features: ["商品名・内容量・賞味期限を入力", "原材料と重量(g)を入力すると栄養成分・アレルゲンを自動計算", "製造者・住所など会社情報も登録可能"],
    tip: "原材料の重量(g)を入力すると栄養成分の計算精度が上がります。",
  },
  {
    icon: "🏷", color: "#059669", bg: "#ecfdf5",
    title: "食品表示ラベルを確認・印刷",
    desc: "「ラベル作成」画面を開くと、入力内容がリアルタイムにラベルに反映されます。",
    features: ["食品表示基準に準拠したレイアウト", "40×50mm〜カスタムサイズまで対応", "印刷・PDFダウンロード・ラベル業者入稿"],
    tip: "ラベル画面の「拡大」ボタンで細部まで確認できます。印刷前に必ず確認を。",
  },
  {
    icon: "🤖", color: "#d97706", bg: "#fffbeb",
    title: "AIで表示内容をチェック",
    desc: "商品詳細の「AIチェック」ボタンで、食品表示法の必須項目を自動確認できます。",
    features: ["名称・原材料・賞味期限などの抜けを指摘", "アレルゲン自動検出（要目視確認）", "AI説明文・商品規格書・相談チャットも利用可能"],
    tip: "AIの指摘はあくまで補助です。最終確認は必ず担当者が行ってください。",
  },
  {
    icon: "👥", color: "#0891b2", bg: "#ecfeff",
    title: "チームで確認・承認",
    desc: "「チーム・承認」でメンバーを登録すると、商品ごとに確認依頼・承認ができます。",
    features: ["管理者・編集者・確認者の役割設定", "確認依頼 → 承認 → 公開のワークフロー", "差し戻し・コメント機能"],
    tip: "ダッシュボードの「承認待ち」カードから一覧確認できます。",
  },
  {
    icon: "☁", color: "#2563eb", bg: "#eff6ff",
    title: "クラウドでデータを保存・共有",
    desc: "「設定」→「クラウド接続の設定」を行うと、別のパソコン・スマホからも同じデータにアクセスできます。",
    features: ["保存のたびに自動でクラウドに同期", "別端末・スタッフとのデータ共有", "無料クラウドサービスで利用可能"],
    tip: "クラウド接続は任意です。ローカル保存だけでも全機能使えます。",
  },
  {
    icon: "📊", color: "#16a34a", bg: "#f0fdf4",
    title: "ダッシュボードで全体を管理",
    desc: "ダッシュボードでは全商品の状況をひと目で確認できます。これで準備完了です！",
    features: ["完成度・賞味期限切れ・承認待ちを一覧表示", "優先タスクをAIが自動提案", "在庫・原価・売上のKPI管理"],
    tip: "困ったときは設定画面の「使い方ガイドをもう一度見る」からいつでも確認できます。",
  },
];

function tutorialHtml() {
  if (!showTutorial) return "";
  const s = TUTORIAL_STEPS[tutorialStep];
  const total = TUTORIAL_STEPS.length;
  const isLast = tutorialStep === total - 1;
  const pct = Math.round((tutorialStep / (total - 1)) * 100);
  return `<div class="tutorial-overlay">
    <div class="tutorial-card">
      <div class="tutorial-progress-bar"><div class="tutorial-progress-fill" style="width:${pct}%"></div></div>
      <div class="tutorial-header">
        <div class="tutorial-icon-wrap" style="background:${s.bg}">
          <span class="tutorial-icon">${s.icon}</span>
        </div>
        <span class="tutorial-counter">${tutorialStep + 1} / ${total}</span>
      </div>
      <h2 class="tutorial-title" style="color:${s.color}">${escapeHtml(s.title)}</h2>
      <p class="tutorial-desc">${escapeHtml(s.desc)}</p>
      <ul class="tutorial-features">
        ${s.features.map(f => `<li><span class="tutorial-check" style="color:${s.color}">✓</span>${escapeHtml(f)}</li>`).join("")}
      </ul>
      <div class="tutorial-tip">💡 ${escapeHtml(s.tip)}</div>
      <div class="tutorial-actions">
        <button class="tutorial-skip" data-tutorial="skip">スキップ</button>
        <div class="tutorial-nav">
          ${tutorialStep > 0 ? `<button class="action" data-tutorial="prev">← 戻る</button>` : ""}
          ${isLast
            ? `<button class="action primary" data-tutorial="done" style="background:${s.color}">使い始める ✓</button>`
            : `<button class="action primary" data-tutorial="next" style="background:${s.color}">次へ →</button>`
          }
        </div>
      </div>
      <div class="tutorial-dots">
        ${TUTORIAL_STEPS.map((_, i) => `<span class="tutorial-dot${i === tutorialStep ? " active" : i < tutorialStep ? " done" : ""}"></span>`).join("")}
      </div>
    </div>
  </div>`;
}
/* ── AI相談 ── */
function buildAiPrompt(p, d) {
  const checks = labelChecklist(p, d);
  const issues = checks.filter((c) => !c.ok).map((c) => `・${c.label}`).join("\n");
  return `【食品表示ラベルのチェックをお願いします】

■ 商品情報
名称：${p.name || "未入力"}
内容量：${p.volume || "未入力"}
賞味期限：${p.bestBefore || "未入力"}
保存方法：${d.storage || "未入力"}

■ 原材料名
${d.ingLabel || "未入力"}

■ 栄養成分表示（100g当たり）
エネルギー：${d.nutrition.kcal}kcal
たんぱく質：${d.nutrition.protein}g
脂質：${d.nutrition.fat}g
炭水化物：${d.nutrition.carbs}g
食塩相当量：${d.nutrition.salt}g

■ アレルゲン
${d.allergens.join("・") || "なし"}

■ 製造者
${[p.manufacturerName, p.manufacturerAddress].filter(Boolean).join(" / ") || "未入力"}

■ 現在の未入力・要確認項目
${issues || "特になし（すべて入力済み）"}`.trim();
}
function aiPanelHtml(p, d) {
  const EXAMPLES = [
    "この表示内容で不足している項目はありますか？",
    "アレルゲン表示に注意点はありますか？",
    "原材料表示を食品表示法に沿って整えてください",
  ];
  const prompt = buildAiPrompt(p, d);
  return `<div class="ai-panel-overlay" data-action="close-ai-panel">
    <div class="ai-panel-card" onclick="event.stopPropagation()">
      <div class="ai-panel-head">
        <h2>AIに相談</h2>
        <button class="ai-close-btn" data-action="close-ai-panel">✕</button>
      </div>
      <p class="ai-panel-desc">下のプロンプトをコピーして ChatGPT・Claude などのAIに貼り付けてください。</p>
      <div class="ai-examples">
        <p class="ai-examples-label">相談例（クリックで追記）</p>
        ${EXAMPLES.map((e) => `<button class="ai-example-btn" data-ai-example="${escapeHtml(e)}">${escapeHtml(e)}</button>`).join("")}
      </div>
      <div class="ai-prompt-area">
        <textarea class="ai-prompt-textarea" id="ai-prompt-text" readonly>${escapeHtml(prompt)}</textarea>
        <button class="action primary ai-copy-btn" data-action="copy-ai-prompt">📋 プロンプトをコピー</button>
      </div>
    </div>
  </div>`;
}
/* ── 画像ダウンロード ── */
async function downloadImageLabel() {
  try {
    showStatus("画像を生成中です...");
    const p = currentProduct();
    const d = derive(p);
    const scale = 12, pxPerMm = 4;
    const margin = Math.max(8, Number(printCfg.margin || 3) * pxPerMm);
    const contentW = Math.max(260, Number(printCfg.w || 90) * pxPerMm);
    const fs = Math.max(12, Number(printCfg.fs || 7.5) * 1.8);
    const FONT = `"Meiryo","Yu Gothic","MS Gothic",sans-serif`;
    const canvas = document.createElement("canvas");
    const roughRows = imageCopyRows(p, d).length + (printTarget !== "label" ? 8 : 0);
    canvas.width = Math.ceil((contentW + margin * 2) * scale);
    canvas.height = Math.ceil((Math.max(180, roughRows * 42 + margin * 2 + 80)) * scale);
    await document.fonts.ready;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.scale(scale, scale);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
    let y = margin;
    if (printTarget !== "nutrition") {
      y = drawTableImage(ctx, margin, y, contentW, "", imageCopyRows(p, d), fs, FONT);
      const jan = normalizedJan(p.janCode);
      if (canUseJanCode() && jan) { y += 6; y += drawBarcodeOnCanvas(ctx, jan, margin, y, contentW, fs); }
    }
    if (printTarget !== "label") {
      if (printTarget === "both") y += 22;
      y = drawNutritionImage(ctx, margin, y, contentW, d, fs, FONT);
    }
    const finalH = Math.ceil((y + margin) * scale);
    const trimmed = document.createElement("canvas");
    trimmed.width = canvas.width; trimmed.height = finalH;
    const trimCtx = trimmed.getContext("2d");
    trimCtx.imageSmoothingEnabled = false;
    trimCtx.drawImage(canvas, 0, 0);
    const safeName = (p.name || "label").replace(/[\\/:*?"<>|]/g, "_").replace(/\s+/g, "_");
    const date = new Date().toISOString().slice(0, 10);
    const filename = `${safeName}_label_${date}.png`;
    const url = URL.createObjectURL(await canvasToPngBlob(trimmed));
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
    showStatus("画像を保存しました");
  } catch { showStatus("画像保存に失敗しました"); }
}
/* ── チェックリストジャンプ ── */
const CHECKLIST_JUMP_MAP = [
  { match: "名称が未入力", section: "商品情報", field: "[data-field='name']" },
  { match: "内容量が未入力", section: "商品情報", field: "[data-volume-amount]" },
  { match: "賞味期限が未入力", section: "商品情報", field: "[data-date-input]" },
  { match: "保存方法が未入力", section: "保存方法", field: null },
  { match: "原材料名が未入力", section: "原材料", field: "[data-ing-name='0']" },
  { match: "重量が未入力", section: "原材料", field: "[data-ing-weight='0']" },
  { match: "製造者名が未入力", section: "製造者・製造所・加工者", field: "[data-field='manufacturerName']" },
  { match: "製造者住所が未入力", section: "製造者・製造所・加工者", field: "[data-field='manufacturerAddress']" },
  { match: "栄養成分表示を確認", section: "栄養成分表示", field: null },
];
// 詳細ページ（SaaS product-detail）用ジャンプマップ
const DETAIL_JUMP_MAP = {
  "名称":      { tab: "basic",       field: "[data-master-field='name']" },
  "内容量":    { tab: "basic",       field: "[data-master-field='volume']" },
  "賞味期限":  { tab: "basic",       field: "[data-master-field='bestBefore']" },
  "保存方法":  { tab: "basic",       field: "[data-master-field='storage']" },
  "製造者名":  { tab: "basic",       field: "[data-master-field='manufacturerName']" },
  "製造者住所": { tab: "basic",      field: "[data-master-field='manufacturerAddress']" },
  "原材料名":  { tab: "ingredients", field: "[data-master-ing-name='0']" },
};

// チェックタブ "修正する →" ジャンプマップ（checkFoodLabel の field 名 → tab/selector）
const CHECK_FIX_MAP = {
  "name":                { tab: "basic",        selector: "[data-master-field='name']" },
  "volume":              { tab: "basic",        selector: "[data-master-field='volume']" },
  "bestBefore":          { tab: "basic",        selector: "[data-master-field='bestBefore']" },
  "storage":             { tab: "basic",        selector: "[data-master-field='storage']" },
  "manufacturerName":    { tab: "basic",        selector: "[data-master-field='manufacturerName']" },
  "manufacturerAddress": { tab: "basic",        selector: "[data-master-field='manufacturerAddress']" },
  "janCode":             { tab: "basic",        selector: "[data-master-field='janCode']" },
  "ingredients":         { tab: "ingredients",  selector: "[data-master-ing-name='0']" },
};

function handleChecklistJump(label) {
  const entry = CHECKLIST_JUMP_MAP.find((m) => label.includes(m.match));
  if (!entry) return;
  openSections.add(entry.section);
  highlightField = entry.field;
  render();
  requestAnimationFrame(() => {
    const sec = [...document.querySelectorAll(".section")].find((el) => el.querySelector(".section-title-text")?.textContent === entry.section);
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
    if (entry.field) {
      const el = document.querySelector(entry.field);
      if (el) {
        el.focus();
        el.classList.add("field-highlight");
        setTimeout(() => el.classList.remove("field-highlight"), 2000);
      }
    }
    highlightField = null;
  });
}
function saveIngMaster(name) {
  if (!name?.trim()) return;
  ingMaster = [name.trim(), ...ingMaster.filter((x) => x !== name.trim())].slice(0, 120);
  safeSet("food-label-ing-master", JSON.stringify(ingMaster));
}
function saveHistory(p) {
  try {
    const key = `food-label-history-${p.id}`;
    const hist = JSON.parse(safeGet(key) || "[]");
    hist.unshift({
      snapshot: JSON.parse(JSON.stringify(p)),
      savedAt: new Date().toLocaleString("ja-JP"),
      savedBy: currentUserName || "—",
    });
    safeSet(key, JSON.stringify(hist.slice(0, 10)));
  } catch {}
}
function loadHistory(id) {
  try { return JSON.parse(safeGet(`food-label-history-${id}`) || "[]"); } catch { return []; }
}
// CSV列名のエイリアスマップ（日本語ヘッダー → 英語フィールド名）
const CSV_COLUMN_ALIASES = {
  "商品名":"name","品名":"name","製品名":"name","商品":"name",
  "管理名":"internalName","内部管理名":"internalName","管理用商品名":"internalName",
  "品番":"code","商品コード":"code","SKU":"code","製品コード":"code",
  "カテゴリ":"category","分類":"category","種別":"category","種類":"category",
  "内容量":"volume","容量":"volume",
  "賞味期限":"bestBefore","消費期限":"bestBefore",
  "保存方法":"storage","保存条件":"storage","保存":"storage",
  "原産地":"originCountry","産地":"originCountry","原料原産地":"originCountry","原材料原産地":"originCountry",
  "製造者名":"manufacturerName","製造者":"manufacturerName","製造元":"manufacturerName",
  "製造会社":"manufacturerName","メーカー":"manufacturerName","製造所":"manufacturerName",
  "製造者住所":"manufacturerAddress","住所":"manufacturerAddress","所在地":"manufacturerAddress",
  "電話番号":"manufacturerPhone","電話":"manufacturerPhone","TEL":"manufacturerPhone",
  "郵便番号":"manufacturerPostal",
  "JANコード":"janCode","JAN":"janCode","バーコード":"janCode","JAN番号":"janCode","EAN":"janCode",
  "販売価格":"price","価格":"price","売価":"price","定価":"price","小売価格":"price",
  "メモ":"memo","備考":"memo","備考欄":"memo","特記事項":"memo",
  "ステータス":"publishStatus","公開状態":"publishStatus",
  "更新日":"updatedAt","更新日時":"updatedAt","最終更新":"updatedAt",
};

// CSVエクスポート列定義 [フィールドキー, 日本語ラベル]（再インポート可能）
const CSV_EXPORT_FIELDS = [
  ["id",                 "id"],
  ["name",               "商品名"],
  ["internalName",       "管理名"],
  ["code",               "品番"],
  ["category",           "カテゴリ"],
  ["volume",             "内容量"],
  ["bestBefore",         "賞味期限"],
  ["storage",            "保存方法"],
  ["originCountry",      "原産地"],
  ["manufacturerName",   "製造者名"],
  ["manufacturerAddress","製造者住所"],
  ["manufacturerPhone",  "電話番号"],
  ["manufacturerPostal", "郵便番号"],
  ["janCode",            "JANコード"],
  ["price",              "販売価格"],
  ["memo",               "メモ"],
  ["publishStatus",      "ステータス"],
  ["updatedAt",          "更新日"],
  ["directCost",         "材料費"],
  ["directPackaging",    "包装費"],
  ["directShipping",     "送料"],
  ["directOther",        "その他費用"],
  ["totalCost",          "原価合計"],
  ["costRate",           "原価率"],
  ["grossProfit",        "粗利額"],
];

function exportCsv() {
  const rows = products.map((p) => {
    const costs = calcCosts(p);
    const extra = {
      totalCost:   costs.totalCost > 0 ? Math.round(costs.totalCost) : "",
      costRate:    costs.costRate !== null ? costs.costRate + "%" : "",
      grossProfit: costs.price > 0 ? Math.round(costs.gross) : "",
    };
    return CSV_EXPORT_FIELDS.map(([key]) => {
      const val = extra[key] !== undefined ? extra[key] : (p[key] || "");
      return `"${String(val).replace(/"/g, '""')}"`;
    }).join(",");
  });
  const headerRow = CSV_EXPORT_FIELDS.map(([, label]) => `"${label}"`).join(",");
  const csv = [headerRow, ...rows].join("\r\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "food-labels.csv"; a.click();
  URL.revokeObjectURL(url);
  showStatus("CSVをエクスポートしました（Excelで開いて編集できます）");
}
function exportJson() {
  const hasImages = products.some(p => p.imageDataUrl);
  const doExport = (withImages) => {
    const exportProducts = withImages
      ? products
      : products.map(p => { const c = {...p}; delete c.imageDataUrl; return c; });
    const data = { version: 1, exportedAt: new Date().toISOString(), products: exportProducts };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `food-labels-${new Date().toLocaleDateString("ja-JP").replace(/\//g, "-")}${withImages ? "" : "-noimages"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    try {
      const hist = JSON.parse(safeGet("fmcc-backup-history") || "[]");
      hist.unshift({ date: new Date().toLocaleString("ja-JP"), count: exportProducts.length, withImages });
      safeSet("fmcc-backup-history", JSON.stringify(hist.slice(0, 20)));
    } catch {}
    showStatus(withImages ? "JSONをエクスポートしました（画像含む完全バックアップ）" : "JSONをエクスポートしました（画像なし・軽量版）");
  };
  if (hasImages) {
    showModal({
      message: "バックアップファイルの形式を選んでください。\n\n📦 画像を含む：完全バックアップ。ファイルサイズが大きくなります。\n📄 画像を除く：テキスト情報のみ。ファイルが小さく開きやすいです。",
      confirmLabel: "📦 画像を含む",
      dangerLabel: "📄 画像を除く",
      cancelLabel: "キャンセル",
      onConfirm: () => doExport(true),
      onDanger: () => doExport(false),
    });
  } else {
    doExport(false);
  }
}
function importJsonFile(file, mode) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      const incoming = Array.isArray(data) ? data : (Array.isArray(data.products) ? data.products : null);
      if (!incoming) { showStatus("JSONの形式が正しくありません"); return; }
      const valid = incoming.filter(p => p && p.name);
      if (!valid.length) { showStatus("有効な商品データが見つかりませんでした"); return; }
      if (mode === "replace") {
        products = valid.map(p => ({ ...emptyProduct(), ...p, id: p.id || uid() }));
      } else {
        const existingIds = new Set(products.map(p => p.id));
        const toAdd = valid.map(p => ({ ...emptyProduct(), ...p, id: (p.id && !existingIds.has(p.id)) ? p.id : uid() }));
        products = [...toAdd, ...products];
      }
      saveProducts(); render();
      showStatus(`${valid.length}件をインポートしました`);
    } catch { showStatus("JSONの読み込みに失敗しました"); }
  };
  reader.readAsText(file, "utf-8");
}

// インポートプレビュー: ファイルを先に解析してモーダルで確認させてからインポート実行
function previewImportJson(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      const incoming = Array.isArray(data) ? data : (Array.isArray(data.products) ? data.products : null);
      if (!incoming) { showStatus("JSONの形式が正しくありません"); return; }
      const valid = incoming.filter(p => p && p.name);
      if (!valid.length) { showStatus("有効な商品データが見つかりませんでした"); return; }
      const previewNames = valid.slice(0, 8).map(p => `・${escapeHtml(p.internalName||p.name)}`).join("\n");
      const more = valid.length > 8 ? `\n…他 ${valid.length - 8} 件` : "";
      showModal({
        message: `📥 JSONインポート確認\n${valid.length} 件の商品データが見つかりました。\n\n${previewNames}${more}\n\n既存データとの結合方法を選んでください。`,
        confirmLabel: "マージ追加（既存を残す）",
        dangerLabel: "全て置き換え",
        cancelLabel: "キャンセル",
        onConfirm: () => {
          const existingIds = new Set(products.map(p => p.id));
          const toAdd = valid.map(p => ({ ...emptyProduct(), ...p, id: (p.id && !existingIds.has(p.id)) ? p.id : uid() }));
          products = [...toAdd, ...products];
          saveProducts(); render();
          showStatus(`${valid.length}件をマージしました`);
        },
        onDanger: () => {
          products = valid.map(p => ({ ...emptyProduct(), ...p, id: p.id || uid() }));
          saveProducts(); render();
          showStatus(`${valid.length}件で全て置き換えました`);
        },
      });
    } catch { showStatus("JSONの読み込みに失敗しました"); }
  };
  reader.readAsText(file, "utf-8");
}
function previewImportCsv(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const text = e.target.result.replace(/^﻿/, "");
      const lines = text.split(/\r?\n/).filter(Boolean);
      if (lines.length < 2) { showStatus("CSVが空または形式が不正です"); return; }
      const rawHeaders = parseCSVRow(lines[0]);

      // 日本語ヘッダー → 英語フィールド名に自動変換
      const normalizedHeaders = rawHeaders.map(h => CSV_COLUMN_ALIASES[h.trim()] || h.trim());
      const autoMapped = rawHeaders.filter((h, i) => CSV_COLUMN_ALIASES[h.trim()] && normalizedHeaders[i] !== rawHeaders[i]);

      if (!normalizedHeaders.includes("name")) {
        showStatus("CSVに「商品名」または「name」の列が必要です");
        return;
      }
      const SAFE = new Set(["name","internalName","volume","bestBefore","storage","storageCustom",
        "manufacturerName","manufacturerAddress","manufacturerPhone","manufacturerPostal",
        "janCode","code","category","price","memo","publishStatus","updatedAt","originCountry"]);
      const rows = [];
      lines.slice(1).forEach(line => {
        const cols = parseCSVRow(line);
        const row = {};
        normalizedHeaders.forEach((h, i) => { if (SAFE.has(h)) row[h] = String(cols[i]||"").slice(0,500); });
        if (row.name) rows.push(row);
      });
      if (!rows.length) { showStatus("有効な行が見つかりませんでした"); return; }
      const previewNames = rows.slice(0, 8).map(r => `・${escapeHtml(r.internalName||r.name)}`).join("\n");
      const more = rows.length > 8 ? `\n…他 ${rows.length - 8} 件` : "";
      const mappedNote = autoMapped.length
        ? `\n🔄 自動変換: ${autoMapped.slice(0, 4).map(h => escapeHtml(h)).join("・")}${autoMapped.length > 4 ? " 他" : ""}`
        : "";
      showModal({
        message: `📥 CSVインポート確認\n${rows.length} 件の商品データが見つかりました。\n\n${previewNames}${more}${mappedNote}\n\n既存データに追加します（削除はされません）。`,
        confirmLabel: `${rows.length} 件をインポートする`,
        cancelLabel: "キャンセル",
        onConfirm: () => {
          rows.forEach(row => {
            const p = emptyProduct();
            Object.assign(p, row, { id: uid(), starred: false, ingredients: [{ id: uid(), name: "", weight: "" }] });
            products = [p, ...products];
          });
          saveProducts(); render();
          showStatus(`${rows.length}件をインポートしました`);
        },
      });
    } catch { showStatus("CSVの読み込みに失敗しました"); }
  };
  reader.readAsText(file, "utf-8");
}
function parseCSVRow(line) {
  const fields = []; let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    if (inQ) {
      if (line[i] === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (line[i] === '"') { inQ = false; }
      else { cur += line[i]; }
    } else {
      if (line[i] === '"') { inQ = true; }
      else if (line[i] === ',') { fields.push(cur.trim()); cur = ""; }
      else { cur += line[i]; }
    }
  }
  fields.push(cur.trim());
  return fields;
}
function importCsvFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const text = e.target.result.replace(/^﻿/, "");
      const lines = text.split(/\r?\n/).filter(Boolean);
      if (lines.length < 2) { showStatus("CSVが空または形式が不正です"); return; }
      const headers = parseCSVRow(lines[0]);
      if (!headers.includes("name")) { showStatus("CSVにnameカラムが必要です"); return; }
      const SAFE = new Set(["name","internalName","volume","bestBefore","storage","storageCustom",
        "manufacturerName","manufacturerAddress","manufacturerPhone","manufacturerPostal",
        "janCode","code","category","price","memo","publishStatus","updatedAt","originCountry"]);
      let added = 0;
      lines.slice(1).forEach((line) => {
        const cols = parseCSVRow(line);
        const row = {};
        headers.forEach((h, i) => { if (SAFE.has(h)) row[h] = String(cols[i] || "").slice(0, 500); });
        if (!row.name) return;
        const p = emptyProduct();
        Object.assign(p, row, { id: uid(), starred: false, ingredients: [{ id: uid(), name: "", weight: "" }] });
        products = [p, ...products]; added++;
      });
      saveProducts(); render();
      showStatus(`${added}件をインポートしました`);
    } catch { showStatus("CSVの読み込みに失敗しました"); }
  };
  reader.readAsText(file, "utf-8");
}
function batchPrint() {
  if (!selectedForPrint.size) return;
  const targets = products.filter((p) => selectedForPrint.has(p.id));
  const labelStyle = `style="width:${printCfg.w || 90}mm;${printCfg.h ? `min-height:${printCfg.h}mm;` : ""}font-size:${printCfg.fs || 7.5}pt;"`;
  const html = targets.map((p) => {
    const d = derive(p);
    return `<div style="page-break-after:always;">${printablePreviewHtml(p, d, labelStyle, true)}</div>`;
  }).join("");
  const style = document.createElement("style");
  style.id = "print-style";
  style.textContent = `@page{margin:0;size:auto} @media print { body>*{display:none!important} #batch-print-frame{display:block!important;position:fixed;inset:0;background:#fff;padding:${printCfg.margin||3}mm;-webkit-print-color-adjust:exact;print-color-adjust:exact} .label-paper{width:${printCfg.w||90}mm!important;font-size:${printCfg.fs||7.5}pt!important;break-inside:avoid;-webkit-print-color-adjust:exact;print-color-adjust:exact} }`;
  const frame = document.createElement("div"); frame.id = "batch-print-frame"; frame.innerHTML = `<style>${style.textContent.replace(/@media print \{|\}/g,"")}</style>${html}`;
  document.body.appendChild(frame); document.head.appendChild(style);
  const cleanup = () => { frame.remove(); style.remove(); };
  window.addEventListener("afterprint", cleanup, { once: true });
  setTimeout(cleanup, 5000); // フォールバック
  window.print();
}
function showStatus(message, { undoLabel, onUndo, duration } = {}) {
  statusMessage = message;
  let toast = document.getElementById("status-toast-el");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "status-toast-el";
    toast.className = "status-toast";
    document.body.appendChild(toast);
  }
  clearTimeout(showStatus._timer);
  if (onUndo) {
    toast.innerHTML = `<span>${escapeHtml(message)}</span><button class="toast-undo-btn" id="toast-undo-btn">${escapeHtml(undoLabel||"元に戻す")}</button>`;
    document.getElementById("toast-undo-btn").addEventListener("click", () => {
      onUndo();
      toast.style.display = "none";
      statusMessage = "";
      clearTimeout(showStatus._timer);
    }, { once: true });
  } else {
    toast.textContent = message;
  }
  toast.style.display = message ? "block" : "none";
  if (message) {
    showStatus._timer = setTimeout(() => {
      statusMessage = "";
      toast.style.display = "none";
    }, onUndo ? 5000 : (duration || 2200));
  }
}


function derive(p) {
  const autoNutrition = calcNutrition(p.ingredients);
  const nutrition = p.nutritionMode === "manual" ? { ...autoNutrition, ...p.nutritionManual } : autoNutrition;
  const autoAllergens = detectAllergens(p.ingredients.map((i) => i.name).filter(Boolean));
  const allergens = p.allergensMode === "manual" ? (p.allergensManual || "").split(/[、,・\s]+/).filter(Boolean) : autoAllergens;
  const contamination = buildContaminationText(p);
  return { autoNutrition, nutrition, autoAllergens, allergens, contamination, ingLabel: buildIngLabel(p.ingredients), storage: p.storage === "自由入力" ? p.storageCustom : p.storage, nutritionUnit: p.nutritionUnit || "100g当たり" };
}
function buildContaminationText(p) {
  if (!p.contaminationEnabled) return "";
  if (p.contaminationText?.trim()) return p.contaminationText.trim();
  const allergens = (p.contaminationAllergens || "").split(/[、,・\s]+/).map((x) => x.trim()).filter(Boolean);
  if (!allergens.length) return "";
  return `本品製造工場では、${allergens.join("・")}を含む製品を製造しています。`;
}
function cleanLabelText(value) {
  return String(value || "")
    .replace(/[ \t　]+/g, " ")
    .replace(/\s*([、，,／/])\s*/g, "$1")
    .trim();
}
function normalizeBestBefore(value) {
  const clean = cleanLabelText(value);
  const m = clean.match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/);
  if (!m) return clean;
  return `${Number(m[1])}.${Number(m[2])}.${Number(m[3])}`;
}
function normalizeVolumeText(value) {
  return cleanLabelText(value).replace(/(\d)\s+(個|枚|本|袋|箱|g|kg|ml|mL|L)/g, "$1$2");
}
function splitVolume(value) {
  const text = normalizeVolumeText(value);
  const m = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const amount = m ? m[1] : "";
  const unit = m ? m[2].trim() : "";
  return { amount, unit };
}
function buildVolume(amount, unit) {
  const n = cleanLabelText(amount);
  const u = cleanLabelText(unit);
  if (!n && !u) return "";
  return `${n}${u}`;
}
function toDateInputValue(value) {
  const s = String(value || "").trim();
  const m = s.match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/) || s.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/);
  if (!m) return "";
  return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
}
function formatDateForLabel(date) {
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}
function dateInputToLabel(value) {
  if (!value) return "";
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return "";
  return `${y}.${m}.${d}`;
}
function presetDateValue(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return formatDateForLabel(d);
}
function normalizeIngredientText(value) {
  return cleanLabelText(value)
    .replace(/[，,]/g, "、")
    .replace(/\s*（\s*/g, "（")
    .replace(/\s*）\s*/g, "）")
    .replace(/\s*\/\s*/g, "／")
    .replace(/^塩$/, "食塩");
}
function normalizeLabelText(p) {
  const d = derive(p);
  const next = { ...p };
  const changes = [];
  const setField = (key, value, label) => {
    if (String(next[key] || "") !== String(value || "")) {
      next[key] = value;
      changes.push(label);
    }
  };
  setField("name", cleanLabelText(p.name), "名称の空白を整理");
  setField("volume", normalizeVolumeText(p.volume), "内容量の空白を整理");
  setField("bestBefore", normalizeBestBefore(p.bestBefore), "賞味期限の表記を整理");
  if (p.storage !== "自由入力" && !p.storage) {
    next.storage = STORAGE_OPTS[0];
    changes.push("保存方法の初期文を追加");
  }
  if (p.storage === "自由入力") setField("storageCustom", cleanLabelText(p.storageCustom), "保存方法の空白を整理");
  if (p.allergensMode === "manual") setField("allergensManual", d.allergens.join("、"), "アレルゲンを検出結果に整理");
  if (p.contaminationEnabled && !p.contaminationText?.trim()) {
    next.contaminationText = buildContaminationText(next);
    changes.push("コンタミ文を定型文で作成");
  } else if (p.contaminationEnabled) {
    setField("contaminationText", cleanLabelText(p.contaminationText), "コンタミ文の空白を整理");
  }
  if (p.janCode) setField("janCode", normalizedJan(p.janCode), "JANコードを数字だけに整理");
  const cleanedIngredients = p.ingredients
    .map((ing) => ({ ...ing, name: normalizeIngredientText(ing.name), weight: cleanLabelText(ing.weight) }))
    .filter((ing) => ing.name || ing.weight)
    .sort((a, b) => (parseFloat(b.weight) || 0) - (parseFloat(a.weight) || 0));
  const nextIngredients = cleanedIngredients.length ? cleanedIngredients : [{ id: uid(), name: "", weight: "" }];
  if (JSON.stringify(nextIngredients.map(({ name, weight }) => ({ name, weight }))) !== JSON.stringify(p.ingredients.map(({ name, weight }) => ({ name, weight })))) {
    next.ingredients = nextIngredients;
    changes.push("原材料を重量の多い順に整理");
  }
  return { next, changes };
}

function showModal({ message, confirmLabel = "OK", cancelLabel = null, dangerLabel = null, onConfirm, onCancel, onDanger }) {
  document.querySelector(".app-modal")?.remove();
  const modal = document.createElement("div");
  modal.className = "app-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", message.slice(0, 60));
  modal.innerHTML = `
    <div class="app-modal-card">
      <p class="app-modal-msg">${escapeHtml(message)}</p>
      <div class="app-modal-actions">
        ${cancelLabel ? `<button class="action app-modal-cancel">${escapeHtml(cancelLabel)}</button>` : ""}
        ${dangerLabel ? `<button class="action danger-outline app-modal-danger">${escapeHtml(dangerLabel)}</button>` : ""}
        <button class="action primary app-modal-confirm">${escapeHtml(confirmLabel)}</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  const prevFocus = document.activeElement;
  const focusable = () => [...modal.querySelectorAll("button:not([disabled])")];
  requestAnimationFrame(() => { focusable()[0]?.focus(); });
  const trapFocus = (e) => {
    if (e.key !== "Tab") return;
    const els = focusable();
    if (!els.length) return;
    const first = els[0], last = els[els.length - 1];
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
    else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
  };
  modal.addEventListener("keydown", trapFocus);
  const close = () => { modal.remove(); prevFocus?.focus?.(); };
  modal.querySelector(".app-modal-confirm").addEventListener("click", () => { close(); onConfirm?.(); });
  modal.querySelector(".app-modal-cancel")?.addEventListener("click", () => { close(); onCancel?.(); });
  modal.querySelector(".app-modal-danger")?.addEventListener("click", () => { close(); onDanger?.(); });
  // 背景クリックは単純にモーダルを閉じるだけ（破壊的アクションは実行しない）
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
}

function showShortcutsPanel() {
  document.querySelector(".shortcuts-modal")?.remove();
  const el = document.createElement("div");
  el.className = "shortcuts-modal";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.setAttribute("aria-label", "キーボードショートカット一覧");
  el.innerHTML = `<div class="shortcuts-card">
    <div class="shortcuts-hd">⌨ キーボードショートカット</div>
    <table class="shortcuts-table">
      <tr><td><kbd>d</kbd></td><td>ダッシュボードへ移動</td></tr>
      <tr><td><kbd>p</kbd></td><td>商品管理へ移動</td></tr>
      <tr><td><kbd>n</kbd></td><td>新規商品を追加</td></tr>
      <tr><td><kbd>/</kbd></td><td>商品を検索</td></tr>
      <tr><td><kbd>Ctrl</kbd>+<kbd>S</kbd></td><td>商品を保存</td></tr>
      <tr><td><kbd>1</kbd>〜<kbd>6</kbd></td><td>商品詳細タブを切替（基本/原材料/原価/チェック/履歴/承認）</td></tr>
      <tr><td><kbd>Esc</kbd></td><td>戻る / サイドバーを閉じる</td></tr>
      <tr><td><kbd>?</kbd></td><td>ショートカット一覧を表示</td></tr>
    </table>
    <button class="action primary shortcuts-close">閉じる</button>
  </div>`;
  document.body.appendChild(el);
  el.querySelector(".shortcuts-close").addEventListener("click", () => el.remove());
  el.addEventListener("click", e => { if (e.target === el) el.remove(); });
}

function focusKey(el) {
  if (!el) return null;
  if (el.dataset.field) return `[data-field="${el.dataset.field}"]`;
  if (el.dataset.ingField && el.closest("[data-ing-id]")) return `[data-ing-id="${el.closest("[data-ing-id]").dataset.ingId}"] [data-ing-field="${el.dataset.ingField}"]`;
  if ("ingName" in el.dataset) return `[data-ing-name="${el.dataset.ingName}"]`;
  if ("ingWeight" in el.dataset) return `[data-ing-weight="${el.dataset.ingWeight}"]`;
  if (el.id) return `#${el.id}`;
  return null;
}
// ══ デモモード ════════════════════════════════════════════════════════════
const DEMO_STEPS = [
  { step:1, title:"FoodPilotとは？",   fullscreen:true,  view:"dashboard",
    heading:"商品情報を一度登録するだけで、\n食品表示・規格書・原価・AIまで自動化できます。",
    point:"食品メーカーが毎日行う「ラベル作成・規格書提出・原価計算」をFoodPilot一つに集約。作業時間を最大80%削減した事例があります。" },

  { step:2, title:"写真から登録", fullscreen:true, view:"reg-photo", showRegMethods:true,
    heading:"商品写真を撮るだけで\nAIが原材料・製造者・栄養成分を自動で読み取ります",
    point:"パッケージ裏面を撮影するだけ。Llama Vision AIが原材料名・製造者・アレルゲン・栄養成分をゼロ入力で抽出します。" },

  { step:3, title:"AI自動入力結果",                      view:"edit", autoScroll:true,
    heading:"写真から全項目が自動入力されました",
    point:"商品名・原材料7品目・製造者・賞味期限・保存方法が入力済みです。修正が必要な箇所だけ直して保存するだけ。手入力と比べて工数が大幅に削減されます。" },

  { step:4, title:"栄養成分の自動計算",                   view:"edit", clickSection:"栄養成分",
    heading:"原材料の重量から\n栄養成分を自動で計算します",
    point:"原材料ごとの重量（g）を入力するだけで、エネルギー・たんぱく質・脂質・炭水化物・食塩相当量をFoodPilotが自動計算します。栄養士への外注が不要になります。" },

  { step:5, title:"食品表示ラベル",                       view:"label-nav",
    heading:"食品表示ラベルが\nリアルタイムで自動生成されます",
    point:"入力と同時にラベルが更新されます。サイズ・フォントを自由に調整し、そのままPDF印刷またはPNG書き出しができます。食品表示法に沿ったレイアウトを自動で構成します。" },

  { step:5, title:"商品規格書",                          view:"spec-sheet-nav",
    heading:"A4規格書がワンクリックで完成\n取引先へその場で提出できます",
    point:"原材料・アレルゲン・栄養成分・製造者を整形したA4規格書を自動生成。署名欄付きPDFを出力して取引先に即日提出できます。規格書作成の外注コストをゼロにできます。" },

  { step:6, title:"AI商品説明文",                        view:"ai-descriptions-nav", clickGenerate:true,
    heading:"楽天・Amazon・Yahoo用の\n商品説明文をAIが自動生成します",
    point:"登録した商品情報をもとに、ECサイト向けの魅力的な商品説明文をAIが自動作成。販路（楽天・Amazon・自社EC）ごとに文体を最適化します。コピーライターへの外注が不要になります。" },

  { step:7, title:"原価・利益管理",                       view:"product-detail", detailTab:"cost", autoScroll:true,
    heading:"原価率・粗利率・粗利額を\n商品ごとにリアルタイム計算",
    point:"材料費・包装費・送料を入力するだけで原価率と粗利が即計算されます。「どの商品が一番儲かるか」をすべての商品で横断管理できます。" },

  { step:8, title:"AIが今日の課題を検出",                 view:"dashboard",
    heading:"AIが商品ごとの課題を自動で検出し\n優先順位をつけて提案します",
    point:"未入力項目・期限切れ・原価未設定・製造者情報なしなど、法令違反リスクも含めてAIが毎日チェック。担当者が見落とすミスを防ぎます。" },

  { step:9, title:"デモ完了",           fullscreen:true,  view:"dashboard",
    heading:"商品を一度登録するだけで、\nFoodPilotが商品管理をすべて支援します。",
    point:"ラベル作成・規格書・AI説明文・原価管理・食品表示チェックがすべて標準搭載。無料プランから今日はじめられます。" },
];

const DEMO_SAMPLE = {
  _isDemo: true,
  name: "有機抹茶クッキー",
  internalName: "有機抹茶クッキー",
  category: "菓子類",
  janCode: "4901234567890",
  netWeight: "80",
  netWeightUnit: "g",
  expiryType: "best-before",
  expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  storageMethod: "直射日光・高温多湿を避け、常温で保存してください。",
  publishStatus: "active",
  manufacturerName: "株式会社サンプルフーズ",
  manufacturerAddress: "東京都渋谷区代々木1-1-1 フードビル3F",
  manufacturerPostal: "151-0053",
  manufacturerPhone: "03-1234-5678",
  manufacturerType: ["製造者"],
  ingredients: [
    { name: "小麦粉", weight: 42 },
    { name: "バター", weight: 20 },
    { name: "砂糖", weight: 18 },
    { name: "卵", weight: 12 },
    { name: "有機抹茶パウダー", weight: 5 },
    { name: "食塩", weight: 1 },
    { name: "膨張剤", weight: 0.5, isAdditive: true },
  ],
  allergens: [],
  allergensMode: "auto",
  directCost: "120",
  price: "680",
  costMode: "direct",
  approvalStatus: "approved",
};

let demoScrollTimer = null;
function stopDemoAutoScroll() {
  if (demoScrollTimer) { clearInterval(demoScrollTimer); demoScrollTimer = null; }
}
function startDemoAutoScroll(delay = 150) {
  stopDemoAutoScroll();
  setTimeout(() => {
    window.scrollTo(0, 0);
    const duration = 5000;
    const start = Date.now();
    demoScrollTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, maxScroll * eased);
      if (t >= 1) { clearInterval(demoScrollTimer); demoScrollTimer = null; }
    }, 16);
  }, delay);
}
function startDemoClickSection(sectionName) {
  setTimeout(() => {
    const btn = document.querySelector(`[data-toggle-section="${sectionName}"]`);
    if (!btn) return;
    btn.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      btn.classList.add("demo-click-anim");
      setTimeout(() => {
        btn.click();
        btn.classList.remove("demo-click-anim");
        setTimeout(() => btn.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
      }, 500);
    }, 700);
  }, 400);
}
function startDemoClickGenerate() {
  setTimeout(() => {
    const btn = document.querySelector('[data-action="generate-ai-desc"]');
    if (!btn) return;
    btn.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      btn.classList.add("demo-click-anim");
      setTimeout(() => { btn.click(); btn.classList.remove("demo-click-anim"); }, 500);
    }, 700);
  }, 800);
}

function startDemo() {
  products = products.filter(p => !p._isDemo);
  const dp = Object.assign({}, DEMO_SAMPLE, {
    id: "demo-fp-" + Date.now(),
    updatedAt: new Date().toISOString().replace("T"," ").slice(0,16),
    createdAt:  new Date().toISOString().replace("T"," ").slice(0,16),
  });
  demoProductId = dp.id;
  products.unshift(dp);
  try { localStorage.setItem("food-label-products-static", JSON.stringify(products)); } catch {}
  demoMode = true;
  demoStep = 1;
  applyDemoStep();
  render();
}

function endDemo() {
  stopDemoAutoScroll();
  products = products.filter(p => !p._isDemo);
  try { localStorage.setItem("food-label-products-static", JSON.stringify(products)); } catch {}
  demoMode = false;
  demoStep = 1;
  demoProductId = null;
  saasView = "dashboard";
  view = "saas";
  render();
}

function applyDemoStep() {
  const s = DEMO_STEPS[demoStep - 1];
  stopDemoAutoScroll();
  sidebarOpen = false;
  registerMenuOpen = false;
  if (s.view === "dashboard")                { saasView = "dashboard"; view = "saas"; }
  else if (s.view === "reg-photo")           { saasView = "reg-photo"; view = "saas"; }
  else if (s.view === "edit" || s.view === "label-nav") {
    editId = demoProductId;
    draft = extendProductMaster(products.find(p => p.id === demoProductId) || emptyProduct());
    view = "edit"; saasView = s.view === "label-nav" ? "label-nav" : "edit";
    if (s.autoScroll) {
      openSections = new Set(["基本情報", "原材料"]);
      startDemoAutoScroll(150);
    } else if (s.clickSection) {
      openSections = new Set(["基本情報", "原材料"]);
      startDemoClickSection(s.clickSection);
    } else if (s.openSection) {
      openSections = new Set([s.openSection]);
      const sec = s.openSection;
      setTimeout(() => {
        const btn = document.querySelector(`[data-toggle-section="${sec}"]`);
        if (btn) btn.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }
  else if (s.view === "product-detail") {
    productDetailId = demoProductId;
    productDetailTab = s.detailTab || "basic";
    saasView = "product-detail"; view = "saas";
    if (s.autoScroll) startDemoAutoScroll(300);
  }
  else if (s.view === "spec-sheet-nav")      { specSheetId = demoProductId; saasView = "spec-sheet-nav"; view = "saas"; }
  else if (s.view === "ai-descriptions-nav") {
    aiDescId = demoProductId; saasView = "ai-descriptions-nav"; view = "saas";
    if (s.clickGenerate) startDemoClickGenerate();
  }
}

function demoOverlayHtml() {
  const TOTAL = DEMO_STEPS.length;
  const s = DEMO_STEPS[demoStep - 1];
  const pct = Math.round((demoStep / TOTAL) * 100);
  const prevBtn = demoStep > 1 ? `<button class="demo-btn-sec" data-action="demo-prev">← 戻る</button>` : "";
  const nextLabel = demoStep === TOTAL ? "デモを終了する ✓" : "次へ →";
  const topBar = `
    <div class="demo-topbar">
      <div class="demo-topbar-left">
        <span class="demo-step-badge">STEP ${demoStep} / ${TOTAL}</span>
        <span class="demo-topbar-title">${escapeHtml(s.title)}</span>
        <div class="demo-progress-track"><div class="demo-progress-fill" style="width:${pct}%"></div></div>
      </div>
      <button class="demo-end-btn" data-action="demo-end">✕ デモ終了</button>
    </div>`;

  if (s.fullscreen) {
    const regHtml = s.showRegMethods ? `
      <div class="demo-reg-grid">
        <div class="demo-reg-card demo-reg-card--active"><div class="demo-reg-icon">📷</div><div class="demo-reg-label">商品写真から登録</div><div class="demo-reg-desc">パッケージ裏面を撮るだけでAIが全項目を自動入力</div><div class="demo-reg-now">← 今回はこちら</div></div>
        <div class="demo-reg-card"><div class="demo-reg-icon">📄</div><div class="demo-reg-label">規格書から登録</div><div class="demo-reg-desc">PDF・Excelから自動抽出</div></div>
        <div class="demo-reg-card"><div class="demo-reg-icon">🤖</div><div class="demo-reg-label">AIで登録</div><div class="demo-reg-desc">チャット形式で情報を作成</div></div>
        <div class="demo-reg-card"><div class="demo-reg-icon">✏️</div><div class="demo-reg-label">手入力</div><div class="demo-reg-desc">従来どおり手動で入力</div></div>
      </div>` : "";
    return `
      <div class="demo-overlay demo-fullscreen" id="demo-overlay">
        ${topBar}
        <div class="demo-center">
          <p class="demo-step-num-big">STEP ${demoStep}</p>
          <h2 class="demo-heading">${escapeHtml(s.heading).replace(/\n/g,"<br>")}</h2>
          ${regHtml}
          <div class="demo-point-box"><span class="demo-point-icon">💡</span><span><b>ここがポイント</b><br>${escapeHtml(s.point)}</span></div>
          <div class="demo-nav-row">${prevBtn}<button class="demo-btn-prim" data-action="demo-next">${nextLabel}</button></div>
        </div>
      </div>`;
  }

  return `
    <div class="demo-overlay demo-float" id="demo-overlay">
      ${topBar}
      <div class="demo-callout">
        <div class="demo-callout-head">📌 ${escapeHtml(s.title)}</div>
        <div class="demo-callout-msg">${escapeHtml(s.heading)}</div>
        <div class="demo-point-box"><span class="demo-point-icon">💡</span><span><b>ここがポイント</b><br>${escapeHtml(s.point)}</span></div>
        <div class="demo-nav-row">${prevBtn}<button class="demo-btn-prim" data-action="demo-next">${nextLabel}</button></div>
      </div>
    </div>`;
}
// ═════════════════════════════════════════════════════════════════════════

function render() {
  clearTimeout(renderTimer);
  const active = document.activeElement;
  const key = focusKey(active);
  const selStart = active?.selectionStart ?? null;
  const selEnd = active?.selectionEnd ?? null;
  const scrollY = window.scrollY;
  const formScrollY = document.querySelector(".form-column")?.scrollTop ?? 0;
  const prevScrollY = document.querySelector(".preview-column")?.scrollTop ?? 0;
  let pageHtml;
  try {
    if (view === "saas") {
      if (saasView === "dashboard") pageHtml = dashboardHtml();
      else if (saasView === "products") pageHtml = productsListHtml();
      else if (saasView === "product-detail") pageHtml = productDetailHtml();
      else if (saasView === "spec-sheet-nav") pageHtml = specSheetHtml();
      else if (saasView === "ai-descriptions-nav") pageHtml = aiDescriptionsHtml();
      else if (saasView === "ai-consult-nav") pageHtml = aiConsultHtml();
      else if (saasView === "reg-photo") pageHtml = photoRegisterHtml();
      else if (saasView === "reg-spec") pageHtml = specRegisterHtml();
      else if (saasView === "reg-ai-chat") pageHtml = aiChatRegisterHtml();
      else if (saasView === "settings-nav") pageHtml = newSettingsHtml();
      else if (saasView === "team-approval") pageHtml = teamApprovalHtml();
      else if (saasView === "shelf-scan") pageHtml = shelfScanHtml();
      else if (saasView === "template-select") pageHtml = templateSelectHtml();
      else pageHtml = dashboardHtml();
    } else if (view === "home") {
      pageHtml = homeHtml();
    } else if (view === "menu") {
      pageHtml = menuHtml();
    } else if (view === "saved") {
      pageHtml = savedHtml();
    } else {
      pageHtml = editorHtml(currentProduct());
    }
  } catch(e) {
    console.error("render error:", e);
    pageHtml = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:1rem;padding:2rem;text-align:center">
      <div style="font-size:2.5rem">⚠️</div>
      <h2 style="color:var(--danger,#dc2626);margin:0">表示エラーが発生しました</h2>
      <p style="color:var(--muted,#64748b);max-width:40ch">${escapeHtml(String(e.message||e))}</p>
      <button class="action" onclick="saasView='dashboard';productDetailId=null;render()">ダッシュボードに戻る</button>
    </div>`;
  }
  document.getElementById("root").innerHTML = `${pageHtml}${tutorialHtml()}${demoMode ? demoOverlayHtml() : ""}`;
  bindDynamic();
  window.scrollTo({ top: scrollY, behavior: "instant" });
  const fc = document.querySelector(".form-column");
  const pc = document.querySelector(".preview-column");
  if (fc) fc.scrollTop = formScrollY;
  if (pc) pc.scrollTop = prevScrollY;
  if (key) {
    const next = document.querySelector(key);
    if (next) {
      next.focus({ preventScroll: true });
      if (selStart !== null && next.setSelectionRange) {
        try { next.setSelectionRange(selStart, selEnd); } catch (_) {}
      }
    }
  }
}
function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(() => {
    if (view === "edit") {
      const p = currentProduct();
      const pc = document.querySelector(".preview-column");
      if (p && pc) {
        const d = derive(p);
        pc.innerHTML = previewHtml(p, d);
        // 完成度バーを部分更新
        const { pct, missing } = calcCompletion(p, d);
        const pctColor = pct >= 100 ? "#16a34a" : pct >= 60 ? "#2563eb" : "#d97706";
        const fill = document.querySelector(".completion-bar-fill");
        const strong = document.querySelector(".completion-bar-head strong");
        const info = document.querySelector(".completion-missing, .completion-ok");
        if (fill) { fill.style.width = `${pct}%`; fill.style.background = pctColor; }
        if (strong) { strong.textContent = `${pct}%`; strong.style.color = pctColor; }
        if (info) { info.className = missing.length ? "completion-missing" : "completion-ok"; info.textContent = missing.length ? `未入力：${missing.join("・")}` : "✓ すべて入力済み"; }
        // 原材料ラベルプレビューも更新
        const ingPrev = document.querySelector(".ing-preview");
        if (ingPrev) ingPrev.textContent = d.ingLabel || "";
        return;
      }
    }
    render();
  }, 300);
}
function scheduleAutoSave() {
  if (view !== "edit") return;
  autoSaveStatus = "編集中";
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    const p = currentProduct();
    if (!p || !p.name?.trim()) return;
    saveCurrent();
    autoSaveStatus = "保存済み";
  }, 3000);
}
function currentProduct() { return editId === "new" ? draft : products.find((p) => p.id === editId); }
function planInfo() { return PLANS[currentPlan] || PLANS.free; }
function canCreateMore() { return products.length < planInfo().limit; }
function canUseJanCode() { return currentPlan !== "free"; }
function selectedMfrTypes(p) {
  const types = Array.isArray(p.manufacturerTypes) && p.manufacturerTypes.length
    ? p.manufacturerTypes
    : [p.manufacturerType || "製造者"];
  return [...new Set(types.filter((t) => MFR_TYPES.includes(t)))];
}
function normalizedJan(code) {
  return String(code || "").replace(/\D/g, "");
}
function janBarcodeSvg(code) {
  const digits = normalizedJan(code);
  if (digits.length === 13) return ean13Svg(digits);
  if (digits.length === 8) return ean8Svg(digits);
  return "";
}
function bitsToSvg(bits, digits) {
  const moduleW = 1.55;
  const barH = 42;
  const textH = 11;
  const width = Math.round(bits.length * moduleW);
  let rects = "";
  for (let i = 0; i < bits.length; i += 1) {
    if (bits[i] === "1") rects += `<rect x="${(i * moduleW).toFixed(2)}" y="0" width="${moduleW.toFixed(2)}" height="${barH}" />`;
  }
  return `<div class="barcode-box"><svg class="jan-barcode" viewBox="0 0 ${width} ${barH + textH}" role="img" aria-label="JAN ${escapeHtml(digits)}"><rect width="${width}" height="${barH + textH}" fill="#fff"/>${rects}<text x="${width / 2}" y="${barH + 9}" text-anchor="middle">${escapeHtml(digits)}</text></svg></div>`;
}
function ean13Svg(digits) {
  const L = ["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"];
  const G = ["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"];
  const R = ["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"];
  const parity = ["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"][Number(digits[0])];
  let bits = "101";
  for (let i = 1; i <= 6; i += 1) bits += parity[i - 1] === "L" ? L[Number(digits[i])] : G[Number(digits[i])];
  bits += "01010";
  for (let i = 7; i <= 12; i += 1) bits += R[Number(digits[i])];
  bits += "101";
  return bitsToSvg(bits, digits);
}
function ean8Svg(digits) {
  const L = ["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"];
  const R = ["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"];
  let bits = "101";
  for (let i = 0; i < 4; i += 1) bits += L[Number(digits[i])];
  bits += "01010";
  for (let i = 4; i < 8; i += 1) bits += R[Number(digits[i])];
  bits += "101";
  return bitsToSvg(bits, digits);
}
function janBarcodeBits(digits) {
  const L = ["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"];
  const G = ["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"];
  const R = ["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"];
  if (digits.length === 13) {
    const parity = ["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"][Number(digits[0])];
    let bits = "101";
    for (let i = 1; i <= 6; i++) bits += parity[i-1] === "L" ? L[Number(digits[i])] : G[Number(digits[i])];
    bits += "01010";
    for (let i = 7; i <= 12; i++) bits += R[Number(digits[i])];
    return bits + "101";
  }
  if (digits.length === 8) {
    let bits = "101";
    for (let i = 0; i < 4; i++) bits += L[Number(digits[i])];
    bits += "01010";
    for (let i = 4; i < 8; i++) bits += R[Number(digits[i])];
    return bits + "101";
  }
  return null;
}
function drawBarcodeOnCanvas(ctx, digits, x, y, maxW, fs) {
  const bits = janBarcodeBits(digits);
  if (!bits) return 0;
  const moduleW = maxW / bits.length;
  const barH = fs * 3.5;
  const textH = fs * 1.4;
  ctx.fillStyle = "#000";
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === "1") ctx.fillRect(x + i * moduleW, y, moduleW + 0.5, barH);
  }
  ctx.font = `${fs * 0.85}px "Courier New",monospace`;
  ctx.textAlign = "center";
  ctx.fillText(digits, x + maxW / 2, y + barH + textH * 0.85);
  ctx.textAlign = "left";
  return barH + textH + 6;
}
function homeHtml() {
  return `<main class="home">
    <div class="home-hero">
      <div class="home-hero-logo"><img class="brand-mark app-icon" src="./assets/app-icon.svg" alt="ラベルプリンター"></div>
      <h1 class="home-hero-title">FoodPilot</h1>
      <p class="home-hero-sub">食品業界向け AI 搭載商品管理 SaaS</p>
    </div>
    ${planHtml()}
    <div class="home-cta-wrap">
      <button class="home-next" data-action="menu">このプランで始める →</button>
    </div>
    <div class="recent-strip"><span class="recent-label">選択中</span><span>${planInfo().label}プラン・${planInfo().note}</span></div>
  </main>`;
}
function planHtml() {
  const POPULAR = "pro";
  // trial は別セクションで表示するためメイングリッドから除外
  const mainPlans = Object.entries(PLANS).filter(([id]) => id !== "trial");
  return `<section class="plan-panel">
    <div class="plan-title"><b>プランを選択</b><span>お支払い後に表示されるライセンスキーを設定ページで入力してください</span></div>
    <div class="plan-grid">${mainPlans.map(([id, p]) => {
      const isActive = currentPlan === id;
      const buyBtn = !isActive && id !== "free"
        ? `<button class="plan-buy-btn" data-action="stripe-checkout" data-plan="${id}">購入する →</button>`
        : "";
      return `<div class="plan-card${isActive ? " selected" : ""}${id === POPULAR ? " popular" : ""}">
        ${id === POPULAR ? `<span class="popular-badge">人気</span>` : ""}
        <strong class="plan-name">${p.label}</strong>
        <em class="plan-price">${p.price}</em>
        <small class="plan-note">${p.note}</small>
        ${isActive ? `<span class="plan-check">✓ 使用中</span>` : buyBtn}
      </div>`;
    }).join("")}
    </div>
    <div class="plan-stripe-note">
      <span>💳 Stripe決済（クレジットカード対応）</span>
      <span>🔒 SSL暗号化で安全に処理されます</span>
      ${currentPlan !== "free" && currentPlan !== "trial" ? `<span>✓ 現在：<strong>${escapeHtml(PLANS[currentPlan]?.label || currentPlan)}プラン</strong></span>` : ""}
    </div>
    <details class="plan-trial-section">
      <summary class="plan-trial-toggle">🧪 モニター・テスターの方はこちら</summary>
      <div class="plan-trial-body">
        <p class="plan-trial-desc">招待コードをお持ちの方は入力してください。全機能を無制限でお試しいただけます。</p>
        <div class="plan-trial-form">
          <input id="trial-code-input" type="text" class="plan-trial-input" placeholder="モニターコードを入力" autocomplete="off" spellcheck="false">
          <button id="trial-activate-btn" class="action primary" data-action="activate-trial">参加する</button>
        </div>
        ${currentPlan === "trial" ? `<p class="plan-trial-active">✓ モニタープランで参加中です（全機能無制限）</p>` : ""}
      </div>
    </details>
  </section>`;
}
function menuHtml() {
  return `<main class="home menu-page">
    <div class="menu-head"><button class="back" data-action="plan-page">← プラン変更</button><span class="plan-badge">${planInfo().label}プラン</span></div>
    <div class="home-hero">
      <h1 class="home-hero-title">FoodPilot</h1>
      <p class="home-hero-sub">食品業界向け AI 搭載商品管理 SaaS</p>
    </div>
    <div class="how-steps">
      <div class="how-step">
        <span class="how-num">1</span>
        <div class="how-step-body">
          <span class="how-step-title">商品情報を入力</span>
          <small>商品名・原材料・栄養成分など</small>
        </div>
      </div>
      <div class="how-arrow">▶</div>
      <div class="how-step">
        <span class="how-num">2</span>
        <div class="how-step-body">
          <span class="how-step-title">ラベルを確認</span>
          <small>右側にリアルタイムで表示</small>
        </div>
      </div>
      <div class="how-arrow">▶</div>
      <div class="how-step">
        <span class="how-num">3</span>
        <div class="how-step-body">
          <span class="how-step-title">印刷・保存</span>
          <small>PDF印刷または画像コピー</small>
        </div>
      </div>
    </div>
    <div class="home-actions">
      <button class="home-card" data-action="new">
        <div class="home-card-icon">＋</div>
        <div class="home-card-body"><span>新しいラベルを作成</span><small>商品情報を入力してラベルを作ります</small></div>
        <span class="home-card-arrow">→</span>
      </button>
      <button class="home-card" data-action="saved">
        <div class="home-card-icon">📋</div>
        <div class="home-card-body"><span>保存済みラベルを開く</span><small>保存済みラベルを選んで表示・印刷します</small></div>
        <span class="home-card-arrow">→</span>
      </button>
    </div>
    <div class="recent-strip"><span class="recent-label">保存済み</span><span>${products.length}件のラベル</span><button class="help-link" data-action="show-tutorial">？ 使い方を見る</button></div>
  </main>`;
}
function headerHtml(title, showSave = true) {
  const saveStatusCls = autoSaveStatus === "保存済み" ? "autosave-ok" : autoSaveStatus === "保存中" ? "autosave-saving" : "autosave-editing";
  const saveStatusHtml = autoSaveStatus ? `<span class="autosave-status ${saveStatusCls}">${escapeHtml(autoSaveStatus)}</span>` : "";
  return `<header class="topbar"><button class="back" data-action="back-to-saas">← 商品管理</button><h1>${escapeHtml(title)}</h1><div class="topbar-right">${saveStatusHtml}<span class="plan-badge">${planInfo().label}</span>${showSave ? `<button class="action primary" data-action="save">保存</button>` : ""}</div></header>`;
}
function savedHtml() {
  let filtered = products.filter((p) => {
    if (savedFilter === "starred" && !p.starred) return false;
    if (savedSearch && !String(p.name || "").toLowerCase().includes(savedSearch.toLowerCase())) return false;
    return true;
  });
  if (savedSort === "name") filtered = [...filtered].sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ja"));
  const batchBtn = selectedForPrint.size > 0
    ? `<button class="action primary" data-action="batch-print">🖨 ${selectedForPrint.size}件をまとめて印刷</button>` : "";
  return `<div class="page">${headerHtml("保存済みラベル", false)}
    <div class="content narrow">
      <div class="saved-toolbar">
        <input class="search-box" placeholder="商品名で検索..." data-saved-search value="${escapeHtml(savedSearch)}">
        <div class="saved-controls-row">
          <div class="btn-group">
            <button class="${savedSort === "updatedAt" ? "selected" : ""}" data-saved-sort="updatedAt">更新日順</button>
            <button class="${savedSort === "name" ? "selected" : ""}" data-saved-sort="name">名前順</button>
          </div>
          <div class="btn-group">
            <button class="${savedFilter === "all" ? "selected" : ""}" data-saved-filter="all">すべて (${products.length})</button>
            <button class="${savedFilter === "starred" ? "selected" : ""}" data-saved-filter="starred">★ お気に入り</button>
          </div>
          <div class="btn-group">
            <button class="action" data-action="export-csv">↓ CSV出力</button>
            <label class="action csv-label">↑ CSV読込<input type="file" accept=".csv" data-csv-import style="display:none"></label>
          </div>
          <div class="btn-group">
            <button class="action share-btn" data-action="export-json" title="原材料・アレルゲン情報含む完全データを出力">📤 共有用JSON出力</button>
            <label class="action share-btn csv-label" title="チームメンバーから受け取ったJSONを取り込む">📥 JSON取込<input type="file" accept=".json" data-json-import style="display:none"></label>
          </div>
          ${batchBtn}
        </div>
      </div>
      <div class="product-grid">
        ${filtered.length === 0
          ? `<p class="empty-msg">該当する商品がありません</p>`
          : filtered.map((p) => {
              const d = derive(p);
              const sel = selectedForPrint.has(p.id);
              const costs = calcCosts(p);
              const hasCost = costs.totalCost > 0;
              const modeLabel = (p.costMode||"direct") === "direct" ? "直接入力" : "原材料計算";
              const costChips = hasCost ? `
                <div class="card-cost-row">
                  <span class="cost-chip">原価 ${costs.totalCost > 0 ? "¥"+Math.round(costs.totalCost).toLocaleString() : "—"}</span>
                  ${costs.price > 0 ? `<span class="cost-chip">売価 ¥${Math.round(costs.price).toLocaleString()}</span>` : ""}
                  ${costs.price > 0 ? `<span class="cost-chip profit ${costRateClass(costs.costRate)}">利益 ¥${Math.round(costs.gross).toLocaleString()} (${100-(costs.costRate||0)}%)</span>` : ""}
                  <span class="cost-chip mode">${modeLabel}</span>
                </div>` : "";
              return `<article class="product-card${sel ? " sel-print" : ""}">
                <div class="card-top-row">
                  <label class="card-check-wrap"><input type="checkbox" data-sel-print="${escapeHtml(p.id)}"${sel ? " checked" : ""}><span>選択</span></label>
                  <button class="star-btn${p.starred ? " on" : ""}" data-toggle-star="${escapeHtml(p.id)}" title="お気に入り">${p.starred ? "★" : "☆"}</button>
                </div>
                <h3>${escapeHtml(p.name || "（名称未入力）")}</h3>
                <p class="card-meta">更新: ${escapeHtml(p.updatedAt || "")} ／ 内容量: ${escapeHtml(p.volume || "未入力")}</p>
                <div class="chips">${(d.allergens || []).slice(0, 5).map((a) => `<span>${escapeHtml(a)}</span>`).join("")}</div>
                ${costChips}
                <div class="card-actions">
                  <button data-edit="${escapeHtml(p.id)}">編集</button>
                  <button data-dup="${escapeHtml(p.id)}">複製</button>
                  <button class="danger" data-del="${escapeHtml(p.id)}">削除</button>
                </div>
              </article>`;
            }).join("")}
      </div>
    </div>
  </div>`;
}
function editorHtml(p) {
  const d = derive(p);
  const { pct, missing } = calcCompletion(p, d);
  const pctColor = pct >= 100 ? "#16a34a" : pct >= 60 ? "#2563eb" : "#d97706";
  const completionHtml = `<div class="completion-bar-wrap">
    <div class="completion-bar-head">
      <span>入力完成度</span>
      <strong style="color:${pctColor}">${pct}%</strong>
      ${missing.length ? `<span class="completion-missing">未入力：${missing.join("・")}</span>` : `<span class="completion-ok">✓ すべて入力済み</span>`}
    </div>
    <div class="completion-bar-track"><div class="completion-bar-fill" style="width:${pct}%;background:${pctColor}"></div></div>
  </div>`;
  const recentStorageOpts = recentStorage.filter((s) => STORAGE_OPTS.includes(s));
  const storageHtml = `${recentStorageOpts.length ? `<div class="recent-storage-label">よく使う保存方法</div><div class="choice-grid">${recentStorageOpts.map((s) => `<button class="${p.storage === s ? "selected" : ""}" data-storage="${escapeHtml(s)}">${p.storage === s ? "✓ " : ""}${escapeHtml(s)}</button>`).join("")}</div><div class="recent-storage-label">すべての保存方法</div>` : ""}<div class="choice-grid">${STORAGE_OPTS.map((s) => `<button class="${p.storage === s ? "selected" : ""}" data-storage="${escapeHtml(s)}">${p.storage === s ? "✓ " : ""}${escapeHtml(s)}</button>`).join("")}</div>${p.storage === "自由入力" ? `<label class="field"><span>保存方法</span><input data-field="storageCustom" value="${escapeHtml(p.storageCustom)}"></label>` : ""}`;
  const mobileTabHtml = `<div class="mobile-tab-bar"><button class="mobile-tab${mobilePreviewTab==="form"?" active":""}" data-mobile-tab="form">✏️ 入力</button><button class="mobile-tab${mobilePreviewTab==="preview"?" active":""}" data-mobile-tab="preview">👁 プレビュー</button></div>`;
  return `<div class="page">${headerHtml(p.name || "新商品ラベル作成")}${mobileTabHtml}
    <div class="editor-shell">
      <div class="form-column${mobilePreviewTab==="preview"?" mobile-hidden":""}">`+`
        ${completionHtml}
        ${section("商品情報", productInfoHtml(p))}
        ${janCodeHtml(p)}
        ${section("保存方法", storageHtml)}
        ${section("原材料", (() => {
          const totalW = p.ingredients.reduce((s, i) => s + (parseFloat(i.weight) || 0), 0);
          const ingListHtml = p.ingredients.map((i, idx) => {
            const pct = totalW > 0 && parseFloat(i.weight) ? Math.round(parseFloat(i.weight) / totalW * 100) : null;
            const pctBadge = pct !== null ? `<span class="ing-pct">${pct}%</span>` : "";
            const est = i.name && i.weight ? estimateNutrition(i.name) : null;
            return `<div class="ing-row" draggable="true" data-ing-idx="${idx}">
              <span class="drag-handle" title="ドラッグで並び替え">⠿</span>
              <input list="ing-master-list" data-ing-name="${idx}" value="${escapeHtml(i.name)}" placeholder="原材料名">
              <input type="number" data-ing-weight="${idx}" value="${escapeHtml(i.weight)}" placeholder="g">
              ${pctBadge}
              <div class="badges">${isAdditive(i.name) ? `<b class="violet">添加物</b>` : ""}${est ? `<b class="${est.estimated ? "amber" : "green"}">${est.estimated ? "推定" : "DB"}</b>` : ""}</div>
              <button class="icon-btn" data-remove-ing="${idx}">×</button>
            </div>`;
          }).join("");
          const sortBtns = `<div class="ing-sort-row">
            <button class="action-sub" data-action="sort-by-weight">重量順に並べ直す</button>
            <button class="action-sub" data-action="sort-additives">添加物を末尾へ</button>
          </div>`;
          const preview = d.ingLabel ? `<div class="ing-preview-wrap"><div class="ing-preview-label">ラベル表示プレビュー</div><div class="ing-preview">${escapeHtml(d.ingLabel)}</div></div>` : "";
          const bulkPasteHtml = ingBulkPasteOpen ? `<div class="bulk-paste-area"><p class="notice">1行に1つ入力。「原材料名 重量」形式で重量も入力できます</p><textarea id="bulk-paste-textarea" rows="6" placeholder="例：&#10;小麦粉 100&#10;砂糖 50&#10;食塩&#10;加工でん粉"></textarea><div class="bulk-paste-btns"><button class="action primary" data-action="confirm-bulk-paste">追加する</button><button class="action" data-action="toggle-bulk-paste">閉じる</button></div></div>` : "";
          return `<div class="ing-list" id="ing-list">${ingListHtml}</div><div class="ing-add-row"><button class="action" data-action="add-ing">＋ 1件追加</button><button class="action-sub" data-action="toggle-bulk-paste">📋 まとめて入力</button></div>${bulkPasteHtml}${sortBtns}${preview}`;
        })())}
        ${nutritionEditorHtml(p, d)}
        ${allergenEditorHtml(p, d)}
        ${contaminationEditorHtml(p)}
        ${labelAssistHtml(p, d)}
        ${manufacturerEditorHtml(p)}
        ${section("印刷・サイズ設定", printSettingsBodyHtml())}
        ${historyHtml(p)}
        <datalist id="ing-master-list">${[...ingMaster, ...Object.keys(NUTRITION_DB)].filter((v,i,a)=>a.indexOf(v)===i && !v.includes("/") && !v.includes("／")).map(n => `<option value="${escapeHtml(n)}">`).join("")}</datalist>
      </div>
      <div class="preview-column${mobilePreviewTab==="form"?" mobile-hidden":""}">${previewHtml(p, d)}</div>
    </div>
    <button class="fab-save" data-action="save" title="保存する">保存する</button>
  </div>`;
}
function section(title, body, accent = false) {
  const open = openSections.has(title);
  return `<section class="section${accent ? " accent" : ""}${open ? " open" : ""}">
    <button class="section-header" data-toggle-section="${escapeHtml(title)}">
      <span class="section-title-text">${escapeHtml(title)}</span>
      <span class="section-chevron">${open ? "▲" : "▼"}</span>
    </button>
    <div class="section-body"${open ? "" : ' style="display:none"'}>${body}</div>
  </section>`;
}
function calcCompletion(p, d) {
  const items = [
    { ok: !!p.name?.trim(), label: "名称" },
    { ok: p.ingredients.some((i) => i.name?.trim()), label: "原材料名" },
    { ok: !!p.volume?.trim(), label: "内容量" },
    { ok: !!p.bestBefore?.trim(), label: "賞味期限" },
    { ok: !!d.storage?.trim(), label: "保存方法" },
    { ok: !!p.manufacturerName?.trim(), label: "製造者名" },
    { ok: !!p.manufacturerAddress?.trim(), label: "製造者住所" },
  ];
  const filled = items.filter((i) => i.ok).length;
  const pct = Math.round((filled / items.length) * 100);
  const missing = items.filter((i) => !i.ok).map((i) => i.label);
  return { pct, missing };
}
function manufacturerEditorHtml(p) {
  const selected = selectedMfrTypes(p);
  const tplHtml = mfrTemplates.length
    ? `<div class="mfr-tpl-row"><select data-mfr-tpl-select><option value="">テンプレートを選択...</option>${mfrTemplates.map((t, i) => `<option value="${i}">${escapeHtml(t.label)}</option>`)}</select><button class="action" data-action="del-mfr-tpl">削除</button></div>`
    : "";
  return section("製造者・製造所・加工者", `${tplHtml}<div class="mfr-choice">${MFR_TYPES.map((t) => `<button class="${selected.includes(t) ? "selected" : ""}" data-mfr="${t}">${selected.includes(t) ? "✓ " : ""}${t}</button>`).join("")}</div><p class="notice">複数選択できます。</p><label class="field"><span>名称<b>必須</b></span><input data-field="manufacturerName" value="${escapeHtml(p.manufacturerName)}" placeholder="例：株式会社APW"></label><div class="two-col"><label class="field"><span>郵便番号</span><input data-field="manufacturerPostal" value="${escapeHtml(p.manufacturerPostal)}"></label><label class="field"><span>電話番号</span><input data-field="manufacturerPhone" value="${escapeHtml(p.manufacturerPhone)}"></label></div><label class="field"><span>住所</span><input data-field="manufacturerAddress" value="${escapeHtml(p.manufacturerAddress)}"></label><div class="mfr-tpl-save-row"><input id="mfr-tpl-name" placeholder="テンプレート名（例：本店・工場）"><button class="action" data-action="save-mfr-tpl">テンプレートとして保存</button></div>`);
}
const HISTORY_DIFF_FIELDS = [
  ["名称", x => x.name || ""],
  ["内容量", x => x.volume || ""],
  ["賞味期限", x => x.bestBefore || ""],
  ["保存方法", x => (x.storage||"")+(x.storageCustom||"")],
  ["製造者名", x => x.manufacturerName || ""],
  ["製造者住所", x => x.manufacturerAddress || ""],
  ["カテゴリ", x => x.category || ""],
  ["原産地", x => x.originCountry || ""],
  ["原材料数", x => String((x.ingredients||[]).filter(i=>i.name?.trim()).length)],
];
function calcHistoryDiff(snap, current) {
  return HISTORY_DIFF_FIELDS.filter(([, fn]) => fn(snap) !== fn(current)).map(([l]) => l);
}
function historyHtml(p) {
  const hist = loadHistory(p.id);
  if (!hist.length) return "";
  const rows = hist.map((h, i) => {
    const diff = calcHistoryDiff(h.snapshot, p);
    return `<div class="history-row">
      <span class="history-date">${escapeHtml(h.savedAt)}</span>
      ${diff.length
        ? `<span class="history-diff-chip">変更: ${diff.map(l=>escapeHtml(l)).join("・")}</span>`
        : `<span class="history-diff-chip history-diff-same">変更なし</span>`}
      <button class="action" data-restore-history="${i}" data-history-pid="${escapeHtml(p.id)}">この時点に戻す</button>
    </div>`;
  }).join("");
  return section("変更履歴", `<div class="history-list">${rows}</div>`);
}
function detectBestBeforeMode(v) {
  if (!v) return "date";
  if (/^製造日より\d+日$/.test(v)) return "days";
  if (/^製造日より\d+[かヶ]月$/.test(v)) return "months";
  if (/^\d{4}[./-]/.test(v) || /^\d{4}-\d{2}-\d{2}$/.test(v) || /^\d{4}年/.test(v)) return "date";
  return "text";
}
function productInfoHtml(p) {
  const volume = splitVolume(p.volume);
  const isCustomUnit = !!p.volumeCustomUnit || (!!volume.unit && !VOLUME_UNITS.includes(volume.unit));
  const activeUnit = isCustomUnit ? "その他" : (volume.unit || "個");
  const dateValue = toDateInputValue(p.bestBefore);
  const bbMode = detectBestBeforeMode(p.bestBefore);
  const bbDays   = (p.bestBefore||"").match(/製造日より(\d+)日/)?.[1] || "";
  const bbMonths = (p.bestBefore||"").match(/製造日より(\d+)[かヶ]月/)?.[1] || "";
  const bbModes = [
    ["date",   "年月日"],
    ["days",   "製造日より○日"],
    ["months", "製造日より○ヶ月"],
    ["text",   "自由入力"],
  ];
  const bbInput = bbMode === "date"
    ? `<input type="date" data-date-input value="${escapeHtml(dateValue)}">
       <div class="unit-tabs date-tabs">${DATE_PRESETS.map(([id, label]) => `<button data-date-preset="${id}">${escapeHtml(label)}</button>`).join("")}</div>`
    : bbMode === "days"
    ? `<div class="bb-num-wrap"><input type="number" data-bb-days value="${escapeHtml(bbDays)}" min="1" max="3650" placeholder="90" style="width:90px"><span class="bb-unit">日</span></div>`
    : bbMode === "months"
    ? `<div class="bb-num-wrap"><input type="number" data-bb-months value="${escapeHtml(bbMonths)}" min="1" max="120" placeholder="3" style="width:90px"><span class="bb-unit">ヶ月</span></div>`
    : `<input data-field="bestBefore" value="${escapeHtml(p.bestBefore||"")}" placeholder="例：製造日より90日">`;
  const bbPreview = p.bestBefore ? `<div class="bb-preview">ラベル表示：<strong>${escapeHtml(p.bestBefore)}</strong></div>` : "";
  return `<div class="two-col">
      <label class="field"><span>社内名称<span class="field-note">管理用・ラベル非表示</span></span><input data-field="internalName" value="${escapeHtml(p.internalName||"")}" placeholder="例：ドーナツ プレーン"></label>
      <label class="field"><span>名称（表示名）<b>必須</b></span><input data-field="name" value="${escapeHtml(p.name)}" placeholder="例：油菓子"></label>
    </div>
    <div class="two-col">
      <div class="field">
        <span>内容量</span>
        <div class="volume-row">
          <input class="volume-amount-input" inputmode="decimal" data-volume-amount value="${escapeHtml(volume.amount)}" placeholder="数量（例：6）">
          <div class="unit-tabs volume-unit-tabs">${VOLUME_UNITS.map((u) => `<button class="${activeUnit === u ? "selected" : ""}" data-volume-unit="${escapeHtml(u)}">${escapeHtml(u)}</button>`).join("")}</div>
        </div>
        ${activeUnit === "その他" ? `<input data-volume-custom-unit value="${escapeHtml(isCustomUnit ? volume.unit : "")}" placeholder="単位を入力 例：ホール・パック・瓶" style="margin-top:6px">` : ""}
        ${p.volume ? `<div class="bb-preview">ラベル表示：<strong>${escapeHtml(p.volume)}</strong></div>` : `<div class="bb-preview" style="color:#f87171">数量を入力してください</div>`}
      </div>
      <div class="field">
        <span>賞味期限</span>
        <div class="unit-tabs bb-mode-tabs">${bbModes.map(([id, label]) => `<button class="${bbMode===id?"selected":""}" data-bb-mode="${id}">${escapeHtml(label)}</button>`).join("")}</div>
        ${bbInput}
        ${bbPreview}
      </div>
    </div>`;
}
function janCodeHtml(p) {
  if (!canUseJanCode()) {
    return section("JANコード", `<p class="notice">JANコードはスタンダード以上のプランで追加できます。</p>`);
  }
  const digits = normalizedJan(p.janCode);
  const ok = !digits || digits.length === 8 || digits.length === 13;
  return section("JANコード", `<label class="field${ok ? "" : " invalid"}"><span>JANコード</span><input inputmode="numeric" data-field="janCode" value="${escapeHtml(p.janCode || "")}" placeholder="例：4901234567894"></label>${ok && digits ? janBarcodeSvg(digits) : ""}<p class="notice">JANコードは通常8桁または13桁です。ラベルには番号とバーコードを表示します。</p>`);
}
function nutritionEditorHtml(p, d) {
  const n = p.nutritionMode === "manual" ? { ...d.autoNutrition, ...p.nutritionManual } : d.autoNutrition;
  const disabled = p.nutritionMode === "manual" ? "" : "disabled";
  const row = (key, label, unit) => `<label><span>${label}</span><input type="number" ${disabled} data-nutr="${key}" value="${escapeHtml(n[key])}"><small>${unit}</small></label>`;
  const nutrUnit = p.nutritionUnit || "100g当たり";
  const nutrUnits = ["100g当たり", "1食分当たり", "1個当たり"];
  const unitSelector = `<div class="nutr-unit-row"><span class="nutr-unit-label">表示単位：</span>${nutrUnits.map(u => `<button class="nutr-unit-btn${nutrUnit===u?" selected":""}" data-field="nutritionUnit" data-value="${u}">${u}</button>`).join("")}</div>`;
  return section("栄養成分表示", `${unitSelector}<div class="mode-row"><button class="${p.nutritionMode !== "manual" ? "selected" : ""}" data-nutr-mode="auto">自動計算</button><button class="${p.nutritionMode === "manual" ? "selected" : ""}" data-nutr-mode="manual">自分で編集</button></div><div class="nutrition-grid">${row("kcal", "エネルギー", "kcal")}${row("protein", "たんぱく質", "g")}${row("fat", "脂質", "g")}${row("carbs", "炭水化物", "g")}${row("salt", "食塩相当量", "g")}</div>${d.autoNutrition.hasEst ? `<p class="notice">一部の原材料は近い食品成分データで推定しています。</p>` : ""}`, true);
}
function allergenEditorHtml(p, d) {
  const autoBody = d.autoAllergens.length
    ? `<div class="chips allergen">${d.autoAllergens.map((a) => `<span>${escapeHtml(a)}</span>`).join("")}</div>
       <p class="notice" style="margin-top:6px;font-size:11px;color:#92400e;background:#fffbeb;border-color:#fde68a">
         ⚠ <strong>自動推定です。必ず目視で確認してください。</strong><br>
         原材料名の表記が正確でない場合、検出もれや誤検出があります。確認後「自分で編集」で修正してください。
       </p>`
    : `<em style="color:#64748b">検出なし</em>
       <p class="notice" style="margin-top:6px;font-size:11px">原材料名を入力するとアレルゲンを自動検出します。「自分で編集」で手動指定も可能です。</p>`;
  return section("アレルゲン", `<div class="mode-row"><button class="${p.allergensMode !== "manual" ? "selected" : ""}" data-alg-mode="auto">自動検出</button><button class="${p.allergensMode === "manual" ? "selected" : ""}" data-alg-mode="manual">自分で編集</button></div>${p.allergensMode === "manual" ? `<input class="wide-input" data-field="allergensManual" value="${escapeHtml(p.allergensManual || "")}" placeholder="例：小麦、卵、乳"><p class="notice" style="margin-top:6px;font-size:11px">食品表示基準の特定原材料（8品目）および特定原材料に準ずるもの（20品目）を確認してください。</p>` : autoBody}`);
}
function contaminationEditorHtml(p) {
  return section("コンタミネーション", `<div class="mode-row"><button class="${!p.contaminationEnabled ? "selected" : ""}" data-contamination="off">表示しない</button><button class="${p.contaminationEnabled ? "selected" : ""}" data-contamination="on">表示する</button></div>${p.contaminationEnabled ? `<label class="field"><span>対象アレルゲン</span><input data-field="contaminationAllergens" value="${escapeHtml(p.contaminationAllergens || "")}" placeholder="例：小麦、卵、乳成分"></label><label class="field"><span>表示文</span><input data-field="contaminationText" value="${escapeHtml(p.contaminationText || "")}" placeholder="例：本品製造工場では、小麦・卵・乳成分を含む製品を製造しています。"></label><p class="notice">表示文が空の場合、対象アレルゲンから定型文を作ります。</p>` : `<p class="notice">同じ工場・同じラインで扱うアレルゲンがある場合に使います。</p>`}`);
}
function labelAssistHtml(p, d) {
  const checks = labelChecklist(p, d);
  const okCount = checks.filter((c) => c.ok).length;
  const aiCheckHtml = (() => {
    if (aiLabelCheckLoading) return `<div class="ai-check-loading">🤖 AIが食品表示法を照合中...</div>`;
    if (aiLabelCheckResult) return `<div class="ai-check-result">${renderMarkdown(aiLabelCheckResult)}<button class="action-sub" data-action="run-ai-label-check" style="margin-top:8px">再チェック</button></div>`;
    return `<button class="action ai-check-btn" data-action="run-ai-label-check">🔍 AI食品表示法チェック</button>`;
  })();
  return section("表示チェックリスト", `
    <div class="assist-actions">
      <button class="action primary" data-action="normalize-label">食品表示向けに整える</button>
      <button class="action ai-consult-btn" data-action="open-ai-panel">💬 AIに相談</button>
    </div>
    ${assistMessage ? `<p class="notice success">${escapeHtml(assistMessage)}</p>` : ""}
    <div class="checklist-summary"><span>${okCount} / ${checks.length} 項目OK</span>${okCount < checks.length ? `<span class="checklist-warn-hint">⬇ 要確認項目をクリックで該当欄へジャンプ</span>` : ""}</div>
    <div class="check-list">${checks.map((item) => `<div class="${item.ok ? "check-ok" : "check-warn check-jumpable"}" ${!item.ok ? `data-jump-label="${escapeHtml(item.label)}" title="クリックで該当欄へ移動"` : ""}><b>${item.ok ? "✓" : "!"}</b><span>${escapeHtml(item.label)}</span></div>`).join("")}</div>
    <div class="ai-check-wrap">${aiCheckHtml}</div>
    <p class="notice">この機能は表示補助です。法令適合の最終確認は事業者の責任で行ってください。</p>`);
}
function labelChecklist(p, d) {
  const ingWithWeight = p.ingredients.filter((i) => i.name?.trim() && Number(i.weight) > 0);
  const ingAny = p.ingredients.some((i) => i.name?.trim());
  const hasWeight = ingWithWeight.length > 0;
  return [
    { label: p.name?.trim() ? "名称が入力されています" : "名称が未入力です → 商品情報で入力してください", ok: !!p.name?.trim() },
    { label: ingAny ? "原材料名が入力されています" : "原材料名が未入力です → 原材料セクションで追加してください", ok: ingAny },
    { label: hasWeight ? "原材料の重量が入力されています（栄養成分を自動計算）" : "原材料重量：任意入力（重量を入力すると栄養成分を自動計算できます）", ok: true },
    { label: p.volume?.trim() ? "内容量が入力されています" : "内容量が未入力です → 商品情報で入力してください", ok: !!p.volume?.trim() },
    { label: p.bestBefore?.trim() ? "賞味期限が入力されています" : "賞味期限が未入力です → 商品情報で入力してください", ok: !!p.bestBefore?.trim() },
    { label: d.storage?.trim() ? "保存方法が入力されています" : "保存方法が未入力です → 保存方法セクションで選択してください", ok: !!d.storage?.trim() },
    { label: p.manufacturerName?.trim() ? "製造者名が入力されています" : "製造者名が未入力です → 製造者セクションで入力してください", ok: !!p.manufacturerName?.trim() },
    { label: p.manufacturerAddress?.trim() ? "製造者住所が入力されています" : "製造者住所が未入力です → 製造者セクションで入力してください", ok: !!p.manufacturerAddress?.trim() },
    { label: d.nutrition.kcal > 0 ? "栄養成分が計算・設定されています" : "栄養成分は未計算（任意：原材料に重量を入力するか手動で設定してください）", ok: true },
    { label: "アレルゲンを確認済み（自動検出または手動設定）", ok: p.allergensMode === "manual" || d.autoAllergens.length >= 0 },
    { label: p.contaminationEnabled ? (buildContaminationText(p) ? "コンタミネーション表示が設定されています" : "コンタミネーションの内容が未設定です") : "コンタミネーション：表示しない設定", ok: p.contaminationEnabled ? !!buildContaminationText(p) : true },
    { label: !p.janCode || [8, 13].includes(normalizedJan(p.janCode).length) ? "JANコードの桁数が正しい" : "JANコードは8桁または13桁にしてください", ok: !p.janCode || [8, 13].includes(normalizedJan(p.janCode).length) },
  ];
}
function previewHtml(p, d) {
  const targetChoices = [["label", "表示ラベルのみ"], ["nutrition", "栄養成分表示のみ"], ["both", "両方"]];
  const labelStyle = `style="width:${escapeHtml(printCfg.w || "90")}mm;${printCfg.h ? `min-height:${escapeHtml(printCfg.h)}mm;` : ""}font-size:${escapeHtml(printCfg.fs || "7.5")}pt;"`;
  const printable = printablePreviewHtml(p, d, labelStyle, true);
  const ZOOM_OPTS = [50, 75, 100, 150];
  const isJissun = previewZoom === "実寸";
  const zoomStyle = isJissun
    ? `padding:${escapeHtml(printCfg.margin || "3")}mm;width:fit-content;`
    : `padding:${escapeHtml(printCfg.margin || "3")}mm;transform:scale(${Number(previewZoom) / 100});transform-origin:top left;width:fit-content;`;
  return `<aside class="preview-panel">
    <div class="preview-top-bar">
      <div class="target-tabs">${targetChoices.map(([id, label]) => `<button class="${printTarget === id ? "selected" : ""}" data-target-choice="${id}">${label}</button>`).join("")}</div>
      <div class="zoom-controls">
        ${ZOOM_OPTS.map((z) => `<button class="zoom-btn${previewZoom === z ? " selected" : ""}" data-zoom="${z}">${z}%</button>`).join("")}
        <button class="zoom-btn${isJissun ? " selected" : ""}" data-zoom="実寸">実寸</button>
      </div>
    </div>
    ${isJissun ? `<div class="jissun-badge">📐 実寸表示中（画面解像度に依存します）</div>` : ""}
    <div class="preview-area-wrap">
      <div id="print-area" style="${zoomStyle}">${printable}</div>
    </div>
    <div class="output-actions">
      <button class="action print-btn" data-action="open-print-preview">🖨 印刷プレビュー</button>
      <button class="action secondary" data-action="copy-image-output">画像コピー</button>
      <button class="action" data-action="download-image">⬇ 画像保存</button>
      <button class="action" data-action="copy-output">文字コピー</button>
    </div>
    <p class="label-disclaimer">※ 表示内容の最終確認・法令適合の判断は事業者様の責任で行ってください。</p>
    ${printPreviewOpen ? printPreviewModalHtml(printable) : ""}
    ${showAiPanel ? aiPanelHtml(p, d) : ""}
  </aside>`;
}
function printablePreviewHtml(p, d, labelStyle, showHeadings) {
  return `<div class="print-stack">${printTarget !== "nutrition" ? `<div>${showHeadings ? `<h2 class="preview-heading">表示ラベル</h2>` : ""}<div class="print-sized" ${labelStyle}>${basicLabelHtml(p, d)}${contaminationNoteHtml(d)}</div></div>` : ""}${printTarget !== "label" ? `<div>${showHeadings ? `<h2 class="preview-heading">栄養成分表示</h2>` : ""}<div class="print-sized" ${labelStyle}>${nutritionLabelHtml(d)}</div></div>` : ""}</div>`;
}
function contaminationNoteHtml(d) {
  if (!d.contamination) return "";
  return `<div class="contamination-note">※${escapeHtml(d.contamination)}</div>`;
}
function printPreviewModalHtml(printable) {
  return `<div class="print-preview-modal"><div class="print-preview-card"><div class="print-preview-head"><div><b>印刷前確認</b><span>ブラウザの印刷ダイアログで表示されない場合も、ここでサイズ感を確認できます。</span></div><button class="action" data-action="close-print-preview">閉じる</button><button class="action primary" data-action="confirm-print">この内容で印刷</button></div><div class="print-preview-sheet" style="padding:${escapeHtml(printCfg.margin || "3")}mm;">${printable}</div></div></div>`;
}
function printSettingsBodyHtml() {
  const previewNote = printPreviewSupportHtml();
  return `<div class="print-controls"><label class="field"><span>サイズプリセット</span><select data-size>${SIZE_PRESETS.map((s) => `<option ${s.label === printCfg.label ? "selected" : ""}>${s.label}</option>`).join("")}</select></label></div>
    <div class="size-controls">
      <label class="field"><span>幅(mm)</span><input type="number" data-print-cfg="w" value="${escapeHtml(printCfg.w || "")}" placeholder="90"></label>
      <label class="field"><span>高さ(mm)</span><input type="number" data-print-cfg="h" value="${escapeHtml(printCfg.h || "")}" placeholder="自動"></label>
      <label class="field"><span>余白(mm)</span><input type="number" data-print-cfg="margin" value="${escapeHtml(printCfg.margin || "")}" placeholder="3"></label>
      <label class="field"><span>文字(pt)</span><input type="number" step="0.1" data-print-cfg="fs" value="${escapeHtml(printCfg.fs || "")}" placeholder="7.5"></label>
    </div>
    <div class="offset-controls">
      <span class="offset-label">印刷位置補正</span>
      <label><span>上下(mm)</span><input type="number" step="0.5" data-print-offset="y" value="${escapeHtml(printOffsetY)}" placeholder="0"></label>
      <label><span>左右(mm)</span><input type="number" step="0.5" data-print-offset="x" value="${escapeHtml(printOffsetX)}" placeholder="0"></label>
    </div>
    ${previewNote}`;
}
function printPreviewSupportHtml() {
  const w = Number(printCfg.w || 0);
  const h = Number(printCfg.h || 0);
  const margin = Number(printCfg.margin || 0);
  const fs = Number(printCfg.fs || 0);
  const warnings = [];
  if (!w) warnings.push("幅を入力すると印刷時の大きさに近いプレビューになります。");
  if (w && w < 40) warnings.push("幅がかなり小さいため、文字が入りきらない可能性があります。");
  if (fs && fs < 5.5) warnings.push("文字が小さすぎると印刷で読みにくくなります。");
  if (margin && w && margin * 2 >= w * 0.35) warnings.push("余白が大きく、表示部分が狭くなっています。");
  const sizeText = `${w || "自動"}mm × ${h || "自動"}mm / 余白 ${margin || 0}mm / 文字 ${fs || "自動"}pt`;
  return `<div class="print-support"><b>印刷プレビューサポート</b><span>${escapeHtml(sizeText)}</span>${warnings.length ? `<ul>${warnings.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : `<p>この設定で下の表示ラベルに反映されています。</p>`}</div>`;
}
function copyHtmlStyles() {
  return `
    .print-stack{display:grid;gap:14px;justify-items:start;}
    .preview-heading{margin:0 0 7px;color:#333;font-size:12px;font-weight:700;}
    .print-sized{display:inline-block;max-width:none;}
    .label-paper{width:100%;background:#fff;color:#000;font-family:"Yu Mincho","MS PMincho",serif;line-height:1.35;border:1.5px solid #000;box-sizing:border-box;}
    .label-paper table{border-collapse:collapse;width:100%;}
    .label-paper th,.label-paper td{border:1px solid #000;padding:4px 6px;vertical-align:top;font-size:inherit;}
    .label-paper th{width:5.4em;text-align:justify;text-align-last:justify;white-space:nowrap;font-weight:700;}
    .label-paper td{word-break:break-all;}
    .nutrition-label h3{margin:0;padding:5px 6px;text-align:center;border-bottom:1px solid #000;font-size:1.05em;}
    .nutrition-label p{margin:0;padding:4px 6px;text-align:center;border-bottom:1px solid #000;}
    .nutrition-label td{text-align:right;font-weight:700;}
    .nutrition-label small{display:block;padding:5px 6px;text-align:right;border-top:1px solid #000;}
    .contamination-note{margin-top:4px;color:#111;font-size:.82em;line-height:1.35;background:#fff;}
    .label-barcode-footer{border-top:1px solid #000;margin-top:4px;padding:4px;text-align:center;}
    .jan-barcode{max-width:100%;height:auto;}
  `;
}
function copyHtmlContent(p, d) {
  const labelStyle = `style="width:${escapeHtml(printCfg.w || "90")}mm;${printCfg.h ? `min-height:${escapeHtml(printCfg.h)}mm;` : ""}font-size:${escapeHtml(printCfg.fs || "7.5")}pt;"`;
  return `<style>${copyHtmlStyles()}</style>${printablePreviewHtml(p, d, labelStyle, true)}`;
}
function copyHtmlDocument(html) {
  return `<!doctype html><html><head><meta charset="UTF-8"></head><body>${html}</body></html>`;
}
function basicLabelHtml(p, d) {
  const makerLines = [
    [p.manufacturerName, p.manufacturerPostal ? `〒${p.manufacturerPostal}` : ""].filter(Boolean).join(" "),
    p.manufacturerAddress,
    p.manufacturerPhone,
  ].filter(Boolean);
  const maker = makerLines.map((l) => escapeHtml(l)).join("<br>");
  const rows = [["名称", p.name || "ー"], ["原材料名", d.ingLabel || "ー"], ["内容量", p.volume || "ー"], ["賞味期限", p.bestBefore || "ー"], ["保存方法", d.storage || "ー"]];
  if (p.originCountry?.trim()) rows.push(["原産地", p.originCountry]);
  if (d.allergens.length) rows.push(["アレルゲン", `${d.allergens.join("・")}を含む`]);
  const makerRows = selectedMfrTypes(p).map(type => `<tr><th>${escapeHtml(type)}</th><td>${maker || "ー"}</td></tr>`).join("");
  const barcode = canUseJanCode() ? janBarcodeSvg(p.janCode) : "";
  return `<div class="label-paper basic-label"><table><tbody>${rows.map(([k, v]) => `<tr><th>${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}${makerRows}</tbody></table>${barcode ? `<div class="label-barcode-footer"><div class="barcode-title">JANコード</div>${barcode}</div>` : ""}</div>`;
}
function nutritionLabelHtml(d) {
  const n = d.nutrition;
  return `<div class="label-paper nutrition-label"><h3>栄養成分表示</h3><p>${escapeHtml(d.nutritionUnit||"100g当たり")}</p><table><tbody>
    <tr><th>エネルギー</th><td>${escapeHtml(n.kcal)}kcal</td></tr>
    <tr><th>たんぱく質</th><td>${escapeHtml(n.protein)}g</td></tr>
    <tr><th>脂質</th><td>${escapeHtml(n.fat)}g</td></tr>
    <tr><th>炭水化物</th><td>${escapeHtml(n.carbs)}g</td></tr>
    <tr><th>食塩相当量</th><td>${escapeHtml(n.salt)}g</td></tr>
  </tbody></table><small>この表示値は目安です。${d.autoNutrition.hasEst ? "一部推定値を含みます。" : ""}</small></div>`;
}

function updateCurrent(key, value) {
  const p = currentProduct();
  p[key] = value;
  render();
}

function saveCurrent() {
  const p = currentProduct();
  const exists = products.some((x) => x.id === p.id);
  if (!exists && !canCreateMore()) {
    showModal({
      message: `${planInfo().label}プランは${planInfo().note}です。プランを変更すると追加できます。`,
      onConfirm: () => { view = "home"; render(); },
    });
    return;
  }
  p.updatedAt = new Date().toLocaleDateString("ja-JP");
  if (exists) saveHistory(p);
  products = exists ? products.map((x) => (x.id === p.id ? p : x)) : [p, ...products];
  saveProducts();
  p.ingredients.forEach((i) => { if (i.name?.trim()) saveIngMaster(i.name); });
  view = "edit";
  editId = p.id;
  draft = null;
  autoSaveStatus = "保存済み";
  showStatus("保存しました");
}


function printLabels() {
  const style = document.createElement("style");
  style.id = "print-style";
  style.textContent = `
    @page { margin: 0; size: auto; }
    @media print {
      body > * { display: none !important; }
      #print-area { display: block !important; position: fixed !important; top: ${printOffsetY || 0}mm !important; left: ${printOffsetX || 0}mm !important; background: #fff !important; padding: ${printCfg.margin}mm !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      #print-area .label-paper { width: ${printCfg.w || 90}mm !important; ${printCfg.h ? `min-height: ${printCfg.h}mm !important;` : ""} font-size: ${printCfg.fs || 7.5}pt !important; box-shadow: none !important; break-inside: avoid; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      #print-area .label-paper th, #print-area .label-paper td { font-size: inherit !important; }
      #print-area .print-stack { display: grid !important; gap: 4mm !important; }
      #print-area .preview-heading { display: none !important; }
    }
  `;
  document.head.appendChild(style);
  window.print();
  setTimeout(() => document.getElementById("print-style")?.remove(), 1200);
}

function copyRichHtml(html, text) {
  if (navigator.clipboard?.write && window.ClipboardItem) {
    const blob = new Blob([html], { type: "text/html" });
    const textBlob = new Blob([text], { type: "text/plain" });
    return navigator.clipboard.write([new ClipboardItem({ "text/html": blob, "text/plain": textBlob })]);
  }
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  return Promise.resolve();
}

function imageCopyRows(p, d) {
  const maker = [
    [p.manufacturerName, p.manufacturerPostal ? `〒${p.manufacturerPostal}` : ""].filter(Boolean).join(" "),
    p.manufacturerAddress,
    p.manufacturerPhone,
  ].filter(Boolean).join("\n");
  const rows = [["名称", p.name || "ー"], ["原材料名", d.ingLabel || "ー"], ["内容量", p.volume || "ー"], ["賞味期限", p.bestBefore || "ー"], ["保存方法", d.storage || "ー"]];
  if (p.originCountry?.trim()) rows.push(["原産地", p.originCountry]);
  selectedMfrTypes(p).forEach((type) => rows.push([type, maker || "ー"]));
  if (d.allergens.length) rows.push(["アレルゲン", `${d.allergens.join("・")}を含む`]);
  return rows;
}

function wrapCanvasText(ctx, text, maxWidth) {
  const result = [];
  String(text || "").split("\n").forEach((paragraph) => {
    const chars = paragraph.split("");
    let line = "";
    chars.forEach((ch) => {
      const next = line + ch;
      if (line && ctx.measureText(next).width > maxWidth) { result.push(line); line = ch; }
      else { line = next; }
    });
    result.push(line);
  });
  const lines = result.filter((l) => l !== "");
  return lines.length ? lines : ["ー"];
}

function drawTextLines(ctx, lines, x, y, lineHeight) {
  lines.forEach((line, idx) => ctx.fillText(line, x, y + idx * lineHeight));
}

function drawTableImage(ctx, x, y, width, title, rows, fs, font) {
  const F = font || `"Meiryo","Yu Gothic","MS Gothic",sans-serif`;
  const keyW = Math.min(112, Math.max(78, width * 0.26));
  const pad = 8;
  const lineH = fs * 1.45;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  ctx.lineWidth = 1;
  ctx.font = `${fs}px ${F}`;
  let cy = y;
  if (title) {
    ctx.font = `700 ${fs + 2}px ${F}`;
    ctx.textAlign = "left";
    ctx.fillText(title, x, cy + fs + 2);
    cy += fs + 12;
    ctx.font = `${fs}px ${F}`;
  }
  rows.forEach(([key, value]) => {
    const valueLines = wrapCanvasText(ctx, value, width - keyW - pad * 3);
    const rowH = Math.max(28, valueLines.length * lineH + pad * 1.4);
    ctx.strokeRect(x, cy, width, rowH);
    ctx.beginPath();
    ctx.moveTo(x + keyW, cy);
    ctx.lineTo(x + keyW, cy + rowH);
    ctx.stroke();
    ctx.font = `700 ${fs}px ${F}`;
    ctx.fillText(String(key || ""), x + pad, cy + pad + fs);
    ctx.font = `${fs}px ${F}`;
    drawTextLines(ctx, valueLines, x + keyW + pad, cy + pad + fs, lineH);
    cy += rowH;
  });
  return cy;
}

function drawNutritionImage(ctx, x, y, width, d, fs, font) {
  const n = d.nutrition;
  return drawTableImage(ctx, x, y, width, "", [
    ["100g当たり", ""],
    ["エネルギー", `${n.kcal}kcal`],
    ["たんぱく質", `${n.protein}g`],
    ["脂質", `${n.fat}g`],
    ["炭水化物", `${n.carbs}g`],
    ["食塩相当量", `${n.salt}g`],
    ["備考", `この表示値は目安です。${d.autoNutrition.hasEst ? "一部推定値を含みます。" : ""}`],
  ], fs, font);
}

function crc32(buf) {
  let c = 0xffffffff;
  const table = crc32.t || (crc32.t = Array.from({ length: 256 }, (_, n) => {
    let v = n;
    for (let k = 0; k < 8; k++) v = (v & 1) ? (0xedb88320 ^ (v >>> 1)) : (v >>> 1);
    return v >>> 0;
  }));
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return ((c ^ 0xffffffff) >>> 0);
}
function pngWith300dpi(bytes) {
  // 300 DPI = 11811 pixels/metre (rounded)
  const ppm = 11811;
  const type = new TextEncoder().encode("pHYs");
  const data = new Uint8Array(9);
  const dv = new DataView(data.buffer);
  dv.setUint32(0, ppm);
  dv.setUint32(4, ppm);
  data[8] = 1; // unit = metre
  const payload = new Uint8Array([...type, ...data]);
  const crc = crc32(payload);
  const chunk = new Uint8Array(12 + 9);
  const cdv = new DataView(chunk.buffer);
  cdv.setUint32(0, 9); // data length
  chunk.set(payload, 4);
  cdv.setUint32(13, crc);
  // Insert after IHDR (8-byte sig + 4+4+13+4 = 25 → total 33 bytes)
  const out = new Uint8Array(bytes.length + chunk.length);
  out.set(bytes.slice(0, 33));
  out.set(chunk, 33);
  out.set(bytes.slice(33), 33 + chunk.length);
  return out;
}
// canvas.toBlob() を使用（toDataURL より大容量キャンバスに対して安定）
function canvasToPngBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) { reject(new Error("toBlob failed")); return; }
      resolve(blob);
    }, "image/png");
  });
}

function downloadImageDataUrl(dataUrl) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `food-label-${new Date().toISOString().slice(0, 10)}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  showStatus("\u753b\u50cf\u3092\u4fdd\u5b58\u3057\u307e\u3057\u305f");
}

function showImageSavePanel(dataUrl) {
  document.querySelector(".image-save-modal")?.remove();
  const modal = document.createElement("div");
  modal.className = "print-preview-modal image-save-modal";
  modal.innerHTML = `
    <div class="print-preview-card">
      <div class="print-preview-head">
        <div>
          <b>\u753b\u50cf\u3092\u4fdd\u5b58</b>
          <span>PNG\u753b\u50cf\u3068\u3057\u3066\u4fdd\u5b58\u3067\u304d\u307e\u3059\u3002P-touch\u306b\u53d6\u308a\u8fbc\u3080\u5834\u5408\u306f\u3001\u4fdd\u5b58\u3057\u305f\u753b\u50cf\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002</span>
        </div>
        <button class="action" data-image-close>\u9589\u3058\u308b</button>
        <button class="action primary" data-image-save>\u753b\u50cf\u3092\u4fdd\u5b58</button>
      </div>
      <div class="print-preview-sheet">
        <img src="${dataUrl}" alt="\u98df\u54c1\u8868\u793a\u30e9\u30d9\u30eb\u753b\u50cf" style="max-width:100%;height:auto;background:#fff;border:1px solid #ddd;">
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.querySelector("[data-image-close]").addEventListener("click", () => modal.remove());
  modal.querySelector("[data-image-save]").addEventListener("click", () => downloadImageDataUrl(dataUrl));
  showStatus("\u753b\u50cf\u4fdd\u5b58\u753b\u9762\u3092\u958b\u304d\u307e\u3057\u305f");
}

function openImageSaveWindow(dataUrl) {
  const win = window.open("", "_blank");
  if (!win) return false;
  win.document.open();
  win.document.write(`<!doctype html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>\u753b\u50cf\u4fdd\u5b58</title>
        <style>
          body{font-family:system-ui,-apple-system,"Yu Gothic",sans-serif;margin:24px;background:#f7f4ef;color:#1f1b2d;}
          .bar{display:flex;gap:12px;align-items:center;margin-bottom:16px;}
          a{background:#159c8f;color:white;text-decoration:none;border-radius:10px;padding:12px 18px;font-weight:800;}
          p{margin:0;color:#554f46;}
          img{display:block;max-width:100%;height:auto;background:white;border:1px solid #ddd;box-shadow:0 10px 30px rgba(0,0,0,.12);}
        </style>
      </head>
      <body>
        <div class="bar">
          <a href="${dataUrl}" download="food-label-${new Date().toISOString().slice(0, 10)}.png">\u753b\u50cf\u3092\u4fdd\u5b58</a>
          <p>\u4fdd\u5b58\u30dc\u30bf\u30f3\u304c\u52d5\u304b\u306a\u3044\u5834\u5408\u306f\u3001\u753b\u50cf\u3092\u53f3\u30af\u30ea\u30c3\u30af\u3057\u3066\u4fdd\u5b58\u3057\u3066\u304f\u3060\u3055\u3044\u3002</p>
        </div>
        <img src="${dataUrl}" alt="\u98df\u54c1\u8868\u793a\u30e9\u30d9\u30eb">
      </body>
    </html>`);
  win.document.close();
  return true;
}

function downloadCanvasImage(canvas) {
  const dataUrl = canvas.toDataURL("image/png");
  const opened = openImageSaveWindow(dataUrl);
  showImageSavePanel(dataUrl);
  showStatus(opened ? "\u753b\u50cf\u4fdd\u5b58\u753b\u9762\u3092\u958b\u304d\u307e\u3057\u305f" : "\u753b\u50cf\u4fdd\u5b58\u753b\u9762\u3092\u8868\u793a\u3057\u307e\u3057\u305f");
}

// ③ 高解像度ラベルCanvas構築（copyとsaveで共用）
async function buildLabelCanvas(p, d, scale) {
  scale = scale || 8;
  const pxPerMm = 4;
  const margin = Math.max(8, Number(printCfg.margin || 3) * pxPerMm);
  const contentW = Math.max(260, Number(printCfg.w || 90) * pxPerMm);
  const fs = Math.max(12, Number(printCfg.fs || 7.5) * 1.8);
  const FONT = '"Meiryo","Yu Gothic","MS Gothic",sans-serif';
  const roughRows = imageCopyRows(p, d).length + (printTarget !== "label" ? 8 : 0);
  const canvas = document.createElement("canvas");
  canvas.width  = Math.ceil((contentW + margin * 2) * scale);
  canvas.height = Math.ceil((Math.max(180, roughRows * 42 + margin * 2 + 80)) * scale);
  await document.fonts.ready;
  const ctx = canvas.getContext("2d", { alpha: false });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.scale(scale, scale);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
  let y = margin;
  if (printTarget !== "nutrition") {
    y = drawTableImage(ctx, margin, y, contentW, "", imageCopyRows(p, d), fs, FONT);
    const jan = normalizedJan(p.janCode);
    if (canUseJanCode() && jan) {
      y += 10;
      y += drawBarcodeOnCanvas(ctx, jan, margin, y, contentW, fs) + 8;
    }
    if (d.contamination) {
      ctx.font = `${Math.max(10, fs * 0.82)}px ${FONT}`;
      const note = `※${d.contamination}`;
      const lines = wrapCanvasText(ctx, note, contentW);
      drawTextLines(ctx, lines, margin, y + fs, fs * 1.25);
      y += lines.length * fs * 1.25 + 12;
    }
  }
  if (printTarget !== "label") {
    if (printTarget === "both") y += 22;
    y = drawNutritionImage(ctx, margin, y, contentW, d, fs, FONT);
  }
  const finalH = Math.ceil((y + margin) * scale);
  const trimmed = document.createElement("canvas");
  trimmed.width = canvas.width;
  trimmed.height = finalH;
  const trimCtx = trimmed.getContext("2d", { alpha: false });
  trimCtx.imageSmoothingEnabled = true;
  trimCtx.imageSmoothingQuality = "high";
  trimCtx.fillStyle = "#fff";
  trimCtx.fillRect(0, 0, trimmed.width, trimmed.height);
  trimCtx.drawImage(canvas, 0, 0);
  return trimmed;
}

// ② 画像コピー（Chrome: Promise<Blob>をClipboardItemに渡してジェスチャ制約を回避）
async function copyImageLabels() {
  showStatus("画像をコピー中です...");
  const p = currentProduct();
  const d = derive(p);
  if (navigator.clipboard?.write && window.ClipboardItem) {
    const blobPromise = buildLabelCanvas(p, d).then(c => canvasToPngBlob(c));
    try {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blobPromise })]);
      showStatus("画像としてコピーしました ✓");
    } catch (e) {
      console.warn("clipboard.write failed:", e);
      try { downloadCanvasImage(await buildLabelCanvas(p, d)); } catch {}
      showStatus("コピー失敗 → 画像をダウンロードします（ブラウザのクリップボード権限を確認してください）");
    }
    return;
  }
  try {
    downloadCanvasImage(await buildLabelCanvas(p, d));
  } catch {
    showStatus("画像コピーに失敗しました");
  }
}

function copyLabels() {
  const p = currentProduct();
  const d = derive(p);
  const parts = [];
  if (printTarget !== "nutrition") {
    const maker = [p.manufacturerName, p.manufacturerPostal ? `〒${p.manufacturerPostal}` : "", p.manufacturerAddress, p.manufacturerPhone].filter(Boolean).join(" ");
    parts.push([
      `名称：${p.name || "ー"}`,
      `原材料名：${d.ingLabel || "ー"}`,
      `内容量：${p.volume || "ー"}`,
      `賞味期限：${p.bestBefore || "ー"}`,
      `保存方法：${d.storage || "ー"}`,
      ...selectedMfrTypes(p).map((type) => `${type}：${maker || "ー"}`),
      canUseJanCode() && p.janCode ? `JANコード：${p.janCode}` : "",
      d.allergens.length ? `アレルゲン：${d.allergens.join("・")}を含む` : "",
      d.contamination ? `※${d.contamination}` : "",
    ].filter(Boolean).join("\n"));
  }
  if (printTarget !== "label") {
    const n = d.nutrition;
    parts.push(`栄養成分表示（100g当たり）\nエネルギー：${n.kcal}kcal\nたんぱく質：${n.protein}g\n脂質：${n.fat}g\n炭水化物：${n.carbs}g\n食塩相当量：${n.salt}g`);
  }
  copyPlainText(parts.join("\n\n"));
}

function copyPlainText(text) {
  const success = () => showStatus("\u6587\u5b57\u3060\u3051\u30b3\u30d4\u30fc\u3067\u304d\u307e\u3057\u305f");
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(success).catch(() => showStatus("\u30b3\u30d4\u30fc\u306b\u5931\u6557\u3057\u307e\u3057\u305f"));
    return;
  }
  showStatus("\u30b3\u30d4\u30fc\u306b\u5931\u6557\u3057\u307e\u3057\u305f");
}

// ══════════════════════════════════════════════════════════════════════
// 食品商品管理クラウド – 拡張レイヤー
// ══════════════════════════════════════════════════════════════════════

// ── 定数 ──────────────────────────────────────────────────────────────
const PRODUCT_CATEGORIES = ["菓子","パン","惣菜","弁当","飲料","調味料","乾物","冷凍食品","スープ","デザート","その他"];
const SALES_CHANNELS_LIST = ["自社EC","楽天","Amazon","BASE","Shopify","卸・問屋","百貨店","道の駅","直売所","その他"];
const AI_CHANNELS = [
  { id:"rakuten",  label:"楽天商品説明" },
  { id:"amazon",   label:"Amazon商品説明" },
  { id:"base",     label:"BASE/Shopify" },
  { id:"instagram",label:"Instagram投稿文" },
  { id:"wholesale",label:"業務用卸向け" },
  { id:"pop",      label:"POP用短文" },
];

// ── マイグレーション ──────────────────────────────────────────────────
function extendProductMaster(p) {
  return {
    code: "", category: "", price: "", imageDataUrl: "", internalName: "",
    originCountry: "",
    salesChannels: [], publishStatus: "active", memo: "",
    createdAt: p.updatedAt || new Date().toLocaleDateString("ja-JP"),
    costMode: "direct",
    directCost: "", directCostTaxMode: "tax_included",
    directPackaging: "", directShipping: "", directOther: "",
    costItems: [],
    packagingCost: "", laborCost: "", otherCost: "",
    specVersion: "1", specResponsible: "",
    specCreatedAt: p.updatedAt || new Date().toLocaleDateString("ja-JP"),
    approvalStatus: "none", assignedTo: "", approvalComment: "", approverName: "", approvalDate: "",
    productStatus: "draft",
    packaging: "", caseCount: "", productSize: "",
    ...p,
  };
}
(function runMigration() {
  if (safeGet("fmcc-migrated-v2") === "1") return;
  products = products.map(extendProductMaster);
  saveProducts();
  safeSet("fmcc-migrated-v1", "1");
  safeSet("fmcc-migrated-v2", "1");
})();

// ── ナビゲーション ────────────────────────────────────────────────────
function sidebarHtml() {
  const items = [
    { id:"dashboard",           label:"ダッシュボード", ico:"🏠" },
    { id:"products",            label:"商品管理",       ico:"📦" },
    { id:"label-nav",           label:"ラベル作成",     ico:"🏷" },
    { id:"spec-sheet-nav",      label:"商品規格書",     ico:"📋" },
    { id:"ai-descriptions-nav", label:"AI説明文",      ico:"✨" },
    { id:"ai-consult-nav",      label:"AI相談",        ico:"💬" },
    { id:"shelf-scan",          label:"AI棚スキャン",  ico:"📷", beta:true },
  ];
  const settingItem = { id:"settings-nav", label:"設定", ico:"⚙️" };
  const active = saasView;
  const navLink = (it) => `<button class="nav-item${active===it.id?" active":""}" data-nav="${it.id}">
    <span class="nav-ico">${it.ico}</span><span class="nav-lbl">${it.label}</span>${it.beta?'<span class="nav-beta">β</span>':""}
  </button>`;
  const reviewCount = products.filter(p => p.approvalStatus === "review").length;
  const reviewBadge = reviewCount > 0 ? `<span class="nav-review-badge">${reviewCount}</span>` : "";
  const currentRole = teamMembers.find(m => m.name === currentUserName)?.role || "";
  const roleLabel = { admin: "管理者", editor: "編集者", reviewer: "確認者" }[currentRole] || "";
  const userChip = currentUserName
    ? `<div class="sidebar-user-chip">👤 <span>${escapeHtml(currentUserName)}</span>${roleLabel ? `<span class="sidebar-user-role">${roleLabel}</span>` : ""}</div>`
    : `<div class="sidebar-user-chip muted" data-nav="settings-nav">👤 ユーザーを設定する</div>`;
  return `<nav class="sidebar${sidebarOpen?" open":""}">
    <div class="sidebar-hd">
      <div class="sidebar-brand">
        <img src="./assets/app-icon.svg" alt="" class="sidebar-logo">
        <div><div class="sidebar-name">FoodPilot</div><div class="sidebar-sub2">フードパイロット</div></div>
      </div>
      <button class="sidebar-close-btn" data-action="close-sidebar">✕</button>
    </div>
    <div class="nav-links">
      ${items.map(navLink).join("")}
      <button class="nav-item${active==="team-approval"?" active":""}" data-nav="team-approval">
        <span class="nav-ico">👥</span><span class="nav-lbl">チーム・承認</span>${reviewBadge}
      </button>
    </div>
    <div class="nav-footer">${userChip}${navLink(settingItem)}</div>
  </nav>
  <div class="sidebar-backdrop${sidebarOpen?" visible":""}" data-action="close-sidebar"></div>`;
}

function saasTopbar(title) {
  const cloudBtn = isCloudEnabled()
    ? `<button class="cloud-sync-topbar-btn" id="cloud-sync-topbar-btn" data-nav="settings-nav" title="クラウド同期">☁</button>`
    : "";
  return `<header class="saas-topbar">
    <button class="saas-menu-btn" data-action="toggle-sidebar">☰</button>
    <span class="saas-topbar-title">${escapeHtml(title)}</span>
    ${cloudBtn}
    <span class="plan-badge">${planInfo().label}プラン</span>
  </header>`;
}

function saasLayout(title, content) {
  return `<div class="saas-shell">${sidebarHtml()}
    <div class="saas-main">${saasTopbar(title)}
      <div class="saas-content">${content}</div>
    </div>
  </div>`;
}

// ── 商品ステータスアイコン ────────────────────────────────────────────
function productStatusBadges(p, d) {
  const ok = (cond, label) => `<span class="status-icon ${cond?"ok":"ng"}">${cond?"🟢":"🔴"} ${label}</span>`;
  const hasIng = (p.ingredients||[]).some(i=>i.name?.trim());
  const hasNutr = d.nutrition.kcal > 0;
  return `<div class="status-icons">
    ${ok(!!p.name?.trim(),          "名称")}
    ${ok(hasIng,                    "原材料")}
    ${ok(!!p.bestBefore?.trim(),    "賞味期限")}
    ${ok(!!p.manufacturerName?.trim(),"製造者")}
    ${ok(!!p.janCode?.trim(),       "JAN")}
    ${ok(!!p.imageDataUrl,          "画像")}
    ${ok((p.costMode||"direct")==="direct"?!!parseFloat(p.directCost):(p.costItems||[]).length>0,"原価")}
  </div>`;
}

// ── 原価計算 ──────────────────────────────────────────────────────────
const COST_UNITS = ["g", "kg", "ml", "L", "個", "袋", "本", "枚"];
const COST_PRICE_UNITS = [
  { id:"per_unit",  label:"/ 使用量単位", factor: (ci) => 1 },
  { id:"per_kg",    label:"/ kg",        factor: (ci) => (ci.unit==="g"?0.001:ci.unit==="kg"?1:1) },
  { id:"per_100g",  label:"/ 100g",      factor: (ci) => (ci.unit==="g"?0.01:0.01) },
];

function calcItemCost(ci) {
  const amount  = parseFloat(ci.amount) || 0;
  const price   = parseFloat(ci.unitPrice) || 0;
  const loss    = parseFloat(ci.lossRate) || 0;
  let unitCost  = price;
  if (ci.priceUnit === "per_kg" && (ci.unit === "g" || !ci.unit)) unitCost = price / 1000;
  else if (ci.priceUnit === "per_100g" && (ci.unit === "g" || !ci.unit)) unitCost = price / 100;
  return amount * unitCost * (1 + loss / 100);
}

function calcCosts(p) {
  const mode  = p.costMode || "direct";
  const price = parseFloat(p.price) || 0;

  if (mode === "direct") {
    const rawCost   = parseFloat(p.directCost) || 0;
    const packaging = parseFloat(p.directPackaging) || 0;
    const shipping  = parseFloat(p.directShipping) || 0;
    const other     = parseFloat(p.directOther) || 0;
    const totalCost = rawCost + packaging + shipping + other;
    const gross     = price - totalCost;
    const costRate  = price > 0 ? Math.round(totalCost / price * 100) : null;
    const profitRate = price > 0 ? Math.round(gross / price * 100) : null;
    return { mode, rawCost, packaging, labor: 0, shipping, other, totalCost, price, gross, costRate, profitRate };
  } else {
    const items     = p.costItems || [];
    const rawCost   = items.reduce((s, ci) => s + calcItemCost(ci), 0);
    const packaging = parseFloat(p.packagingCost) || 0;
    const labor     = parseFloat(p.laborCost) || 0;
    const other     = parseFloat(p.otherCost) || 0;
    const totalCost = rawCost + packaging + labor + other;
    const gross     = price - totalCost;
    const costRate  = price > 0 ? Math.round(totalCost / price * 100) : null;
    const profitRate = price > 0 ? Math.round(gross / price * 100) : null;
    return { mode, rawCost, packaging, labor, shipping: 0, other, totalCost, price, gross, costRate, profitRate };
  }
}

function costRateClass(costRate) {
  if (costRate === null) return "";
  if (costRate <= 30) return "margin-good";
  if (costRate <= 40) return "margin-warn";
  return "margin-bad";
}
// 後方互換エイリアス
function marginClass(m) { return costRateClass(m); }

// ── 原材料タブ（インライン編集）────────────────────────────────────────
function masterIngredientsTabHtml(p, d, isMissing) {
  const ings = p.ingredients || [];
  const datalistOptions = Object.keys(NUTRITION_DB).map(k => `<option value="${escapeHtml(k)}">`).join("");
  const ingRows = ings.map((ing, idx) => `
    <div class="master-ing-row">
      <span class="master-ing-num">${idx + 1}</span>
      <input class="master-ing-input" type="text"
        data-master-ing-name="${idx}"
        list="master-ing-datalist"
        value="${escapeHtml(ing.name || "")}"
        placeholder="原材料名（例：小麦粉）"
        autocomplete="off">
      <input class="master-ing-weight" type="number" min="0" step="0.1"
        data-master-ing-weight="${idx}"
        value="${escapeHtml(String(ing.weight || ""))}"
        placeholder="重量(g)">
      <button class="master-ing-del" data-remove-master-ing="${idx}" title="削除" aria-label="この原材料を削除">×</button>
    </div>`).join("");

  const allergenHtml = d.allergens.length
    ? `<div class="check-result ok"><span class="cr-label">自動検出アレルゲン</span><div class="cr-body">${d.allergens.map(a => `<span class="allergen-chip">${escapeHtml(a)}</span>`).join("")}</div></div>`
    : `<p class="notice">アレルゲン該当なし（または未入力）</p>`;

  const sortHint = ings.filter(i => parseFloat(i.weight) > 0).length >= 2
    ? `<button class="action" data-action="sort-master-ing" style="margin-left:8px">重量順に並べ直す</button>`
    : "";

  return `
    <div class="detail-section">
      <h3 class="detail-section-title">原材料名（ラベル自動生成プレビュー）</h3>
      <div class="ing-label-preview">${escapeHtml(d.ingLabel || "（原材料を入力すると自動生成されます）")}</div>
    </div>
    <div class="detail-section">
      <div class="master-ing-section-hd">
        <h3 class="detail-section-title" style="margin:0">原材料を編集</h3>
        ${sortHint}
      </div>
      <p class="field-hint">重量(g)を入力すると多い順に自動ソートされます。添加物は自動で「／」で区切られます。</p>
      <datalist id="master-ing-datalist">${datalistOptions}</datalist>
      <div class="master-ing-list" id="master-ing-list">${ingRows}</div>
      <button class="action" data-action="add-master-ing" style="margin-top:10px">＋ 原材料を追加</button>
    </div>
    <div class="detail-section">
      <h3 class="detail-section-title">アレルゲン（自動検出）</h3>
      ${allergenHtml}
    </div>`;
}

// ── 原価管理 HTML ──────────────────────────────────────────────────────
function costEditorHtml(p) {
  const mode  = p.costMode || "direct";
  const costs = calcCosts(p);
  const mc    = costRateClass(costs.costRate);

  // ── セグメントボタン ──
  const segBtn = (id, label, desc) => {
    const on = mode === id;
    return `<button class="cost-mode-btn${on?" active":""}" data-set-cost-mode="${id}">
      <span class="cost-mode-label">${label}</span>
      <span class="cost-mode-desc">${desc}</span>
    </button>`;
  };
  const segment = `<div class="cost-mode-seg">
    ${segBtn("direct",      "商品原価を直接入力",  "仕入・完成品向け")}
    ${segBtn("ingredients", "原材料から自動計算",  "自社製造向け")}
  </div>`;

  // ── モード①：直接入力 ──
  const taxSel = (val) => ["tax_included","tax_excluded"].map(v =>
    `<option value="${v}"${(p.directCostTaxMode||"tax_included")===v?" selected":""}>${v==="tax_included"?"税込":"税抜"}</option>`
  ).join("");
  const directPanel = `
    <div class="cost-direct-grid">
      <label class="field cost-main-field">
        <span>商品原価 <b>必須</b></span>
        <div class="cost-amount-wrap">
          <span class="cost-yen">¥</span>
          <input type="number" data-master-field="directCost"
            value="${escapeHtml(p.directCost||"")}" placeholder="0" min="0" step="1" class="cost-main-input">
          <select data-master-field="directCostTaxMode" class="cost-tax-sel">${taxSel()}</select>
        </div>
      </label>
      <label class="field">
        <span>販売価格（税込）</span>
        <div class="cost-amount-wrap"><span class="cost-yen">¥</span>
          <input type="number" data-master-field="price"
            value="${escapeHtml(p.price||"")}" placeholder="0" min="0" step="1">
        </div>
      </label>
      <label class="field">
        <span>包装資材 <small>任意</small></span>
        <div class="cost-amount-wrap"><span class="cost-yen">¥</span>
          <input type="number" data-master-field="directPackaging"
            value="${escapeHtml(p.directPackaging||"")}" placeholder="0" min="0" step="1">
        </div>
      </label>
      <label class="field">
        <span>送料 <small>任意</small></span>
        <div class="cost-amount-wrap"><span class="cost-yen">¥</span>
          <input type="number" data-master-field="directShipping"
            value="${escapeHtml(p.directShipping||"")}" placeholder="0" min="0" step="1">
        </div>
      </label>
      <label class="field">
        <span>その他経費 <small>任意</small></span>
        <div class="cost-amount-wrap"><span class="cost-yen">¥</span>
          <input type="number" data-master-field="directOther"
            value="${escapeHtml(p.directOther||"")}" placeholder="0" min="0" step="1">
        </div>
      </label>
    </div>`;

  // ── モード②：原材料計算 ──
  const items = p.costItems || [];
  const itemCards = items.map((ci, i) => {
    const lineCost = calcItemCost(ci);
    return `<div class="cost-item-card">
      <div class="cost-item-header">
        <input class="cost-name-input" list="ing-master-list" data-cost-name="${i}"
          value="${escapeHtml(ci.name||"")}" placeholder="原材料名を入力">
        <button class="icon-btn" data-remove-cost="${i}" title="削除">×</button>
      </div>
      <div class="cost-item-row">
        <label class="cost-field"><span>使用量</span>
          <div class="cost-amount-wrap">
            <input type="number" data-cost-amount="${i}" value="${escapeHtml(ci.amount||"")}" placeholder="0" min="0" step="0.01">
            <select data-cost-unit="${i}">${COST_UNITS.map(u=>`<option value="${u}"${ci.unit===u?" selected":""}>${u}</option>`).join("")}</select>
          </div>
        </label>
        <label class="cost-field"><span>仕入単価</span>
          <div class="cost-amount-wrap">
            <input type="number" data-cost-price="${i}" value="${escapeHtml(ci.unitPrice||"")}" placeholder="0" min="0" step="0.01">
            <select data-cost-punit="${i}">${[
              {id:"per_unit",label:"円/使用量"},{id:"per_kg",label:"円/kg"},{id:"per_100g",label:"円/100g"}
            ].map(u=>`<option value="${u.id}"${(ci.priceUnit||"per_unit")===u.id?" selected":""}>${u.label}</option>`).join("")}</select>
          </div>
        </label>
        <label class="cost-field"><span>ロス率%</span>
          <input type="number" data-cost-loss="${i}" value="${escapeHtml(ci.lossRate||"0")}" placeholder="0" min="0" max="100" style="width:70px">
        </label>
        <div class="cost-field cost-line-total"><span>小計</span>
          <strong>¥${lineCost.toFixed(1)}</strong>
        </div>
      </div>
    </div>`;
  }).join("");
  const ingredientsPanel = `
    <div class="cost-items-list">${itemCards}</div>
    <div class="cost-add-row">
      <button class="action" data-action="add-cost-item">＋ 原材料を追加</button>
    </div>
    <div class="cost-extra-section">
      <h4 class="cost-extra-title">その他コスト（1個あたり）</h4>
      <div class="cost-extra-grid">
        <label class="field"><span>包材費 (円)</span><input type="number" data-master-field="packagingCost" value="${escapeHtml(p.packagingCost||"")}" placeholder="0"></label>
        <label class="field"><span>人件費 (円)</span><input type="number" data-master-field="laborCost" value="${escapeHtml(p.laborCost||"")}" placeholder="0"></label>
        <label class="field"><span>その他経費 (円)</span><input type="number" data-master-field="otherCost" value="${escapeHtml(p.otherCost||"")}" placeholder="0"></label>
        <label class="field"><span>販売価格（税込）</span><div class="cost-amount-wrap"><span class="cost-yen">¥</span><input type="number" data-master-field="price" value="${escapeHtml(p.price||"")}" placeholder="0" min="0" step="1"></div></label>
      </div>
    </div>`;

  // ── サマリー ──
  const fmt = (n) => n > 0 ? `¥${Math.round(n).toLocaleString()}` : "¥0";
  const summary = `<div class="cost-summary-v2">
    <div class="cost-kpi-row">
      <div class="cost-kpi">
        <div class="cost-kpi-label">総原価</div>
        <div class="cost-kpi-value" id="ck-total">${fmt(costs.totalCost)}</div>
      </div>
      <div class="cost-kpi">
        <div class="cost-kpi-label">販売価格</div>
        <div class="cost-kpi-value" id="ck-price">${costs.price > 0 ? fmt(costs.price) : "—"}</div>
      </div>
      <div class="cost-kpi">
        <div class="cost-kpi-label">粗利益</div>
        <div class="cost-kpi-value ${costs.gross >= 0 ? "profit-pos" : "profit-neg"}" id="ck-gross">${costs.price > 0 ? fmt(costs.gross) : "—"}</div>
      </div>
      <div class="cost-kpi ${mc}" id="ck-profit-wrap">
        <div class="cost-kpi-label">利益率</div>
        <div class="cost-kpi-value" id="ck-profit">${costs.profitRate !== null ? (100 - costs.costRate) + "%" : "—"}</div>
      </div>
      <div class="cost-kpi ${mc}" id="ck-cost-wrap">
        <div class="cost-kpi-label">原価率</div>
        <div class="cost-kpi-value" id="ck-cost">${costs.costRate !== null ? costs.costRate + "%" : "—"}</div>
      </div>
    </div>
    <p class="notice" style="margin-top:6px;font-size:11px">
      原価率 <span class="margin-good">■ 〜30%（優良）</span>
      <span class="margin-warn">■ 31〜40%（標準）</span>
      <span class="margin-bad">■ 41%〜（要改善）</span>
    </p>
  </div>`;

  return `<div class="detail-section">
    <h3 class="detail-section-title">原価管理</h3>
    ${segment}
    <div class="cost-panel">${mode === "direct" ? directPanel : ingredientsPanel}</div>
    ${summary}
  </div>`;
}

// ── 商品画像アップロード HTML ─────────────────────────────────────────
function imageUploadSectionHtml(p) {
  const img = p.imageDataUrl
    ? `<div class="image-preview-wrap" id="image-preview-wrap">
        <img class="image-preview-img" src="${p.imageDataUrl}" alt="商品画像" onerror="this.onerror=null;document.getElementById('image-preview-wrap').classList.add('image-preview-error');this.remove()">
        <button class="image-remove-btn" data-action="remove-product-image" title="削除">×</button>
       </div>`
    : `<div class="image-upload-area" id="image-drop-zone">
        <span class="upload-icon">📷</span>
        <p>クリックまたはドラッグ＆ドロップで画像をアップロード</p>
        <p style="font-size:11px;color:#94a3b8">JPEG / PNG / WebP（最大5MB）</p>
        <input type="file" id="product-image-input" accept="image/*" style="display:none">
       </div>`;
  return `<div class="detail-section">
    <h3 class="detail-section-title">商品画像</h3>
    ${img}
  </div>`;
}

// ── 商品詳細（マスター編集） ───────────────────────────────────────────
function productDetailHtml() {
  const p = products.find(x=>x.id===productDetailId) || (editId==="new"?draft:null);
  if (!p) return saasLayout("商品詳細", `<p>商品が見つかりません。<button class="action" data-nav="products">一覧へ戻る</button></p>`);
  const d = derive(p);
  const chkd = (val) => val ? "checked" : "";
  const channelChks = SALES_CHANNELS_LIST.map(ch=>`<label class="check-label"><input type="checkbox" data-sales-ch="${escapeHtml(ch)}" ${chkd((p.salesChannels||[]).includes(ch))}> ${escapeHtml(ch)}</label>`).join("");
  const catOpts = ["", ...PRODUCT_CATEGORIES].map(c=>`<option value="${escapeHtml(c)}"${p.category===c?" selected":""}>${c||"カテゴリを選択"}</option>`).join("");
  const statusOpts = [["active","公開中"],["draft","下書き"],["inactive","非公開"]].map(([v,l])=>`<option value="${v}"${p.publishStatus===v?" selected":""}>${l}</option>`).join("");

  const tab = productDetailTab || "basic";
  const comp = calcCompletion(p, d);
  const isMissing = (label) => comp.missing.includes(label);
  const compColor = comp.pct >= 100 ? "#16a34a" : comp.pct >= 60 ? "#2563eb" : "#d97706";
  const completionBanner = `<div class="detail-comp-banner">
    <div class="dcb-bar-wrap"><div class="dcb-bar-fill" style="width:${comp.pct}%;background:${compColor}"></div></div>
    <span class="dcb-pct" style="color:${compColor}">${comp.pct}%</span>
    ${comp.missing.length
      ? `<span class="dcb-missing">未入力: ${comp.missing.map(m=>`<button class="dcb-missing-btn" data-jump-to-field="${escapeHtml(m)}" title="クリックして${escapeHtml(m)}の入力欄へ移動">${escapeHtml(m)}</button>`).join("")}</span>`
      : `<span class="dcb-done">✅ 必須項目すべて入力済み</span>`}
  </div>`;
  // 未入力項目をタブへマッピングしてバッジ数を計算
  const TAB_FIELDS = {
    basic:       ["名称","内容量","賞味期限","保存方法","製造者名","製造者住所"],
    ingredients: ["原材料名"],
    cost:        [],
    check:       [],
    history:     [],
    approval:    [],
  };
  const tabBadge = (id) => {
    const n = (TAB_FIELDS[id]||[]).filter(f => comp.missing.includes(f)).length;
    return n > 0 ? `<span class="tab-badge">${n}</span>` : "";
  };
  const histCount = loadHistory(p.id).length;
  const approvalDot = p.approvalStatus && p.approvalStatus !== "none" ? ` <span class="tab-approval-dot ${p.approvalStatus}"></span>` : "";
  const tabs = [
    { id:"basic",       label:"基本情報" },
    { id:"ingredients", label:"原材料" },
    { id:"cost",        label:"原価" },
    { id:"check",       label:"表示チェック" },
    { id:"history",     label:`📋 履歴${histCount>0?` (${histCount})`:""}` },
    { id:"approval",    label:`👥 承認${approvalDot}` },
  ];
  const tabNav = `${completionBanner}<div class="detail-tabs">${tabs.map(t=>`<button class="detail-tab${tab===t.id?" active":""}" data-detail-tab="${t.id}">${t.label}${tabBadge(t.id)}</button>`).join("")}</div>`;

  // ── タブコンテンツ ──
  let tabContent = "";
  if (tab === "basic") {
    const pipelineHtml = `<div class="pipeline-selector">
      <span class="pipeline-selector-lbl">ステータス</span>
      <div class="pipeline-steps">
        ${PRODUCT_STATUSES.map(s => `
          <button class="pipeline-step${(p.productStatus||"draft")===s.id?" active":""}" data-set-pipeline-status="${s.id}" style="${(p.productStatus||"draft")===s.id?`background:${s.bg};color:${s.color};border-color:${s.color}`:""}">
            ${s.label}
          </button>`).join(`<span class="pipeline-arrow">›</span>`)}
      </div>
    </div>`;
    tabContent = `
      ${pipelineHtml}
      <div class="detail-basic-layout">
      <div class="detail-basic-form">
      <div class="detail-grid">
        <div class="detail-section">
          <h3 class="detail-section-title">基本情報</h3>
          <div class="field-grid">
            <label class="field${isMissing("名称")?" field--missing":""}"><span>商品名<b>必須</b></span><input data-master-field="name" value="${escapeHtml(p.name||"")}" placeholder="例：米粉ドーナツ プレーン"></label>
            <div class="field">
              <span>品番・商品コード <span class="field-opt">任意</span></span>
              <input data-master-field="code" value="${escapeHtml(p.code||"")}" placeholder="例：SW-001">
              <p class="field-hint">自社での管理番号です。ラベルには印刷されません。</p>
            </div>
            <label class="field"><span>カテゴリ</span><select data-master-field="category">${catOpts}</select></label>
            <div class="field">
              <span>JANコード <span class="field-opt">任意</span></span>
              <div class="jan-input-row">
                <input data-master-field="janCode" value="${escapeHtml(p.janCode||"")}" placeholder="13桁の数字" maxlength="13" inputmode="numeric">
                ${p.janCode ? `<span class="jan-check ${p.janCode.length===13?"jan-ok":"jan-ng"}">${p.janCode.length===13?"✓ 13桁":p.janCode.length+"桁"}</span>` : ""}
              </div>
              <p class="field-hint">バーコード管理をしている場合に入力。</p>
            </div>
            <label class="field${isMissing("内容量")?" field--missing":""}"><span>内容量</span><input data-master-field="volume" value="${escapeHtml(p.volume||"")}" placeholder="例：100g"></label>
            <div class="field${isMissing("賞味期限")?" field--missing":""}">
              <span>賞味期限</span>
              <input data-master-field="bestBefore" value="${escapeHtml(p.bestBefore||"")}" placeholder="例：製造日より90日">
              <div class="quick-chips">
                ${["7日","14日","30日","60日","90日","6ヶ月","1年"].map(d=>`<button class="quick-chip" data-quick-best-before="製造日より${d}">製造日より${d}</button>`).join("")}
              </div>
            </div>
            <label class="field"><span>賞味期限日（管理用）<span class="field-hint">ラベル非表示・アラート用</span></span><input type="date" data-master-field="expiryDate" value="${escapeHtml(p.expiryDate||"")}"></label>
            <div class="field${isMissing("保存方法")?" field--missing":""}">
              <span>保存方法</span>
              <input data-master-field="storage" list="storage-opts-dl" autocomplete="off" value="${escapeHtml(p.storage||"")}" placeholder="例：高温多湿を避けて保存">
              <datalist id="storage-opts-dl">${STORAGE_OPTS.filter(o=>o!=="自由入力").map(o=>`<option value="${escapeHtml(o)}"></option>`).join("")}</datalist>
              <button class="ai-suggest-btn" data-action="suggest-storage">✦ AIが原材料から提案</button>
            </div>
            <div class="field">
              <span>原産地 <span class="field-opt">任意</span></span>
              <input data-master-field="originCountry" value="${escapeHtml(p.originCountry||"")}" placeholder="例：国産、アメリカ産、中国">
              <p class="field-hint">農産物・畜産物・水産物を主原料とする場合は表示が義務付けられています。</p>
            </div>
          </div>
        </div>
        <div class="detail-section">
          <h3 class="detail-section-title">販売・管理情報</h3>
          <label class="field"><span>公開ステータス</span><select data-master-field="publishStatus">${statusOpts}</select></label>
          <div class="field"><span class="field-label">販売チャネル</span><div class="check-group">${channelChks}</div></div>
          <label class="field full"><span>メモ</span><textarea data-master-field="memo" rows="3">${escapeHtml(p.memo||"")}</textarea></label>
        </div>
        <div class="detail-section">
          <h3 class="detail-section-title">製造者情報</h3>
          <div class="field-grid">
            <label class="field${isMissing("製造者名")?" field--missing":""}"><span>製造者名</span><input data-master-field="manufacturerName" value="${escapeHtml(p.manufacturerName||"")}"></label>
            <label class="field${isMissing("製造者住所")?" field--missing":""}"><span>製造者住所</span><input data-master-field="manufacturerAddress" value="${escapeHtml(p.manufacturerAddress||"")}"></label>
            <label class="field"><span>電話番号</span><input data-master-field="manufacturerPhone" value="${escapeHtml(p.manufacturerPhone||"")}"></label>
          </div>
        </div>
        <div class="detail-section">
          <h3 class="detail-section-title">規格書・出荷情報</h3>
          <div class="field-grid">
            <label class="field"><span>版数（Rev）</span><input data-master-field="specVersion" value="${escapeHtml(p.specVersion||"1")}" placeholder="例：1"></label>
            <label class="field"><span>担当者</span><input data-master-field="specResponsible" value="${escapeHtml(p.specResponsible||"")}" placeholder="例：田中 太郎"></label>
            <label class="field"><span>荷姿</span><input data-master-field="packaging" value="${escapeHtml(p.packaging||"")}" placeholder="例：段ボール箱"></label>
            <label class="field"><span>ケース入数</span><input data-master-field="caseCount" value="${escapeHtml(p.caseCount||"")}" placeholder="例：12個"></label>
            <label class="field full"><span>製品サイズ</span><input data-master-field="productSize" value="${escapeHtml(p.productSize||"")}" placeholder="例：W120×D80×H40mm / 150g"></label>
          </div>
        </div>
        <div class="detail-section">
          <h3 class="detail-section-title">在庫情報 <span class="field-opt">任意</span></h3>
          <p class="field-hint" style="margin-bottom:12px">AI棚スキャンで自動更新できます。手動での上書きも可能です。</p>
          <div class="field-grid">
            <label class="field"><span>現在の在庫数</span><input type="number" min="0" step="1" data-master-field="currentStock" value="${escapeHtml(String(p.currentStock??''))}" placeholder="例：100"></label>
            <label class="field"><span>単位</span>
              <select data-master-field="stockUnit">
                ${["袋","箱","枚","kg","g","本","個","缶","瓶","パック"].map(u=>`<option value="${u}"${(p.stockUnit||"袋")===u?" selected":""}>${u}</option>`).join("")}
                <option value="その他"${(p.stockUnit||"袋")==="その他"?" selected":""}>その他</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      ${imageUploadSectionHtml(p)}
      </div>
      <div class="detail-basic-preview">
        <div class="mini-label-panel" id="detail-mini-preview">
          <div class="mlp-header">🏷 ラベルプレビュー</div>
          <div class="mlp-hint">保存のたびに自動更新</div>
          <div class="mlp-label-wrap">
            ${basicLabelHtml(p, d)}
          </div>
          <div class="mlp-nutrition-wrap">
            ${nutritionLabelHtml(d)}
          </div>
        </div>
      </div>
      </div>`;
  } else if (tab === "ingredients") {
    tabContent = masterIngredientsTabHtml(p, d, isMissing);
  } else if (tab === "cost") {
    tabContent = costEditorHtml(p);
  } else if (tab === "history") {
    const hist = loadHistory(p.id);
    if (!hist.length) {
      tabContent = `<div class="detail-section"><p class="notice">変更履歴がありません。「保存する」のたびに最大5件まで自動記録されます。</p></div>`;
    } else {
      const histRows = hist.map((h, i) => {
        const diff = calcHistoryDiff(h.snapshot, p);
        return `<div class="history-detail-row">
          <div class="history-detail-meta">
            <span class="history-date">${escapeHtml(h.savedAt)}</span>
            ${h.savedBy && h.savedBy !== "—" ? `<span class="history-user-chip">👤 ${escapeHtml(h.savedBy)}</span>` : ""}
            ${diff.length
              ? `<span class="history-diff-chip">変更: <strong>${diff.map(l=>escapeHtml(l)).join("・")}</strong></span>`
              : `<span class="history-diff-chip history-diff-same">現在と同じ内容</span>`}
          </div>
          <button class="action" data-restore-history="${i}" data-history-pid="${escapeHtml(p.id)}">この時点に戻す</button>
        </div>`;
      }).join("");
      tabContent = `<div class="detail-section">
        <h3 class="detail-section-title">変更履歴（最大5件）</h3>
        <p class="notice" style="margin-bottom:12px">「この時点に戻す」を押すと現在の内容が上書きされます。</p>
        <div class="history-detail-list">${histRows}</div>
      </div>`;
    }
  } else if (tab === "check") {
    const issues = checkFoodLabel(p, d);
    const errorCount = issues.filter(i=>i.level==="error").length;
    const warnCount  = issues.filter(i=>i.level==="warn").length;
    const infoCount  = issues.filter(i=>i.level==="info").length;
    // コンプライアンススコア（必須エラー1件=-15点、警告1件=-5点、最低0点）
    const compScore  = Math.max(0, 100 - errorCount * 15 - warnCount * 5);
    const scoreColor = compScore >= 90 ? "#16a34a" : compScore >= 70 ? "#ca8a04" : "#dc2626";
    const scoreBg    = compScore >= 90 ? "#f0fdf4" : compScore >= 70 ? "#fefce8" : "#fef2f2";
    const scoreBorder= compScore >= 90 ? "#bbf7d0" : compScore >= 70 ? "#fde68a" : "#fca5a5";
    const scoreLabel = compScore >= 90 ? "適合" : compScore >= 70 ? "要確認" : "要修正";
    // 自動修正可能かどうか
    const { changes: autoFixChanges } = normalizeLabelText(p);
    const canAutoFix = autoFixChanges.length > 0;
    const LEGAL_REFS = {
      "name":                "食品表示基準 第3条第1項（別表第1第1号）",
      "ingredients":         "食品表示基準 第3条第1項（第7号）",
      "volume":              "食品表示基準 第3条第1項（第1号）",
      "bestBefore":          "食品表示基準 第3条第1項（第9・10号）",
      "storage":             "食品表示基準 第3条第1項（第11号）",
      "manufacturerName":    "食品表示基準 第3条第1項（第12号）",
      "manufacturerAddress": "食品表示基準 第3条第1項（第12号）",
      "janCode":             "JISコード X 0502",
    };
    const issueHtml = issues.length ? issues.map(i => {
      const icon = i.level==="error" ? "🔴" : i.level==="warn" ? "🟡" : "🔵";
      const cls  = `check-issue check-issue-${i.level}`;
      const fixEntry = i.field ? CHECK_FIX_MAP[i.field] : null;
      const fixBtn = fixEntry ? `<button class="check-fix-btn" data-check-fix="${escapeHtml(i.field)}">修正する →</button>` : "";
      const legalRef = i.field && LEGAL_REFS[i.field] ? `<span class="check-legal-ref">📋 ${escapeHtml(LEGAL_REFS[i.field])}</span>` : "";
      return `<div class="${cls}">
        <div class="check-issue-top"><span class="check-issue-msg">${icon} ${escapeHtml(i.msg)}</span>${fixBtn}</div>
        ${legalRef}
      </div>`;
    }).join("") : "";
    tabContent = `
      <div class="detail-section">
        <h3 class="detail-section-title">食品表示基準チェック</h3>
        <div class="check-score-card" style="background:${scoreBg};border:1.5px solid ${scoreBorder}">
          <div class="csc-left">
            <div class="csc-score" style="color:${scoreColor}">${compScore}<span class="csc-unit">点</span></div>
            <div class="csc-label" style="color:${scoreColor}">${scoreLabel}</div>
          </div>
          <div class="csc-right">
            <div class="csc-bar-track"><div class="csc-bar-fill" style="width:${compScore}%;background:${scoreColor}"></div></div>
            <div class="csc-counts">
              ${errorCount > 0 ? `<span class="csc-err">🔴 必須エラー ${errorCount}件</span>` : ""}
              ${warnCount  > 0 ? `<span class="csc-warn">🟡 警告 ${warnCount}件</span>` : ""}
              ${infoCount  > 0 ? `<span class="csc-info">🔵 参考 ${infoCount}件</span>` : ""}
              ${errorCount === 0 && warnCount === 0 ? `<span class="csc-ok">✅ 問題なし</span>` : ""}
            </div>
            ${canAutoFix ? `<button class="action" style="margin-top:8px;font-size:12px" data-action="master-auto-fix">✨ 自動整形（${autoFixChanges.length}件）</button>` : ""}
          </div>
        </div>
        <div class="check-issues">${issueHtml || '<p class="notice" style="margin-top:12px">✅ 問題は見つかりませんでした。すべての必須項目が入力されています。</p>'}</div>
        <p class="notice" style="margin-top:16px">※ このチェックは食品表示基準（令和元年改正対応）に基づく参考情報です。最終確認は専門家にご相談ください。</p>
      </div>`;
  } else if (tab === "approval") {
    tabContent = approvalTabHtml(p);
  }

  // 前後移動ナビゲーション
  const sortedForNav = [...products].sort((a,b) => {
    if (masterSort === "name") return (a.name||"").localeCompare(b.name||"", "ja");
    if (masterSort === "completion") { const da=derive(a),db=derive(b); return calcCompletion(b,db).pct-calcCompletion(a,da).pct; }
    return (b.updatedAt||"").localeCompare(a.updatedAt||"");
  }).filter(x => {
    if (masterPipelineFilter && x.productStatus !== masterPipelineFilter) return false;
    if (masterCategoryFilter && x.category !== masterCategoryFilter) return false;
    return true;
  });
  const navIdx = sortedForNav.findIndex(x => x.id === p.id);
  const prevProd = navIdx > 0 ? sortedForNav[navIdx-1] : null;
  const nextProd = navIdx >= 0 && navIdx < sortedForNav.length-1 ? sortedForNav[navIdx+1] : null;
  const navPosLabel = navIdx >= 0 ? `${navIdx+1}/${sortedForNav.length}` : "";

  return saasLayout(`${escapeHtml(p.name||"新規商品")} – 商品詳細`, `
    <div class="detail-breadcrumb">
      <button class="bread-link" data-nav="products">← 商品管理</button>
      <span class="bread-sep">›</span>
      <span class="bread-current">${escapeHtml(p.name||"新規商品")}</span>
      ${sortedForNav.length > 1 ? `<div class="detail-nav-arrows">
        <button class="detail-nav-btn" aria-label="${prevProd?`前の商品: ${escapeHtml(prevProd.name||"前の商品")}`:"前の商品（なし）"}" ${prevProd?`data-nav-product-detail="${escapeHtml(prevProd.id)}" title="${escapeHtml(prevProd.name||"前の商品")}"`:`disabled`}>◀</button>
        <span class="detail-nav-pos">${escapeHtml(navPosLabel)}</span>
        <button class="detail-nav-btn" aria-label="${nextProd?`次の商品: ${escapeHtml(nextProd.name||"次の商品")}`:"次の商品（なし）"}" ${nextProd?`data-nav-product-detail="${escapeHtml(nextProd.id)}" title="${escapeHtml(nextProd.name||"次の商品")}"`:`disabled`}>▶</button>
      </div>` : ""}
    </div>
    <div class="detail-header-actions">
      <span id="master-autosave-status" class="autosave-status${masterAutoSaveStatus==="saved"?" autosave-ok":masterAutoSaveStatus==="editing"?" autosave-editing":""}">${masterAutoSaveStatus==="saved"?"保存済み":masterAutoSaveStatus==="editing"?"編集中…":""}</span>
      <button class="action primary" data-action="save-master">保存する</button>
      <button class="action" data-label-from="${escapeHtml(p.id)}">🏷 ラベル編集</button>
      <button class="action" data-spec-from="${escapeHtml(p.id)}">📋 規格書</button>
      <button class="action" data-ai-from="${escapeHtml(p.id)}">✦ AI説明文</button>
      <button class="action" data-dup-goto="${escapeHtml(p.id)}" title="この商品のコピーを作成して編集画面へ">複製</button>
    </div>
    ${tabNav}
    <div class="kbd-hints kbd-hints--detail"><kbd>1</kbd>〜<kbd>6</kbd> タブ切替 &nbsp;·&nbsp; <kbd>Ctrl</kbd>+<kbd>S</kbd> 保存 &nbsp;·&nbsp; <kbd>Esc</kbd> 一覧へ戻る</div>
    ${tabContent}
    <button class="fab-save" data-action="save-master">保存する</button>
  `);
}

// ── 承認タブ ──────────────────────────────────────────────────────────
function approvalTabHtml(p) {
  const st = p.approvalStatus || "none";
  const currentRole = teamMembers.find(m => m.name === currentUserName)?.role || "";
  const canApprove = currentRole === "admin" || currentRole === "reviewer";
  const canRequest = !!currentUserName && st === "none";
  const canCancel  = !!currentUserName && st === "review" && (p.assignedTo === currentUserName || currentRole === "admin");

  const stateInfo = {
    none:     { icon:"⬜", label:"未申請",   color:"#64748b", bg:"#f8fafc", border:"#e2e8f0" },
    review:   { icon:"🔵", label:"確認待ち", color:"#1d4ed8", bg:"#eff6ff", border:"#bfdbfe" },
    approved: { icon:"✅", label:"承認済み", color:"#15803d", bg:"#f0fdf4", border:"#bbf7d0" },
    rejected: { icon:"↩", label:"差し戻し", color:"#dc2626", bg:"#fef2f2", border:"#fca5a5" },
  }[st] || { icon:"⬜", label:"未申請", color:"#64748b", bg:"#f8fafc", border:"#e2e8f0" };

  const memberOpts = teamMembers.length
    ? teamMembers.filter(m => m.role==="admin"||m.role==="reviewer")
        .map(m=>`<option value="${escapeHtml(m.name)}"${p.assignedTo===m.name?" selected":""}>${escapeHtml(m.name)}（${m.role==="admin"?"管理者":"確認者"}）</option>`).join("")
    : "";

  const requestSection = (st === "none" || st === "rejected") ? `
    <div class="approval-action-card">
      <h4>確認依頼を送る</h4>
      ${!currentUserName ? `<p class="notice">⚠ 先にサイドバーでユーザーを設定してください。</p>` : ""}
      ${memberOpts ? `<label class="field" style="margin-bottom:10px"><span>確認者を指定</span><select id="approval-assign-select"><option value="">指定なし</option>${memberOpts}</select></label>` : ""}
      <label class="field" style="margin-bottom:10px"><span>依頼メモ（任意）</span><textarea id="approval-req-comment" rows="2" placeholder="確認してほしいポイントなど..." style="width:100%;resize:vertical">${escapeHtml(p.approvalComment||"")}</textarea></label>
      <button class="action primary" data-action="request-approval" data-pid="${escapeHtml(p.id)}"${!currentUserName?" disabled":""}>📨 確認依頼を送る</button>
    </div>` : "";

  const approveSection = (st === "review" && canApprove) ? `
    <div class="approval-action-card">
      <h4>承認 / 差し戻し</h4>
      <label class="field" style="margin-bottom:10px"><span>コメント（任意）</span><textarea id="approval-judge-comment" rows="2" placeholder="承認理由・差し戻し理由など..." style="width:100%;resize:vertical"></textarea></label>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="action primary" data-action="approve-product" data-pid="${escapeHtml(p.id)}">✅ 承認する</button>
        <button class="action danger-outline" data-action="reject-product" data-pid="${escapeHtml(p.id)}">↩ 差し戻す</button>
      </div>
    </div>` : "";

  const cancelSection = canCancel ? `<button class="action" style="margin-top:8px" data-action="cancel-approval" data-pid="${escapeHtml(p.id)}">確認依頼を取り消す</button>` : "";

  return `<div class="detail-section">
    <h3 class="detail-section-title">承認ステータス</h3>
    <div class="approval-status-banner" style="background:${stateInfo.bg};border:1px solid ${stateInfo.border};border-radius:10px;padding:16px 20px;margin-bottom:16px">
      <div style="font-size:22px;margin-bottom:4px">${stateInfo.icon} <strong style="color:${stateInfo.color}">${stateInfo.label}</strong></div>
      ${p.assignedTo ? `<div style="font-size:12px;color:#64748b">依頼者：${escapeHtml(p.assignedTo)}</div>` : ""}
      ${p.approverName ? `<div style="font-size:12px;color:#64748b">承認者：${escapeHtml(p.approverName)}　${escapeHtml(p.approvalDate||"")}</div>` : ""}
      ${p.approvalComment ? `<div style="font-size:13px;margin-top:8px;white-space:pre-wrap">${escapeHtml(p.approvalComment)}</div>` : ""}
    </div>
    ${cancelSection}
    ${requestSection}
    ${approveSection}
    ${teamMembers.length === 0 ? `<p class="notice" style="margin-top:12px">⚠ チームメンバーが登録されていません。<button class="action" style="margin-left:8px" data-nav="settings-nav">設定画面で登録する</button></p>` : ""}
    <p class="notice" style="margin-top:16px">現在のユーザー：<strong>${currentUserName ? escapeHtml(currentUserName) : "（未設定）"}</strong>　役割：<strong>${({admin:"管理者",editor:"編集者",reviewer:"確認者"}[currentRole]||"未設定")}</strong></p>
  </div>`;
}

// ── ⑦ 食品表示法チェック ─────────────────────────────────────────────
function checkFoodLabel(p, d) {
  const issues = [];
  const err  = (msg, field) => issues.push({ level: "error", msg, field });
  const warn = (msg, field) => issues.push({ level: "warn",  msg, field });
  const info = (msg)        => issues.push({ level: "info",  msg });

  // 必須項目（食品表示基準 第3条）
  if (!p.name?.trim())                                          err("「名称」は必須項目です（食品表示基準 第3条）", "name");
  if (!(p.ingredients||[]).some(i=>i.name?.trim()))             err("「原材料名」は必須項目です", "ingredients");
  if (!p.volume?.trim())                                        err("「内容量」は必須項目です", "volume");
  if (!p.bestBefore?.trim())                                    err("「賞味期限」または「消費期限」は必須項目です", "bestBefore");
  if (!d.storage?.trim())                                       err("「保存方法」は必須項目です", "storage");
  if (!p.manufacturerName?.trim())                              err("「製造者名」は必須項目です（名称・住所・電話番号）", "manufacturerName");
  if (!p.manufacturerAddress?.trim())                           err("「製造者住所」は必須項目です", "manufacturerAddress");

  // アレルゲン
  const ings = (p.ingredients||[]).filter(i=>i.name?.trim());
  if (ings.length && !d.allergens.length && p.allergensMode !== "manual") {
    info("アレルゲンが検出されていません。原材料名を確認してください。");
  }

  // 添加物区分「／」
  const hasAdditives = ings.some(i=>isAdditive(i.name));
  const hasFoods     = ings.some(i=>!isAdditive(i.name));
  if (hasAdditives && hasFoods && d.ingLabel && !d.ingLabel.includes("／")) {
    warn("食品原材料と添加物は「／」で区切る必要があります（食品表示基準 第3条）");
  }

  // 内容量の形式
  if (p.volume && !/\d/.test(p.volume)) {
    warn("内容量に数値が含まれていません。「100g」「500ml」「6個入り」等の形式で入力してください", "volume");
  }

  // JANコード桁数
  if (p.janCode?.trim() && ![8,13].includes(p.janCode.trim().length)) {
    warn(`JANコードは8桁または13桁です（現在 ${p.janCode.trim().length} 桁）`, "janCode");
  }

  // 栄養成分の重量未入力
  const hasWeights = ings.some(i=>parseFloat(i.weight)>0);
  if (ings.length && !hasWeights && p.nutritionMode !== "manual") {
    info("原材料の重量(g)を入力すると栄養成分が自動計算されます");
  }

  // 賞味期限の形式チェック
  const bb = p.bestBefore?.trim();
  if (bb && !/^(\d{4}[.\/\-年]|\d{2}[.\/\-年]|製造日より)/.test(bb)) {
    warn("賞味期限の形式を確認してください（例：2026/10/01、製造日より90日）", "bestBefore");
  }

  // 原材料の配合順チェック（重量が3件以上入力されている場合のみ判定）
  const ingsWithWeight = ings.filter(i => parseFloat(i.weight) > 0);
  if (ingsWithWeight.length >= 3) {
    const weights = ingsWithWeight.map(i => parseFloat(i.weight));
    const isDescending = weights.every((w, idx) => idx === 0 || weights[idx - 1] >= w);
    if (!isDescending) {
      warn("原材料名は配合量の多い順に表示する義務があります（食品表示基準 第3条）。原材料タブの「重量順に並べ直す」で修正してください");
    }
  }

  // 名称と食品添加物の混在チェック（名称に「添加物」「保存料」等が含まれていないか）
  const additiveKeywordsInName = ["添加物","保存料","着色料","甘味料","香料","酸化防止剤"].filter(k => (p.name||"").includes(k));
  if (additiveKeywordsInName.length) {
    warn(`「名称」フィールドに添加物名（${additiveKeywordsInName.join("・")}）が含まれています。名称は商品の一般的名称を入力し、添加物は原材料タブで登録してください`);
  }

  // 原産地チェック（農産物・畜産物・水産物が主原料と推定される場合）
  if (!p.originCountry?.trim()) {
    const originKeywords = ["牛肉","豚肉","鶏肉","羊肉","馬肉","魚","鮭","マグロ","エビ","カニ","イカ","タコ","米","小麦","大豆","野菜","果物","りんご","みかん","いちご","ぶどう","トマト","キャベツ","にんじん","じゃがいも","さつまいも"];
    const ingNames = ings.map(i=>i.name||"").join("・");
    const needsOrigin = originKeywords.some(k => ingNames.includes(k));
    if (needsOrigin) {
      info("農産物・畜産物・水産物が主原料に含まれる可能性があります。「原産地」の表示が義務付けられている場合があります（食品表示基準 第3条の2）。基本情報タブの「原産地」欄をご確認ください");
    }
  }

  // 栄養成分の整合性チェック（4・9・4ルール）
  const nutr = d.nutrition;
  const nKcal    = parseFloat(nutr.kcal)    || 0;
  const nProtein = parseFloat(nutr.protein) || 0;
  const nFat     = parseFloat(nutr.fat)     || 0;
  const nCarbs   = parseFloat(nutr.carbs)   || 0;
  if (nKcal > 0 || nProtein > 0 || nFat > 0 || nCarbs > 0) {
    const nutrUnit = p.nutritionUnit || "100g当たり";
    if (nutrUnit === "100g当たり" && (nProtein + nFat + nCarbs) > 100) {
      warn(`栄養成分の合計（たんぱく質 ${nProtein}g＋脂質 ${nFat}g＋炭水化物 ${nCarbs}g＝${(nProtein+nFat+nCarbs).toFixed(1)}g）が100gを超えています。表示単位「${nutrUnit}」に対して数値が不正の可能性があります`);
    }
    const calcKcal = Math.round(nProtein * 4 + nFat * 9 + nCarbs * 4);
    if (nKcal > 0 && calcKcal > 0 && Math.abs(nKcal - calcKcal) > Math.max(50, nKcal * 0.3)) {
      info(`エネルギー ${nKcal}kcal と三大栄養素から算出した値（約 ${calcKcal}kcal）に差があります（4・9・4ルール）。栄養成分が正確かご確認ください`);
    }
  }

  // アレルゲン括弧書きガイダンス
  if (d.allergens.length > 0 && d.ingLabel) {
    const ingStr = d.ingLabel;
    const hasBracket = d.allergens.some(a => ingStr.includes(`（${a}`) || ingStr.includes(`(${a}`));
    if (!hasBracket) {
      info(`アレルゲン（${d.allergens.join("・")}）を原材料名の中に括弧書きで表示する方法もあります（例：小麦粉（小麦を含む））。現在は別行表示のみです`);
    }
  }

  return issues;
}

// ── 商品規格書 ────────────────────────────────────────────────────────
function specSheetHtml() {
  const productList = products.filter(p=>p.name?.trim());
  if (!specSheetId && productList.length === 0) {
    return saasLayout("商品規格書", `<div class="empty-state"><p>先に商品を登録してください。</p><button class="action primary" data-nav="products">商品管理へ</button></div>`);
  }
  const p = specSheetId ? products.find(x=>x.id===specSheetId) : productList[0];
  if (!p) return saasLayout("商品規格書", `<p>商品が見つかりません。</p>`);
  const d = derive(p);
  const today = new Date().toLocaleDateString("ja-JP");
  const row = (label, val) => val ? `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(String(val))}</td></tr>` : "";

  const productImg = p.imageDataUrl
    ? `<img class="spec-v2-product-img" src="${p.imageDataUrl}" alt="商品画像" onerror="this.onerror=null;this.outerHTML='<div class=\\'spec-v2-product-img-placeholder\\'>⚠️<small>読込失敗</small></div>'">`
    : `<div class="spec-v2-product-img-placeholder">📦<small>画像未登録</small></div>`;

  const costs = calcCosts(p);
  const mc = costRateClass(costs.costRate);

  const specHtml = `<div class="spec-v2" id="spec-print-area">
    <div class="spec-v2-header">
      <div class="spec-v2-title-block">
        <h1>商品規格書</h1>
        <div class="spec-subtitle">${escapeHtml(p.internalName||p.name||"")}</div>
        ${p.internalName&&p.name?`<div class="spec-display-name">表示名称：${escapeHtml(p.name)}</div>`:""}

      </div>
      <div class="spec-v2-meta-block">
        <dl>
          <div><dt>版数：</dt><dd>Rev.${escapeHtml(p.specVersion||"1")}</dd></div>
          <div><dt>作成日：</dt><dd>${escapeHtml(p.specCreatedAt||today)}</dd></div>
          <div><dt>更新日：</dt><dd>${escapeHtml(p.updatedAt||today)}</dd></div>
          <div><dt>担当者：</dt><dd>${escapeHtml(p.specResponsible||"　　　　")}</dd></div>
        </dl>
      </div>
    </div>

    <div class="spec-v2-body">
      <div class="spec-v2-tables">
        <div class="spec-v2-section-label">基本情報</div>
        <table class="spec-v2-table">
          <tbody>
            ${row("商品名", p.name)}
            ${row("品番・商品コード", p.code)}
            ${row("カテゴリ", p.category)}
            ${row("JANコード", p.janCode)}
            ${row("内容量", p.volume)}
            ${row("販売価格", p.price ? `¥${p.price}` : "")}
            ${row("製品サイズ・重量", p.productSize)}
            ${row("荷姿", p.packaging)}
            ${row("ケース入数", p.caseCount)}
          </tbody>
        </table>

        <div class="spec-v2-section-label">品質・規格</div>
        <table class="spec-v2-table">
          <tbody>
            ${row("賞味期限", p.bestBefore)}
            ${row("保存方法", d.storage)}
            ${row("原産地", p.originCountry)}
            ${row("原材料名", d.ingLabel)}
            ${row("アレルゲン", d.allergens.length ? d.allergens.join("・") : "なし")}
            ${p.contaminationEnabled ? row("コンタミネーション", d.contamination) : ""}
          </tbody>
        </table>

        <div class="spec-v2-section-label">栄養成分表示（100g当たり）</div>
        <table class="spec-v2-table">
          <tbody>
            <tr><th>エネルギー</th><td>${d.nutrition.kcal} kcal</td></tr>
            <tr><th>たんぱく質</th><td>${d.nutrition.protein} g</td></tr>
            <tr><th>脂質</th><td>${d.nutrition.fat} g</td></tr>
            <tr><th>炭水化物</th><td>${d.nutrition.carbs} g</td></tr>
            <tr><th>食塩相当量</th><td>${d.nutrition.salt} g</td></tr>
          </tbody>
        </table>

        <div class="spec-v2-section-label">製造者情報</div>
        <table class="spec-v2-table">
          <tbody>
            ${row("製造者名", p.manufacturerName)}
            ${row("住所", p.manufacturerAddress)}
            ${row("電話番号", p.manufacturerPhone)}
            ${row("販売チャネル", (p.salesChannels||[]).join("・"))}
          </tbody>
        </table>

        ${p.memo ? `<div class="spec-v2-section-label">備考・特記事項</div>
        <div class="spec-v2-remark">${escapeHtml(p.memo)}</div>` : ""}
      </div>

      <div class="spec-v2-image-col">
        ${productImg}
        ${specShowCost && costs.costRate !== null ? `<div style="text-align:center;font-size:11px;color:#64748b;margin-top:4px">
          原価率<br><span class="${mc}" style="font-size:18px;font-weight:700">${costs.costRate}%</span>
        </div>` : ""}
      </div>
    </div>

    <div class="spec-v2-footer">
      <div style="font-size:11px;color:#94a3b8">
        発行日：${today}　このドキュメントは${escapeHtml(p.name||"")}の公式規格書です。
      </div>
      ${specShowSig ? `<div class="spec-v2-sig-row">
        <div class="spec-v2-sig-box"><div class="spec-v2-sig-line"></div>作成者</div>
        <div class="spec-v2-sig-box"><div class="spec-v2-sig-line"></div>確認者</div>
        <div class="spec-v2-sig-box"><div class="spec-v2-sig-line"></div>承認者</div>
      </div>` : ""}
    </div>
  </div>`;

  const selectOpts = productList.map(px=>`<option value="${escapeHtml(px.id)}"${px.id===p.id?" selected":""}>${escapeHtml(px.internalName||px.name)}</option>`).join("");
  return saasLayout("商品規格書", `
    <div class="spec-controls">
      <select class="spec-select" data-spec-select>${selectOpts}</select>
      <button class="action primary" data-action="print-spec">🖨 印刷・PDF</button>
      <button class="action" data-action="copy-spec">📋 テキストでコピー</button>
      <label class="spec-cost-toggle">
        <input type="checkbox" id="spec-show-cost" ${specShowCost ? "checked" : ""}>
        原価率を印刷に含める
      </label>
      <label class="spec-cost-toggle">
        <input type="checkbox" id="spec-show-sig" ${specShowSig ? "checked" : ""}>
        承認欄を表示
      </label>
    </div>
    ${specHtml}
  `);
}

// ── AI説明文 ローカル生成（API未設定時のフォールバック） ───────────────
function generateAiDesc(p, channelId) {
  const d = derive(p);
  const name      = p.name || "商品";
  const category  = p.category || "食品";
  const ingFull   = d.ingLabel || "";
  // 添加物より前の一般原材料だけ抽出（／区切りの左側）
  const ingMain   = ingFull ? ingFull.split("／")[0].split("、").slice(0, 4).join("、") : "厳選素材";
  const hasAdditive = ingFull.includes("／");
  const allergens = d.allergens.length ? d.allergens.join("・") : "";
  const noAllergen = d.allergens.length === 0;
  const storage   = d.storage || "";
  const bb        = p.bestBefore || "";
  const vol       = p.volume || "";
  const price     = p.price ? `¥${Number(p.price).toLocaleString()}` : "";
  const mfr       = p.manufacturerName || "";
  const memo      = p.memo || "";
  // ストレージ表現
  const storageNote = storage.includes("冷凍") ? "冷凍保存" : storage.includes("冷蔵") ? "冷蔵保存" : storage.includes("常温") ? "常温保存" : storage;
  // アレルゲン文
  const algLine   = allergens ? `アレルゲン：${allergens}を含む` : "主要アレルゲン不使用";
  // 添加物有無メッセージ
  const additiveMsg = hasAdditive ? "" : "保存料・着色料不使用";

  const gen = {
    rakuten: `【${name}】
${memo ? memo + "\n\n" : ""}■ 商品詳細
・商品名：${name}${category !== "食品" ? `（${category}）` : ""}
・内容量：${vol || "記載なし"}
・賞味期限：${bb || "商品パッケージをご確認ください"}
・保存方法：${storage || "商品パッケージをご確認ください"}
${price ? `・価格：${price}（税込）` : ""}

■ 原材料
${ingFull || "商品パッケージをご確認ください"}

■ アレルギー情報
${algLine}${additiveMsg ? `\n${additiveMsg}` : ""}

■ 製造者情報
${mfr || "製造者情報は商品パッケージをご確認ください"}
${p.manufacturerAddress ? p.manufacturerAddress : ""}

※ 表示内容は変更になる場合があります。最新情報は商品パッケージをご確認ください。`,

    amazon: `【商品タイトル案】
${mfr ? `[${mfr}] ` : ""}${name}${vol ? ` ${vol}` : ""}${category !== "食品" ? ` | ${category}` : ""}

【商品の特長】
• 商品名：${name}
• 内容量：${vol || "記載なし"}
• 原材料：${ingMain}${hasAdditive ? "など" : ""}
• 保存方法：${storageNote || "商品パッケージ参照"}
• 賞味期限：${bb || "商品パッケージ参照"}
${additiveMsg ? `• ${additiveMsg}` : ""}

【アレルギー情報】
${algLine}

【商品説明】
${memo || `${name}は${ingMain}を使用した${category}です。`}
${price ? `\n希望小売価格：${price}（税込）` : ""}

製造者：${mfr || "記載なし"}
${p.manufacturerAddress ? `所在地：${p.manufacturerAddress}` : ""}`,

    base: `${name}
${vol ? `内容量：${vol}` : ""}${price ? `　${price}（税込）` : ""}

${memo || `${ingMain}を使った${category}です。`}

─────────────────
原材料：${ingFull || "記載なし"}
賞味期限：${bb || "商品パッケージをご確認ください"}
保存方法：${storage || "商品パッケージをご確認ください"}
${allergens ? `アレルゲン：${allergens}を含む` : ""}
${additiveMsg || ""}
─────────────────
製造者：${mfr || "記載なし"}
${p.manufacturerAddress || ""}`,

    instagram: `${name} 🛒
${memo ? memo.slice(0, 80) + (memo.length > 80 ? "…" : "") : `${ingMain}を使った${category}です`}

📦 内容量：${vol || "—"}
🗓 賞味期限：${bb || "—"}
❄️ 保存：${storageNote || "—"}
${allergens ? `⚠️ アレルゲン：${allergens}` : "✅ 主要アレルゲン不使用"}
${price ? `💴 ${price}（税込）` : ""}

#${name.replace(/[\s　]/g, "")}${category && category !== "食品" ? ` #${category.replace(/\s/g, "")}` : ""} #食品 #手作り #お取り寄せ #ギフト #日本製`,

    wholesale: `【業務用・卸向け商品案内】

品名：${name}
品番：${p.code || "—"}　カテゴリ：${category}
内容量：${vol || "—"}　賞味期限：${bb || "—"}
保存方法：${storage || "—"}

【原材料・アレルゲン】
原材料名：${ingFull || "—"}
アレルゲン：${allergens || "なし"}
${additiveMsg || ""}

【荷姿・規格】
荷姿：${p.packaging || "応相談"}
ケース入数：${p.caseCount || "応相談"}
製品サイズ：${p.productSize || "応相談"}
希望小売価格：${price || "応相談"}

【製造者】
${mfr || "自社製造"}
${p.manufacturerAddress ? `所在地：${p.manufacturerAddress}` : ""}
${p.manufacturerPhone ? `TEL：${p.manufacturerPhone}` : ""}

※ロット・数量により価格応相談。`,

    pop: `${name}
${memo ? memo.slice(0, 50) : `${ingMain}を使用`}

内容量　${vol || "—"}
賞味期限　${bb || "—"}
保存方法　${storageNote || "—"}
${allergens ? `アレルゲン　${allergens}` : ""}
${price ? `${price}（税込）` : ""}`,
  };

  return gen[channelId] || gen.rakuten;
}

function getAiTexts() {
  try { return JSON.parse(safeGet("fmcc-ai-texts") || "{}"); } catch { return {}; }
}
function saveAiText(productId, channelId, text) {
  const texts = getAiTexts();
  texts[`${productId}:${channelId}`] = text;
  safeSet("fmcc-ai-texts", JSON.stringify(texts));
}
function loadAiText(productId, channelId) {
  return getAiTexts()[`${productId}:${channelId}`] || "";
}

// ── AI商品説明文プロンプト生成 ─────────────────────────────────────────
function buildAiDescPrompt(p, channelId) {
  const d = derive(p);
  const base = `商品名：${p.name||"未入力"}
カテゴリ：${p.category||"未入力"}
内容量：${p.volume||"未入力"}
販売価格：${p.price ? "¥"+p.price : "未入力"}
原材料：${d.ingLabel||"未入力"}
アレルゲン：${d.allergens.join("・")||"なし"}
保存方法：${d.storage||"未入力"}
賞味期限：${p.bestBefore||"未入力"}
製造者：${p.manufacturerName||"未入力"}
メモ：${p.memo||"なし"}`;

  const instructions = {
    rakuten: `以下の商品情報をもとに、楽天市場用の商品説明文を作成してください。\n・見出し（h2タグ）を使って読みやすく\n・商品の魅力・特徴を3〜5点箇条書き\n・安全・品質へのこだわりをアピール\n・お客様の購買意欲を高める言葉を入れる\n・文字数：500〜800文字`,
    amazon: `以下の商品情報をもとに、Amazon商品説明（商品紹介コンテンツ）を作成してください。\n・商品タイトルの提案も含める\n・5つの商品特徴を箇条書き（各40文字以内）\n・詳細な商品説明（300〜500文字）\n・キーワードを自然に含める`,
    base: `以下の商品情報をもとに、BASEまたはShopify向けの商品説明を作成してください。\n・親しみやすいトーン\n・商品の背景・ストーリーを含める\n・使い方や食べ方の提案\n・300〜500文字`,
    instagram: `以下の商品情報をもとに、Instagram投稿文を作成してください。\n・感情を動かす導入文\n・絵文字を適切に使用\n・ハッシュタグを10〜15個提案\n・200文字以内`,
    wholesale: `以下の商品情報をもとに、業務用・卸向けの商品説明文を作成してください。\n・品質・安全性を重点的にアピール\n・数量・価格の問い合わせ誘導\n・箇条書きで仕様を整理\n・300〜500文字`,
    pop: `以下の商品情報をもとに、店頭POP用の短い説明文を作成してください。\n・インパクトのあるキャッチコピー（20文字以内）\n・商品の最大の魅力を1〜2文で\n・合計60文字以内`,
  };

  return `【${AI_CHANNELS.find(c=>c.id===channelId)?.label||"商品説明"}の作成をお願いします】\n\n■ 商品情報\n${base}\n\n■ 依頼内容\n${instructions[channelId]||"商品説明文を作成してください。"}`;
}

function aiDescriptionsHtml() {
  const productList = products.filter(p=>p.name?.trim());
  if (productList.length === 0) {
    return saasLayout("AI説明文", `<div class="empty-state"><p>先に商品を登録してください。</p><button class="action primary" data-nav="products">商品管理へ</button></div>`);
  }
  const p = aiDescId ? products.find(x=>x.id===aiDescId) : productList[0];
  if (!p) return saasLayout("AI説明文", `<p>商品が見つかりません。</p>`);

  const selectOpts = productList.map(px=>`<option value="${escapeHtml(px.id)}"${px.id===p.id?" selected":""}>${escapeHtml(px.internalName||px.name)}</option>`).join("");
  const channelBtns = AI_CHANNELS.map(ch=>`<button class="ch-btn${aiDescChannel===ch.id?" active":""}" data-ai-ch="${ch.id}">${ch.label}</button>`).join("");

  const savedText = loadAiText(p.id, aiDescChannel);
  const currentText = aiEditText || savedText;
  const hasSaved = !!savedText;

  return saasLayout("AI説明文", `
    <div class="ai-page-layout">
      <div class="ai-left-panel">
        <div class="ai-desc-toolbar">
          <div class="ai-desc-select-row">
            <label>商品を選択：</label>
            <select class="spec-select" data-ai-product-select>${selectOpts}</select>
          </div>
        </div>
        <div class="ai-desc-channels">${channelBtns}</div>

        <div class="ai-generate-section">
          <button class="action primary ai-generate-btn" data-action="generate-ai-desc" ${aiDescLoading ? "disabled" : ""}>
            ${aiDescLoading ? "⏳ 生成中..." : "✦ AI説明文を生成"}
          </button>
          <span class="ai-generate-note">${aiDescLoading ? "Groq AIが説明文を作成しています..." : "商品情報をもとに説明文を自動生成します"}</span>
        </div>

        <div class="ai-result-section${(currentText || aiDescLoading) ? "" : " hidden"}" id="ai-result-section">
          <div class="ai-result-header">
            <span class="ai-result-label">生成結果</span>
            <div class="ai-result-actions">
              <button class="action" data-action="copy-ai-result">📋 コピー</button>
              <button class="action primary" data-action="save-ai-result">💾 保存</button>
              <button class="action" data-action="regen-ai-desc">↺ 再生成</button>
            </div>
          </div>
          <textarea class="ai-result-textarea" id="ai-result-text">${escapeHtml(currentText)}</textarea>
          ${hasSaved ? `<p class="ai-saved-note">✅ 保存済み</p>` : ""}
        </div>
      </div>

      <div class="ai-right-panel">
        <div class="ai-prompt-panel">
          <div class="ai-prompt-panel-title">📋 外部AI用プロンプト</div>
          <p class="ai-prompt-panel-desc">ChatGPT・Claude などの外部AIを使う場合はこちらをコピーしてください。</p>
          <textarea class="ai-prompt-textarea" id="ai-desc-prompt" readonly>${escapeHtml(buildAiDescPrompt(p, aiDescChannel))}</textarea>
          <button class="action" data-action="copy-ai-desc">プロンプトをコピー</button>
        </div>
      </div>
    </div>
  `);
}

// ── チーム・承認ページ ────────────────────────────────────────────────
function teamApprovalHtml() {
  const ROLES = [{ v:"admin", l:"管理者（承認・編集すべて可）" }, { v:"editor", l:"編集者（商品編集・確認依頼可）" }, { v:"reviewer", l:"確認者（承認・差し戻し可）" }];
  const memberList = teamMembers.length
    ? teamMembers.map((m, i) => `
      <div class="team-member-row">
        <span class="team-member-name">👤 ${escapeHtml(m.name)}</span>
        <span class="team-member-role">${{admin:"管理者",editor:"編集者",reviewer:"確認者"}[m.role]||m.role}</span>
        <button class="team-member-self${currentUserName===m.name?" active":""}" data-action="set-current-user" data-uname="${escapeHtml(m.name)}">${currentUserName===m.name?"✓ 自分":"自分として使う"}</button>
        <button class="icon-btn" data-action="del-team-member" data-midx="${i}" title="削除">×</button>
      </div>`).join("")
    : `<p class="notice">まだメンバーが登録されていません。</p>`;

  const reviewList = products.filter(p => p.approvalStatus === "review");
  const approvedList = products.filter(p => p.approvalStatus === "approved");
  const rejectedList = products.filter(p => p.approvalStatus === "rejected");

  const productRow = (p) => `
    <div class="approval-product-row" data-nav-product-detail="${escapeHtml(p.id)}" role="button" tabindex="0">
      <span class="approval-product-name">${escapeHtml(p.name||"（名称未入力）")}</span>
      ${p.assignedTo ? `<span class="approval-product-meta">依頼：${escapeHtml(p.assignedTo)}</span>` : ""}
      ${p.approverName ? `<span class="approval-product-meta">承認：${escapeHtml(p.approverName)}</span>` : ""}
      <span class="approval-product-date">${escapeHtml(p.approvalDate||p.updatedAt||"")}</span>
    </div>`;

  return saasLayout("チーム・承認", `
    <div class="settings-sections">
      <div class="settings-card">
        <h3>👥 チームメンバー</h3>
        <p class="notice">同じ端末・ブラウザを複数人で共有している場合に、誰が操作しているかを記録できます。</p>
        <div class="team-member-list">${memberList}</div>
        <div class="team-add-row">
          <input id="team-member-name-input" placeholder="名前を入力（例：田中 花子）" style="flex:1">
          <select id="team-member-role-select">
            ${ROLES.map(r=>`<option value="${r.v}">${r.l}</option>`).join("")}
          </select>
          <button class="action primary" data-action="add-team-member">追加</button>
        </div>
        ${currentUserName ? `<p style="margin-top:12px;font-size:13px">現在のユーザー：<strong>${escapeHtml(currentUserName)}</strong></p>` : `<p class="notice" style="margin-top:12px">「自分として使う」をクリックするとユーザーを切り替えられます。</p>`}
      </div>
      <div class="settings-card">
        <h3>🔵 確認待ち（${reviewList.length}件）</h3>
        ${reviewList.length ? reviewList.map(productRow).join("") : `<p class="notice">確認待ちの商品はありません。</p>`}
      </div>
      <div class="settings-card">
        <h3>✅ 承認済み（${approvedList.length}件）</h3>
        ${approvedList.length ? approvedList.map(productRow).join("") : `<p class="notice">承認済みの商品はありません。</p>`}
      </div>
      <div class="settings-card">
        <h3>↩ 差し戻し（${rejectedList.length}件）</h3>
        ${rejectedList.length ? rejectedList.map(productRow).join("") : `<p class="notice">差し戻しの商品はありません。</p>`}
      </div>
    </div>
  `);
}

// ── ライセンスキー認証 ────────────────────────────────────────────────
async function activateLicense() {
  const inp = document.getElementById("license-key-input");
  const key = inp?.value?.trim();
  if (!key) { showStatus("ライセンスキーを入力してください"); return; }
  const btn = document.getElementById("license-activate-btn");
  if (btn) { btn.disabled = true; btn.textContent = "確認中..."; }
  try {
    const res = await fetch("/api/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    const data = await res.json();
    if (data.ok && data.plan) {
      currentPlan = data.plan;
      safeSet("food-label-plan", currentPlan);
      safeSet("food-label-license-key", key);
      showStatus(`✓ ${PLANS[data.plan]?.label || data.plan}プランが有効になりました！`, { duration: 5000 });
      render();
    } else {
      showStatus(data.error || "ライセンスキーが無効です", { duration: 5000 });
      if (btn) { btn.disabled = false; btn.textContent = "認証する"; }
    }
  } catch {
    showStatus("通信エラーが発生しました。インターネット接続を確認してください", { duration: 5000 });
    if (btn) { btn.disabled = false; btn.textContent = "認証する"; }
  }
}

// ── 設定（新版） ──────────────────────────────────────────────────────
function newSettingsHtml() {
  const companyInfo = (() => { try { return JSON.parse(safeGet("fmcc-company-info") || "{}"); } catch { return {}; } })();
  const userKwList = userAdditiveKw.map((kw, i) =>
    `<div class="additive-kw-row"><span>${escapeHtml(kw)}</span><button class="icon-btn" data-del-additive-kw="${i}">×</button></div>`
  ).join("");
  const sbUrl = safeGet("fmcc-supabase-url") || "";
  const sbKey = safeGet("fmcc-supabase-key") || "";
  const sbConnected = !!(sbUrl && sbKey);
  const ROLES = { admin:"管理者", editor:"編集者", reviewer:"確認者" };
  const currentRole = teamMembers.find(m => m.name === currentUserName)?.role || "";
  const memberButtons = teamMembers.length
    ? teamMembers.map(m => `<button class="action${currentUserName===m.name?" primary":""}" data-action="set-current-user" data-uname="${escapeHtml(m.name)}">${currentUserName===m.name?"✓ ":""} ${escapeHtml(m.name)}${m.role?` (${ROLES[m.role]||m.role})`:""}  ${currentUserName===m.name?"（使用中）":""}</button>`).join("")
    : `<p class="notice">メンバーがまだ登録されていません。<button class="action" style="margin-left:8px" data-nav="team-approval">チーム・承認で登録する</button></p>`;
  return saasLayout("設定", `
    <div class="settings-sections">
      <div class="settings-card">
        <h3>🏭 会社・製造者情報</h3>
        <p class="notice" style="margin-bottom:12px">商品ラベルに表示する製造者情報を一括設定できます。保存後に新規作成した商品に自動入力されます。</p>
        <div class="company-info-grid">
          <label class="ci-field"><span>会社名</span><input id="ci-company-name" placeholder="例：株式会社FoodPilot" value="${escapeHtml(companyInfo.companyName||"")}"></label>
          <label class="ci-field"><span>製造者名（ラベル表示用）</span><input id="ci-mfr-name" placeholder="例：株式会社FoodPilot 食品製造部" value="${escapeHtml(companyInfo.manufacturerName||"")}"></label>
          <label class="ci-field ci-field-wide"><span>製造者住所</span><input id="ci-mfr-address" placeholder="例：東京都千代田区〇〇1-2-3" value="${escapeHtml(companyInfo.manufacturerAddress||"")}"></label>
          <label class="ci-field"><span>電話番号</span><input id="ci-mfr-phone" placeholder="例：03-1234-5678" value="${escapeHtml(companyInfo.manufacturerPhone||"")}"></label>
        </div>
        <div class="settings-actions" style="margin-top:12px">
          <button class="action primary" data-action="save-company-info">💾 保存する</button>
          ${products.length > 0 ? `<button class="action" data-action="apply-company-info-all">📦 全${products.length}件の商品に適用（空欄のみ）</button>` : ""}
        </div>
        ${companyInfo.manufacturerName ? `<p style="margin-top:8px;font-size:12px;color:#16a34a">✓ 設定済み：${escapeHtml(companyInfo.manufacturerName)}</p>` : ""}
      </div>
      <div class="settings-card">
        <h3>👤 現在のユーザー</h3>
        ${currentUserName
          ? `<p style="margin-bottom:10px">現在 <strong>${escapeHtml(currentUserName)}</strong>${currentRole?` （${ROLES[currentRole]||currentRole}）`:""}  として操作中です。</p>`
          : `<p class="notice" style="margin-bottom:10px">ユーザーが選択されていません。下から自分の名前を選んでください。</p>`
        }
        <div style="display:flex;gap:8px;flex-wrap:wrap">${memberButtons}</div>
        <p style="margin-top:10px;font-size:12px;color:#64748b">メンバーの追加・削除は <button class="action" style="padding:2px 8px;font-size:12px" data-nav="team-approval">チーム・承認</button> から行えます。</p>
      </div>
      <div class="settings-card">
        <h3>🤖 FoodPilot AI</h3>
        <div class="ai-builtin-status">
          <span class="ai-builtin-dot"></span>
          <span class="ai-builtin-label">FoodPilot AI は利用可能です</span>
        </div>
        <p class="notice" style="margin-top:10px">FoodPilot のAIアシスタントはプランに含まれています。別途APIキーの設定は不要です。<br>AI説明文・食品表示チェック・AI相談がすぐにご利用いただけます。</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
          <button class="action" data-nav="ai-descriptions-nav">✨ AI説明文を使う</button>
          <button class="action" data-nav="ai-consult-nav">💬 AI相談を使う</button>
        </div>
      </div>
      <div class="settings-card">
        <h3>💳 プラン・ご購入</h3>
        ${planHtml()}
        <div class="license-section">
          <div class="license-section-title">ライセンスキーをお持ちの方</div>
          <p class="notice">ご購入後にメールでお送りするライセンスキーを入力するとプランが有効になります。</p>
          <div class="license-input-row">
            <input id="license-key-input" class="license-key-input" placeholder="例：FP-PRO-XXXX-XXXX" value="${escapeHtml(safeGet('food-label-license-key') || '')}">
            <button id="license-activate-btn" class="action primary" data-action="activate-license">認証する</button>
          </div>
          ${currentPlan !== "free" ? `<p class="license-active-note">✓ 現在 <strong>${escapeHtml(PLANS[currentPlan]?.label || currentPlan)}プラン</strong> が有効です</p>` : ""}
        </div>
      </div>
      <div class="settings-card">
        <h3>💾 データのバックアップと復元</h3>
        ${(() => {
          const s = getStorageInfo();
          const barColor = s.pct >= 95 ? "#dc2626" : s.pct >= 80 ? "#d97706" : "#2563eb";
          return `<div class="storage-meter">
            <div class="storage-meter-head">
              <span>このブラウザの保存容量</span>
              <strong style="color:${barColor}">${s.usedMB} MB / 5 MB（${s.pct}%使用中）</strong>
            </div>
            <div class="storage-meter-track"><div class="storage-meter-fill" style="width:${s.pct}%;background:${barColor}"></div></div>
            ${s.pct >= 80 ? `<p class="notice" style="color:${barColor};margin-top:6px">容量が少なくなっています。下のボタンでバックアップを保存してください。商品画像を削除すると容量を回収できます。</p>` : ""}
          </div>`;
        })()}
        <div class="settings-data-section">
          <div class="settings-data-group">
            <div class="settings-data-label">すべてのデータをバックアップ（推奨）</div>
            <div class="settings-actions">
              <button class="action primary" data-action="export-json">📤 バックアップファイルを保存する</button>
              <label class="action share-btn import-label">📥 バックアップから復元する<input type="file" accept=".json" data-json-import style="display:none"></label>
            </div>
            <p class="notice">原材料・アレルゲン・栄養成分・原価などすべての情報が含まれます。別の端末やスタッフへの共有にも使えます。</p>
          </div>
          <div class="settings-data-group">
            <div class="settings-data-label">Excelで開けるファイルを書き出す（基本情報のみ）</div>
            <div class="settings-actions">
              <button class="action" data-action="export-csv">📊 書き出す</button>
              <label class="action secondary import-label">📊 Excelファイルを読み込む<input type="file" accept=".csv" data-csv-import style="display:none"></label>
            </div>
          </div>
        </div>
        <p class="notice">データはすべてこのブラウザ（このパソコン・スマホ）に保存されています。定期的にバックアップを保存しておくことをおすすめします。</p>
      </div>
      <div class="settings-card">
        <h3>☁ クラウド同期・バックアップ</h3>
        <div class="cloud-sync-status-bar">
          <div class="cloud-sync-status-row">
            <span class="cloud-sync-dot ${sbConnected?"dot-green":"dot-gray"}"></span>
            <span class="cloud-sync-status-lbl">${sbConnected ? "✓ クラウドと接続中" : "未接続（このブラウザのみに保存中）"}</span>
            ${cloudSyncLastAt ? `<span class="cloud-sync-lastsync">最終同期: ${escapeHtml(cloudSyncLastAt)}</span>` : ""}
          </div>
          ${sbConnected ? `<div class="cloud-sync-actions">
            <button class="action primary" data-action="supabase-push">⬆ クラウドに保存</button>
            <button class="action" data-action="supabase-pull">⬇ クラウドから読み込む</button>
          </div>` : ""}
        </div>
        <p class="notice" style="margin-top:8px">${sbConnected
          ? "✅ 商品を保存するたびに自動でクラウドに同期されます。別のパソコン・スマホでも同じデータを使えます。"
          : "💡 クラウドに接続すると、別のパソコン・スマホからも同じデータにアクセスできます。"
        }</p>
        <details style="margin-top:16px" ${!sbConnected ? "open" : ""}>
          <summary style="font-size:13px;font-weight:600;cursor:pointer;color:#2563eb">▸ クラウド接続の設定${sbConnected ? "を変更する" : "をする（無料）"}</summary>
          <div style="margin-top:14px;display:flex;flex-direction:column;gap:10px">

            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px">
              <div style="font-weight:600;font-size:13px;margin-bottom:4px">① 無料アカウントを作成する</div>
              <p style="font-size:12px;color:#374151;margin:0">
                <a class="field-link" href="https://supabase.com" target="_blank" rel="noopener">supabase.com</a> にアクセスして「Start for free」でアカウントを作り、新しいプロジェクトを作成してください。
              </p>
            </div>

            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px">
              <div style="font-weight:600;font-size:13px;margin-bottom:4px">② データ保存先を初期設定する（初回のみ）</div>
              <p style="font-size:12px;color:#374151;margin:0 0 8px">プロジェクト内の「SQL Editor」を開いて、以下のコードを貼り付けて「Run」を押してください：</p>
              <pre style="background:#1e293b;color:#e2e8f0;padding:10px;border-radius:6px;font-size:10px;overflow-x:auto;margin:0">CREATE TABLE IF NOT EXISTS products (
  id          TEXT PRIMARY KEY,
  name        TEXT,
  updated_at  TEXT,
  data        TEXT NOT NULL
);
ALTER TABLE products DISABLE ROW LEVEL SECURITY;</pre>
            </div>

            <div style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:12px">
              <div style="font-weight:600;font-size:13px;margin-bottom:4px">③ 接続情報を入力して保存する</div>
              <p style="font-size:12px;color:#374151;margin:0 0 10px">プロジェクトの「Settings」→「API」を開き、2つの値をコピーして貼り付けてください：</p>
              <div class="field" style="margin-bottom:8px">
                <span style="font-size:12px">接続先アドレス <span style="color:#64748b;font-weight:400">（Settings → API → "Project URL"）</span></span>
                <input id="sb-url-input" placeholder="https://xxxx.supabase.co" value="${escapeHtml(sbUrl)}" style="font-family:monospace;font-size:12px">
              </div>
              <div class="field" style="margin-bottom:14px">
                <span style="font-size:12px">認証キー <span style="color:#64748b;font-weight:400">（Settings → API Keys → Legacy → "anon" のeyJで始まる文字列）</span></span>
                <input id="sb-key-input" type="password" placeholder="eyJで始まる長い文字列" value="${escapeHtml(sbKey)}" style="font-family:monospace;font-size:12px">
              </div>
              <button class="action primary" data-action="save-supabase-cfg">🔗 接続して保存</button>
              ${sbConnected ? `<button class="action" data-action="disconnect-cloud" style="margin-left:8px;color:#ef4444;border-color:#ef4444">接続を解除</button>` : ""}
            </div>

          </div>
        </details>
      </div>
      <div class="settings-card">
        <h3>📜 バックアップ履歴</h3>
        <p class="notice">JSONエクスポートを実行した記録。実際のファイルはダウンロードフォルダを確認してください。</p>
        ${(() => {
          try {
            const hist = JSON.parse(safeGet("fmcc-backup-history") || "[]");
            if (!hist.length) return `<p class="notice" style="color:#94a3b8">まだバックアップを作成していません。</p>`;
            return `<div class="backup-hist-list">${hist.slice(0,8).map(h=>`
              <div class="backup-hist-row">
                <span class="backup-hist-date">${escapeHtml(h.date)}</span>
                <span class="backup-hist-count">${h.count}件</span>
                <span class="backup-hist-type">${h.withImages?"📦 画像あり":"📄 テキストのみ"}</span>
              </div>`).join("")}</div>`;
          } catch { return ""; }
        })()}
        <div style="margin-top:12px">
          <button class="action primary" data-action="export-json">📤 今すぐバックアップ</button>
        </div>
      </div>
      <div class="settings-card">
        <h3>添加物の判定キーワード</h3>
        <p class="notice" style="margin-bottom:10px">原材料名に含まれていると「添加物」として表示されるキーワードを追加できます。</p>
        <div class="additive-kw-list">
          ${userKwList || `<p class="empty-note">追加キーワードなし（初期設定のみ使用中）</p>`}
        </div>
        <div class="additive-kw-add-row">
          <input id="additive-kw-input" placeholder="例：重曹、天然香料" style="flex:1">
          <button class="action" data-action="add-additive-kw">追加</button>
        </div>
        <details style="margin-top:10px">
          <summary style="font-size:11px;color:#94a3b8;cursor:pointer">最初から設定されているキーワード一覧 (${ADDITIVE_KW_DEFAULT.length}件)</summary>
          <p class="notice" style="margin-top:4px">${ADDITIVE_KW_DEFAULT.join("、")}</p>
        </details>
      </div>
      <div class="settings-card">
        <h3>📖 使い方ガイド</h3>
        <p class="notice" style="margin-bottom:12px">FoodPilotの主な機能を7ステップで説明するガイドです。</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px">
          ${TUTORIAL_STEPS.map((s,i)=>`<span style="font-size:12px;background:${s.bg};color:${s.color};padding:4px 10px;border-radius:20px;font-weight:600">${s.icon} ${escapeHtml(s.title)}</span>`).join("")}
        </div>
        <button class="action primary" data-action="show-tutorial">📖 ガイドをもう一度見る</button>
      </div>
    </div>
  `);
}

// ── ⑥ Supabaseクラウド同期 → src/db-cloud.js に移動 ────────────────

// ── 商品マスター保存 ──────────────────────────────────────────────────
function scheduleAutoSaveMaster() {
  masterAutoSaveStatus = "editing";
  updateMasterSaveStatus();
  clearTimeout(masterAutoSaveTimer);
  masterAutoSaveTimer = setTimeout(() => {
    saveMaster(true);
  }, 2000);
}
function updateMasterSaveStatus() {
  const el = document.getElementById("master-autosave-status");
  if (!el) return;
  if (masterAutoSaveStatus === "editing") { el.textContent = "編集中…"; el.className = "autosave-status autosave-editing"; }
  else if (masterAutoSaveStatus === "saved") { el.textContent = "保存済み"; el.className = "autosave-status autosave-ok"; }
  else { el.textContent = ""; el.className = "autosave-status"; }
}
function suggestStorage(ingredients) {
  const names = (ingredients || []).map(i => (i.name || "").toLowerCase());
  const has = (...kws) => names.some(n => kws.some(k => n.includes(k)));
  if (has("冷凍","アイスクリーム","アイス")) return "要冷凍（−18℃以下）";
  if (has("生クリーム","牛乳","乳","ヨーグルト","チーズ","納豆","豆腐","豆乳","鮮魚","刺身","レバー","鶏肉","豚肉","牛肉","生卵")) return "要冷蔵（10℃以下）";
  if (has("魚","肉","卵","生")) return "要冷蔵（10℃以下）";
  return "直射日光・高温多湿を避け、涼しい場所で保存してください。";
}

function updateMiniPreview() {
  const panel = document.getElementById("detail-mini-preview");
  if (!panel) return;
  const p = products.find(x => x.id === productDetailId);
  if (!p) return;
  const d = derive(p);
  panel.querySelector(".mlp-label-wrap").innerHTML = basicLabelHtml(p, d);
  panel.querySelector(".mlp-nutrition-wrap").innerHTML = nutritionLabelHtml(d);
}

function saveMaster(isAuto = false) {
  const p = products.find(x=>x.id===productDetailId);
  if (!p) return;
  document.querySelectorAll("[data-master-field]").forEach(el => {
    p[el.dataset.masterField] = el.value;
  });
  const chs = [];
  document.querySelectorAll("[data-sales-ch]").forEach(el => {
    if (el.checked) chs.push(el.dataset.salesCh);
  });
  p.salesChannels = chs;
  // 原材料インライン編集データ保存（原材料タブ表示時のみ）
  const ingNameEls = document.querySelectorAll("[data-master-ing-name]");
  if (ingNameEls.length) {
    const newIngs = [];
    ingNameEls.forEach(el => {
      const idx = parseInt(el.dataset.masterIngName);
      const weightEl = document.querySelector(`[data-master-ing-weight="${idx}"]`);
      const name = el.value.trim();
      const weight = weightEl ? weightEl.value.trim() : "";
      if (name || weight) newIngs.push({ id: (p.ingredients[idx]||{}).id || uid(), name, weight });
    });
    if (newIngs.length) p.ingredients = newIngs;
    else if (!p.ingredients.length) p.ingredients = [{ id: uid(), name: "", weight: "" }];
  }
  // 原価データ保存
  document.querySelectorAll("[data-cost-name]").forEach(el => {
    const i = parseInt(el.dataset.costName);
    if (p.costItems[i]) p.costItems[i].name = el.value;
  });
  document.querySelectorAll("[data-cost-amount]").forEach(el => {
    const i = parseInt(el.dataset.costAmount);
    if (p.costItems[i]) p.costItems[i].amount = el.value;
  });
  document.querySelectorAll("[data-cost-unit]").forEach(el => {
    const i = parseInt(el.dataset.costUnit);
    if (p.costItems[i]) p.costItems[i].unit = el.value;
  });
  document.querySelectorAll("[data-cost-price]").forEach(el => {
    const i = parseInt(el.dataset.costPrice);
    if (p.costItems[i]) p.costItems[i].unitPrice = el.value;
  });
  document.querySelectorAll("[data-cost-punit]").forEach(el => {
    const i = parseInt(el.dataset.costPunit);
    if (p.costItems[i]) p.costItems[i].priceUnit = el.value;
  });
  document.querySelectorAll("[data-cost-loss]").forEach(el => {
    const i = parseInt(el.dataset.costLoss);
    if (p.costItems[i]) p.costItems[i].lossRate = el.value;
  });
  p.updatedAt = new Date().toLocaleDateString("ja-JP");
  saveProducts();
  updateMiniPreview();
  masterAutoSaveStatus = "saved";
  updateMasterSaveStatus();
  if (!isAuto) {
    if (!p.name.trim() && !p.internalName.trim()) {
      showStatus("⚠️ 商品名が未入力です。「商品名」欄を入力してください", { duration: 5000 });
      requestAnimationFrame(() => {
        const nameEl = document.querySelector("[data-master-field='name']");
        if (nameEl) { nameEl.focus(); nameEl.classList.add("field-highlight"); setTimeout(() => nameEl.classList.remove("field-highlight"), 2000); }
      });
    } else {
      showStatus(`✓ 「${p.name||p.internalName||"商品"}」を保存しました`);
    }
  }
  document.querySelectorAll("[data-action='save-master']").forEach(btn => {
    btn.textContent = "✓ 保存済み";
    btn.disabled = true;
    setTimeout(() => { btn.textContent = "保存する"; btn.disabled = false; }, 2000);
  });
  setTimeout(() => { masterAutoSaveStatus = ""; updateMasterSaveStatus(); }, 3000);
}

// ══ AI相談機能 ═══════════════════════════════════════════════════════════

function getConsultHistory(productId) {
  try { return JSON.parse(safeGet("fmcc-ai-consult") || "{}")[productId] || []; }
  catch { return []; }
}
function saveConsultHistory(productId, msgs) {
  const all = (() => { try { return JSON.parse(safeGet("fmcc-ai-consult") || "{}"); } catch { return {}; } })();
  all[productId] = msgs.slice(-60);
  safeSet("fmcc-ai-consult", JSON.stringify(all));
}

function renderMarkdown(text) {
  if (!text) return "";
  let h = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  h = h.replace(/^### (.+)$/gm, "<h4 class='md-h4'>$1</h4>");
  h = h.replace(/^## (.+)$/gm, "<h3 class='md-h3'>$1</h3>");
  h = h.replace(/^# (.+)$/gm, "<h2 class='md-h2'>$1</h2>");
  h = h.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  h = h.replace(/^\|(.+)\|$/gm, (_, inner) => {
    if (inner.replace(/[\s\-|:]/g, "").length === 0) return "";
    const cells = inner.split("|").map(c => "<td class='md-td'>" + c.trim() + "</td>").join("");
    return "<tr>" + cells + "</tr>";
  });
  h = h.replace(/(<tr>[\s\S]*?<\/tr>)+/g, m => "<table class='md-table'>" + m + "</table>");
  h = h.replace(/^[-・•] (.+)$/gm, "<li class='md-li'>$1</li>");
  h = h.replace(/^\d+\. (.+)$/gm, "<li class='md-li'>$1</li>");
  h = h.replace(/(<li[^>]*>[\s\S]*?<\/li>)+/g, m => "<ul class='md-ul'>" + m + "</ul>");
  h = h.replace(/\n\n/g, "</p><p class='md-p'>");
  h = h.replace(/\n/g, "<br>");
  return "<p class='md-p'>" + h + "</p>";
}

const CONSULT_TEMPLATES = [
  { label: "食品表示に問題はありますか？", key: "check_label" },
  { label: "アレルゲン表示を確認してください", key: "check_allergens" },
  { label: "食品表示法上の注意点は？", key: "legal_notes" },
  { label: "改善点を教えてください", key: "improvements" },
  { label: "原材料名の表示順を確認", key: "ingredients_order" },
  { label: "栄養成分表示の確認", key: "nutrition_check" },
];

function generateConsultResponse(p, questionKey) {
  const d = derive(p);
  const dn = p.internalName || p.name || "（名称未設定）";
  const ings = (p.ingredients || []).filter(i => i.name && i.name.trim());
  const ingWithW = ings.filter(i => Number(i.weight) > 0);
  switch (questionKey || "general") {
    case "check_label": {
      const issues = [];
      if (!p.name || !p.name.trim()) issues.push("**名称** が未入力（必須）");
      if (!ings.length) issues.push("**原材料名** が未入力（必須）");
      if (!p.volume || !p.volume.trim()) issues.push("**内容量** が未入力（必須）");
      if (!p.bestBefore || !p.bestBefore.trim()) issues.push("**賞味期限** が未入力（必須）");
      if (!d.storage || !d.storage.trim()) issues.push("**保存方法** が未入力（必須）");
      if (!p.manufacturerName || !p.manufacturerName.trim()) issues.push("**製造者名** が未入力（必須）");
      if (!p.manufacturerAddress || !p.manufacturerAddress.trim()) issues.push("**製造者住所** が未入力（必須）");
      if (!issues.length)
        return "## ✅ " + dn + " の食品表示チェック\n\n必須表示事項はすべて入力されています。\n\n**次のステップ**\n- アレルゲン表示の最終確認\n- 原材料名の配合順（多い順）確認\n- 栄養成分表示の確認\n\n※ 最終的な表示適合性の確認は専門家にご依頼ください。";
      return "## ⚠️ " + dn + " の食品表示チェック\n\n以下の必須項目を確認・修正してください：\n\n" + issues.map(i => "- " + i).join("\n") + "\n\n食品表示法上、これらは**必須表示事項**です。未入力のまま販売すると法令違反になる可能性があります。\n\n※ 最終的な表示適合性の確認は専門家にご依頼ください。";
    }
    case "check_allergens": {
      const al = d.allergens || [];
      return "## 🌾 " + dn + " のアレルゲン確認\n\n**自動検出されたアレルゲン**\n" + (al.length ? al.map(a => "- **" + a + "**").join("\n") : "- 検出なし") + "\n\n**使用原材料**\n" + (ings.length ? ings.map(i => "- " + i.name).join("\n") : "- 未入力") + "\n\n**確認ポイント**\n- 特定原材料8品目：えび・かに・小麦・そば・卵・乳・落花生・くるみ\n- 特定原材料に準ずる20品目も可能な限り表示が推奨されます\n- コンタミネーション（製造ラインでの混入リスク）も検討してください\n\n※ アレルゲン表示の最終確認は、原材料メーカーの規格書に基づき実施してください。";
    }
    case "legal_notes":
      return "## ⚖️ 食品表示法上の主な注意点\n\n**1. 名称**\n- 商品名ではなく「油菓子」「菓子パン」等の一般的名称を使用\n\n**2. 原材料名**\n- 配合割合の**多い順**に表示（義務）\n- 添加物は一般名・用途名で表示\n- 「/」で原材料と添加物を区分することが推奨\n\n**3. 賞味・消費期限**\n- 賞味期限（品質保持）と消費期限（安全性）を使い分ける\n- 設定には微生物試験等の根拠が必要\n\n**4. 製造者**\n- 製造者・加工者・輸入者・販売者を正しく使い分ける\n- OEM商品の場合は特に注意\n\n**5. 栄養成分表示**\n- 一般消費者向け加工食品には義務\n- 100gまたは100mLあたり、もしくは1食分あたりで表示\n\n詳細は消費者庁「食品表示基準」をご確認ください。";
    case "improvements": {
      const tips = [];
      if (!p.imageDataUrl) tips.push("📷 **商品画像** を登録すると規格書が充実します");
      if (!(p.costItems || []).length) tips.push("💰 **原価管理** を入力して原価率を把握しましょう");
      if (!p.internalName || !p.internalName.trim()) tips.push("🏷️ **社内管理名称** を設定すると複数SKU管理が楽になります");
      if (!p.code) tips.push("🔢 **商品コード** を設定すると棚卸し・受発注管理に便利です");
      if (!ingWithW.length) tips.push("⚖️ **原材料の重量** を入力すると栄養成分が自動計算されます");
      if (!tips.length) tips.push("現在入力できる情報は充実しています。引き続き最新情報を維持してください。");
      return "## 💡 " + dn + " の改善提案\n\n" + tips.map(t => "- " + t).join("\n") + "\n\n**表示品質向上のヒント**\n- 原材料名の配合順（多い順）を確認\n- アレルゲン表示のダブルチェック\n- 販売チャネル別のAI説明文を事前に準備";
    }
    case "ingredients_order": {
      const sorted = ingWithW.slice().sort((a, b) => Number(b.weight) - Number(a.weight));
      return "## 📋 " + dn + " の原材料表示順\n\n**現在の入力順**\n" + (ings.length ? ings.map((i, idx) => (idx + 1) + ". " + i.name + (i.weight ? " (" + i.weight + (i.unit || "g") + ")" : "")).join("\n") : "- 未入力") + "\n\n" + (sorted.length ? "**重量基準の推奨順（多い順）**\n" + sorted.map((i, idx) => (idx + 1) + ". " + i.name + " (" + i.weight + (i.unit || "g") + ")").join("\n") + "\n\n" : "") + "**注意事項**\n- 食品表示法では原材料を**配合割合の多い順**に表示することが義務\n- 重量未入力の原材料は自動並び替えができません\n- 複合原材料は展開表示が必要な場合があります\n\n※ 最終的な確認は製造記録・配合表に基づき実施してください。";
    }
    case "nutrition_check": {
      const n = d.nutrition;
      const ok = Number(n.kcal) > 0;
      return "## 📊 " + dn + " の栄養成分確認\n\n| 項目 | 値 |\n|------|----|\n| エネルギー | " + (ok ? n.kcal + " kcal" : "未計算") + " |\n| たんぱく質 | " + (ok ? n.protein + " g" : "未計算") + " |\n| 脂質 | " + (ok ? n.fat + " g" : "未計算") + " |\n| 炭水化物 | " + (ok ? n.carbs + " g" : "未計算") + " |\n| 食塩相当量 | " + (ok ? n.salt + " g" : "未計算") + " |\n\n" + (!ok ? "⚠️ 栄養成分が未計算です。\n\n原材料に重量を入力するか、手動入力モードで値を設定してください。\n\n" : "") + "**注意事項**\n- 一般消費者向け加工食品には栄養成分表示が**義務**\n- 100gまたは100mLあたり（もしくは1食分）で表示\n- 正確な値には公認検査機関での分析を推奨";
    }
    default:
      return "## 🤖 AI食品表示アドバイザー\n\n**" + dn + "** について何でもご質問ください。\n\n**よく使う質問テンプレート**\n" + CONSULT_TEMPLATES.map(t => "- " + t.label).join("\n") + "\n\n上のテンプレートボタンをクリックすると素早くアクセスできます。\n\n※ このAI相談機能は食品表示の参考情報を提供します。法的判断については必ず専門家にご確認ください。";
  }
}

async function callConsultAI(p, userMessage, questionKey) {
  // テンプレートキーが指定された場合はルールベース回答（高速・確実）
  if (questionKey && questionKey !== "general") {
    return generateConsultResponse(p, questionKey);
  }
  // 自由質問はGemini APIへ
  try {
    const history = getConsultHistory(p.id).slice(0, -1); // 送信前の履歴
    const d = derive(p);
    const productPayload = {
      name: p.name, internalName: p.internalName, category: p.category,
      volume: p.volume, bestBefore: p.bestBefore, storage: d.storage,
      ingredients: (p.ingredients || []).filter(i => i.name?.trim()),
      manufacturerName: p.manufacturerName, manufacturerAddress: p.manufacturerAddress,
      allergens: d.allergens,
    };
    const res = await fetch("/api/ai-consult", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: productPayload, history, message: userMessage }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const json = await res.json();
    return json.answer;
  } catch (e) {
    console.warn("[FoodPilot AI] Gemini fallback:", e.message);
    // APIが失敗した場合はテンプレート回答にフォールバック
    return generateConsultResponse(p, "general") + "\n\n---\n*AIサーバーに接続できなかったため、標準回答を表示しています。*";
  }
}


async function runAiLabelCheck() {
  const p = currentProduct();
  if (!p) return;
  aiLabelCheckLoading = true; aiLabelCheckResult = null; render();
  const d = derive(p);
  const issues = [];
  if (!p.name?.trim()) issues.push("❌ **名称が未入力**：食品表示法第4条で義務表示");
  if (!d.ingLabel) issues.push("❌ **原材料名が未入力**：加工食品は原材料名の表示が義務");
  if (!p.volume?.trim()) issues.push("❌ **内容量が未入力**：計量法による表示義務あり");
  if (!p.bestBefore?.trim()) issues.push("❌ **賞味/消費期限が未入力**：食品表示基準で義務");
  if (!d.storage?.trim()) issues.push("⚠️ **保存方法が未入力**：要冷蔵品等は表示義務あり");
  if (!p.manufacturerName?.trim()) issues.push("❌ **製造者名が未入力**：食品表示基準で義務");
  if (!p.manufacturerAddress?.trim()) issues.push("❌ **製造者住所が未入力**：食品表示基準で義務");
  if (d.allergens.length === 0 && p.ingredients.some(i => i.name?.trim())) issues.push("ℹ️ アレルゲン未検出：原材料名を正確に入力することで自動検出精度が上がります");
  aiLabelCheckResult = issues.length ? issues.join("\n") : "✅ **基本項目はすべて入力されています**\n\nアレルゲン表示・原材料配合順・栄養成分表示の最終確認もお忘れなく。";
  aiLabelCheckLoading = false; render();
}

// ══ AI商品登録メニュー ══════════════════════════════════════════════════

const REGISTER_MENU = [
  { id: "photo",    icon: "📷", label: "写真から登録",        desc: "商品写真・裏面・パッケージをAIで解析して自動登録", badge: "おすすめ" },
  { id: "template", icon: "📋", label: "テンプレートから作成", desc: "カテゴリ別の初期設定を適用して素早く登録" },
  { id: "spec",     icon: "📄", label: "規格書から登録",      desc: "PDF・Excel・Word の規格書をAIが解析して登録" },
  { id: "manual",   icon: "✏️", label: "手入力",             desc: "従来どおり手入力で商品登録" },
];

// ── テンプレート選択ページ ────────────────────────────────────────────
function templateSelectHtml() {
  const userTpls = JSON.parse(safeGet("fmcc-user-templates") || "[]");
  const recentForTpl = [...products]
    .sort((a,b)=>(b.updatedAt||"").localeCompare(a.updatedAt||""))
    .slice(0, 8);

  const userTplsHtml = userTpls.length ? `
    <div class="tpl-section-label">保存済みテンプレート <span class="tpl-section-count">${userTpls.length}件</span></div>
    <div class="tpl-user-list">
      ${userTpls.map((t,i) => `
        <div class="tpl-user-item">
          <button class="tpl-user-apply" data-use-user-template="${i}">
            <span class="tpl-user-icon">📋</span>
            <div class="tpl-user-info">
              <span class="tpl-user-label">${escapeHtml(t.label)}</span>
              <span class="tpl-user-meta">${escapeHtml(t.defaults?.category||"")}${t.savedAt ? " · "+escapeHtml(t.savedAt) : ""}</span>
            </div>
          </button>
          <button class="tpl-user-del" data-del-user-tpl="${i}" title="テンプレートを削除">✕</button>
        </div>`).join("")}
    </div>` : "";

  const copyHtml = recentForTpl.length ? `
    <div class="tpl-section-label">既存商品をコピーして開始</div>
    <div class="tpl-copy-list">
      ${recentForTpl.map(p => {
        const ps = PRODUCT_STATUSES.find(s=>s.id===(p.productStatus||"draft"))||PRODUCT_STATUSES[0];
        return `<button class="tpl-copy-item" data-copy-from="${escapeHtml(p.id)}">
          ${p.imageDataUrl ? `<img class="tpl-copy-thumb" src="${p.imageDataUrl}" alt="" onerror="this.onerror=null;this.outerHTML='<span class=\\'tpl-copy-thumb-ph\\'>📦</span>'">` : `<span class="tpl-copy-thumb-ph">📦</span>`}
          <div class="tpl-copy-info">
            <span class="tpl-copy-name">${escapeHtml(p.internalName||p.name||"（名称未入力）")}</span>
            <span class="tpl-copy-meta">
              ${p.category?`<span class="tag-chip" style="font-size:11px">${escapeHtml(p.category)}</span>`:""}
              <span class="pipeline-chip" style="font-size:10px;color:${ps.color};background:${ps.bg}">${ps.label}</span>
            </span>
          </div>
        </button>`;
      }).join("")}
    </div>` : "";

  return saasLayout("テンプレートから商品登録", `
    <div class="tpl-select-page">
      <div class="tpl-header">
        <h2 class="tpl-title">どんな商品を登録しますか？</h2>
        <p class="tpl-sub">カテゴリを選ぶと保存方法・製造者区分などを自動入力します。後から自由に変更できます。</p>
      </div>
      <div class="tpl-section-label">カテゴリテンプレート</div>
      <div class="tpl-grid">
        ${PRODUCT_TEMPLATES.map(t => `
          <button class="tpl-card${t.id==="blank"?" tpl-card--blank":""}" data-use-template="${t.id}">
            <span class="tpl-card-icon">${t.icon}</span>
            <span class="tpl-card-label">${escapeHtml(t.label)}</span>
            <span class="tpl-card-desc">${escapeHtml(t.desc)}</span>
          </button>`).join("")}
      </div>
      ${userTplsHtml}
      ${copyHtml}
    </div>
  `);
}

function registerBtnHtml() {
  const dropdown = registerMenuOpen ? `
    <div class="reg-dropdown" id="reg-dropdown">
      <div class="reg-dropdown-title">商品登録方法を選択</div>
      ${REGISTER_MENU.map(item => `
        <button class="reg-menu-item" data-reg-mode="${escapeHtml(item.id)}">
          <span class="reg-menu-icon">${item.icon}</span>
          <span class="reg-menu-body">
            <span class="reg-menu-label">${escapeHtml(item.label)}${item.badge ? `<span class="reg-menu-badge">${escapeHtml(item.badge)}</span>` : ""}</span>
            <span class="reg-menu-desc">${escapeHtml(item.desc)}</span>
          </span>
        </button>`).join("")}
    </div>` : "";
  return `<div class="reg-btn-wrap">
    <button class="action primary reg-main-btn" data-reg-toggle>＋ 商品登録 ▾</button>
    ${dropdown}
  </div>`;
}

// ── AI解析ステップ定義 ──
const AI_ANALYSIS_STEPS = [
  "商品名を抽出しています...",
  "原材料を解析しています...",
  "栄養成分を読み取っています...",
  "アレルゲン情報を確認しています...",
  "表示内容を作成しています...",
];

// ════════════════════════════════════════════════════════════════════════
// AI棚スキャン
// Vision API 接続箇所: analyzeShelfImage() のみを差し替えれば本番AIへ切替可能
// ════════════════════════════════════════════════════════════════════════

async function analyzeShelfImage(base64) {
  const productNames = products.map(p => p.name || p.internalName).filter(Boolean);
  const res = await fetch("/api/ai-shelf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64, productNames }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `サーバーエラー（HTTP ${res.status}）`);
  }
  return await res.json();
}

function matchProductByName(name) {
  if (!name || !products.length) return null;
  const lower = name.toLowerCase().replace(/\s/g, "");
  return products.find(p => {
    const pn = (p.name || p.internalName || "").toLowerCase().replace(/\s/g, "");
    return pn.length >= 2 && (pn.includes(lower) || lower.includes(pn));
  }) || null;
}

function shelfScanConfidenceColor(c) {
  if (c >= 90) return "#16a34a";
  if (c >= 75) return "#d97706";
  return "#dc2626";
}

function shelfScanHtml() {
  // ── アップロード画面 ──
  if (shelfScanPhase === "upload") {
    return saasLayout("AI棚スキャン β", `
      <div class="shelf-scan-wrap">
        <div class="shelf-scan-header">
          <h2 class="shelf-scan-title">📷 AI棚スキャン <span class="shelf-beta-badge">β</span></h2>
          <p class="shelf-scan-desc">棚の写真をアップロードするだけで在庫を自動認識します。<br>認識結果を確認・修正してから保存できます。</p>
        </div>
        <div class="shelf-upload-zone" id="shelf-drop-zone">
          <input type="file" id="shelf-file-input" accept="image/*" style="display:none">
          <div class="shelf-upload-icon">📸</div>
          <div class="shelf-upload-main">ここに棚の写真をドラッグ＆ドロップ</div>
          <div class="shelf-upload-sub">または</div>
          <button class="action secondary" id="shelf-select-btn">写真を選択</button>
          <div class="shelf-upload-note">JPG・PNG・HEIC・WebP 対応　スマホ撮影もOK</div>
        </div>
        <div class="shelf-scan-tips">
          <div class="shelf-tip">💡 棚全体が写るように撮影するとより正確に認識します</div>
          <div class="shelf-tip">💡 商品名・数量ラベルが見える角度がおすすめです</div>
        </div>
        ${shelfScanError ? `<p style="color:#dc2626;margin-top:12px">⚠ ${escapeHtml(shelfScanError)}</p>` : ""}
      </div>`);
  }

  // ── 解析中 ──
  if (shelfScanPhase === "analyzing") {
    return saasLayout("AI棚スキャン β", `
      <div class="shelf-scan-wrap">
        <div class="shelf-analyzing-card">
          <div class="shelf-analyzing-spinner"></div>
          <div class="shelf-analyzing-title">AIが棚を解析しています…</div>
          <div class="shelf-analyzing-steps">
            <div class="shelf-step done">✓ 画像を読み込みました</div>
            <div class="shelf-step active">● 商品を認識しています</div>
            <div class="shelf-step">○ 在庫数を推定しています</div>
            <div class="shelf-step">○ 商品マスターと照合しています</div>
          </div>
          <p class="shelf-analyzing-note">通常10〜30秒かかります</p>
        </div>
      </div>`);
  }

  // ── 保存完了 ──
  if (shelfScanPhase === "saved") {
    const savedCount = shelfScanItems.filter(i => i.matchedProductId).length;
    return saasLayout("AI棚スキャン β", `
      <div class="shelf-scan-wrap" style="text-align:center">
        <div class="shelf-saved-card">
          <div style="font-size:52px;margin-bottom:12px">✅</div>
          <div class="shelf-saved-title">在庫を更新しました</div>
          <p class="shelf-saved-desc">${savedCount}件の商品の現在在庫を更新しました。</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px">
            <button class="action primary" data-action="shelf-scan-retry">新しい写真をスキャン</button>
            <button class="action" data-nav="products">商品管理へ</button>
          </div>
        </div>
      </div>`);
  }

  // ── 結果表示 ──
  const cardsHtml = shelfScanItems.map((item, idx) => {
    const matched = item.matchedProductId ? products.find(p => p.id === item.matchedProductId) : null;
    const confidenceColor = shelfScanConfidenceColor(item.confidence);
    const matchBadge = matched
      ? `<span class="shelf-match-badge matched">✅ ${escapeHtml(matched.name || matched.internalName || "登録済")}</span>`
      : `<span class="shelf-match-badge new">❓ 未登録商品</span>`;
    return `
      <div class="shelf-item-card${matched ? "" : " shelf-item-unmatched"}">
        <div class="shelf-item-header">
          <div class="shelf-item-name">${escapeHtml(item.detectedName)}</div>
          ${matchBadge}
        </div>
        <div class="shelf-item-confidence">
          <span style="color:${confidenceColor};font-weight:600">信頼度 ${item.confidence}%</span>
          <div class="shelf-confidence-bar"><div class="shelf-confidence-fill" style="width:${item.confidence}%;background:${confidenceColor}"></div></div>
        </div>
        <div class="shelf-item-qty-row">
          <span class="shelf-qty-label">数量</span>
          <button class="shelf-qty-btn" data-action="shelf-scan-qty-minus" data-idx="${idx}">−</button>
          <input class="shelf-qty-input" type="number" min="0" value="${item.quantity}" data-shelf-qty="${idx}">
          <span class="shelf-qty-unit">${escapeHtml(item.unit)}</span>
          <button class="shelf-qty-btn" data-action="shelf-scan-qty-plus" data-idx="${idx}">＋</button>
        </div>
        ${!matched ? `<div class="shelf-item-new-hint">この商品は登録されていません。保存後に手動で登録できます。</div>` : ""}
      </div>`;
  }).join("");

  const matchedCount = shelfScanItems.filter(i => i.matchedProductId).length;
  const newCount = shelfScanItems.length - matchedCount;

  return saasLayout("AI棚スキャン β", `
    <div class="shelf-scan-wrap">
      <div class="shelf-results-header">
        <div>
          <h2 class="shelf-scan-title">解析完了 — ${shelfScanItems.length}件を認識</h2>
          <p class="shelf-results-summary">登録済み <strong>${matchedCount}件</strong> ／ 新規候補 <strong>${newCount}件</strong></p>
        </div>
        <div style="display:flex;gap:8px">
          <button class="action" data-action="shelf-scan-retry">撮り直す</button>
          <button class="action primary" data-action="shelf-scan-save">在庫に保存</button>
        </div>
      </div>
      <div class="shelf-items-grid">${cardsHtml}</div>
      <div class="shelf-results-footer">
        <button class="action" data-action="shelf-scan-retry">撮り直す</button>
        <button class="action primary" data-action="shelf-scan-save">在庫に保存する</button>
      </div>
    </div>`);
}

async function runShelfScan(file) {
  shelfScanPhase = "analyzing";
  shelfScanError = "";
  render();
  try {
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const raw = await analyzeShelfImage(base64);
    shelfScanItems = raw.map(item => ({
      ...item,
      matchedProductId: matchProductByName(item.detectedName)?.id || null,
    }));
    shelfScanPhase = "results";
  } catch(e) {
    shelfScanError = e.message || "解析に失敗しました。";
    shelfScanPhase = "upload";
  }
  render();
}

function saveShelfScanResults() {
  const today = new Date().toLocaleDateString("ja-JP");
  const history = JSON.parse(safeGet("fmcc-shelf-history") || "[]");
  const entry = { date: today, items: [] };
  shelfScanItems.forEach(item => {
    if (!item.matchedProductId) return;
    const p = products.find(x => x.id === item.matchedProductId);
    if (!p) return;
    const prevStock = p.currentStock ?? null;
    p.currentStock = item.quantity;
    p.stockUnit = item.unit;
    p.updatedAt = today;
    entry.items.push({
      name: p.name || p.internalName || item.detectedName,
      from: prevStock,
      to: item.quantity,
      unit: item.unit,
    });
  });
  history.unshift(entry);
  safeSet("fmcc-shelf-history", JSON.stringify(history.slice(0, 100)));
  saveProducts();
  shelfScanPhase = "saved";
  render();
}

function photoRegisterHtml() {
  if (aiRegError) {
    return saasLayout("写真から登録", `
      <div class="ai-analysis-wrap">
        <div class="ai-analysis-card">
          <div class="ai-analysis-title" style="color:#dc2626">❌ 解析できませんでした</div>
          <p style="color:#64748b;margin:8px 0 20px;white-space:pre-wrap">${escapeHtml(aiRegError)}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="action primary" data-action="retry-photo-reg">もう一度試す</button>
            <button class="action" data-nav="products">商品管理へ戻る</button>
            <button class="action secondary" data-reg-mode="manual">手動で登録する</button>
          </div>
        </div>
      </div>`);
  }
  if (aiRegAnalysisStep >= 0 && aiRegAnalysisStep < AI_ANALYSIS_STEPS.length) {
    const pct = Math.round((aiRegAnalysisStep / AI_ANALYSIS_STEPS.length) * 100);
    const stepsHtml = AI_ANALYSIS_STEPS.map((s, i) => `
      <div class="ai-step ${i < aiRegAnalysisStep ? "done" : i === aiRegAnalysisStep ? "active" : ""}">
        <span class="ai-step-dot">${i < aiRegAnalysisStep ? "✓" : i === aiRegAnalysisStep ? "●" : "○"}</span>
        <span>${escapeHtml(s)}</span>
      </div>`).join("");
    return saasLayout("AI解析中", `
      <div class="ai-analysis-wrap">
        <div class="ai-analysis-card">
          <div class="ai-analysis-title">🤖 AI解析中...</div>
          <div class="ai-analysis-bar-wrap"><div class="ai-analysis-bar" style="width:${pct}%"></div></div>
          <div class="ai-steps">${stepsHtml}</div>
        </div>
      </div>`);
  }
  if (aiRegAnalysisStep >= AI_ANALYSIS_STEPS.length) {
    return saasLayout("AI解析完了", `
      <div class="ai-analysis-wrap">
        <div class="ai-analysis-card">
          <div class="ai-analysis-title" style="color:#16a34a">✅ 解析完了！</div>
          <p style="color:#64748b;margin:8px 0 20px">商品情報を抽出しました。内容を確認・修正してください。</p>
          <button class="action primary" data-reg-go-editor>商品編集画面へ →</button>
        </div>
      </div>`);
  }
  return saasLayout("写真から登録", `
    <div class="reg-page">
      <div class="reg-page-header">
        <button class="btn-back" data-nav="products">← 戻る</button>
        <h2 class="reg-page-title">📷 写真から登録</h2>
        <p class="reg-page-desc">商品写真・裏面表示・パッケージ・食品表示ラベルをアップロードしてください。<br>AIが自動で商品情報を解析して入力します。</p>
      </div>
      <div class="reg-upload-area" id="photo-drop-zone">
        <input type="file" id="photo-file-input" accept="image/*" multiple style="display:none">
        <div class="reg-upload-icon">📸</div>
        <div class="reg-upload-main">ここに画像をドラッグ＆ドロップ</div>
        <div class="reg-upload-sub">または</div>
        <button class="action secondary" id="photo-select-btn">画像を選択</button>
        <div class="reg-upload-note">対応形式：JPG・PNG・HEIC・WebP　複数枚同時アップロード対応</div>
      </div>
      <div class="reg-supported-wrap">
        <div class="reg-supported-title">対応している画像の種類</div>
        <div class="reg-supported-list">
          ${["商品写真","裏面表示ラベル","パッケージ全体","食品表示ラベル","規格書の写真"].map(t => `<span class="reg-supported-chip">${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>
    </div>`);
}

function specRegisterHtml() {
  if (aiRegError) {
    return saasLayout("規格書から登録", `
      <div class="ai-analysis-wrap">
        <div class="ai-analysis-card">
          <div class="ai-analysis-title" style="color:#dc2626">❌ 読み込みできませんでした</div>
          <p style="color:#64748b;margin:8px 0 20px;white-space:pre-wrap">${escapeHtml(aiRegError)}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="action primary" data-action="retry-spec-reg">もう一度試す</button>
            <button class="action" data-nav="products">商品管理へ戻る</button>
            <button class="action secondary" data-reg-mode="manual">手動で登録する</button>
          </div>
        </div>
      </div>`);
  }
  if (aiRegAnalysisStep >= 0 && aiRegAnalysisStep < AI_ANALYSIS_STEPS.length) {
    const pct = Math.round((aiRegAnalysisStep / AI_ANALYSIS_STEPS.length) * 100);
    const stepsHtml = AI_ANALYSIS_STEPS.map((s, i) => `
      <div class="ai-step ${i < aiRegAnalysisStep ? "done" : i === aiRegAnalysisStep ? "active" : ""}">
        <span class="ai-step-dot">${i < aiRegAnalysisStep ? "✓" : i === aiRegAnalysisStep ? "●" : "○"}</span>
        <span>${escapeHtml(s)}</span>
      </div>`).join("");
    return saasLayout("AI解析中", `
      <div class="ai-analysis-wrap">
        <div class="ai-analysis-card">
          <div class="ai-analysis-title">🤖 規格書を解析中...</div>
          <div class="ai-analysis-bar-wrap"><div class="ai-analysis-bar" style="width:${pct}%"></div></div>
          <div class="ai-steps">${stepsHtml}</div>
        </div>
      </div>`);
  }
  if (aiRegAnalysisStep >= AI_ANALYSIS_STEPS.length) {
    return saasLayout("解析完了", `
      <div class="ai-analysis-wrap">
        <div class="ai-analysis-card">
          <div class="ai-analysis-title" style="color:#16a34a">✅ 解析完了！</div>
          <p style="color:#64748b;margin:8px 0 20px">規格書から商品情報を抽出しました。内容を確認・修正してください。</p>
          <button class="action primary" data-reg-go-editor>商品編集画面へ →</button>
        </div>
      </div>`);
  }
  return saasLayout("規格書から登録", `
    <div class="reg-page">
      <div class="reg-page-header">
        <button class="btn-back" data-nav="products">← 戻る</button>
        <h2 class="reg-page-title">📄 規格書から登録</h2>
        <p class="reg-page-desc">PDF・Excel・Wordの商品規格書をアップロードしてください。<br>AIが自動で商品情報を解析して入力します。</p>
      </div>
      <div class="reg-upload-area" id="spec-drop-zone">
        <input type="file" id="spec-file-input" accept=".pdf,.xlsx,.xls,.docx,.doc,.csv" style="display:none">
        <div class="reg-upload-icon">📋</div>
        <div class="reg-upload-main">ここにファイルをドラッグ＆ドロップ</div>
        <div class="reg-upload-sub">または</div>
        <button class="action secondary" id="spec-select-btn">ファイルを選択</button>
        <div class="reg-upload-note">対応形式：PDF・Excel（.xlsx/.xls）・Word（.docx/.doc）・CSV</div>
      </div>
      <div class="reg-supported-wrap">
        <div class="reg-supported-title">読み取る主な項目</div>
        <div class="reg-supported-list">
          ${["商品名","原材料名","添加物","アレルゲン","内容量","賞味期限","保存方法","製造者","栄養成分"].map(t => `<span class="reg-supported-chip">${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>
    </div>`);
}

const AI_CHAT_FLOW = [
  { q: "何を作りますか？ 商品名を教えてください。\n例：米粉ドーナツ、抹茶クッキー", field: "name" },
  { q: "種類や味はありますか？\n例：プレーン、チョコレート、なし", field: "_flavor" },
  { q: "内容量を教えてください。\n例：6個入り、100g、500ml", field: "volume" },
  { q: "保存方法は？\n例：冷凍保存（-18℃以下）、冷蔵保存、常温保存", field: "_storage" },
  { q: "賞味期限の目安は？\n例：製造から30日、2027年3月末", field: "bestBefore" },
  { q: "製造者の会社名を教えてください。\n（わからない場合は「スキップ」と入力）", field: "manufacturerName" },
];

function aiChatRegisterHtml() {
  const msgs = aiRegChatMessages;
  const step = aiRegChatStep;
  const isDone = step >= AI_CHAT_FLOW.length;
  const messagesHtml = msgs.map(m => `
    <div class="ai-chat-msg ai-chat-msg-${escapeHtml(m.role)}">
      <div class="ai-chat-msg-label">${m.role === "ai" ? "🤖 AI" : "あなた"}</div>
      <div class="ai-chat-msg-body">${escapeHtml(m.content).replace(/\n/g, "<br>")}</div>
    </div>`).join("");
  const inputArea = isDone ? `
    <div class="ai-chat-done">
      <p>✅ 商品情報が揃いました！</p>
      <button class="action primary" data-reg-go-editor>商品編集画面で確認・修正する →</button>
    </div>` : `
    <div class="ai-chat-input-area">
      <textarea class="ai-chat-textarea" id="ai-chat-input" placeholder="入力してください...">${escapeHtml(aiRegChatInput)}</textarea>
      <button class="action primary ai-chat-send" id="ai-chat-send">送信 ▶</button>
    </div>
    <p class="notice">Ctrl+Enter でも送信できます</p>`;
  return saasLayout("AIで作成", `
    <div class="reg-page">
      <div class="reg-page-header">
        <button class="btn-back" data-nav="products" id="ai-chat-back">← 戻る</button>
        <h2 class="reg-page-title">🤖 AIで商品を作成</h2>
        <p class="reg-page-desc">AIの質問に答えるだけで商品情報を自動作成します。</p>
      </div>
      <div class="ai-chat-window" id="ai-chat-window">${messagesHtml}</div>
      ${inputArea}
    </div>`);
}

function aiConsultHtml() {
  const productList = products.filter(p => p.id);
  if (!aiConsultProductId && productList.length) aiConsultProductId = productList[0].id;
  const rawP = products.find(x => x.id === aiConsultProductId);
  if (!rawP && productList.length === 0) {
    return saasLayout("AI相談", `
      <div class="empty-state">
        <p>商品を先に登録してください。</p>
        <button class="action primary" data-nav="products">商品管理へ</button>
      </div>`);
  }
  const ep = rawP ? extendProductMaster(rawP) : extendProductMaster(productList[0]);
  const history = getConsultHistory(ep.id);
  const displayName = ep.internalName || ep.name || "（名称未入力）";
  const hasApiKey = !!(sessionStorage.getItem("fmcc-openai-key") || "");

  const productSelect = productList.map(px =>
    `<option value="${escapeHtml(px.id)}"${px.id === aiConsultProductId ? " selected" : ""}>
      ${escapeHtml(px.internalName || px.name || "（名称未入力）")}
    </option>`
  ).join("");

  const templateBtns = CONSULT_TEMPLATES.map(t =>
    `<button class="consult-tpl-btn" data-consult-key="${escapeHtml(t.key)}" data-consult-q="${escapeHtml(t.label)}">
      ${escapeHtml(t.label)}
    </button>`
  ).join("");

  const histHtml = history.length
    ? history.map(msg => `
        <div class="consult-msg consult-msg-${escapeHtml(msg.role)}">
          <div class="consult-msg-label">${msg.role === "user" ? "質問" : "🤖 AI回答"}</div>
          <div class="consult-msg-body">${msg.role === "assistant" ? renderMarkdown(msg.content) : escapeHtml(msg.content)}</div>
        </div>`).join("")
    : `<div class="consult-empty">テンプレートを選ぶか、テキストボックスに質問を入力して送信してください。</div>`;

  const d2 = derive(ep);
  const labelStyle = `style="width:${escapeHtml(String(printCfg.w || "90"))}mm;font-size:${escapeHtml(String(printCfg.fs || "7.5"))}pt;"`;
  const previewArea = printablePreviewHtml(ep, d2, labelStyle, false);

  return saasLayout("AI相談", `
    <div class="consult-layout">
      <div class="consult-left">
        <div class="consult-top-bar">
          <label class="field-inline">
            <span>商品</span>
            <select id="consult-product-sel">${productSelect}</select>
          </label>
          <button class="btn-sm btn-danger" id="consult-clear">履歴クリア</button>
        </div>
        <div class="consult-templates">
          <div class="consult-tpl-title">ワンクリック質問</div>
          <div class="consult-tpl-grid">${templateBtns}</div>
        </div>
        <div class="consult-history" id="consult-history">${histHtml}</div>
        <div class="consult-input-area">
          <textarea class="consult-textarea" id="consult-input" placeholder="食品表示についてご質問ください...">${escapeHtml(aiConsultInput)}</textarea>
          <button class="action primary consult-send-btn${aiConsultSending ? " disabled" : ""}" id="consult-send"${aiConsultSending ? " disabled" : ""}>
            ${aiConsultSending ? "回答中..." : "送信 ▶"}
          </button>
        </div>
        ${hasApiKey ? "" : `<p class="notice">💡 <a class="field-link" data-nav="settings-nav">設定画面</a>でOpenAI APIキーを登録するとChatGPTが直接回答します（現在はテンプレート回答）</p>`}
      </div>
      <div class="consult-right">
        <div class="consult-preview-title">ラベルプレビュー（${escapeHtml(displayName)}）</div>
        <div class="consult-preview-wrap">${previewArea}</div>
      </div>
    </div>`);
}

// ── SaaSナビゲーション イベントバインド ──────────────────────────────
async function sendConsultMessage(questionKey) {
  const input = document.getElementById("consult-input");
  const msg = (input?.value || aiConsultInput).trim();
  if (!msg || aiConsultSending) return;
  const p = products.find(x => x.id === aiConsultProductId);
  if (!p) return;
  const ep = extendProductMaster(p);
  const history = getConsultHistory(ep.id);
  history.push({ role: "user", content: msg });
  saveConsultHistory(ep.id, history);
  aiConsultInput = "";
  aiConsultSending = true;
  render();
  // 履歴欄を最下部にスクロール
  setTimeout(() => {
    const h = document.getElementById("consult-history");
    if (h) h.scrollTop = h.scrollHeight;
  }, 50);
  try {
    const answer = await callConsultAI(ep, msg, questionKey || "general");
    const updated = getConsultHistory(ep.id);
    updated.push({ role: "assistant", content: answer });
    saveConsultHistory(ep.id, updated);
  } catch (e) {
    const updated = getConsultHistory(ep.id);
    updated.push({ role: "assistant", content: "回答の生成に失敗しました。もう一度お試しください。" });
    saveConsultHistory(ep.id, updated);
  }
  aiConsultSending = false;
  render();
  setTimeout(() => {
    const h = document.getElementById("consult-history");
    if (h) h.scrollTop = h.scrollHeight;
  }, 80);
}

// ── ⑨ 引き上げ関数（setupDelegation から参照） ─────────────────────────
function saveCostItems() {
  const p = products.find(x => x.id === productDetailId);
  if (!p) return;
  [["data-cost-name","name"],["data-cost-amount","amount"],["data-cost-unit","unit"],
   ["data-cost-price","unitPrice"],["data-cost-punit","priceUnit"],["data-cost-loss","lossRate"]
  ].forEach(([attr, field]) => {
    document.querySelectorAll(`[${attr}]`).forEach(el => {
      const i = parseInt(el.dataset[attr.replace("data-","").replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]);
      if (p.costItems[i]) p.costItems[i][field] = el.value;
    });
  });
  saveProducts();
}

function refreshCostKpis() {
  const p = products.find(x => x.id === productDetailId);
  if (!p) return;
  const mode = p.costMode || "direct";
  const price    = parseFloat(document.querySelector("[data-master-field='price']")?.value) || 0;
  const rawCost  = mode === "direct" ? (parseFloat(document.querySelector("[data-master-field='directCost']")?.value) || 0) : 0;
  const packaging= parseFloat(document.querySelector("[data-master-field='directPackaging']")?.value) || 0;
  const shipping = parseFloat(document.querySelector("[data-master-field='directShipping']")?.value)  || 0;
  const other    = parseFloat(document.querySelector("[data-master-field='directOther']")?.value)     || 0;
  const totalCost = rawCost + packaging + shipping + other;
  const gross = price - totalCost;
  const costRate = price > 0 ? Math.round(totalCost / price * 100) : null;
  const fmt = n => "¥" + Math.round(n).toLocaleString();
  const $ = id => document.getElementById(id);
  if ($("ck-total"))  $("ck-total").textContent  = fmt(totalCost);
  if ($("ck-price"))  $("ck-price").textContent  = price > 0 ? fmt(price) : "—";
  if ($("ck-gross")) { $("ck-gross").textContent = price > 0 ? fmt(gross) : "—"; $("ck-gross").className = "cost-kpi-value " + (gross >= 0 ? "profit-pos" : "profit-neg"); }
  const mc = costRateClass(costRate);
  if ($("ck-profit")) $("ck-profit").textContent = costRate !== null ? (100 - costRate) + "%" : "—";
  if ($("ck-cost"))   $("ck-cost").textContent   = costRate !== null ? costRate + "%" : "—";
  ["ck-profit-wrap","ck-cost-wrap"].forEach(id => { if ($(id)) $(id).className = "cost-kpi " + mc; });
}

function handleImageFile(file) {
  if (!file || !file.type.startsWith("image/")) return;
  if (file.size > 5 * 1024 * 1024) { showStatus("画像は5MB以下にしてください"); return; }
  const pid = productDetailId;
  const p = products.find(x => x.id === pid);
  if (!p) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX = 800; let w = img.width, h = img.height;
      if (w > MAX || h > MAX) { if (w > h) { h = Math.round(h * MAX / w); w = MAX; } else { w = Math.round(w * MAX / h); h = MAX; } }
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      p.imageDataUrl = canvas.toDataURL("image/jpeg", 0.75);
      p.updatedAt = new Date().toLocaleDateString("ja-JP");
      saveProducts(); showStatus("画像を登録しました"); render();
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function doPrintSpec() {
  const area = document.getElementById("spec-print-area");
  if (!area) return;
  const w = window.open("", "_blank");
  if (!w) { showStatus("ポップアップがブロックされています。ブラウザの設定で許可してください。"); return; }
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>商品規格書</title><style>
@page{size:A4 portrait;margin:8mm}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Hiragino Kaku Gothic ProN","Yu Gothic",sans-serif;font-size:11px;color:#1e293b;background:#fff}
.spec-v2{padding:8mm;max-width:100%}
.spec-v2-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #1e293b}
.spec-v2-header h1{font-size:18px;font-weight:800;color:#1e293b}
.spec-subtitle{font-size:13px;font-weight:600;color:#334155;margin-top:2px}
.spec-display-name{font-size:11px;color:#64748b;margin-top:2px}
.spec-v2-meta-block dl{display:flex;flex-direction:column;gap:2px;font-size:10px;color:#64748b;text-align:right}
.spec-v2-meta-block dl div{display:flex;gap:4px;justify-content:flex-end}
.spec-v2-meta-block dt{font-weight:600}
.spec-v2-body{display:grid;grid-template-columns:1fr 130px;gap:12px;align-items:start;margin-bottom:8px}
.spec-v2-image-col{display:flex;flex-direction:column;align-items:center;gap:6px}
.spec-v2-product-img{width:120px;height:120px;object-fit:cover;border:1px solid #e2e8f0;border-radius:4px}
.spec-v2-product-img-placeholder{width:120px;height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f8fafc;border:1px solid #e2e8f0;border-radius:4px;font-size:24px;color:#cbd5e1}
.spec-v2-qr{width:72px;height:72px;object-fit:contain;border:1px solid #e2e8f0;border-radius:4px;display:block}
.spec-v2-section-label{font-size:9px;font-weight:700;color:#fff;background:#475569;padding:2px 6px;border-radius:3px;margin-bottom:2px;margin-top:6px;display:inline-block}
.spec-v2-tables .spec-v2-section-label:first-child{margin-top:0}
.spec-v2-table{width:100%;border-collapse:collapse;margin-bottom:4px}
.spec-v2-table th,.spec-v2-table td{border:1px solid #e2e8f0;padding:3px 6px;font-size:10px;text-align:left;line-height:1.4}
.spec-v2-table th{background:#f8fafc;width:32%;font-weight:600;color:#374151}
.spec-v2-table td{color:#1e293b}
.spec-v2-remark{font-size:10px;border:1px solid #e2e8f0;border-radius:4px;padding:6px;background:#f8fafc;margin-bottom:4px}
.spec-v2-footer{border-top:1px solid #e2e8f0;padding-top:8px;display:flex;justify-content:space-between;align-items:flex-end;margin-top:8px}
.spec-v2-sig-row{display:flex;gap:16px}
.spec-v2-sig-box{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:9px;color:#64748b}
.spec-v2-sig-line{width:70px;height:28px;border:1px solid #cbd5e1;border-radius:3px}
.margin-good{color:#16a34a}.margin-warn{color:#d97706}.margin-bad{color:#dc2626}
</style></head><body><div class="spec-v2">${area.innerHTML}</div><script>window.onload=()=>{window.print();}<\/script></body></html>`);
  w.document.close();
}


function startAiAnalysis(type) {
  aiRegAnalysisStep = 0;
  saasView = type === "photo" ? "reg-photo" : "reg-spec";
  render();
  function tick() {
    if (aiRegAnalysisStep < AI_ANALYSIS_STEPS.length) {
      aiRegAnalysisStep++;
      render();
      setTimeout(tick, 900);
    }
  }
  setTimeout(tick, 800);
}

async function processRegFile(type, file) {
  aiRegChatDraft = {};
  aiRegError = "";
  if (type === "photo") {
    // 画像をbase64に変換
    let base64;
    try {
      base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } catch(e) {
      aiRegError = "画像の読み込みに失敗しました。ファイルが壊れていないか確認してください。";
      aiRegAnalysisStep = -1;
      saasView = "reg-photo";
      render();
      return;
    }
    startAiAnalysis(type);
    try {
      // FoodPilot AIバックエンド経由でOpenAI Vision APIを呼び出す
      const res = await fetch("/api/ai-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64 })
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `サーバーエラー（HTTP ${res.status}）`);
      }
      const parsed = await res.json();
      aiRegChatDraft = parsed;
      aiRegAnalysisStep = AI_ANALYSIS_STEPS.length;
      render();
    } catch(e) {
      console.warn("写真解析エラー:", e);
      aiRegError = e.message || "画像の解析に失敗しました。別の写真を試すか、手動登録をお使いください。";
      aiRegAnalysisStep = -1;
      render();
    }
    return;
  }
  // 規格書（spec）
  startAiAnalysis(type);
  if (type === "spec") {
    try {
      const text = await extractTextFromFile(file);
      if (text) aiRegChatDraft = parseSpecSheetText(text);
      else {
        aiRegError = "ファイルからテキストを読み取れませんでした。\nPDF・テキスト形式の規格書をお使いください。";
        aiRegAnalysisStep = -1;
        render();
        return;
      }
    } catch(e) {
      console.warn("規格書解析エラー:", e);
      aiRegError = "規格書の読み込みに失敗しました。ファイルが正しい形式か確認してください。";
      aiRegAnalysisStep = -1;
      render();
    }
  }
}

async function extractTextFromFile(file) {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    return await extractPdfText(file);
  }
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result || "");
    reader.onerror = () => resolve("");
    reader.readAsText(file, "UTF-8");
  });
}

async function extractPdfText(file) {
  if (!window.pdfjsLib) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }
  const buf = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({
    data: buf,
    cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/",
    cMapPacked: true,
  }).promise;
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    // Y座標の変化で改行を検出してテキスト構造を保持
    const lines = [];
    let lastY = null;
    let line = [];
    for (const item of content.items) {
      const y = item.transform ? item.transform[5] : null;
      if (lastY !== null && y !== null && Math.abs(y - lastY) > 3) {
        if (line.length) lines.push(line.join(" "));
        line = [];
      }
      if (item.str.trim()) line.push(item.str.trim());
      if (y !== null) lastY = y;
    }
    if (line.length) lines.push(line.join(" "));
    fullText += lines.join("\n") + "\n";
  }
  return fullText;
}

function parseSpecSheetText(text) {
  const get = (re) => { const m = text.match(re); return m ? m[1].trim() : ""; };

  const name = get(/商品名[　\s：:]+([^\n]+)/) || get(/^(.+)/);
  const volume = get(/内容量[　\s：:]+([^\n]+)/);
  const bestBefore = get(/賞味期限[　\s：:]+([^\n]+)/);

  const storageRaw = get(/保存方法[　\s：:]+([^\n]+)/);
  let storage = STORAGE_OPTS[0], storageCustom = "";
  if (/冷凍|−18|−18|-18/.test(storageRaw)) {
    storage = "冷凍保存（-18℃以下）";
  } else if (/冷蔵|10℃/.test(storageRaw)) {
    storage = "冷蔵保存（10℃以下）";
  } else if (/常温/.test(storageRaw)) {
    storage = "常温保存";
  } else if (/高温多湿/.test(storageRaw)) {
    storage = "高温多湿を避けて保存";
  } else if (storageRaw) {
    storage = "自由入力"; storageCustom = storageRaw;
  }

  // 規格書形式（ヘッダー行の次行）または ラベル表示例形式（：区切り）
  const ingredientsRaw =
    get(/【原材料名[^】]*】\s*\n([^\n【]+)/) ||
    get(/原材料名[：:]\s*([^\n\/／]+(?:\n(?![^\n]*：)[^\n]+)*)/) ||
    get(/原材料名[（(][^)）]*[)）][　\s：:]+([^\n【]+)/) ||
    get(/原材料名[　\s：:]+([^\n【]+)/);
  const ingredients = ingredientsRaw
    ? ingredientsRaw.split(/[、，,]/).map(n => n.trim()).filter(Boolean)
        .map(n => ({ id: uid(), name: n, weight: "" }))
    : [{ id: uid(), name: "", weight: "" }];

  const allergensLine = get(/含まれるアレルゲン[：:]\s*([^\n\/／]+)/);
  const allergensManual = allergensLine.replace(/\s*\/.*/, "").trim();

  const kcal    = get(/エネルギー[　\s]*([\d.]+)\s*kcal/i) || get(/エネルギー[　\s]*([\d.]+)/);
  const protein = get(/たんぱく質[　\s]*([\d.]+)/);
  const fat     = get(/脂質[　\s]*([\d.]+)/);
  const carbs   = get(/炭水化物[　\s]*([\d.]+)/);
  const salt    = get(/食塩相当量[　\s]*([\d.]+)/);

  const mfrLine      = get(/製造者[　\s：:]+([^\n〒（(]+)/);
  const postalMatch  = text.match(/〒([\d\-]+)/);
  const postalFull   = postalMatch ? postalMatch[0] : "";
  const addrRaw      = get(/〒[\d\-]+[　\s]*([^\nTEL0-9]+)/);
  const phone        = get(/TEL[　\s：:]*([\d\-（()）]+)/);

  const result = {
    name: name.replace(/\s+製品規格書.*/, "").trim(),
    volume,
    bestBefore,
    storage,
    storageCustom,
    ingredients,
    allergensMode: allergensManual ? "manual" : "auto",
    allergensManual,
    manufacturerName: mfrLine.trim(),
    manufacturerPostal: postalMatch ? postalMatch[1] : "",
    manufacturerAddress: addrRaw.replace(postalFull, "").trim(),
    manufacturerPhone: phone,
  };
  if (kcal || protein || fat || carbs || salt) {
    result.nutritionMode = "manual";
    result.nutritionManual = {
      kcal: kcal || "", protein: protein || "", fat: fat || "",
      carbs: carbs || "", salt: salt || "",
    };
  }
  return result;
}

function sendAiChatMessage() {
  const msg = aiRegChatInput.trim();
  if (!msg) return;
  const step = aiRegChatStep;
  if (step >= AI_CHAT_FLOW.length) return;
  aiRegChatMessages.push({ role: "user", content: msg });
  const field = AI_CHAT_FLOW[step].field;
  if (!field.startsWith("_")) aiRegChatDraft[field] = msg;
  if (field === "_storage") {
    aiRegChatDraft._storageHint = msg;
  } else if (field === "_flavor") {
    if (msg !== "なし" && msg.toLowerCase() !== "skip" && msg !== "スキップ")
      aiRegChatDraft.internalName = (aiRegChatDraft.name || "") + " " + msg;
  }
  aiRegChatStep++;
  aiRegChatInput = "";
  if (aiRegChatStep < AI_CHAT_FLOW.length) {
    aiRegChatMessages.push({ role: "ai", content: AI_CHAT_FLOW[aiRegChatStep].q });
  } else {
    aiRegChatMessages.push({ role: "ai", content: "ありがとうございます！\n商品情報が揃いました。内容を確認・修正してください 👇" });
  }
  render();
  setTimeout(() => {
    const w = document.getElementById("ai-chat-window");
    if (w) w.scrollTop = w.scrollHeight;
  }, 60);
}

// ── Stripe Checkoutセッション作成 ────────────────────────────────────
async function stripeCheckout(plan) {
  const btn = document.querySelector(`[data-action="stripe-checkout"][data-plan="${plan}"]`);
  if (btn) { btn.disabled = true; btn.textContent = "⏳ Stripeへ接続中..."; }
  try {
    const res = await fetch("/api/stripe-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, origin: location.origin }),
    });
    const data = await res.json();
    if (data.url) {
      location.href = data.url;
    } else {
      showStatus(data.error || "決済ページを開けませんでした。しばらくしてから再試行してください。", { duration: 7000 });
      if (btn) { btn.disabled = false; btn.textContent = "購入する →"; }
    }
  } catch {
    showStatus("通信エラーが発生しました。インターネット接続を確認してください。", { duration: 6000 });
    if (btn) { btn.disabled = false; btn.textContent = "購入する →"; }
  }
}

// ── モニター参加コード認証 ────────────────────────────────────────────
async function activateTrialCode() {
  const inp = document.getElementById("trial-code-input");
  const code = inp?.value?.trim();
  if (!code) { showStatus("モニターコードを入力してください"); return; }
  const btn = document.getElementById("trial-activate-btn");
  if (btn) { btn.disabled = true; btn.textContent = "確認中..."; }
  try {
    const res = await fetch("/api/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: code }),
    });
    const data = await res.json();
    if (data.ok && data.plan) {
      currentPlan = data.plan;
      safeSet("food-label-plan", currentPlan);
      safeSet("food-label-license-key", code);
      showStatus(`✓ ${PLANS[data.plan]?.label || data.plan}プランが有効になりました！`, { duration: 5000 });
      render();
    } else {
      showStatus(data.error || "コードが正しくありません。", { duration: 5000 });
      if (btn) { btn.disabled = false; btn.textContent = "参加する"; }
    }
  } catch {
    showStatus("通信エラーが発生しました。", { duration: 5000 });
    if (btn) { btn.disabled = false; btn.textContent = "参加する"; }
  }
}

render();
setupDelegation(); // ⑨ デリゲーション登録（起動時1回）
initCloudSync();   // ☁ クラウドから最新データをマージ（非同期・バックグラウンド）

// ── Stripe決済完了検出 (?stripe_session=cs_xxx で着地したとき) ────────
(function detectStripeReturn() {
  try {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("stripe_session");
    if (!sessionId || (!sessionId.startsWith("cs_live_") && !sessionId.startsWith("cs_test_"))) return;
    // URLからパラメータを除去（ブラウザ履歴にキーを残さない）
    history.replaceState({}, document.title, location.pathname);
    showModal({
      message: `決済が完了しました！\n\n下記のライセンスキーをコピーして、設定 → ライセンス認証 で入力してください：\n\n${sessionId}`,
      confirmLabel: "設定ページで今すぐ認証する",
      cancelLabel: "あとで認証する",
      onConfirm: () => {
        saasView = "settings-nav";
        view = "saas";
        render();
        setTimeout(() => {
          const inp = document.getElementById("license-key-input");
          if (inp) { inp.value = sessionId; inp.focus(); inp.select(); }
        }, 200);
      },
    });
  } catch {}
})();

// ショートカットキー（起動時1回のみ登録）
document.addEventListener("keydown", (e) => {
  const ctrl = e.ctrlKey || e.metaKey;
  if (ctrl && e.key === "s") {
    e.preventDefault();
    if (view === "edit") saveCurrent();
  } else if (ctrl && e.key === "p") {
    e.preventDefault();
    if (view === "edit") { printPreviewOpen = true; render(); }
  } else if (ctrl && e.key === "d") {
    e.preventDefault();
    if (view === "edit") {
      const p = currentProduct();
      if (!p) return;
      if (!canCreateMore()) { showStatus("プランの上限に達しています"); return; }
      products = [{ ...JSON.parse(JSON.stringify(p)), id: uid(), name: `${p.name || "商品"}（複製）`, updatedAt: new Date().toLocaleDateString("ja-JP") }, ...products];
      saveProducts(); showStatus("複製しました"); render();
    }
  } else if (e.key === "Escape") {
    if (printPreviewOpen) { printPreviewOpen = false; render(); }
    else { document.querySelector("[data-modal-cancel]")?.click(); }
  }
});
