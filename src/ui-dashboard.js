// ── ダッシュボード UI モジュール ──────────────────────────────────────
// 依存: products, derive, calcCompletion, calcCosts, saasLayout,
//       registerBtnHtml, escapeHtml, getStorageInfo, PRODUCT_STATUSES (globals)

function calcTodo(derivedAll) {
  if (!products.length) return [];
  const rel = products.filter(p => (p.phase || "released") === "released");
  const da = derivedAll || products.map(p => ({ p, d: derive(p) }));
  const relDa = da.filter(({p}) => (p.phase || "released") === "released");
  const todayIso  = new Date().toISOString().split("T")[0];
  const soonIso   = new Date(Date.now() + 30*24*60*60*1000).toISOString().split("T")[0];
  return [
    { key:"expired",       label:"🚨 賞味期限切れ",         count: rel.filter(p=>p.expiryDate&&p.expiryDate<todayIso).length },
    { key:"expiringSoon",  label:"⏰ 30日以内に賞味期限切れ", count: rel.filter(p=>p.expiryDate&&p.expiryDate>=todayIso&&p.expiryDate<=soonIso).length },
    { key:"incomplete",    label:"完成度100%未満の商品",     count: relDa.filter(({p,d})=>calcCompletion(p,d).pct<100).length },
    { key:"noBestBefore",  label:"賞味期限未設定",           count: rel.filter(p=>!p.bestBefore?.trim()).length },
    { key:"noIngredients", label:"原材料未入力",              count: rel.filter(p=>!(p.ingredients||[]).some(i=>i.name?.trim())).length },
    { key:"noMfr",         label:"製造者未設定",              count: rel.filter(p=>!p.manufacturerName?.trim()).length },
    { key:"noJan",         label:"JANコード未登録",           count: rel.filter(p=>!p.janCode?.trim()).length },
    { key:"noImage",       label:"商品画像未登録",            count: rel.filter(p=>!p.imageDataUrl).length },
    { key:"noCost",        label:"原価未設定",                count: rel.filter(p=>(p.costMode||"direct")==="direct"?!parseFloat(p.directCost):!(p.costItems||[]).length).length },
    { key:"noStock",       label:"📦 在庫なし・未設定",        count: rel.filter(p=>p.currentStock==null||p.currentStock===""||parseFloat(p.currentStock)===0).length },
    { key:"review",        label:"👥 承認待ちの商品",          count: products.filter(p=>p.approvalStatus==="review").length },
  ].filter(t=>t.count>0);
}

function dashboardEmptyHtml() {
  const STEPS = [
    { ico: "📦", title: "商品を登録", desc: "商品名・原材料・製造者情報を入力" },
    { ico: "🏷", title: "ラベルを自動生成", desc: "食品表示法に沿ったラベルをリアルタイム作成" },
    { ico: "🤖", title: "AIが法令チェック", desc: "未入力項目の指摘・改善提案を自動実行" },
  ];
  return `<div class="onboarding-wrap">
    <div class="onboarding-hero">
      <img src="./assets/app-icon.svg" alt="" class="onboarding-icon">
      <h1 class="onboarding-title">FoodPilot へようこそ</h1>
      <p class="onboarding-sub">食品メーカーの商品ライフサイクルを一元管理する<br>AI搭載プラットフォーム</p>
      ${registerBtnHtml()}
      <button class="action demo-start-btn" data-action="demo-start">🎯 デモを開始（10分で価値を体感）</button>
      <button class="action" data-nav="ai-consult-nav" style="margin-top:8px">💬 AI相談 — 食品表示・法令をAIに相談</button>
    </div>
    <div class="onboarding-steps">
      ${STEPS.map((s, i) => `
        <div class="onboarding-step">
          <div class="onboarding-step-num">${i + 1}</div>
          <div class="onboarding-step-ico">${s.ico}</div>
          <div class="onboarding-step-title">${s.title}</div>
          <div class="onboarding-step-desc">${s.desc}</div>
        </div>`).join('<div class="onboarding-arrow">→</div>')}
    </div>
    <div class="onboarding-features">
      <div class="onboarding-feat"><span class="feat-ico">✓</span>食品表示法チェックリスト自動生成</div>
      <div class="onboarding-feat"><span class="feat-ico">✓</span>原材料重量から栄養成分を自動計算</div>
      <div class="onboarding-feat"><span class="feat-ico">✓</span>アレルゲン自動検出（28品目対応）</div>
      <div class="onboarding-feat"><span class="feat-ico">✓</span>商品規格書・AI商品説明文の一括生成</div>
      <div class="onboarding-feat"><span class="feat-ico">✓</span>原価・粗利管理ダッシュボード</div>
      <div class="onboarding-feat"><span class="feat-ico">✓</span>ラベルPDF印刷・画像エクスポート</div>
    </div>
    <div class="onboarding-import">
      <p>既存データをお持ちの場合：</p>
      <button class="action" data-nav="saved">保存済みラベルを開く（CSV/JSONインポート）</button>
    </div>
  </div>`;
}

function generateAiSuggestions(derivedAll) {
  const sugs = [];
  const todayIso  = new Date().toISOString().split("T")[0];
  const soonIso   = new Date(Date.now() + 30*24*60*60*1000).toISOString().split("T")[0];
  const staleDate = new Date(Date.now() - 30*24*60*60*1000).toLocaleDateString("ja-JP");

  const pname = p => p.name || p.internalName || "名称未設定";
  // 食品表示法コンプライアンスは発売後商品のみ対象（開発中商品は作業中のため除外）
  const rel = products.filter(p => (p.phase || "released") === "released");
  const relDerived = derivedAll.filter(({p}) => (p.phase || "released") === "released");

  // Critical
  const expired = rel.filter(p => p.expiryDate && p.expiryDate < todayIso);
  if (expired.length) sugs.push({ level:"critical", icon:"🚨", title:"賞味期限切れの商品があります", msg:`${expired.length}件が賞味期限切れです（例：${pname(expired[0])}）。ラベルを早急に更新してください。`, action:"確認する", filterKey:"expired", topProductId:expired[0].id, topProductName:pname(expired[0]) });

  const noIng = rel.filter(p => !(p.ingredients||[]).some(i => i.name?.trim()));
  if (noIng.length) sugs.push({ level:"critical", icon:"⚠️", title:"原材料が未入力の発売商品があります", msg:`${noIng.length}件で原材料名が未入力です（例：${pname(noIng[0])}）。食品表示法の必須項目です。`, action:"確認する", filterKey:"noIngredients", topProductId:noIng[0].id, topProductName:pname(noIng[0]) });

  // High
  const reviewProd = products.filter(p => p.approvalStatus === "review");
  if (reviewProd.length) sugs.push({ level:"high", icon:"👥", title:"承認待ちの商品があります", msg:`${reviewProd.length}件が確認待ちです（${pname(reviewProd[0])} ほか）。速やかに確認してください。`, action:"承認画面へ", nav:"team-approval", topProductId:reviewProd[0].id, topProductName:pname(reviewProd[0]) });

  const highCost = relDerived.filter(({c}) => c.costRate !== null && c.costRate > 60);
  if (highCost.length) sugs.push({ level:"high", icon:"📉", title:"原価率が高い商品があります", msg:`${highCost.length}件で原価率が60%超です（例：${pname(highCost[0].p)}）。価格設定を見直してください。`, action:"確認する", filterKey:"noCost", topProductId:highCost[0].p.id, topProductName:pname(highCost[0].p) });

  const noMfr = rel.filter(p => !p.manufacturerName?.trim());
  if (noMfr.length) sugs.push({ level:"high", icon:"🏭", title:"製造者情報が未入力の発売商品があります", msg:`${noMfr.length}件で製造者情報が未入力です（例：${pname(noMfr[0])}）。食品表示法の必須項目です。`, action:"確認する", filterKey:"noMfr", topProductId:noMfr[0].id, topProductName:pname(noMfr[0]) });

  // Medium
  const noImg = rel.filter(p => !p.imageDataUrl);
  if (noImg.length) sugs.push({ level:"medium", icon:"📷", title:"商品画像が未登録の発売商品があります", msg:`${noImg.length}件に画像が未登録です（例：${pname(noImg[0])}）。ECサイト掲載に必要です。`, action:"確認する", filterKey:"noImage", topProductId:noImg[0].id, topProductName:pname(noImg[0]) });

  const noCost = rel.filter(p => (p.costMode||"direct")==="direct" ? !parseFloat(p.directCost) : !(p.costItems||[]).length);
  if (noCost.length) sugs.push({ level:"medium", icon:"💰", title:"原価が未設定の発売商品があります", msg:`${noCost.length}件で原価が未設定です（例：${pname(noCost[0])}）。利益率の把握に必要です。`, action:"確認する", filterKey:"noCost", topProductId:noCost[0].id, topProductName:pname(noCost[0]) });

  const noNutr = relDerived.filter(({d}) => !d.nutrition.kcal);
  if (noNutr.length) sugs.push({ level:"medium", icon:"🔬", title:"栄養成分が未計算の発売商品があります", msg:`${noNutr.length}件で栄養成分が未計算です（例：${pname(noNutr[0].p)}）。原材料の重量を入力してください。`, action:"確認する", filterKey:"incomplete", topProductId:noNutr[0].p.id, topProductName:pname(noNutr[0].p) });

  // Low
  const noJan = rel.filter(p => !p.janCode?.trim());
  if (noJan.length) sugs.push({ level:"low", icon:"📊", title:"JANコードが未登録の発売商品があります", msg:`${noJan.length}件でJANコードが未登録です（例：${pname(noJan[0])}）。在庫管理・EC連携に必要です。`, action:"確認する", filterKey:"noJan", topProductId:noJan[0].id, topProductName:pname(noJan[0]) });

  const stale = rel.filter(p => p.updatedAt && p.updatedAt < staleDate);
  if (stale.length) sugs.push({ level:"low", icon:"🕐", title:"長期間更新されていない商品があります", msg:`${stale.length}件が30日以上更新されていません（例：${pname(stale[0])}）。内容が最新か確認してください。`, action:"確認する", filterKey:"all", topProductId:stale[0].id, topProductName:pname(stale[0]) });

  return sugs.slice(0, 7);
}

function dashboardHtml() {
  if (products.length === 0) {
    return saasLayout("ダッシュボード", dashboardEmptyHtml());
  }

  // ── calcCompletion メモ化 ──
  const _compCache = new Map();
  const cachedCompletion = (p, d) => {
    if (!_compCache.has(p.id)) _compCache.set(p.id, calcCompletion(p, d));
    return _compCache.get(p.id);
  };

  // ── AIブリーフィング: sessionStorageキャッシュ確認 → なければ自動フェッチ ──
  if (!aiBriefingText && !aiBriefingLoading) {
    try {
      const cached = JSON.parse(sessionStorage.getItem("fp-ai-briefing") || "null");
      if (cached && cached.exp > Date.now()) {
        aiBriefingText = cached.text;
      } else {
        aiBriefingLoading = true;
        queueMicrotask(() => typeof fetchAiBriefingNow === "function" && fetchAiBriefingNow(true));
      }
    } catch {
      aiBriefingLoading = true;
      queueMicrotask(() => typeof fetchAiBriefingNow === "function" && fetchAiBriefingNow(true));
    }
  }

  const now     = new Date();
  const todayIso = now.toISOString().split("T")[0];
  const soonIso  = new Date(Date.now() + 30*24*60*60*1000).toISOString().split("T")[0];
  const ym       = `${now.getFullYear()}/${now.getMonth()+1}`;

  const derivedAll = products.map(p => ({ p, d: derive(p), c: calcCosts(p) }));
  const rel = products.filter(p => (p.phase || "released") === "released");
  const onSaleCount         = rel.filter(p => p.productStatus !== "discontinued").length;
  const discontinuedCount   = rel.filter(p => p.productStatus === "discontinued").length;
  const inDevCount          = products.filter(p => p.phase === "development").length;
  const approvedForRelease  = products.filter(p => p.phase === "development" && p.productStatus === "approved").length;
  const reviewCount         = products.filter(p => p.approvalStatus === "review").length;

  const suggestions = generateAiSuggestions(derivedAll);

  const expiredCount      = rel.filter(p => p.expiryDate && p.expiryDate < todayIso).length;
  const expiringSoonCount = rel.filter(p => p.expiryDate && p.expiryDate >= todayIso && p.expiryDate <= soonIso).length;
  const stg = getStorageInfo();

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const todayStr = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日（${weekdays[now.getDay()]}）`;

  // システム状況用データ
  const supabaseUrl  = (() => { try { return localStorage.getItem("fmcc-supabase-url") || ""; } catch { return ""; } })();
  const lastSyncRaw  = (() => { try { return localStorage.getItem("fmcc-last-sync") || ""; } catch { return ""; } })();
  const planKey      = (() => { try { return localStorage.getItem("food-label-plan") || "free"; } catch { return "free"; } })();
  const planInfo     = typeof PLANS !== "undefined" ? (PLANS[planKey] || PLANS.free) : null;
  const planLabel    = planInfo ? planInfo.label : planKey;
  const limitStr     = planInfo && planInfo.limit !== Infinity ? `${planInfo.limit}件まで` : "無制限";

  const levelCls = { critical:"sug-critical", high:"sug-high", medium:"sug-medium", low:"sug-low" };
  const levelLbl = { critical:"緊急", high:"重要", medium:"推奨", low:"参考" };

  // ─────────────────────────────────────────────────
  // ① ヘッダー（ブランド + KPI）
  // ─────────────────────────────────────────────────
  const alertBits = [
    expiredCount > 0
      ? `<div class="db2-alert db2-alert-danger"><span>🚨</span><span><strong>${expiredCount}件</strong>の商品が賞味期限切れです</span><button class="db2-alert-btn" data-todo-key="expired">確認する →</button></div>`
      : "",
    expiringSoonCount > 0
      ? `<div class="db2-alert db2-alert-warn"><span>⏰</span><span><strong>${expiringSoonCount}件</strong>が30日以内に賞味期限を迎えます</span><button class="db2-alert-btn" data-todo-key="expiringSoon">確認する →</button></div>`
      : "",
    stg.pct >= 80
      ? `<div class="db2-alert db2-alert-${stg.pct >= 95 ? "danger" : "warn"}"><span>${stg.pct >= 95 ? "🚨" : "⚠️"}</span><span>保存容量が残りわずかです（${stg.usedMB}MB / 5MB使用中）</span><button class="db2-alert-btn" data-nav="settings-nav">設定 →</button></div>`
      : "",
  ].filter(Boolean).join("");

  const headerHtml = `
  <div class="db2-header">
    <div class="db2-header-top">
      <div class="db2-brand-row">
        <img src="./assets/app-icon.svg" alt="" class="db2-brand-icon" onerror="this.style.display='none'">
        <div>
          <div class="db2-brand-name">Food<span>Pilot</span></div>
          <div class="db2-brand-sub">食品メーカーのAI商品管理プラットフォーム</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <div class="db2-today-badge">${todayStr}</div>
        <button class="demo-start-btn demo-start-btn--sm" data-action="demo-start">🎯 デモ</button>
      </div>
    </div>
    <div class="db2-kpi-row">
      <button class="db2-kpi-card db2-kpi-green" data-nav="products" data-set-filter="all">
        <div class="db2-kpi-val">${onSaleCount}</div>
        <div class="db2-kpi-lbl">✅ 発売中</div>
      </button>
      <button class="db2-kpi-card db2-kpi-muted" data-nav="products" data-set-pipeline-filter="discontinued">
        <div class="db2-kpi-val">${discontinuedCount}</div>
        <div class="db2-kpi-lbl">⬛ 終売</div>
      </button>
      <button class="db2-kpi-card db2-kpi-blue" data-nav="dev-products">
        <div class="db2-kpi-val">${inDevCount}</div>
        <div class="db2-kpi-lbl">🔬 開発中</div>
      </button>
      <button class="db2-kpi-card ${approvedForRelease > 0 ? "db2-kpi-purple" : "db2-kpi-muted"}" data-nav="dev-products">
        <div class="db2-kpi-val">${approvedForRelease}</div>
        <div class="db2-kpi-lbl">🚀 発売準備完了</div>
      </button>
      <div class="db2-kpi-card ${suggestions.length > 0 ? "db2-kpi-red" : "db2-kpi-muted"}">
        <div class="db2-kpi-val">${suggestions.length}</div>
        <div class="db2-kpi-lbl">✦ AI提案</div>
      </div>
    </div>
  </div>`;

  // ─────────────────────────────────────────────────
  // ② AIサマリー（最優先表示）
  // ─────────────────────────────────────────────────
  const topSug = suggestions[0];
  const aiTopHtml = `
  <div class="db2-ai-section">
    <div class="db2-ai-briefing">
      <div class="db2-ai-briefing-hd">
        <span class="db2-ai-star">✦</span>
        <span class="db2-ai-briefing-title">今日のAIブリーフィング</span>
        ${aiBriefingText && !aiBriefingLoading
          ? `<button class="db2-ai-refresh" data-action="refresh-ai-briefing" title="再生成">↺ 更新</button>`
          : ""}
      </div>
      ${aiBriefingLoading
        ? `<div class="db2-ai-loading"><span class="ai-briefing-spinner"></span>AIが今日の状況を分析中...</div>`
        : aiBriefingText
        ? `<p class="db2-ai-text">${escapeHtml(aiBriefingText)}</p>`
        : `<div class="db2-ai-empty">
            <button class="action primary db2-ai-gen-btn" data-action="fetch-ai-briefing">✦ 今日のブリーフィングを生成</button>
            <span class="db2-ai-hint">商品データをAIが分析し、今日の優先タスクを提案します</span>
           </div>`}
    </div>
    ${topSug ? `
    <div class="db2-focus-card db2-focus-${topSug.level}">
      <div class="db2-focus-badge">⚡ 今すぐやること</div>
      <div class="db2-focus-body">
        <span class="db2-focus-icon">${topSug.icon}</span>
        <div>
          <p class="db2-focus-title">${escapeHtml(topSug.title)}</p>
          <p class="db2-focus-msg">${escapeHtml(topSug.msg)}</p>
        </div>
      </div>
      <div class="db2-focus-actions">
        <button class="action primary" style="font-size:12px;padding:6px 14px"
          ${topSug.nav
            ? `data-nav="${escapeHtml(topSug.nav)}"`
            : `data-nav="products" data-todo-key="${escapeHtml(topSug.filterKey||"")}"`}>${escapeHtml(topSug.action)} →</button>
        ${topSug.topProductId
          ? `<button class="ai-sug-btn-direct" data-nav-product-detail="${escapeHtml(topSug.topProductId)}">直接開く →</button>`
          : ""}
      </div>
    </div>` : `
    <div class="db2-all-ok">✅ 現時点で改善が必要な項目はありません。すべての商品が良好な状態です。</div>`}
    ${suggestions.length > 1 ? `
    <div class="db2-sug-mini-list">
      ${suggestions.slice(1, 4).map(s => `
        <div class="db2-sug-mini ai-sug-item ${levelCls[s.level]||""}">
          <span class="ai-sug-badge ${levelCls[s.level]||""}">${levelLbl[s.level]||""}</span>
          <span class="db2-sug-mini-title">${s.icon} ${escapeHtml(s.title)}</span>
          <button class="db2-sug-mini-btn"
            ${s.nav
              ? `data-nav="${escapeHtml(s.nav)}"`
              : `data-todo-key="${escapeHtml(s.filterKey||"all")}"`}>→</button>
        </div>`).join("")}
      ${suggestions.length > 4
        ? `<div class="db2-sug-more">他 ${suggestions.length - 4} 件の提案あり（↓ AIおすすめ参照）</div>`
        : ""}
    </div>` : ""}
  </div>`;

  // ─────────────────────────────────────────────────
  // ② ─ b 要対応商品カード
  // ─────────────────────────────────────────────────
  const urgentRaw = [];
  products.filter(p => p.approvalStatus === "review").forEach(p =>
    urgentRaw.push({ p, issue:"👥 承認待ち", cls:"review" }));
  products.filter(p => p.phase === "development" && p.productStatus === "approved").forEach(p =>
    urgentRaw.push({ p, issue:"🚀 発売準備完了", cls:"ready" }));
  rel.filter(p => p.expiryDate && p.expiryDate < todayIso).forEach(p =>
    urgentRaw.push({ p, issue:"🚨 期限切れ", cls:"expired" }));
  rel.filter(p => p.expiryDate && p.expiryDate >= todayIso && p.expiryDate <= soonIso).forEach(p =>
    urgentRaw.push({ p, issue:"⏰ 期限間近", cls:"expiring" }));
  const urgentSeen = new Set();
  const urgentItems = urgentRaw.filter(({p}) => { if (urgentSeen.has(p.id)) return false; urgentSeen.add(p.id); return true; }).slice(0, 6);
  const urgentHtml = urgentItems.length === 0 ? "" : `
  <div class="db2-urgent-section">
    <div class="db2-section-hd">⚡ 要対応商品 <span class="db2-section-hd-sub">${urgentItems.length}件</span></div>
    <div class="db2-urgent-grid">
      ${urgentItems.map(({p, issue, cls}) => {
        const rd = derivedAll.find(x => x.p.id === p.id);
        const comp = rd ? cachedCompletion(rd.p, rd.d) : { pct: 0 };
        const pctColor = comp.pct >= 100 ? "#16a34a" : comp.pct >= 60 ? "#2563eb" : "#d97706";
        const thumb = p.imageDataUrl
          ? `<img class="db2-urgent-thumb" src="${p.imageDataUrl}" alt="" onerror="this.outerHTML='<div class=\\'db2-urgent-thumb-ph\\'>📦</div>'">`
          : `<div class="db2-urgent-thumb-ph">📦</div>`;
        return `<button class="db2-urgent-card" data-nav-product-detail="${escapeHtml(p.id)}">
          ${thumb}
          <div class="db2-urgent-info">
            <div class="db2-urgent-name">${escapeHtml(p.internalName || p.name || "（名称未入力）")}</div>
            <span class="db2-urgent-issue db2-urgent-issue--${cls}">${issue}</span>
          </div>
        </button>`;
      }).join("")}
    </div>
  </div>`;

  // ─────────────────────────────────────────────────
  // ③ クイックアクション
  // ─────────────────────────────────────────────────
  const quickHtml = `
  <div class="db2-quick-section">
    <div class="db2-section-hd">クイックアクション</div>
    <div class="db2-quick-grid">
      <div class="db2-reg-wrap">${registerBtnHtml()}</div>
      <button class="db2-quick-card" data-nav="reg-spec">
        <span class="db2-quick-icon">📄</span>
        <span class="db2-quick-label">規格書から登録</span>
        <span class="db2-quick-desc">テキストを貼り付けてAI解析</span>
      </button>
      <button class="db2-quick-card" data-nav="reg-photo">
        <span class="db2-quick-icon">📷</span>
        <span class="db2-quick-label">写真から登録</span>
        <span class="db2-quick-desc">画像からAIが自動入力</span>
      </button>
      <button class="db2-quick-card" data-nav="reg-ai-chat">
        <span class="db2-quick-icon">🤖</span>
        <span class="db2-quick-label">AIで登録</span>
        <span class="db2-quick-desc">対話形式で商品を作成</span>
      </button>
      <button class="db2-quick-card" data-nav="products">
        <span class="db2-quick-icon">🏷</span>
        <span class="db2-quick-label">ラベル作成</span>
        <span class="db2-quick-desc">商品を選んでPDF印刷</span>
      </button>
      <button class="db2-quick-card" data-nav="spec-sheet-nav">
        <span class="db2-quick-icon">📑</span>
        <span class="db2-quick-label">規格書作成</span>
        <span class="db2-quick-desc">A4フォーマットで出力</span>
      </button>
      <button class="db2-quick-card" data-nav="ai-descriptions-nav">
        <span class="db2-quick-icon">✨</span>
        <span class="db2-quick-label">AI説明文</span>
        <span class="db2-quick-desc">EC用の説明文を自動生成</span>
      </button>
      <button class="db2-quick-card" data-nav="ai-consult-nav">
        <span class="db2-quick-icon">💬</span>
        <span class="db2-quick-label">AI相談</span>
        <span class="db2-quick-desc">食品表示・法令をAIに相談</span>
      </button>
    </div>
  </div>`;

  // ─────────────────────────────────────────────────
  // ④ 最近の作業
  // ─────────────────────────────────────────────────
  const recent = [...products].sort((a,b) => (b.updatedAt||"").localeCompare(a.updatedAt||"")).slice(0, 6);
  const recentCardsHtml = recent.map(p => {
    const rd = derivedAll.find(x => x.p.id === p.id);
    const comp = rd ? cachedCompletion(rd.p, rd.d) : { pct: 0 };
    const pctColor = comp.pct >= 100 ? "#16a34a" : comp.pct >= 60 ? "#2563eb" : "#d97706";
    const thumb = p.imageDataUrl
      ? `<img class="recent-prod-thumb" src="${p.imageDataUrl}" alt="" onerror="this.onerror=null;this.outerHTML='<div class=\\'recent-prod-thumb-ph recent-prod-thumb-err\\'>⚠️</div>'">`
      : `<div class="recent-prod-thumb-ph">📦</div>`;
    const ps = PRODUCT_STATUSES.find(s => s.id === (p.productStatus || ((p.phase||"released") === "development" ? "draft" : "on_sale"))) || PRODUCT_STATUSES[0];
    const updStr = (p.updatedAt||"").substring(0, 10);
    return `<button class="recent-prod-card" data-nav-product-detail="${escapeHtml(p.id)}">
      ${thumb}
      <div class="recent-prod-info">
        <div class="recent-prod-name">${escapeHtml(p.internalName||p.name||"（名称未入力）")}</div>
        <div class="recent-prod-meta">
          <span class="pipeline-chip" style="color:${ps.color};background:${ps.bg}">${ps.label}</span>
          ${p.category ? `<span class="tag-chip">${escapeHtml(p.category)}</span>` : ""}
        </div>
        <div class="recent-prod-bar"><div class="recent-prod-fill" style="width:${comp.pct}%;background:${pctColor}"></div></div>
        <div class="db2-recent-foot">
          <span class="recent-prod-pct" style="color:${pctColor}">${comp.pct}%</span>
          ${updStr ? `<span class="db2-recent-date">${updStr}</span>` : ""}
        </div>
      </div>
    </button>`;
  }).join("");

  const recentHtml = `
  <div class="db2-section-wrap">
    <div class="db2-section-hd">最近の作業 <span class="db2-section-hd-sub">直近に編集した商品</span></div>
    <div class="recent-prod-grid">${recentCardsHtml}</div>
    <div class="db2-section-footer">
      <button class="db2-see-all-btn" data-nav="products" data-set-filter="all">すべての商品を見る →</button>
    </div>
  </div>`;

  // ─────────────────────────────────────────────────
  // ⑤ AIおすすめ（全件）
  // ─────────────────────────────────────────────────
  const aiRecommHtml = `
  <div class="dash-panel db2-recomm-panel">
    <div class="db2-panel-hd-row">
      <span class="db2-panel-title">🤖 AIおすすめ</span>
      <span class="db2-panel-badge">${suggestions.length}件の改善提案</span>
    </div>
    ${suggestions.length === 0
      ? `<div class="dash-panel-empty">✅ 現時点で改善提案はありません</div>`
      : `<div class="ai-sug-list">
          ${suggestions.map(s => `
          <div class="ai-sug-item ${levelCls[s.level]||""}">
            <div class="ai-sug-row">
              <span class="ai-sug-badge ${levelCls[s.level]||""}">${levelLbl[s.level]||""}</span>
              <span class="ai-sug-title">${s.icon} ${escapeHtml(s.title)}</span>
            </div>
            <div class="ai-sug-msg">${escapeHtml(s.msg)}</div>
            <div class="ai-sug-actions">
              <button class="ai-sug-btn"
                ${s.nav
                  ? `data-nav="${escapeHtml(s.nav)}"`
                  : `data-todo-key="${escapeHtml(s.filterKey||"all")}"`}>${escapeHtml(s.action)} →</button>
              ${s.topProductId
                ? `<button class="ai-sug-btn-direct" data-nav-product-detail="${escapeHtml(s.topProductId)}" title="${escapeHtml(s.topProductName||"")}を開く">直接開く →</button>`
                : ""}
            </div>
          </div>`).join("")}
        </div>`}
  </div>`;

  // ─────────────────────────────────────────────────
  // 統計パネル（右カラム）
  // ─────────────────────────────────────────────────
  const total = products.length;
  const relDerivedAll = derivedAll.filter(({p}) => (p.phase || "released") === "released");
  const compDist = relDerivedAll.reduce((acc,{p,d}) => {
    const pct = cachedCompletion(p,d).pct;
    if (pct===100) acc.done++; else if (pct>=60) acc.near++; else if (pct>=30) acc.low++; else acc.veryLow++;
    return acc;
  }, {done:0,near:0,low:0,veryLow:0});
  const relTotal = relDerivedAll.length;
  const avgComp = relTotal
    ? Math.round(relDerivedAll.reduce((s,{p,d})=>s+cachedCompletion(p,d).pct,0)/relTotal)
    : 0;

  const compDistHtml = relTotal >= 2 ? `<div class="dash-panel">
    <div class="dash-panel-hd">📈 完成度の内訳<span style="font-size:11px;font-weight:400;color:var(--text-sub);margin-left:6px">平均 ${avgComp}%</span></div>
    <div class="comp-dist-rows">
      <div class="comp-dist-row"><span class="comp-dist-dot" style="background:#16a34a"></span><span class="comp-dist-label">完成（100%）</span><div class="comp-dist-bar-wrap"><div class="comp-dist-bar" style="width:${Math.round(compDist.done/relTotal*100)}%;background:#16a34a"></div></div><span class="comp-dist-count">${compDist.done}件</span></div>
      <button class="comp-dist-row comp-dist-clickable" data-set-completion-filter="lt100"><span class="comp-dist-dot" style="background:#2563eb"></span><span class="comp-dist-label">あと少し（60〜99%）</span><div class="comp-dist-bar-wrap"><div class="comp-dist-bar" style="width:${Math.round(compDist.near/relTotal*100)}%;background:#2563eb"></div></div><span class="comp-dist-count">${compDist.near}件</span></button>
      <button class="comp-dist-row comp-dist-clickable" data-set-completion-filter="lt60"><span class="comp-dist-dot" style="background:#d97706"></span><span class="comp-dist-label">要対応（30〜59%）</span><div class="comp-dist-bar-wrap"><div class="comp-dist-bar" style="width:${Math.round(compDist.low/relTotal*100)}%;background:#d97706"></div></div><span class="comp-dist-count">${compDist.low}件</span></button>
      ${compDist.veryLow > 0 ? `<button class="comp-dist-row comp-dist-clickable" data-set-completion-filter="lt30"><span class="comp-dist-dot" style="background:#dc2626"></span><span class="comp-dist-label">要注意（30%未満）</span><div class="comp-dist-bar-wrap"><div class="comp-dist-bar" style="width:${Math.round(compDist.veryLow/relTotal*100)}%;background:#dc2626"></div></div><span class="comp-dist-count">${compDist.veryLow}件</span></button>` : ""}
    </div>
  </div>` : "";

  const catCounts = {};
  rel.forEach(p => { if (p.category) catCounts[p.category] = (catCounts[p.category]||0)+1; });
  const catEntries = Object.entries(catCounts).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const maxCat = catEntries.length ? catEntries[0][1] : 1;
  const catHtml = catEntries.length >= 2 ? `<div class="dash-panel">
    <div class="dash-panel-hd">📊 カテゴリ別商品数</div>
    <div class="cat-chart-list">
      ${catEntries.map(([cat,count]) => `
        <button class="cat-chart-row" data-set-category="${escapeHtml(cat)}">
          <span class="cat-chart-label">${escapeHtml(cat)}</span>
          <div class="cat-chart-bar-wrap"><div class="cat-chart-bar" style="width:${Math.round(count/maxCat*100)}%"></div></div>
          <span class="cat-chart-count">${count}件</span>
        </button>`).join("")}
    </div>
  </div>` : "";

  const withCost = relDerivedAll.filter(({c})=>c.totalCost>0);
  const costHtml = withCost.length ? (() => {
    const rates   = withCost.filter(({c})=>c.costRate!==null).map(({c})=>c.costRate);
    const avgRate = rates.length ? Math.round(rates.reduce((s,r)=>s+r,0)/rates.length) : null;
    const best    = [...withCost].filter(({c})=>c.profitRate!==null).sort((a,b)=>(b.c.profitRate||0)-(a.c.profitRate||0))[0];
    const worst   = [...withCost].filter(({c})=>c.costRate!==null&&c.costRate>40).sort((a,b)=>(b.c.costRate||0)-(a.c.costRate||0))[0];
    return `<div class="dash-panel">
      <div class="dash-panel-hd">💰 原価サマリー</div>
      <div class="dash-cost-grid">
        ${avgRate!==null?`<div class="dash-cost-item"><div class="dash-cost-val ${avgRate>40?"warn":avgRate>30?"amber":""}">${avgRate}%</div><div class="dash-cost-lbl">平均原価率</div></div>`:""}
        ${best?`<div class="dash-cost-item"><div class="dash-cost-val green">${best.c.profitRate}%</div><div class="dash-cost-lbl">最高粗利率<br><small>${escapeHtml(best.p.name||"")}</small></div></div>`:""}
        ${worst?`<div class="dash-cost-item"><div class="dash-cost-val warn">${worst.c.costRate}%</div><div class="dash-cost-lbl">要注意原価率<br><small>${escapeHtml(worst.p.name||"")}</small></div></div>`:""}
        <div class="dash-cost-item"><div class="dash-cost-val">${withCost.length}</div><div class="dash-cost-lbl">原価登録済み</div></div>
      </div>
    </div>`;
  })() : `<div class="dash-panel">
    <div class="dash-panel-hd">💰 原価サマリー</div>
    <div class="dash-panel-empty">原価を登録すると利益率サマリーが表示されます<br><button class="dash-panel-empty-btn" data-nav="products">商品に原価を登録する →</button></div>
  </div>`;

  // ─────────────────────────────────────────────────
  // ⑥ システム状況
  // ─────────────────────────────────────────────────
  const syncEnabled = !!supabaseUrl;
  const syncStatus  = syncEnabled
    ? (lastSyncRaw ? `<span class="db2-sys-ok">● クラウド同期済み</span>` : `<span class="db2-sys-warn">● 未同期</span>`)
    : `<span class="db2-sys-off">● ローカル保存のみ</span>`;
  const saveStatus  = stg.pct >= 80
    ? `<span class="db2-sys-warn">⚠ ${stg.pct}%使用中</span>`
    : `<span class="db2-sys-ok">✓ 正常（${stg.pct}%）</span>`;
  const lastSyncStr = lastSyncRaw ? (() => {
    try {
      return new Date(lastSyncRaw).toLocaleString("ja-JP",
        { month:"numeric", day:"numeric", hour:"2-digit", minute:"2-digit" });
    } catch { return lastSyncRaw.substring(0, 16); }
  })() : "";

  const systemHtml = `
  <div class="db2-system-footer">
    <div class="db2-sys-item">
      <span class="db2-sys-label">クラウド同期</span>
      ${syncStatus}
      ${lastSyncStr ? `<span class="db2-sys-detail">最終: ${escapeHtml(lastSyncStr)}</span>` : ""}
    </div>
    <div class="db2-sys-sep"></div>
    <div class="db2-sys-item">
      <span class="db2-sys-label">ライセンス</span>
      <span class="db2-sys-ok">${escapeHtml(planLabel)}</span>
      <span class="db2-sys-detail">${limitStr}</span>
    </div>
    <div class="db2-sys-sep"></div>
    <div class="db2-sys-item">
      <span class="db2-sys-label">ローカル保存</span>
      ${saveStatus}
    </div>
    <div class="db2-sys-sep"></div>
    <div class="db2-sys-item">
      <span class="db2-sys-label">管理商品数</span>
      <span class="db2-sys-detail">${total}件</span>
    </div>
    ${reviewCount > 0 ? `
    <div class="db2-sys-sep"></div>
    <div class="db2-sys-item">
      <span class="db2-sys-label">承認待ち</span>
      <span class="db2-sys-warn">${reviewCount}件</span>
    </div>` : ""}
    <button class="db2-sys-settings-btn" data-nav="settings-nav">⚙ 設定</button>
  </div>`;

  // ─────────────────────────────────────────────────
  // ⑤ PLM: 開発中プロジェクト
  // ─────────────────────────────────────────────────
  const devProducts = products.filter(p => p.phase === "development")
    .sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || "")).slice(0, 5);
  const DEVPHASE_LABELS = { ideation:"💡 企画", development:"🔨 開発", testing:"🧪 試作", review:"👥 審査", approved:"✅ 承認済" };
  const devProjectsHtml = devProducts.length > 0 ? `
  <div class="db2-section-wrap">
    <div class="db2-section-hd">🔬 開発中プロジェクト <span class="db2-section-hd-sub">${devProducts.length}件</span></div>
    <div class="db2-devproj-list">
      ${devProducts.map(p => {
        const dp = p.devProject || {};
        const devPhaseLabel = DEVPHASE_LABELS[dp.devPhase] || "🔨 開発";
        const trials = (p.trialBatches || []).length;
        const versions = (p.recipeVersions || []).length;
        const targetDate = dp.targetReleaseDate || "";
        const daysLeft = targetDate ? Math.ceil((new Date(targetDate) - now) / 86400000) : null;
        const daysStr = daysLeft !== null
          ? (daysLeft < 0 ? `<span class="db2-devproj-late">⚠ ${Math.abs(daysLeft)}日超過</span>`
             : daysLeft <= 30 ? `<span class="db2-devproj-soon">${daysLeft}日後</span>`
             : `<span class="db2-devproj-date">${targetDate}</span>`)
          : "";
        const ps = PRODUCT_STATUSES.find(s => s.id === (p.productStatus || "draft")) || PRODUCT_STATUSES[0];
        return `<button class="db2-devproj-card" data-nav-product-detail="${escapeHtml(p.id)}">
          <div class="db2-devproj-top">
            <span class="db2-devproj-name">${escapeHtml(p.internalName || p.name || "（名称未入力）")}</span>
            <span class="pipeline-chip" style="color:${ps.color};background:${ps.bg}">${ps.label}</span>
          </div>
          <div class="db2-devproj-meta">
            <span class="db2-devproj-phase">${devPhaseLabel}</span>
            ${trials > 0 ? `<span class="db2-devproj-stat">🧪 試作 ${trials}件</span>` : ""}
            ${versions > 0 ? `<span class="db2-devproj-stat">📋 レシピ ${versions}版</span>` : ""}
            ${daysStr}
          </div>
          ${dp.projectName ? `<div class="db2-devproj-pname">${escapeHtml(dp.projectName)}</div>` : ""}
        </button>`;
      }).join("")}
    </div>
    <div class="db2-section-footer">
      <button class="db2-see-all-btn" data-nav="dev-products">すべての開発商品を見る →</button>
    </div>
  </div>` : "";

  // ─────────────────────────────────────────────────
  // ⑥ PLM: 全商品横断アクティビティフィード
  // ─────────────────────────────────────────────────
  const activityItems = [];
  products.forEach(p => {
    const tl = loadTimeline(p.id);
    tl.slice(0, 3).forEach(ev => {
      activityItems.push({ p, ev });
    });
  });
  activityItems.sort((a, b) => (b.ev.savedAt || "").localeCompare(a.ev.savedAt || ""));
  const topActivity = activityItems.slice(0, 10);
  const activityFeedHtml = topActivity.length > 0 ? `
  <div class="db2-section-wrap">
    <div class="db2-section-hd">📡 最近の変更 <span class="db2-section-hd-sub">全商品の更新履歴</span></div>
    <div class="db2-activity-feed">
      ${topActivity.map(({ p, ev }) => {
        const dotColor = TIMELINE_EVENT_COLORS[ev.eventType] || "#94a3b8";
        const pName = p.internalName || p.name || "（名称未入力）";
        const changes = ev.changes && Object.keys(ev.changes).length > 0;
        const firstChange = changes ? Object.entries(ev.changes)[0] : null;
        const changeStr = firstChange
          ? ` <span class="db2-act-from">${escapeHtml(String(firstChange[1].from || "—"))}</span><span class="db2-act-arrow">→</span><span class="db2-act-to">${escapeHtml(String(firstChange[1].to || "—"))}</span>`
          : "";
        return `<button class="db2-act-row" data-nav-product-detail="${escapeHtml(p.id)}">
          <span class="db2-act-dot" style="background:${dotColor}">${ev.icon || "📌"}</span>
          <div class="db2-act-body">
            <span class="db2-act-prod">${escapeHtml(pName)}</span>
            <span class="db2-act-sep">›</span>
            <span class="db2-act-label">${escapeHtml(ev.label)}</span>
            ${changeStr}
          </div>
          <span class="db2-act-date">${escapeHtml((ev.savedAt || "").substring(0, 10))}</span>
        </button>`;
      }).join("")}
    </div>
  </div>` : "";

  // ─────────────────────────────────────────────────
  // ⑦ PLM: 最近発売した商品
  // ─────────────────────────────────────────────────
  const ninetyDaysAgo = new Date(Date.now() - 90 * 86400000).toISOString().split("T")[0];
  const recentReleased = rel
    .filter(p => p.releasedAt && p.releasedAt >= ninetyDaysAgo && p.productStatus !== "discontinued")
    .sort((a, b) => (b.releasedAt || "").localeCompare(a.releasedAt || "")).slice(0, 5);
  const recentReleasedHtml = recentReleased.length > 0 ? `
  <div class="db2-section-wrap">
    <div class="db2-section-hd">🚀 最近発売した商品 <span class="db2-section-hd-sub">直近90日</span></div>
    <div class="db2-released-list">
      ${recentReleased.map(p => `
        <button class="db2-released-row" data-nav-product-detail="${escapeHtml(p.id)}">
          <span class="db2-released-date">${escapeHtml(p.releasedAt || "")}</span>
          <span class="db2-released-name">${escapeHtml(p.internalName || p.name || "（名称未入力）")}</span>
          ${p.category ? `<span class="tag-chip">${escapeHtml(p.category)}</span>` : ""}
          <span class="db2-released-arrow">›</span>
        </button>`).join("")}
    </div>
  </div>` : "";

  // ─────────────────────────────────────────────────
  // 組み立て
  // ─────────────────────────────────────────────────
  return saasLayout("ダッシュボード", `
    ${alertBits}
    ${headerHtml}
    ${urgentHtml}
    ${devProjectsHtml}
    ${recentHtml}
    ${activityFeedHtml}
    ${recentReleasedHtml}
    <div class="db2-top-grid">
      <div class="db2-top-left">${aiTopHtml}</div>
      <div class="db2-top-right">${quickHtml}</div>
    </div>
    <div class="db2-bottom-grid">
      <div class="db2-bottom-main">${aiRecommHtml}</div>
      <div class="db2-bottom-side">
        ${compDistHtml}
        ${catHtml}
        ${costHtml}
      </div>
    </div>
    ${systemHtml}
  `);
}
