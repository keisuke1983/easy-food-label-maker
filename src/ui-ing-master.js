// ══════════════════════════════════════════════════════════════════════
// FoodPilot — 原材料マスタ UI
// 依存: rawMaterials, rawMaterialEditId, rawMaterialSearch,
//       saveRawMaterials, calcUnitPrices, findAffectedProducts,
//       emptyRawMaterial, uid, escapeHtml, showModal, showStatus,
//       saasLayout, render
// ══════════════════════════════════════════════════════════════════════

const RM_UNITS = ["g", "kg", "ml", "L", "個", "袋", "本", "枚", "パック"];
const RM_ADDITIVE_TYPES = ["", "甘味料", "着色料", "保存料", "増粘剤", "酸化防止剤", "発色剤", "漂白剤", "防かび剤", "乳化剤", "pH調整剤", "膨張剤", "香料", "調味料", "その他添加物"];
const RM_ALLERGENS_ALL = ["えび","かに","小麦","そば","卵","乳","落花生","くるみ","アーモンド","あわび","いか","いくら","オレンジ","カシューナッツ","キウイフルーツ","牛肉","ごま","さけ","さば","大豆","鶏肉","バナナ","豚肉","まつたけ","もも","やまいも","りんご","ゼラチン","ピーナッツ"];

function rawMaterialsHtml() {
  if (rawMaterialEditId !== null) return rawMaterialEditHtml();

  const q = rawMaterialSearch.toLowerCase();
  const list = rawMaterials.filter(rm =>
    !q || rm.name?.toLowerCase().includes(q) ||
    rm.maker?.toLowerCase().includes(q) ||
    rm.supplier?.toLowerCase().includes(q) ||
    rm.spec?.toLowerCase().includes(q)
  );

  const fmtPrice = (n) => n !== null ? `¥${Math.round(n).toLocaleString()}` : "—";
  const fmtUnit  = (n, suffix) => n !== null ? `${n.toFixed(n < 1 ? 3 : n < 10 ? 2 : 1)}円/${suffix}` : "—";

  const rows = list.map(rm => {
    const up = calcUnitPrices(rm);
    const hasNutr = rm.nutrition && (parseFloat(rm.nutrition.kcal) > 0 || parseFloat(rm.nutrition.protein) > 0);
    const allergenCount = (rm.allergens || []).length;
    const affected = findAffectedProducts(rm.id);
    return `<tr class="rm-row" data-rm-id="${escapeHtml(rm.id)}">
      <td class="rm-td-name">
        <button class="rm-name-btn" data-action="rm-edit" data-rmid="${escapeHtml(rm.id)}">${escapeHtml(rm.name || "（名称未設定）")}</button>
        ${rm.spec ? `<span class="rm-spec-chip">${escapeHtml(rm.spec)}</span>` : ""}
      </td>
      <td class="rm-td-sub">${escapeHtml(rm.maker || "")}</td>
      <td class="rm-td-sub">${escapeHtml(rm.supplier || "")}</td>
      <td class="rm-td-num">${rm.contentAmount && rm.contentUnit ? `${escapeHtml(String(rm.contentAmount))}${escapeHtml(rm.contentUnit)}` : "—"}</td>
      <td class="rm-td-num">${rm.purchasePrice ? fmtPrice(parseFloat(rm.purchasePrice)) : "—"}</td>
      <td class="rm-td-num" style="font-weight:600">${fmtUnit(up.perG, "g")}</td>
      <td class="rm-td-num">${fmtUnit(up.per100g, "100g")}</td>
      <td class="rm-td-num">${fmtUnit(up.perKg, "kg")}</td>
      <td class="rm-td-ctr">
        ${hasNutr ? `<span class="rm-badge rm-badge--ok" title="栄養成分登録済み">🔬</span>` : `<span class="rm-badge rm-badge--ng" title="栄養成分未登録">—</span>`}
      </td>
      <td class="rm-td-ctr">
        ${allergenCount > 0 ? `<span class="rm-badge rm-badge--warn" title="アレルゲン: ${(rm.allergens||[]).join('・')}">${allergenCount}品目</span>` : `<span class="rm-badge rm-badge--ok">なし</span>`}
      </td>
      <td class="rm-td-ctr">
        ${affected.length > 0 ? `<span class="rm-badge rm-badge--info" title="使用商品: ${affected.map(p=>p.name||p.internalName).join('・')}">${affected.length}件</span>` : `<span class="rm-badge rm-muted">0件</span>`}
      </td>
      <td class="rm-td-ctr">${escapeHtml(rm.updatedAt || "")}</td>
      <td class="rm-td-ctr">
        <button class="rm-del-btn" data-action="rm-delete" data-rmid="${escapeHtml(rm.id)}" title="削除">🗑</button>
      </td>
    </tr>`;
  }).join("");

  const emptyHtml = list.length === 0 ? `<tr><td colspan="13" class="rm-empty">${rawMaterials.length === 0 ? "原材料マスタが未登録です。「＋ 新規登録」から追加してください。" : "検索結果が見つかりません。"}</td></tr>` : "";

  return saasLayout("原材料マスタ", `
    <div class="rm-shell">
      <div class="rm-toolbar">
        <input class="rm-search-input" type="search" placeholder="原材料名・メーカー・仕入先で検索..." value="${escapeHtml(rawMaterialSearch)}" data-rm-search>
        <button class="action primary" data-action="rm-new">＋ 新規登録</button>
        <button class="action" data-action="rm-import-db" title="栄養DBの食材を一括インポート">📥 DBから取込</button>
      </div>
      <div class="rm-summary-bar">
        <span>${rawMaterials.length}件登録</span>
        <span class="rm-summary-sep">|</span>
        <span>マスタ連携済み原材料: ${rawMaterials.filter(rm => findAffectedProducts(rm.id).length > 0).length}件</span>
      </div>
      <div class="table-wrap">
        <table class="rm-table">
          <thead>
            <tr>
              <th class="rm-th-name">原材料名</th>
              <th>メーカー</th>
              <th>仕入先</th>
              <th>内容量</th>
              <th>仕入価格</th>
              <th>1g単価</th>
              <th>100g単価</th>
              <th>1kg単価</th>
              <th>栄養</th>
              <th>アレルゲン</th>
              <th>使用商品</th>
              <th>更新日</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows}${emptyHtml}</tbody>
        </table>
      </div>
      <p class="rm-note">※ 原材料マスタはレシピ原価計算・栄養成分・食品表示の「唯一の情報源（SSoT）」です。原材料を登録しておくと、開発画面でレシピに追加するだけで原価・栄養が自動計算されます。</p>
    </div>
  `);
}

function rawMaterialNewSelectHtml() {
  return saasLayout("原材料 新規登録", `
    <div class="rm-new-select-shell">
      <p class="rm-new-select-lead">登録方法を選んでください</p>
      <div class="rm-new-select-grid">
        <button class="rm-new-method-card" data-action="rm-new-scan-photo">
          <span class="rm-new-method-icon">📷</span>
          <span class="rm-new-method-title">写真から</span>
          <span class="rm-new-method-desc">原材料の商品写真・<br>ラベルをアップロード<br>AIが自動読み取り</span>
        </button>
        <button class="rm-new-method-card" data-action="rm-new-scan-spec">
          <span class="rm-new-method-icon">📄</span>
          <span class="rm-new-method-title">規格書から</span>
          <span class="rm-new-method-desc">PDF・テキスト・<br>画像の規格書を<br>AIが自動解析</span>
        </button>
        <button class="rm-new-method-card" data-action="rm-new-manual">
          <span class="rm-new-method-icon">✏️</span>
          <span class="rm-new-method-title">手動で入力</span>
          <span class="rm-new-method-desc">名称・価格・栄養成分を<br>フォームに直接<br>入力する</span>
        </button>
      </div>
      <button class="action" style="margin-top:16px" data-action="rm-back">← キャンセル</button>
    </div>
  `);
}

function rawMaterialScanHtml(mode) {
  const isPhoto = mode === "scan-photo";
  const title  = isPhoto ? "📷 写真から原材料登録" : "📄 規格書から原材料登録";
  const accept = isPhoto ? "image/*" : "image/*,.pdf,.txt,.csv";
  const desc   = isPhoto
    ? "原材料のパッケージ・納品書・ラベル写真をアップロードしてください。AIが原材料名・栄養成分・アレルゲンを自動で読み取ります。"
    : "メーカー規格書（PDF・画像・テキスト）をアップロードしてください。AIが必要な項目を自動で抽出します。";

  const RM_SCAN_STEPS = ["ファイルを読み込み中...", "原材料名・メーカーを抽出...", "栄養成分を読み取り中...", "アレルゲンを確認中...", "フォームに反映する..."];

  if (rmScanError) {
    return saasLayout(title, `
      <div class="ai-analysis-wrap">
        <div class="ai-analysis-card">
          <div class="ai-analysis-title" style="color:#dc2626">❌ 読み取りできませんでした</div>
          <p style="color:#64748b;margin:8px 0 20px;white-space:pre-wrap">${escapeHtml(rmScanError)}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="action primary" data-action="rm-scan-retry">もう一度試す</button>
            <button class="action" data-action="rm-new-manual">手動で入力する</button>
            <button class="action" data-action="rm-back">戻る</button>
          </div>
        </div>
      </div>`);
  }

  if (rmScanStep === 1) {
    const pct = Math.round(((rmScanStep) / RM_SCAN_STEPS.length) * 100);
    const stepsHtml = RM_SCAN_STEPS.map((s, i) => `
      <div class="ai-step ${i < 1 ? "done" : i === 1 ? "active" : ""}">
        <span class="ai-step-dot">${i < 1 ? "✓" : i === 1 ? "●" : "○"}</span>
        <span>${escapeHtml(s)}</span>
      </div>`).join("");
    return saasLayout("AI読み取り中", `
      <div class="ai-analysis-wrap">
        <div class="ai-analysis-card">
          <div class="ai-analysis-title">🤖 ${isPhoto ? "写真" : "規格書"}を解析中...</div>
          <div class="ai-analysis-bar-wrap"><div class="ai-analysis-bar" id="rm-scan-bar" style="width:${pct}%"></div></div>
          <div class="ai-steps">${stepsHtml}</div>
        </div>
      </div>`);
  }

  if (rmScanStep === 2) {
    const d = rmScanDraft;
    const rows = [
      ["原材料名", d.name || "—"],
      ["メーカー", d.maker || "—"],
      ["仕入先", d.supplier || "—"],
      ["規格", d.spec || "—"],
      ["内容量", d.contentAmount ? `${d.contentAmount}${d.contentUnit||""}` : "—"],
      ["仕入価格", d.purchasePrice ? `¥${parseFloat(d.purchasePrice).toLocaleString()}` : "—"],
      ["エネルギー", d.nutrition?.kcal ? `${d.nutrition.kcal} kcal/100g` : "—"],
      ["たんぱく質", d.nutrition?.protein ? `${d.nutrition.protein}g` : "—"],
      ["脂質", d.nutrition?.fat ? `${d.nutrition.fat}g` : "—"],
      ["炭水化物", d.nutrition?.carbs ? `${d.nutrition.carbs}g` : "—"],
      ["食塩相当量", d.nutrition?.salt ? `${d.nutrition.salt}g` : "—"],
      ["アレルゲン", (d.allergens||[]).length ? d.allergens.join("・") : "なし"],
    ].map(([k,v]) => `<tr><td style="color:#64748b;padding:4px 12px 4px 0;font-size:13px">${k}</td><td style="font-size:13px;font-weight:${v!=="—"?"600":"400"}">${escapeHtml(v)}</td></tr>`).join("");
    return saasLayout("読み取り完了", `
      <div class="ai-analysis-wrap">
        <div class="ai-analysis-card" style="max-width:520px">
          <div class="ai-analysis-title" style="color:#16a34a">✅ 読み取り完了！</div>
          <p style="color:#64748b;margin:6px 0 16px;font-size:13px">内容を確認して「フォームに反映する」を押してください。フォームで修正もできます。</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px">${rows}</table>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="action primary" data-action="rm-scan-apply">フォームに反映する →</button>
            <button class="action" data-action="rm-scan-retry">やり直す</button>
          </div>
        </div>
      </div>`);
  }

  const previewHtml = rmScanPreview
    ? `<div class="rm-scan-preview"><img src="${rmScanPreview}" alt="プレビュー" style="max-height:180px;max-width:100%;border-radius:8px;object-fit:contain"></div>`
    : "";

  return saasLayout(title, `
    <div class="reg-page">
      <div class="reg-page-header">
        <button class="action" data-action="rm-new">← 登録方法選択に戻る</button>
        <h2 class="reg-page-title" style="margin-top:16px">${title}</h2>
        <p class="reg-page-desc">${escapeHtml(desc)}</p>
      </div>
      <label class="rm-scan-drop" id="rm-drop-zone" style="cursor:pointer">
        <input type="file" id="rm-file-input" accept="${accept}" style="display:none">
        <div class="reg-upload-icon">${isPhoto ? "📷" : "📄"}</div>
        <div class="reg-upload-main">ここにファイルをドラッグ＆ドロップ</div>
        <div class="reg-upload-sub">または</div>
        <span class="action secondary">ファイルを選択</span>
        <div class="reg-upload-note">${isPhoto ? "対応形式：JPG・PNG・HEIC・WebP" : "対応形式：PDF・JPG・PNG・TXT・CSV"}</div>
      </label>
      ${previewHtml}
      ${rmScanPreview ? `<div style="margin-top:16px;text-align:center"><button class="action primary" data-action="rm-scan-read" data-mode="${mode}">🤖 AIで読み取る</button></div>` : ""}
      <div class="reg-supported-wrap" style="margin-top:24px">
        <div class="reg-supported-title">読み取り対応項目</div>
        <div class="reg-supported-list">
          ${["原材料名","メーカー","規格","内容量","栄養成分（100g当たり）","アレルゲン"].map(t=>`<span class="reg-supported-chip">${t}</span>`).join("")}
        </div>
      </div>
    </div>`);
}

function rawMaterialEditHtml() {
  const isNew = rawMaterialEditId === "__new__";
  if (isNew && rmNewStep === "select") return rawMaterialNewSelectHtml();
  if (isNew && (rmNewStep === "scan-photo" || rmNewStep === "scan-spec")) return rawMaterialScanHtml(rmNewStep);
  const draft = (isNew && Object.keys(rmScanDraft).length) ? rmScanDraft : null;
  const rm = isNew
    ? { ...emptyRawMaterial(), ...(draft || {}) }
    : rawMaterials.find(r => r.id === rawMaterialEditId) || emptyRawMaterial();
  const up = calcUnitPrices(rm);
  const fmtU = (v, s) => v !== null ? `${v.toFixed(v < 1 ? 3 : v < 10 ? 2 : 1)} 円/${s}` : "—";

  const unitOpts = RM_UNITS.map(u => `<option value="${u}"${rm.contentUnit===u?" selected":""}>${u}</option>`).join("");
  const additiveOpts = RM_ADDITIVE_TYPES.map(t => `<option value="${t}"${rm.additiveType===t?" selected":""}>${t||"（なし）"}</option>`).join("");

  const allergenChecks = RM_ALLERGENS_ALL.map(a => {
    const checked = (rm.allergens || []).includes(a);
    const isMandatory = ["えび","かに","小麦","そば","卵","乳","落花生","くるみ"].includes(a);
    return `<label class="rm-allergen-check${checked?" checked":""}${isMandatory?" mandatory":""}">
      <input type="checkbox" data-rm-allergen="${escapeHtml(a)}" ${checked?"checked":""}> ${a}${isMandatory?`<span class="rm-allergen-mandatory">義務</span>`:`<span class="rm-allergen-recommend">推奨</span>`}
    </label>`;
  }).join("");

  const nutr = rm.nutrition || {};
  const affected = isNew ? [] : findAffectedProducts(rm.id);

  const priceHistHtml = (rm.priceHistory || []).length > 0
    ? `<div class="rm-ph-list">${[...(rm.priceHistory)].reverse().slice(0, 10).map(h => `
        <div class="rm-ph-row">
          <span class="rm-ph-date">${escapeHtml(h.date)}</span>
          <span class="rm-ph-price">¥${parseFloat(h.price).toLocaleString()}</span>
          ${h.note ? `<span class="rm-ph-note">${escapeHtml(h.note)}</span>` : ""}
        </div>`).join("")}
      </div>`
    : `<p class="rm-empty-sm">価格変更履歴はありません。</p>`;

  const affectedHtml = affected.length > 0
    ? `<div class="rm-affected-list">${affected.slice(0,8).map(p=>`<span class="rm-affected-chip">${escapeHtml(p.internalName||p.name||"名称未設定")}</span>`).join("")}${affected.length>8?`<span class="rm-affected-chip rm-muted">他${affected.length-8}件</span>`:""}</div>`
    : `<p class="rm-empty-sm">この原材料を使用しているレシピはありません。</p>`;

  return saasLayout(`${isNew ? "原材料 新規登録" : "原材料マスタ編集"} — ${escapeHtml(rm.name || "（名称未設定）")}`, `
    <div class="rm-edit-shell">
      <div class="rm-edit-header">
        <button class="bread-link" data-action="rm-back">← 原材料マスタ</button>
        <div style="display:flex;gap:8px">
          <button class="action primary" data-action="rm-save">保存する</button>
          ${!isNew ? `<button class="action danger-outline" data-action="rm-delete" data-rmid="${escapeHtml(rm.id)}">削除</button>` : ""}
        </div>
      </div>

      <div class="rm-edit-grid">
        <!-- 左カラム: 基本情報 + 単価 -->
        <div class="rm-edit-left">
          <h3 class="rm-section-hd">📦 基本情報</h3>
          <div class="rm-form-group">
            <label class="rm-lbl">原材料名 <span class="rm-required">必須</span></label>
            <input class="rm-input" id="rm-name" value="${escapeHtml(rm.name)}" placeholder="例: 上白糖、薄力粉、バター">
          </div>
          <div class="rm-form-group">
            <label class="rm-lbl">食品表示名称 <span class="rm-hint">（省略可 → 原材料名を使用）</span></label>
            <input class="rm-input" id="rm-labelName" value="${escapeHtml(rm.labelName||"")}" placeholder="例: 砂糖（国産）">
          </div>
          <div class="rm-form-2col">
            <div class="rm-form-group">
              <label class="rm-lbl">メーカー</label>
              <input class="rm-input" id="rm-maker" value="${escapeHtml(rm.maker||"")}" placeholder="例: ○○製糖">
            </div>
            <div class="rm-form-group">
              <label class="rm-lbl">仕入先</label>
              <input class="rm-input" id="rm-supplier" value="${escapeHtml(rm.supplier||"")}" placeholder="例: △△商事">
            </div>
          </div>
          <div class="rm-form-group">
            <label class="rm-lbl">規格</label>
            <input class="rm-input" id="rm-spec" value="${escapeHtml(rm.spec||"")}" placeholder="例: 上白糖 業務用">
          </div>
          <div class="rm-form-group">
            <label class="rm-lbl">添加物区分</label>
            <select class="rm-input" id="rm-additiveType">${additiveOpts}</select>
          </div>

          <h3 class="rm-section-hd" style="margin-top:20px">💴 仕入価格・単価計算</h3>
          <div class="rm-form-2col">
            <div class="rm-form-group">
              <label class="rm-lbl">内容量</label>
              <div style="display:flex;gap:6px">
                <input class="rm-input" id="rm-contentAmount" type="number" min="0" value="${escapeHtml(String(rm.contentAmount||""))}" placeholder="20" style="flex:1" data-rm-price-calc>
                <select class="rm-input" id="rm-contentUnit" style="width:72px" data-rm-price-calc>${unitOpts}</select>
              </div>
            </div>
            <div class="rm-form-group">
              <label class="rm-lbl">仕入価格（円）</label>
              <div style="display:flex;gap:6px;align-items:center">
                <input class="rm-input" id="rm-purchasePrice" type="number" min="0" value="${escapeHtml(String(rm.purchasePrice||""))}" placeholder="4000" style="flex:1" data-rm-price-calc>
                <label class="rm-tax-check">
                  <input type="checkbox" id="rm-taxIncluded" ${rm.taxIncluded?"checked":""}> 税込
                </label>
              </div>
            </div>
          </div>
          <!-- 自動計算単価表示 -->
          <div class="rm-unit-prices" id="rm-unit-prices-preview">
            <div class="rm-up-row"><span class="rm-up-lbl">1g単価</span><span class="rm-up-val" id="rm-up-g">${fmtU(up.perG, "g")}</span></div>
            <div class="rm-up-row"><span class="rm-up-lbl">100g単価</span><span class="rm-up-val" id="rm-up-100g">${fmtU(up.per100g, "100g")}</span></div>
            <div class="rm-up-row"><span class="rm-up-lbl">1kg単価</span><span class="rm-up-val" id="rm-up-kg">${fmtU(up.perKg, "kg")}</span></div>
          </div>
        </div>

        <!-- 右カラム: 栄養 + アレルゲン -->
        <div class="rm-edit-right">
          <h3 class="rm-section-hd">🔬 栄養成分（100g当たり）</h3>
          <p class="rm-note" style="margin-bottom:8px">登録しておくと、この原材料を使ったレシピの栄養成分が自動計算されます。</p>
          <div class="rm-nutr-grid">
            ${[["kcal","エネルギー","kcal"],["protein","たんぱく質","g"],["fat","脂質","g"],["carbs","炭水化物","g"],["salt","食塩相当量","g"]].map(([k,l,u])=>`
            <div class="rm-form-group">
              <label class="rm-lbl">${l}</label>
              <div class="rm-nutr-input-wrap">
                <input class="rm-input" id="rm-nutr-${k}" type="number" min="0" step="0.1" value="${escapeHtml(String(nutr[k]||""))}" placeholder="0">
                <span class="rm-nutr-unit">${u}</span>
              </div>
            </div>`).join("")}
          </div>
          <button class="action rm-nutr-auto-btn" data-action="rm-nutr-auto" style="margin-top:4px;font-size:12px">🔍 DBから自動入力</button>

          <h3 class="rm-section-hd" style="margin-top:20px">🥜 アレルゲン</h3>
          <div class="rm-allergen-grid">${allergenChecks}</div>
        </div>
      </div>

      <!-- 価格履歴 -->
      <div class="rm-edit-section" style="margin-top:24px">
        <h3 class="rm-section-hd">📊 価格変更履歴</h3>
        ${priceHistHtml}
      </div>

      <!-- 使用中商品 + 価格変更インパクト -->
      <div class="rm-edit-section" style="margin-top:16px">
        <h3 class="rm-section-hd">🔗 使用中の商品・レシピ（${affected.length}件）</h3>
        ${affectedHtml}
        ${affected.length > 0 ? `<div id="rm-impact-preview" class="rm-impact-preview">
          <div class="rm-impact-hd">⚡ 価格変更インパクト（仕入価格を変更すると自動更新）</div>
          <div id="rm-impact-rows" class="rm-impact-rows">${affected.slice(0,5).map(p => {
            const ings = (p.ingredients||[]).filter(i=>i.name?.trim());
            const costs = calcCostsFromRecipe(ings, p.price);
            const rateStr = costs.costRate !== null ? `<span style="color:${costs.costRate<=30?"#16a34a":costs.costRate<=60?"#d97706":"#ef4444"};font-weight:700">${costs.costRate}%</span>` : `<span style="color:#94a3b8">未計算</span>`;
            return `<div class="rm-impact-row"><span class="rm-impact-name">${escapeHtml(p.internalName||p.name||"名称未設定")}</span><span class="rm-impact-rate">現在: ${rateStr}</span></div>`;
          }).join("")}${affected.length>5?`<div class="rm-impact-more">他${affected.length-5}件</div>`:""}</div>
          <div id="rm-ai-analysis" class="rm-ai-analysis rm-ai-analysis--hint">仕入価格を変更するとAI分析が表示されます</div>
        </div>` : ""}
      </div>

      <div class="rm-edit-footer">
        <button class="action primary" data-action="rm-save">保存する</button>
        <button class="action" data-action="rm-back">キャンセル</button>
      </div>
    </div>
  `);
}

// 開発画面レシピタブ用：マスタ連携インライン原価ビュー
function recipeIngCostHtml(activeVer, p) {
  const ings = (activeVer?.ingredients || []).filter(i => i.name?.trim());
  if (!ings.length) return "";
  const costs = calcCostsFromRecipe(ings, p.price);
  const linkedCount = ings.filter(i => rawMaterials.find(r => r.id === i.masterId)).length;

  const rows = costs.lineItems.map(li => {
    const unit = li.rm ? `${parseFloat(li.perG).toFixed(3)}円/g` : "—";
    const costStr = li.cost !== null ? `¥${Math.round(li.cost).toLocaleString()}` : `<span class="rm-muted">未連携</span>`;
    return `<tr>
      <td>${escapeHtml(li.name)}</td>
      <td class="rm-td-num">${li.weight > 0 ? `${li.weight}g` : "—"}</td>
      <td class="rm-td-num" style="font-size:11px;color:#64748b">${unit}</td>
      <td class="rm-td-num" style="font-weight:600">${costStr}</td>
    </tr>`;
  }).join("");

  const totalStr = costs.rawCost > 0 ? `¥${Math.round(costs.rawCost).toLocaleString()}` : "—";
  const rateStr  = costs.costRate !== null ? `原価率 ${costs.costRate}%` : "";

  return `<div class="rm-recipe-cost-box">
    <div class="rm-recipe-cost-hd">
      💴 原材料原価（マスタ連携: ${linkedCount}/${ings.length}件）
      ${linkedCount < ings.length ? `<button class="action rm-link-all-btn" style="font-size:11px;margin-left:8px" data-action="rm-link-ings" data-pid="${escapeHtml(p.id)}" data-vid="${escapeHtml(activeVer?.id||"")}">🔗 未連携を一括マッチ</button>` : ""}
    </div>
    <div class="table-wrap">
      <table class="rm-table rm-table--sm">
        <thead><tr><th>原材料名</th><th>使用量</th><th>単価</th><th>原価</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr class="rm-cost-total">
            <td colspan="3">合計原価</td>
            <td class="rm-td-num" style="font-weight:700;font-size:15px">${totalStr}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    ${rateStr ? `<p style="margin-top:6px;font-size:12px;color:#64748b">${rateStr}${costs.price > 0 ? ` / 販売価格 ¥${costs.price.toLocaleString()}` : ""}</p>` : ""}
  </div>`;
}

// 原材料マスタ検索サジェスト用 datalist
function rmDatalistHtml(listId) {
  return `<datalist id="${listId}">${rawMaterials.map(rm => `<option value="${escapeHtml(rm.name)}" data-rmid="${escapeHtml(rm.id)}">`).join("")}</datalist>`;
}
