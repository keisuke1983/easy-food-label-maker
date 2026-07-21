/* ── チュートリアル ── */
const TUTORIAL_STEPS = [
  {
    icon: "🎉", color: "#2563eb", bg: "#eff6ff",
    title: "FoodPilotへようこそ",
    desc: "食品メーカーの商品ライフサイクルを一元管理するプラットフォームです。開発中から発売・終売まで、すべての工程をFoodPilotで管理できます（ガイド約2分）。",
    features: ["開発中〜発売後の商品を一元管理", "AIで食品表示・法令チェック・相談", "チームで承認ワークフローを運用"],
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
  "商品画像":  { tab: "basic",       field: "#image-drop-zone" },
  "商品概要":  { tab: "basic",       field: "[data-master-field='productMemo']" },
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

// ── タイムラインイベント ──────────────────────────────────────────────
const TIMELINE_EVENT_ICONS = {
  registered:          "🆕", released:           "🚀", label_changed:      "🏷",
  spec_updated:        "📄", cost_changed:        "💴", ai_reviewed:        "🤖",
  oem_added:           "🏭", discontinued:       "🔴", photo_updated:      "📷",
  spec_import:         "📥", ai_updated:         "✦",  saved:              "💾",
  status_changed:      "🔄", approval_requested: "👥", approved:           "✅",
  rejected:            "↩",  approval_cancelled: "🚫",
  label_edited:        "🏷", ai_consulted:        "🤖", pdf_exported:       "🖨", duplicated:         "📋",
  field_changed:       "✏️", comment:            "💬", trial_batch:         "📊",
};
// 自動タイムライン記録するフィールド名 → 表示ラベル
const TRACKED_MASTER_FIELDS = {
  name:             "商品名",
  price:            "販売価格",
  category:         "カテゴリ",
  bestBefore:       "賞味期限",
  volume:           "内容量",
  storage:          "保存方法",
  manufacturerName: "製造者名",
  originCountry:    "原料原産地",
  internalName:     "管理名",
  specResponsible:  "担当者",
  currentStock:     "在庫数",
  stockUnit:        "在庫単位",
  expiryDate:       "期限管理日",
  janCode:          "JANコード",
  directCost:       "直接原材料費",
  targetCostRate:   "目標原価率",
};
// イベント種別 → ドット色
const TIMELINE_EVENT_COLORS = {
  registered:       "#16a34a", duplicated:        "#16a34a",
  label_edited:     "#2563eb", field_changed:     "#2563eb", spec_updated: "#2563eb",
  approved:         "#059669", released:          "#059669",
  rejected:         "#dc2626", approval_cancelled:"#dc2626", discontinued: "#6b7280",
  approval_requested:"#d97706",
  ai_consulted:     "#7c3aed", pdf_exported:      "#64748b", trial_batch:       "#0891b2",
  status_changed:   "#0891b2", comment:           "#0891b2",
};
function saveTimelineEvent(pid, eventType, label, comment = "", changedFields = [], changes = {}) {
  try {
    const key = `food-label-timeline-${pid}`;
    const events = JSON.parse(safeGet(key) || "[]");
    events.unshift({
      eventType,
      icon: TIMELINE_EVENT_ICONS[eventType] || "📌",
      label,
      savedAt: new Date().toLocaleString("ja-JP"),
      savedBy: currentUserName || "—",
      comment,
      changedFields,
      changes,
    });
    safeSet(key, JSON.stringify(events.slice(0, 200)));
  } catch {}
}
function loadTimeline(pid) {
  try { return JSON.parse(safeGet(`food-label-timeline-${pid}`) || "[]"); } catch { return []; }
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
  ["memo",               "備考・特記事項"],
  ["specResponsible",   "担当者"],
  ["currentStock",       "在庫数"],
  ["stockUnit",          "在庫単位"],
  ["expiryDate",         "期限管理日"],
  ["releasedAt",         "発売日"],
  ["publishStatus",      "ステータス"],
  ["approvalStatus",     "承認ステータス"],
  ["updatedAt",          "更新日"],
  ["directCost",         "材料費"],
  ["directPackaging",    "包装費"],
  ["directShipping",     "送料"],
  ["directOther",        "その他費用"],
  ["totalCost",          "原価合計"],
  ["costRate",           "原価率"],
  ["grossProfit",        "粗利額"],
  ["labelErrors",        "表示エラー数"],
  ["labelWarnings",      "表示警告数"],
  ["allergens",          "アレルゲン"],
];

function exportAllergenCsv() {
  const allergenNames = ALLERGEN_RULES.map(([name]) => name);
  const phase = allergenMatrixPhase || "released";
  let list = phase === "all" ? products
    : phase === "development" ? products.filter(p => p.phase === "development")
    : products.filter(p => (p.phase || "released") === "released");
  list = list.filter(p => p.internalName || p.name);
  const header = ["商品名", "商品コード", ...allergenNames].join(",");
  const body = list.map(p => {
    const ingNames = (p.ingredients || []).map(i => i.name).filter(Boolean);
    const detected = new Set(detectAllergens(ingNames));
    const cols = [
      `"${(p.internalName||p.name||"").replace(/"/g,'""')}"`,
      `"${(p.code||"").replace(/"/g,'""')}"`,
      ...allergenNames.map(a => detected.has(a) ? "✓" : ""),
    ];
    return cols.join(",");
  }).join("\n");
  const csv = "﻿" + header + "\n" + body;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `アレルゲン管理表_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showStatus(`アレルゲン管理表をCSV出力しました（${list.length}件）`);
}

function exportCsv(filteredOnly = false) {
  const todayIso = new Date().toISOString().split("T")[0];
  const staleIso = new Date(Date.now() - 180*24*60*60*1000).toISOString().split("T")[0];
  const soonIso  = new Date(Date.now() + 30*24*60*60*1000).toISOString().split("T")[0];
  let exportList = [...products];
  if (filteredOnly) {
    // 現在の絞り込み条件を再現
    const rel = exportList.filter(p => (p.phase || "released") === "released");
    let list = [...rel];
    if (masterFilter === "starred")      list = list.filter(p => p.starred);
    else if (masterFilter === "active")  list = list.filter(p => p.publishStatus === "active");
    else if (masterFilter === "draft")   list = list.filter(p => p.publishStatus === "draft");
    else if (masterFilter === "incomplete") list = list.filter(p => { const d = derive(p); return calcCompletion(p, d).pct < 100; });
    else if (masterFilter === "noBestBefore") list = list.filter(p => !p.bestBefore?.trim());
    else if (masterFilter === "noIngredients") list = list.filter(p => !(p.ingredients||[]).some(i => i.name?.trim()));
    else if (masterFilter === "noMfr")   list = list.filter(p => !p.manufacturerName?.trim());
    else if (masterFilter === "noJan")   list = list.filter(p => !p.janCode?.trim());
    else if (masterFilter === "noImage") list = list.filter(p => !p.imageDataUrl);
    else if (masterFilter === "noCost")  list = list.filter(p => (p.costMode||"direct")==="direct"?!parseFloat(p.directCost):!(p.costItems||[]).length);
    else if (masterFilter === "noStock") list = list.filter(p => p.currentStock==null||p.currentStock===""||parseFloat(p.currentStock)===0);
    else if (masterFilter === "expired") list = list.filter(p => p.expiryDate && p.expiryDate < todayIso);
    else if (masterFilter === "expiringSoon") list = list.filter(p => p.expiryDate && p.expiryDate >= todayIso && p.expiryDate <= soonIso);
    else if (masterFilter === "stale")   list = list.filter(p => p.updatedAt && p.updatedAt < staleIso);
    else if (masterFilter === "review")  list = list.filter(p => p.approvalStatus === "review");
    else if (masterFilter === "hasLabelErrors") list = list.filter(p => { const d = derive(p); return checkFoodLabel(p, d).some(i => i.level === "error"); });
    if (masterCategoryFilter)   list = list.filter(p => (p.category||"") === masterCategoryFilter);
    if (masterCompletionFilter) { const t = {lt100:100,lt60:60,lt30:30}[masterCompletionFilter]||100; list = list.filter(p => { const d=derive(p); return calcCompletion(p,d).pct < t; }); }
    if (masterPipelineFilter)   list = list.filter(p => (p.productStatus||"on_sale") === masterPipelineFilter);
    if (masterResponsibleFilter) list = list.filter(p => (p.specResponsible||"") === masterResponsibleFilter);
    if (masterAllergenFilter)   list = list.filter(p => derive(p).allergens.includes(masterAllergenFilter));
    if (masterIngFilter) { const _mi=masterIngFilter.toLowerCase(); list=list.filter(p=>(p.ingredients||[]).some(i=>(i.name||"").toLowerCase().includes(_mi))); }
    if (masterSearch) { const _ms = masterSearch.toLowerCase(); list = list.filter(p => (p.internalName||"").toLowerCase().includes(_ms)||(p.name||"").toLowerCase().includes(_ms)||(p.code||"").toLowerCase().includes(_ms)||(p.category||"").toLowerCase().includes(_ms)||(p.janCode||"").includes(_ms)||(p.specResponsible||"").toLowerCase().includes(_ms)||derive(p).allergens.join(" ").includes(_ms)); }
    exportList = list;
  }
  const rows = exportList.map((p) => {
    const costs = calcCosts(p);
    const d = derive(p);
    const lcIssues = checkFoodLabel(p, d);
    const extra = {
      totalCost:    costs.totalCost > 0 ? Math.round(costs.totalCost) : "",
      costRate:     costs.costRate !== null ? costs.costRate + "%" : "",
      grossProfit:  costs.price > 0 ? Math.round(costs.gross) : "",
      labelErrors:  lcIssues.filter(i => i.level === "error").length || "",
      labelWarnings:lcIssues.filter(i => i.level === "warn").length || "",
      allergens:    d.allergens.join("・"),
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
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = filteredOnly ? `_絞込${exportList.length}件` : `_全${exportList.length}件`;
  const a = document.createElement("a"); a.href = url; a.download = `FoodPilot_商品一覧_${dateStr}${suffix}.csv`; a.click();
  URL.revokeObjectURL(url);
  showStatus(`CSV をエクスポートしました（${exportList.length}件）`);
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


function rmMasterLookup(masterId) {
  if (!masterId) return null;
  const rm = rawMaterials.find(r => r.id === masterId);
  if (!rm?.nutrition) return null;
  const n = rm.nutrition;
  const kcal = parseFloat(n.kcal);
  if (isNaN(kcal) || (kcal === 0 && !parseFloat(n.protein) && !parseFloat(n.fat) && !parseFloat(n.carbs))) return null;
  return { kcal: kcal || 0, protein: parseFloat(n.protein) || 0, fat: parseFloat(n.fat) || 0, carbs: parseFloat(n.carbs) || 0, salt: parseFloat(n.salt) || 0 };
}

function derive(p) {
  const autoNutrition = calcNutrition(p.ingredients, rmMasterLookup);
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

function showModal({ message, confirmLabel = "OK", cancelLabel = null, dangerLabel = null, hasInput = false, inputPlaceholder = "", onConfirm, onCancel, onDanger }) {
  document.querySelector(".app-modal")?.remove();
  const modal = document.createElement("div");
  modal.className = "app-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", message.slice(0, 60));
  modal.innerHTML = `
    <div class="app-modal-card">
      <p class="app-modal-msg">${escapeHtml(message)}</p>
      ${hasInput ? `<input class="app-modal-input" type="text" placeholder="${escapeHtml(inputPlaceholder)}" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:14px;margin-bottom:12px;box-sizing:border-box">` : ""}
      <div class="app-modal-actions">
        ${cancelLabel ? `<button class="action app-modal-cancel">${escapeHtml(cancelLabel)}</button>` : ""}
        ${dangerLabel ? `<button class="action danger-outline app-modal-danger">${escapeHtml(dangerLabel)}</button>` : ""}
        <button class="action primary app-modal-confirm">${escapeHtml(confirmLabel)}</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  const prevFocus = document.activeElement;
  const inputEl = modal.querySelector(".app-modal-input");
  const focusable = () => [...modal.querySelectorAll("button:not([disabled]),input")];
  requestAnimationFrame(() => { (inputEl || focusable()[0])?.focus(); });
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
  const getInputVal = () => inputEl ? inputEl.value.trim() : undefined;
  modal.querySelector(".app-modal-confirm").addEventListener("click", () => { const v = getInputVal(); close(); onConfirm?.(v); });
  modal.querySelector(".app-modal-cancel")?.addEventListener("click", () => { close(); onCancel?.(); });
  modal.querySelector(".app-modal-danger")?.addEventListener("click", () => { close(); onDanger?.(); });
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
}

function showShortcutsPanel() {
  document.querySelector(".shortcuts-modal")?.remove();
  const el = document.createElement("div");
  el.className = "shortcuts-modal";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.setAttribute("aria-label", "キーボードショートカット一覧");
  const section = (title, rows) => `
    <div class="sc-section">
      <div class="sc-section-title">${title}</div>
      <table class="shortcuts-table">
        ${rows.map(([key, desc]) => `<tr><td>${key}</td><td>${desc}</td></tr>`).join("")}
      </table>
    </div>`;
  const kbd = (...keys) => keys.map(k => `<kbd>${k}</kbd>`).join("+");
  el.innerHTML = `<div class="shortcuts-card">
    <div class="shortcuts-hd">⌨ キーボードショートカット</div>
    <div class="sc-grid">
      ${section("🧭 ナビゲーション", [
        [kbd("d"),           "ダッシュボードへ移動"],
        [kbd("p"),           "商品管理（発売済み）へ移動"],
        [kbd("a"),           "アレルゲン管理表へ移動"],
        [kbd("n"),           "新規商品を追加"],
        [kbd("Esc"),         "戻る / モーダルを閉じる"],
        [kbd("?"),           "このパネルを表示"],
      ])}
      ${section("🔍 商品一覧", [
        [kbd("/"),                     "検索ボックスにフォーカス"],
        [kbd("t"),                     "テーブル / カード表示を切替（テーブルビュー時）"],
        [kbd("Ctrl","A"),              "テーブルで全件選択"],
        ["在庫セルをクリック",         "在庫数をインライン編集（Enter で保存）"],
        ["担当者チップをクリック",     "担当者で絞り込み"],
        ["アレルゲンチップをクリック", "アレルゲンで絞り込み"],
      ])}
      ${section("📋 商品詳細", [
        [kbd("1")+"〜"+kbd("8"),          "タブ切替（基本/原材料/ラベル/規格書/原価/AI・チェック/履歴/承認）"],
        [kbd("←")+" / "+kbd("→"),        "前の商品 / 次の商品（フィルター状態を維持）"],
        [kbd("Ctrl","S"),                 "商品を保存"],
      ])}
      ${section("📊 ダッシュボード", [
        ["KPIカードをクリック",       "該当条件の商品一覧に移動"],
        ["アレルゲンバーをクリック",  "そのアレルゲンで商品を絞り込み"],
        ["担当者バーをクリック",      "その担当者で商品を絞り込み"],
        ["表示チェックエラーをクリック", "エラーのある商品カルテを開く"],
      ])}
    </div>
    <button class="action primary shortcuts-close" style="margin-top:16px;width:100%">閉じる（Esc）</button>
  </div>`;
  document.body.appendChild(el);
  el.querySelector(".shortcuts-close").addEventListener("click", () => el.remove());
  el.addEventListener("click", e => { if (e.target === el) el.remove(); });
  el.addEventListener("keydown", e => { if (e.key === "Escape") el.remove(); });
  el.querySelector(".shortcuts-close").focus();
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
// ══ デモモード v2 ═════════════════════════════════════════════════════════
const DEMO_STEPS_MANAGE = [
  { step:1, title:"ダッシュボード",   sub:"今日の全商品状況がひと目でわかります",     view:"dashboard" },
  { step:2, title:"AI で商品登録",    sub:"写真1枚で登録完了 — 入力時間ゼロへ",       view:"product-detail", detailTab:"basic" },
  { step:3, title:"商品一覧",         sub:"検索・フィルターで目的の商品に即アクセス", view:"products" },
  { step:4, title:"商品カルテ",       sub:"これだけ見れば商品のすべてがわかります",   view:"product-detail", detailTab:"basic" },
  { step:5, title:"タイムライン",     sub:"誰が・いつ・何をしたか — 永久に残ります", view:"product-detail", detailTab:"timeline" },
  { step:6, title:"食品表示ラベル",   sub:"食品表示法準拠ラベルが自動で完成します",   view:"label-nav" },
  { step:7, title:"A4 商品規格書",    sub:"Excelで何時間もかかった規格書が即完成",    view:"spec-sheet-nav" },
];
const DEMO_STEPS_DEVELOP = [
  { step:1, title:"開発プロジェクト", sub:"開発スタート — ここから新商品の旅が始まります",     view:"dev-products" },
  { step:2, title:"試作レシピ入力",   sub:"原材料を入れるたびに原価・栄養成分がリアルタイム計算", view:"dev-detail", devTab:"recipe" },
  { step:3, title:"バージョン比較",   sub:"何が変わったか・どこが改善されたか一目でわかる",     view:"dev-detail", devTab:"recipe", compareMode:true },
  { step:4, title:"AI レビュー",      sub:"AIが食品表示法のミスを発売前に見つけます",           view:"ai-consult-nav" },
  { step:5, title:"採用決定",         sub:"ボタン1つで承認ルートが自動で回り始めます",          view:"dev-detail", devTab:"approval" },
  { step:6, title:"発売",             sub:"最も感動する瞬間 — 全部がつながります",              view:"dev-detail", devTab:"overview" },
  { step:7, title:"商品管理へ移行",   sub:"この商品の誕生から今日まで一本の線で見えます",       view:"product-detail", detailTab:"timeline", useReleased:true },
];
function currentDemoSteps() { return demoType === "develop" ? DEMO_STEPS_DEVELOP : DEMO_STEPS_MANAGE; }

// ── デモ用サンプル商品データ ─────────────────────────────────────────────
const _DEMO_MFR = {
  manufacturerName: "株式会社みらい食品",
  manufacturerAddress: "東京都渋谷区代々木1-2-3 みらいビル2F",
  manufacturerPostal: "151-0053",
  manufacturerPhone: "03-5678-1234",
  manufacturerType: ["製造者"],
};

const DEMO_PRODUCTS_MANAGE = [
  {
    _isDemo: true,
    name: "米粉プレーンドーナツ", internalName: "米粉プレーンドーナツ 250g",
    category: "菓子類", phase: "released",
    janCode: "4901000000001", netWeight: "250", netWeightUnit: "g",
    expiryType: "best-before",
    expiryDate: new Date(Date.now() + 90 * 864e5).toISOString().split("T")[0],
    storageMethod: "直射日光・高温多湿を避け、常温で保存してください。",
    publishStatus: "active", productStatus: "active", approvalStatus: "approved",
    ..._DEMO_MFR,
    ingredients: [
      { name: "米粉",               weight: 120 },
      { name: "砂糖",               weight: 60 },
      { name: "卵",                 weight: 50 },
      { name: "バター",             weight: 40 },
      { name: "アーモンドミルク",   weight: 25 },
      { name: "ベーキングパウダー", weight:  5, isAdditive: true },
      { name: "バニラエッセンス",   weight:  1, isAdditive: true },
    ],
    allergens: [], allergensMode: "auto",
    directCost: "145", price: "580", costMode: "direct",
    updatedAt: "2026-07-18 14:23", createdAt: "2026-05-01 10:00",
  },
  {
    _isDemo: true,
    name: "抹茶クリームドーナツ", internalName: "抹茶クリームドーナツ 2個入",
    category: "菓子類", phase: "released",
    janCode: "4901000000002", netWeight: "2", netWeightUnit: "個",
    expiryType: "best-before",
    expiryDate: new Date(Date.now() + 60 * 864e5).toISOString().split("T")[0],
    storageMethod: "要冷蔵（10℃以下）。開封後はお早めにお召し上がりください。",
    publishStatus: "active", productStatus: "active", approvalStatus: "approved",
    ..._DEMO_MFR,
    ingredients: [
      { name: "米粉",                 weight: 80 },
      { name: "クリームチーズ",       weight: 60 },
      { name: "砂糖",                 weight: 40 },
      { name: "有機抹茶パウダー",     weight:  8 },
      { name: "卵",                   weight: 30 },
      { name: "バター",               weight: 25 },
      { name: "生クリーム",           weight: 20 },
      { name: "ベーキングパウダー",   weight:  3, isAdditive: true },
    ],
    allergens: [], allergensMode: "auto",
    directCost: "95", price: "380", costMode: "direct",
    updatedAt: "2026-07-15 09:45", createdAt: "2026-05-10 11:00",
  },
  {
    _isDemo: true,
    name: "豆腐ベーグル プレーン", internalName: "豆腐ベーグル プレーン 80g",
    category: "パン類", phase: "released",
    janCode: "4901000000003", netWeight: "80", netWeightUnit: "g",
    expiryType: "best-before",
    expiryDate: new Date(Date.now() + 5 * 864e5).toISOString().split("T")[0],
    storageMethod: "常温で保存。開封後は当日中にお召し上がりください。",
    publishStatus: "active", productStatus: "active", approvalStatus: "approved",
    ..._DEMO_MFR,
    ingredients: [
      { name: "米粉",       weight: 100 },
      { name: "絹ごし豆腐", weight:  80 },
      { name: "砂糖",       weight:   8 },
      { name: "食塩",       weight:   3 },
      { name: "ドライイースト", weight: 2, isAdditive: true },
    ],
    allergens: [], allergensMode: "auto",
    directCost: "60", price: "250", costMode: "direct",
    updatedAt: "2026-07-17 16:30", createdAt: "2026-06-01 09:00",
  },
];

const DEMO_PRODUCTS_DEVELOP = [
  {
    _isDemo: true,
    name: "グルテンフリーパンケーキミックス", internalName: "グルテンフリーパンケーキミックス 200g",
    category: "菓子類", phase: "development",
    janCode: "4901000000010", netWeight: "200", netWeightUnit: "g",
    expiryType: "best-before",
    expiryDate: new Date(Date.now() + 365 * 864e5).toISOString().split("T")[0],
    storageMethod: "直射日光・高温多湿を避け、常温で保存してください。",
    publishStatus: "draft", productStatus: "review", approvalStatus: "review",
    ..._DEMO_MFR,
    ingredients: [],
    allergens: [], allergensMode: "auto",
    directCost: "134", price: "480", costMode: "direct",
    updatedAt: "2026-07-18 11:00", createdAt: "2026-06-15 10:00",
    devProject: {
      projectName: "グルテンフリーパンケーキ（2027春新商品）",
      projectNote: "米粉と豆乳パウダーを主原料としたグルテンフリーパンケーキミックス。アレルギー対応商品として既存ラインナップを補完する。ターゲット：グルテン不耐症・小麦アレルギーのある家族層。",
      projectManager: "田中 花子",
      priority: "high",
      devPhase: "最終調整",
      startDate: "2026-06-15",
      targetReleaseDate: "2026-09-01",
      targetPrice: "480",
      targetCostRate: "30",
    },
    adoptedRecipeVersionId: "demo-rv2",
    recipeVersions: [
      {
        id: "demo-rv1", version: "Ver.1", status: "draft",
        createdAt: "2026-06-20",
        note: "初回試作。コシが強すぎ、ふんわり感が弱かった。豆乳パウダーを加えることで改善できる可能性あり。",
        directCost: "154", costMode: "direct",
        ingredients: [
          { name: "米粉",               weight: 150 },
          { name: "砂糖",               weight:  30 },
          { name: "片栗粉",             weight:  10 },
          { name: "食塩",               weight:   2 },
          { name: "ベーキングパウダー", weight:   8, isAdditive: true },
        ],
      },
      {
        id: "demo-rv2", version: "Ver.2", status: "adopted",
        createdAt: "2026-07-05",
        note: "豆乳パウダーを追加、砂糖を減量。ふんわり感が改善。原価率を32%→28%に削減。試作評価A。採用決定。",
        directCost: "134", costMode: "direct",
        ingredients: [
          { name: "米粉",               weight: 140 },
          { name: "豆乳パウダー",       weight:  20 },
          { name: "砂糖",               weight:  20 },
          { name: "片栗粉",             weight:  10 },
          { name: "食塩",               weight:   2 },
          { name: "ベーキングパウダー", weight:   8, isAdditive: true },
        ],
      },
    ],
    trialBatches: [
      {
        id: "demo-tb1", date: "2026-06-25", label: "試作#1（Ver.1）", result: "C",
        note: "コシが強すぎ、ふんわり感なし。豆乳パウダー追加を検討。",
      },
      {
        id: "demo-tb2", date: "2026-07-08", label: "試作#2（Ver.2）", result: "A",
        note: "食感・味ともに良好。グルテンフリーらしい軽さが出た。採用推奨。",
      },
    ],
  },
  {
    _isDemo: true, _isDemoReleased: true,
    name: "グルテンフリーパンケーキミックス", internalName: "グルテンフリーパンケーキミックス 200g",
    category: "菓子類", phase: "released",
    janCode: "4901000000010", netWeight: "200", netWeightUnit: "g",
    expiryType: "best-before",
    expiryDate: new Date(Date.now() + 180 * 864e5).toISOString().split("T")[0],
    storageMethod: "直射日光・高温多湿を避け、常温で保存してください。",
    publishStatus: "active", productStatus: "active", approvalStatus: "approved",
    ..._DEMO_MFR,
    ingredients: [
      { name: "米粉",               weight: 140 },
      { name: "豆乳パウダー",       weight:  20 },
      { name: "砂糖",               weight:  20 },
      { name: "片栗粉",             weight:  10 },
      { name: "食塩",               weight:   2 },
      { name: "ベーキングパウダー", weight:   8, isAdditive: true },
    ],
    allergens: [], allergensMode: "auto",
    directCost: "134", price: "480", costMode: "direct",
    updatedAt: "2026-09-01 10:00", createdAt: "2026-09-01 10:00",
  },
];

// ── デモ v2 共通ユーティリティ ───────────────────────────────────────────
let _demoGen = 0; // アニメーションキャンセル用世代カウンタ
const demoSleep = ms => {
  const g = _demoGen;
  return new Promise((r, rej) => setTimeout(() => g === _demoGen ? r() : rej(Object.assign(new Error("demo:abort"), { isAbort: true })), ms));
};

async function demoCountUp(el, target, duration) {
  if (!el || isNaN(target) || target <= 0) return;
  const t0 = Date.now(), g = _demoGen;
  await new Promise((resolve, reject) => {
    const tick = () => {
      if (g !== _demoGen) { reject(Object.assign(new Error("demo:abort"), { isAbort: true })); return; }
      const p = Math.min((Date.now() - t0) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick); else resolve();
    };
    tick();
  });
}

async function demoTypeIn(el, text, speed) {
  if (!el) return;
  el.textContent = "";
  for (const ch of text) { el.textContent += ch; await demoSleep(speed); }
}

// ── バーチャルカーソル ───────────────────────────────────────────────────
let _vcEl = null, _vcX = window.innerWidth / 2, _vcY = window.innerHeight / 2;
function _getVcEl() {
  if (!_vcEl) {
    _vcEl = document.createElement("div");
    _vcEl.id = "demo-vc";
    _vcEl.innerHTML = `<svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <path d="M3 2 L3 20 L7.5 15.5 L11 23 L13.5 22 L10 14.5 L16.5 14.5 Z"
        fill="white" stroke="#1a1a1a" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`;
    document.body.appendChild(_vcEl);
  }
  return _vcEl;
}
function vcShow() { _getVcEl().style.display = "block"; }
function vcHide() { if (_vcEl) _vcEl.style.display = "none"; }
async function vcMove(x, y, ms = 500) {
  const el = _getVcEl(), sx = _vcX, sy = _vcY, t0 = Date.now(), g = _demoGen;
  el.style.display = "block";
  return new Promise((r, rej) => {
    const tick = () => {
      if (g !== _demoGen) { rej(Object.assign(new Error("demo:abort"), { isAbort: true })); return; }
      const p = Math.min((Date.now() - t0) / ms, 1);
      const e = p < .5 ? 4*p*p*p : 1 - Math.pow(-2*p + 2, 3) / 2;
      el.style.left = (_vcX = sx + (x - sx) * e) + "px";
      el.style.top  = (_vcY = sy + (y - sy) * e) + "px";
      p < 1 ? requestAnimationFrame(tick) : r();
    };
    requestAnimationFrame(tick);
  });
}
async function vcMoveToEl(el, offX = 0, offY = 0, ms = 480) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  await vcMove(r.left + r.width / 2 + offX, r.top + r.height / 2 + offY, ms);
}
async function vcClick(el, ms = 420) {
  if (!el) return;
  await vcMoveToEl(el, 0, 0, ms);
  const vc = _getVcEl();
  vc.classList.add("vc-click");
  await demoSleep(300);
  vc.classList.remove("vc-click");
}
async function vcTypeSearch(text) {
  const selectors = ["#master-search", "[name='master-search']",
    "input[placeholder*='検索']", "input[type='search']"];
  let searchEl = null;
  for (const s of selectors) { searchEl = document.querySelector(s); if (searchEl) break; }
  if (searchEl) await vcMoveToEl(searchEl, 0, 0, 400);
  masterSearch = "";
  render();
  for (const ch of text) {
    if (!demoMode) break;
    masterSearch += ch;
    render();
    await demoSleep(85 + Math.random() * 40);
  }
}
async function vcSmoothScroll(el, toY, ms = 1200) {
  if (!el) return;
  const from = el.scrollTop, dist = toY - from, t0 = Date.now(), g = _demoGen;
  return new Promise((r, rej) => {
    const tick = () => {
      if (g !== _demoGen) { rej(Object.assign(new Error("demo:abort"), { isAbort: true })); return; }
      const p = Math.min((Date.now() - t0) / ms, 1);
      el.scrollTop = from + dist * (p < .5 ? 4*p*p*p : 1 - Math.pow(-2*p + 2, 3) / 2);
      p < 1 ? requestAnimationFrame(tick) : r();
    };
    tick();
  });
}

// ── デモ用スクロール（overflow:hidden でも動く） ─────────────────────────
function demoScrollTo(el, block = "center") {
  if (!el) return;
  const main = document.querySelector(".saas-main,.saas-content");
  if (!main) return;
  const mainRect = main.getBoundingClientRect();
  const elRect   = el.getBoundingClientRect();
  const relTop   = elRect.top - mainRect.top + main.scrollTop;
  let target;
  if (block === "center") target = relTop - main.clientHeight / 2 + el.offsetHeight / 2;
  else if (block === "start") target = relTop - 20;
  else target = relTop - main.clientHeight + el.offsetHeight + 20;
  main.scrollTop = Math.max(0, target);
}

// ── コールアウトバブル ───────────────────────────────────────────────────
let _coEl = null;
function _getCoEl() {
  if (!_coEl) {
    _coEl = document.createElement("div");
    _coEl.id = "demo-callout";
    document.body.appendChild(_coEl);
  }
  return _coEl;
}
// コールアウト速度倍率（1.0=標準、大きいほど遅い）
const CALLOUT_SPEED = 1.5;
async function showCalloutAt(text, x, y, side = "right") {
  const co = _getCoEl();
  co.textContent = text;
  co.className = "demo-callout";
  co.style.left = ""; co.style.top = "";
  co.style.opacity = "0"; co.style.display = "block";
  await demoSleep(16);
  co.style.opacity = "1";
}
async function showCalloutOnEl(text, el, side = "right") {
  await showCalloutAt(text, 0, 0, side);
}
// コールアウトを表示して待機（CALLOUT_SPEED倍率を適用）
async function showCalloutWait(ms) { await demoSleep(Math.round(ms * CALLOUT_SPEED)); }
function hideCallout() { const co = _getCoEl(); co.style.opacity = "0"; }

// ── ナレーションパネル ───────────────────────────────────────────────────
let _narrEl = null;
function showNarr(items, ai = -1) {
  if (!_narrEl) {
    _narrEl = document.createElement("div");
    _narrEl.id = "demo-narr";
    document.body.appendChild(_narrEl);
  }
  _narrEl.innerHTML = items.map((t, i) => {
    const done = i < ai, active = i === ai;
    return `<div class="demo-narr-item${done ? " dn-done" : active ? " dn-active" : ""}">
      <span class="demo-narr-num">${done ? "✓" : i + 1}</span>
      <span class="demo-narr-txt">${escapeHtml(t)}</span>
    </div>`;
  }).join("");
  _narrEl.style.display = "block";
}
function updateNarr(ai) {
  if (!_narrEl) return;
  _narrEl.querySelectorAll(".demo-narr-item").forEach((el, i) => {
    el.className = "demo-narr-item" + (i < ai ? " dn-done" : i === ai ? " dn-active" : "");
    const n = el.querySelector(".demo-narr-num");
    if (n) n.textContent = i < ai ? "✓" : String(i + 1);
  });
}
function hideNarr() { if (_narrEl) _narrEl.style.display = "none"; }

// ── ハイライトリング ─────────────────────────────────────────────────────
let _hlEl = null;
function showHl(el) {
  if (!_hlEl) {
    _hlEl = document.createElement("div"); _hlEl.id = "demo-hl";
    document.body.appendChild(_hlEl);
  }
  if (!el) { _hlEl.style.display = "none"; return; }
  const r = el.getBoundingClientRect(), pad = 6;
  Object.assign(_hlEl.style, {
    display: "block",
    left: (r.left - pad) + "px", top: (r.top - pad) + "px",
    width: (r.width + pad * 2) + "px", height: (r.height + pad * 2) + "px",
  });
}
function hideHl() { if (_hlEl) _hlEl.style.display = "none"; }

// ── デモバナー ────────────────────────────────────────────────────────
let _bnEl = null;
function _getBnEl() {
  if (!_bnEl) { _bnEl = document.createElement("div"); _bnEl.id = "demo-banner"; document.body.appendChild(_bnEl); }
  return _bnEl;
}
function showBanner(tag, title, desc = "") {
  const el = _getBnEl();
  el.innerHTML = `<span class="demo-bn-tag">${escapeHtml(tag)}</span><span class="demo-bn-title">${escapeHtml(title)}</span>${desc ? `<span class="demo-bn-desc">${escapeHtml(desc)}</span>` : ""}`;
  el.classList.add("bn-on");
  document.body.classList.toggle("fp-dd", demoType === "develop");
}
function hideBanner() { if (_bnEl) _bnEl.classList.remove("bn-on"); document.body.classList.remove("fp-dd"); }

// ── 発売カスケード ────────────────────────────────────────────────────
async function showCascade(msgs) {
  let cas = document.getElementById("demo-cascade");
  if (!cas) { cas = document.createElement("div"); cas.id = "demo-cascade"; document.body.appendChild(cas); }
  cas.innerHTML = msgs.map(m => `<div class="demo-cas-item">${escapeHtml(m)}</div>`).join("");
  cas.classList.add("cas-on");
  const items = cas.querySelectorAll(".demo-cas-item");
  for (const it of items) { await demoSleep(500); it.classList.add("cas-show"); }
  await demoSleep(1400);
  cas.classList.remove("cas-on"); cas.innerHTML = "";
}

function _demoCleanup() {
  vcHide(); hideCallout(); hideHl(); hideNarr(); hideBanner();
  document.getElementById("dp-ai-overlay")?.remove();
  document.getElementById("dp-recipe-overlay")?.remove();
  document.getElementById("dp-ai-review-overlay")?.remove();
  document.getElementById("dp-appr-overlay")?.remove();
  document.getElementById("dp-rel-overlay")?.remove();
  const cas = document.getElementById("demo-cascade"); if (cas) { cas.classList.remove("cas-on"); cas.innerHTML = ""; }
}

function demoPresAnimateStep() {
  if (!demoMode || demoEndScreen) return;
  _demoGen++; // 旧アニメーションの demoSleep を全てアボート
  _demoCleanup();
  const animFn = demoType === "develop" ? _getDemoDevAnim(demoStep) : _getDemoManageAnim(demoStep);
  if (!animFn) return;
  animFn().catch(() => {}).finally(() => {
    _demoCleanup();
    if (demoMode && !demoEndScreen) {
      const nb = document.querySelector('[data-action="demo-next"]');
      if (nb) nb.classList.add("dp-nav-btn--pulse");
    }
  });
}

function _getDemoManageAnim(step) {
  switch (step) {
    case 1: return _demoAnim_Dashboard;
    case 2: return _demoAnim_AIReg;
    case 3: return _demoAnim_Products;
    case 4: return _demoAnim_Karte;
    case 5: return _demoAnim_Timeline;
    case 6: return _demoAnim_Label;
    case 7: return _demoAnim_SpecSheet;
    default: return null;
  }
}
function _getDemoDevAnim(step) {
  switch (step) {
    case 1: return _demoAnim_DevList;
    case 2: return _demoAnim_RecipeInput;
    case 3: return _demoAnim_VersionDiff;
    case 4: return _demoAnim_AIReview;
    case 5: return _demoAnim_ApprovalFlow;
    case 6: return _demoAnim_ReleaseAnim;
    case 7: return _demoAnim_DevTimeline;
    default: return null;
  }
}

// ─── 管理デモ アニメーション v3 ─────────────────────────────────────────

async function _demoAnim_Dashboard() {
  showBanner("STEP 1 / 7", "📊 ダッシュボード", "管理者が毎朝開く画面 — 全商品の今を一瞬で把握できます");
  await demoSleep(700);
  const root = document.getElementById("root");
  if (!root) return;
  const narr = ["全商品のKPIをひと目で確認", "要対応アラートを確認", "今日の業務を把握 ✓"];
  showNarr(narr, 0);
  vcShow();

  await showCalloutAt("これがFoodPilotのダッシュボードです。管理している商品の「今」がすべて見えています", window.innerWidth / 2, window.innerHeight * 0.35, "bottom");
  await showCalloutWait(2200);
  hideCallout();

  const kpiCandidates = Array.from(root.querySelectorAll(
    "[class*='kpi-card'],[class*='stat-card'],[class*='kpi-item'],[class*='db-kpi'],[class*='kpi-num'],[class*='summary-card']"
  )).filter(Boolean).slice(0, 4);
  const kpiDescs = [
    "発売中の商品数 — 何をいくつ売っているか、ひと目でわかります",
    "今月の開発プロジェクト — 進行中の新商品開発を見逃しません",
    "承認待ち・期限切れ — 優先で対応すべき案件が自動で浮かびます",
    "商品情報の完成度 — 未入力項目を自動チェックして通知します",
  ];
  for (let i = 0; i < Math.min(kpiCandidates.length, 3); i++) {
    if (!demoMode) break;
    const card = kpiCandidates[i];
    showHl(card);
    await vcMoveToEl(card, 0, 0, 420);
    const numEl = card.querySelector("[class*='num'],[class*='val'],[class*='count'],[class*='kpi-v'],[class*='stat-v']");
    const n = parseInt(numEl?.textContent?.replace(/[^0-9]/g, "") || "0");
    if (numEl && n > 0 && n < 500) await demoCountUp(numEl, n, 700);
    await showCalloutOnEl(kpiDescs[i], card, i < 2 ? "right" : "left");
    await showCalloutWait(2200);
    hideCallout(); hideHl();
    await demoSleep(180);
  }
  updateNarr(1);
  const taskEl = root.querySelector(
    "[class*='db2-alert'],[class*='task-list'],[class*='today-task'],[class*='alert-list'],[class*='urgent']"
  );
  if (taskEl) {
    showHl(taskEl);
    await vcMoveToEl(taskEl, 0, -20, 500);
    await showCalloutOnEl("賞味期限切れ・承認待ちなど — 対応が必要な案件を自動でアラート表示します", taskEl, "right");
    await showCalloutWait(2200);
    hideCallout(); hideHl();
  }

  updateNarr(2);
  await showCalloutAt("朝にこの画面を開くだけ — 今日何をすべきかが全部わかります", window.innerWidth / 2, window.innerHeight * 0.5, "top");
  await showCalloutWait(2000);
  hideCallout();
  hideNarr();
}

async function _demoAnim_AIReg() {
  showBanner("STEP 2 / 7", "📷 AI 商品登録", "パッケージ写真1枚から — AIが商品情報をすべて読み取ります");
  await demoSleep(500);
  const narr = ["① 写真を撮影・選択", "② AIが画像を解析中...", "③ 商品名を読み取り完了", "④ 原材料・製造者を自動抽出", "⑤ 商品カルテ完成 🎉"];
  showNarr(narr, 0);

  document.getElementById("dp-ai-overlay")?.remove();
  const overlay = document.createElement("div");
  overlay.id = "dp-ai-overlay"; overlay.className = "dp-ai-overlay";
  overlay.innerHTML = `
    <div class="dp-ai-card">
      <div class="dp-ai-title">📷 AI 商品解析 — 米粉プレーンドーナツ</div>
      <div class="dp-ai-phases">
        <div class="dp-ai-ph" id="dp-ai-ph0"><span class="dp-ai-ph-icon">📸</span><span>パッケージ写真を読み込んでいます...</span></div>
        <div class="dp-ai-ph" id="dp-ai-ph1"><span class="dp-ai-ph-icon dp-spin">🔍</span><span>AI が画像を解析中... バーコード・文字を認識</span></div>
        <div class="dp-ai-ph" id="dp-ai-ph2"><span class="dp-ai-ph-icon">✨</span><span>商品情報を抽出しています</span></div>
      </div>
      <div class="dp-ai-sep"></div>
      <div class="dp-ai-fields">
        <div class="dp-ai-frow" id="dp-ai-r0"><span class="dp-ai-fl">① 商品名</span><span class="dp-ai-fv" id="dp-ai-v0"></span></div>
        <div class="dp-ai-frow" id="dp-ai-r1"><span class="dp-ai-fl">② 原材料</span><span class="dp-ai-fv" id="dp-ai-v1"></span></div>
        <div class="dp-ai-frow" id="dp-ai-r2"><span class="dp-ai-fl">③ 製造者</span><span class="dp-ai-fv" id="dp-ai-v2"></span></div>
        <div class="dp-ai-frow" id="dp-ai-r3"><span class="dp-ai-fl">④ 栄養成分</span><span class="dp-ai-fv" id="dp-ai-v3"></span></div>
        <div class="dp-ai-frow" id="dp-ai-r4"><span class="dp-ai-fl">⑤ アレルゲン</span><span class="dp-ai-fv" id="dp-ai-v4"></span></div>
      </div>
      <div class="dp-ai-success" id="dp-ai-suc">✅ 商品カルテを自動作成しました — 入力時間: 約0秒</div>
    </div>`;
  document.body.appendChild(overlay);
  await demoSleep(150); overlay.classList.add("visible");

  document.getElementById("dp-ai-ph0")?.classList.add("visible"); updateNarr(0); await demoSleep(900);
  document.getElementById("dp-ai-ph1")?.classList.add("visible"); updateNarr(1); await demoSleep(1100);
  document.getElementById("dp-ai-ph2")?.classList.add("visible"); updateNarr(2); await demoSleep(600);

  const data = [
    [0, "米粉プレーンドーナツ", 22, 2],
    [1, "米粉、砂糖、卵、バター、アーモンドミルク／ベーキングパウダー、バニラエッセンス", 11, 3],
    [2, "株式会社みらい食品（東京都渋谷区代々木1-2-3）", 15, 3],
    [3, "エネルギー 180kcal · たんぱく質 3.2g · 脂質 8.1g · 炭水化物 23.4g", 11, 4],
    [4, "卵・乳成分を含む（アレルゲン自動判定）", 16, 4],
  ];
  for (const [i, text, speed, ni] of data) {
    if (!demoMode) break;
    document.getElementById(`dp-ai-r${i}`)?.classList.add("visible");
    const v = document.getElementById(`dp-ai-v${i}`);
    if (v) await demoTypeIn(v, text, speed);
    updateNarr(ni);
    await demoSleep(120);
  }
  document.getElementById("dp-ai-suc")?.classList.add("visible");
  updateNarr(5);
  await demoSleep(2000);
  overlay.style.transition = "opacity .5s"; overlay.style.opacity = "0";
  await demoSleep(500); overlay.remove();

  await demoSleep(300);
  vcShow();
  const root = document.getElementById("root");
  if (!root) return;
  const scrollEl = root.querySelector(".saas-main,[class*='pd-body'],[class*='detail-body']") || root;
  await vcSmoothScroll(scrollEl, (scrollEl.scrollHeight - scrollEl.clientHeight) * 0.6, 2600);
  await showCalloutAt("写真1枚で — ここまですべて自動入力されました", window.innerWidth / 2, window.innerHeight * 0.5, "top");
  await showCalloutWait(1800);
  hideCallout();
  await showCalloutAt("従来：担当者が手入力で 30〜60分。商品が100品あれば — 延べ50時間以上", window.innerWidth / 2, window.innerHeight * 0.45, "top");
  await showCalloutWait(2200);
  hideCallout();
  await demoSleep(200);
  await showCalloutAt("FoodPilot：写真1枚 → 約0秒 ✓", window.innerWidth / 2, window.innerHeight * 0.45, "top");
  await showCalloutWait(2200);
  hideCallout(); hideNarr();
}

async function _demoAnim_Products() {
  showBanner("STEP 3 / 7", "📋 商品一覧", "全商品を一覧管理 — 検索・フィルターで目的の商品に即アクセス");
  await demoSleep(600);
  const root = document.getElementById("root");
  if (!root) return;
  const narr = ["キーワード検索で絞り込み", "カテゴリ・状態でフィルター", "商品カルテを開く"];
  showNarr(narr, 0);
  vcShow();

  masterSearch = ""; masterCategoryFilter = ""; render();
  await demoSleep(300);

  // 検索バーを見つけてクリック演出
  const searchSels = ["#master-search","[name='master-search']","input[placeholder*='検索']","input[type='search']"];
  let searchEl = null;
  for (const s of searchSels) { searchEl = document.querySelector(s); if (searchEl) break; }
  if (searchEl) {
    showHl(searchEl);
    await vcMoveToEl(searchEl, 0, 0, 450);
    await showCalloutOnEl("商品名・原材料・JANコードで検索できます", searchEl, "bottom");
    await showCalloutWait(1200);
    hideCallout(); hideHl();
  }
  await vcTypeSearch("ドーナツ");
  await demoSleep(300);
  const resultCount = root.querySelectorAll("[class*='master-card'],[class*='product-card'],[class*='card-item']").length;
  await showCalloutAt(`「ドーナツ」で ${resultCount} 件に絞り込み — 入力するたびにリアルタイムで更新されます`, _vcX, _vcY - 40, "top");
  await showCalloutWait(2000);
  hideCallout();
  updateNarr(1);

  // 検索クリア → フィルター演出
  masterSearch = ""; render();
  await demoSleep(400);
  const filterEl = root.querySelector("[class*='filter'],[class*='category-filter'],[data-action*='filter'],[class*='status-filter']");
  if (filterEl) {
    showHl(filterEl);
    await vcMoveToEl(filterEl, 0, 0, 480);
    await showCalloutOnEl("カテゴリ・販売状況・担当者でもフィルタリングできます", filterEl, "bottom");
    await showCalloutWait(2000);
    hideCallout(); hideHl();
  }
  updateNarr(2);

  // 商品カードへ
  await demoSleep(300);
  const card = root.querySelector("[class*='master-card'],[class*='product-card'],[class*='card-item']");
  if (card) {
    showHl(card);
    await vcMoveToEl(card, 0, 0, 450);
    await showCalloutOnEl("クリックすると商品カルテが開きます — 次で詳しく見てみましょう", card, "right");
    await showCalloutWait(1800);
    hideCallout(); hideHl();
  }
  await demoSleep(300);
  await showCalloutAt("商品が100品・1000品になっても — 探す時間は1秒以下です", window.innerWidth / 2, window.innerHeight * 0.5, "top");
  await showCalloutWait(2000);
  hideCallout();
  masterSearch = "";
  hideNarr();
}

async function _demoAnim_Karte() {
  showBanner("STEP 4 / 7", "🗂️ 商品カルテ", "FoodPilot の核心 — 1商品のすべての情報がここに集まっています");
  await demoSleep(700);
  const root = document.getElementById("root");
  if (!root) return;
  const tabDefs = [
    { key: "basic",       label: "基本情報",    desc: "商品名・内容量・JANコード・製造者など — 基本情報をひとつに集約" },
    { key: "ingredients", label: "原材料",      desc: "原材料を入力するだけで — アレルゲンが自動で判定・表示されます" },
    { key: "label",       label: "ラベル",      desc: "食品表示法準拠のラベルがリアルタイムでプレビューされています" },
    { key: "spec",        label: "規格書",      desc: "A4規格書もこのタブから — 取引先に配布できる形式で即出力" },
    { key: "history",     label: "変更履歴",    desc: "誰が・いつ・何を変えたか — すべての変更が自動で記録されています" },
  ];
  showNarr(tabDefs.map(t => t.label), 0);
  vcShow();

  await showCalloutAt("これが「商品カルテ」です。1商品のすべての情報がここに集まっています", window.innerWidth / 2, window.innerHeight * 0.35, "bottom");
  await showCalloutWait(2000);
  hideCallout();

  for (let i = 0; i < tabDefs.length; i++) {
    if (!demoMode) break;
    const t = tabDefs[i];
    updateNarr(i);
    productDetailTab = t.key;
    render();
    await demoSleep(200);
    const tabBtn = root.querySelector(`[data-detail-tab="${t.key}"]`)
      || root.querySelector(`.detail-tab:nth-child(${i + 1})`);
    if (tabBtn) {
      showHl(tabBtn);
      await vcClick(tabBtn, 360);
    }
    const content = root.querySelector(
      ".detail-basic-layout,.karte-section,.karte-grid,.karte-body,.karte-content,[class*='detail-tab-body']"
    ) || root.querySelector(".saas-content,.saas-main,main");
    const sMain = document.querySelector(".saas-main");
    if (content) {
      await demoSleep(200);
      demoScrollTo(content, "start");
      await demoSleep(150);
      showHl(content);
      await vcMoveToEl(content, 0, -20, 350);
      if (i >= 1 && sMain) await vcSmoothScroll(sMain, Math.min(sMain.scrollTop + 320, sMain.scrollHeight - sMain.clientHeight), 900);
    }
    if (tabBtn) await showCalloutOnEl(t.desc, tabBtn, "bottom");
    else await showCalloutAt(t.desc, window.innerWidth / 2, window.innerHeight / 2, "top");
    await showCalloutWait(2800);
    hideCallout(); hideHl();
    await demoSleep(200);
  }
  updateNarr(tabDefs.length);
  await showCalloutAt("この画面ひとつで — 担当者が変わっても・何年後でも・この商品のすべてがわかります", window.innerWidth / 2, window.innerHeight * 0.5, "top");
  await showCalloutWait(1800);
  hideCallout();
  await demoSleep(300);
  await showCalloutAt("FoodPilot 最大の強み — 商品カルテです", window.innerWidth / 2, window.innerHeight * 0.5, "top");
  await showCalloutWait(1800);
  hideCallout();
  hideNarr();
}

async function _demoAnim_Timeline() {
  showBanner("STEP 5 / 7", "📅 タイムライン", "この商品の「歴史」がすべて自動記録 — 誰が・いつ・何をしたか永久に残ります");
  await demoSleep(700);
  const root = document.getElementById("root");
  if (!root) return;
  const narr = ["最新の変更を確認", "ラベル・規格書の更新履歴", "商品の誕生まで遡る"];
  showNarr(narr, 0);
  vcShow();

  const scrollEl = root.querySelector(".saas-main") || root;
  const entries = Array.from(root.querySelectorAll(".tl2-row,[class*='tl-item'],[class*='karte-tl-row']"));

  // エントリーごとのコールアウト（最新→最古の順）
  const entryCallouts = [
    "最新の更新 — 食品表示ラベルが改訂されました。誰が・いつ変えたか、すべて記録されています",
    "アレルゲン表示を修正 — 修正前の内容もいつでも確認できます。「戻せない」は過去の話です",
    "A4規格書を取引先へ配布 — 送付日時・担当者まで自動記録。「送りましたよね？」が証明できます",
    "品質チェック完了 — 「確認した」という事実が証拠として永久に残ります",
    "🌱 ラベル初版 — ここからこの商品の歴史が始まりました",
    "📝 初回登録 — AIが写真から自動入力した、最初の記録です",
  ];

  if (entries.length) {
    for (let i = 0; i < Math.min(entries.length, 6); i++) {
      if (!demoMode) break;
      demoScrollTo(entries[i], "center");
      await demoSleep(300);
      showHl(entries[i]);
      await vcMoveToEl(entries[i], 0, 0, 350);
      const calloutText = entryCallouts[i];
      if (calloutText) {
        await showCalloutOnEl(calloutText, entries[i], "left");
        if (i === 1) updateNarr(1);
        if (i === 4) updateNarr(2);
        const waitMs = (i >= 4) ? 2400 : 1700;
        await showCalloutWait(waitMs);
        hideCallout();
      } else {
        await demoSleep(500);
      }
      hideHl(); await demoSleep(150);
    }
  } else {
    await vcSmoothScroll(scrollEl, (scrollEl.scrollHeight - scrollEl.clientHeight) * 0.8, 3500);
    updateNarr(2);
  }
  await showCalloutAt("「あのとき誰が変えたの？」が一瞬でわかります — 担当者が変わっても安心です", window.innerWidth / 2, window.innerHeight * 0.5, "top");
  await showCalloutWait(1800);
  hideCallout();
  await demoSleep(300);
  await showCalloutAt("これが商品の「人生記録」です — 登録から今日まで、何もなくなりません", window.innerWidth / 2, window.innerHeight * 0.5, "top");
  await showCalloutWait(2000);
  hideCallout();
  hideNarr();
}

async function _demoAnim_Label() {
  showBanner("STEP 6 / 7", "🏷️ 食品表示ラベル", "食品表示法に準拠したラベルが — いつでも・何枚でも即座に生成");
  await demoSleep(700);
  const narr = ["ラベルをリアルタイム生成", "アレルゲン自動表示を確認", "PDF書き出しで完成 ✓"];
  showNarr(narr, 0);
  vcShow();

  const root = document.getElementById("root");
  // 一括生成ボタンをクリック
  const genBtn = document.querySelector(
    "[data-action*='gen'],[data-action*='label-gen'],[class*='gen-btn'],[class*='label-btn'],[class*='label-generate']"
  );
  if (genBtn) {
    showHl(genBtn);
    await vcMoveToEl(genBtn, 0, 0, 450);
    await showCalloutOnEl("このボタンで食品表示ラベルを自動生成", genBtn, "top");
    await showCalloutWait(1200);
    hideCallout(); hideHl();
    await vcClick(genBtn, 400);
    await demoSleep(300);
  }

  // ラベルプレビューをアニメーション（完成したラベルをそのまま見せる）
  const labelEl = document.querySelector(".label-paper,[class*='label-preview'],[class*='label-paper']");
  if (labelEl) {
    demoScrollTo(labelEl, "center");
    await demoSleep(400);
    showHl(labelEl);
    await vcMoveToEl(labelEl, 0, -20, 500);
    await showCalloutOnEl("食品表示法に準拠したラベルが自動で完成しました — 手入力ゼロです", labelEl, "right");
    await showCalloutWait(2000);
    hideCallout(); hideHl();

    // 各行をひとつずつ紹介
    const rows = Array.from(labelEl.querySelectorAll("tr"));
    const rowDescs = [
      "商品名・名称 — 商品カルテから自動で引用されます",
      "原材料名 — 重量順に並び替え済み。アレルゲンは自動判定",
      "内容量・賞味期限 — 登録情報がすべて自動反映されています",
    ];
    for (let i = 0; i < Math.min(rows.length, 3); i++) {
      if (!demoMode) break;
      demoScrollTo(rows[i], "center");
      await demoSleep(250);
      showHl(rows[i]);
      await vcMoveToEl(rows[i], 0, 0, 350);
      await showCalloutOnEl(rowDescs[i], rows[i], "right");
      if (i === 1) updateNarr(1);
      await showCalloutWait(1800);
      hideCallout(); hideHl();
      await demoSleep(150);
    }
  } else {
    await showCalloutAt("食品表示法に準拠したラベルがリアルタイムで生成されています", window.innerWidth / 2, window.innerHeight * 0.5, "top");
    await showCalloutWait(2000);
    hideCallout();
    updateNarr(1);
  }
  await demoSleep(300);

  // アレルゲン行をハイライト
  const allergenEl = document.querySelector(
    "[class*='allergen'],[class*='label-allergen'],[class*='label-al'],.label-paper tr:nth-child(3),.label-paper tr:nth-child(4)"
  );
  if (allergenEl) {
    demoScrollTo(allergenEl, "center");
    await demoSleep(300);
    showHl(allergenEl);
    await vcMoveToEl(allergenEl, 0, 0, 420);
    await showCalloutOnEl("アレルゲンは自動で太字・強調表示 — 表示漏れによる回収リスクがゼロになります", allergenEl, "right");
    await showCalloutWait(2200);
    hideCallout(); hideHl();
  }
  updateNarr(2);

  const printBtn = document.querySelector(
    "[data-action*='print'],[data-action*='pdf'],[class*='print-btn'],[class*='pdf-btn']"
  );
  if (printBtn) {
    showHl(printBtn);
    await vcMoveToEl(printBtn, 0, 0, 450);
    await showCalloutOnEl("PDF書き出し — そのまま印刷・メール添付・取引先共有ができます", printBtn, "top");
    await showCalloutWait(2000);
    hideCallout(); hideHl();
  }
  await showCalloutAt("食品表示法に準拠したラベルが — 何枚でも・何度でも・即座に完成します", window.innerWidth / 2, window.innerHeight * 0.5, "top");
  await showCalloutWait(2200);
  hideCallout();
  hideNarr();
}

async function _demoAnim_SpecSheet() {
  showBanner("STEP 7 / 7", "📄 A4 商品規格書", "Excelで何時間もかかっていた規格書が — ワンクリックで自動完成");
  await demoSleep(500);
  const root = document.getElementById("root");
  if (!root) return;
  const narr = ["規格書を自動生成", "各セクションを確認", "最下部まで確認 ✓"];
  showNarr(narr, 0);
  vcShow();

  await showCalloutAt("A4商品規格書 — 取引先から毎回求められる書類です。Excelで作ると担当者の半日が消えます", window.innerWidth / 2, window.innerHeight * 0.4, "bottom");
  await showCalloutWait(2400);
  hideCallout();

  // 生成ボタンがあればクリック
  const genBtn = root.querySelector(
    "[data-action*='spec'],[data-action*='generate'],[class*='spec-gen'],[class*='spec-btn']"
  );
  if (genBtn) {
    showHl(genBtn);
    await vcMoveToEl(genBtn, 0, 0, 450);
    await showCalloutOnEl("このボタンを1回押すだけです", genBtn, "top");
    await showCalloutWait(1400);
    hideCallout(); hideHl();
    await vcClick(genBtn, 400);
    await demoSleep(400);
  }

  const scrollEl = root.querySelector(".saas-main,[class*='spec-v2'],[class*='spec-sheet'],[class*='spec-wrap']") || root;
  const specArea = root.querySelector(".spec-v2,#spec-print-area,[class*='spec-v2']") || scrollEl;
  showHl(specArea);
  await vcMoveToEl(specArea, 0, -40, 450);
  await showCalloutAt("A4規格書が完成しました — すべての情報が自動で入力されています", _vcX, _vcY - 30, "right");
  await showCalloutWait(2000);
  hideCallout(); hideHl();

  updateNarr(1);
  // spec-v2-section-label（セクションヘッダー）と直後のテーブルを順にハイライト
  const sectionMsgs = [
    "商品の基本情報 — 商品カルテから自動引用されています",
    "原材料・保存方法・アレルゲンも自動記入 — 手入力不要です",
    "栄養成分表 — 計算式に基づき自動算出されています",
  ];
  const sectionLabels = Array.from(root.querySelectorAll(
    ".spec-v2-section-label,[class*='spec-section-label'],[class*='spec-v2-section']"
  ));
  const specTables = Array.from(root.querySelectorAll(
    ".spec-v2-table,[class*='spec-v2-table'],table"
  ));
  const targets = sectionLabels.length > 0 ? sectionLabels : specTables;
  for (let i = 0; i < Math.min(targets.length, 3); i++) {
    if (!demoMode) break;
    const el = targets[i];
    demoScrollTo(el, "center");
    await demoSleep(500);
    showHl(el);
    await vcMoveToEl(el, 0, 0, 380);
    await showCalloutOnEl(sectionMsgs[i] || "各セクションが自動で入力されています", el, "left");
    await showCalloutWait(2000);
    hideCallout(); hideHl();
    await demoSleep(200);
  }

  updateNarr(2);
  // 規格書全体をゆっくりスクロール — 量の多さを見せる
  await vcSmoothScroll(scrollEl, scrollEl.scrollHeight - scrollEl.clientHeight, 4000);
  await demoSleep(600);
  await showCalloutAt("これだけの情報が — ボタン1つで完成しました", window.innerWidth / 2, window.innerHeight * 0.4, "bottom");
  await showCalloutWait(1600);
  hideCallout();
  await demoSleep(200);
  await showCalloutAt("もしExcelで作っていたら — 担当者の丸1日が消えます", window.innerWidth / 2, window.innerHeight * 0.4, "bottom");
  await showCalloutWait(1800);
  hideCallout();
  await demoSleep(200);
  await showCalloutAt("FoodPilot なら — ワンクリック・数秒で完成します ✓", window.innerWidth / 2, window.innerHeight * 0.4, "bottom");
  await showCalloutWait(2200);
  hideCallout();
  hideNarr();
}

// ─── 開発デモ アニメーション v3 ─────────────────────────────────────────

async function _demoAnim_DevList() {
  showBanner("STEP 1 / 7", "🧪 商品開発プロジェクト", "開発中の新商品を一元管理 — ここから新商品の旅が始まります");
  await demoSleep(700);
  const root = document.getElementById("root");
  if (!root) return;
  const narr = ["開発プロジェクト一覧を確認", "進行中の商品を確認", "対象商品を開く"];
  showNarr(narr, 0);
  vcShow();

  await showCalloutAt("これが商品開発の管理画面です。試作から発売まで — すべてここで一元管理します", window.innerWidth / 2, window.innerHeight * 0.35, "bottom");
  await showCalloutWait(2200);
  hideCallout();

  const listEl = root.querySelector(
    "[class*='dev-list'],[class*='dev-projects'],[class*='master-list'],[class*='project-list']"
  );
  if (listEl) {
    showHl(listEl);
    await vcMoveToEl(listEl, 0, -20, 450);
    await showCalloutOnEl("開発中・審査中・承認待ち — 全プロジェクトのステータスがひと目でわかります", listEl, "right");
    await showCalloutWait(2000);
    hideCallout(); hideHl();
  }
  updateNarr(1);

  const card = root.querySelector(
    "[class*='dev-card'],[class*='project-card'],[class*='dev-row'],[class*='master-card']"
  );
  if (card) {
    await demoSleep(300);
    showHl(card);
    await vcMoveToEl(card, 0, 0, 450);
    await showCalloutOnEl("「グルテンフリーパンケーキ」— 2027年春の新商品。試作Ver.1の評価がCだったところから始まります", card, "right");
    updateNarr(2);
    await showCalloutWait(2200);
    hideCallout();
    await vcClick(card, 350);
    hideHl();
  }
  await demoSleep(300);
  hideNarr();
}

async function _demoAnim_RecipeInput() {
  showBanner("STEP 2 / 7", "🍳 試作レシピ入力", "原材料を入れるたびに — 原価・栄養成分がリアルタイムで自動計算されます");
  await demoSleep(600);
  const narr = ["① 原材料を順番に入力", "② 原価が自動計算（目標28%）", "③ 栄養成分も自動更新", "④ Ver.2 レシピ保存完了 ✓"];
  showNarr(narr, 0);

  document.getElementById("dp-recipe-overlay")?.remove();
  const overlay = document.createElement("div");
  overlay.id = "dp-recipe-overlay"; overlay.className = "dp-ai-overlay";
  overlay.innerHTML = `
    <div class="dp-ai-card dp-recipe-card">
      <div class="dp-ai-title">📝 試作レシピ入力 — Ver.2（グルテンフリーパンケーキ）</div>
      <div class="dp-recipe-cols">
        <div class="dp-recipe-left">
          <div class="dp-recipe-col-label">原材料を入力 →</div>
          <div id="dp-ing-list"></div>
        </div>
        <div class="dp-recipe-right">
          <div class="dp-recipe-col-label">⚡ 原価シミュレーション</div>
          <div class="dp-recipe-stats">
            <div class="dp-rs"><span class="dp-rs-l">製造原価</span><span class="dp-rs-v" id="dp-rc">¥ —</span></div>
            <div class="dp-rs dp-rs-sep"></div>
            <div class="dp-rs"><span class="dp-rs-l">現在の原価率</span><span class="dp-rs-v" id="dp-rr" style="font-size:1.15em;font-weight:800">— %</span></div>
            <div class="dp-rs"><span class="dp-rs-l">目標原価率</span><span class="dp-rs-v" style="color:#f59e0b;font-weight:700">30% 以下</span></div>
            <div class="dp-rs" id="dp-sim-judge" style="display:none">
              <span class="dp-rs-l"></span>
              <span class="dp-rs-v" id="dp-sim-label" style="font-size:1.05em;font-weight:800"></span>
            </div>
            <div class="dp-rs dp-rs-sep"></div>
            <div class="dp-rs"><span class="dp-rs-l">カロリー</span><span class="dp-rs-v" id="dp-ca">— kcal</span></div>
            <div class="dp-rs"><span class="dp-rs-l">たんぱく質</span><span class="dp-rs-v" id="dp-pr">— g</span></div>
          </div>
        </div>
      </div>
      <div class="dp-ai-success" id="dp-recipe-done">✅ Ver.2 レシピ確定 — 原価率28% で目標達成！</div>
    </div>`;
  document.body.appendChild(overlay);
  await demoSleep(150); overlay.classList.add("visible");

  const ings = [
    { name:"米粉",               w:"140g", cost:180,  rate:26, cal:370,  prot:5.6,  fat:1.2 },
    { name:"豆乳パウダー",       w:"20g",  cost:245,  rate:28, cal:395,  prot:8.8,  fat:2.1 },
    { name:"砂糖",               w:"20g",  cost:250,  rate:29, cal:450,  prot:8.8,  fat:2.1 },
    { name:"片栗粉",             w:"10g",  cost:252,  rate:29, cal:460,  prot:8.9,  fat:2.1 },
    { name:"食塩",               w:"2g",   cost:252,  rate:29, cal:460,  prot:8.9,  fat:2.1 },
    { name:"ベーキングパウダー", w:"8g",   cost:245,  rate:28, cal:462,  prot:8.9,  fat:2.2 },
  ];
  const ingList = document.getElementById("dp-ing-list");
  async function flashEl(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.transition = "color .1s"; el.style.color = "#4ade80";
    await demoSleep(200); el.style.color = "";
  }
  for (let idx = 0; idx < ings.length; idx++) {
    if (!demoMode) break;
    const ing = ings[idx];
    const row = document.createElement("div");
    row.className = "dp-ing-row"; row.style.opacity = "0";
    row.innerHTML = `<span class="dp-ing-name"></span><span class="dp-ing-w" style="margin-left:8px;color:#94a3b8"></span>`;
    ingList?.appendChild(row);
    row.style.transition = "opacity .2s"; row.style.opacity = "1";
    await demoTypeIn(row.querySelector(".dp-ing-name"), ing.name, 20);
    await demoTypeIn(row.querySelector(".dp-ing-w"), ing.w, 28);
    const rc = document.getElementById("dp-rc"); if (rc) rc.textContent = "¥" + ing.cost;
    const rr = document.getElementById("dp-rr"); if (rr) { rr.textContent = ing.rate + "%"; rr.style.color = ing.rate <= 30 ? "#4ade80" : "#f87171"; }
    const ca = document.getElementById("dp-ca"); if (ca) ca.textContent = ing.cal + " kcal";
    const pr = document.getElementById("dp-pr"); if (pr) pr.textContent = ing.prot + " g";
    const judgeRow = document.getElementById("dp-sim-judge");
    const judgeLabel = document.getElementById("dp-sim-label");
    if (judgeRow && judgeLabel) {
      judgeRow.style.display = "";
      const ok = ing.rate <= 30;
      judgeLabel.textContent = ok ? `✅ 目標達成（余裕 ${30 - ing.rate}%）` : `⚠ 超過 +${ing.rate - 30}%`;
      judgeLabel.style.color = ok ? "#4ade80" : "#f87171";
    }
    await flashEl("dp-rc"); await flashEl("dp-rr");
    if (idx === 1) { updateNarr(1); await flashEl("dp-ca"); }
    if (idx === 3) { updateNarr(2); }
    await demoSleep(200);
  }
  document.getElementById("dp-recipe-done")?.classList.add("visible");
  updateNarr(3);
  await demoSleep(1400);
  const doneEl = document.getElementById("dp-recipe-done");
  if (doneEl) await showCalloutOnEl("原価率28% — 目標達成です。次はVer.1との違いを比べてみましょう", doneEl, "top");
  else await showCalloutAt("原価率28% — 目標達成。次はVer.1との差分を確認します", window.innerWidth / 2, window.innerHeight * 0.5, "top");
  await showCalloutWait(2000);
  hideCallout();
  overlay.style.transition = "opacity .5s"; overlay.style.opacity = "0";
  await demoSleep(500); overlay.remove();
  hideNarr();
}

async function _demoAnim_VersionDiff() {
  showBanner("STEP 3 / 7", "📊 バージョン比較", "試作Ver.1 vs Ver.2 — 何が変わったか・どこが改善されたか一目でわかります");
  await demoSleep(700);
  const root = document.getElementById("root");
  if (!root) return;
  const narr = ["Ver.1 を確認", "Ver.2 との差分を確認", "原価率 改善を確認"];
  showNarr(narr, 0);
  vcShow();

  const area = root.querySelector(
    "[class*='rv-compare'],[class*='compare-area'],[class*='version-compare'],[class*='rv-wrap'],[class*='rcmp-table']"
  );
  const cols = Array.from(root.querySelectorAll(
    "[class*='rv-col'],[class*='compare-col'],[class*='version-col'],[class*='rcmp-th']"
  )).slice(0, 2);

  // 比較エリアを先頭で画面に収める
  if (area) {
    demoScrollTo(area, "start");
    await demoSleep(500);
  }

  if (area) {
    showHl(area);
    await vcMoveToEl(area, 0, -20, 450);
    await showCalloutOnEl("Ver.1 と Ver.2 のレシピを横並びで比較できます", area, "right");
    await showCalloutWait(2000);
    hideCallout(); hideHl();
  }
  updateNarr(1);

  if (cols[0]) {
    showHl(cols[0]);
    await vcMoveToEl(cols[0], 0, 0, 400);
    await showCalloutOnEl("Ver.1 — 原価率 32%。目標（30%以下）をオーバーしています", cols[0], "right");
    await showCalloutWait(1800);
    hideCallout(); hideHl();
    await demoSleep(200);
  }
  if (cols[1]) {
    showHl(cols[1]);
    await vcMoveToEl(cols[1], 0, 0, 400);
    await showCalloutOnEl("Ver.2 — 原価率 28% ✓ 目標達成！変更した原材料は黄色でハイライトされています", cols[1], "left");
    await showCalloutWait(2200);
    hideCallout(); hideHl();
  }
  updateNarr(2);

  const costEl = root.querySelector("[class*='cost-rate'],[class*='direct-cost'],[class*='cost-row'],[class*='rv-cost'],[class*='rcmp-diff']");
  if (costEl) {
    showHl(costEl);
    await vcMoveToEl(costEl, 0, 0, 400);
    await showCalloutOnEl("原価率 32% → 28%。4ポイントの改善。この差が積み重なると年間で大きな利益になります", costEl, "bottom");
    await showCalloutWait(2400);
    hideCallout(); hideHl();
  }
  await showCalloutAt("「なんとなく」ではなく「数値で」判断できる — 担当者が変わっても、いつでも同じ基準で決断できます", window.innerWidth / 2, window.innerHeight * 0.5, "top");
  await showCalloutWait(2400);
  hideCallout();
  hideNarr();
}

async function _demoAnim_AIReview() {
  showBanner("STEP 4 / 7", "🤖 AI レビュー", "AIが食品表示法のミスと改善ポイントを — 発売前に自動でチェックします");
  await demoSleep(600);
  const narr = ["① AIに問い合わせ送信", "② AIが分析中...", "③ 重要な指摘が届きました", "④ 全項目を確認 ✓"];
  showNarr(narr, 0);

  document.getElementById("dp-ai-review-overlay")?.remove();
  const overlay = document.createElement("div");
  overlay.id = "dp-ai-review-overlay"; overlay.className = "dp-ai-overlay";
  overlay.innerHTML = `
    <div class="dp-ai-card">
      <div class="dp-ai-title">🤖 AI レビュー — グルテンフリーパンケーキ（2027春新商品）</div>
      <div class="dp-ai-phases">
        <div class="dp-ai-ph" id="dp-rv-q"><span class="dp-ai-ph-icon">💬</span><span id="dp-rv-qtxt"></span></div>
        <div class="dp-ai-ph" id="dp-rv-a"><span class="dp-ai-ph-icon dp-spin">🔍</span><span>AI が原材料・表示・コストを分析中...</span></div>
      </div>
      <div class="dp-ai-sep"></div>
      <div id="dp-ai-sug-list" class="dp-ai-suggestions"></div>
    </div>`;
  document.body.appendChild(overlay);
  await demoSleep(150); overlay.classList.add("visible");

  const qEl = document.getElementById("dp-rv-qtxt");
  document.getElementById("dp-rv-q")?.classList.add("visible");
  if (qEl) await demoTypeIn(qEl, "このレシピで食品表示法に問題はありますか？", 22);
  updateNarr(1);
  await demoSleep(300);
  document.getElementById("dp-rv-a")?.classList.add("visible");
  await demoSleep(1400);
  updateNarr(2);

  const items = [
    "⚠️ 表示必須: 豆乳パウダーは大豆由来のため「大豆」アレルゲン表示が必要です。",
    "✅ 解決策: 表示ラベルの「アレルゲン」欄に「大豆」を追加してください（自動反映可能）。",
    "💰 原価: 原価率 28% は目標範囲（30% 以下）。Ver.1 より 4pt 改善 — 合格。",
    "🌾 差別化: 食物繊維（オーツ麦等）を追加すると他社製品との差別化になります。",
    "✅ グルテンフリー: 使用原材料にグルテン由来成分は検出されません — 表示可能。",
  ];
  const sugList = document.getElementById("dp-ai-sug-list");
  for (let i = 0; i < items.length; i++) {
    if (!sugList || !demoMode) break;
    const item = document.createElement("div");
    item.className = "dp-ai-sug-item"; item.style.opacity = "0";
    sugList.appendChild(item);
    item.style.transition = "opacity .3s"; item.style.opacity = "1";
    await demoTypeIn(item, items[i], 11);
    if (i === 2) updateNarr(3);
    await demoSleep(280);
  }
  await demoSleep(1400);
  // 締めの価値訴求コールアウト
  const calloutText = "発売前にAIが自動チェック — ラベルミスによる回収リスクを未然に防ぎます";
  const sugg = document.getElementById("dp-ai-sug-list");
  if (sugg) await showCalloutOnEl(calloutText, sugg, "right");
  else await showCalloutAt(calloutText, window.innerWidth / 2, window.innerHeight * 0.5, "top");
  await showCalloutWait(2200);
  hideCallout();
  overlay.style.transition = "opacity .5s"; overlay.style.opacity = "0";
  await demoSleep(500); overlay.remove();
  hideNarr();
}

async function _demoAnim_ApprovalFlow() {
  showBanner("STEP 5 / 7", "✅ 採用 & 承認フロー", "採用ボタンを押すだけ — 承認ルートが自動で回り始めます");
  await demoSleep(600);
  const narr = ["採用ボタンを押下", "開発部長が承認", "品質管理が承認", "全承認 ✓ 発売準備完了"];
  showNarr(narr, 0);
  vcShow();

  // 採用ボタンをカーソルで押す演出
  const root = document.getElementById("root");
  const adoptBtn = root?.querySelector(
    "[data-action*='adopt'],[data-action*='approve'],[class*='adopt-btn'],[class*='approve-btn'],[class*='dp-adopt']"
  );
  if (adoptBtn) {
    showHl(adoptBtn);
    await vcMoveToEl(adoptBtn, 0, 0, 600);
    await showCalloutOnEl("このボタンを押すだけです — あとはシステムが自動で動きます", adoptBtn, "top");
    await showCalloutWait(1600);
    hideCallout();
    await vcClick(adoptBtn, 400);
    hideHl();
    await demoSleep(400);
  } else {
    // ボタンが見つからない場合はカーソルを画面中央へ
    await vcMove(window.innerWidth / 2, window.innerHeight * 0.45, 500);
    await showCalloutAt("採用ボタンを押しました — 承認フローが自動起動します", window.innerWidth / 2, window.innerHeight * 0.4, "bottom");
    await showCalloutWait(1600);
    hideCallout();
  }

  vcHide();
  document.getElementById("dp-appr-overlay")?.remove();
  const overlay = document.createElement("div");
  overlay.id = "dp-appr-overlay"; overlay.className = "dp-ai-overlay";
  overlay.innerHTML = `
    <div class="dp-ai-card dp-appr-card">
      <div class="dp-ai-title">✅ 採用 &amp; 承認フロー — グルテンフリーパンケーキ Ver.2</div>
      <div class="dp-appr-flow">
        <div class="dp-appr-step dp-appr-step--active" id="dp-as0">
          <span class="dp-appr-num dp-appr-num--ok">✓</span>
          <div><b>採用申請</b><br><span style="font-size:11px;opacity:.7">田中 花子（開発担当） · Ver.2 採用申請</span></div>
        </div>
        <div class="dp-appr-arrow">↓</div>
        <div class="dp-appr-step" id="dp-as1">
          <span class="dp-appr-num">2</span>
          <div><b>開発部長 承認待ち</b><br><span style="font-size:11px;opacity:.7">山田 太郎 · 原価率 28% 確認中...</span></div>
        </div>
        <div class="dp-appr-arrow">↓</div>
        <div class="dp-appr-step" id="dp-as2">
          <span class="dp-appr-num">3</span>
          <div><b>品質管理 承認待ち</b><br><span style="font-size:11px;opacity:.7">品質管理チーム · アレルゲン表示確認中...</span></div>
        </div>
        <div class="dp-appr-arrow">↓</div>
        <div class="dp-appr-step" id="dp-as3">
          <span class="dp-appr-num">✓</span>
          <div><b class="dp-appr-ok">全承認完了 — 発売可能</b><br><span style="font-size:11px;opacity:.7">3名の承認が揃いました</span></div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  await demoSleep(150); overlay.classList.add("visible");

  function _approveStep(id, label) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("dp-appr-step--active");
    const b = el.querySelector("b"); if (b) b.textContent = label;
    const num = el.querySelector(".dp-appr-num");
    if (num) { num.className = "dp-appr-num dp-appr-num--ok"; num.textContent = "✓"; }
  }

  await demoSleep(1200);
  _approveStep("dp-as1", "開発部長 承認 ✓");
  updateNarr(1);

  await demoSleep(1100);
  _approveStep("dp-as2", "品質管理 承認 ✓");
  updateNarr(2);

  await demoSleep(1000);
  const as3 = document.getElementById("dp-as3");
  if (as3) {
    as3.classList.add("dp-appr-step--active");
    const as3num = as3.querySelector(".dp-appr-num");
    if (as3num) { as3num.className = "dp-appr-num dp-appr-num--ok"; }
  }
  updateNarr(3);

  await demoSleep(800);
  const finalEl = document.getElementById("dp-as3");
  if (finalEl) {
    finalEl.style.transition = "box-shadow .3s";
    finalEl.style.boxShadow = "0 0 0 2px #22c55e, 0 4px 20px rgba(34,197,94,.4)";
  }

  await demoSleep(800);
  await showCalloutAt("書類を回す・催促する — そんな手間が全部なくなります。次のステップは「発売」です", window.innerWidth / 2, window.innerHeight * 0.5, "top");
  await showCalloutWait(2200);
  hideCallout();
  overlay.style.transition = "opacity .5s"; overlay.style.opacity = "0";
  await demoSleep(500); overlay.remove();
  hideNarr();
}

async function _demoAnim_ReleaseAnim() {
  showBanner("STEP 6 / 7", "🚀 発売処理", "最も感動する瞬間 — ボタン1つで全システムが一斉に動きます");
  await demoSleep(700);
  const narr = ["「発売する」ボタンを押下", "全システムへ自動連携中...", "すべてつながりました 🎉"];
  showNarr(narr, 0);
  vcShow();

  const root = document.getElementById("root");
  const relBtn = root?.querySelector(
    "[data-action*='release'],[data-action*='launch'],[class*='release-btn'],[class*='launch-btn']"
  );
  if (relBtn) {
    showHl(relBtn);
    await vcMoveToEl(relBtn, 0, 0, 600);
    await showCalloutOnEl("このボタンを1回押すだけです — あとはすべてFoodPilotが自動でやります", relBtn, "top");
    await showCalloutWait(2000);
    hideCallout();
    await vcClick(relBtn, 400);
    hideHl();
    await demoSleep(300);
  } else {
    await vcMove(window.innerWidth / 2, window.innerHeight * 0.5, 500);
    await showCalloutAt("「発売する」ボタンを押しました — ここからFoodPilotが全自動で動きます", window.innerWidth / 2, window.innerHeight * 0.4, "bottom");
    await showCalloutWait(1800);
    hideCallout();
  }

  vcHide();
  document.getElementById("dp-rel-overlay")?.remove();
  const overlay = document.createElement("div");
  overlay.id = "dp-rel-overlay"; overlay.className = "dp-ai-overlay";
  overlay.innerHTML = `
    <div class="dp-ai-card dp-rel-card">
      <div style="text-align:center;margin-bottom:16px">
        <div id="dp-rel-ico" style="font-size:56px;line-height:1;margin-bottom:8px;display:inline-block">🚀</div>
        <div class="dp-ai-title" style="justify-content:center;font-size:17px;color:#f59e0b">発売処理を開始しました</div>
        <div style="font-size:12px;color:#64748b;margin-top:4px">グルテンフリーパンケーキミックス 200g</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px" id="dp-rel-steps"></div>
      <div id="dp-rel-final" style="margin-top:16px;padding:14px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);border-radius:10px;text-align:center;opacity:0;transition:opacity .6s">
        <div style="font-size:20px;margin-bottom:6px">🎉</div>
        <div style="font-size:15px;font-weight:800;color:#4ade80">すべてのシステムに自動反映されました</div>
        <div style="font-size:12px;color:#94a3b8;margin-top:4px">開発から管理まで — FoodPilotがひとつにつなぎます</div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  await demoSleep(150); overlay.classList.add("visible");
  updateNarr(1);

  const ico = document.getElementById("dp-rel-ico");
  if (ico) {
    ico.style.transition = "transform .7s cubic-bezier(.34,1.56,.64,1)";
    ico.style.transform = "scale(1.3) translateY(-6px)";
  }
  await demoSleep(600);
  if (ico) { ico.style.transform = "scale(1)"; }

  const steps = [
    { icon: "📦", text: "商品管理データベースへ登録完了", delay: 500 },
    { icon: "🗂️", text: "商品カルテを自動生成 — 全情報を引き継ぎました", delay: 600 },
    { icon: "📋", text: "商品一覧に追加 — 即日から販売状況を管理", delay: 600 },
    { icon: "📅", text: "タイムラインに発売記録を追加しました", delay: 600 },
    { icon: "📊", text: "ダッシュボードのKPIを更新しました", delay: 600 },
    { icon: "🏷️", text: "食品表示ラベルを商品管理に紐づけました", delay: 600 },
  ];
  const stepsEl = document.getElementById("dp-rel-steps");
  for (const s of steps) {
    if (!stepsEl || !demoMode) break;
    const el = document.createElement("div");
    el.style.cssText = "display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600;color:#e2e8f0;opacity:0;transform:translateX(-12px);transition:opacity .35s,transform .35s;background:rgba(255,255,255,.06);padding:8px 14px;border-radius:8px;border-left:3px solid #22c55e;";
    el.innerHTML = `<span style="font-size:16px">${s.icon}</span><span>${s.text}</span>`;
    stepsEl.appendChild(el);
    await demoSleep(80);
    el.style.opacity = "1"; el.style.transform = "translateX(0)";
    await demoSleep(s.delay);
  }
  updateNarr(2);

  await demoSleep(400);
  const finalEl = document.getElementById("dp-rel-final");
  if (finalEl) finalEl.style.opacity = "1";
  await demoSleep(1200);
  await showCalloutAt("ボタン1回で — 開発から管理まで、すべて自動でつながります。もう何も漏れません ✓", window.innerWidth / 2, window.innerHeight * 0.55, "top");
  await showCalloutWait(2600);
  hideCallout();
  overlay.style.transition = "opacity .5s"; overlay.style.opacity = "0";
  await demoSleep(500); overlay.remove();
  hideNarr();
}

async function _demoAnim_DevTimeline() {
  showBanner("STEP 7 / 7", "📅 開発タイムライン", "この商品の誕生から今日まで — すべての記録が一本の線に");
  await demoSleep(700);
  const root = document.getElementById("root");
  if (!root) return;
  const narr = ["発売〜引き継ぎ記録を確認", "採用・承認フローを確認", "開発のはじまりまで遡る"];
  showNarr(narr, 0);
  vcShow();

  await showCalloutAt("これが開発タイムラインです。「発売する」を押してから商品管理に引き継がれるまで、すべての記録がここにあります", window.innerWidth / 2, window.innerHeight * 0.35, "bottom");
  await showCalloutWait(2400);
  hideCallout();

  const entries = Array.from(root.querySelectorAll(
    ".tl2-row,[class*='tl-item'],[class*='karte-tl-row']"
  ));
  // timeline entries order (newest first):
  // 0:食品表示ラベル初版確定 1:発売処理 2:承認フロー完了 3:Ver.2採用決定 4:試作#2 5:試作#1 6:開発スタート
  const devCallouts = [
    { idx: 1, msg: "🚀 発売処理完了 — 開発から商品管理へ。自動で全データが引き継がれました" },
    { idx: 2, msg: "✅ 全承認フロー完了 — 部長・品質管理の3名が順番に承認しました" },
    { idx: 3, msg: "✅ Ver.2 採用決定 — 原価率28%で目標達成。ここで発売GOが出ました" },
    { idx: 5, msg: "🧪 試作#1（Ver.1）— 原価率32%で目標オーバー。だから試作を重ねました" },
    { idx: 6, msg: "🌱 開発スタート — ここからグルテンフリーパンケーキの旅が始まりました" },
  ];

  if (entries.length) {
    for (let i = 0; i < Math.min(entries.length, 7); i++) {
      if (!demoMode) break;
      demoScrollTo(entries[i], "center");
      await demoSleep(350);
      showHl(entries[i]);
      await vcMoveToEl(entries[i], 0, 0, 380);
      const co = devCallouts.find(c => c.idx === i);
      if (co) {
        await showCalloutOnEl(co.msg, entries[i], "left");
        if (i === 2) updateNarr(1);
        if (i === 5) updateNarr(2);
        await showCalloutWait(2000);
        hideCallout();
      } else {
        await demoSleep(600);
      }
      await demoSleep(400);
      hideHl(); await demoSleep(200);
    }
  } else {
    const scrollEl = root.querySelector(".saas-main") || root;
    await vcSmoothScroll(scrollEl, scrollEl.scrollHeight - scrollEl.clientHeight, 4000);
    updateNarr(2);
  }
  await showCalloutAt("開発スタートから発売まで、すべての決断・承認・記録が一本の線に残ります", window.innerWidth / 2, window.innerHeight * 0.45, "top");
  await showCalloutWait(2200);
  hideCallout();
  await demoSleep(300);
  await showCalloutAt("「あのとき何故この原材料を選んだのか」— 何年後でも、誰でも、1秒で答えられます", window.innerWidth / 2, window.innerHeight * 0.45, "top");
  await showCalloutWait(2800);
  hideCallout();
  hideNarr();
}

function demoModuleSelectHtml() {
  const DEMOS = [
    {
      type: "manage",
      modules: ["manage"],
      icon: "📦",
      title: "商品管理デモ",
      duration: "約7分 · 7ステップ",
      personas: ["豆腐・納豆メーカー", "菓子・パン製造", "食品受託製造", "調味料・惣菜"],
      features: [
        "商品一覧・カルテ管理",
        "食品表示ラベル自動生成",
        "A4規格書ワンクリック",
        "AI表示チェック",
      ],
      steps: "ダッシュボード → 商品一覧 → 商品カルテ → タイムライン → ラベル → 規格書 → AIレビュー",
      recommended: false,
    },
    {
      type: "develop",
      modules: ["manage", "develop"],
      icon: "🧪",
      title: "商品開発デモ",
      duration: "約8分 · 7ステップ",
      personas: ["新商品を毎年複数開発", "OEM受託開発", "試作・レシピ管理が必要", "開発〜発売を一元管理したい"],
      features: [
        "開発プロジェクト管理",
        "試作版比較（Ver.1 vs Ver.2）",
        "AIへの原材料相談",
        "発売処理〜商品カルテ移行",
      ],
      steps: "開発一覧 → 試作Ver.1 → Ver.2比較 → AI相談 → 採用決定 → 発売処理 → 商品カルテ → タイムライン",
      recommended: true,
    },
  ];
  const cardsHtml = DEMOS.map(d => `
    <button class="demo-select-card${d.recommended ? " demo-select-card--rec" : ""}"
      data-action="demo-start-with-modules"
      data-modules="${escapeHtml(JSON.stringify(d.modules))}"
      data-demo-type="${d.type}">
      ${d.recommended ? `<span class="demo-select-rec-badge">おすすめ</span>` : ""}
      <div class="demo-select-card-hd">
        <span class="demo-select-card-icon">${d.icon}</span>
        <div>
          <div class="demo-select-card-name">${d.title}</div>
          <div class="demo-select-card-duration">${d.duration}</div>
        </div>
      </div>
      <div class="demo-select-persona">
        <div class="demo-select-persona-label">こんな方に</div>
        <div class="demo-select-persona-tags">
          ${d.personas.map(p => `<span>${p}</span>`).join("")}
        </div>
      </div>
      <ul class="demo-select-features">
        ${d.features.map(f => `<li>${f}</li>`).join("")}
      </ul>
      <div class="demo-select-flow">${d.steps}</div>
      <div class="demo-select-card-cta">体験を開始 →</div>
    </button>`).join("");

  return saasLayout("デモを開始", `
    <div class="demo-select-wrap">
      <div class="demo-select-hero">
        <img src="./assets/app-icon.svg" alt="" class="demo-select-hero-icon" onerror="this.style.display='none'">
        <h2 class="demo-select-hero-title">FoodPilot デモ体験へようこそ</h2>
        <p class="demo-select-hero-sub">貴社の状況に近いデモをお選びください。所要時間は約7〜8分です。</p>
      </div>
      <div class="demo-select-cards">${cardsHtml}</div>
      <p class="demo-select-note">デモデータは本番データに一切影響しません。いつでも終了・再開できます。</p>
    </div>
  `);
}

function startDemo() {
  products = products.filter(p => !p._isDemo);
  const now = new Date().toISOString().replace("T", " ").slice(0, 16);
  const templates = demoType === "develop" ? DEMO_PRODUCTS_DEVELOP : DEMO_PRODUCTS_MANAGE;
  const demoProds = templates.map((tmpl, i) => Object.assign({}, tmpl, {
    id: "demo-fp-" + (Date.now() + i),
    updatedAt: now,
    createdAt: tmpl.createdAt || now,
    // ラベル完成度チェックに使われるフィールド名を補完
    volume:      tmpl.volume      || (tmpl.netWeight ? `${tmpl.netWeight}${tmpl.netWeightUnit || ""}` : ""),
    bestBefore:  tmpl.bestBefore  || tmpl.expiryDate || "",
    storage:     tmpl.storage     || tmpl.storageMethod || "",
    productStatus: tmpl.productStatus === "active" ? "on_sale" : (tmpl.productStatus || "on_sale"),
  }));
  demoProductId = demoProds[0].id;
  products.unshift(...demoProds);

  // デモ用タイムラインイベントを事前登録（タイムラインアニメーションで表示するため）
  if (demoType === "develop") {
    const relProd = demoProds.find(p => p._isDemoReleased);
    if (relProd) {
      const tl = [
        { icon:"🏷️", label:"食品表示ラベル 初版確定", savedAt:"2026-09-01 10:30", savedBy:"品質管理チーム", comment:"" },
        { icon:"🚀", label:"発売処理 — 商品管理へ移行完了", savedAt:"2026-09-01 09:00", savedBy:"田中 花子", comment:"グルテンフリーパンケーキミックス 200g 新発売" },
        { icon:"👥", label:"承認フロー完了（部長 · 品質 · 営業）", savedAt:"2026-07-12 09:00", savedBy:"承認システム", comment:"" },
        { icon:"✅", label:"Ver.2 採用決定 — レシピ確定", savedAt:"2026-07-10 11:00", savedBy:"山田 太郎（開発部長）", comment:"原価率 28%。試作#2 評価 A 採用" },
        { icon:"🧪", label:"試作#2（Ver.2）実施 — 評価 A ✓", savedAt:"2026-07-08 15:00", savedBy:"田中 花子", comment:"食感・味ともに良好。ふんわり感 改善確認" },
        { icon:"🧪", label:"試作#1（Ver.1）実施 — 評価 C", savedAt:"2026-06-25 14:00", savedBy:"田中 花子", comment:"コシが強すぎ。豆乳パウダー追加を検討" },
        { icon:"🌱", label:"開発プロジェクト開始", savedAt:"2026-06-15 10:00", savedBy:"田中 花子", comment:"2027春新商品として立ち上げ。グルテン不耐症対応ライン" },
      ];
      try { safeSet(`food-label-timeline-${relProd.id}`, JSON.stringify(tl)); } catch {}
    }
  } else {
    const mainProd = demoProds[0];
    const tl = [
      { icon:"🔄", label:"食品表示ラベル 改訂版確定", savedAt:"2026-07-18 14:23", savedBy:"品質管理チーム", comment:"卵・乳成分の表示強調" },
      { icon:"🏷️", label:"ラベル改訂 — アレルゲン表示修正", savedAt:"2026-07-15 10:00", savedBy:"佐藤 健", comment:"" },
      { icon:"📋", label:"A4規格書 印刷・取引先へ配布", savedAt:"2026-06-01 11:00", savedBy:"佐藤 健", comment:"" },
      { icon:"✅", label:"表示内容 品質チェック完了", savedAt:"2026-05-15 09:00", savedBy:"品質管理チーム", comment:"" },
      { icon:"🏷️", label:"食品表示ラベル 初版作成", savedAt:"2026-05-10 14:00", savedBy:"佐藤 健", comment:"" },
      { icon:"📝", label:"商品情報 初回登録（AI 解析）", savedAt:"2026-05-01 10:00", savedBy:"佐藤 健", comment:"パッケージ写真から自動入力" },
    ];
    try { safeSet(`food-label-timeline-${mainProd.id}`, JSON.stringify(tl)); } catch {}
  }

  try { localStorage.setItem("food-label-products-static", JSON.stringify(products)); } catch {}
  demoMode = true;
  demoEndScreen = false;
  demoStep = 1;
  demoAnimPlayed = false;
  document.documentElement.classList.add("fp-demo-active");
  document.body.classList.add("fp-demo-active");
  // デモ中は全スクロール操作を完全ブロック
  const _wbl = e => e.preventDefault();
  const _kbl = e => {
    if (["ArrowUp","ArrowDown","PageUp","PageDown"," "].includes(e.key)) e.preventDefault();
  };
  window._demoWheelBlock = _wbl;
  window._demoKeyBlock   = _kbl;
  window.addEventListener("wheel",     _wbl, { passive: false });
  window.addEventListener("touchmove", _wbl, { passive: false });
  window.addEventListener("keydown",   _kbl);
  applyDemoStep();
  render();
  // render() 後にスクロール位置をリセット（新しい DOM に適用するため）
  requestAnimationFrame(() => {
    document.querySelectorAll(".saas-main,.saas-content").forEach(el => { el.scrollTop = 0; });
  });
  setTimeout(demoPresAnimateStep, 600);
}

function endDemo() {
  _demoCleanup();
  document.documentElement.classList.remove("fp-demo-active");
  document.body.classList.remove("fp-demo-active", "fp-dd");
  if (window._demoWheelBlock) {
    window.removeEventListener("wheel",     window._demoWheelBlock);
    window.removeEventListener("touchmove", window._demoWheelBlock);
    delete window._demoWheelBlock;
  }
  if (window._demoKeyBlock) {
    window.removeEventListener("keydown", window._demoKeyBlock);
    delete window._demoKeyBlock;
  }
  products = products.filter(p => !p._isDemo);
  try { localStorage.setItem("food-label-products-static", JSON.stringify(products)); } catch {}
  demoMode = false;
  demoEndScreen = false;
  demoStep = 1;
  demoProductId = null;
  saasView = "dashboard";
  view = "saas";
  render();
}

function applyDemoStep() {
  const steps = currentDemoSteps();
  const s = steps[demoStep - 1];
  if (!s) return;
  _demoCleanup();
  sidebarOpen = false;
  registerMenuOpen = false;
  recipeCompareMode = false;
  recipeCompareIds = [];
  healthPanelOpen = false;

  if (s.view === "dashboard") {
    saasView = "dashboard"; view = "saas";
  }
  else if (s.view === "products") {
    masterSearch = ""; saasView = "products"; view = "saas";
  }
  else if (s.view === "dev-products") {
    saasView = "dev-products"; view = "saas";
  }
  else if (s.view === "dev-detail") {
    productDetailId = demoProductId;
    devDetailTab = s.devTab || "overview";
    activeRecipeVersionId = null;
    saasView = "product-detail"; view = "saas";
    if (s.compareMode) {
      const dp = products.find(x => x.id === demoProductId);
      const vids = (dp?.recipeVersions || []).map(v => v.id);
      if (vids.length >= 2) { recipeCompareMode = true; recipeCompareIds = vids; }
    }
  }
  else if (s.view === "ai-consult-nav") {
    aiConsultProductId = demoProductId;
    saasView = "ai-consult-nav"; view = "saas";
  }
  else if (s.view === "label-nav") {
    editId = demoProductId;
    draft = extendProductMaster(products.find(p => p.id === demoProductId) || emptyProduct());
    view = "edit"; saasView = "label-nav";
  }
  else if (s.view === "product-detail") {
    let targetId = demoProductId;
    if (s.useReleased) {
      const rp = products.find(p => p._isDemoReleased);
      if (rp) targetId = rp.id;
    }
    productDetailId = targetId;
    productDetailTab = s.detailTab || "basic";
    saasView = "product-detail"; view = "saas";
  }
  else if (s.view === "spec-sheet-nav") {
    specSheetId = demoProductId; saasView = "spec-sheet-nav"; view = "saas";
  }
}

function demoEndHtml() {
  const FEATURES = [
    { icon: "📷", title: "AI 商品登録", desc: "写真1枚で原材料・栄養成分まで自動入力" },
    { icon: "🗂️", title: "商品カルテ", desc: "1商品のすべての情報がひとつの画面に集約" },
    { icon: "🏷️", title: "食品表示ラベル", desc: "食品表示法準拠のラベルをリアルタイム生成" },
    { icon: "📄", title: "A4 規格書", desc: "ワンクリックで取引先向け規格書が自動完成" },
    { icon: "🧪", title: "商品開発管理", desc: "試作・レシピ比較・採用から発売まで一元管理" },
    { icon: "🤖", title: "AI レビュー", desc: "表示法違反・コスト改善をAIが自動チェック" },
  ];
  return `
    <div class="demo-overlay demo-fullscreen demo-end-overlay" id="demo-overlay">
      <div class="demo-end-inner">
        <div class="demo-end-check-wrap" style="animation:demo-pop .5s ease-out"><div class="demo-end-check">✓</div></div>
        <h2 class="demo-end-title">デモ体験が完了しました</h2>
        <p class="demo-end-subtitle">FoodPilot でできること</p>
        <div class="demo-end-features">
          ${FEATURES.map(f => `
            <div class="demo-end-feature">
              <span class="demo-end-feature-icon">${f.icon}</span>
              <div>
                <div class="demo-end-feature-title">${f.title}</div>
                <div class="demo-end-feature-desc">${f.desc}</div>
              </div>
            </div>`).join("")}
        </div>
        <div class="demo-end-tagline">
          <p class="demo-end-tagline-main">ExcelとLINEでバラバラだった商品情報を、ひとつに。</p>
          <p class="demo-end-tagline-sub">FoodPilot は、商品の企画から終売まで、すべての情報とプロセスを一元管理します。</p>
        </div>
        <div class="demo-end-cta-box">
          <p class="demo-end-cta-title">「うちでも使いたい」と思っていただけましたか？</p>
          <p class="demo-end-cta-sub">まずは無料30分、貴社の課題をお聞かせください。導入サポートも充実しています。</p>
          <div class="demo-nav-row" style="margin-top:16px;justify-content:center;flex-wrap:wrap">
            <button class="demo-btn-sec" data-action="demo-restart">← 別のデモを見る</button>
            <button class="demo-btn-cta" data-action="demo-contact">📞 導入を相談する（無料）</button>
          </div>
        </div>
      </div>
    </div>`;
}

function demoOverlayHtml() {
  if (demoEndScreen) return demoEndHtml();

  const steps = currentDemoSteps();
  const TOTAL = steps.length;
  const s = steps[demoStep - 1];
  if (!s) return "";

  const fillPct = Math.round((demoStep / TOTAL) * 100);
  const typeBadge = demoType === "develop"
    ? `<span class="demo-type-badge demo-type-badge--develop">🧪 商品開発</span>`
    : `<span class="demo-type-badge demo-type-badge--manage">📦 商品管理</span>`;

  const prevBtn = demoStep > 1
    ? `<button class="dp-nav-btn" data-action="demo-prev">← 戻る</button>`
    : `<button class="dp-nav-btn" disabled style="opacity:.3;cursor:default">← 戻る</button>`;
  const nextLabel = demoStep === TOTAL ? "まとめを見る ✓"
    : `次: ${escapeHtml(steps[demoStep].title)} →`;

  return `
    <div class="demo-topbar-v2" id="dp-topbar">
      <div class="dp-tb-left">${typeBadge}</div>
      <div class="demo-v2-progress">
        <div class="demo-v2-step-info">
          <span class="demo-v2-step-label">STEP ${demoStep}/${TOTAL}</span>
          <span class="demo-v2-step-title">${escapeHtml(s.title)}</span>
        </div>
        <div class="demo-v2-bar-track"><div class="demo-v2-bar-fill" style="width:${fillPct}%"></div></div>
      </div>
      <div class="dp-tb-right">
        <button class="demo-end-btn" data-action="demo-end">✕ 終了</button>
      </div>
    </div>
    <div class="dp-bottom" id="dp-bottom">
      <div class="dp-bottom-info">
        <div class="dp-bottom-step-lbl">STEP ${demoStep} · ${escapeHtml(s.title)}</div>
        <div class="dp-bottom-subtitle">${escapeHtml(s.sub || "")}</div>
      </div>
      <div class="dp-bottom-ctrl">
        ${prevBtn}
        <button class="dp-nav-btn dp-nav-btn--primary" data-action="demo-next">${nextLabel}</button>
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
  // モジュールガード: 未契約のビューへのアクセスをダッシュボードにリダイレクト
  if (view === "saas" && typeof guardView === "function") {
    const guarded = guardView(saasView);
    if (guarded !== saasView) saasView = guarded;
  }

  let pageHtml;
  try {
    if (view === "saas") {
      if (saasView === "demo-select") pageHtml = demoModuleSelectHtml();
      else if (saasView === "dashboard") pageHtml = dashboardHtml();
      else if (saasView === "products") pageHtml = productsListHtml();
      else if (saasView === "dev-products") pageHtml = devProductsHtml();
      else if (saasView === "product-detail") {
        const _dp = products.find(x => x.id === productDetailId);
        pageHtml = (_dp?.phase === "development") ? devDetailHtml() : productDetailHtml();
      }
      else if (saasView === "spec-sheet-nav") pageHtml = specSheetHtml();
      else if (saasView === "ai-descriptions-nav") pageHtml = aiDescriptionsHtml();
      else if (saasView === "ai-consult-nav") pageHtml = aiConsultHtml();
      else if (saasView === "reg-photo") pageHtml = photoRegisterHtml();
      else if (saasView === "reg-spec") pageHtml = specRegisterHtml();
      else if (saasView === "reg-ai-chat") pageHtml = aiChatRegisterHtml();
      else if (saasView === "settings-nav") pageHtml = newSettingsHtml();
      else if (saasView === "team-approval") pageHtml = teamApprovalHtml();
      else if (saasView === "allergen-matrix") pageHtml = allergenMatrixHtml();
      else if (saasView === "shelf-scan") pageHtml = shelfScanHtml();
      else if (saasView === "raw-materials") pageHtml = rawMaterialsHtml();
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
  document.body.classList.toggle("fp-demo-mode", demoMode && !demoEndScreen);
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
  if (typeof syncHash === "function") syncHash();
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
// ── トライアル管理 ────────────────────────────────────────────────────
function initTrial() {
  if (currentPlan === "trial30" && !trialStartDate) {
    trialStartDate = new Date().toISOString().split("T")[0];
    safeSet("food-label-trial-start", trialStartDate);
  }
}
function trialDaysLeft() {
  if (!trialStartDate) return 30;
  const diff = Math.floor((Date.now() - new Date(trialStartDate)) / 86400000);
  return Math.max(0, 30 - diff);
}
function isTrialExpired() {
  return currentPlan === "trial30" && trialDaysLeft() === 0;
}
function effectivePlanId() {
  if (currentPlan === "trial30" && isTrialExpired()) return "free";
  return currentPlan;
}
function planInfo() { return PLANS[effectivePlanId()] || PLANS.free; }
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
  const eff = effectivePlanId();
  const daysLeft = trialDaysLeft();
  const expired = isTrialExpired();

  // トライアルバナー
  const trialBanner = (currentPlan === "trial30")
    ? expired
      ? `<div class="plan-trial-banner plan-trial-banner--expired">
          ⏰ 30日間の無料トライアルが終了しました。
          引き続きご利用いただくにはプランをお選びください。
         </div>`
      : `<div class="plan-trial-banner">
          🎉 無料トライアル中 — あと <strong>${daysLeft}日</strong> で終了します。
          終了後は3商品まで無料で使い続けられます。
         </div>`
    : "";

  // 有料プランカード（free・trial30 は除外）
  const paidPlans = [["starter", PLANS.starter], ["pro", PLANS.pro]];
  const paidCards = paidPlans.map(([id, p]) => {
    const isActive = eff === id;
    const isPopular = id === "pro";
    const buyBtn = !isActive
      ? `<button class="plan-buy-btn" data-action="stripe-checkout" data-plan="${id}">購入する →</button>`
      : `<span class="plan-check">✓ 使用中</span>`;
    return `<div class="plan-card${isActive ? " selected" : ""}${isPopular ? " popular" : ""}">
      ${isPopular ? `<span class="popular-badge">人気</span>` : ""}
      <strong class="plan-name">${p.label}</strong>
      <em class="plan-price">${p.price}</em>
      <small class="plan-note">${p.note}</small>
      ${buyBtn}
    </div>`;
  }).join("");

  // フリープランの状態表示
  const freeStatus = eff === "free" || eff === "trial30"
    ? `<div class="plan-free-note">
        <span class="plan-free-badge">✓ フリープラン（3商品まで永続無料）${eff === "trial30" && !expired ? " — トライアル終了後も継続" : " 使用中"}</span>
       </div>`
    : "";

  return `<section class="plan-panel">
    ${trialBanner}
    <div class="plan-title"><b>プランを選択</b><span>お支払い後にライセンスキーを設定ページで入力</span></div>
    <div class="plan-grid">${paidCards}</div>
    ${freeStatus}
    <div class="plan-stripe-note">
      <span>💳 Stripe決済（クレジットカード対応）</span>
      <span>🔒 SSL暗号化で安全に処理されます</span>
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
    productMemo: "",
    relatedProductIds: [],
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
    phase: "development",
    releasedAt: null,
    discontinuedAt: null,
    discontinuedReason: null,
    oemParentId: null,
    oemLabel: null,
    devProject: null,
    recipeVersions: null,
    adoptedRecipeVersionId: null,
    trialBatches: null,
    ...p,
  };
}
(function runMigration() {
  if (safeGet("fmcc-migrated-v2") !== "1") {
    products = products.map(extendProductMaster);
    saveProducts();
    safeSet("fmcc-migrated-v1", "1");
    safeSet("fmcc-migrated-v2", "1");
  }
  // v3: phaseフィールド追加・既存商品はすべてreleased
  if (safeGet("fmcc-migrated-v3") !== "1") {
    products = products.map(p => ({
      ...p,
      phase: p.phase || "released",
      releasedAt: p.releasedAt || null,
      discontinuedAt: p.discontinuedAt || null,
      discontinuedReason: p.discontinuedReason || null,
      oemParentId: p.oemParentId || null,
      oemLabel: p.oemLabel || null,
    }));
    saveProducts();
    safeSet("fmcc-migrated-v3", "1");
  }
  // v4: phase と productStatus の整合性修正
  if (safeGet("fmcc-migrated-v4") !== "1") {
    const devOnly = new Set(["draft","in_progress","review","approved"]);
    const relOnly = new Set(["on_sale","discontinued"]);
    products = products.map(p => {
      if (p.phase === "released" && devOnly.has(p.productStatus)) {
        return { ...p, productStatus: "on_sale" };
      }
      if (p.phase === "development" && relOnly.has(p.productStatus)) {
        return { ...p, productStatus: "approved" };
      }
      return p;
    });
    saveProducts();
    safeSet("fmcc-migrated-v4", "1");
  }
  // v5: 開発商品に recipeVersions / trialBatches / devProject を追加
  if (safeGet("fmcc-migrated-v5") !== "1") {
    products = products.map(p => {
      if ((p.phase || "released") !== "development") return p;
      if (p.recipeVersions && p.recipeVersions.length > 0) return p;
      const v1id = uid();
      return {
        ...p,
        recipeVersions: [{
          id: v1id, versionNum: 1, label: "Ver.1（初期）",
          ingredients: p.ingredients || [],
          costMode: p.costMode || "direct",
          directCost: p.directCost || "",
          costItems: p.costItems || [],
          note: "既存レシピから自動生成",
          createdAt: p.updatedAt || new Date().toLocaleDateString("ja-JP"),
          createdBy: "", status: "adopted",
        }],
        adoptedRecipeVersionId: v1id,
        trialBatches: p.trialBatches || [],
        devProject: p.devProject || null,
      };
    });
    saveProducts();
    safeSet("fmcc-migrated-v5", "1");
  }
})();

// ── ナビゲーション ────────────────────────────────────────────────────
function sidebarHtml() {
  const _detailP = saasView === "product-detail" ? products.find(x => x.id === productDetailId) : null;
  const active = _detailP ? (_detailP.phase === "development" ? "dev-products" : "products") : saasView;
  const managedCount = products.filter(p => p.phase === "released" && p.productStatus !== "discontinued").length;
  const devCount = products.filter(p => p.phase === "development").length;
  const settingItem = { id:"settings-nav", label:"設定", ico:"⚙️" };
  const navLink = (it, badge = "") => `<button class="nav-item${active===it.id?" active":""}" data-nav="${it.id}">
    <span class="nav-ico">${it.ico}</span><span class="nav-lbl">${it.label}</span>${it.beta?'<span class="nav-beta">β</span>':""}${badge}
  </button>`;
  const reviewCount = products.filter(p => p.approvalStatus === "review").length;
  const sectionLabel = (label, cls = "") => `<div class="nav-section-label${cls ? " " + cls : ""}">${label}</div>`;
  const readyToRelease     = products.filter(p => p.phase === "development" && p.productStatus === "approved").length;
  const releaseBadge       = readyToRelease > 0 ? `<span class="nav-release-badge">🚀 ${readyToRelease}</span>` : "";
  const reviewBadge        = reviewCount > 0 ? `<span class="nav-review-badge">${reviewCount}</span>` : "";
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
      ${navLink({ id:"dashboard", label:"ホーム", ico:"🏠" })}
      ${hasModule("manage") ? `
        ${sectionLabel("📦 商品管理")}
        ${navLink({ id:"products", label:"商品一覧" + (managedCount > 0 ? ` (${managedCount})` : ""), ico:"📋" })}
        ${navLink({ id:"team-approval", label:"承認" + (reviewCount > 0 ? ` (${reviewCount})` : ""), ico:"👥" }, reviewBadge)}
        ${navLink({ id:"allergen-matrix", label:"アレルゲン表", ico:"🧾" })}
      ` : ""}
      ${hasModule("develop") ? `
        ${sectionLabel("🧪 商品開発")}
        ${navLink({ id:"dev-products", label:"開発プロジェクト" + (devCount > 0 ? ` (${devCount})` : ""), ico:"🔬" }, releaseBadge)}
      ` : ""}
      ${hasModule("manage") ? `
        ${sectionLabel("データ管理")}
        ${navLink({ id:"raw-materials", label:"原材料マスタ" + (rawMaterials.length > 0 ? ` (${rawMaterials.length})` : ""), ico:"🌾" })}
        ${sectionLabel("🤖 AI機能")}
        ${navLink({ id:"ai-consult-nav", label:"AI相談", ico:"💬" })}
        ${navLink({ id:"ai-descriptions-nav", label:"AI説明文", ico:"✨" })}
      ` : ""}
    </div>
    <div class="nav-footer">${userChip}${navLink(settingItem)}</div>
  </nav>
  <div class="sidebar-backdrop${sidebarOpen?" visible":""}" data-action="close-sidebar"></div>`;
}

function saasTopbar(title) {
  const cloudBtn = isCloudEnabled()
    ? `<button class="cloud-sync-topbar-btn" id="cloud-sync-topbar-btn" data-nav="settings-nav" title="クラウド同期">☁</button>`
    : "";
  const planBadge = saasView !== "demo-select"
    ? `<span class="plan-badge">${planInfo().label}プラン</span>`
    : "";
  return `<header class="saas-topbar">
    <button class="saas-menu-btn" data-action="toggle-sidebar">☰</button>
    <span class="saas-topbar-title">${escapeHtml(title)}</span>
    ${cloudBtn}
    ${planBadge}
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

// ── 原材料マスタ ──────────────────────────────────────────────────────
function saveRawMaterials() {
  safeSet("fp-raw-materials", JSON.stringify(rawMaterials));
  // ingMaster（名前サジェスト）にも反映
  const names = rawMaterials.map(rm => rm.name).filter(Boolean);
  ingMaster = [...new Set([...names, ...ingMaster])].slice(0, 300);
  safeSet("food-label-ing-master", JSON.stringify(ingMaster));
}

function emptyRawMaterial() {
  return {
    id: uid(), name: "", labelName: "", maker: "", supplier: "",
    spec: "", contentAmount: "", contentUnit: "kg",
    purchasePrice: "", taxIncluded: false,
    nutrition: { kcal: "", protein: "", fat: "", carbs: "", salt: "" },
    allergens: [], additiveType: "",
    updatedAt: new Date().toLocaleDateString("ja-JP"),
    priceHistory: [],
  };
}

function calcUnitPrices(rm) {
  const amount = parseFloat(rm.contentAmount) || 0;
  const price  = parseFloat(rm.purchasePrice)  || 0;
  if (!amount || !price) return { perG: null, per100g: null, perKg: null };
  const unit = rm.contentUnit || "kg";
  let totalG = unit === "g" ? amount : unit === "kg" ? amount * 1000 : unit === "ml" ? amount : unit === "L" ? amount * 1000 : amount;
  if (!totalG) return { perG: null, per100g: null, perKg: null };
  const perG = price / totalG;
  return { perG, per100g: perG * 100, perKg: perG * 1000 };
}

function findAffectedProducts(rmId) {
  return products.filter(p => {
    const ings = p.ingredients || [];
    if (ings.some(i => i.masterId === rmId)) return true;
    const vers = p.recipeVersions || [];
    return vers.some(v => (v.ingredients || []).some(i => i.masterId === rmId));
  });
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

function calcCostsFromRecipe(ingredients, priceStr) {
  const ings = (ingredients || []).filter(i => i.name?.trim());
  const price = parseFloat(priceStr) || 0;
  let rawCost = 0;
  let linkedCount = 0;
  const lineItems = ings.map(i => {
    const rm = rawMaterials.find(r => r.id === i.masterId);
    const { perG } = rm ? calcUnitPrices(rm) : { perG: null };
    const w = parseFloat(i.weight) || 0;
    const cost = (perG !== null && w > 0) ? w * perG : null;
    if (cost !== null) { rawCost += cost; linkedCount++; }
    return { name: i.name, weight: w, cost, perG, rm: rm || null };
  });
  const gross = price - rawCost;
  const costRate   = price > 0 ? Math.round(rawCost / price * 100) : null;
  const profitRate = price > 0 ? Math.round(gross   / price * 100) : null;
  return { mode: "recipe", rawCost, packaging: 0, labor: 0, shipping: 0, other: 0, totalCost: rawCost, price, gross, costRate, profitRate, lineItems, linkedCount };
}

function calcCosts(p) {
  const mode  = p.costMode || "direct";
  const price = parseFloat(p.price) || 0;

  if (mode === "recipe") return calcCostsFromRecipe(p.ingredients, p.price);

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

// ── 商品健康診断スコア ──────────────────────────────────────────────────
function calcProductHealth(p, d) {
  const comp   = calcCompletion(p, d);
  const costs  = calcCosts(p);
  const tl     = loadTimeline(p.id);
  const issues = checkFoodLabel ? checkFoodLabel(p, d) : [];
  const sections = [];

  // ① ラベル完成度 30点
  const labelScore = Math.round(comp.pct * 0.3);
  sections.push({
    key: "label", label: "ラベル", icon: "🏷",
    score: labelScore, max: 30,
    issues: comp.missing.map(m => `「${m}」未入力`),
  });

  // ② 原価設定 20点
  let costScore = 0;
  const costIssues = [];
  if (costs.totalCost > 0) costScore += 8; else costIssues.push("原価未入力");
  if (costs.price > 0)     costScore += 6; else costIssues.push("販売価格未設定");
  const targetRate = parseFloat(p.targetCostRate || "") || null;
  if (targetRate && costs.costRate !== null) {
    if (costs.costRate <= targetRate) costScore += 6;
    else costIssues.push(`原価率 ${costs.costRate}% > 目標 ${targetRate}%`);
  } else {
    costScore += 6;
  }
  sections.push({ key:"cost", label:"原価", icon:"💰", score:costScore, max:20, issues:costIssues });

  // ③ 商品情報充実度 20点
  let infoScore = 0;
  const infoIssues = [];
  if (p.imageDataUrl)          infoScore += 6; else infoIssues.push("商品画像未登録");
  if (p.productMemo?.trim())   infoScore += 4; else infoIssues.push("商品概要未記入");
  if (p.janCode?.trim())       infoScore += 5; else infoIssues.push("JANコード未登録");
  if (p.specResponsible?.trim()) infoScore += 5; else infoIssues.push("担当者未設定");
  sections.push({ key:"info", label:"情報", icon:"ℹ️", score:infoScore, max:20, issues:infoIssues });

  // ④ 食品表示適合 15点
  const errCount  = issues.filter(i=>i.level==="error").length;
  const warnCount = issues.filter(i=>i.level==="warn").length;
  const checkScore = Math.max(0, 15 - errCount * 5 - warnCount * 2);
  const checkIssues = errCount > 0 ? [`表示エラー ${errCount}件`] : warnCount > 0 ? [`表示警告 ${warnCount}件`] : [];
  sections.push({ key:"check", label:"表示法", icon:"✅", score:checkScore, max:15, issues:checkIssues });

  // ⑤ 鮮度・AI活用 15点
  let freshnessScore = 0;
  const freshnessIssues = [];
  const now = new Date();
  const lastDate = p.updatedAt ? new Date(p.updatedAt.replace(/\//g,"-")) : null;
  const daysSince = lastDate && !isNaN(lastDate) ? Math.floor((now - lastDate) / 864e5) : 999;
  if (daysSince <= 30) freshnessScore += 7;
  else if (daysSince <= 90) { freshnessScore += 4; freshnessIssues.push(`最終更新 ${daysSince}日前`); }
  else freshnessIssues.push(`最終更新 ${daysSince}日前（要確認）`);

  const hasAiEvent = tl.some(e => (e.eventType||"").includes("ai") || (e.label||"").includes("AI") || (e.label||"").includes("提案"));
  if (hasAiEvent) freshnessScore += 8;
  else freshnessIssues.push("AIレビュー未実施");
  sections.push({ key:"freshness", label:"AI活用", icon:"🤖", score:freshnessScore, max:15, issues:freshnessIssues });

  const total  = sections.reduce((s,sec) => s + sec.score, 0);
  const stars  = total >= 90 ? 5 : total >= 75 ? 4 : total >= 60 ? 3 : total >= 40 ? 2 : 1;
  const gradeLabel = total >= 90 ? "優秀" : total >= 75 ? "良好" : total >= 60 ? "要改善" : total >= 40 ? "不足" : "要対応";
  const color  = total >= 90 ? "#16a34a" : total >= 75 ? "#2563eb" : total >= 60 ? "#ca8a04" : "#dc2626";
  const bg     = total >= 90 ? "#f0fdf4" : total >= 75 ? "#eff6ff" : total >= 60 ? "#fefce8" : "#fef2f2";
  const borderColor = total >= 90 ? "#bbf7d0" : total >= 75 ? "#bfdbfe" : total >= 60 ? "#fde68a" : "#fca5a5";
  return { total, sections, stars, gradeLabel, color, bg, borderColor };
}

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
      ${ing.name?.trim() ? `<button class="master-ing-cross" data-cross-search-ing="${escapeHtml(ing.name.trim())}" title="「${escapeHtml(ing.name.trim())}」を使用している全商品を確認（原材料クロス検索）">🔍</button>` : ""}
    </div>`).join("");

  const allergenHtml = d.allergens.length
    ? `<div class="check-result ok"><span class="cr-label">自動検出アレルゲン</span><div class="cr-body">${d.allergens.map(a => `<span class="allergen-chip">${escapeHtml(a)}</span>`).join("")}</div></div>`
    : `<p class="notice">アレルゲン該当なし（または未入力）</p>`;

  const sortHint = ings.filter(i => parseFloat(i.weight) > 0).length >= 2
    ? `<button class="action" data-action="sort-master-ing" style="margin-left:8px">重量順に並べ直す</button>`
    : "";
  const totalWeight = ings.reduce((s, i) => s + (parseFloat(i.weight) || 0), 0);
  const totalWeightBadge = totalWeight > 0
    ? `<span class="ing-total-weight-badge${Math.abs(totalWeight - 100) < 0.1 ? " ing-tw--exact" : totalWeight > 100 ? " ing-tw--over" : ""}"
         title="原材料の重量合計">合計 ${totalWeight % 1 === 0 ? totalWeight : totalWeight.toFixed(1)}g${Math.abs(totalWeight - 100) < 0.1 ? " ✓" : totalWeight > 100 ? " ⚠️超過" : ""}</span>`
    : "";

  return `
    <div class="detail-section">
      <h3 class="detail-section-title">原材料名（ラベル自動生成プレビュー）</h3>
      <div class="ing-label-preview">${escapeHtml(d.ingLabel || "（原材料を入力すると自動生成されます）")}</div>
    </div>
    <div class="detail-section">
      <div class="master-ing-section-hd">
        <h3 class="detail-section-title" style="margin:0">原材料を編集</h3>
        ${totalWeightBadge}
        ${sortHint}
      </div>
      <p class="field-hint">重量(g)を入力すると多い順に自動ソートされます。合計が100gになると栄養成分計算が最も正確になります。添加物は自動で「／」で区切られます。</p>
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

  // ── 目標原価率 + シミュレーター ──
  const targetRate = parseFloat(p.targetCostRate || "") || null;
  const curRate    = costs.costRate;
  const diff       = (targetRate !== null && curRate !== null) ? curRate - targetRate : null;
  const overTarget = diff !== null && diff > 0;
  // 目標原価率を達成するのに必要な販売価格
  const neededPrice = (targetRate !== null && costs.totalCost > 0)
    ? Math.ceil(costs.totalCost / (targetRate / 100)) : null;

  const targetFieldHtml = `
    <div class="cost-sim-bar">
      <label class="cost-sim-field">
        <span class="cost-sim-label">🎯 目標原価率</span>
        <div class="cost-sim-input-wrap">
          <input type="number" class="cost-sim-input" data-master-field="targetCostRate"
            value="${p.targetCostRate || ""}" placeholder="例: 30" min="1" max="99" step="1">
          <span class="cost-sim-pct">%</span>
        </div>
      </label>
      <div class="cost-sim-result ${targetRate !== null && curRate !== null ? (overTarget ? "cost-sim-over" : "cost-sim-ok") : ""}"
           id="ck-sim-result" style="${targetRate === null || curRate === null ? "display:none" : ""}">
        ${targetRate !== null && curRate !== null
          ? overTarget
            ? `⚠ 目標より <strong>+${diff}%</strong> 超過`
            : `✅ 目標達成（余裕 <strong>${Math.abs(diff)}%</strong>）`
          : ""}
      </div>
      <div class="cost-sim-needed">
        目標達成には <strong id="ck-needed-val">${neededPrice !== null ? "¥" + neededPrice.toLocaleString() : "—"}</strong> 以上で販売する必要があります
      </div>
    </div>
    <div class="cost-warn-banner" id="ck-warn-banner" style="${overTarget ? "" : "display:none"}">
      ⚠️ 現在の原価率 <strong>${curRate}%</strong> は目標 <strong>${targetRate}%</strong> を超えています。
      原材料費を削減するか、販売価格を <strong>¥${neededPrice?.toLocaleString() || "—"}</strong> 以上に引き上げてください。
    </div>`;

  // ── サマリー ──
  const fmt = (n) => n > 0 ? `¥${Math.round(n).toLocaleString()}` : "¥0";
  const summary = `<div class="cost-summary-v2">
    ${targetFieldHtml}
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

// ── アレルゲン管理表 ──────────────────────────────────────────────────
function allergenMatrixHtml() {
  const allergenNames = ALLERGEN_RULES.map(([name]) => name);
  const bigEight = new Set(["えび","かに","くるみ","小麦","そば","卵","乳","落花生"]);
  const phase = allergenMatrixPhase || "released";
  let list = phase === "all" ? products
    : phase === "development" ? products.filter(p => p.phase === "development")
    : products.filter(p => (p.phase || "released") === "released");
  list = list.filter(p => p.internalName || p.name);
  if (!list.length) {
    return saasLayout("アレルゲン管理表", `<div class="empty-state"><p>対象商品がありません。</p><button class="action" data-nav="products">商品管理へ</button></div>`);
  }
  const rows = list.map(p => {
    const ingNames = (p.ingredients || []).map(i => i.name).filter(Boolean);
    const detected = new Set(detectAllergens(ingNames));
    return { p, detected };
  });
  const phaseOpts = [{ id:"released", label:"発売中" }, { id:"development", label:"開発中" }, { id:"all", label:"全商品" }];
  const tableHtml = `<table class="am-table">
    <thead><tr>
      <th class="am-th-product">商品名</th>
      ${allergenNames.map(a => `<th class="am-th-allergen${bigEight.has(a)?" am-th-big8":""}">${escapeHtml(a)}</th>`).join("")}
    </tr></thead>
    <tbody>${rows.map(({ p, detected }) => `<tr>
      <td class="am-td-product"><button class="am-product-link" data-nav-product-detail="${escapeHtml(p.id)}">${escapeHtml(p.internalName||p.name||"名称未入力")}</button></td>
      ${allergenNames.map(a => `<td class="am-td-cell${detected.has(a)?" am-td-yes":""}">${detected.has(a)?"✓":""}</td>`).join("")}
    </tr>`).join("")}</tbody>
  </table>`;
  return saasLayout("アレルゲン管理表", `
    <div class="am-toolbar">
      <div class="am-toolbar-left">
        <div class="am-phase-tabs">${phaseOpts.map(o=>`<button class="am-phase-tab${phase===o.id?" active":""}" data-am-phase="${o.id}">${o.label}</button>`).join("")}</div>
        <span class="am-count">${rows.length}件</span>
      </div>
      <div class="am-toolbar-right">
        <button class="action" data-action="export-allergen-csv" title="アレルゲン管理表をCSVで出力">↓ CSV出力</button>
        <button class="action" data-action="print-allergen-matrix" title="印刷">🖨 印刷</button>
      </div>
    </div>
    <div class="am-legend">
      <span class="am-legend-chip am-legend-big8">■ 特定原材料8品目</span>
      <span class="am-legend-chip">□ 特定原材料に準ずるもの</span>
      <span class="am-legend-chip am-legend-yes">✓ 含む</span>
      <span class="am-legend-note">※ アレルゲン自動検出。原材料メーカー規格書で要確認。</span>
    </div>
    <div class="am-scroll-wrap">${tableHtml}</div>
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

  const reviewProductRow = (p) => `
    <div class="approval-product-row approval-product-row--review">
      <button class="approval-product-main" data-nav-product-detail="${escapeHtml(p.id)}" title="クリックで詳細を開く">
        <span class="approval-product-name">${escapeHtml(p.name||"（名称未入力）")}</span>
        ${p.assignedTo ? `<span class="approval-product-meta">依頼：${escapeHtml(p.assignedTo)}</span>` : ""}
        <span class="approval-product-date">${escapeHtml(p.approvalDate||p.updatedAt||"")}</span>
      </button>
      <div class="approval-quick-actions" onclick="event.stopPropagation()">
        <button class="approval-quick-approve" data-action="quick-approve" data-pid="${escapeHtml(p.id)}" title="承認する">✓ 承認</button>
        <button class="approval-quick-reject"  data-action="quick-reject"  data-pid="${escapeHtml(p.id)}" title="差し戻す">↩ 差戻</button>
      </div>
    </div>`;

  const productRow = (p) => `
    <div class="approval-product-row" data-nav-product-detail="${escapeHtml(p.id)}" role="button" tabindex="0">
      <span class="approval-product-name">${escapeHtml(p.name||"（名称未入力）")}</span>
      ${p.assignedTo ? `<span class="approval-product-meta">依頼：${escapeHtml(p.assignedTo)}</span>` : ""}
      ${p.approverName ? `<span class="approval-product-meta">承認：${escapeHtml(p.approverName)}</span>` : ""}
      <span class="approval-product-date">${escapeHtml(p.approvalDate||p.updatedAt||"")}</span>
    </div>`;

  const rejectedRow = (p) => `
    <div class="approval-product-row approval-product-row--rejected" data-nav-product-detail="${escapeHtml(p.id)}" role="button" tabindex="0">
      <span class="approval-product-name">${escapeHtml(p.name||"（名称未入力）")}</span>
      ${p.approverName ? `<span class="approval-product-meta">差し戻し：${escapeHtml(p.approverName)}</span>` : ""}
      <span class="approval-product-date">${escapeHtml(p.approvalDate||p.updatedAt||"")}</span>
      ${p.approvalComment ? `<span class="approval-reject-reason">💬 ${escapeHtml(p.approvalComment)}</span>` : ""}
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
        <div class="approval-section-hd">
          <h3>🔵 確認待ち（${reviewList.length}件）</h3>
          ${reviewList.length >= 2 ? `<button class="action primary" data-action="approve-all" style="font-size:12px;padding:5px 12px">✓ すべて承認（${reviewList.length}件）</button>` : ""}
        </div>
        ${reviewList.length ? reviewList.map(reviewProductRow).join("") : `<p class="notice">確認待ちの商品はありません。</p>`}
      </div>
      <div class="settings-card">
        <h3>✅ 承認済み（${approvedList.length}件）</h3>
        ${approvedList.length ? approvedList.map(productRow).join("") : `<p class="notice">承認済みの商品はありません。</p>`}
      </div>
      <div class="settings-card">
        <h3>↩ 差し戻し（${rejectedList.length}件）</h3>
        ${rejectedList.length ? rejectedList.map(rejectedRow).join("") : `<p class="notice">差し戻しの商品はありません。</p>`}
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
  // before-state snapshot for diff tracking
  const _before = {};
  Object.keys(TRACKED_MASTER_FIELDS).forEach(f => { _before[f] = p[f] ?? ""; });

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
  // diff tracking: compute changed fields with before/after values
  if (!isAuto) {
    const _changes = {};
    const _fields = [];
    Object.keys(TRACKED_MASTER_FIELDS).forEach(f => {
      const before = String(_before[f] ?? "");
      const after  = String(p[f] ?? "");
      if (before !== after) { _changes[f] = { from: before || "（未入力）", to: after || "（削除）" }; _fields.push(f); }
    });
    if (_fields.length) saveTimelineEvent(p.id, "field_changed", "✏️ 商品情報を更新", "", _fields, _changes);
  }
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
  { label: "消費期限と賞味期限の違いは？", key: "expiry_type" },
  { label: "OEM・PB商品の表示ルールは？", key: "oem_label" },
  { label: "コンタミネーション（交差汚染）の表示は？", key: "contamination" },
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
    case "expiry_type":
      return "## 📅 消費期限と賞味期限の違い\n\n| | 消費期限 | 賞味期限 |\n|---|---|---|\n| **対象** | 品質劣化が早い食品 | 品質が比較的安定した食品 |\n| **意味** | この日まで**安全に食べられる** | この日まで**おいしく食べられる** |\n| **代表例** | 弁当・サンドイッチ・生菓子 | 缶詰・スナック菓子・カップ麺 |\n| **期限後** | 廃棄推奨 | 品質が変化する可能性あり |\n\n**選び方の目安**\n- おおむね**5日以内**に品質が劣化する食品 → 消費期限\n- それ以上日持ちする食品 → 賞味期限\n\n**設定に必要なもの**\n- 微生物試験・理化学試験などの科学的根拠\n- 保管条件（温度・湿度）の明確化\n- 流通・販売期間を加味した安全係数の設定\n\n※ 期限設定は製品の安全性に直結します。食品衛生の専門家または試験機関に相談してください。";
    case "oem_label":
      return "## 🏭 OEM・PB商品の表示ルール\n\n**基本原則**：食品表示の「製造者」欄には**実際に製造した者**を記載します。\n\n**よくあるケース別の表示**\n\n| ケース | 表示方法 |\n|---|---|\n| 自社製造・自社ブランド | 「製造者」として自社名・住所 |\n| 他社製造・自社ブランド（OEM） | 「製造者」として**製造委託先**の名称・住所 |\n| 自社製造・小売PB | 「製造者」として**自社**の名称・住所（販売者が別途表示可） |\n| 輸入品 | 「輸入者」として**輸入業者**の名称・住所 |\n\n**販売者の表示について**\n- 製造者と販売者が異なる場合、「販売者」を追記することが可能（義務ではない）\n- 小売業者のPB商品では「販売者：○○スーパー」と「製造者：△△食品」を両方記載するケースが多い\n\n**注意点**\n- 製造委託先（OEM先）の同意が必要\n- 製造施設の衛生管理責任は製造者が負う\n- 契約書でアレルゲン管理・品質基準を明確化すること\n\n※ 具体的な表示内容は消費者庁「食品表示基準Q&A」や専門家にご確認ください。";
    case "contamination":
      return "## ⚠️ コンタミネーション（交差汚染）の表示\n\n**コンタミネーションとは**\n製造ラインや設備の共有により、意図せずアレルゲンが混入する可能性のこと。\n\n**表示の基本ルール**\n- 食品表示法では、**原材料として使用しているアレルゲンは義務表示**\n- コンタミネーションによる混入リスクの表示は**現時点で義務ではない**（任意表示）\n\n**任意表示の書き方例**\n```\n本製品は○○（アレルゲン名）を使用した設備で製造しています。\n```\n```\n本製品工場では○○を含む製品を製造しています。\n```\n\n**表示する際の注意**\n- 実際にリスクがない場合の「念のため」表示は**推奨されない**（消費者の誤解を招く）\n- リスクが実際にある場合は積極的に表示することが消費者保護につながる\n- 「微量含む可能性あり」と「含む」は意味が異なるため適切に使い分ける\n\n**製造ラインの管理**\n- アレルゲン管理手順書の整備\n- ライン洗浄・切替え時のアレルゲン検査\n- 製造順序の工夫（アレルゲンの少ない製品→多い製品の順）\n\n※ アレルゲン管理は製品の安全性に直結します。専門家への相談を推奨します。";
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
  { id: "photo",  icon: "📷", label: "写真から登録",   desc: "商品写真・裏面・パッケージをAIで解析して自動登録", badge: "おすすめ" },
  { id: "spec",   icon: "📄", label: "規格書から登録", desc: "PDF・Excel・Word の規格書をAIが解析して登録" },
  { id: "manual", icon: "✏️", label: "手動で登録",    desc: "手入力で商品情報を登録" },
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
        const ps = PRODUCT_STATUSES.find(s=>s.id===(p.productStatus||((p.phase||"released")==="development"?"draft":"on_sale")))||PRODUCT_STATUSES[0];
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
  const pi = planInfo();
  const remaining = pi.limit !== Infinity ? pi.limit - products.length : null;
  const limitBadge = remaining !== null && remaining <= 2
    ? `<span class="reg-limit-badge${remaining <= 0 ? " reg-limit-badge--full" : ""}">${remaining <= 0 ? "上限達成" : `残り${remaining}件`}</span>`
    : "";
  return `<div class="reg-btn-wrap">
    <button class="action primary reg-main-btn${remaining !== null && remaining <= 0 ? " reg-main-btn--disabled" : ""}" data-reg-toggle${remaining !== null && remaining <= 0 ? ' title="プランの上限に達しています"' : ""}>＋ 商品登録 ▾${limitBadge}</button>
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
        <p class="notice">💡 上のテンプレートボタンは即座に回答が得られます。テキストボックスへの自由入力でも詳細な食品表示アドバイスが受けられます。</p>
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
  // 目標原価率とのリアルタイム比較
  const targetRate = parseFloat(document.querySelector("[data-master-field='targetCostRate']")?.value) || null;
  const simResult  = $("ck-sim-result");
  const warnBanner = $("ck-warn-banner");
  const neededEl   = $("ck-needed-val");
  if (simResult && targetRate !== null && costRate !== null) {
    const diff = costRate - targetRate;
    const over = diff > 0;
    simResult.className = "cost-sim-result " + (over ? "cost-sim-over" : "cost-sim-ok");
    simResult.innerHTML = over
      ? `⚠ 目標より <strong>+${diff}%</strong> 超過`
      : `✅ 目標達成（余裕 <strong>${Math.abs(diff)}%</strong>）`;
    simResult.style.display = "";
    if (warnBanner) { warnBanner.style.display = over ? "" : "none"; }
  } else if (simResult) {
    simResult.style.display = "none";
  }
  if (neededEl && targetRate !== null && totalCost > 0) {
    const needed = Math.ceil(totalCost / (targetRate / 100));
    neededEl.textContent = "¥" + needed.toLocaleString();
  }
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
      saveTimelineEvent(p.id, "spec_updated", "🖼 商品画像を登録", "", ["imageDataUrl"]);
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

  // ローカル認証コード（モニター・テスター向け）
  const LOCAL_CODES = ["0000", "FOODPILOT", "MONITOR2026"];
  if (LOCAL_CODES.includes(code.toUpperCase())) {
    currentPlan = "trial";
    safeSet("food-label-plan", "trial");
    safeSet("food-label-license-key", code);
    setModules(["manage", "develop"]);
    showStatus("✓ モニタープランが有効になりました！（全機能無制限）", { duration: 5000 });
    render();
    return;
  }

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
    showStatus("コードが正しくありません。", { duration: 5000 });
    if (btn) { btn.disabled = false; btn.textContent = "参加する"; }
  }
}

// ── URLハッシュ ディープリンク ──────────────────────────────────────────
function syncHash() {
  if (view !== "saas") return;
  let hash = "dashboard";
  if (saasView === "product-detail" && productDetailId) {
    hash = `product/${productDetailId}`;
  } else if (saasView === "products") {
    hash = "products";
  } else if (saasView === "dev-products") {
    hash = "dev";
  }
  const target = `#${hash}`;
  if (location.hash !== target) history.replaceState(null, "", target);
}

function restoreFromHash() {
  const hash = (location.hash || "").slice(1);
  if (!hash || hash === "dashboard") {
    view = "saas"; saasView = saasView || "dashboard"; return;
  }
  if (hash === "products") { view = "saas"; saasView = "products"; return; }
  if (hash === "dev")      { view = "saas"; saasView = "dev-products"; return; }
  if (hash.startsWith("product/")) {
    const pid = hash.slice(8);
    if (products.find(x => x.id === pid)) {
      view = "saas"; saasView = "product-detail"; productDetailId = pid;
    }
  }
}

// trialプランなのに develop モジュールが未有効な場合は自動で付与
if (currentPlan === "trial" && !hasModule("develop")) {
  setModules(["manage", "develop"]);
}

restoreFromHash();
window.addEventListener("hashchange", () => { restoreFromHash(); render(); });

initTrial();       // トライアル開始日を記録（初回のみ）
render();
setupDelegation(); // ⑨ デリゲーション登録（起動時1回）
initCloudSync();   // ☁ クラウドから最新データをマージ（非同期・バックグラウンド）
initImageStorage(); // 🖼 IndexedDB画像の移行・復元（非同期）

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
