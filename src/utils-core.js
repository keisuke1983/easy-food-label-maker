function getAdditiveKw() { return [...ADDITIVE_KW_DEFAULT, ...userAdditiveKw]; }

function uid() { return Math.random().toString(36).slice(2, 9); }
function escapeHtml(s = "") { return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])); }
function formatDate(str) {
  if (!str) return "";
  const m = str.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
  if (!m) return str;
  return `${m[1]}/${parseInt(m[2])}/${parseInt(m[3])}`;
}
function safeGet(key) {
  try { return localStorage.getItem(key); }
  catch { return ""; }
}
function safeDel(key) { try { localStorage.removeItem(key); } catch {} }
function safeSet(key, value) {
  try { localStorage.setItem(key, value); }
  catch (e) {
    if (e && e.name === "QuotaExceededError") {
      if (typeof showStatus === "function") {
        showStatus("保存容量が不足しています。設定 → データのバックアップ からデータを書き出してください。", { duration: 8000 });
      }
    }
  }
}
function getStorageInfo() {
  try {
    let total = 0;
    for (const k of Object.keys(localStorage)) {
      total += k.length + (localStorage.getItem(k) || "").length;
    }
    const maxChars = 5 * 1024 * 1024;
    const pct = Math.min(100, Math.round(total / maxChars * 100));
    const usedMB = (total / 1024 / 1024).toFixed(1);
    return { pct, usedMB };
  } catch {
    return { pct: 0, usedMB: "0.0" };
  }
}
function emptyProduct() {
  const ci = (() => { try { return JSON.parse(safeGet("fmcc-company-info") || "{}"); } catch { return {}; } })();
  return {
    id: uid(), name: "", internalName: "", volume: "", volumeCustomUnit: false, bestBefore: "", serving: "", janCode: "",
    storage: STORAGE_OPTS[0], storageCustom: "",
    ingredients: [{ id: uid(), name: "", weight: "" }],
    nutritionMode: "auto", nutritionManual: { kcal: "", protein: "", fat: "", carbs: "", salt: "" },
    allergensMode: "auto", allergensManual: "",
    contaminationEnabled: false, contaminationAllergens: "", contaminationText: "",
    manufacturerType: "製造者", manufacturerTypes: ["製造者"],
    manufacturerName: ci.manufacturerName || "", manufacturerPostal: "", manufacturerAddress: ci.manufacturerAddress || "", manufacturerPhone: ci.manufacturerPhone || "",
    starred: false,
    expiryDate: "",
    updatedAt: new Date().toLocaleDateString("ja-JP"),
  };
}
function loadProducts() {
  try {
    const saved = JSON.parse(safeGet("food-label-products-static"));
    if (!Array.isArray(saved)) return [];
    return saved.filter((p) => p.id !== "demo1").map(p => ({
      ...p,
      // 「食塩／トレハロース」のような ／ 入り原材料名を2行に自動分割
      ingredients: (p.ingredients || []).flatMap(i => {
        if (i.name && (i.name.includes("/") || i.name.includes("／"))) {
          return i.name.split(/[\/／]/).map((name, idx) =>
            idx === 0 ? { ...i, name: name.trim() } : { id: uid(), name: name.trim(), weight: "" }
          );
        }
        return [i];
      })
    }));
  }
  catch { return []; }
}
function saveProducts() {
  const toSave = products.map(p => {
    if (!p.imageDataUrl || !p.imageDataUrl.startsWith("data:")) return p;
    imgSet(p.id, p.imageDataUrl); // IndexedDBへ非同期保存
    return { ...p, imageDataUrl: "1" }; // localStorageにはマーカーのみ
  });
  safeSet("food-label-products-static", JSON.stringify(toSave));
  if (typeof scheduleCloudSync === "function") scheduleCloudSync();
}
function estimateNutrition(name) {
  const t = name.trim();
  if (!t) return null;
  if (NUTRITION_DB[t]) return { data: NUTRITION_DB[t], estimated: false, key: t };
  for (const [kw, dk] of FUZZY) if (t.includes(kw) || kw.includes(t)) return { data: NUTRITION_DB[dk], estimated: true, key: dk };
  for (const [k, d] of Object.entries(NUTRITION_DB)) if (t.includes(k) || k.includes(t)) return { data: d, estimated: true, key: k };
  return { data: { kcal: 320, protein: 5, fat: 8, carbs: 55, salt: 0.3 }, estimated: true, key: "一般加工食品" };
}
function isAdditive(name) { return getAdditiveKw().some((k) => name.includes(k)); }
// masterLookup(masterId) → {kcal,protein,fat,carbs,salt} or null
function calcNutrition(ingredients, masterLookup) {
  const sum = { kcal: 0, protein: 0, fat: 0, carbs: 0, salt: 0 };
  let total = 0, hasEst = false;
  ingredients.forEach((i) => {
    const w = parseFloat(i.weight) || 0;
    if (!i.name.trim() || w === 0) return;
    let nutrData = null;
    if (masterLookup && i.masterId) nutrData = masterLookup(i.masterId);
    if (!nutrData) {
      const est = estimateNutrition(i.name);
      nutrData = est.data;
      if (est.estimated) hasEst = true;
    }
    total += w;
    sum.kcal    += nutrData.kcal    * w / 100;
    sum.protein += nutrData.protein * w / 100;
    sum.fat     += nutrData.fat     * w / 100;
    sum.carbs   += nutrData.carbs   * w / 100;
    sum.salt    += nutrData.salt    * w / 100;
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
  // 「食塩／トレハロース」のようにキャリー／添加物形式の名前は、キャリー部分（／前）を除いて表示
  const add = sorted.filter((i) => isAdditive(i.name)).map((i) => i.name.includes("／") ? i.name.split("／").slice(1).join("・") : i.name).join("、");
  if (!normal && !add) return "";
  if (!add) return normal;
  if (!normal) return `／${add}`;
  return `${normal}／${add}`;
}
function stripOrigin(text) {
  return String(text || "").replace(/[（(][^）)]*[）)]/g, "").trim();
}