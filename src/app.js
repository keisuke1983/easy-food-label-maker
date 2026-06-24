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
  { label: "70×40mm", w: "70", h: "40", margin: "2", fs: "6.5" },
  { label: "90×60mm", w: "90", h: "60", margin: "3", fs: "7.5" },
  { label: "100×70mm", w: "100", h: "70", margin: "4", fs: "8" },
  { label: "自由入力", w: "90", h: "", margin: "3", fs: "7.5" },
];
const PLANS = {
  free: { label: "無料", price: "0円/月", limit: 3, note: "月3つまで" },
  starter: { label: "スタンダード", price: "980円/月", limit: 10, note: "月10個まで" },
  pro: { label: "プロ", price: "1980円/月", limit: Infinity, note: "無制限" },
};

let products = loadProducts();
let draft = null;
let currentPlan = safeGet("food-label-plan") || "free";
let view = "home";
let editId = null;
let printTarget = "both";
let printCfg = SIZE_PRESETS[1];
let renderTimer = null;
let printPreviewOpen = false;
let assistMessage = "";
let statusMessage = "";

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
    id: uid(), name: "", volume: "", volumeCustomUnit: false, bestBefore: "", serving: "", janCode: "",
    storage: STORAGE_OPTS[0], storageCustom: "",
    ingredients: [{ id: uid(), name: "", weight: "" }],
    nutritionMode: "auto", nutritionManual: { kcal: "", protein: "", fat: "", carbs: "", salt: "" },
    allergensMode: "auto", allergensManual: "",
    contaminationEnabled: false, contaminationAllergens: "", contaminationText: "",
    manufacturerType: "製造者", manufacturerTypes: ["製造者"], manufacturerName: "", manufacturerPostal: "", manufacturerAddress: "", manufacturerPhone: "",
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
  const pageHtml = view === "home" ? homeHtml() : view === "menu" ? menuHtml() : view === "saved" ? savedHtml() : editorHtml(currentProduct());
  document.getElementById("root").innerHTML = `${pageHtml}${statusMessage ? `<div class="status-toast">${escapeHtml(statusMessage)}</div>` : ""}`;
  bindEvents();
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
    <div class="recent-strip"><span class="recent-label">保存済み</span><span>${products.length}件のラベル</span></div>
  </main>`;
}
function headerHtml(title, showSave = true) {
  return `<header class="topbar"><button class="back" data-action="menu">戻る</button><h1>${escapeHtml(title)}</h1><div class="topbar-right">${statusMessage ? `<span class="toast">${escapeHtml(statusMessage)}</span>` : ""}<span class="plan-badge">${planInfo().label}</span>${showSave ? `<button class="action primary" data-action="save">保存</button>` : ""}</div></header>`;
}
function savedHtml() {
  return `<div class="page">${headerHtml("以前作ったラベルを印刷する", false)}<div class="content narrow"><div class="product-grid">${products.map((p) => {
    const d = derive(p);
    return `<article class="product-card"><div><h3>${escapeHtml(p.name || "（名称未入力）")}</h3><p>更新: ${escapeHtml(p.updatedAt)}</p><p>内容量: ${escapeHtml(p.volume || "未入力")}</p><div class="chips">${d.allergens.slice(0, 5).map((a) => `<span>${escapeHtml(a)}</span>`).join("")}</div></div><div class="card-actions"><button data-edit="${p.id}">編集</button><button data-dup="${p.id}">複製</button><button class="danger" data-del="${p.id}">削除</button></div></article>`;
  }).join("")}</div></div></div>`;
}
function editorHtml(p) {
  const d = derive(p);
  return `<div class="page">${headerHtml(p.name || "新商品ラベル作成")}
    <div class="editor-shell">
      <div class="form-column">
        ${section("商品情報", productInfoHtml(p))}
        ${janCodeHtml(p)}
        ${section("保存方法", `<div class="choice-grid">${STORAGE_OPTS.map((s) => `<button class="${p.storage === s ? "selected" : ""}" data-storage="${escapeHtml(s)}">${p.storage === s ? "✓ " : ""}${escapeHtml(s)}</button>`).join("")}</div>${p.storage === "自由入力" ? `<label class="field"><span>保存方法</span><input data-field="storageCustom" value="${escapeHtml(p.storageCustom)}"></label>` : ""}`)}
        ${section("原材料", `<div class="ing-list">${p.ingredients.map((i, idx) => ingredientHtml(i, idx)).join("")}</div><button class="action" data-action="add-ing">原材料を追加</button>`)}
        ${nutritionEditorHtml(p, d)}
        ${allergenEditorHtml(p, d)}
        ${contaminationEditorHtml(p)}
        ${labelAssistHtml(p, d)}
        ${manufacturerEditorHtml(p)}
      </div>
      <div class="preview-column">${previewHtml(p, d)}</div>
    </div>
  </div>`;
}
function section(title, body, accent = false) { return `<section class="section ${accent ? "accent" : ""}"><div class="section-title">${title}</div><div class="section-body">${body}</div></section>`; }
function manufacturerEditorHtml(p) {
  const selected = selectedMfrTypes(p);
  return section("製造者・製造所・加工者", `<div class="mfr-choice">${MFR_TYPES.map((t) => `<button class="${selected.includes(t) ? "selected" : ""}" data-mfr="${t}">${selected.includes(t) ? "✓ " : ""}${t}</button>`).join("")}</div><p class="notice">複数選択できます。表示ラベルには選んだ項目がそれぞれ表示されます。</p><label class="field"><span>名称<b>必須</b></span><input data-field="manufacturerName" value="${escapeHtml(p.manufacturerName)}" placeholder="例：株式会社APW"></label><div class="two-col"><label class="field"><span>郵便番号</span><input data-field="manufacturerPostal" value="${escapeHtml(p.manufacturerPostal)}"></label><label class="field"><span>電話番号</span><input data-field="manufacturerPhone" value="${escapeHtml(p.manufacturerPhone)}"></label></div><label class="field"><span>住所</span><input data-field="manufacturerAddress" value="${escapeHtml(p.manufacturerAddress)}"></label>`);
}
function productInfoHtml(p) {
  const volume = splitVolume(p.volume);
  const isCustomUnit = !!p.volumeCustomUnit || (!!volume.unit && !VOLUME_UNITS.includes(volume.unit));
  const activeUnit = isCustomUnit ? "その他" : (volume.unit || "個");
  const dateValue = toDateInputValue(p.bestBefore);
  return `<label class="field"><span>名称<b>必須</b></span><input data-field="name" value="${escapeHtml(p.name)}" placeholder="例：油菓子"></label>
    <div class="two-col">
      <div class="field"><span>内容量</span><div class="volume-input"><input inputmode="decimal" data-volume-amount value="${escapeHtml(volume.amount)}" placeholder="例：6"><div class="unit-tabs">${VOLUME_UNITS.map((u) => `<button class="${activeUnit === u ? "selected" : ""}" data-volume-unit="${escapeHtml(u)}">${escapeHtml(u)}</button>`).join("")}</div>${activeUnit === "その他" ? `<input data-volume-custom-unit value="${escapeHtml(isCustomUnit ? volume.unit : "")}" placeholder="単位を入力 例：ホール・パック・瓶">` : ""}</div></div>
      <div class="field"><span>賞味期限</span><input type="date" data-date-input value="${escapeHtml(dateValue)}"><div class="unit-tabs date-tabs">${DATE_PRESETS.map(([id, label]) => `<button data-date-preset="${id}">${escapeHtml(label)}</button>`).join("")}</div></div>
    </div>`;
}
function ingredientHtml(i, idx) {
  const est = i.name && i.weight ? estimateNutrition(i.name) : null;
  return `<div class="ing-row"><span>${idx + 1}</span><input data-ing-name="${idx}" value="${escapeHtml(i.name)}" placeholder="原材料名"><input type="number" data-ing-weight="${idx}" value="${escapeHtml(i.weight)}" placeholder="g"><div class="badges">${isAdditive(i.name) ? `<b class="violet">添加物</b>` : ""}${est ? `<b class="${est.estimated ? "amber" : "green"}">${est.estimated ? "推定" : "DB"}</b>` : ""}</div><button class="icon-btn" data-remove-ing="${idx}">×</button></div>`;
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
  return section("表示チェックリスト", `<div class="assist-actions"><button class="action primary" data-action="normalize-label">食品表示向けに整える</button></div>${assistMessage ? `<p class="notice success">${escapeHtml(assistMessage)}</p>` : ""}<div class="check-list">${checks.map((item) => `<div class="${item.ok ? "check-ok" : "check-warn"}"><b>${item.ok ? "OK" : "要確認"}</b><span>${escapeHtml(item.label)}</span></div>`).join("")}</div><p class="notice">この機能は表示文を整える補助です。法令適合を保証するものではありません。</p>`);
}
function labelChecklist(p, d) {
  return [
    { label: "名称が入力されている", ok: !!p.name?.trim() },
    { label: "原材料と重量が入力されている", ok: p.ingredients.some((i) => i.name?.trim() && Number(i.weight) > 0) },
    { label: "内容量が入力されている", ok: !!p.volume?.trim() },
    { label: "賞味期限が入力されている", ok: !!p.bestBefore?.trim() },
    { label: "保存方法が入力されている", ok: !!d.storage?.trim() },
    { label: "製造者情報が入力されている", ok: !!p.manufacturerName?.trim() && !!p.manufacturerAddress?.trim() },
    { label: "栄養成分表示を確認済み", ok: d.nutrition.kcal > 0 },
    { label: "アレルゲンを確認済み", ok: p.allergensMode === "manual" || d.autoAllergens.length >= 0 },
    { label: "コンタミネーションを確認済み", ok: p.contaminationEnabled ? !!buildContaminationText(p) : true },
    { label: "JANコードは8桁または13桁", ok: !p.janCode || [8, 13].includes(normalizedJan(p.janCode).length) },
  ];
}
function previewHtml(p, d) {
  const targetChoices = [["label", "表示ラベルのみ"], ["nutrition", "栄養成分表示のみ"], ["both", "両方"]];
  const labelStyle = `style="width:${escapeHtml(printCfg.w || "90")}mm;${printCfg.h ? `min-height:${escapeHtml(printCfg.h)}mm;` : ""}font-size:${escapeHtml(printCfg.fs || "7.5")}pt;"`;
  const previewNote = printPreviewSupportHtml();
  const printable = printablePreviewHtml(p, d, labelStyle, true);
  return `<aside class="preview-panel">
    <div class="print-controls"><select data-size>${SIZE_PRESETS.map((s) => `<option ${s.label === printCfg.label ? "selected" : ""}>${s.label}</option>`).join("")}</select></div>
    <div class="target-tabs">${targetChoices.map(([id, label]) => `<button class="${printTarget === id ? "selected" : ""}" data-target-choice="${id}">${label}</button>`).join("")}</div>
    <div class="size-controls"><label><span>幅(mm)</span><input type="number" data-print-cfg="w" value="${escapeHtml(printCfg.w || "")}" placeholder="90"></label><label><span>高さ(mm)</span><input type="number" data-print-cfg="h" value="${escapeHtml(printCfg.h || "")}" placeholder="自動"></label><label><span>余白(mm)</span><input type="number" data-print-cfg="margin" value="${escapeHtml(printCfg.margin || "")}" placeholder="3"></label><label><span>文字(pt)</span><input type="number" step="0.1" data-print-cfg="fs" value="${escapeHtml(printCfg.fs || "")}" placeholder="7.5"></label></div>
    ${previewNote}
    <div class="output-actions"><button class="action primary" data-action="copy-image-output">画像でコピー</button><button class="action" data-action="copy-output">文字だけコピー</button><button class="action dark" data-action="open-print-preview">印刷プレビュー</button></div>
    <div id="print-area" style="padding:${escapeHtml(printCfg.margin || "3")}mm;">${printable}</div>
    ${printPreviewOpen ? printPreviewModalHtml(printable) : ""}
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
  products = exists ? products.map((x) => (x.id === p.id ? p : x)) : [p, ...products];
  saveProducts();
  view = "edit";
  editId = p.id;
  draft = null;
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
  document.querySelectorAll("[data-storage]").forEach((el) => el.addEventListener("click", () => updateCurrent("storage", el.dataset.storage)));
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
}

function printLabels() {
  const style = document.createElement("style");
  style.id = "print-style";
  style.textContent = `
    @media print {
      body > * { display: none !important; }
      #print-area { display: block !important; position: fixed !important; inset: 0 auto auto 0 !important; background: #fff !important; padding: ${printCfg.margin}mm !important; }
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
function canvasToPngBlob(canvas) {
  const dataUrl = canvas.toDataURL("image/png");
  const bin = atob(dataUrl.split(",")[1]);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return new Blob([pngWith300dpi(bytes)], { type: "image/png" });
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

async function copyImageLabels() {
  try {
    showStatus("\u753b\u50cf\u3092\u4f5c\u6210\u4e2d\u3067\u3059");
    const p = currentProduct();
    const d = derive(p);
    const scale = 12;
    const pxPerMm = 4;
    const margin = Math.max(8, Number(printCfg.margin || 3) * pxPerMm);
    const contentW = Math.max(260, Number(printCfg.w || 90) * pxPerMm);
    const fs = Math.max(12, Number(printCfg.fs || 7.5) * 1.8);
    const FONT = `"Meiryo","Yu Gothic","MS Gothic",sans-serif`;
    const canvas = document.createElement("canvas");
    const roughRows = imageCopyRows(p, d).length + (printTarget !== "label" ? 8 : 0);
    canvas.width = Math.ceil((contentW + margin * 2) * scale);
    canvas.height = Math.ceil((Math.max(180, roughRows * 42 + margin * 2 + 80)) * scale);
    // フォントが確実にロードされてから描画する
    await document.fonts.ready;
    try { await document.fonts.load(`bold ${fs}px "Yu Mincho"`); } catch {}
    try { await document.fonts.load(`${fs}px "Yu Mincho"`); } catch {}

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.scale(scale, scale);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
    let y = margin;
    if (printTarget !== "nutrition") {
      y = drawTableImage(ctx, margin, y, contentW, "", imageCopyRows(p, d), fs, FONT);
      const jan = normalizedJan(p.janCode);
      if (canUseJanCode() && jan) {
        y += 10;
        const barcodeH = drawBarcodeOnCanvas(ctx, jan, margin, y, contentW, fs);
        y += barcodeH + 8;
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
    const trimCtx = trimmed.getContext("2d");
    trimCtx.imageSmoothingEnabled = false;
    trimCtx.drawImage(canvas, 0, 0);
    if (navigator.clipboard?.write && window.ClipboardItem) {
      navigator.clipboard.write([new ClipboardItem({ "image/png": canvasToPngBlob(trimmed) })])
        .then(() => showStatus("\u753b\u50cf\u3068\u3057\u3066\u30b3\u30d4\u30fc\u3057\u307e\u3057\u305f"))
        .catch(() => {
          downloadCanvasImage(trimmed);
          showStatus("\u753b\u50cf\u30b3\u30d4\u30fc\u304c\u8a31\u53ef\u3055\u308c\u306a\u3044\u305f\u3081\u3001\u4fdd\u5b58\u753b\u9762\u3092\u958b\u304d\u307e\u3057\u305f");
        });
      return;
    }
    downloadCanvasImage(trimmed);
  } catch {
    showStatus("\u753b\u50cf\u30b3\u30d4\u30fc\u306b\u5931\u6557\u3057\u307e\u3057\u305f");
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

render();
