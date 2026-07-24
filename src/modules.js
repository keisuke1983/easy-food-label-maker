// ════════════════════════════════════════════════════════════════════════
// modules.js — FoodPilot モジュールシステム
//
// 新しいモジュールを追加する手順:
//   1. MODULE_DEFS にエントリを追加（label / description / requires / views）
//   2. views に saasView 名を列挙
//   3. sidebarHtml() にナビセクションを追加（app.js）
//   4. index.html へのスクリプト追加は不要（views で自動制御）
// ════════════════════════════════════════════════════════════════════════

const MODULE_DEFS = {
  manage: {
    label:       "📦 商品管理",
    description: "商品情報管理・ラベル生成・食品表示法チェック",
    requires:    [],
    views: [
      "dashboard",
      "products",
      "product-detail",
      "spec-sheet-nav",
      "ai-descriptions-nav",
      "ai-consult-nav",
      "allergen-matrix",
      "shelf-scan",
      "team-approval",
      "raw-materials",
      "saved",
      "settings-nav",
      "reg-photo",
      "reg-spec",
      "reg-ai-chat",
      "template-select",
    ],
  },
  develop: {
    label:       "🧪 商品開発",
    description: "開発プロジェクト・試作・レシピ・原価管理・発売処理",
    requires:    ["manage"],
    views:       ["dev-products"],
  },
  // ── 将来追加予定モジュール（views は実装時に追加）──────────────────────
  oem: {
    label:       "🤝 OEM",
    description: "取引先・OEM案件管理・顧客別商品管理",
    requires:    ["manage"],
    views:       [],
  },
  quality: {
    label:       "✅ 品質管理",
    description: "品質チェック・品質記録",
    requires:    ["manage"],
    views:       [],
  },
  factory: {
    label:       "🏭 製造管理",
    description: "ロット管理・製造履歴",
    requires:    ["manage"],
    views:       [],
  },
  analytics: {
    label:       "📊 分析",
    description: "KPI・売上分析・商品分析",
    requires:    ["manage"],
    views:       [],
  },
};

// ダッシュボード・設定・デモ選択は常に許可（全モジュール共通）
const _MODULE_ALWAYS_ALLOWED = new Set([
  "dashboard",
  "settings-nav",
  "saved",
  "demo-select",
]);

// ── Public API ──────────────────────────────────────────────────────────────

/**
 * 指定モジュールが有効かどうかを返す。
 * 全ての画面・ボタン・API制御はこの関数を使う。
 */
function hasModule(name) {
  return typeof activeModules !== "undefined" && activeModules.has(name);
}

/**
 * 現在有効なモジュール名の配列を返す。
 */
function getActiveModules() {
  if (typeof activeModules === "undefined") return ["manage"];
  return [...activeModules];
}

/**
 * モジュールをセットする。
 * 依存関係（requires）を自動で解決し、localStorage に永続化する。
 */
function setModules(moduleList) {
  const resolved = new Set(["manage"]); // manage は常に必須
  for (const name of moduleList) {
    const def = MODULE_DEFS[name];
    if (!def) continue;
    for (const req of (def.requires || [])) resolved.add(req);
    resolved.add(name);
  }
  if (typeof activeModules !== "undefined") {
    activeModules.clear();
    for (const m of resolved) activeModules.add(m);
  }
  try { safeSet("fp-active-modules", JSON.stringify([...resolved])); } catch {}
}

/**
 * 指定の saasView 名が現在のモジュール契約で許可されているか確認する。
 * 許可されていない場合は "dashboard" を返す（リダイレクト先）。
 */
function guardView(view) {
  if (!view) return "dashboard";
  if (_MODULE_ALWAYS_ALLOWED.has(view)) return view;
  for (const [name, def] of Object.entries(MODULE_DEFS)) {
    if (!hasModule(name)) continue;
    if ((def.views || []).includes(view)) return view;
  }
  return "dashboard";
}
