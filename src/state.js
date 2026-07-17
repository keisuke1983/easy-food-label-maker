let userAdditiveKw = (() => { try { return JSON.parse(safeGet("food-label-additive-kw") || "[]"); } catch { return []; } })();

let products = loadProducts();
let draft = null;
let currentPlan = safeGet("food-label-plan") || "free";
let view = "saas";
let editId = null;
let printTarget = "both";
let printCfg = (() => { try { const s = JSON.parse(safeGet("food-label-print-cfg") || "null"); return s && s.w ? s : SIZE_PRESETS[1]; } catch { return SIZE_PRESETS[1]; } })();
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
let productDetailTab = "basic";
let specSheetId = null;
let specShowCost = false;
let specShowSig = true;
let aiDescId = null;
let aiDescChannel = "rakuten";
let aiEditText = "";
let aiDescLoading = false;
let aiConsultProductId = null;
let aiConsultInput = "";
let aiConsultSending = false;
let registerMenuOpen = false;
let aiRegChatMessages = [];
let aiRegChatInput = "";
let aiRegChatStep = 0;
let aiRegChatDraft = {};
let aiRegAnalysisStep = -1;
let aiRegError = ""; // "" = エラーなし。写真/規格書解析失敗時にメッセージをセット
let sidebarOpen = false;
let masterSearch = "";
let masterFilter = "all";
let ingBulkPasteOpen = false;
let mobilePreviewTab = "form";
let aiLabelCheckResult = null;
let aiLabelCheckLoading = false;
let masterAutoSaveTimer = null;
let masterAutoSaveStatus = ""; // "" | "editing" | "saved"
let masterSort = safeGet("fmcc-master-sort") || "updatedAt";
let masterCategoryFilter = ""; // "" = すべて、それ以外はカテゴリ名で AND フィルタリング
let masterCompletionFilter = ""; // "" | "lt100" | "lt60" | "lt30"
let savedSearchPresets = (() => { try { return JSON.parse(safeGet("fmcc-saved-searches") || "[]"); } catch { return []; } })();

// ── チーム・承認機能 ────────────────────────────────────────────────────
let teamMembers = (() => { try { return JSON.parse(safeGet("fmcc-team-members") || "[]"); } catch { return []; } })();
let currentUserName = safeGet("fmcc-current-user") || "";

let masterPipelineFilter = ""; // "" | PRODUCT_STATUSES の id
let masterView = safeGet("fmcc-master-view") || "card"; // "card" | "table"
let masterSelected = new Set(); // テーブルビュー一括操作用選択済み商品ID

// ── AI棚スキャン ────────────────────────────────────────────────────────
let shelfScanPhase = "upload"; // "upload" | "analyzing" | "results" | "saved"
let shelfScanItems = []; // { detectedName, quantity, unit, confidence, matchedProductId }
let shelfScanError = "";

// ── クラウド同期状態 ────────────────────────────────────────────────────
let cloudSyncStatus = "idle"; // "idle" | "syncing" | "success" | "error"
let cloudSyncLastAt = safeGet("fmcc-last-sync") || "";
let cloudSyncMessage = "";

// ── AIダッシュボードブリーフィング ─────────────────────────────────────
let aiBriefingText = "";
let aiBriefingLoading = false;

// ── デモモード ──────────────────────────────────────────────────────────
let demoMode = false;
let demoStep = 1;
let demoProductId = null;

// ── 商品開発（FoodPilot Develop）────────────────────────────────────────
let devDetailTab = "overview"; // "overview"|"recipe"|"trial"|"cost"|"nutrition"|"approval"
let activeRecipeVersionId = null; // null = 採用版
let newTrialBatchOpen = false;
let recipeCompareMode = false; // レシピ版比較モード
let recipeCompareIds = []; // 比較対象バージョンID（最大4件）
