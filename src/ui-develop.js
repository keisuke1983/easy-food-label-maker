// ══════════════════════════════════════════════════════════════════════
// FoodPilot Develop — 開発専用詳細ビュー
// ══════════════════════════════════════════════════════════════════════
function devDetailHtml() {
  const p = products.find(x => x.id === productDetailId);
  if (!p) return saasLayout("開発詳細", `<div class="empty-state"><p>商品が見つかりません。</p><button class="action" data-nav="dev-products">← 開発中商品</button></div>`);

  const devProj   = p.devProject || {};
  const versions  = p.recipeVersions || [];
  const batches   = p.trialBatches  || [];
  const adoptedVer = versions.find(v => v.id === p.adoptedRecipeVersionId) || versions.find(v => v.status === "adopted") || versions[0] || null;
  const activeVer  = (activeRecipeVersionId ? versions.find(v => v.id === activeRecipeVersionId) : null) || adoptedVer;
  const pDerived   = adoptedVer ? { ...p, ingredients: adoptedVer.ingredients || [], directCost: adoptedVer.directCost || p.directCost, costMode: adoptedVer.costMode || p.costMode, costItems: adoptedVer.costItems || p.costItems } : p;
  const d          = derive(pDerived);
  const costs      = calcCosts(pDerived);
  const comp       = calcCompletion(p, d);
  const compColor  = comp.pct >= 100 ? "#16a34a" : comp.pct >= 60 ? "#2563eb" : "#d97706";

  // ── 優先度・フェーズ ──
  const PRIORITY_MAP = { urgent:{ label:"🔥 緊急", cls:"urgent" }, high:{ label:"⚡ 高", cls:"high" }, medium:{ label:"📌 中", cls:"medium" }, low:{ label:"🟢 低", cls:"low" } };
  const DEV_PHASES   = ["企画","試作","改善","最終調整","発売準備"];
  const prioInfo     = PRIORITY_MAP[devProj.priority] || null;
  const phaseIdx     = DEV_PHASES.indexOf(devProj.devPhase || "試作");

  // ── タブ ──
  const _tab = devDetailTab || "overview";
  const tabs = [
    { id:"overview",    label:"📋 概要" },
    { id:"recipe",      label:`🧪 レシピ版 ${versions.length > 0 ? `(${versions.length})` : ""}` },
    { id:"trial",       label:`📊 試作評価 ${batches.length > 0 ? `(${batches.length})` : ""}` },
    { id:"cost",        label:"💰 原価シミュ" },
    { id:"nutrition",   label:"🔬 栄養成分" },
    { id:"approval",    label:`👥 承認${p.approvalStatus && p.approvalStatus !== "none" ? " ●" : ""}` },
  ];
  const tabNav = `<div class="dev-detail-tabs">${tabs.map(t => `<button class="dev-detail-tab${_tab===t.id?" active":""}" data-dev-tab="${t.id}">${t.label}</button>`).join("")}</div>`;

  // ── ヘッダー ──
  const phaseBarHtml = `<div class="devd-phase-bar">${DEV_PHASES.map((ph, i) => `<div class="devd-phase-step${i <= phaseIdx ? " done" : ""}${i === phaseIdx ? " current" : ""}">${ph}</div>${i < DEV_PHASES.length - 1 ? `<div class="devd-phase-arrow${i < phaseIdx ? " done" : ""}">›</div>` : ""}`).join("")}</div>`;

  const headerHtml = `
  <div class="devd-header">
    <div class="devd-header-main">
      <div>
        <div class="devd-product-name">${escapeHtml(devProj.projectName || p.name || "（プロジェクト名未設定）")}</div>
        <div class="devd-product-sub">${escapeHtml(p.name || "商品名未設定")}</div>
      </div>
      <div class="devd-header-meta">
        ${prioInfo ? `<span class="devd-priority-chip devd-priority--${prioInfo.cls}">${prioInfo.label}</span>` : ""}
        ${devProj.projectManager ? `<span class="devd-meta-chip">👤 ${escapeHtml(devProj.projectManager)}</span>` : ""}
        ${devProj.targetReleaseDate ? `<span class="devd-meta-chip">🎯 ${escapeHtml(devProj.targetReleaseDate)}</span>` : ""}
        <span class="devd-meta-chip devd-comp-chip" style="color:${compColor}">完成度 ${comp.pct}%</span>
      </div>
    </div>
    ${phaseBarHtml}
    <div class="devd-header-actions">
      <button class="action primary" data-action="save-master">保存する</button>
      <button class="action action--release${p.productStatus === "approved" ? " action--release--ready" : ""}" data-action="release-product" data-pid="${escapeHtml(p.id)}" title="発売済み商品として商品管理へ移行">🚀 発売する</button>
      <button class="action" data-dup-goto="${escapeHtml(p.id)}">複製</button>
      <button class="bread-link" data-nav="dev-products" style="margin-left:8px">← 開発一覧</button>
    </div>
  </div>`;

  // ── タブコンテンツ ──
  let tabContent = "";

  // ① 概要タブ
  if (_tab === "overview") {
    const proj = devProj;
    const priorityOpts = [["","優先度を選択"],["urgent","🔥 緊急"],["high","⚡ 高"],["medium","📌 中"],["low","🟢 低"]].map(([v,l]) => `<option value="${v}"${proj.priority===v?" selected":""}>${l}</option>`).join("");
    const phaseOpts    = DEV_PHASES.map(ph => `<option value="${ph}"${(proj.devPhase||"試作")===ph?" selected":""}>${ph}</option>`).join("");
    const tlEvents = loadTimeline(p.id);
    const tlHtml = tlEvents.length
      ? `<div class="devd-tl-list">${tlEvents.map(ev => `<div class="devd-tl-row"><span class="devd-tl-ico">${ev.icon||"📌"}</span><div class="devd-tl-body"><span class="devd-tl-lbl">${escapeHtml(ev.label)}</span><span class="devd-tl-date">${escapeHtml(ev.savedAt||"")} ${ev.savedBy && ev.savedBy!=="—" ? `· ${escapeHtml(ev.savedBy)}` : ""}</span>${ev.comment ? `<span class="devd-tl-cmt">${escapeHtml(ev.comment)}</span>` : ""}</div></div>`).join("")}</div>`
      : `<p class="devd-empty">まだ記録がありません。ラベルを保存したり印刷したりすると自動記録されます。</p>`;
    tabContent = `<div class="devd-two-col">
      <div>
        <h3 class="devd-section-hd">📋 プロジェクト情報</h3>
        <div class="devd-form-grid">
          <div class="devd-form-row">
            <label class="devd-lbl">プロジェクト名</label>
            <input class="master-input" data-dev-proj-field="projectName" value="${escapeHtml(proj.projectName||"")}" placeholder="例: 有機抹茶クッキー開発P">
          </div>
          <div class="devd-form-row">
            <label class="devd-lbl">商品コンセプト・メモ</label>
            <textarea class="master-input" data-dev-proj-field="projectNote" rows="3" placeholder="ターゲット・特徴・開発背景など">${escapeHtml(proj.projectNote||"")}</textarea>
          </div>
          <div class="devd-form-row-2">
            <div>
              <label class="devd-lbl">担当者</label>
              <input class="master-input" data-dev-proj-field="projectManager" value="${escapeHtml(proj.projectManager||"")}" placeholder="田中花子">
            </div>
            <div>
              <label class="devd-lbl">優先度</label>
              <select class="master-input" data-dev-proj-field="priority">${priorityOpts}</select>
            </div>
          </div>
          <div class="devd-form-row-2">
            <div>
              <label class="devd-lbl">開発フェーズ</label>
              <select class="master-input" data-dev-proj-field="devPhase">${phaseOpts}</select>
            </div>
            <div>
              <label class="devd-lbl">開始日</label>
              <input class="master-input" type="date" data-dev-proj-field="startDate" value="${escapeHtml(proj.startDate||"")}">
            </div>
          </div>
          <div class="devd-form-row-2">
            <div>
              <label class="devd-lbl">発売予定日</label>
              <input class="master-input" type="date" data-dev-proj-field="targetReleaseDate" value="${escapeHtml(proj.targetReleaseDate||"")}">
            </div>
            <div>
              <label class="devd-lbl">目標販売価格</label>
              <input class="master-input" type="number" data-dev-proj-field="targetPrice" value="${escapeHtml(proj.targetPrice||"")}" placeholder="500">
            </div>
          </div>
          <div class="devd-form-row-2">
            <div>
              <label class="devd-lbl">目標原価率 (%)</label>
              <input class="master-input" type="number" data-dev-proj-field="targetCostRate" value="${escapeHtml(proj.targetCostRate||"")}" placeholder="30">
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="devd-section-hd">📜 開発タイムライン</h3>
        ${tlHtml}
      </div>
    </div>`;
  }

  // ② レシピ版タブ
  else if (_tab === "recipe") {
    const canCompare = versions.length >= 2;
    const compareSelected = recipeCompareIds.filter(id => versions.find(v => v.id === id));

    // ── バージョン選択バー ──
    const versionTabs = versions.length
      ? `<div class="devd-ver-tabs">${versions.map(v => {
          const isAdopted  = v.id === p.adoptedRecipeVersionId;
          const isActive   = v.id === (activeVer?.id);
          const isChecked  = recipeCompareMode && compareSelected.includes(v.id);
          return recipeCompareMode
            ? `<label class="devd-ver-tab devd-ver-tab--check${isChecked?" active":""}">
                <input type="checkbox" class="rcmp-check" data-compare-check="${escapeHtml(v.id)}" ${isChecked?"checked":""} style="display:none">
                <span class="rcmp-check-box">${isChecked?"✓":""}</span>
                ${v.label || v.version || `Ver.${v.versionNum || "?"}`}
                ${isAdopted ? `<span class="devd-ver-adopted">採用中</span>` : `<span class="devd-ver-status devd-ver-status--${v.status||"draft"}">${{draft:"下書き",testing:"試作中",rejected:"却下",adopted:"採用"}[v.status]||v.status}</span>`}
              </label>`
            : `<button class="devd-ver-tab${isActive?" active":""}" data-set-active-version="${escapeHtml(v.id)}">
                ${v.label || v.version || `Ver.${v.versionNum || "?"}`}
                ${isAdopted ? `<span class="devd-ver-adopted">採用中</span>` : `<span class="devd-ver-status devd-ver-status--${v.status||"draft"}">${{draft:"下書き",testing:"試作中",rejected:"却下",adopted:"採用"}[v.status]||v.status}</span>`}
              </button>`;
        }).join("")}
        ${!recipeCompareMode ? `<button class="devd-ver-tab devd-ver-tab--add" data-action="add-recipe-version" data-pid="${escapeHtml(p.id)}">＋ 新バージョン</button>` : ""}
      </div>`
      : `<div class="devd-empty-ver"><p>レシピバージョンがありません。</p><button class="action primary" data-action="add-recipe-version" data-pid="${escapeHtml(p.id)}">＋ 最初のバージョンを作成</button></div>`;

    // ── 比較モード切替ボタン ──
    const compareBtnBar = canCompare ? `
      <div class="rcmp-toolbar">
        ${recipeCompareMode
          ? `<span class="rcmp-hint-txt">${compareSelected.length < 2 ? "比較するバージョンを2つ以上選択" : `${compareSelected.length}件を比較中`}</span>
             <button class="action action--compare-exit" data-action="toggle-compare-mode">← 通常表示に戻る</button>`
          : `<button class="action action--compare" data-action="toggle-compare-mode">⚡ バージョンを比較する</button>`}
      </div>` : "";

    // ── メインコンテンツ ──
    let mainContent = "";
    if (recipeCompareMode) {
      mainContent = compareSelected.length >= 2
        ? recipeCompareHtml(p, versions, compareSelected)
        : `<div class="rcmp-select-prompt"><p>上のバージョンタブにチェックを入れてください（2〜4件）</p></div>`;
    } else if (activeVer) {
      const verD = derive({ ...p, ingredients: activeVer.ingredients || [] });
      const verC = calcCosts({ ...p, ingredients: activeVer.ingredients || [], directCost: activeVer.directCost || "", costMode: activeVer.costMode || "direct", costItems: activeVer.costItems || [] });
      const isAdopted = activeVer.id === p.adoptedRecipeVersionId;
      const ingHtml = (activeVer.ingredients || []).length
        ? `<table class="report-table" style="font-size:13px"><thead><tr><th>原材料名</th><th>重量(g)</th></tr></thead><tbody>${(activeVer.ingredients).map(i => `<tr><td>${escapeHtml(i.name||"")}</td><td style="font-variant-numeric:tabular-nums">${escapeHtml(i.weight||"")}</td></tr>`).join("")}</tbody></table>`
        : `<p class="devd-empty">原材料が未入力です。</p>`;
      mainContent = `
        <div class="devd-ver-detail">
          <div class="devd-ver-detail-hd">
            <div>
              <span class="devd-ver-name">${escapeHtml(activeVer.label || `Ver.${activeVer.versionNum}`)}</span>
              ${activeVer.note ? `<span class="devd-ver-note">${escapeHtml(activeVer.note)}</span>` : ""}
            </div>
            <div style="display:flex;gap:8px;align-items:center">
              ${!isAdopted ? `<button class="action primary" style="font-size:12px" data-action="adopt-recipe-version" data-pid="${escapeHtml(p.id)}" data-vid="${escapeHtml(activeVer.id)}">✅ この版を採用する</button>` : `<span class="devd-adopted-label">✅ 採用中</span>`}
              <button class="action" style="font-size:12px" data-action="dup-recipe-version" data-pid="${escapeHtml(p.id)}" data-vid="${escapeHtml(activeVer.id)}">コピーして改良</button>
            </div>
          </div>
          <div class="devd-ver-body-grid">
            <div>
              <h3 class="devd-section-hd">原材料</h3>
              ${ingHtml}
              <button class="action" style="font-size:12px;margin-top:8px" data-label-from="${escapeHtml(p.id)}">✏️ ラベルエディタで編集</button>
            </div>
            <div>
              <h3 class="devd-section-hd">この版の試算</h3>
              <div class="devd-ver-stats">
                <div class="devd-stat-item"><div class="devd-stat-val">${verC.totalCost > 0 ? `¥${Math.round(verC.totalCost).toLocaleString()}` : "—"}</div><div class="devd-stat-lbl">原価</div></div>
                <div class="devd-stat-item"><div class="devd-stat-val ${verC.costRate !== null && verC.costRate > 40 ? "warn" : ""}">${verC.costRate !== null ? `${verC.costRate}%` : "—"}</div><div class="devd-stat-lbl">原価率</div></div>
                <div class="devd-stat-item"><div class="devd-stat-val">${verD.nutrition.kcal > 0 ? `${verD.nutrition.kcal}` : "—"}</div><div class="devd-stat-lbl">kcal</div></div>
                <div class="devd-stat-item"><div class="devd-stat-val">${(verD.allergens||[]).length > 0 ? `${verD.allergens.length}種` : "なし"}</div><div class="devd-stat-lbl">アレルゲン</div></div>
              </div>
              ${typeof recipeIngCostHtml === "function" ? recipeIngCostHtml(activeVer, p) : ""}
              <h3 class="devd-section-hd" style="margin-top:14px">メモ</h3>
              <textarea class="master-input" rows="3" data-ver-note="${escapeHtml(activeVer.id)}" data-pid="${escapeHtml(p.id)}">${escapeHtml(activeVer.note||"")}</textarea>
              ${activeVer.createdAt ? `<p class="devd-ver-date">作成: ${escapeHtml(activeVer.createdAt)}${activeVer.createdBy ? ` · ${escapeHtml(activeVer.createdBy)}` : ""}</p>` : ""}
            </div>
          </div>
        </div>`;
    }
    tabContent = `${compareBtnBar}${versionTabs}${mainContent}`;
  }

  // ③ 試作評価タブ
  else if (_tab === "trial") {
    const SCORE_ITEMS = [["taste","味"],["texture","食感"],["aroma","香り"],["appearance","見た目"],["cost","コスト"]];
    const stars = (n) => n > 0 ? "★".repeat(Math.min(5,Math.round(n))) + "☆".repeat(Math.max(0,5-Math.round(n))) : "—";
    const batchCards = batches.map((b, idx) => {
      const verLabel = (versions.find(v => v.id === b.recipeVersionId)?.label) || "";
      const overall = b.scores ? (Object.values(b.scores).reduce((s,v)=>s+(v||0),0)/Object.values(b.scores).length) : 0;
      return `<div class="devd-batch-card">
        <div class="devd-batch-hd">
          <span class="devd-batch-num">試作 #${b.batchNum || idx+1}</span>
          ${verLabel ? `<span class="devd-batch-ver">${escapeHtml(verLabel)}</span>` : ""}
          <span class="devd-batch-date">${escapeHtml(b.date||"")}</span>
          ${b.evaluator ? `<span class="devd-batch-who">👤 ${escapeHtml(b.evaluator)}</span>` : ""}
        </div>
        ${b.imageDataUrl ? `<img class="devd-batch-img" src="${b.imageDataUrl}" alt="試作品写真">` : ""}
        <div class="devd-score-grid">
          ${SCORE_ITEMS.map(([key,lbl]) => `<div class="devd-score-item"><span class="devd-score-lbl">${lbl}</span><span class="devd-score-stars">${stars(b.scores?.[key])}</span></div>`).join("")}
          <div class="devd-score-item devd-score-overall"><span class="devd-score-lbl">総合</span><span class="devd-score-stars">${overall > 0 ? overall.toFixed(1) + " / 5.0" : "—"}</span></div>
        </div>
        ${b.comment ? `<p class="devd-batch-comment">${escapeHtml(b.comment)}</p>` : ""}
        ${b.nextAction ? `<p class="devd-batch-next">→ ${escapeHtml(b.nextAction)}</p>` : ""}
      </div>`;
    }).join("");

    const SCORE_ITEMS_FORM = [["taste","味"],["texture","食感"],["aroma","香り"],["appearance","見た目"],["cost","コスト"]];
    const verOpts = versions.map(v => `<option value="${escapeHtml(v.id)}">${escapeHtml(v.label||`Ver.${v.versionNum}`)}</option>`).join("");
    const addForm = newTrialBatchOpen ? `
      <div class="devd-add-batch-form">
        <h3 class="devd-section-hd">試作 #${batches.length + 1} を記録</h3>
        <div class="devd-form-row-2">
          <div>
            <label class="devd-lbl">日付</label>
            <input class="master-input" type="date" id="tb-date" value="${new Date().toISOString().split("T")[0]}">
          </div>
          <div>
            <label class="devd-lbl">評価者</label>
            <input class="master-input" id="tb-evaluator" value="${escapeHtml(currentUserName||"")}">
          </div>
        </div>
        <div class="devd-form-row">
          <label class="devd-lbl">対象レシピ版</label>
          <select class="master-input" id="tb-ver">${verOpts}</select>
        </div>
        <div class="devd-score-form-grid">
          ${SCORE_ITEMS_FORM.map(([key,lbl]) => `<div class="devd-score-form-item">
            <label class="devd-lbl">${lbl}</label>
            <select class="master-input" id="tb-${key}">
              <option value="">—</option>
              ${[1,2,3,4,5].map(n => `<option value="${n}">${"★".repeat(n)} ${n}</option>`).join("")}
            </select>
          </div>`).join("")}
        </div>
        <div class="devd-form-row">
          <label class="devd-lbl">コメント・所見</label>
          <textarea class="master-input" id="tb-comment" rows="3" placeholder="味の印象、改善点など"></textarea>
        </div>
        <div class="devd-form-row">
          <label class="devd-lbl">次のアクション</label>
          <input class="master-input" id="tb-next" placeholder="例: 砂糖を20g増量してVer.3を試作">
        </div>
        <div class="devd-form-row">
          <label class="devd-lbl">試作品写真（任意）</label>
          <div class="tb-image-area">
            <input type="file" id="tb-image" accept="image/*" style="display:none">
            <button class="action" type="button" onclick="document.getElementById('tb-image').click()">📷 写真を選択</button>
            <canvas id="tb-image-preview-canvas" style="display:none;max-width:200px;max-height:160px;border-radius:6px;margin-top:8px;object-fit:contain"></canvas>
          </div>
        </div>
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="action primary" data-action="save-trial-batch" data-pid="${escapeHtml(p.id)}">保存する</button>
          <button class="action" data-action="cancel-trial-batch">キャンセル</button>
        </div>
      </div>` : `<button class="action primary" data-action="open-trial-batch">＋ 試作記録を追加</button>`;

    tabContent = `
      <div class="devd-trial-header">
        <h3 class="devd-section-hd">試作品評価履歴</h3>
        ${!newTrialBatchOpen ? `<button class="action primary" data-action="open-trial-batch">＋ 試作記録を追加</button>` : ""}
      </div>
      ${newTrialBatchOpen ? addForm : ""}
      ${batches.length ? `<div class="devd-batch-list">${batchCards}</div>` : `<p class="devd-empty">試作記録がまだありません。</p>`}`;
  }

  // ④ 原価シミュレーション タブ
  else if (_tab === "cost") {
    const targetRate = parseFloat(devProj.targetCostRate) || null;
    const targetPrice = parseFloat(devProj.targetPrice) || null;
    const rows = versions.map(v => {
      const vc = calcCosts({ ...p, ingredients: v.ingredients||[], directCost: v.directCost||"", costMode: v.costMode||"direct", costItems: v.costItems||[] });
      const isAdopted = v.id === p.adoptedRecipeVersionId;
      const rateOk = targetRate !== null && vc.costRate !== null ? vc.costRate <= targetRate : null;
      return `<tr class="${isAdopted ? "devd-cost-row--adopted" : ""}">
        <td>${escapeHtml(v.label||`Ver.${v.versionNum}`)}${isAdopted ? ` <span class="devd-ver-adopted">採用中</span>` : ""}</td>
        <td style="font-variant-numeric:tabular-nums">${vc.totalCost > 0 ? `¥${Math.round(vc.totalCost).toLocaleString()}` : "—"}</td>
        <td style="font-variant-numeric:tabular-nums;color:${rateOk===false?"#dc2626":rateOk===true?"#16a34a":"inherit"}">${vc.costRate !== null ? `${vc.costRate}%` : "—"}</td>
        <td style="font-variant-numeric:tabular-nums">${vc.profitRate !== null ? `${vc.profitRate}%` : "—"}</td>
        <td>${rateOk === true ? "✅" : rateOk === false ? `⚠️ +${(vc.costRate - targetRate).toFixed(1)}%` : "—"}</td>
      </tr>`;
    }).join("");
    const targetRow = (targetRate || targetPrice)
      ? `<div class="devd-target-row">
          ${targetPrice ? `<span class="devd-target-chip">🎯 目標価格: ¥${targetPrice.toLocaleString()}</span>` : ""}
          ${targetRate  ? `<span class="devd-target-chip">🎯 目標原価率: ${targetRate}%</span>` : ""}
        </div>` : `<p class="devd-empty-sm">概要タブで目標価格・目標原価率を設定すると比較できます。</p>`;
    tabContent = `
      <h3 class="devd-section-hd">📊 版別 原価比較</h3>
      ${targetRow}
      <div class="table-wrap">
        <table class="report-table">
          <thead><tr><th>バージョン</th><th>原価</th><th>原価率</th><th>粗利率</th><th>目標比較</th></tr></thead>
          <tbody>${rows || `<tr><td colspan="5" class="devd-empty">バージョンがありません</td></tr>`}</tbody>
        </table>
      </div>
      <p class="devd-note">※ 原価率・粗利率は販売価格が設定されている場合に算出されます。</p>`;
  }

  // ⑤ 栄養成分タブ
  else if (_tab === "nutrition") {
    const nutrRows = versions.map(v => {
      const vd = derive({ ...p, ingredients: v.ingredients || [] });
      const n = vd.nutrition;
      const isAdopted = v.id === p.adoptedRecipeVersionId;
      return `<tr class="${isAdopted ? "devd-cost-row--adopted" : ""}">
        <td>${escapeHtml(v.label||`Ver.${v.versionNum}`)}${isAdopted ? ` <span class="devd-ver-adopted">採用中</span>` : ""}</td>
        <td style="font-variant-numeric:tabular-nums">${n.kcal||"—"}</td>
        <td style="font-variant-numeric:tabular-nums">${n.protein||"—"}</td>
        <td style="font-variant-numeric:tabular-nums">${n.fat||"—"}</td>
        <td style="font-variant-numeric:tabular-nums">${n.carbs||"—"}</td>
        <td style="font-variant-numeric:tabular-nums">${n.salt||"—"}</td>
        <td>${(vd.allergens||[]).length ? vd.allergens.join("・") : "なし"}</td>
      </tr>`;
    }).join("");
    tabContent = `
      <h3 class="devd-section-hd">🔬 版別 栄養成分比較（100g当たり）</h3>
      <div class="table-wrap">
        <table class="report-table">
          <thead><tr><th>バージョン</th><th>kcal</th><th>たんぱく質(g)</th><th>脂質(g)</th><th>炭水化物(g)</th><th>食塩相当量(g)</th><th>アレルゲン</th></tr></thead>
          <tbody>${nutrRows || `<tr><td colspan="7" class="devd-empty">バージョンがありません</td></tr>`}</tbody>
        </table>
      </div>
      <p class="devd-note">※ 原材料の重量(g)が入力されている場合のみ自動計算されます。</p>
      <h3 class="devd-section-hd" style="margin-top:20px">🏷 採用版のラベルプレビュー</h3>
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
        <div>${basicLabelHtml(pDerived, d)}</div>
        <div>${nutritionLabelHtml(d)}</div>
      </div>`;
  }

  // ⑥ 承認タブ
  else if (_tab === "approval") {
    tabContent = approvalTabHtml(p);
  }

  return saasLayout(`${escapeHtml(devProj.projectName || p.name || "開発プロジェクト")} — 開発詳細`, `
    ${headerHtml}
    ${tabNav}
    <div class="devd-tab-body">${tabContent}</div>
  `);
}

// ── レシピバージョン並列比較 ──────────────────────────────────────────────
function recipeCompareHtml(p, versions, ids) {
  const SCORE_KEYS = [["taste","味"],["texture","食感"],["aroma","香り"],["appearance","見た目"],["cost","コスト"]];
  const batches = p.trialBatches || [];
  const cols = ids.map(id => versions.find(v => v.id === id)).filter(Boolean);
  if (cols.length < 2) {
    return `<p class="rcmp-hint">比較するバージョンを2つ以上選択してください。</p>`;
  }

  // 各列の derived/cost データ
  const colData = cols.map(v => {
    const vp = { ...p, ingredients: v.ingredients || [], directCost: v.directCost || "", costMode: v.costMode || "direct", costItems: v.costItems || [] };
    const d  = derive(vp);
    const c  = calcCosts(vp);
    // その版に紐づく試作記録の最新スコア
    const myBatches = batches.filter(b => b.recipeVersionId === v.id);
    const latestBatch = myBatches[myBatches.length - 1] || null;
    const avgBatch = myBatches.length ? {
      taste: myBatches.reduce((s,b)=>s+(b.scores?.taste||0),0)/myBatches.length,
      texture: myBatches.reduce((s,b)=>s+(b.scores?.texture||0),0)/myBatches.length,
      aroma: myBatches.reduce((s,b)=>s+(b.scores?.aroma||0),0)/myBatches.length,
      appearance: myBatches.reduce((s,b)=>s+(b.scores?.appearance||0),0)/myBatches.length,
      cost: myBatches.reduce((s,b)=>s+(b.scores?.cost||0),0)/myBatches.length,
    } : null;
    return { v, d, c, latestBatch, avgBatch, batchCount: myBatches.length };
  });

  // 原材料の union（全版で出現する名称の和集合）
  const allIngNames = [...new Set(cols.flatMap(v => (v.ingredients||[]).map(i => i.name).filter(Boolean)))];
  // 重量が版によって違う原材料を特定
  const diffIngNames = new Set(allIngNames.filter(name => {
    const weights = cols.map(v => (v.ingredients||[]).find(i => i.name === name)?.weight || "");
    return new Set(weights).size > 1;
  }));

  const targetRate = parseFloat(p.devProject?.targetCostRate) || null;

  // セルレンダラー
  const numDiff = (vals, fmt) => {
    const uniq = new Set(vals.map(v => v ?? "—"));
    const hasDiff = uniq.size > 1;
    return vals.map(v => `<td class="rcmp-cell${hasDiff?" rcmp-diff":""}">${fmt(v)}</td>`).join("");
  };

  // ── ヘッダー行 ──
  const headerCells = colData.map(({ v }) => {
    const isAdopted = v.id === p.adoptedRecipeVersionId;
    return `<th class="rcmp-th${isAdopted?" rcmp-adopted-col":""}">
      <div class="rcmp-th-name">${escapeHtml(v.label || v.version || `Ver.${v.versionNum || "?"}`)}</div>
      <div class="rcmp-th-status">
        ${isAdopted
          ? `<span class="devd-ver-adopted">✅ 採用中</span>`
          : `<span class="devd-ver-status devd-ver-status--${v.status||"draft"}">${{draft:"下書き",testing:"試作中",rejected:"却下",adopted:"採用"}[v.status]||v.status}</span>`}
      </div>
      ${!isAdopted ? `<button class="action primary rcmp-adopt-btn" data-action="adopt-recipe-version" data-pid="${escapeHtml(p.id)}" data-vid="${escapeHtml(v.id)}">この版を採用</button>` : ""}
    </th>`;
  }).join("");

  // ── 原材料行 ──
  const ingRows = allIngNames.map(name => {
    const isDiff = diffIngNames.has(name);
    const cells = cols.map(v => {
      const ing = (v.ingredients||[]).find(i => i.name === name);
      const exists = !!ing;
      const w = ing?.weight || "";
      let cls = "rcmp-cell";
      if (!exists) cls += " rcmp-ing-missing";
      else if (isDiff) cls += " rcmp-ing-diff";
      return `<td class="${cls}">${exists ? `${escapeHtml(w)}<span class="rcmp-unit">g</span>` : `<span class="rcmp-na">—</span>`}</td>`;
    }).join("");
    return `<tr><td class="rcmp-row-lbl">${escapeHtml(name)}</td>${cells}</tr>`;
  }).join("");

  // ── 栄養成分行 ──
  const nutrRows = [["kcal","エネルギー","kcal"],["protein","たんぱく質","g"],["fat","脂質","g"],["carbs","炭水化物","g"],["salt","食塩相当量","g"]].map(([key,lbl,unit]) => {
    const vals = colData.map(({d}) => d.nutrition[key] || null);
    const uniq = new Set(vals.map(v => v ?? "—"));
    const hasDiff = uniq.size > 1;
    const cells = vals.map(v => `<td class="rcmp-cell${hasDiff?" rcmp-diff":""}">${v ? `${v}<span class="rcmp-unit">${unit}</span>` : `<span class="rcmp-na">—</span>`}</td>`).join("");
    return `<tr><td class="rcmp-row-lbl">${lbl}</td>${cells}</tr>`;
  }).join("");

  // ── 原価行 ──
  const costRows = [
    ["原価(¥)", colData.map(({c}) => c.totalCost > 0 ? `¥${Math.round(c.totalCost).toLocaleString()}` : null)],
    ["原価率", colData.map(({c}) => c.costRate !== null ? `${c.costRate}%` : null)],
    ...(targetRate ? [["目標比", colData.map(({c}) => {
      if (c.costRate === null) return null;
      const diff = c.costRate - targetRate;
      return diff <= 0 ? `<span style="color:#16a34a">✅ ${diff === 0 ? "±0" : diff.toFixed(1)}%</span>` : `<span style="color:#dc2626">⚠️ +${diff.toFixed(1)}%</span>`;
    })]] : []),
  ].map(([lbl, vals]) => {
    const rawVals = vals.map(v => typeof v === "string" && v.startsWith("<") ? v : v);
    const plainVals = vals.map(v => typeof v === "string" ? v.replace(/<[^>]+>/g,"") : "—");
    const hasDiff = new Set(plainVals).size > 1;
    const cells = vals.map(v => `<td class="rcmp-cell${hasDiff?" rcmp-diff":""}">${v ?? `<span class="rcmp-na">—</span>`}</td>`).join("");
    return `<tr><td class="rcmp-row-lbl">${lbl}</td>${cells}</tr>`;
  }).join("");

  // ── アレルゲン行 ──
  const allergenCells = colData.map(({d}) => {
    const al = d.allergens || [];
    return `<td class="rcmp-cell rcmp-al-cell">${al.length ? al.map(a=>`<span class="rcmp-al-chip">${escapeHtml(a)}</span>`).join("") : `<span class="rcmp-na">なし</span>`}</td>`;
  }).join("");

  // ── 試作スコア行 ──
  const stars = n => n > 0 ? "★".repeat(Math.min(5,Math.round(n))) + "☆".repeat(Math.max(0,5-Math.round(n))) : "—";
  const scoreRows = SCORE_KEYS.map(([key, lbl]) => {
    const vals = colData.map(({avgBatch}) => avgBatch ? avgBatch[key] : null);
    const hasDiff = new Set(vals.map(v => v !== null ? Math.round(v) : "—")).size > 1;
    const cells = vals.map(v => `<td class="rcmp-cell${hasDiff?" rcmp-diff":""}"><span class="rcmp-stars">${stars(v)}</span></td>`).join("");
    return `<tr><td class="rcmp-row-lbl">${lbl}</td>${cells}</tr>`;
  }).join("");
  const batchCountRow = `<tr><td class="rcmp-row-lbl">試作回数</td>${colData.map(({batchCount}) => `<td class="rcmp-cell">${batchCount}回</td>`).join("")}</tr>`;

  return `
  <div class="rcmp-legend">
    <span class="rcmp-legend-item rcmp-legend-diff">差異あり</span>
    <span class="rcmp-legend-item rcmp-legend-missing">未使用原材料</span>
  </div>
  <div class="table-wrap">
    <table class="rcmp-table">
      <thead><tr><th class="rcmp-row-lbl-th"></th>${headerCells}</tr></thead>
      <tbody>
        <tr class="rcmp-section-hd"><td colspan="${cols.length+1}">📦 原材料（g）</td></tr>
        ${ingRows || `<tr><td colspan="${cols.length+1}" class="rcmp-na" style="padding:12px">原材料が入力されていません</td></tr>`}
        <tr class="rcmp-section-hd"><td colspan="${cols.length+1}">💰 原価</td></tr>
        ${costRows}
        <tr class="rcmp-section-hd"><td colspan="${cols.length+1}">🔬 栄養成分（100g当たり）</td></tr>
        ${nutrRows}
        <tr class="rcmp-section-hd"><td colspan="${cols.length+1}">⚠️ アレルゲン</td></tr>
        <tr><td class="rcmp-row-lbl">検出アレルゲン</td>${allergenCells}</tr>
        <tr class="rcmp-section-hd"><td colspan="${cols.length+1}">📊 試作評価（平均スコア）</td></tr>
        ${batchCountRow}
        ${scoreRows}
      </tbody>
    </table>
  </div>`;
}

