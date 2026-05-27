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
};

const FUZZY = [["上白糖", "砂糖"], ["グラニュー糖", "砂糖"], ["てんさい糖", "きび糖"], ["製菓用米粉", "米粉"], ["上新粉", "米粉"], ["アーモンド粉", "アーモンドパウダー"], ["菜種油", "なたね油"], ["サラダ油", "なたね油"], ["植物油", "なたね油"], ["マーガリン", "ショートニング"], ["小麦", "小麦粉"], ["卵白", "卵"], ["卵黄", "卵"], ["鶏卵", "卵"], ["蜂蜜", "はちみつ"], ["胡麻", "ごま"], ["脱脂粉乳", "牛乳"], ["スキムミルク", "牛乳"]];
const ADDITIVE_KW = ["ベーキングパウダー", "膨張剤", "膨脹剤", "乳化剤", "香料", "酸化防止剤", "着色料", "保存料", "増粘剤", "甘味料", "酸味料", "pH調整剤", "トレハロース", "ソルビトール", "加工澱粉", "加工でんぷん"];
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
const EN_INGREDIENTS = [
  ["木綿豆腐", "firm tofu"], ["絹ごし豆腐", "silken tofu"], ["豆腐", "tofu"], ["米粉", "rice flour"],
  ["小麦粉", "wheat flour"], ["薄力粉", "cake flour"], ["強力粉", "bread flour"], ["砂糖", "sugar"],
  ["きび糖", "raw cane sugar"], ["食塩", "salt"], ["塩", "salt"], ["ショートニング", "shortening"],
  ["なたね油", "canola oil"], ["オリーブ油", "olive oil"], ["バター", "butter"], ["卵", "egg"],
  ["牛乳", "milk"], ["生クリーム", "cream"], ["はちみつ", "honey"], ["片栗粉", "potato starch"],
  ["ごま", "sesame"], ["きな粉", "soybean flour"], ["豆乳", "soy milk"], ["膨張剤", "raising agent"],
  ["乳化剤", "emulsifier"], ["増粘剤", "thickener"], ["ベーキングパウダー", "baking powder"],
  ["アーモンドパウダー", "almond powder"], ["タピオカ粉", "tapioca starch"],
];
const EN_ALLERGENS = {
  "えび": "shrimp", "かに": "crab", "くるみ": "walnut", "小麦": "wheat", "そば": "buckwheat",
  "卵": "egg", "乳": "milk", "落花生": "peanut", "アーモンド": "almond", "オレンジ": "orange",
  "カシューナッツ": "cashew nut", "キウイフルーツ": "kiwifruit", "牛肉": "beef", "ごま": "sesame",
  "さけ": "salmon", "さば": "mackerel", "大豆": "soybean", "鶏肉": "chicken", "バナナ": "banana",
  "豚肉": "pork", "もも": "peach", "やまいも": "yam", "りんご": "apple", "ゼラチン": "gelatin",
};
const EN_STORAGE = {
  "直射日光・高温多湿を避けて保存": "Store away from direct sunlight, high temperature and humidity.",
  "高温多湿を避けて保存": "Store away from high temperature and humidity.",
  "常温保存": "Store at room temperature.",
  "冷蔵保存（10℃以下）": "Keep refrigerated at 10°C or below.",
  "冷凍保存（-18℃以下）": "Keep frozen at -18°C or below.",
};
const EN_PRODUCTS = [
  ["油菓子", "Fried confectionery"],
  ["クッキー", "Cookies"],
  ["ケーキ", "Cake"],
  ["焼菓子", "Baked confectionery"],
  ["焼き菓子", "Baked confectionery"],
  ["パン", "Bread"],
];
const PLANS = {
  free: { label: "無料", price: "0円/月", limit: 3, note: "月3つまで" },
  starter: { label: "スタンダード", price: "980円/月", limit: 10, note: "月10個まで" },
  pro: { label: "プロ", price: "1980円/月", limit: Infinity, note: "国内ラベル無制限" },
  global: { label: "グローバル", price: "2980円/月", limit: Infinity, note: "海外用ラベル対応" },
};
const COUNTRIES = {
  domestic: { label: "国内", lang: "Japanese", nutritionTitle: "栄養成分表示", per: "100g当たり", calories: "エネルギー", carb: "炭水化物", salt: "食塩相当量", allergenLead: "アレルゲン", ingredientsNote: "国内向けの食品表示ラベルを作成します。" },
  us: { label: "United States", lang: "English", nutritionTitle: "Nutrition Facts", per: "Per 100g", calories: "Calories", carb: "Total Carbohydrate", salt: "Sodium / Salt equivalent", allergenLead: "Contains", ingredientsNote: "Major allergens must be declared by food source name. Sesame is included." },
  eu: { label: "EU", lang: "English", nutritionTitle: "Nutrition declaration", per: "per 100g", calories: "Energy", carb: "Carbohydrate", salt: "Salt", allergenLead: "Allergens", ingredientsNote: "Allergens should be emphasized in the ingredients list." },
  ca: { label: "Canada", lang: "English / French", nutritionTitle: "Nutrition Facts / Valeur nutritive", per: "Per 100g / par 100 g", calories: "Calories", carb: "Carbohydrate / Glucides", salt: "Sodium", allergenLead: "Contains / Contient", ingredientsNote: "English and French bilingual labelling is generally required." },
  au_nz: { label: "Australia / New Zealand", lang: "English", nutritionTitle: "Nutrition Information", per: "Average quantity per 100g", calories: "Energy", carb: "Carbohydrate", salt: "Sodium / Salt equivalent", allergenLead: "Contains", ingredientsNote: "Nutrition Information Panel format commonly uses per serving and per 100g columns." },
};

let products = loadProducts();
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
    labelMode: "domestic", exportCountry: "us",
    exportName: "", exportAddress: "", originCountry: "Japan", exportNetContent: "",
    importerName: "", importerAddress: "",
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
  const sorted = ingredients.filter((i) => i.name.trim() && (parseFloat(i.weight) || 0) > 0).sort((a, b) => (parseFloat(b.weight) || 0) - (parseFloat(a.weight) || 0));
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
function translateIngredientName(name) {
  const clean = stripOrigin(name);
  for (const [jp, en] of EN_INGREDIENTS) {
    if (clean.includes(jp)) return en;
  }
  return clean || "-";
}
function buildEnglishIngLabel(ingredients) {
  const sorted = ingredients.filter((i) => i.name.trim() && (parseFloat(i.weight) || 0) > 0).sort((a, b) => (parseFloat(b.weight) || 0) - (parseFloat(a.weight) || 0));
  const normal = sorted.filter((i) => !isAdditive(i.name)).map((i) => translateIngredientName(i.name)).join(", ");
  const additives = sorted.filter((i) => isAdditive(i.name)).map((i) => translateIngredientName(i.name)).join(", ");
  if (!normal && !additives) return "";
  if (!additives) return normal;
  if (!normal) return `Additives: ${additives}`;
  return `${normal}; Additives: ${additives}`;
}
function translateStorage(p, d) {
  if (p.storage === "自由入力") return d.storage || "-";
  return EN_STORAGE[p.storage] || d.storage || "-";
}
function translateAllergens(allergens) {
  return allergens.map((a) => EN_ALLERGENS[a] || a);
}
function translateProductName(name) {
  const clean = stripOrigin(name);
  for (const [jp, en] of EN_PRODUCTS) {
    if (clean.includes(jp)) return en;
  }
  return clean || "-";
}
function translateVolume(volume) {
  return String(volume || "-")
    .replace(/個/g, " pieces")
    .replace(/本/g, " pieces")
    .replace(/枚/g, " pieces")
    .replace(/袋/g, " bags")
    .replace(/箱/g, " boxes")
    .replace(/約/g, "approx. ");
}
function formatExportDate(dateText, countryId) {
  const raw = String(dateText || "").trim();
  const m = raw.match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/);
  if (!m) return raw || "-";
  const y = m[1];
  const mo = m[2].padStart(2, "0");
  const d = m[3].padStart(2, "0");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (countryId === "us") return `${mo}/${d}/${y}`;
  if (countryId === "eu" || countryId === "au_nz") return `${d} ${monthNames[Number(mo) - 1]} ${y}`;
  if (countryId === "ca") return `${y}-${mo}-${d}`;
  return `${y}-${mo}-${d}`;
}
function translateBusinessAddress(address) {
  const text = String(address || "").trim();
  if (!text) return "";
  return text
    .replace(/日本/g, "Japan")
    .replace(/兵庫県/g, "Hyogo, ")
    .replace(/神戸市/g, "Kobe, ")
    .replace(/灘区/g, "Nada-ku, ");
}
function exportProductName(p) {
  return p.exportName?.trim() || translateProductName(p.name);
}
function exportAddress(p) {
  return p.exportAddress?.trim() || translateBusinessAddress(p.manufacturerAddress);
}
function exportNetContent(p) {
  return p.exportNetContent?.trim() || translateVolume(p.volume);
}
function selectedCountry(p) {
  return COUNTRIES[p?.exportCountry || "us"] || COUNTRIES.us;
}
function isGlobalPlan() {
  return currentPlan === "global";
}
function isGlobalExport() {
  const p = currentProduct();
  return isGlobalPlan() && (p?.exportCountry || "us") !== "domestic";
}
function hasJapanese(text) {
  return /[ぁ-んァ-ヶ一-龠]/.test(String(text || ""));
}
function countryCheckListHtml(p, d) {
  if (!isGlobalPlan()) return "";
  if ((p.exportCountry || "us") === "domestic") return `<div class="compliance-box"><h3>国内ラベル確認</h3><div class="ok-box">国内向けラベルを表示しています。</div><p>通常の食品表示内容を確認してください。</p></div>`;
  const c = selectedCountry(p);
  const missing = [];
  const warnings = [];
  if (!exportProductName(p) || exportProductName(p) === "-") missing.push("English product name");
  if (!buildEnglishIngLabel(p.ingredients)) missing.push("Ingredients");
  if (!exportNetContent(p) || exportNetContent(p) === "-") missing.push("Net contents");
  if (!p.bestBefore) missing.push("Best before date");
  if (!p.originCountry) missing.push("Country of origin");
  if (!exportAddress(p)) missing.push("Business address");
  if (!p.importerName?.trim()) missing.push("Importer / distributor name");
  if (!p.importerAddress?.trim()) missing.push("Importer / distributor address");
  [["Product name", exportProductName(p)], ["Net contents", exportNetContent(p)], ["Business address", exportAddress(p)], ["Importer name", p.importerName], ["Importer address", p.importerAddress]].forEach(([label, value]) => {
    if (hasJapanese(value)) warnings.push(`${label} contains Japanese text`);
  });
  const checks = [
    `Destination: ${c.label}`,
    `Language: ${c.lang}`,
    c.ingredientsNote,
    "Confirm product name, net contents, date marking, storage statement and business/importer details.",
    "Confirm serving size, rounding rules, nutrition calculation basis and package-size exemptions before sale.",
  ];
  if ((p.exportCountry || "us") === "ca") checks.push("Canada often requires bilingual English/French label text.");
  if ((p.exportCountry || "us") === "eu") checks.push("EU allergen names should be highlighted within the ingredient list.");
  if ((p.exportCountry || "us") === "au_nz") checks.push("AU/NZ Nutrition Information Panel commonly needs serving size plus per 100g values.");
  if (d.autoNutrition.hasEst) checks.push("Some nutrition values are estimated. Verify with analysis or authoritative data.");
  return `<div class="compliance-box"><h3>Compliance checklist</h3>${missing.length ? `<div class="missing-box"><b>Missing / confirm:</b> ${missing.map(escapeHtml).join(", ")}</div>` : `<div class="ok-box">Required draft fields are filled.</div>`}${warnings.length ? `<div class="missing-box"><b>Japanese text warning:</b> ${warnings.map(escapeHtml).join(", ")}</div>` : ""}<ul>${checks.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul><p>This is a label-drafting aid, not legal certification.</p></div>`;
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
  if (isGlobalPlan() && (p.exportCountry || "us") !== "domestic") {
    if (!p.exportName?.trim() && translateProductName(next.name) !== "-") {
      next.exportName = translateProductName(next.name);
      changes.push("海外用商品名を候補入力");
    }
    if (!p.exportNetContent?.trim() && translateVolume(next.volume) !== "-") {
      next.exportNetContent = translateVolume(next.volume);
      changes.push("海外用内容量を候補入力");
    }
    if (!p.exportAddress?.trim() && translateBusinessAddress(p.manufacturerAddress)) {
      next.exportAddress = translateBusinessAddress(p.manufacturerAddress);
      changes.push("海外用住所を候補入力");
    }
    if (!p.originCountry?.trim()) {
      next.originCountry = "Japan";
      changes.push("原産国を追加");
    }
  }
  return { next, changes };
}

function render() {
  clearTimeout(renderTimer);
  const pageHtml = view === "home" ? homeHtml() : view === "menu" ? menuHtml() : view === "saved" ? savedHtml() : editorHtml(currentProduct());
  document.getElementById("root").innerHTML = `${pageHtml}${statusMessage ? `<div class="status-toast">${escapeHtml(statusMessage)}</div>` : ""}`;
  bindEvents();
}
function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(render, 250);
}
function currentProduct() { return editId === "new" ? window.draft : products.find((p) => p.id === editId); }
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
function homeHtml() {
  return `<main class="home">
    <div class="brand"><img class="brand-mark app-icon" src="./assets/app-icon.svg" alt="ラベルプリンター"><div><h1>かんたん食品表示ラベルメーカー</h1><p>食品表示ラベルをかんたん作成・印刷</p></div></div>
    ${planHtml()}
    <button class="home-next" data-action="menu">このプランで始める</button>
    <div class="recent-strip"><b>選択中</b><span>${planInfo().label}プラン / ${planInfo().note}</span></div>
  </main>`;
}
function planHtml() {
  return `<section class="plan-panel"><div class="plan-title"><b>プラン設定</b><span>作成できるラベル数を切り替えます</span></div><div class="plan-grid">${Object.entries(PLANS).map(([id, p]) => `<button class="${currentPlan === id ? "selected" : ""}" data-plan="${id}"><strong>${p.label}</strong><em>${p.price}</em><small>${p.note}</small></button>`).join("")}</div></section>`;
}
function menuHtml() {
  return `<main class="home menu-page">
    <div class="menu-head"><button class="back" data-action="plan-page">プラン変更</button><span class="plan-badge">${planInfo().label}</span></div>
    <div class="brand"><img class="brand-mark app-icon" src="./assets/app-icon.svg" alt="ラベルプリンター"><div><h1>作業を選んでください</h1><p>新しく作るか、保存済みラベルを開きます</p></div></div>
    <div class="home-actions">
      <button class="home-card primary" data-action="new"><span>新商品ラベル作成</span><small>新しい商品情報を入力してラベルを作ります</small></button>
      <button class="home-card" data-action="saved"><span>以前作ったラベルを印刷する</span><small>保存済みラベルを選んで表示・印刷します</small></button>
    </div>
    <div class="recent-strip"><b>保存済み</b><span>${products.length}件のラベルがあります</span></div>
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
        ${labelModeHtml(p)}
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
function labelModeHtml(p) {
  const locked = !isGlobalPlan();
  const country = p.exportCountry || "us";
  const exporting = country !== "domestic";
  const invalid = (value) => exporting && (!String(value || "").trim() || hasJapanese(value)) ? " invalid" : "";
  const exportFields = exporting ? `<div class="export-fields"><label class="field${invalid(exportProductName(p))}"><span>海外用商品名</span><input data-field="exportName" value="${escapeHtml(p.exportName || "")}" placeholder="例：Fried confectionery"></label><label class="field${invalid(exportAddress(p))}"><span>海外用住所</span><input data-field="exportAddress" value="${escapeHtml(p.exportAddress || "")}" placeholder="例：2-2-12 Morigo-cho, Nada-ku, Kobe, Hyogo, Japan"></label><div class="two-col"><label class="field${!p.originCountry ? " invalid" : ""}"><span>原産国</span><input data-field="originCountry" value="${escapeHtml(p.originCountry || "Japan")}" placeholder="Japan"></label><label class="field${invalid(exportNetContent(p))}"><span>海外用内容量</span><input data-field="exportNetContent" value="${escapeHtml(p.exportNetContent || "")}" placeholder="例：6 pieces / 180 g"></label></div><div class="two-col"><label class="field${invalid(p.importerName)}"><span>輸入者 / Distributor</span><input data-field="importerName" value="${escapeHtml(p.importerName || "")}" placeholder="例：ABC Foods Inc."></label><label class="field${invalid(p.importerAddress)}"><span>輸入者住所</span><input data-field="importerAddress" value="${escapeHtml(p.importerAddress || "")}" placeholder="例：123 Market St, Los Angeles, CA"></label></div></div><p class="notice">赤い欄は未入力、または日本語が残っています。商品名・住所・内容量・輸入者情報は手入力を優先します。</p>` : `<p class="notice">国内を選択中です。グローバルプラン内でも国内向けラベルを確認できます。</p>`;
  return section("グローバル設定", `${locked ? `<p class="notice">グローバル設定は2980円/月のグローバルプランで使えます。プランをグローバルにすると国別ラベルに自動で切り替わります。</p>` : `<div class="country-grid">${Object.entries(COUNTRIES).map(([id, c]) => `<button class="${country === id ? "selected" : ""}" data-country="${id}">${c.label}<small>${c.lang}</small></button>`).join("")}</div>${exportFields}`}`);
}
function previewHtml(p, d) {
  const overseas = isGlobalExport();
  const c = selectedCountry(p);
  const labelHeading = overseas ? `${c.label} Product Label` : "表示ラベル";
  const nutritionHeading = overseas ? c.nutritionTitle : "栄養成分表示";
  const targetChoices = overseas
    ? [["label", "Product label"], ["nutrition", "Nutrition"], ["both", "Both"]]
    : [["label", "表示ラベルのみ"], ["nutrition", "栄養成分表示のみ"], ["both", "両方"]];
  const labelStyle = `style="width:${escapeHtml(printCfg.w || "90")}mm;${printCfg.h ? `min-height:${escapeHtml(printCfg.h)}mm;` : ""}font-size:${escapeHtml(printCfg.fs || "7.5")}pt;"`;
  const previewNote = printPreviewSupportHtml();
  const printable = printablePreviewHtml(p, d, labelHeading, nutritionHeading, labelStyle, true);
  return `<aside class="preview-panel">
    <div class="print-controls"><select data-size>${SIZE_PRESETS.map((s) => `<option ${s.label === printCfg.label ? "selected" : ""}>${s.label}</option>`).join("")}</select></div>
    <div class="target-tabs">${targetChoices.map(([id, label]) => `<button class="${printTarget === id ? "selected" : ""}" data-target-choice="${id}">${label}</button>`).join("")}</div>
    <div class="size-controls"><label><span>幅(mm)</span><input type="number" data-print-cfg="w" value="${escapeHtml(printCfg.w || "")}" placeholder="90"></label><label><span>高さ(mm)</span><input type="number" data-print-cfg="h" value="${escapeHtml(printCfg.h || "")}" placeholder="自動"></label><label><span>余白(mm)</span><input type="number" data-print-cfg="margin" value="${escapeHtml(printCfg.margin || "")}" placeholder="3"></label><label><span>文字(pt)</span><input type="number" step="0.1" data-print-cfg="fs" value="${escapeHtml(printCfg.fs || "")}" placeholder="7.5"></label></div>
    ${previewNote}
    <div class="output-actions"><button class="action" data-action="copy-output">${overseas ? "Copy" : "コピーする"}</button><button class="action dark" data-action="open-print-preview">${overseas ? "Print preview" : "印刷前確認を開く"}</button></div>
    <div id="print-area" style="padding:${escapeHtml(printCfg.margin || "3")}mm;">${printable}</div>
    ${printPreviewOpen ? printPreviewModalHtml(printable) : ""}
  </aside>`;
}
function printablePreviewHtml(p, d, labelHeading, nutritionHeading, labelStyle, showHeadings) {
  return `<div class="print-stack">${printTarget !== "nutrition" ? `<div>${showHeadings ? `<h2 class="preview-heading">${labelHeading}</h2>` : ""}<div class="print-sized" ${labelStyle}>${basicLabelHtml(p, d)}${contaminationNoteHtml(d)}</div></div>` : ""}${printTarget !== "label" ? `<div>${showHeadings ? `<h2 class="preview-heading">${nutritionHeading}</h2>` : ""}<div class="print-sized" ${labelStyle}>${nutritionLabelHtml(d)}</div></div>` : ""}${countryCheckListHtml(p, d)}</div>`;
}
function contaminationNoteHtml(d) {
  if (!d.contamination) return "";
  const label = isGlobalExport() ? "※ Cross-contact: " : "※";
  return `<div class="contamination-note">${label}${escapeHtml(d.contamination)}</div>`;
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
  const overseas = isGlobalExport();
  const c = selectedCountry(p);
  const labelHeading = overseas ? `${c.label} Product Label` : "表示ラベル";
  const nutritionHeading = overseas ? c.nutritionTitle : "栄養成分表示";
  const labelStyle = `style="width:${escapeHtml(printCfg.w || "90")}mm;${printCfg.h ? `min-height:${escapeHtml(printCfg.h)}mm;` : ""}font-size:${escapeHtml(printCfg.fs || "7.5")}pt;"`;
  return `<style>${copyHtmlStyles()}</style>${printablePreviewHtml(p, d, labelHeading, nutritionHeading, labelStyle, true)}`;
}
function copyHtmlDocument(html) {
  return `<!doctype html><html><head><meta charset="UTF-8"></head><body>${html}</body></html>`;
}
function basicLabelHtml(p, d) {
  if (isGlobalExport()) return overseasLabelHtml(p, d);
  const maker = [p.manufacturerName, p.manufacturerPostal ? `〒${p.manufacturerPostal}` : "", p.manufacturerAddress, p.manufacturerPhone].filter(Boolean).join(" ");
  const rows = [["名称", p.name || "ー"], ["原材料名", d.ingLabel || "ー"], ["内容量", p.volume || "ー"], ["賞味期限", p.bestBefore || "ー"], ["保存方法", d.storage || "ー"]];
  selectedMfrTypes(p).forEach((type) => rows.push([type, maker || "ー"]));
  if (d.allergens.length) rows.push(["アレルゲン", `${d.allergens.join("・")}を含む`]);
  const barcode = canUseJanCode() ? janBarcodeSvg(p.janCode) : "";
  return `<div class="label-paper basic-label"><table><tbody>${rows.map(([k, v]) => `<tr><th>${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}</tbody></table>${barcode ? `<div class="label-barcode-footer"><div class="barcode-title">JANコード</div>${barcode}</div>` : ""}</div>`;
}
function overseasLabelHtml(p, d) {
  const c = selectedCountry(p);
  const maker = [p.manufacturerName, p.manufacturerPostal ? `ZIP ${p.manufacturerPostal}` : "", exportAddress(p), p.manufacturerPhone].filter(Boolean).join(" ");
  const importer = [p.importerName, p.importerAddress].filter(Boolean).join(" ");
  const ingredientsLabel = p.exportCountry === "ca" ? "Ingredients / Ingrédients" : "Ingredients";
  const containsLabel = c.allergenLead;
  const rows = [["Destination", c.label], ["Product name", exportProductName(p)], [ingredientsLabel, buildEnglishIngLabel(p.ingredients) || "-"], ["Net contents", exportNetContent(p)], ["Best before", formatExportDate(p.bestBefore, p.exportCountry || "us")], ["Country of origin", p.originCountry || "Japan"], ["Storage", translateStorage(p, d)], ["Business operator / Importer", maker || "-"]];
  if (importer) rows.push(["Importer / Distributor", importer]);
  if (d.allergens.length) rows.push(["Allergens", `${containsLabel}: ${translateAllergens(d.allergens).join(", ")}`]);
  const barcode = canUseJanCode() ? janBarcodeSvg(p.janCode) : "";
  return `<div class="label-paper basic-label overseas"><table><tbody>${rows.map(([k, v]) => `<tr><th>${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}</tbody></table>${barcode ? `<div class="label-barcode-footer"><div class="barcode-title">JAN code</div>${barcode}</div>` : ""}</div>`;
}
function nutritionLabelHtml(d) {
  const n = d.nutrition;
  const p = currentProduct();
  if (isGlobalExport()) {
    const c = selectedCountry(p);
    return `<div class="label-paper nutrition-label overseas"><h3>${escapeHtml(c.nutritionTitle)}</h3><p>${escapeHtml(c.per)}</p><table><tbody>
      <tr><th>${escapeHtml(c.calories)}</th><td>${escapeHtml(n.kcal)}kcal</td></tr>
      <tr><th>Protein</th><td>${escapeHtml(n.protein)}g</td></tr>
      <tr><th>Total fat</th><td>${escapeHtml(n.fat)}g</td></tr>
      <tr><th>${escapeHtml(c.carb)}</th><td>${escapeHtml(n.carbs)}g</td></tr>
      <tr><th>${escapeHtml(c.salt)}</th><td>${escapeHtml(n.salt)}g</td></tr>
    </tbody></table><small>Estimated values. Verify rounding, serving size and exemptions for ${escapeHtml(c.label)}.</small></div>`;
  }
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
    alert(`${planInfo().label}プランは${planInfo().note}です。プランを変更すると追加できます。`);
    view = "home";
    render();
    return;
  }
  p.updatedAt = new Date().toLocaleDateString("ja-JP");
  products = exists ? products.map((x) => (x.id === p.id ? p : x)) : [p, ...products];
  saveProducts();
  view = "edit";
  editId = p.id;
  window.draft = null;
  showStatus("保存しました");
}

function bindEvents() {
  document.querySelectorAll("[data-action='new']").forEach((el) => el.addEventListener("click", () => {
    if (!canCreateMore()) {
      alert(`${planInfo().label}プランは${planInfo().note}です。プランを変更してください。`);
      return;
    }
    assistMessage = "";
    window.draft = emptyProduct();
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
    window.draft = null;
    render();
  }));
  document.querySelectorAll("[data-action='plan-page']").forEach((el) => el.addEventListener("click", () => {
    view = "home";
    editId = null;
    window.draft = null;
    render();
  }));
  document.querySelectorAll("[data-action='saved']").forEach((el) => el.addEventListener("click", () => {
    view = "saved";
    render();
  }));
  document.querySelectorAll("[data-action='home']").forEach((el) => el.addEventListener("click", () => {
    view = "menu";
    editId = null;
    window.draft = null;
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
      alert(`${planInfo().label}プランは${planInfo().note}です。プランを変更してください。`);
      return;
    }
    const source = products.find((p) => p.id === el.dataset.dup);
    if (!source) return;
    products = [{ ...structuredClone(source), id: uid(), name: `${source.name}（複製）`, updatedAt: new Date().toLocaleDateString("ja-JP"), ingredients: source.ingredients.map((i) => ({ ...i, id: uid() })) }, ...products];
    saveProducts();
    render();
  }));
  document.querySelectorAll("[data-del]").forEach((el) => el.addEventListener("click", () => {
    if (!confirm("削除してよろしいですか？")) return;
    products = products.filter((p) => p.id !== el.dataset.del);
    saveProducts();
    render();
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
    if (editId === "new") window.draft = next;
    else products = products.map((x) => (x.id === p.id ? next : x));
    render();
  }));
  document.querySelectorAll("[data-country]").forEach((el) => el.addEventListener("click", () => {
    updateCurrent("exportCountry", el.dataset.country);
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
  const box = document.createElement("div");
  box.setAttribute("contenteditable", "true");
  box.style.position = "fixed";
  box.style.left = "-10000px";
  box.style.top = "0";
  box.style.width = "1000px";
  box.style.background = "#fff";
  box.innerHTML = html;
  document.body.appendChild(box);
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(box);
  selection.removeAllRanges();
  selection.addRange(range);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  selection.removeAllRanges();
  box.remove();
  if (ok) return Promise.resolve();
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  prompt("コピーしてください", text);
  return Promise.resolve();
}

function copyLabels() {
  const p = currentProduct();
  const d = derive(p);
  const parts = [];
  if (printTarget !== "nutrition") {
    const maker = [p.manufacturerName, p.manufacturerPostal ? `〒${p.manufacturerPostal}` : "", p.manufacturerAddress, p.manufacturerPhone].filter(Boolean).join(" ");
    if (isGlobalExport()) {
      const c = selectedCountry(p);
      const overseasMaker = [p.manufacturerName, p.manufacturerPostal ? `ZIP ${p.manufacturerPostal}` : "", exportAddress(p), p.manufacturerPhone].filter(Boolean).join(" ");
      const importer = [p.importerName, p.importerAddress].filter(Boolean).join(" ");
      parts.push([
        `Destination: ${c.label}`,
        `Product name: ${exportProductName(p)}`,
        `Ingredients: ${buildEnglishIngLabel(p.ingredients) || "-"}`,
        `Net contents: ${exportNetContent(p)}`,
        `Best before: ${formatExportDate(p.bestBefore, p.exportCountry || "us")}`,
        `Country of origin: ${p.originCountry || "Japan"}`,
        `Storage: ${translateStorage(p, d)}`,
        `Business operator / Importer: ${overseasMaker || "-"}`,
        canUseJanCode() && p.janCode ? `JAN code: ${p.janCode}` : "",
        importer ? `Importer / Distributor: ${importer}` : "",
        d.allergens.length ? `Allergens: ${c.allergenLead}: ${translateAllergens(d.allergens).join(", ")}` : "",
        d.contamination ? `※ Cross-contact: ${d.contamination}` : "",
      ].filter(Boolean).join("\n"));
    } else {
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
  }
  if (printTarget !== "label") {
    const n = d.nutrition;
    if (isGlobalExport()) {
      const c = selectedCountry(p);
      parts.push(`${c.nutritionTitle} (${c.per})\n${c.calories}: ${n.kcal}kcal\nProtein: ${n.protein}g\nTotal fat: ${n.fat}g\n${c.carb}: ${n.carbs}g\n${c.salt}: ${n.salt}g\n\nCompliance note: ${c.ingredientsNote}`);
    } else {
      parts.push(`栄養成分表示（100g当たり）\nエネルギー：${n.kcal}kcal\nたんぱく質：${n.protein}g\n脂質：${n.fat}g\n炭水化物：${n.carbs}g\n食塩相当量：${n.salt}g`);
    }
  }
  const text = parts.join("\n\n");
  const html = copyHtmlContent(p, d);
  if (navigator.clipboard?.write && window.ClipboardItem) {
    navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([copyHtmlDocument(html)], { type: "text/html" }),
        "text/plain": new Blob([text], { type: "text/plain" }),
      }),
    ])
      .then(() => showStatus("枠ごとコピーしました"))
      .catch(() => {
        copyRichHtml(html, text).then(() => showStatus("枠ごとコピーしました"));
      });
  } else {
    copyRichHtml(html, text).then(() => showStatus("枠ごとコピーしました"));
  }
}

render();
