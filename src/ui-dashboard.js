// ── ダッシュボード UI モジュール ──────────────────────────────────────
// 依存: products, derive, calcCompletion, calcCosts, saasLayout,
//       registerBtnHtml, escapeHtml, getStorageInfo, PRODUCT_STATUSES (globals)

function calcTodo(derivedAll) {
  if (!products.length) return [];
  const da = derivedAll || products.map(p => ({ p, d: derive(p) }));
  const todayIso  = new Date().toISOString().split("T")[0];
  const soonIso   = new Date(Date.now() + 30*24*60*60*1000).toISOString().split("T")[0];
  return [
    { key:"expired",       label:"🚨 賞味期限切れ",         count: products.filter(p=>p.expiryDate&&p.expiryDate<todayIso).length },
    { key:"expiringSoon",  label:"⏰ 30日以内に賞味期限切れ", count: products.filter(p=>p.expiryDate&&p.expiryDate>=todayIso&&p.expiryDate<=soonIso).length },
    { key:"incomplete",    label:"完成度100%未満の商品",     count: da.filter(({p,d})=>calcCompletion(p,d).pct<100).length },
    { key:"noBestBefore",  label:"賞味期限未設定",           count: products.filter(p=>!p.bestBefore?.trim()).length },
    { key:"noIngredients", label:"原材料未入力",              count: products.filter(p=>!(p.ingredients||[]).some(i=>i.name?.trim())).length },
    { key:"noMfr",         label:"製造者未設定",              count: products.filter(p=>!p.manufacturerName?.trim()).length },
    { key:"noJan",         label:"JANコード未登録",           count: products.filter(p=>!p.janCode?.trim()).length },
    { key:"noImage",       label:"商品画像未登録",            count: products.filter(p=>!p.imageDataUrl).length },
    { key:"noCost",        label:"原価未設定",                count: products.filter(p=>(p.costMode||"direct")==="direct"?!parseFloat(p.directCost):!(p.costItems||[]).length).length },
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
      <p class="onboarding-sub">食品メーカー・小規模食品事業者のための<br>AI搭載・商品管理＆食品表示ラベル作成ツール</p>
      <button class="action primary onboarding-cta" data-quick-new="1">＋ 最初の商品を登録する</button>
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

  // Critical
  const expired = products.filter(p => p.expiryDate && p.expiryDate < todayIso);
  if (expired.length) sugs.push({ level:"critical", icon:"🚨", title:"賞味期限切れの商品があります", msg:`${expired.length}件が賞味期限切れです（例：${pname(expired[0])}）。ラベルを早急に更新してください。`, action:"確認する", filterKey:"expired", topProductId:expired[0].id, topProductName:pname(expired[0]) });

  const noIng = products.filter(p => !(p.ingredients||[]).some(i => i.name?.trim()));
  if (noIng.length) sugs.push({ level:"critical", icon:"⚠️", title:"原材料が未入力の商品があります", msg:`${noIng.length}件で原材料名が未入力です（例：${pname(noIng[0])}）。食品表示法の必須項目です。`, action:"確認する", filterKey:"noIngredients", topProductId:noIng[0].id, topProductName:pname(noIng[0]) });

  // High
  const reviewProd = products.filter(p => p.approvalStatus === "review");
  if (reviewProd.length) sugs.push({ level:"high", icon:"👥", title:"承認待ちの商品があります", msg:`${reviewProd.length}件が確認待ちです（${pname(reviewProd[0])} ほか）。速やかに確認してください。`, action:"承認画面へ", nav:"team-approval", topProductId:reviewProd[0].id, topProductName:pname(reviewProd[0]) });

  const highCost = derivedAll.filter(({c}) => c.costRate !== null && c.costRate > 60);
  if (highCost.length) sugs.push({ level:"high", icon:"📉", title:"原価率が高い商品があります", msg:`${highCost.length}件で原価率が60%超です（例：${pname(highCost[0].p)}）。価格設定を見直してください。`, action:"確認する", filterKey:"noCost", topProductId:highCost[0].p.id, topProductName:pname(highCost[0].p) });

  const noMfr = products.filter(p => !p.manufacturerName?.trim());
  if (noMfr.length) sugs.push({ level:"high", icon:"🏭", title:"製造者情報が未入力です", msg:`${noMfr.length}件で製造者情報が未入力です（例：${pname(noMfr[0])}）。食品表示法の必須項目です。`, action:"確認する", filterKey:"noMfr", topProductId:noMfr[0].id, topProductName:pname(noMfr[0]) });

  // Medium
  const noImg = products.filter(p => !p.imageDataUrl);
  if (noImg.length) sugs.push({ level:"medium", icon:"📷", title:"商品画像が未登録の商品があります", msg:`${noImg.length}件に画像が未登録です（例：${pname(noImg[0])}）。ECサイト掲載に必要です。`, action:"確認する", filterKey:"noImage", topProductId:noImg[0].id, topProductName:pname(noImg[0]) });

  const noCost = products.filter(p => (p.costMode||"direct")==="direct" ? !parseFloat(p.directCost) : !(p.costItems||[]).length);
  if (noCost.length) sugs.push({ level:"medium", icon:"💰", title:"原価が未設定の商品があります", msg:`${noCost.length}件で原価が未設定です（例：${pname(noCost[0])}）。利益率の把握に必要です。`, action:"確認する", filterKey:"noCost", topProductId:noCost[0].id, topProductName:pname(noCost[0]) });

  const noNutr = derivedAll.filter(({d}) => !d.nutrition.kcal);
  if (noNutr.length) sugs.push({ level:"medium", icon:"🔬", title:"栄養成分が計算されていない商品があります", msg:`${noNutr.length}件で栄養成分が未計算です（例：${pname(noNutr[0].p)}）。原材料の重量を入力してください。`, action:"確認する", filterKey:"incomplete", topProductId:noNutr[0].p.id, topProductName:pname(noNutr[0].p) });

  // Low
  const noJan = products.filter(p => !p.janCode?.trim());
  if (noJan.length) sugs.push({ level:"low", icon:"📊", title:"JANコードが未登録の商品があります", msg:`${noJan.length}件でJANコードが未登録です（例：${pname(noJan[0])}）。在庫管理・EC連携に必要です。`, action:"確認する", filterKey:"noJan", topProductId:noJan[0].id, topProductName:pname(noJan[0]) });

  const stale = products.filter(p => p.updatedAt && p.updatedAt < staleDate);
  if (stale.length) sugs.push({ level:"low", icon:"🕐", title:"長期間更新されていない商品があります", msg:`${stale.length}件が30日以上更新されていません（例：${pname(stale[0])}）。内容が最新か確認してください。`, action:"確認する", filterKey:"all", topProductId:stale[0].id, topProductName:pname(stale[0]) });

  return sugs.slice(0, 7);
}

function dashboardHtml() {
  if (products.length === 0) {
    return saasLayout("ダッシュボード", dashboardEmptyHtml());
  }

  const total = products.length;
  const derivedAll = products.map(p => ({ p, d: derive(p), c: calcCosts(p) }));
  const incomplete = derivedAll.filter(({ p, d }) => calcCompletion(p, d).pct < 100).length;
  const completedCount = total - incomplete;

  const now = new Date();
  const todayIso = now.toISOString().split("T")[0];
  const soonIso  = new Date(Date.now() + 30*24*60*60*1000).toISOString().split("T")[0];
  const ym = `${now.getFullYear()}/${now.getMonth()+1}`;
  const thisMonthCount = products.filter(p => (p.createdAt || p.updatedAt || "").startsWith(ym)).length;

  // ── 期限アラート ──
  const expiredCount      = products.filter(p => p.expiryDate && p.expiryDate < todayIso).length;
  const expiringSoonCount = products.filter(p => p.expiryDate && p.expiryDate >= todayIso && p.expiryDate <= soonIso).length;
  const expiryAlert = expiredCount > 0
    ? `<div class="expiry-alert expiry-alert--danger" role="alert">🚨 <strong>${expiredCount}件</strong>の商品が賞味期限切れです。<button class="expiry-alert-btn" data-todo-key="expired">確認する →</button></div>`
    : expiringSoonCount > 0
    ? `<div class="expiry-alert expiry-alert--warn" role="alert">⏰ <strong>${expiringSoonCount}件</strong>の商品が30日以内に期限を迎えます。<button class="expiry-alert-btn" data-todo-key="expiringSoon">確認する →</button></div>`
    : "";
  const stg = getStorageInfo();
  const storageAlert = stg.pct >= 80
    ? `<div class="expiry-alert expiry-alert--${stg.pct >= 95 ? "danger" : "warn"}" role="alert">${stg.pct >= 95 ? "🚨" : "⚠️"} 保存容量が残りわずかです（使用中 ${stg.usedMB}MB / 5MB）。<button class="expiry-alert-btn" data-nav="settings-nav">バックアップを保存する →</button></div>`
    : "";

  // ── KPI行 ──
  const reviewCount = products.filter(p => p.approvalStatus === "review").length;
  const kpiHtml = `<div class="dash-kpi-row">
    <button class="dash-kpi-card" data-nav="products" data-set-filter="all">
      <div class="dash-kpi-num">${total}</div><div class="dash-kpi-lbl">商品数</div>
    </button>
    <button class="dash-kpi-card kpi-green" data-todo-key="incomplete">
      <div class="dash-kpi-num">${completedCount}</div><div class="dash-kpi-lbl">完成済み</div>
    </button>
    <button class="dash-kpi-card kpi-blue" data-nav="products" data-set-filter="active">
      <div class="dash-kpi-num">${products.filter(p=>p.publishStatus==="active").length}</div><div class="dash-kpi-lbl">公開中</div>
    </button>
    <button class="dash-kpi-card kpi-amber" data-nav="products">
      <div class="dash-kpi-num">${thisMonthCount}</div><div class="dash-kpi-lbl">今月追加</div>
    </button>
    <button class="dash-kpi-card" data-nav="products" data-set-filter="starred">
      <div class="dash-kpi-num">${products.filter(p=>p.starred).length}</div><div class="dash-kpi-lbl">お気に入り</div>
    </button>
    <button class="dash-kpi-card kpi-purple" data-nav="team-approval">
      <div class="dash-kpi-num">${reviewCount}</div><div class="dash-kpi-lbl">承認待ち</div>
    </button>
  </div>`;

  // ── クイックアクションバー ──
  const quickHtml = `<div class="dash-quick-bar">
    ${registerBtnHtml()}
    <button class="dash-qbtn" data-nav="products">📦 商品一覧</button>
    <button class="dash-qbtn" data-nav="spec-sheet-nav">📋 規格書作成</button>
    <button class="dash-qbtn" data-nav="ai-descriptions-nav">✨ AI説明文</button>
    <button class="dash-qbtn" data-nav="ai-label-check-nav">🔬 表示チェック</button>
    <button class="dash-qbtn" data-nav="team-approval">👥 チーム・承認</button>
  </div>`;

  // ── 今日やること ──
  const todos = calcTodo(derivedAll);
  const todoHtml = `<div class="dash-panel">
    <div class="dash-panel-hd">📋 今日やること</div>
    ${todos.length === 0
      ? `<div class="dash-panel-empty">✅ すべて完了しています！</div>`
      : `<div class="todo-items">${todos.map(t => `
          <button class="todo-item" data-todo-key="${t.key}">
            <span class="todo-count">${t.count}</span>
            <span class="todo-label">${escapeHtml(t.label)}</span>
            <span class="todo-arrow">→</span>
          </button>`).join("")}</div>`}
  </div>`;

  // ── AIからのお知らせ ──
  const suggestions = generateAiSuggestions(derivedAll);

  // ── 今すぐやること フォーカスカード ──
  const topSug = suggestions[0];
  const focusHtml = topSug ? (() => {
    const ctaBtn = topSug.nav
      ? `<button class="action primary focus-cta" data-nav="${escapeHtml(topSug.nav)}">${escapeHtml(topSug.action)} →</button>`
      : `<button class="action primary focus-cta" data-nav="products" data-todo-key="${escapeHtml(topSug.filterKey||"")}">${escapeHtml(topSug.action)} →</button>`;
    return `<div class="focus-action-card focus-lvl-${topSug.level}">
      <div class="focus-left">
        <span class="focus-badge">⚡ 今すぐやること</span>
        <span class="focus-icon">${topSug.icon}</span>
      </div>
      <div class="focus-body">
        <p class="focus-title">${escapeHtml(topSug.title)}</p>
        <p class="focus-msg">${escapeHtml(topSug.msg)}</p>
      </div>
      ${ctaBtn}
    </div>`;
  })() : "";

  const levelCls = { critical:"sug-critical", high:"sug-high", medium:"sug-medium", low:"sug-low" };
  const levelLbl = { critical:"緊急", high:"重要", medium:"推奨", low:"参考" };
  const aiHtml = `<div class="dash-panel">
    <div class="dash-panel-hd">🤖 AIからのお知らせ</div>
    ${suggestions.length === 0
      ? `<div class="dash-panel-empty">✅ 現時点で改善提案はありません</div>`
      : `<div class="ai-sug-list">${suggestions.map(s => `
          <div class="ai-sug-item ${levelCls[s.level]||""}">
            <div class="ai-sug-row">
              <span class="ai-sug-badge ${levelCls[s.level]||""}">${levelLbl[s.level]||""}</span>
              <span class="ai-sug-title">${s.icon} ${escapeHtml(s.title)}</span>
            </div>
            <div class="ai-sug-msg">${escapeHtml(s.msg)}</div>
            <div class="ai-sug-actions">
              <button class="ai-sug-btn" ${s.nav?`data-nav="${s.nav}"`:`data-todo-key="${s.filterKey||"all"}"`}>${escapeHtml(s.action)} →</button>
              ${s.topProductId ? `<button class="ai-sug-btn-direct" data-nav-product-detail="${escapeHtml(s.topProductId)}" title="${escapeHtml(s.topProductName||"")}を開く">直接開く →</button>` : ""}
            </div>
          </div>`).join("")}</div>`}
  </div>`;

  // ── 最近編集した商品 ──
  const recent = [...products].sort((a,b) => (b.updatedAt||"").localeCompare(a.updatedAt||"")).slice(0, 6);
  const recentHtml = recent.map(p => {
    const rd = derivedAll.find(x => x.p.id === p.id);
    const comp = rd ? calcCompletion(rd.p, rd.d) : { pct: 0 };
    const pctColor = comp.pct >= 100 ? "#16a34a" : comp.pct >= 60 ? "#2563eb" : "#d97706";
    const thumb = p.imageDataUrl
      ? `<img class="recent-prod-thumb" src="${p.imageDataUrl}" alt="">`
      : `<div class="recent-prod-thumb-ph">📦</div>`;
    const ps = PRODUCT_STATUSES.find(s => s.id === (p.productStatus||"draft")) || PRODUCT_STATUSES[0];
    return `<button class="recent-prod-card" data-nav-product-detail="${escapeHtml(p.id)}">
      ${thumb}
      <div class="recent-prod-info">
        <div class="recent-prod-name">${escapeHtml(p.internalName||p.name||"（名称未入力）")}</div>
        <div class="recent-prod-meta">
          <span class="pipeline-chip" style="color:${ps.color};background:${ps.bg}">${ps.label}</span>
          ${p.category?`<span class="tag-chip">${escapeHtml(p.category)}</span>`:""}
        </div>
        <div class="recent-prod-bar"><div class="recent-prod-fill" style="width:${comp.pct}%;background:${pctColor}"></div></div>
        <div class="recent-prod-pct" style="color:${pctColor}">${comp.pct}%</div>
      </div>
    </button>`;
  }).join("");

  // ── 完成度分布 ──
  const compDist = derivedAll.reduce((acc,{p,d}) => {
    const pct = calcCompletion(p,d).pct;
    if (pct===100) acc.done++; else if (pct>=60) acc.near++; else if (pct>=30) acc.low++; else acc.veryLow++;
    return acc;
  }, {done:0,near:0,low:0,veryLow:0});
  const compDistHtml = total >= 2 ? `<div class="dash-panel">
    <div class="dash-panel-hd">📈 完成度の内訳</div>
    <div class="comp-dist-rows">
      <div class="comp-dist-row"><span class="comp-dist-dot" style="background:#16a34a"></span><span class="comp-dist-label">完成（100%）</span><div class="comp-dist-bar-wrap"><div class="comp-dist-bar" style="width:${Math.round(compDist.done/total*100)}%;background:#16a34a"></div></div><span class="comp-dist-count">${compDist.done}件</span></div>
      <button class="comp-dist-row comp-dist-clickable" data-set-completion-filter="lt100"><span class="comp-dist-dot" style="background:#2563eb"></span><span class="comp-dist-label">あと少し（60〜99%）</span><div class="comp-dist-bar-wrap"><div class="comp-dist-bar" style="width:${Math.round(compDist.near/total*100)}%;background:#2563eb"></div></div><span class="comp-dist-count">${compDist.near}件</span></button>
      <button class="comp-dist-row comp-dist-clickable" data-set-completion-filter="lt60"><span class="comp-dist-dot" style="background:#d97706"></span><span class="comp-dist-label">要対応（30〜59%）</span><div class="comp-dist-bar-wrap"><div class="comp-dist-bar" style="width:${Math.round(compDist.low/total*100)}%;background:#d97706"></div></div><span class="comp-dist-count">${compDist.low}件</span></button>
      ${compDist.veryLow>0?`<button class="comp-dist-row comp-dist-clickable" data-set-completion-filter="lt30"><span class="comp-dist-dot" style="background:#dc2626"></span><span class="comp-dist-label">要注意（30%未満）</span><div class="comp-dist-bar-wrap"><div class="comp-dist-bar" style="width:${Math.round(compDist.veryLow/total*100)}%;background:#dc2626"></div></div><span class="comp-dist-count">${compDist.veryLow}件</span></button>`:""}
    </div>
  </div>` : "";

  // ── カテゴリ棒グラフ ──
  const catCounts = {};
  products.forEach(p => { if (p.category) catCounts[p.category] = (catCounts[p.category]||0)+1; });
  const catEntries = Object.entries(catCounts).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const maxCat = catEntries.length ? catEntries[0][1] : 1;
  const catHtml = `<div class="dash-panel">
    <div class="dash-panel-hd">📊 カテゴリ別商品数</div>
    ${catEntries.length >= 2
      ? `<div class="cat-chart-list">
          ${catEntries.map(([cat,count])=>`
            <button class="cat-chart-row" data-set-category="${escapeHtml(cat)}">
              <span class="cat-chart-label">${escapeHtml(cat)}</span>
              <div class="cat-chart-bar-wrap"><div class="cat-chart-bar" style="width:${Math.round(count/maxCat*100)}%"></div></div>
              <span class="cat-chart-count">${count}件</span>
            </button>`).join("")}
        </div>`
      : `<div class="dash-panel-empty">カテゴリが設定された商品が2件以上になると表示されます</div>`}
  </div>`;

  // ── 週次サマリー ──
  const weekDay = now.getDay();
  const daysToMon = weekDay === 0 ? 6 : weekDay - 1;
  const weekStart = new Date(now); weekStart.setDate(weekStart.getDate()-daysToMon); weekStart.setHours(0,0,0,0);
  const lastWeekStart = new Date(weekStart); lastWeekStart.setDate(lastWeekStart.getDate()-7);
  const parseProdDate = s => { if(!s) return null; const d=new Date(s.replace(/\//g,'-')); return isNaN(d.getTime())?null:d; };
  const thisWeekNew  = products.filter(p=>{ const d=parseProdDate(p.createdAt); return d&&d>=weekStart; }).length;
  const lastWeekNew  = products.filter(p=>{ const d=parseProdDate(p.createdAt); return d&&d>=lastWeekStart&&d<weekStart; }).length;
  const thisWeekUpd  = products.filter(p=>{ const d=parseProdDate(p.updatedAt); return d&&d>=weekStart; }).length;
  const avgComp = derivedAll.length ? Math.round(derivedAll.reduce((s,{p,d})=>s+calcCompletion(p,d).pct,0)/derivedAll.length) : 0;
  const newDiff = thisWeekNew - lastWeekNew;
  const weeklyHtml = `<div class="dash-panel dash-weekly-panel">
    <div class="dash-panel-hd">📅 今週のサマリー（${now.getMonth()+1}/${weekStart.getDate()}〜）</div>
    <div class="weekly-stats">
      <div class="weekly-stat">
        <div class="weekly-num">${thisWeekNew}</div>
        <div class="weekly-label">新規追加</div>
        <div class="weekly-diff ${newDiff>0?'weekly-up':newDiff<0?'weekly-down':''}">先週比 ${newDiff>0?'+':''}${newDiff}件</div>
      </div>
      <div class="weekly-stat">
        <div class="weekly-num">${thisWeekUpd}</div>
        <div class="weekly-label">今週更新</div>
        <div class="weekly-diff">商品</div>
      </div>
      <div class="weekly-stat">
        <div class="weekly-num">${avgComp}%</div>
        <div class="weekly-label">完成度平均</div>
        <div class="weekly-diff">${completedCount}/${total}件完成</div>
      </div>
    </div>
  </div>`;

  // ── 原価サマリー ──
  const withCost = derivedAll.filter(({c})=>c.totalCost>0);
  const costHtml = !withCost.length ? `<div class="dash-panel">
    <div class="dash-panel-hd">💰 原価サマリー</div>
    <div class="dash-panel-empty">原価を登録すると利益率サマリーが表示されます<br><button class="dash-panel-empty-btn" data-nav="products">商品に原価を登録する →</button></div>
  </div>` : (() => {
    const rates = withCost.filter(({c})=>c.costRate!==null).map(({c})=>c.costRate);
    const avgRate = rates.length ? Math.round(rates.reduce((s,r)=>s+r,0)/rates.length) : null;
    const best = [...withCost].filter(({c})=>c.profitRate!==null).sort((a,b)=>(b.c.profitRate||0)-(a.c.profitRate||0))[0];
    const worst = [...withCost].filter(({c})=>c.costRate!==null&&c.costRate>40).sort((a,b)=>(b.c.costRate||0)-(a.c.costRate||0))[0];
    return `<div class="dash-panel">
      <div class="dash-panel-hd">💰 原価サマリー</div>
      <div class="dash-cost-grid">
        ${avgRate!==null?`<div class="dash-cost-item"><div class="dash-cost-val ${avgRate>40?"warn":avgRate>30?"amber":""}">${avgRate}%</div><div class="dash-cost-lbl">平均原価率</div></div>`:""}
        ${best?`<div class="dash-cost-item"><div class="dash-cost-val green">${best.c.profitRate}%</div><div class="dash-cost-lbl">最高粗利率<br><small>${escapeHtml(best.p.name||"")}</small></div></div>`:""}
        ${worst?`<div class="dash-cost-item"><div class="dash-cost-val warn">${worst.c.costRate}%</div><div class="dash-cost-lbl">要注意原価率<br><small>${escapeHtml(worst.p.name||"")}</small></div></div>`:""}
        <div class="dash-cost-item"><div class="dash-cost-val">${withCost.length}</div><div class="dash-cost-lbl">原価登録済み</div></div>
      </div>
    </div>`;
  })();

  return saasLayout("ダッシュボード", `
    ${storageAlert}
    ${expiryAlert}
    ${kpiHtml}
    ${focusHtml}
    ${quickHtml}
    <div class="dash-main-grid">
      ${todoHtml}
      ${aiHtml}
    </div>
    <div class="dash-section">
      <h2 class="dash-section-title">🕐 最近編集した商品</h2>
      <div class="recent-prod-grid">${recentHtml}</div>
    </div>
    <div class="dash-bottom-grid">
      ${weeklyHtml}
      ${compDistHtml}
      ${catHtml}
      ${costHtml}
    </div>
  `);
}
