const NUTRITION_DB = {
  "米粉": { kcal: 356, protein: 6.0, fat: 0.7, carbs: 79.8, salt: 0 },
  "砂糖": { kcal: 384, protein: 0, fat: 0, carbs: 99.2, salt: 0 },
  "きび糖": { kcal: 382, protein: 0.1, fat: 0.1, carbs: 98.4, salt: 0 },
  "木綿豆腐": { kcal: 72, protein: 6.6, fat: 4.2, carbs: 1.6, salt: 0 },
  "絹ごし豆腐": { kcal: 56, protein: 4.9, fat: 3.0, carbs: 2.0, salt: 0 },
  "豆腐": { kcal: 56, protein: 4.9, fat: 3.0, carbs: 2.0, salt: 0 },
  "タピオカ粉": { kcal: 356, protein: 0.2, fat: 0.2, carbs: 87.8, salt: 0 },
  "ベーキングパウダー": { kcal: 100, protein: 0.5, fat: 0.5, carbs: 28, salt: 10 },
  "きな粉": { kcal: 437, protein: 36.7, fat: 25.7, carbs: 26.4, salt: 0 },
  "食塩": { kcal: 0, protein: 0, fat: 0, carbs: 0, salt: 99 },
  "塩": { kcal: 0, protein: 0, fat: 0, carbs: 0, salt: 99 },
  "アーモンドパウダー": { kcal: 609, protein: 18.6, fat: 54.1, carbs: 21, salt: 0 },
  "なたね油": { kcal: 921, protein: 0, fat: 100, carbs: 0, salt: 0 },
  "ショートニング": { kcal: 900, protein: 0, fat: 99.9, carbs: 0, salt: 0 },
  "小麦粉": { kcal: 368, protein: 8, fat: 1.5, carbs: 75.8, salt: 0 },
  "薄力粉": { kcal: 368, protein: 8, fat: 1.5, carbs: 75.8, salt: 0 },
  "強力粉": { kcal: 365, protein: 11.8, fat: 1.5, carbs: 71.7, salt: 0 },
  "バター": { kcal: 745, protein: 0.6, fat: 81, carbs: 0.2, salt: 1.9 },
  "卵": { kcal: 151, protein: 12.3, fat: 10.3, carbs: 0.3, salt: 0.4 },
  "牛乳": { kcal: 61, protein: 3.3, fat: 3.8, carbs: 4.8, salt: 0.1 },
  "生クリーム": { kcal: 433, protein: 2, fat: 45, carbs: 3.1, salt: 0.1 },
  "はちみつ": { kcal: 294, protein: 0.2, fat: 0, carbs: 79.7, salt: 0 },
  "片栗粉": { kcal: 338, protein: 0.1, fat: 0.1, carbs: 81.6, salt: 0 },
  "ごま": { kcal: 599, protein: 20.3, fat: 54.2, carbs: 18.5, salt: 0 },
  "黒糖": { kcal: 354, protein: 1.7, fat: 0, carbs: 89.7, salt: 0.1 },
  "オリーブ油": { kcal: 921, protein: 0, fat: 100, carbs: 0, salt: 0 },
  "豆乳": { kcal: 46, protein: 3.6, fat: 2, carbs: 3.1, salt: 0 },
  "乳化剤": { kcal: 0, protein: 0, fat: 0, carbs: 0, salt: 0 },
  "増粘剤": { kcal: 0, protein: 0, fat: 0, carbs: 0, salt: 0 },
  "味噌": { kcal: 198, protein: 12.5, fat: 6.0, carbs: 21.9, salt: 12.4 },
  "醤油": { kcal: 71, protein: 7.7, fat: 0, carbs: 7.9, salt: 14.5 },
  "しょうゆ": { kcal: 71, protein: 7.7, fat: 0, carbs: 7.9, salt: 14.5 },
  "みりん": { kcal: 241, protein: 0.3, fat: 0, carbs: 43.2, salt: 0 },
  "酒": { kcal: 109, protein: 0.4, fat: 0, carbs: 5.0, salt: 0 },
  "料理酒": { kcal: 109, protein: 0.4, fat: 0, carbs: 5.0, salt: 0 },
  "酢": { kcal: 25, protein: 0.1, fat: 0, carbs: 2.4, salt: 0 },
  "米酢": { kcal: 46, protein: 0.2, fat: 0, carbs: 7.4, salt: 0 },
  "コーンスターチ": { kcal: 354, protein: 0.8, fat: 0.7, carbs: 86.3, salt: 0 },
  "抹茶": { kcal: 324, protein: 29.6, fat: 5.3, carbs: 39.5, salt: 0 },
  "ココアパウダー": { kcal: 271, protein: 18.5, fat: 21.6, carbs: 18.5, salt: 0 },
  "チョコレート": { kcal: 558, protein: 6.9, fat: 34.1, carbs: 55.8, salt: 0.1 },
  "クリームチーズ": { kcal: 346, protein: 8.2, fat: 33.0, carbs: 2.3, salt: 0.7 },
  "コンデンスミルク": { kcal: 331, protein: 7.7, fat: 8.7, carbs: 56.3, salt: 0.3 },
  "ヨーグルト": { kcal: 62, protein: 3.6, fat: 3.0, carbs: 4.9, salt: 0.1 },
  "サワークリーム": { kcal: 260, protein: 2.4, fat: 25.0, carbs: 3.5, salt: 0.1 },
  "マーガリン": { kcal: 769, protein: 0.4, fat: 83.1, carbs: 0.5, salt: 1.3 },
  "ラード": { kcal: 898, protein: 0, fat: 99.7, carbs: 0, salt: 0 },
  "ごま油": { kcal: 921, protein: 0, fat: 100, carbs: 0, salt: 0 },
  "バニラエッセンス": { kcal: 230, protein: 0.1, fat: 0, carbs: 12.5, salt: 0 },
  "シナモン": { kcal: 364, protein: 3.9, fat: 1.2, carbs: 79.9, salt: 0 },
  "塩麹": { kcal: 65, protein: 2.0, fat: 0.5, carbs: 13.4, salt: 8.5 },
  "レモン汁": { kcal: 26, protein: 0.4, fat: 0.2, carbs: 8.6, salt: 0 },
  "りんごジュース": { kcal: 44, protein: 0.1, fat: 0.1, carbs: 10.9, salt: 0 },
  "くるみ": { kcal: 674, protein: 14.6, fat: 68.8, carbs: 11.7, salt: 0 },
  "カシューナッツ": { kcal: 576, protein: 19.8, fat: 47.6, carbs: 26.7, salt: 0 },
  "干しぶどう": { kcal: 301, protein: 2.7, fat: 0.2, carbs: 80.3, salt: 0 },
  "レーズン": { kcal: 301, protein: 2.7, fat: 0.2, carbs: 80.3, salt: 0 },
  "小豆": { kcal: 304, protein: 20.3, fat: 2.2, carbs: 40.9, salt: 0 },
  "こしあん": { kcal: 155, protein: 9.0, fat: 0.6, carbs: 32.5, salt: 0 },
  "粒あん": { kcal: 239, protein: 5.6, fat: 0.6, carbs: 54.0, salt: 0 },
  "白玉粉": { kcal: 369, protein: 6.3, fat: 1.0, carbs: 80.0, salt: 0 },
  "もち粉": { kcal: 369, protein: 6.3, fat: 1.0, carbs: 80.0, salt: 0 },
  "きな粉": { kcal: 437, protein: 36.7, fat: 25.7, carbs: 26.4, salt: 0 },
};

const FUZZY = [["上白糖", "砂糖"], ["グラニュー糖", "砂糖"], ["てんさい糖", "きび糖"], ["製菓用米粉", "米粉"], ["上新粉", "米粉"], ["アーモンド粉", "アーモンドパウダー"], ["菜種油", "なたね油"], ["サラダ油", "なたね油"], ["植物油", "なたね油"], ["マーガリン", "ショートニング"], ["小麦", "小麦粉"], ["卵白", "卵"], ["卵黄", "卵"], ["鶏卵", "卵"], ["蜂蜜", "はちみつ"], ["胡麻", "ごま"], ["脱脂粉乳", "牛乳"], ["スキムミルク", "牛乳"]];
const ADDITIVE_KW = ["ベーキングパウダー", "膨張剤", "膨脹剤", "乳化剤", "香料", "酸化防止剤", "着色料", "保存料", "増粘剤", "甘味料", "酸味料", "pH調整剤", "トレハロース", "ソルビトール", "加工澱粉", "加工でんぷん", "凝固剤", "安定剤", "ゲル化剤", "漂白剤", "防かび剤", "防カビ剤", "発色剤", "光沢剤", "豆腐用凝固剤", "にがり", "塩化マグネシウム", "グルコノデルタラクトン", "硫酸カルシウム", "調味料", "酵素", "苦味料", "軟化剤"];
const ALLERGEN_RULES = [
  ["えび", ["えび", "エビ", "海老"]], ["かに", ["かに", "カニ", "蟹"]], ["くるみ", ["くるみ", "クルミ", "胡桃"]],
  ["小麦", ["小麦", "薄力粉", "強力粉", "中力粉", "小麦粉", "全粒粉"]], ["そば", ["そば", "蕎麦"]],
  ["卵", ["卵", "たまご", "全卵", "卵白", "卵黄", "鶏卵"]], ["乳", ["乳", "牛乳", "ミルク", "バター", "チーズ", "クリーム", "ヨーグルト", "脱脂粉乳"]],
  ["落花生", ["落花生", "ピーナッツ"]], ["アーモンド", ["アーモンド"]], ["オレンジ", ["オレンジ"]], ["カシューナッツ", ["カシューナッツ"]],
  ["キウイフルーツ", ["キウイ"]], ["牛肉", ["牛肉", "ビーフ"]], ["ごま", ["ごま", "胡麻", "ゴマ"]],
  ["さけ", ["さけ", "鮭", "サーモン"]], ["さば", ["さば", "鯖"]], ["大豆", ["大豆", "豆腐", "きな粉", "味噌", "しょうゆ", "醤油", "豆乳", "納豆", "枝豆", "豆腐粉"]],
  ["鶏肉", ["鶏肉", "チキン"]], ["バナナ", ["バナナ"]], ["豚肉", ["豚肉", "ポーク", "ハム", "ベーコン"]],
  ["もも", ["もも", "桃", "ピーチ"]], ["やまいも", ["やまいも", "山芋", "長芋"]], ["りんご", ["りんご", "リンゴ", "林檎"]], ["ゼラチン", ["ゼラチン"]],
];
const STORAGE_OPTS = ["直射日光・高温多湿を避けて保存", "高温多湿を避けて保存", "常温保存", "冷蔵保存（10℃以下）", "冷凍保存（-18℃以下）", "自由入力"];
const MFR_TYPES = ["製造者", "販売者", "製造所", "加工者"];
const VOLUME_UNITS = ["個", "g", "袋", "本", "枚", "箱", "ml", "セット", "その他"];
const DATE_PRESETS = [
  ["today", "今日", 0],
  ["7d", "7日後", 7],
  ["14d", "14日後", 14],
  ["1m", "1か月後", 30],
  ["3m", "3か月後", 90],
];
const SIZE_PRESETS = [
  { label: "70×50mm", w: "70", h: "50", margin: "2", fs: "6.5" },
  { label: "90×60mm", w: "90", h: "60", margin: "3", fs: "7.5" },
  { label: "100×70mm", w: "100", h: "70", margin: "4", fs: "8" },
  { label: "A4シール用", w: "190", h: "277", margin: "10", fs: "10" },
  { label: "小袋用", w: "60", h: "40", margin: "2", fs: "6" },
  { label: "冷凍商品用", w: "90", h: "60", margin: "3", fs: "7" },
  { label: "自由サイズ", w: "90", h: "", margin: "3", fs: "7.5" },
];
const PLANS = {
  free: { label: "無料", price: "0円/月", limit: 1, note: "1商品まで無料" },
  starter: { label: "スタンダード", price: "980円/月", limit: 10, note: "月10商品まで保存・PDF出力" },
  pro: { label: "プロ", price: "1980円/月", limit: Infinity, note: "無制限" },
};

let products = loadProducts();
let draft = null;
let currentPlan = safeGet("food-label-plan") || "free";
let view = "saas";
let editId = null;
let printTarget = "both";
let printCfg = SIZE_PRESETS[1];
let renderTimer = null;
let printPreviewOpen = false;
let assistMessage = "";
let statusMessage = "";
let openSections = new Set(["商品情報", "原材料", "印刷・サイズ設定"]);
let autoSaveTimer = null;
let autoSaveStatus = "";
let previewZoom = 100;
let dragSrcIdx = null;
let recentStorage = JSON.parse(safeGet("food-label-recent-storage") || "[]");
let savedSearch = "";
let savedSort = "updatedAt";
let savedFilter = "all";
let selectedForPrint = new Set();
let ingMaster = JSON.parse(safeGet("food-label-ing-master") || "[]");
let mfrTemplates = JSON.parse(safeGet("food-label-mfr-templates") || "[]");
let printOffsetX = safeGet("food-label-offset-x") || "0";
let printOffsetY = safeGet("food-label-offset-y") || "0";
let globalHandlersBound = false;
let showTutorial = !safeGet("food-label-tutorial-done");
let tutorialStep = 0;
let showAiPanel = false;
let highlightField = null; // ジャンプ後に強調する field selector

// ── 食品商品管理クラウド 拡張状態 ──────────────────────────────────────
let saasView = safeGet("fmcc-view") || "dashboard";
let productDetailId = null;
let specSheetId = null;
let aiDescId = null;
let aiDescChannel = "rakuten";
let aiEditText = "";
let aiConsultProductId = null;
let aiConsultInput = "";
let aiConsultSending = false;
let registerMenuOpen = false;
let aiRegChatMessages = [];
let aiRegChatInput = "";
let aiRegChatStep = 0;
let aiRegChatDraft = {};
let aiRegAnalysisStep = -1;
let sidebarOpen = false;
let masterSearch = "";
let masterFilter = "all";

/* ── チュートリアル ── */
const TUTORIAL_STEPS = [
  { num: 1, title: "商品情報を入力", desc: "名称・内容量・賞味期限を入力してください。", hint: "左の「商品情報」セクションから始めましょう。" },
  { num: 2, title: "原材料・栄養成分を確認", desc: "原材料を追加すると栄養成分が自動計算されます。", hint: "重量(g)を入力すると計算精度が上がります。" },
  { num: 3, title: "右側でラベルを確認", desc: "入力内容がリアルタイムで右側のラベルに反映されます。", hint: "ズームボタンで拡大表示できます。" },
  { num: 4, title: "保存・印刷する", desc: "内容確認後、「保存する」ボタンで保存し「印刷プレビュー」から印刷できます。", hint: "Ctrl+S でも保存できます。" },
];
function tutorialHtml() {
  if (!showTutorial) return "";
  const s = TUTORIAL_STEPS[tutorialStep];
  const isLast = tutorialStep === TUTORIAL_STEPS.length - 1;
  return `<div class="tutorial-overlay">
    <div class="tutorial-card">
      <div class="tutorial-steps-indicator">${TUTORIAL_STEPS.map((_, i) => `<span class="tutorial-dot${i === tutorialStep ? " active" : i < tutorialStep ? " done" : ""}"></span>`).join("")}</div>
      <div class="tutorial-step-num">STEP ${s.num} / ${TUTORIAL_STEPS.length}</div>
      <h2 class="tutorial-title">${escapeHtml(s.title)}</h2>
      <p class="tutorial-desc">${escapeHtml(s.desc)}</p>
      <p class="tutorial-hint">💡 ${escapeHtml(s.hint)}</p>
      <div class="tutorial-actions">
        <button class="tutorial-skip" data-tutorial="skip">スキップ</button>
        ${tutorialStep > 0 ? `<button class="action" data-tutorial="prev">← 戻る</button>` : ""}
        ${isLast ? `<button class="action primary" data-tutorial="done">完了 ✓</button>` : `<button class="action primary" data-tutorial="next">次へ →</button>`}
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
    hist.unshift({ snapshot: JSON.parse(JSON.stringify(p)), savedAt: new Date().toLocaleString("ja-JP") });
    safeSet(key, JSON.stringify(hist.slice(0, 5)));
  } catch {}
}
function loadHistory(id) {
  try { return JSON.parse(safeGet(`food-label-history-${id}`) || "[]"); } catch { return []; }
}
function exportCsv() {
  const headers = ["id", "name", "volume", "bestBefore", "storage", "storageCustom", "manufacturerName", "manufacturerAddress", "manufacturerPhone", "manufacturerPostal", "janCode", "updatedAt"];
  const rows = products.map((p) => headers.map((h) => `"${String(p[h] || "").replace(/"/g, '""')}"`).join(","));
  const csv = [headers.join(","), ...rows].join("\r\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "food-labels.csv"; a.click();
  URL.revokeObjectURL(url);
  showStatus("CSVをエクスポートしました");
}
function importCsvFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const text = e.target.result.replace(/^﻿/, "");
      const lines = text.split(/\r?\n/).filter(Boolean);
      if (lines.length < 2) { showStatus("CSVが空または形式が不正です"); return; }
      const headers = lines[0].split(",").map((h) => h.replace(/^"|"$/g, "").trim());
      const nameIdx = headers.indexOf("name");
      if (nameIdx === -1) { showStatus("CSVにnameカラムが必要です"); return; }
      let added = 0;
      lines.slice(1).forEach((line) => {
        const cols = [];
        let cur = ""; let inQ = false;
        for (const ch of line) { if (ch === '"') { inQ = !inQ; } else if (ch === "," && !inQ) { cols.push(cur.trim()); cur = ""; } else { cur += ch; } }
        cols.push(cur.trim());
        const row = {};
        headers.forEach((h, i) => { row[h] = cols[i] || ""; });
        if (!row.name) return;
        const p = emptyProduct();
        Object.assign(p, row, { id: uid(), starred: false, ingredients: [{ id: uid(), name: "", weight: "" }] });
        products = [p, ...products];
        added++;
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
  style.textContent = `@media print { body>*{display:none!important} #batch-print-frame{display:block!important;position:fixed;inset:0;background:#fff;padding:${printCfg.margin||3}mm} .label-paper{width:${printCfg.w||90}mm!important;font-size:${printCfg.fs||7.5}pt!important;break-inside:avoid} }`;
  const frame = document.createElement("div"); frame.id = "batch-print-frame"; frame.innerHTML = `<style>${style.textContent.replace(/@media print \{|\}/g,"")}</style>${html}`;
  document.body.appendChild(frame); document.head.appendChild(style);
  window.print();
  setTimeout(() => { frame.remove(); style.remove(); }, 1200);
}
function showStatus(message) {
  statusMessage = message;
  render();
  setTimeout(() => {
    if (statusMessage === message) {
      statusMessage = "";
      render();
    }
  }, 2200);
}

function uid() { return Math.random().toString(36).slice(2, 9); }
function escapeHtml(s = "") { return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])); }
function safeGet(key) {
  try { return localStorage.getItem(key); }
  catch { return ""; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); }
  catch {}
}
function emptyProduct() {
  return {
    id: uid(), name: "", internalName: "", volume: "", volumeCustomUnit: false, bestBefore: "", serving: "", janCode: "",
    storage: STORAGE_OPTS[0], storageCustom: "",
    ingredients: [{ id: uid(), name: "", weight: "" }],
    nutritionMode: "auto", nutritionManual: { kcal: "", protein: "", fat: "", carbs: "", salt: "" },
    allergensMode: "auto", allergensManual: "",
    contaminationEnabled: false, contaminationAllergens: "", contaminationText: "",
    manufacturerType: "製造者", manufacturerTypes: ["製造者"], manufacturerName: "", manufacturerPostal: "", manufacturerAddress: "", manufacturerPhone: "",
    starred: false,
    updatedAt: new Date().toLocaleDateString("ja-JP"),
  };
}
function loadProducts() {
  try {
    const saved = JSON.parse(safeGet("food-label-products-static"));
    return Array.isArray(saved) ? saved.filter((p) => p.id !== "demo1") : [];
  }
  catch { return []; }
}
function saveProducts() { safeSet("food-label-products-static", JSON.stringify(products)); }
function estimateNutrition(name) {
  const t = name.trim();
  if (!t) return null;
  if (NUTRITION_DB[t]) return { data: NUTRITION_DB[t], estimated: false, key: t };
  for (const [kw, dk] of FUZZY) if (t.includes(kw) || kw.includes(t)) return { data: NUTRITION_DB[dk], estimated: true, key: dk };
  for (const [k, d] of Object.entries(NUTRITION_DB)) if (t.includes(k) || k.includes(t)) return { data: d, estimated: true, key: k };
  return { data: { kcal: 320, protein: 5, fat: 8, carbs: 55, salt: 0.3 }, estimated: true, key: "一般加工食品" };
}
function isAdditive(name) { return ADDITIVE_KW.some((k) => name.includes(k)); }
function calcNutrition(ingredients) {
  const sum = { kcal: 0, protein: 0, fat: 0, carbs: 0, salt: 0 };
  let total = 0, hasEst = false;
  ingredients.forEach((i) => {
    const w = parseFloat(i.weight) || 0;
    if (!i.name.trim() || w === 0) return;
    const est = estimateNutrition(i.name);
    total += w;
    if (est.estimated) hasEst = true;
    sum.kcal += est.data.kcal * w / 100;
    sum.protein += est.data.protein * w / 100;
    sum.fat += est.data.fat * w / 100;
    sum.carbs += est.data.carbs * w / 100;
    sum.salt += est.data.salt * w / 100;
  });
  if (!total) return { kcal: 0, protein: 0, fat: 0, carbs: 0, salt: 0, hasEst };
  const f = 100 / total;
  return { kcal: Math.round(sum.kcal * f), protein: Math.round(sum.protein * f * 10) / 10, fat: Math.round(sum.fat * f * 10) / 10, carbs: Math.round(sum.carbs * f * 10) / 10, salt: Math.round(sum.salt * f * 100) / 100, hasEst };
}
function detectAllergens(names) {
  const found = new Set();
  names.forEach((n) => {
    const lower = n.toLowerCase();
    ALLERGEN_RULES.forEach(([a, kws]) => { if (kws.some((kw) => lower.includes(kw.toLowerCase()))) found.add(a); });
  });
  return [...found];
}
function buildIngLabel(ingredients) {
  const named = ingredients.filter((i) => i.name.trim());
  const withW = named.filter((i) => (parseFloat(i.weight) || 0) > 0).sort((a, b) => (parseFloat(b.weight) || 0) - (parseFloat(a.weight) || 0));
  const noW = named.filter((i) => !((parseFloat(i.weight) || 0) > 0));
  const sorted = [...withW, ...noW];
  const normal = sorted.filter((i) => !isAdditive(i.name)).map((i) => i.name).join("、");
  const add = sorted.filter((i) => isAdditive(i.name)).map((i) => i.name).join("、");
  if (!normal && !add) return "";
  if (!add) return normal;
  if (!normal) return `／${add}`;
  return `${normal}／${add}`;
}
function stripOrigin(text) {
  return String(text || "").replace(/[（(][^）)]*[）)]/g, "").trim();
}
function derive(p) {
  const autoNutrition = calcNutrition(p.ingredients);
  const nutrition = p.nutritionMode === "manual" ? { ...autoNutrition, ...p.nutritionManual } : autoNutrition;
  const autoAllergens = detectAllergens(p.ingredients.map((i) => i.name).filter(Boolean));
  const allergens = p.allergensMode === "manual" ? (p.allergensManual || "").split(/[、,・\s]+/).filter(Boolean) : autoAllergens;
  const contamination = buildContaminationText(p);
  return { autoNutrition, nutrition, autoAllergens, allergens, contamination, ingLabel: buildIngLabel(p.ingredients), storage: p.storage === "自由入力" ? p.storageCustom : p.storage };
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
  const m = String(value || "").trim().match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/);
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

function showModal({ message, confirmLabel = "OK", cancelLabel = null, onConfirm, onCancel }) {
  document.querySelector(".app-modal")?.remove();
  const modal = document.createElement("div");
  modal.className = "app-modal";
  modal.innerHTML = `
    <div class="app-modal-card">
      <p class="app-modal-msg">${escapeHtml(message)}</p>
      <div class="app-modal-actions">
        ${cancelLabel ? `<button class="action app-modal-cancel">${escapeHtml(cancelLabel)}</button>` : ""}
        <button class="action primary app-modal-confirm">${escapeHtml(confirmLabel)}</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  const close = () => modal.remove();
  modal.querySelector(".app-modal-confirm").addEventListener("click", () => { close(); onConfirm?.(); });
  modal.querySelector(".app-modal-cancel")?.addEventListener("click", () => { close(); onCancel?.(); });
  modal.addEventListener("click", (e) => { if (e.target === modal) { close(); onCancel?.(); } });
}

function focusKey(el) {
  if (!el) return null;
  if (el.dataset.field) return `[data-field="${el.dataset.field}"]`;
  if (el.dataset.ingField && el.closest("[data-ing-id]")) return `[data-ing-id="${el.closest("[data-ing-id]").dataset.ingId}"] [data-ing-field="${el.dataset.ingField}"]`;
  if (el.id) return `#${el.id}`;
  return null;
}
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
  document.getElementById("root").innerHTML = `${pageHtml}${statusMessage ? `<div class="status-toast">${escapeHtml(statusMessage)}</div>` : ""}${tutorialHtml()}`;
  bindEvents();
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
  renderTimer = setTimeout(render, 250);
}
function scheduleAutoSave() {
  if (view !== "edit") return;
  autoSaveStatus = "編集中";
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    const p = currentProduct();
    if (!p || !p.name?.trim()) return;
    autoSaveStatus = "保存中";
    render();
    setTimeout(() => { saveCurrent(); autoSaveStatus = "保存済み"; render(); }, 300);
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
      <h1 class="home-hero-title">食品表示ラベルを<br>かんたん作成</h1>
      <p class="home-hero-sub">食品表示ラベルの作成・保存・再印刷を一元管理</p>
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
  return `<section class="plan-panel">
    <div class="plan-title"><b>プランを選択</b><span>いつでも変更できます</span></div>
    <div class="plan-grid">${Object.entries(PLANS).map(([id, p]) => `
      <button class="plan-card${currentPlan === id ? " selected" : ""}${id === POPULAR ? " popular" : ""}" data-plan="${id}">
        ${id === POPULAR ? `<span class="popular-badge">人気</span>` : ""}
        <strong class="plan-name">${p.label}</strong>
        <em class="plan-price">${p.price}</em>
        <small class="plan-note">${p.note}</small>
        ${currentPlan === id ? `<span class="plan-check">✓ 選択中</span>` : ""}
      </button>`).join("")}
    </div>
  </section>`;
}
function menuHtml() {
  return `<main class="home menu-page">
    <div class="menu-head"><button class="back" data-action="plan-page">← プラン変更</button><span class="plan-badge">${planInfo().label}プラン</span></div>
    <div class="home-hero">
      <h1 class="home-hero-title">食品表示ラベルを<br>かんたん作成</h1>
      <p class="home-hero-sub">食品表示ラベルの作成・保存・再印刷を一元管理</p>
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
  return `<header class="topbar"><button class="back" data-action="back-to-saas">← 商品管理</button><h1>${escapeHtml(title)}</h1><div class="topbar-right">${saveStatusHtml}${statusMessage ? `<span class="toast">${escapeHtml(statusMessage)}</span>` : ""}<span class="plan-badge">${planInfo().label}</span>${showSave ? `<button class="action primary" data-action="save">保存</button>` : ""}</div></header>`;
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
          ${batchBtn}
        </div>
      </div>
      <div class="product-grid">
        ${filtered.length === 0
          ? `<p class="empty-msg">該当する商品がありません</p>`
          : filtered.map((p) => {
              const d = derive(p);
              const sel = selectedForPrint.has(p.id);
              return `<article class="product-card${sel ? " sel-print" : ""}">
                <div class="card-top-row">
                  <label class="card-check-wrap"><input type="checkbox" data-sel-print="${escapeHtml(p.id)}"${sel ? " checked" : ""}><span>選択</span></label>
                  <button class="star-btn${p.starred ? " on" : ""}" data-toggle-star="${escapeHtml(p.id)}" title="お気に入り">${p.starred ? "★" : "☆"}</button>
                </div>
                <h3>${escapeHtml(p.name || "（名称未入力）")}</h3>
                <p class="card-meta">更新: ${escapeHtml(p.updatedAt || "")} ／ 内容量: ${escapeHtml(p.volume || "未入力")}</p>
                <div class="chips">${(d.allergens || []).slice(0, 5).map((a) => `<span>${escapeHtml(a)}</span>`).join("")}</div>
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
  return `<div class="page">${headerHtml(p.name || "新商品ラベル作成")}
    <div class="editor-shell">
      <div class="form-column">
        ${completionHtml}
        ${section("商品情報", productInfoHtml(p))}
        ${janCodeHtml(p)}
        ${section("保存方法", storageHtml)}
        ${section("原材料", `<div class="ing-list" id="ing-list">${p.ingredients.map((i, idx) => ingredientHtml(i, idx)).join("")}</div><button class="action" data-action="add-ing">＋ 原材料を追加</button>`)}
        ${nutritionEditorHtml(p, d)}
        ${allergenEditorHtml(p, d)}
        ${contaminationEditorHtml(p)}
        ${labelAssistHtml(p, d)}
        ${manufacturerEditorHtml(p)}
        ${section("印刷・サイズ設定", printSettingsBodyHtml())}
        ${historyHtml(p)}
        <datalist id="ing-master-list">${ingMaster.map((n) => `<option value="${escapeHtml(n)}">`).join("")}</datalist>
      </div>
      <div class="preview-column">${previewHtml(p, d)}</div>
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
function historyHtml(p) {
  const hist = loadHistory(p.id);
  if (!hist.length) return "";
  return section("変更履歴", `<div class="history-list">${hist.map((h, i) => `<div class="history-row"><span class="history-date">${escapeHtml(h.savedAt)}</span><button class="action" data-restore-history="${i}" data-history-pid="${escapeHtml(p.id)}">この時点に戻す</button></div>`).join("")}</div>`);
}
function productInfoHtml(p) {
  const volume = splitVolume(p.volume);
  const isCustomUnit = !!p.volumeCustomUnit || (!!volume.unit && !VOLUME_UNITS.includes(volume.unit));
  const activeUnit = isCustomUnit ? "その他" : (volume.unit || "個");
  const dateValue = toDateInputValue(p.bestBefore);
  return `<div class="two-col">
      <label class="field"><span>社内名称<span class="field-note">管理用・ラベル非表示</span></span><input data-field="internalName" value="${escapeHtml(p.internalName||"")}" placeholder="例：ドーナツ プレーン"></label>
      <label class="field"><span>名称（表示名）<b>必須</b></span><input data-field="name" value="${escapeHtml(p.name)}" placeholder="例：油菓子"></label>
    </div>
    <div class="two-col">
      <div class="field"><span>内容量</span><div class="volume-input"><input inputmode="decimal" data-volume-amount value="${escapeHtml(volume.amount)}" placeholder="例：6"><div class="unit-tabs">${VOLUME_UNITS.map((u) => `<button class="${activeUnit === u ? "selected" : ""}" data-volume-unit="${escapeHtml(u)}">${escapeHtml(u)}</button>`).join("")}</div>${activeUnit === "その他" ? `<input data-volume-custom-unit value="${escapeHtml(isCustomUnit ? volume.unit : "")}" placeholder="単位を入力 例：ホール・パック・瓶">` : ""}</div></div>
      <div class="field"><span>賞味期限</span><input type="date" data-date-input value="${escapeHtml(dateValue)}"><div class="unit-tabs date-tabs">${DATE_PRESETS.map(([id, label]) => `<button data-date-preset="${id}">${escapeHtml(label)}</button>`).join("")}</div></div>
    </div>`;
}
function ingredientHtml(i, idx) {
  const est = i.name && i.weight ? estimateNutrition(i.name) : null;
  return `<div class="ing-row" draggable="true" data-ing-idx="${idx}">
    <span class="drag-handle" title="ドラッグで並び替え">⠿</span>
    <input list="ing-master-list" data-ing-name="${idx}" value="${escapeHtml(i.name)}" placeholder="原材料名">
    <input type="number" data-ing-weight="${idx}" value="${escapeHtml(i.weight)}" placeholder="g">
    <div class="badges">${isAdditive(i.name) ? `<b class="violet">添加物</b>` : ""}${est ? `<b class="${est.estimated ? "amber" : "green"}">${est.estimated ? "推定" : "DB"}</b>` : ""}</div>
    <button class="icon-btn" data-remove-ing="${idx}">×</button>
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
  return section("栄養成分表示", `<div class="mode-row"><button class="${p.nutritionMode !== "manual" ? "selected" : ""}" data-nutr-mode="auto">自動計算</button><button class="${p.nutritionMode === "manual" ? "selected" : ""}" data-nutr-mode="manual">自分で編集</button></div><div class="nutrition-grid">${row("kcal", "エネルギー", "kcal")}${row("protein", "たんぱく質", "g")}${row("fat", "脂質", "g")}${row("carbs", "炭水化物", "g")}${row("salt", "食塩相当量", "g")}</div>${d.autoNutrition.hasEst ? `<p class="notice">一部の原材料は近い食品成分データで推定しています。</p>` : ""}`, true);
}
function allergenEditorHtml(p, d) {
  return section("自動検出アレルゲン", `<div class="mode-row"><button class="${p.allergensMode !== "manual" ? "selected" : ""}" data-alg-mode="auto">自動検出</button><button class="${p.allergensMode === "manual" ? "selected" : ""}" data-alg-mode="manual">自分で編集</button></div>${p.allergensMode === "manual" ? `<input class="wide-input" data-field="allergensManual" value="${escapeHtml(p.allergensManual || "")}" placeholder="例：小麦、卵、乳">` : `<div class="chips allergen">${d.autoAllergens.length ? d.autoAllergens.map((a) => `<span>${escapeHtml(a)}</span>`).join("") : "<em>検出なし</em>"}</div>`}`);
}
function contaminationEditorHtml(p) {
  return section("コンタミネーション", `<div class="mode-row"><button class="${!p.contaminationEnabled ? "selected" : ""}" data-contamination="off">表示しない</button><button class="${p.contaminationEnabled ? "selected" : ""}" data-contamination="on">表示する</button></div>${p.contaminationEnabled ? `<label class="field"><span>対象アレルゲン</span><input data-field="contaminationAllergens" value="${escapeHtml(p.contaminationAllergens || "")}" placeholder="例：小麦、卵、乳成分"></label><label class="field"><span>表示文</span><input data-field="contaminationText" value="${escapeHtml(p.contaminationText || "")}" placeholder="例：本品製造工場では、小麦・卵・乳成分を含む製品を製造しています。"></label><p class="notice">表示文が空の場合、対象アレルゲンから定型文を作ります。</p>` : `<p class="notice">同じ工場・同じラインで扱うアレルゲンがある場合に使います。</p>`}`);
}
function labelAssistHtml(p, d) {
  const checks = labelChecklist(p, d);
  const okCount = checks.filter((c) => c.ok).length;
  return section("表示チェックリスト", `
    <div class="assist-actions">
      <button class="action primary" data-action="normalize-label">食品表示向けに整える</button>
      <button class="action ai-consult-btn" data-action="open-ai-panel">💬 AIに相談</button>
    </div>
    ${assistMessage ? `<p class="notice success">${escapeHtml(assistMessage)}</p>` : ""}
    <div class="checklist-summary"><span>${okCount} / ${checks.length} 項目OK</span>${okCount < checks.length ? `<span class="checklist-warn-hint">⬇ 要確認項目をクリックで該当欄へジャンプ</span>` : ""}</div>
    <div class="check-list">${checks.map((item) => `<div class="${item.ok ? "check-ok" : "check-warn check-jumpable"}" ${!item.ok ? `data-jump-label="${escapeHtml(item.label)}" title="クリックで該当欄へ移動"` : ""}><b>${item.ok ? "✓" : "!"}</b><span>${escapeHtml(item.label)}</span></div>`).join("")}</div>
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
  selectedMfrTypes(p).forEach((type) => rows.push([type, maker || "ー"]));
  if (d.allergens.length) rows.push(["アレルゲン", `${d.allergens.join("・")}を含む`]);
  const barcode = canUseJanCode() ? janBarcodeSvg(p.janCode) : "";
  return `<div class="label-paper basic-label"><table><tbody>${rows.map(([k, v]) => `<tr><th>${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}</tbody></table>${barcode ? `<div class="label-barcode-footer"><div class="barcode-title">JANコード</div>${barcode}</div>` : ""}</div>`;
}
function nutritionLabelHtml(d) {
  const n = d.nutrition;
  return `<div class="label-paper nutrition-label"><h3>栄養成分表示</h3><p>100g当たり</p><table><tbody>
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

function bindEvents() {
  document.querySelectorAll("[data-action='new']").forEach((el) => el.addEventListener("click", () => {
    if (!canCreateMore()) {
      showModal({ message: `${planInfo().label}プランは${planInfo().note}です。プランを変更してください。` });
      return;
    }
    assistMessage = "";
    draft = emptyProduct();
    editId = "new";
    view = "edit";
    render();
  }));
  document.querySelectorAll("[data-plan]").forEach((el) => el.addEventListener("click", () => {
    currentPlan = el.dataset.plan;
    safeSet("food-label-plan", currentPlan);
    render();
  }));
  document.querySelectorAll("[data-action='menu']").forEach((el) => el.addEventListener("click", () => {
    view = "menu";
    editId = null;
    draft = null;
    render();
  }));
  document.querySelectorAll("[data-action='plan-page']").forEach((el) => el.addEventListener("click", () => {
    view = "home";
    editId = null;
    draft = null;
    render();
  }));
  document.querySelectorAll("[data-action='saved']").forEach((el) => el.addEventListener("click", () => {
    view = "saved";
    render();
  }));
  document.querySelectorAll("[data-action='home']").forEach((el) => el.addEventListener("click", () => {
    view = "menu";
    editId = null;
    draft = null;
    assistMessage = "";
    render();
  }));
  document.querySelectorAll("[data-action='save']").forEach((el) => el.addEventListener("click", saveCurrent));
  document.querySelectorAll("[data-edit]").forEach((el) => el.addEventListener("click", () => {
    editId = el.dataset.edit;
    view = "edit";
    assistMessage = "";
    render();
  }));
  document.querySelectorAll("[data-print]").forEach((el) => el.addEventListener("click", () => {
    editId = el.dataset.print;
    view = "edit";
    render();
  }));
  document.querySelectorAll("[data-dup]").forEach((el) => el.addEventListener("click", () => {
    if (!canCreateMore()) {
      showModal({ message: `${planInfo().label}プランは${planInfo().note}です。プランを変更してください。` });
      return;
    }
    const source = products.find((p) => p.id === el.dataset.dup);
    if (!source) return;
    products = [{ ...structuredClone(source), id: uid(), name: `${source.name}（複製）`, updatedAt: new Date().toLocaleDateString("ja-JP"), ingredients: source.ingredients.map((i) => ({ ...i, id: uid() })) }, ...products];
    saveProducts();
    render();
  }));
  document.querySelectorAll("[data-del]").forEach((el) => el.addEventListener("click", () => {
    showModal({
      message: "削除してよろしいですか？",
      confirmLabel: "削除",
      cancelLabel: "キャンセル",
      onConfirm: () => {
        products = products.filter((p) => p.id !== el.dataset.del);
        saveProducts();
        render();
      },
    });
  }));
  document.querySelectorAll("[data-field]").forEach((el) => el.addEventListener("input", () => {
    const p = currentProduct();
    p[el.dataset.field] = el.value;
    scheduleAutoSave();
  }));
  document.querySelectorAll("[data-field]").forEach((el) => el.addEventListener("change", () => {
    const p = currentProduct();
    p[el.dataset.field] = el.value;
    scheduleRender();
  }));
  document.querySelectorAll("[data-volume-amount]").forEach((el) => el.addEventListener("input", () => {
    const p = currentProduct();
    const { unit } = splitVolume(p.volume);
    p.volume = buildVolume(el.value, p.volumeCustomUnit ? unit : (unit || "個"));
  }));
  document.querySelectorAll("[data-volume-amount]").forEach((el) => el.addEventListener("change", () => {
    const p = currentProduct();
    const { unit } = splitVolume(p.volume);
    p.volume = buildVolume(el.value, p.volumeCustomUnit ? unit : (unit || "個"));
    scheduleRender();
  }));
  document.querySelectorAll("[data-volume-unit]").forEach((el) => el.addEventListener("click", () => {
    const p = currentProduct();
    const { amount } = splitVolume(p.volume);
    p.volumeCustomUnit = el.dataset.volumeUnit === "その他";
    p.volume = buildVolume(amount, el.dataset.volumeUnit === "その他" ? "" : el.dataset.volumeUnit);
    render();
  }));
  document.querySelectorAll("[data-volume-custom-unit]").forEach((el) => el.addEventListener("input", () => {
    const p = currentProduct();
    const { amount } = splitVolume(p.volume);
    p.volumeCustomUnit = true;
    p.volume = buildVolume(amount, el.value);
  }));
  document.querySelectorAll("[data-volume-custom-unit]").forEach((el) => el.addEventListener("change", () => {
    const p = currentProduct();
    const { amount } = splitVolume(p.volume);
    p.volumeCustomUnit = true;
    p.volume = buildVolume(amount, el.value);
    render();
  }));
  document.querySelectorAll("[data-date-input]").forEach((el) => el.addEventListener("change", () => {
    currentProduct().bestBefore = dateInputToLabel(el.value);
    render();
  }));
  document.querySelectorAll("[data-date-preset]").forEach((el) => el.addEventListener("click", () => {
    const preset = DATE_PRESETS.find(([id]) => id === el.dataset.datePreset);
    if (!preset) return;
    currentProduct().bestBefore = presetDateValue(preset[2]);
    render();
  }));
  document.querySelectorAll("[data-storage]").forEach((el) => el.addEventListener("click", () => {
    const s = el.dataset.storage;
    updateCurrent("storage", s);
    if (s !== "自由入力") {
      recentStorage = [s, ...recentStorage.filter((x) => x !== s)].slice(0, 3);
      safeSet("food-label-recent-storage", JSON.stringify(recentStorage));
    }
  }));
  document.querySelectorAll("[data-mfr]").forEach((el) => el.addEventListener("click", () => {
    const p = currentProduct();
    const current = selectedMfrTypes(p);
    const type = el.dataset.mfr;
    const next = current.includes(type) ? current.filter((x) => x !== type) : [...current, type];
    p.manufacturerTypes = next.length ? next : [type];
    p.manufacturerType = p.manufacturerTypes[0];
    render();
  }));
  document.querySelectorAll("[data-action='add-ing']").forEach((el) => el.addEventListener("click", () => {
    const p = currentProduct();
    p.ingredients.push({ id: uid(), name: "", weight: "" });
    render();
  }));
  document.querySelectorAll("[data-ing-name]").forEach((el) => el.addEventListener("input", () => {
    currentProduct().ingredients[Number(el.dataset.ingName)].name = el.value;
  }));
  document.querySelectorAll("[data-ing-name]").forEach((el) => el.addEventListener("change", () => {
    currentProduct().ingredients[Number(el.dataset.ingName)].name = el.value;
    scheduleRender();
  }));
  document.querySelectorAll("[data-ing-weight]").forEach((el) => el.addEventListener("input", () => {
    currentProduct().ingredients[Number(el.dataset.ingWeight)].weight = el.value;
  }));
  document.querySelectorAll("[data-ing-weight]").forEach((el) => el.addEventListener("change", () => {
    currentProduct().ingredients[Number(el.dataset.ingWeight)].weight = el.value;
    scheduleRender();
  }));
  document.querySelectorAll("[data-remove-ing]").forEach((el) => el.addEventListener("click", () => {
    const p = currentProduct();
    p.ingredients.splice(Number(el.dataset.removeIng), 1);
    if (!p.ingredients.length) p.ingredients.push({ id: uid(), name: "", weight: "" });
    render();
  }));
  document.querySelectorAll("[data-nutr-mode]").forEach((el) => el.addEventListener("click", () => {
    const p = currentProduct();
    if (el.dataset.nutrMode === "manual") p.nutritionManual = { ...derive(p).autoNutrition };
    p.nutritionMode = el.dataset.nutrMode;
    render();
  }));
  document.querySelectorAll("[data-nutr]").forEach((el) => el.addEventListener("input", () => {
    const p = currentProduct();
    p.nutritionManual = { ...p.nutritionManual, [el.dataset.nutr]: el.value };
  }));
  document.querySelectorAll("[data-nutr]").forEach((el) => el.addEventListener("change", () => {
    const p = currentProduct();
    p.nutritionManual = { ...p.nutritionManual, [el.dataset.nutr]: el.value };
    scheduleRender();
  }));
  document.querySelectorAll("[data-alg-mode]").forEach((el) => el.addEventListener("click", () => {
    const p = currentProduct();
    if (el.dataset.algMode === "manual") p.allergensManual = derive(p).autoAllergens.join("、");
    p.allergensMode = el.dataset.algMode;
    render();
  }));
  document.querySelectorAll("[data-contamination]").forEach((el) => el.addEventListener("click", () => {
    const p = currentProduct();
    p.contaminationEnabled = el.dataset.contamination === "on";
    if (p.contaminationEnabled && !p.contaminationAllergens && !p.contaminationText) {
      p.contaminationAllergens = derive(p).allergens.join("、");
      p.contaminationText = buildContaminationText(p);
    }
    render();
  }));
  document.querySelectorAll("[data-action='normalize-label']").forEach((el) => el.addEventListener("click", () => {
    const p = currentProduct();
    const { next, changes } = normalizeLabelText(p);
    assistMessage = changes.length ? `整えました：${changes.slice(0, 4).join("、")}${changes.length > 4 ? " ほか" : ""}` : "すでに食品表示向けに整っています。";
    if (editId === "new") draft = next;
    else products = products.map((x) => (x.id === p.id ? next : x));
    render();
  }));
  // チュートリアル
  document.querySelectorAll("[data-tutorial]").forEach((el) => el.addEventListener("click", () => {
    const act = el.dataset.tutorial;
    if (act === "next" && tutorialStep < TUTORIAL_STEPS.length - 1) { tutorialStep++; render(); }
    else if (act === "prev" && tutorialStep > 0) { tutorialStep--; render(); }
    else if (act === "done" || act === "skip") { showTutorial = false; safeSet("food-label-tutorial-done", "1"); render(); }
  }));
  document.querySelectorAll("[data-action='show-tutorial']").forEach((el) => el.addEventListener("click", () => {
    showTutorial = true; tutorialStep = 0; safeSet("food-label-tutorial-done", ""); render();
  }));
  // AI相談
  document.querySelectorAll("[data-action='open-ai-panel']").forEach((el) => el.addEventListener("click", () => { showAiPanel = true; render(); }));
  document.querySelectorAll("[data-action='close-ai-panel']").forEach((el) => el.addEventListener("click", () => { showAiPanel = false; render(); }));
  document.querySelectorAll("[data-ai-example]").forEach((el) => el.addEventListener("click", () => {
    const ta = document.getElementById("ai-prompt-text");
    if (ta) { ta.value = ta.value + "\n\n【質問】\n" + el.dataset.aiExample; }
  }));
  document.querySelectorAll("[data-action='copy-ai-prompt']").forEach((el) => el.addEventListener("click", () => {
    const ta = document.getElementById("ai-prompt-text");
    if (ta) { navigator.clipboard?.writeText(ta.value).then(() => showStatus("プロンプトをコピーしました")).catch(() => { ta.select(); document.execCommand("copy"); showStatus("コピーしました"); }); }
  }));
  // 画像保存
  document.querySelectorAll("[data-action='download-image']").forEach((el) => el.addEventListener("click", downloadImageLabel));
  // チェックリストジャンプ
  document.querySelectorAll(".check-jumpable[data-jump-label]").forEach((el) => el.addEventListener("click", () => handleChecklistJump(el.dataset.jumpLabel)));
  // 実寸含むズーム（data-zoom が "実寸" の場合も対応）
  // 既存の zoom binding を上書きしないよう、ここでは実寸だけ追加で処理（既存は数値用）
  // 保存済み検索・ソート・フィルター
  document.querySelectorAll("[data-saved-search]").forEach((el) => {
    let t; el.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { savedSearch = el.value; render(); }, 200); });
  });
  document.querySelectorAll("[data-saved-sort]").forEach((el) => el.addEventListener("click", () => { savedSort = el.dataset.savedSort; render(); }));
  document.querySelectorAll("[data-saved-filter]").forEach((el) => el.addEventListener("click", () => { savedFilter = el.dataset.savedFilter; render(); }));
  // お気に入りトグル
  document.querySelectorAll("[data-toggle-star]").forEach((el) => el.addEventListener("click", () => {
    const p = products.find((x) => x.id === el.dataset.toggleStar);
    if (p) { p.starred = !p.starred; saveProducts(); render(); }
  }));
  // 一括印刷チェック
  document.querySelectorAll("[data-sel-print]").forEach((el) => el.addEventListener("change", () => {
    el.checked ? selectedForPrint.add(el.dataset.selPrint) : selectedForPrint.delete(el.dataset.selPrint);
    render();
  }));
  document.querySelectorAll("[data-action='batch-print']").forEach((el) => el.addEventListener("click", batchPrint));
  // CSV
  document.querySelectorAll("[data-action='export-csv']").forEach((el) => el.addEventListener("click", exportCsv));
  document.querySelectorAll("[data-csv-import]").forEach((el) => el.addEventListener("change", (e) => { if (e.target.files[0]) importCsvFile(e.target.files[0]); }));
  // 製造者テンプレート
  document.querySelectorAll("[data-mfr-tpl-select]").forEach((el) => el.addEventListener("change", () => {
    const idx = Number(el.value);
    if (isNaN(idx) || !mfrTemplates[idx]) return;
    const tpl = mfrTemplates[idx];
    const p = currentProduct();
    Object.assign(p, { manufacturerName: tpl.name, manufacturerPostal: tpl.postal, manufacturerAddress: tpl.address, manufacturerPhone: tpl.phone });
    render();
  }));
  document.querySelectorAll("[data-action='save-mfr-tpl']").forEach((el) => el.addEventListener("click", () => {
    const nameEl = document.getElementById("mfr-tpl-name");
    const label = nameEl?.value?.trim();
    if (!label) { showStatus("テンプレート名を入力してください"); return; }
    const p = currentProduct();
    mfrTemplates = [...mfrTemplates.filter((t) => t.label !== label), { label, name: p.manufacturerName, postal: p.manufacturerPostal, address: p.manufacturerAddress, phone: p.manufacturerPhone }];
    safeSet("food-label-mfr-templates", JSON.stringify(mfrTemplates));
    showStatus(`「${label}」を保存しました`);
    render();
  }));
  document.querySelectorAll("[data-action='del-mfr-tpl']").forEach((el) => el.addEventListener("click", () => {
    const sel = document.querySelector("[data-mfr-tpl-select]");
    const idx = Number(sel?.value);
    if (isNaN(idx) || !mfrTemplates[idx]) return;
    mfrTemplates.splice(idx, 1);
    safeSet("food-label-mfr-templates", JSON.stringify(mfrTemplates));
    render();
  }));
  // 履歴復元
  document.querySelectorAll("[data-restore-history]").forEach((el) => el.addEventListener("click", () => {
    const hist = loadHistory(el.dataset.historyPid);
    const idx = Number(el.dataset.restoreHistory);
    if (!hist[idx]) return;
    showModal({ message: `${hist[idx].savedAt} の状態に戻しますか？`, confirmLabel: "復元", cancelLabel: "キャンセル", onConfirm: () => {
      const restored = { ...hist[idx].snapshot };
      products = products.map((x) => x.id === restored.id ? restored : x);
      saveProducts(); render(); showStatus("復元しました");
    }});
  }));
  // 印刷位置オフセット
  document.querySelectorAll("[data-print-offset]").forEach((el) => el.addEventListener("input", () => {
    if (el.dataset.printOffset === "x") { printOffsetX = el.value; safeSet("food-label-offset-x", el.value); }
    else { printOffsetY = el.value; safeSet("food-label-offset-y", el.value); }
  }));
  // セクション折りたたみ
  document.querySelectorAll("[data-toggle-section]").forEach((el) => el.addEventListener("click", () => {
    const title = el.dataset.toggleSection;
    if (openSections.has(title)) openSections.delete(title); else openSections.add(title);
    render();
  }));
  // ズーム
  document.querySelectorAll("[data-zoom]").forEach((el) => el.addEventListener("click", () => {
    const z = el.dataset.zoom;
    previewZoom = z === "実寸" ? "実寸" : Number(z);
    render();
  }));
  // ドラッグ並び替え
  document.querySelectorAll(".ing-row[data-ing-idx]").forEach((el) => {
    el.addEventListener("dragstart", (e) => { dragSrcIdx = Number(el.dataset.ingIdx); el.classList.add("dragging"); e.dataTransfer.effectAllowed = "move"; });
    el.addEventListener("dragend", () => { el.classList.remove("dragging"); document.querySelectorAll(".ing-row").forEach((r) => r.classList.remove("drag-over")); });
    el.addEventListener("dragover", (e) => { e.preventDefault(); el.classList.add("drag-over"); });
    el.addEventListener("dragleave", () => el.classList.remove("drag-over"));
    el.addEventListener("drop", (e) => {
      e.preventDefault();
      const p = currentProduct();
      const destIdx = Number(el.dataset.ingIdx);
      if (dragSrcIdx !== null && dragSrcIdx !== destIdx) {
        const arr = [...p.ingredients];
        const [moved] = arr.splice(dragSrcIdx, 1);
        arr.splice(destIdx, 0, moved);
        p.ingredients = arr;
        dragSrcIdx = null;
        render();
      }
    });
  });
  document.querySelector("[data-size]")?.addEventListener("change", (e) => {
    printCfg = { ...(SIZE_PRESETS.find((s) => s.label === e.target.value) || SIZE_PRESETS[1]) };
    render();
  });
  document.querySelectorAll("[data-print-cfg]").forEach((el) => el.addEventListener("input", () => {
    printCfg = { ...printCfg, label: "自由入力", [el.dataset.printCfg]: el.value };
    scheduleRender();
  }));
  document.querySelectorAll("[data-print-cfg]").forEach((el) => el.addEventListener("change", () => {
    printCfg = { ...printCfg, label: "自由入力", [el.dataset.printCfg]: el.value };
    scheduleRender();
  }));
  document.querySelectorAll("[data-target-choice]").forEach((el) => el.addEventListener("click", () => {
    printTarget = el.dataset.targetChoice;
    render();
  }));
  document.querySelectorAll("[data-action='copy-output']").forEach((el) => el.addEventListener("click", () => {
    copyLabels();
  }));
  document.querySelectorAll("[data-action='copy-image-output']").forEach((el) => el.addEventListener("click", () => {
    copyImageLabels();
  }));
  document.querySelectorAll("[data-action='open-print-preview']").forEach((el) => el.addEventListener("click", () => {
    printPreviewOpen = true;
    render();
  }));
  document.querySelectorAll("[data-action='close-print-preview']").forEach((el) => el.addEventListener("click", () => {
    printPreviewOpen = false;
    render();
  }));
  document.querySelectorAll("[data-action='confirm-print']").forEach((el) => el.addEventListener("click", () => {
    printPreviewOpen = false;
    render();
    setTimeout(printLabels, 50);
  }));
  // SaaS拡張イベント
  bindSaasEvents();
}

function printLabels() {
  const style = document.createElement("style");
  style.id = "print-style";
  style.textContent = `
    @media print {
      body > * { display: none !important; }
      #print-area { display: block !important; position: fixed !important; top: ${printOffsetY || 0}mm !important; left: ${printOffsetX || 0}mm !important; background: #fff !important; padding: ${printCfg.margin}mm !important; }
      #print-area .label-paper { width: ${printCfg.w || 90}mm !important; ${printCfg.h ? `min-height: ${printCfg.h}mm !important;` : ""} font-size: ${printCfg.fs || 7.5}pt !important; box-shadow: none !important; break-inside: avoid; }
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
    salesChannels: [], publishStatus: "active", memo: "",
    createdAt: p.updatedAt || new Date().toLocaleDateString("ja-JP"),
    costItems: [],
    packagingCost: "", laborCost: "", otherCost: "",
    specVersion: "1", specResponsible: "",
    specCreatedAt: p.updatedAt || new Date().toLocaleDateString("ja-JP"),
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
    { id:"dashboard",         label:"ダッシュボード", ico:"⊞" },
    { id:"products",          label:"商品管理",       ico:"⊡" },
    { id:"label-nav",         label:"ラベル作成",     ico:"⊟" },
    { id:"spec-sheet-nav",    label:"商品規格書",     ico:"≡" },
    { id:"ai-descriptions-nav",label:"AI説明文",      ico:"✦" },
    { id:"ai-consult-nav",      label:"AI相談",       ico:"💬" },
  ];
  const settingItem = { id:"settings-nav", label:"設定", ico:"⊕" };
  const active = saasView;
  const navLink = (it) => `<button class="nav-item${active===it.id?" active":""}" data-nav="${it.id}">
    <span class="nav-ico">${it.ico}</span><span class="nav-lbl">${it.label}</span>
  </button>`;
  return `<nav class="sidebar${sidebarOpen?" open":""}">
    <div class="sidebar-hd">
      <div class="sidebar-brand">
        <img src="./assets/app-icon.svg" alt="" class="sidebar-logo">
        <div><div class="sidebar-name">食品商品管理</div><div class="sidebar-sub2">クラウド</div></div>
      </div>
      <button class="sidebar-close-btn" data-action="close-sidebar">✕</button>
    </div>
    <div class="nav-links">${items.map(navLink).join("")}</div>
    <div class="nav-footer">${navLink(settingItem)}</div>
  </nav>
  <div class="sidebar-backdrop${sidebarOpen?" visible":""}" data-action="close-sidebar"></div>`;
}

function saasTopbar(title) {
  return `<header class="saas-topbar">
    <button class="saas-menu-btn" data-action="toggle-sidebar">☰</button>
    <span class="saas-topbar-title">${escapeHtml(title)}</span>
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

// ── TODO集計 ─────────────────────────────────────────────────────────
function calcTodo() {
  if (!products.length) return [];
  return [
    { key:"incomplete",    label:"完成度100%未満の商品", count: products.filter(p=>{ const d=derive(p); return calcCompletion(p,d).pct<100; }).length },
    { key:"noBestBefore",  label:"賞味期限未設定",       count: products.filter(p=>!p.bestBefore?.trim()).length },
    { key:"noIngredients", label:"原材料未入力",          count: products.filter(p=>!(p.ingredients||[]).some(i=>i.name?.trim())).length },
    { key:"noMfr",         label:"製造者未設定",          count: products.filter(p=>!p.manufacturerName?.trim()).length },
    { key:"noJan",         label:"JANコード未登録",       count: products.filter(p=>!p.janCode?.trim()).length },
    { key:"noImage",       label:"商品画像未登録",        count: products.filter(p=>!p.imageDataUrl).length },
    { key:"noCost",        label:"原価未設定",            count: products.filter(p=>!(p.costItems||[]).length).length },
  ].filter(t=>t.count>0);
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
    ${ok((p.costItems||[]).length>0,"原価")}
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
  const items = p.costItems || [];
  const rawCost     = items.reduce((s, ci) => s + calcItemCost(ci), 0);
  const packaging   = parseFloat(p.packagingCost) || 0;
  const labor       = parseFloat(p.laborCost) || 0;
  const other       = parseFloat(p.otherCost) || 0;
  const totalCost   = rawCost + packaging + labor + other;
  const price       = parseFloat(p.price) || 0;
  const gross       = price - totalCost;
  const costRate    = price > 0 ? Math.round(totalCost / price * 100) : null;
  return { rawCost, packaging, labor, other, totalCost, price, gross, costRate };
}

function costRateClass(costRate) {
  if (costRate === null) return "";
  if (costRate <= 30) return "margin-good";
  if (costRate <= 40) return "margin-warn";
  return "margin-bad";
}
// 後方互換エイリアス
function marginClass(m) { return costRateClass(m); }

// ── 原価管理 HTML（カード型レイアウト） ──────────────────────────────
function costEditorHtml(p) {
  const items = p.costItems || [];
  const costs = calcCosts(p);
  const mc = costRateClass(costs.costRate);

  const unitOpts = COST_UNITS.map(u => `<option value="${u}">${u}</option>`).join("");
  const priceUnitOpts = [
    {id:"per_unit", label:"円/使用量"},
    {id:"per_kg",   label:"円/kg"},
    {id:"per_100g", label:"円/100g"},
  ].map(u => `<option value="${u.id}">${u.label}</option>`).join("");

  const itemCards = items.map((ci, i) => {
    const lineCost = calcItemCost(ci);
    return `<div class="cost-item-card">
      <div class="cost-item-header">
        <input class="cost-name-input" list="ing-master-list" data-cost-name="${i}"
          value="${escapeHtml(ci.name||"")}" placeholder="原材料名を入力">
        <button class="icon-btn" data-remove-cost="${i}" title="削除">×</button>
      </div>
      <div class="cost-item-row">
        <label class="cost-field">
          <span>使用量</span>
          <div class="cost-amount-wrap">
            <input type="number" data-cost-amount="${i}" value="${escapeHtml(ci.amount||"")}" placeholder="0" min="0" step="0.01">
            <select data-cost-unit="${i}">
              ${COST_UNITS.map(u=>`<option value="${u}"${ci.unit===u?" selected":""}>${u}</option>`).join("")}
            </select>
          </div>
        </label>
        <label class="cost-field">
          <span>仕入単価</span>
          <div class="cost-amount-wrap">
            <input type="number" data-cost-price="${i}" value="${escapeHtml(ci.unitPrice||"")}" placeholder="0" min="0" step="0.01">
            <select data-cost-punit="${i}">
              ${[
                {id:"per_unit", label:"円/使用量単位"},
                {id:"per_kg",   label:"円/kg"},
                {id:"per_100g", label:"円/100g"},
              ].map(u=>`<option value="${u.id}"${(ci.priceUnit||"per_unit")===u.id?" selected":""}>${u.label}</option>`).join("")}
            </select>
          </div>
        </label>
        <label class="cost-field">
          <span>ロス率 %</span>
          <input type="number" data-cost-loss="${i}" value="${escapeHtml(ci.lossRate||"0")}" placeholder="0" min="0" max="100" style="width:70px">
        </label>
        <div class="cost-field cost-line-total">
          <span>原材料費</span>
          <strong>¥${lineCost.toFixed(1)}</strong>
          <small style="color:#94a3b8;font-size:10px">使用量×単価×(1+ロス率)</small>
        </div>
      </div>
    </div>`;
  }).join("");

  return `<div class="detail-section">
    <h3 class="detail-section-title">原価管理</h3>
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
      </div>
    </div>

    <div class="cost-summary">
      <div class="cost-summary-row"><span>原材料費合計</span><span>¥${costs.rawCost.toFixed(1)}</span></div>
      <div class="cost-summary-row"><span>包材費</span><span>¥${costs.packaging.toFixed(1)}</span></div>
      <div class="cost-summary-row"><span>人件費</span><span>¥${costs.labor.toFixed(1)}</span></div>
      <div class="cost-summary-row"><span>その他経費</span><span>¥${costs.other.toFixed(1)}</span></div>
      <div class="cost-summary-row" style="border-top:1px solid #e2e8f0;padding-top:8px;margin-top:4px;font-weight:600"><span>商品総原価</span><span>¥${costs.totalCost.toFixed(1)}</span></div>
      <div class="cost-summary-row"><span>販売価格</span><span>${costs.price>0?"¥"+costs.price:"未設定（商品マスターで設定）"}</span></div>
      <div class="cost-summary-row"><span>粗利益</span><span>${costs.price>0?"¥"+costs.gross.toFixed(1):"—"}</span></div>
      <div class="cost-summary-row cost-summary-total ${mc}">
        <span>原価率（原価÷販売価格）</span>
        <strong>${costs.costRate!==null?costs.costRate+"%":"—"}</strong>
      </div>
    </div>
    <p class="notice" style="margin-top:8px">
      原価率 <span class="margin-good">■ 30%以下（優良）</span>
      <span class="margin-warn">■ 31〜40%（標準）</span>
      <span class="margin-bad">■ 41%以上（要改善）</span>
    </p>
  </div>`;
}

// ── 商品画像アップロード HTML ─────────────────────────────────────────
function imageUploadSectionHtml(p) {
  const img = p.imageDataUrl
    ? `<div class="image-preview-wrap">
        <img class="image-preview-img" src="${p.imageDataUrl}" alt="商品画像">
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

// ── ダッシュボード ────────────────────────────────────────────────────
function dashboardHtml() {
  const total = products.length;
  const incomplete = products.filter(p => {
    const d = derive(p);
    return calcCompletion(p,d).pct < 100;
  }).length;
  const recent = [...products].sort((a,b) => (b.updatedAt||"").localeCompare(a.updatedAt||"")).slice(0,5);
  const recentCards = recent.length ? recent.map(p => `
    <div class="dash-product-row">
      <div class="dash-product-info">
        <span class="dash-product-name">${escapeHtml(p.internalName||p.name||"（名称未入力）")}</span>
        ${p.internalName&&p.name?`<span class="display-name-note">表示名：${escapeHtml(p.name)}</span>`:""}

        ${p.category?`<span class="tag-chip">${escapeHtml(p.category)}</span>`:""}
      </div>
      <div class="dash-product-actions">
        <button class="btn-sm" data-nav-product-detail="${escapeHtml(p.id)}">詳細</button>
        <button class="btn-sm" data-label-from="${escapeHtml(p.id)}">ラベル</button>
      </div>
    </div>`).join("") : `<p class="empty-note">商品がまだ登録されていません。</p>`;

  const todos = calcTodo();
  const todoCard = total === 0 ? "" : `<div class="todo-card">
    <div class="todo-card-title">📋 今日やること</div>
    ${todos.length === 0
      ? `<div class="todo-all-done">✅ すべて完了しています！</div>`
      : `<div class="todo-items">${todos.map(t=>`
          <button class="todo-item" data-todo-key="${t.key}">
            <span class="todo-count">${t.count}</span>
            <span class="todo-label">${escapeHtml(t.label)}</span>
            <span style="color:#94a3b8;font-size:11px">→ 一覧へ</span>
          </button>`).join("")}
        </div>`}
  </div>`;

  return saasLayout("ダッシュボード", `
    ${todoCard}
    <div class="dash-stats">
      <div class="stat-card"><div class="stat-num">${total}</div><div class="stat-lbl">登録商品数</div></div>
      <div class="stat-card warn"><div class="stat-num">${incomplete}</div><div class="stat-lbl">未完成の商品</div></div>
      <div class="stat-card"><div class="stat-num">${products.filter(p=>p.starred).length}</div><div class="stat-lbl">お気に入り</div></div>
      <div class="stat-card blue"><div class="stat-num">${products.filter(p=>p.publishStatus==="active").length}</div><div class="stat-lbl">公開中</div></div>
    </div>
    <div class="dash-quick-actions">
      ${registerBtnHtml()}
      <button class="quick-action-btn" data-nav="products">商品一覧を見る</button>
      <button class="quick-action-btn" data-nav="spec-sheet-nav">規格書を作成</button>
      <button class="quick-action-btn" data-nav="ai-descriptions-nav">AI説明文を生成</button>
    </div>
    <div class="dash-section">
      <h2 class="dash-section-title">最近の商品</h2>
      <div class="dash-product-list">${recentCards}</div>
    </div>
  `);
}

// ── 商品マスター一覧 ──────────────────────────────────────────────────
function productsListHtml() {
  let list = [...products];
  if (masterSearch) list = list.filter(p => (p.internalName||"").includes(masterSearch)||(p.name||"").includes(masterSearch)||(p.code||"").includes(masterSearch)||(p.category||"").includes(masterSearch));
  if (masterFilter==="starred") list = list.filter(p=>p.starred);
  if (masterFilter==="active") list = list.filter(p=>p.publishStatus==="active");
  if (masterFilter==="draft") list = list.filter(p=>p.publishStatus==="draft");
  list.sort((a,b) => (b.updatedAt||"").localeCompare(a.updatedAt||""));

  const statusBadge = (p) => {
    const label = p.publishStatus==="active"?"公開中":p.publishStatus==="draft"?"下書き":"非公開";
    const cls = p.publishStatus==="active"?"badge-active":p.publishStatus==="draft"?"badge-draft":"badge-inactive";
    return `<span class="status-badge ${cls}">${label}</span>`;
  };

  const cards = list.length ? list.map(p => {
    const d = derive(p);
    const comp = calcCompletion(p,d);
    const thumb = p.imageDataUrl
      ? `<img class="product-thumb" src="${p.imageDataUrl}" alt="商品画像">`
      : `<div class="product-thumb-placeholder">📦</div>`;
    const missingHtml = comp.missing.length
      ? `<div class="comp-missing">${comp.missing.map(m=>`<span class="comp-missing-item">${escapeHtml(m)}</span>`).join("")}</div>`
      : "";
    return `<div class="master-card">
      <div class="master-card-inner">
        ${thumb}
        <div class="master-card-body">
          <div class="master-card-title-row">
            <span class="master-card-name">${escapeHtml(p.internalName||p.name||"（名称未入力）")}</span>
            ${p.internalName&&p.name?`<span class="display-name-note">表示名：${escapeHtml(p.name)}</span>`:""}

            ${statusBadge(p)}
            <button class="star-btn${p.starred?" on":""}" data-toggle-star="${escapeHtml(p.id)}">${p.starred?"★":"☆"}</button>
          </div>
          <div class="master-card-meta">
            ${p.code?`<span class="meta-item">品番：${escapeHtml(p.code)}</span>`:""}
            ${p.category?`<span class="meta-item">${escapeHtml(p.category)}</span>`:""}
            ${p.price?`<span class="meta-item">¥${escapeHtml(p.price)}</span>`:""}
            <span class="meta-item">更新：${escapeHtml(p.updatedAt||"")}</span>
          </div>
          <div class="comp-section">
            <div class="comp-bar-row">
              <div class="comp-bar-wrap" style="max-width:160px"><div class="comp-bar-fill" style="width:${comp.pct}%"></div></div>
              <span class="comp-pct">完成度 ${comp.pct}%</span>
            </div>
            ${missingHtml}
          </div>
          ${productStatusBadges(p, d)}
        </div>
      </div>
      <div class="master-card-actions" style="margin-top:12px">
        <button class="btn-action" data-nav-product-detail="${escapeHtml(p.id)}">✎ 詳細編集</button>
        <button class="btn-action" data-label-from="${escapeHtml(p.id)}">🏷 ラベル</button>
        <button class="btn-action" data-spec-from="${escapeHtml(p.id)}">📋 規格書</button>
        <button class="btn-action" data-ai-from="${escapeHtml(p.id)}">✦ AI説明文</button>
        <button class="btn-action danger" data-del="${escapeHtml(p.id)}">削除</button>
      </div>
    </div>`;
  }).join("") : `<div class="empty-state"><p>商品がまだ登録されていません。</p><button class="action primary" data-quick-new="1">＋ 最初の商品を登録する</button></div>`;

  return saasLayout("商品管理", `
    <div class="master-toolbar">
      <input class="search-box" placeholder="商品名・品番・カテゴリで検索..." data-master-search value="${escapeHtml(masterSearch)}">
      <div class="filter-btns">
        ${["all","starred","active","draft"].map(f=>`<button class="filter-btn${masterFilter===f?" active":""}" data-master-filter="${f}">${{all:"すべて",starred:"★お気に入り",active:"公開中",draft:"下書き"}[f]}</button>`).join("")}
      </div>
      ${registerBtnHtml()}
    </div>
    <div class="master-list">${cards}</div>
  `);
}

// ── 商品詳細（マスター編集） ───────────────────────────────────────────
function productDetailHtml() {
  const p = products.find(x=>x.id===productDetailId) || (editId==="new"?draft:null);
  if (!p) return saasLayout("商品詳細", `<p>商品が見つかりません。<button class="action" data-nav="products">一覧へ戻る</button></p>`);
  const chkd = (val) => val ? "checked" : "";
  const channelChks = SALES_CHANNELS_LIST.map(ch=>`<label class="check-label"><input type="checkbox" data-sales-ch="${escapeHtml(ch)}" ${chkd((p.salesChannels||[]).includes(ch))}> ${escapeHtml(ch)}</label>`).join("");
  const catOpts = ["", ...PRODUCT_CATEGORIES].map(c=>`<option value="${escapeHtml(c)}"${p.category===c?" selected":""}>${c||"カテゴリを選択"}</option>`).join("");
  const statusOpts = [["active","公開中"],["draft","下書き"],["inactive","非公開"]].map(([v,l])=>`<option value="${v}"${p.publishStatus===v?" selected":""}>${l}</option>`).join("");

  return saasLayout(`${escapeHtml(p.name||"新規商品")} – 商品詳細`, `
    <div class="detail-breadcrumb">
      <button class="bread-link" data-nav="products">商品管理</button>
      <span class="bread-sep">›</span>
      <span>${escapeHtml(p.name||"新規商品")}</span>
    </div>
    <div class="detail-header-actions">
      <button class="action primary" data-action="save-master">保存する</button>
      <button class="action" data-label-from="${escapeHtml(p.id)}">🏷 ラベル編集</button>
      <button class="action" data-spec-from="${escapeHtml(p.id)}">📋 規格書を作成</button>
      <button class="action" data-ai-from="${escapeHtml(p.id)}">✦ AI説明文</button>
    </div>
    <div class="detail-grid">
      <div class="detail-section">
        <h3 class="detail-section-title">基本情報</h3>
        <div class="field-grid">
          <label class="field"><span>商品名<b>必須</b></span><input data-master-field="name" value="${escapeHtml(p.name||"")}"></label>
          <label class="field"><span>品番・商品コード</span><input data-master-field="code" value="${escapeHtml(p.code||"")}" placeholder="例：SW-001"></label>
          <label class="field"><span>カテゴリ</span><select data-master-field="category">${catOpts}</select></label>
          <label class="field"><span>販売価格（円）</span><input type="number" data-master-field="price" value="${escapeHtml(p.price||"")}" placeholder="例：980"></label>
          <label class="field"><span>JANコード</span><input data-master-field="janCode" value="${escapeHtml(p.janCode||"")}" placeholder="例：4901234567894"></label>
          <label class="field"><span>内容量</span><input data-master-field="volume" value="${escapeHtml(p.volume||"")}" placeholder="例：100g"></label>
          <label class="field"><span>賞味期限</span><input data-master-field="bestBefore" value="${escapeHtml(p.bestBefore||"")}" placeholder="例：製造日より90日"></label>
          <label class="field"><span>保存方法</span><input data-master-field="storage" value="${escapeHtml(p.storage||"")}" placeholder="例：高温多湿を避けて保存"></label>
        </div>
      </div>
      <div class="detail-section">
        <h3 class="detail-section-title">販売・管理情報</h3>
        <label class="field"><span>公開ステータス</span><select data-master-field="publishStatus">${statusOpts}</select></label>
        <div class="field"><span class="field-label">販売チャネル</span><div class="check-group">${channelChks}</div></div>
        <label class="field full"><span>メモ</span><textarea data-master-field="memo" rows="3">${escapeHtml(p.memo||"")}</textarea></label>
      </div>
      <div class="detail-section">
        <h3 class="detail-section-title">原材料・アレルゲン</h3>
        <div class="ing-summary">
          ${(p.ingredients||[]).filter(i=>i.name).map(i=>`<span class="ing-chip">${escapeHtml(i.name)}${i.weight?` (${i.weight}g)`:""}</span>`).join("")||"<span class='empty-note'>未入力</span>"}
        </div>
        <button class="action mt-8" data-label-from="${escapeHtml(p.id)}">✎ 原材料・ラベルを編集する</button>
      </div>
      <div class="detail-section">
        <h3 class="detail-section-title">製造者情報</h3>
        <div class="field-grid">
          <label class="field"><span>製造者名</span><input data-master-field="manufacturerName" value="${escapeHtml(p.manufacturerName||"")}"></label>
          <label class="field"><span>製造者住所</span><input data-master-field="manufacturerAddress" value="${escapeHtml(p.manufacturerAddress||"")}"></label>
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
    </div>
    ${imageUploadSectionHtml(p)}
    ${costEditorHtml(p)}
  `);
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
    ? `<img class="spec-v2-product-img" src="${p.imageDataUrl}" alt="商品画像">`
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
        <div class="spec-v2-qr">QR<br>コード</div>
        ${costs.costRate !== null ? `<div style="text-align:center;font-size:11px;color:#64748b;margin-top:4px">
          原価率<br><span class="${mc}" style="font-size:18px;font-weight:700">${costs.costRate}%</span>
        </div>` : ""}
      </div>
    </div>

    <div class="spec-v2-footer">
      <div style="font-size:11px;color:#94a3b8">
        発行日：${today}　このドキュメントは${escapeHtml(p.name||"")}の公式規格書です。
      </div>
      <div class="spec-v2-sig-row">
        <div class="spec-v2-sig-box"><div class="spec-v2-sig-line"></div>作成者</div>
        <div class="spec-v2-sig-box"><div class="spec-v2-sig-line"></div>確認者</div>
        <div class="spec-v2-sig-box"><div class="spec-v2-sig-line"></div>承認者</div>
      </div>
    </div>
  </div>`;

  const selectOpts = productList.map(px=>`<option value="${escapeHtml(px.id)}"${px.id===p.id?" selected":""}>${escapeHtml(px.internalName||px.name)}</option>`).join("");
  return saasLayout("商品規格書", `
    <div class="spec-controls">
      <select class="spec-select" data-spec-select>${selectOpts}</select>
      <button class="action primary" data-action="print-spec">🖨 印刷・PDF</button>
      <button class="action" data-action="copy-spec">📋 テキストでコピー</button>
    </div>
    ${specHtml}
  `);
}

// ── AI説明文 ローカル生成（API未設定時のフォールバック） ───────────────
function generateAiDesc(p, channelId) {
  const d = derive(p);
  const name     = p.name || "商品";
  const category = p.category || "食品";
  const ings     = d.ingLabel ? d.ingLabel.split("、").slice(0,3).join("、") : "厳選素材";
  const allergens = d.allergens.length ? d.allergens.join("・") : "なし";
  const storage  = d.storage || "常温保存";
  const bb       = p.bestBefore || "製造日より記載";
  const vol      = p.volume || "";
  const price    = p.price ? `¥${p.price}` : "";
  const mfr      = p.manufacturerName || "";
  const memo     = p.memo ? p.memo : "";

  const gen = {
    rakuten: `【${name}】${memo ? "\n" + memo + "\n" : ""}
■ 商品特徴
・${category}の逸品。主な原材料：${ings}
・保存方法：${storage}
・内容量：${vol}　賞味期限：${bb}
${allergens !== "なし" ? `・アレルゲン：${allergens}` : "・主要アレルゲン（7品目）不使用"}
${mfr ? `・製造者：${mfr}` : ""}

■ こだわりポイント
素材本来の味を大切にした${name}です。添加物を極力抑え、自然の美味しさをお届けします。
ご贈答・お土産にも喜ばれる一品です。ぜひお試しください。

${price ? `■ 価格：${price}（税込）` : ""}

■ 保存方法
${storage}`,

    amazon: `【商品タイトル案】
厳選素材使用 ${name} ${vol ? `(${vol})` : ""} ${mfr || ""}

【5つの特徴】
✅ ${category}の定番「${name}」
✅ 主原料：${ings}
✅ 保存方法：${storage}
✅ 賞味期限：${bb}
${allergens !== "なし" ? `✅ アレルゲン表示：${allergens}` : "✅ 主要アレルゲン不使用"}

【商品説明】
${memo || `${name}は、${ings}を主原料とした${category}です。`}
内容量：${vol}　保存：${storage}
製造者：${mfr || "記載なし"}`,

    base: `${name}

${memo || `こだわりの素材を使った${name}をお届けします。`}

▍商品情報
原材料：${d.ingLabel || "記載なし"}
内容量：${vol}
賞味期限：${bb}
保存方法：${storage}
${allergens !== "なし" ? `アレルゲン：${allergens}` : ""}
${price ? `価格：${price}` : ""}

大切な方へのギフトや、毎日の食卓にいかがでしょうか。`,

    instagram: `✨ ${name} ✨

${memo ? memo.slice(0,60) + "…" : `こだわり素材の${category}が入荷しました🎉`}

📦 内容量：${vol}
📅 賞味期限：${bb}
🌿 ${ings}
${allergens !== "なし" ? `⚠️ ${allergens}` : ""}
${price ? `💰 ${price}` : ""}

#${name.replace(/\s/g,"")} #${category} #こだわり #お取り寄せ #グルメ #ギフト #手作り #美味しい #食品`,

    wholesale: `【業務用・卸向け商品案内】

品名：${name}
品番：${p.code || "—"}　カテゴリ：${category}
内容量：${vol}　賞味期限：${bb}
保存方法：${storage}
原材料：${d.ingLabel || "—"}
アレルゲン：${allergens}
荷姿：${p.packaging || "応相談"}
ケース入数：${p.caseCount || "応相談"}
製品サイズ：${p.productSize || "応相談"}
希望小売価格：${price || "応相談"}

製造者：${mfr || "自社製造"}
${p.manufacturerAddress ? `所在地：${p.manufacturerAddress}` : ""}
${p.manufacturerPhone ? `TEL：${p.manufacturerPhone}` : ""}

※ロット・数量により価格応相談。お気軽にお問い合わせください。`,

    pop: `【${name}】
${memo ? memo.slice(0,40) : `${ings}を使った${category}`}

${vol ? `内容量 ${vol}` : ""}
${bb ? `賞味期限 ${bb}` : ""}
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
          <button class="action primary ai-generate-btn" data-action="generate-ai-desc">
            ✦ AI説明文を生成
          </button>
          <span class="ai-generate-note">商品情報をもとに説明文を自動生成します</span>
        </div>

        <div class="ai-result-section${currentText ? "" : " hidden"}" id="ai-result-section">
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

// ── 設定（新版） ──────────────────────────────────────────────────────
function newSettingsHtml() {
  return saasLayout("設定", `
    <div class="settings-sections">
      <div class="settings-card">
        <h3>プラン</h3>
        ${planHtml()}
        <div class="home-cta-wrap"><button class="home-next" data-action="menu">プランを変更する</button></div>
      </div>
      <div class="settings-card">
        <h3>データ管理</h3>
        <div class="settings-actions">
          <button class="action" data-action="export-csv">↓ CSV出力</button>
          <label class="action secondary import-label">↑ CSVインポート<input type="file" accept=".csv" data-csv-import style="display:none"></label>
        </div>
        <p class="notice">データはすべてこのブラウザのlocalStorageに保存されています。</p>
      </div>
      <div class="settings-card">
        <h3>チュートリアル</h3>
        <button class="action" data-action="show-tutorial">チュートリアルを再表示</button>
      </div>
    </div>
  `);
}

// ── 商品マスター保存 ──────────────────────────────────────────────────
function saveMaster() {
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
  showStatus("保存しました");
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

// OpenAI API接続ポイント（APIキー設定で差し替え可能な設計）
async function callConsultAI(p, userMessage, questionKey) {
  const apiKey = safeGet("fmcc-openai-key") || "";
  if (apiKey) {
    try {
      const d = derive(p);
      const systemPrompt = "あなたは食品表示法の専門家AIアシスタントです。日本の食品表示法・JAS法・栄養表示基準に精通しています。\n商品情報：名称「" + (p.name || "未設定") + "」、社内名称「" + (p.internalName || "") + "」、原材料：" + ((p.ingredients || []).filter(i => i.name).map(i => i.name).join("、") || "未入力") + "\nアレルゲン：" + ((d.allergens || []).join("、") || "なし") + "\n正確で実用的なアドバイスをMarkdown形式で回答してください。";
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + apiKey },
        body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userMessage }], max_tokens: 1000 }),
      });
      const json = await res.json();
      if (json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content) return json.choices[0].message.content;
    } catch (e) { console.warn("OpenAI API error:", e); }
  }
  return generateConsultResponse(p, questionKey);
}


// ══ AI商品登録メニュー ══════════════════════════════════════════════════

const REGISTER_MENU = [
  { id: "photo",   icon: "📷", label: "写真から登録",  desc: "商品写真・裏面・パッケージをAIで解析して自動登録", badge: "おすすめ" },
  { id: "spec",    icon: "📄", label: "規格書から登録", desc: "PDF・Excel・Word の規格書をAIが解析して登録" },
  { id: "ai-chat", icon: "🤖", label: "AIで作成",      desc: "チャット形式で質問に答えるだけで商品を自動作成" },
  { id: "manual",  icon: "✏️", label: "手入力",        desc: "従来どおり手入力で商品登録" },
];

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

function photoRegisterHtml() {
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
    return saasLayout("AI相談", "<div class=\"empty-state\"><p>商品を先に登録してください。</p><button class=\"action primary\" data-nav=\"products\">商品管理へ</button></div>");
  }
  const ep = rawP ? extendProductMaster(rawP) : extendProductMaster(productList[0]);
  const history = getConsultHistory(ep.id);
  const displayName = ep.internalName || ep.name || "（名称未入力）";
  const productSelect = productList.map(px => "<option value=\"" + escapeHtml(px.id) + "\"" + (px.id === aiConsultProductId ? " selected" : "") + ">" + escapeHtml(px.internalName || px.name || "（名称未入力）") + "</option>").join("");
  const templateBtns = CONSULT_TEMPLATES.map(t => "<button class=\"consult-tpl-btn\" data-consult-key=\"" + escapeHtml(t.key) + "\" data-consult-q=\"" + escapeHtml(t.label) + "\">" + escapeHtml(t.label) + "</button>").join("");
  const histHtml = history.length
    ? history.map(msg => "<div class=\"consult-msg consult-msg-" + escapeHtml(msg.role) + "\"><div class=\"consult-msg-label\">" + (msg.role === "user" ? "質問" : "🤖 AI回答") + "</div><div class=\"consult-msg-body\">" + (msg.role === "assistant" ? renderMarkdown(msg.content) : escapeHtml(msg.content)) + "</div></div>").join("")
    : "<div class=\"consult-empty\">テンプレートを選ぶか、テキストボックスに質問を入力して送信してください。</div>";
  const d2 = derive(ep);
  const ls = "style=\"width:" + escapeHtml(String(printCfg.w || "90")) + "mm;font-size:" + escapeHtml(String(printCfg.fs || "7.5")) + "pt;\"";
  const previewArea = printablePreviewHtml(ep, d2, ls, false);
  const hasApiKey = !!safeGet("fmcc-openai-key");
  return saasLayout("AI相談", "<div class=\"consult-layout\">\n  <div class=\"consult-left\">\n    <div class=\"consult-top-bar\">\n      <label class=\"field-inline\"><span>商品</span><select id=\"consult-product-sel\">" + productSelect + "</select></label>\n      <button class=\"btn-sm btn-danger\" id=\"consult-clear\">履歴クリア</button>\n    </div>\n    <div class=\"consult-templates\">\n      <div class=\"consult-tpl-title\">ワンクリック質問</div>\n      <div class=\"consult-tpl-grid\">" + templateBtns + "</div>\n    </div>\n    <div class=\"consult-history\" id=\"consult-history\">" + histHtml + "</div>\n    <div class=\"consult-input-area\">\n      <textarea class=\"consult-textarea\" id=\"consult-input\" placeholder=\"食品表示についてご質問ください...\">" + escapeHtml(aiConsultInput) + "</textarea>\n      <button class=\"action primary consult-send-btn" + (aiConsultSending ? " disabled" : "") + "\" id=\"consult-send\"" + (aiConsultSending ? " disabled" : "") + ">" + (aiConsultSending ? "回答中..." : "送信 ▶") + "</button>\n    </div>\n    " + (hasApiKey ? "" : "<p class=\"notice\">💡 設定画面でOpenAI APIキーを登録すると、ChatGPTが直接回答します（現在はテンプレート回答）</p>") + "\n  </div>\n  <div class=\"consult-right\">\n    <div class=\"consult-preview-title\">ラベルプレビュー（" + escapeHtml(displayName) + "）</div>\n    <div class=\"consult-preview-wrap\">" + previewArea + "</div>\n  </div>\n</div>");
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

function bindSaasEvents() {
  // ラベルエディタ → 商品管理に戻る
  document.querySelectorAll("[data-action='back-to-saas']").forEach(el => el.addEventListener("click", () => {
    saasView = productDetailId ? "product-detail" : "products";
    view = "saas"; render();
  }));

  // サイドバー
  document.querySelectorAll("[data-action='toggle-sidebar']").forEach(el => el.addEventListener("click", () => { sidebarOpen = !sidebarOpen; render(); }));
  document.querySelectorAll("[data-action='close-sidebar']").forEach(el => el.addEventListener("click", () => { sidebarOpen = false; render(); }));

  // ナビリンク
  document.querySelectorAll("[data-nav]").forEach(el => el.addEventListener("click", () => {
    const nav = el.dataset.nav;
    sidebarOpen = false;
    if (nav === "label-nav") {
      if (products.length > 0) { editId = products[0].id; view = "edit"; saasView = "label-nav"; }
      else { view = "edit"; editId = "new"; draft = extendProductMaster(emptyProduct()); saasView = "label-nav"; }
    } else if (nav === "spec-sheet-nav") {
      saasView = "spec-sheet-nav"; view = "saas";
      if (!specSheetId && products.length > 0) specSheetId = products[0].id;
    } else if (nav === "ai-descriptions-nav") {
      saasView = "ai-descriptions-nav"; view = "saas";
      if (!aiDescId && products.length > 0) aiDescId = products[0].id;
    } else if (nav === "settings-nav") {
      saasView = "settings-nav"; view = "saas";
    } else {
      saasView = nav; view = "saas";
    }
    safeSet("fmcc-view", saasView);
    render();
  }));

  // 新規商品作成
  document.querySelectorAll("[data-quick-new]").forEach(el => el.addEventListener("click", () => {
    if (!canCreateMore()) { showModal({ message: `${planInfo().label}プランは${planInfo().note}です。` }); return; }
    draft = extendProductMaster(emptyProduct());
    editId = "new"; view = "edit"; sidebarOpen = false;
    render();
  }));

  // 商品詳細へ
  document.querySelectorAll("[data-nav-product-detail]").forEach(el => el.addEventListener("click", () => {
    productDetailId = el.dataset.navProductDetail;
    saasView = "product-detail"; view = "saas";
    safeSet("fmcc-view", saasView);
    render();
  }));

  // ラベル編集（商品から）
  document.querySelectorAll("[data-label-from]").forEach(el => el.addEventListener("click", () => {
    const pid = el.dataset.labelFrom;
    const p = products.find(x=>x.id===pid);
    if (!p) return;
    editId = pid; view = "edit"; sidebarOpen = false;
    render();
  }));

  // 規格書（商品から）
  document.querySelectorAll("[data-spec-from]").forEach(el => el.addEventListener("click", () => {
    specSheetId = el.dataset.specFrom;
    saasView = "spec-sheet-nav"; view = "saas"; sidebarOpen = false;
    safeSet("fmcc-view", saasView);
    render();
  }));

  // AI説明文（商品から）
  document.querySelectorAll("[data-ai-from]").forEach(el => el.addEventListener("click", () => {
    aiDescId = el.dataset.aiFrom;
    saasView = "ai-descriptions-nav"; view = "saas"; sidebarOpen = false;
    safeSet("fmcc-view", saasView);
    render();
  }));

  // 商品マスター保存
  document.querySelectorAll("[data-action='save-master']").forEach(el => el.addEventListener("click", saveMaster));

  // 商品検索
  document.querySelectorAll("[data-master-search]").forEach(el => {
    el.addEventListener("input", () => { masterSearch = el.value; render(); });
  });

  // フィルター
  document.querySelectorAll("[data-master-filter]").forEach(el => el.addEventListener("click", () => { masterFilter = el.dataset.masterFilter; render(); }));

  // 規格書 商品選択
  document.querySelectorAll("[data-spec-select]").forEach(el => el.addEventListener("change", () => { specSheetId = el.value; render(); }));

  // 規格書印刷
  document.querySelectorAll("[data-action='print-spec']").forEach(el => el.addEventListener("click", () => {
    const area = document.getElementById("spec-print-area");
    if (!area) return;
    const w = window.open("", "_blank");
    w.document.write(`<html><head><title>商品規格書</title><style>body{font-family:sans-serif;padding:20px}.spec-table{width:100%;border-collapse:collapse}.spec-table th,.spec-table td{border:1px solid #ddd;padding:8px;text-align:left}.spec-table th{background:#f0f4ff;width:35%}.spec-header{margin-bottom:16px}.spec-title{font-size:22px;font-weight:700}.spec-meta{font-size:12px;color:#666}</style></head><body>${area.innerHTML}</body></html>`);
    w.document.close(); w.print();
  }));

  // 規格書テキストコピー
  document.querySelectorAll("[data-action='copy-spec']").forEach(el => el.addEventListener("click", () => {
    const area = document.getElementById("spec-print-area");
    if (!area) return;
    const text = [...area.querySelectorAll("tr")].map(tr=>{
      const th = tr.querySelector("th")?.textContent?.trim()||"";
      const td = tr.querySelector("td")?.textContent?.trim()||"";
      return th && td ? `${th}：${td}` : "";
    }).filter(Boolean).join("\n");
    copyPlainText(text);
  }));

  // AI説明文 商品選択
  document.querySelectorAll("[data-ai-product-select]").forEach(el => el.addEventListener("change", () => {
    aiDescId = el.value; aiEditText = ""; render();
  }));

  // AI説明文 チャネル選択
  document.querySelectorAll("[data-ai-ch]").forEach(el => el.addEventListener("click", () => {
    aiDescChannel = el.dataset.aiCh; aiEditText = ""; render();
  }));

  // AI説明文プロンプトコピー
  document.querySelectorAll("[data-action='copy-ai-desc']").forEach(el => el.addEventListener("click", () => {
    const ta = document.getElementById("ai-desc-prompt");
    if (ta) copyPlainText(ta.value);
  }));

  // AI説明文 生成
  document.querySelectorAll("[data-action='generate-ai-desc']").forEach(el => el.addEventListener("click", () => {
    const pid = aiDescId || (products.find(x=>x.name?.trim())?.id);
    const p = pid ? products.find(x=>x.id===pid) : null;
    if (!p) return;
    aiEditText = generateAiDesc(p, aiDescChannel);
    render();
  }));

  // AI説明文 再生成
  document.querySelectorAll("[data-action='regen-ai-desc']").forEach(el => el.addEventListener("click", () => {
    const pid = aiDescId || (products.find(x=>x.name?.trim())?.id);
    const p = pid ? products.find(x=>x.id===pid) : null;
    if (!p) return;
    aiEditText = generateAiDesc(p, aiDescChannel);
    render();
  }));

  // AI説明文 結果コピー
  document.querySelectorAll("[data-action='copy-ai-result']").forEach(el => el.addEventListener("click", () => {
    const ta = document.getElementById("ai-result-text");
    if (ta) { ta.select(); copyPlainText(ta.value); showStatus("コピーしました"); }
  }));

  // AI説明文 保存
  document.querySelectorAll("[data-action='save-ai-result']").forEach(el => el.addEventListener("click", () => {
    const ta = document.getElementById("ai-result-text");
    if (!ta) return;
    const pid = aiDescId || (products.find(x=>x.name?.trim())?.id);
    if (!pid) return;
    aiEditText = ta.value;
    saveAiText(pid, aiDescChannel, ta.value);
    showStatus("保存しました"); render();
  }));

  // AI結果テキストエリアの内容変化を追跡
  const aiResultTa = document.getElementById("ai-result-text");
  if (aiResultTa) {
    aiResultTa.addEventListener("input", () => { aiEditText = aiResultTa.value; });
  }

  // ★ お気に入りトグル
  document.querySelectorAll("[data-toggle-star]").forEach(el => el.addEventListener("click", (e) => {
    e.stopPropagation();
    const pid = el.dataset.toggleStar;
    const p = products.find(x=>x.id===pid);
    if (!p) return;
    p.starred = !p.starred;
    saveProducts(); render();
  }));

  // TODO アイテムクリック → 商品一覧へ
  document.querySelectorAll("[data-todo-key]").forEach(el => el.addEventListener("click", () => {
    saasView = "products"; view = "saas";
    safeSet("fmcc-view", saasView);
    render();
  }));

  // ── 画像アップロード ──
  function handleImageFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) { showStatus("画像は5MB以下にしてください"); return; }
    const pid = productDetailId;
    const p = products.find(x=>x.id===pid);
    if (!p) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX = 800;
        let w = img.width, h = img.height;
        if (w > MAX || h > MAX) {
          if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
          else { w = Math.round(w * MAX / h); h = MAX; }
        }
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        p.imageDataUrl = canvas.toDataURL("image/jpeg", 0.85);
        p.updatedAt = new Date().toLocaleDateString("ja-JP");
        saveProducts(); showStatus("画像を登録しました"); render();
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  const imgInput = document.getElementById("product-image-input");
  if (imgInput) {
    imgInput.addEventListener("change", () => handleImageFile(imgInput.files[0]));
    const dropZone = document.getElementById("image-drop-zone");
    if (dropZone) {
      dropZone.addEventListener("click", () => imgInput.click());
      dropZone.addEventListener("dragover", (e) => { e.preventDefault(); dropZone.classList.add("drag-over"); });
      dropZone.addEventListener("dragleave", () => dropZone.classList.remove("drag-over"));
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault(); dropZone.classList.remove("drag-over");
        handleImageFile(e.dataTransfer.files[0]);
      });
    }
  }

  document.querySelectorAll("[data-action='remove-product-image']").forEach(el => el.addEventListener("click", () => {
    const p = products.find(x=>x.id===productDetailId);
    if (!p) return;
    p.imageDataUrl = "";
    saveProducts(); render();
  }));

  // ── 原価管理 ──
  function saveCostItems() {
    const p = products.find(x=>x.id===productDetailId);
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

  document.querySelectorAll("[data-action='add-cost-item']").forEach(el => el.addEventListener("click", () => {
    const p = products.find(x=>x.id===productDetailId);
    if (!p) return;
    saveCostItems();
    p.costItems = [...(p.costItems||[]), { id: uid(), name: "", amount: "", unit: "g", unitPrice: "" }];
    saveProducts(); render();
  }));

  document.querySelectorAll("[data-remove-cost]").forEach(el => el.addEventListener("click", () => {
    const p = products.find(x=>x.id===productDetailId);
    if (!p) return;
    saveCostItems();
    const i = parseInt(el.dataset.removeCost);
    p.costItems.splice(i, 1);
    saveProducts(); render();
  }));

  // 原価フィールド変更時はリアルタイム再計算（フォーカスアウト）
  document.querySelectorAll("[data-cost-name],[data-cost-amount],[data-cost-unit],[data-cost-price],[data-cost-punit],[data-cost-loss]").forEach(el => {
    el.addEventListener("change", () => { saveCostItems(); render(); });
  });

  // ── AI相談 ──
  const consultSel = document.getElementById("consult-product-sel");
  if (consultSel) {
    consultSel.addEventListener("change", () => {
      aiConsultProductId = consultSel.value;
      aiConsultInput = "";
      render();
    });
  }
  document.getElementById("consult-clear")?.addEventListener("click", () => {
    if (!aiConsultProductId) return;
    saveConsultHistory(aiConsultProductId, []);
    render();
  });
  document.getElementById("consult-input")?.addEventListener("input", e => {
    aiConsultInput = e.target.value;
  });
  document.querySelectorAll(".consult-tpl-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const q = btn.dataset.consultQ;
      const key = btn.dataset.consultKey;
      document.getElementById("consult-input").value = q;
      aiConsultInput = q;
      sendConsultMessage(key);
    });
  });
  document.getElementById("consult-send")?.addEventListener("click", () => {
    sendConsultMessage(null);
  });
  // Ctrl+Enterで送信
  document.getElementById("consult-input")?.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") sendConsultMessage(null);
  });

  // ── 商品登録メニュー ──
  document.querySelector("[data-reg-toggle]")?.addEventListener("click", e => {
    e.stopPropagation();
    if (!canCreateMore()) { showModal({ message: `${planInfo().label}プランは${planInfo().note}です。` }); return; }
    registerMenuOpen = !registerMenuOpen;
    render();
  });
  document.querySelectorAll("[data-reg-mode]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const mode = btn.dataset.regMode;
      registerMenuOpen = false;
      aiRegAnalysisStep = -1;
      if (mode === "manual") {
        draft = extendProductMaster(emptyProduct());
        editId = "new"; view = "edit"; sidebarOpen = false;
        render(); return;
      }
      if (mode === "ai-chat") {
        aiRegChatMessages = [{ role: "ai", content: AI_CHAT_FLOW[0].q }];
        aiRegChatInput = ""; aiRegChatStep = 0; aiRegChatDraft = {};
        saasView = "reg-ai-chat";
      } else {
        saasView = mode === "photo" ? "reg-photo" : "reg-spec";
      }
      safeSet("fmcc-view", saasView); render();
    });
  });
  // 外クリックでメニューを閉じる
  if (registerMenuOpen) {
    setTimeout(() => {
      document.addEventListener("click", function closeReg(e) {
        if (!e.target.closest(".reg-btn-wrap")) {
          registerMenuOpen = false; render();
          document.removeEventListener("click", closeReg);
        }
      });
    }, 0);
  }

  // ── 写真/規格書アップロード ──
  ["photo", "spec"].forEach(type => {
    const dropZone = document.getElementById(`${type}-drop-zone`);
    const fileInput = document.getElementById(`${type}-file-input`);
    const selectBtn = document.getElementById(`${type}-select-btn`);
    if (selectBtn) selectBtn.addEventListener("click", () => fileInput?.click());
    if (fileInput) fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (file) processRegFile(type, file);
    });
    if (dropZone) {
      dropZone.addEventListener("dragover", e => { e.preventDefault(); dropZone.classList.add("drag-over"); });
      dropZone.addEventListener("dragleave", () => dropZone.classList.remove("drag-over"));
      dropZone.addEventListener("drop", e => {
        e.preventDefault(); dropZone.classList.remove("drag-over");
        const file = e.dataTransfer.files[0];
        if (file) processRegFile(type, file);
      });
    }
  });

  // 解析完了後に商品編集へ
  document.querySelector("[data-reg-go-editor]")?.addEventListener("click", () => {
    aiRegAnalysisStep = -1;
    draft = extendProductMaster(emptyProduct());
    if (aiRegChatDraft && Object.keys(aiRegChatDraft).length) {
      Object.assign(draft, aiRegChatDraft);
      draft.name = draft.name || "AI登録商品";
    } else {
      draft.name = "AI解析済み商品（確認・修正してください）";
    }
    editId = "new"; view = "edit"; sidebarOpen = false;
    render();
  });

  // ── AIチャット登録 ──
  document.getElementById("ai-chat-input")?.addEventListener("input", e => { aiRegChatInput = e.target.value; });
  document.getElementById("ai-chat-send")?.addEventListener("click", () => sendAiChatMessage());
  document.getElementById("ai-chat-input")?.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") sendAiChatMessage();
  });
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
  startAiAnalysis(type);
  if (type === "spec") {
    try {
      const text = await extractTextFromFile(file);
      if (text) aiRegChatDraft = parseSpecSheetText(text);
    } catch(e) {
      console.warn("規格書解析エラー:", e);
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
  const pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(it => it.str).join(" ") + "\n";
  }
  return text;
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

  const ingredientsRaw = get(/原材料名[（(][^)）]*[)）][　\s：:]*([^\n【[]+)/)
    || get(/原材料名[　\s：:]+([^\n【[]+)/);
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

render();

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
