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
  const staleIso  = new Date(Date.now() - 180*24*60*60*1000).toISOString().split("T")[0];
  const devStaleIso = new Date(Date.now() - 90*24*60*60*1000).toISOString().split("T")[0];
  return [
    { key:"expired",        label:"🚨 賞味期限切れ",                  count: rel.filter(p=>p.expiryDate&&p.expiryDate<todayIso).length },
    { key:"expiringSoon",   label:"⏰ 30日以内に賞味期限切れ",         count: rel.filter(p=>p.expiryDate&&p.expiryDate>=todayIso&&p.expiryDate<=soonIso).length },
    { key:"hasLabelErrors", label:"🚫 食品表示エラーあり",              count: typeof checkFoodLabel==="function" ? rel.filter(p=>{ const d=derive(p); return checkFoodLabel(p,d).some(i=>i.level==="error"); }).length : 0 },
    { key:"review",         label:"👥 承認待ちの商品",                  count: products.filter(p=>p.approvalStatus==="review").length },
    { key:"highCost",       label:"📊 原価率60%超（赤字リスク）",       count: rel.filter(p=>{ const c=calcCosts(p); return c.costRate!==null&&c.costRate>60; }).length },
    { key:"noStock",        label:"📦 在庫ゼロ",                       count: rel.filter(p=>p.currentStock!=null&&p.currentStock!==""&&parseFloat(p.currentStock)===0).length },
    { key:"noIngredients",  label:"原材料未入力",                      count: rel.filter(p=>!(p.ingredients||[]).some(i=>i.name?.trim())).length },
    { key:"noMfr",          label:"製造者未設定",                      count: rel.filter(p=>!p.manufacturerName?.trim()).length },
    { key:"noCost",         label:"原価未設定",                        count: rel.filter(p=>(p.costMode||"direct")==="direct"?!parseFloat(p.directCost):!(p.costItems||[]).length).length },
    { key:"incomplete",     label:"完成度60%未満の商品",                count: relDa.filter(({p,d})=>calcCompletion(p,d).pct<60).length },
    { key:"noMasterLink",   label:"🔗 原材料マスタ未連携",              count: rel.filter(p=>(p.ingredients||[]).some(i=>i.name?.trim())&&!(p.ingredients||[]).some(i=>i.masterId)).length },
    { key:"devStale",       label:"🔬 開発が90日以上停滞",              count: products.filter(p=>p.phase==="development"&&p.updatedAt&&p.updatedAt<devStaleIso).length },
    { key:"stale",          label:"⏳ 6ヶ月以上更新なし",               count: rel.filter(p=>p.updatedAt&&p.updatedAt<staleIso).length },
    { key:"noBestBefore",   label:"賞味期限未設定",                    count: rel.filter(p=>!p.bestBefore?.trim()).length },
    { key:"noJan",          label:"JANコード未登録",                    count: rel.filter(p=>!p.janCode?.trim()).length },
    { key:"noImage",        label:"商品画像未登録",                    count: rel.filter(p=>!p.imageDataUrl).length },
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

  const pname = p => p.name || p.internalName || "名称未設定";
  // 食品表示法コンプライアンスは発売後商品のみ対象（開発中商品は作業中のため除外）
  const rel = products.filter(p => (p.phase || "released") === "released");
  const relDerived = derivedAll.filter(({p}) => (p.phase || "released") === "released");

  // Critical
  const expired = rel.filter(p => p.expiryDate && p.expiryDate < todayIso);
  if (expired.length) sugs.push({ level:"critical", icon:"🚨", title:"賞味期限切れの商品があります", msg:`${expired.length}件が賞味期限切れです（例：${pname(expired[0])}）。ラベルを早急に更新してください。`, action:"確認する", filterKey:"expired", topProductId:expired[0].id, topProductName:pname(expired[0]) });

  const zeroStock = rel.filter(p => p.currentStock != null && p.currentStock !== "" && parseFloat(p.currentStock) === 0);
  if (zeroStock.length) sugs.push({ level:"critical", icon:"📦", title:"在庫0件の発売商品があります", msg:`${zeroStock.length}件が在庫0です（例：${pname(zeroStock[0])}）。早急に補充または販売停止を検討してください。`, action:"確認する", filterKey:"noStock", topProductId:zeroStock[0].id, topProductName:pname(zeroStock[0]) });

  const noIng = rel.filter(p => !(p.ingredients||[]).some(i => i.name?.trim()));
  if (noIng.length) sugs.push({ level:"critical", icon:"⚠️", title:"原材料が未入力の発売商品があります", msg:`${noIng.length}件で原材料名が未入力です（例：${pname(noIng[0])}）。食品表示法の必須項目です。`, action:"確認する", filterKey:"noIngredients", topProductId:noIng[0].id, topProductName:pname(noIng[0]) });

  // 食品表示エラーがある発売商品（コンプライアンスリスク = critical）
  if (typeof checkFoodLabel === "function") {
    const labelErrProds = relDerived.filter(({p, d}) => checkFoodLabel(p, d).some(i => i.level === "error"));
    if (labelErrProds.length) sugs.push({ level:"critical", icon:"🏷", title:"食品表示エラーがある発売商品があります", msg:`${labelErrProds.length}件に食品表示基準エラーがあります（例：${pname(labelErrProds[0].p)}）。法的リスクがあります。早急に修正してください。`, action:"確認する", filterKey:"hasLabelErrors", topProductId:labelErrProds[0].p.id, topProductName:pname(labelErrProds[0].p) });
  }

  // High
  const reviewProd = products.filter(p => p.approvalStatus === "review");
  if (reviewProd.length) sugs.push({ level:"high", icon:"👥", title:"承認待ちの商品があります", msg:`${reviewProd.length}件が確認待ちです（${pname(reviewProd[0])} ほか）。速やかに確認してください。`, action:"承認画面へ", nav:"team-approval", topProductId:reviewProd[0].id, topProductName:pname(reviewProd[0]) });

  // 発売予定日が過ぎた開発商品
  const overdueRelease = products.filter(p => p.phase === "development" && p.devProject?.targetReleaseDate && p.devProject.targetReleaseDate < todayIso);
  if (overdueRelease.length) sugs.push({ level:"high", icon:"🎯", title:"発売予定日を超過した開発商品があります", msg:`${overdueRelease.length}件が発売予定日を過ぎています（例：${pname(overdueRelease[0])}）。スケジュールを見直してください。`, action:"確認する", filterKey:"development", topProductId:overdueRelease[0].id, topProductName:pname(overdueRelease[0]) });

  // 発売予定日が30日以内の開発商品
  const nearRelease = products.filter(p => p.phase === "development" && p.devProject?.targetReleaseDate && p.devProject.targetReleaseDate >= todayIso && p.devProject.targetReleaseDate <= soonIso);
  if (nearRelease.length) sugs.push({ level:"high", icon:"📅", title:"発売予定日が近い開発商品があります", msg:`${nearRelease.length}件の発売予定日が30日以内です（例：${pname(nearRelease[0])}）。準備状況を確認してください。`, action:"確認する", filterKey:"development", topProductId:nearRelease[0].id, topProductName:pname(nearRelease[0]) });

  const lowStock = rel.filter(p => p.currentStock != null && p.currentStock !== "" && parseFloat(p.currentStock) > 0 && parseFloat(p.currentStock) <= 5);
  if (lowStock.length) sugs.push({ level:"high", icon:"📉", title:"在庫が残り少ない商品があります", msg:`${lowStock.length}件の在庫が残り5個以下です（例：${pname(lowStock[0])}）。発注・補充計画を立てください。`, action:"確認する", filterKey:"noStock", topProductId:lowStock[0].id, topProductName:pname(lowStock[0]) });

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

  const staleIso2 = new Date(Date.now() - 180*24*60*60*1000).toISOString().split("T")[0];
  const stale = rel.filter(p => p.updatedAt && p.updatedAt < staleIso2);
  if (stale.length) sugs.push({ level:"low", icon:"🕐", title:"長期間更新されていない商品があります", msg:`${stale.length}件が6ヶ月以上更新されていません（例：${pname(stale[0])}）。内容が最新か確認してください。`, action:"確認する", filterKey:"stale", topProductId:stale[0].id, topProductName:pname(stale[0]) });

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
  const staleIso = new Date(Date.now() - 180*24*60*60*1000).toISOString().split("T")[0];
  const ym       = `${now.getFullYear()}/${now.getMonth()+1}`;

  const derivedAll = products.map(p => ({ p, d: derive(p), c: calcCosts(p) }));
  const rel = products.filter(p => (p.phase || "released") === "released");
  const onSaleCount         = rel.filter(p => p.productStatus !== "discontinued").length;
  const discontinuedCount   = rel.filter(p => p.productStatus === "discontinued").length;
  const inDevCount          = products.filter(p => p.phase === "development").length;
  const approvedForRelease  = products.filter(p => p.phase === "development" && p.productStatus === "approved").length;
  const reviewCount         = products.filter(p => p.approvalStatus === "review").length;

  // ── 前月比（releasedAt を使って先月の発売数を推定）──
  const _lastMonthEnd   = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split("T")[0];
  const _lastMonthStart = new Date(now.getFullYear(), now.getMonth()-1, 1).toISOString().split("T")[0];
  const _releasedThisMonth = rel.filter(p => p.releasedAt && p.releasedAt >= _lastMonthEnd.substring(0,7)+"-01" && p.releasedAt <= todayIso).length;
  const _releasedLastMonth = rel.filter(p => p.releasedAt && p.releasedAt >= _lastMonthStart && p.releasedAt <= _lastMonthEnd).length;
  const _relDiff = _releasedThisMonth - _releasedLastMonth;
  const _relDiffHtml = _releasedLastMonth > 0 || _releasedThisMonth > 0
    ? `<span class="kpi-mom${_relDiff > 0 ? " kpi-mom--up" : _relDiff < 0 ? " kpi-mom--dn" : ""}">${_relDiff > 0 ? "▲" : _relDiff < 0 ? "▼" : "—"}${Math.abs(_relDiff)}</span>`
    : "";
  const _devDiffHtml = ""; // 開発数は変動が少ないので省略

  const suggestions = generateAiSuggestions(derivedAll);

  const expiredCount      = rel.filter(p => p.expiryDate && p.expiryDate < todayIso).length;
  const expiringSoonCount = rel.filter(p => p.expiryDate && p.expiryDate >= todayIso && p.expiryDate <= soonIso).length;
  const lowStockCount     = rel.filter(p => p.currentStock != null && p.currentStock !== "" && parseFloat(p.currentStock) > 0 && parseFloat(p.currentStock) <= 5).length;
  const zeroStockCount    = rel.filter(p => p.currentStock != null && p.currentStock !== "" && parseFloat(p.currentStock) === 0).length;
  const staleCount        = rel.filter(p => p.updatedAt && p.updatedAt < staleIso).length;
  const stg = getStorageInfo();

  // ── コンプライアンス率（食品表示エラーゼロの発売商品比率）──
  const _complianceTotal = rel.length;
  const _complianceOkCount = typeof checkFoodLabel === "function"
    ? rel.filter(p => checkFoodLabel(p, derive(p)).every(i => i.level !== "error")).length
    : _complianceTotal;
  const complianceRate = _complianceTotal > 0 ? Math.round(_complianceOkCount / _complianceTotal * 100) : null;

  // ── コスト統計（KPI + 統計パネル で共用）──
  const relDerivedAll  = derivedAll.filter(({p}) => (p.phase || "released") === "released");
  const withCostEarly  = relDerivedAll.filter(({c}) => c.totalCost > 0);
  const _allCostRates  = withCostEarly.filter(({c}) => c.costRate !== null).map(({c}) => c.costRate);
  const _allProfitRates = withCostEarly.filter(({c}) => c.profitRate !== null).map(({c}) => c.profitRate);
  const avgCostRate    = _allCostRates.length   ? Math.round(_allCostRates.reduce((s,r)=>s+r,0)/_allCostRates.length)   : null;
  const avgProfitRate  = _allProfitRates.length ? Math.round(_allProfitRates.reduce((s,r)=>s+r,0)/_allProfitRates.length) : null;

  // ── 担当者別 今日やること ──
  const _personTasks = {};
  const _addTask = (person, task) => {
    const key = person || "（担当者未設定）";
    if (!_personTasks[key]) _personTasks[key] = [];
    // 同商品×同ラベルの重複排除（Set的に）
    if (!_personTasks[key].some(x => x.pid === task.pid && x.label === task.label))
      _personTasks[key].push(task);
  };
  products.forEach(p => {
    const person = p.specResponsible?.trim() || "";
    const pname = p.internalName || p.name || "名称未入力";
    if (p.approvalStatus === "review")
      _addTask(person, { icon:"👥", label:"承認待ち",    cls:"urgent", priority:1, pid:p.id, pname });
    if (p.phase === "development" && p.productStatus === "approved")
      _addTask(person, { icon:"🚀", label:"発売準備完了", cls:"ready",  priority:1, pid:p.id, pname });
    if (p.expiryDate && p.expiryDate < todayIso)
      _addTask(person, { icon:"🚨", label:"賞味期限切れ", cls:"urgent", priority:1, pid:p.id, pname });
    if (p.expiryDate && p.expiryDate >= todayIso && p.expiryDate <= soonIso)
      _addTask(person, { icon:"⏰", label:"期限まで30日以内", cls:"warn", priority:2, pid:p.id, pname });
    if (!(p.ingredients||[]).some(i=>i.name?.trim()) && (p.phase||"released")==="released")
      _addTask(person, { icon:"⚠️", label:"原材料未入力", cls:"urgent", priority:2, pid:p.id, pname });
    const da = derivedAll.find(x => x.p.id === p.id);
    if (da && (p.phase || "released") === "released") {
      const comp = cachedCompletion(p, da.d);
      if (comp.missing.length && comp.pct < 60)
        _addTask(person, { icon:"📝", label:`未入力: ${comp.missing.slice(0,2).join("・")}`, cls:"warn", priority:3, pid:p.id, pname });
      // 食品表示法エラーをToDoに追加（checkFoodLabel が利用可能な場合）
      if (typeof checkFoodLabel === "function") {
        const issues = checkFoodLabel(p, da.d).filter(i => i.level === "error");
        if (issues.length)
          _addTask(person, { icon:"🚫", label:`表示エラー ${issues.length}件`, cls:"urgent", priority:2, pid:p.id, pname });
      }
      // 高原価率チェック
      const _costs = calcCosts(p);
      if (_costs.costRate !== null && _costs.costRate > 60)
        _addTask(person, { icon:"📊", label:`原価率超過 ${_costs.costRate}%`, cls:"urgent", priority:2, pid:p.id, pname });
    }
    // 在庫ゼロ（発売商品のみ）
    if ((p.phase||"released")==="released" && p.currentStock!=null && p.currentStock!=="" && parseFloat(p.currentStock)===0)
      _addTask(person, { icon:"📦", label:"在庫ゼロ", cls:"urgent", priority:1, pid:p.id, pname });
    // 開発90日停滞
    if (p.phase==="development" && p.updatedAt && p.updatedAt < new Date(Date.now()-90*24*60*60*1000).toISOString().split("T")[0])
      _addTask(person, { icon:"🔬", label:"開発が90日以上停滞", cls:"warn", priority:3, pid:p.id, pname });
  });
  const _personEntries = Object.entries(_personTasks).sort((a,b) => {
    const ap = Math.min(...a[1].map(t=>t.priority));
    const bp = Math.min(...b[1].map(t=>t.priority));
    return ap - bp;
  });
  const totalPersonTasks = _personEntries.reduce((s,[,t])=>s+t.length,0);
  const personTodoHtml = _personEntries.length ? `
  <div class="db2-section-wrap db2-person-section">
    <div class="db2-section-hd">📋 担当者別 今日やること <span class="db2-section-hd-sub">${totalPersonTasks}件の対応が必要</span></div>
    <div class="db2-person-grid">
      ${_personEntries.map(([name, tasks]) => {
        const sorted = [...tasks].sort((a,b)=>a.priority-b.priority).slice(0, 6);
        const hasUrgent = sorted.some(t => t.priority === 1);
        return `<div class="db2-person-card${hasUrgent?" db2-person-card--urgent":""}">
          <div class="db2-person-hd">
            <span class="db2-person-name">👤 ${escapeHtml(name)}</span>
            <span class="db2-person-badge${hasUrgent?" db2-person-badge--urgent":""}">${tasks.length}件</span>
          </div>
          <div class="db2-person-tasks">
            ${sorted.map(t => `<button class="db2-person-task db2-person-task--${t.cls||"info"}" data-nav-product-detail="${escapeHtml(t.pid)}">
              <span class="db2-person-task-icon">${t.icon}</span>
              <div class="db2-person-task-body">
                <span class="db2-person-task-pname">${escapeHtml(t.pname||"名称未入力")}</span>
                <span class="db2-person-task-label">${escapeHtml(t.label)}</span>
              </div>
              <span class="db2-person-task-arrow">›</span>
            </button>`).join("")}
            ${tasks.length > 6 ? `<div class="db2-person-more">他 ${tasks.length-6} 件</div>` : ""}
          </div>
        </div>`;
      }).join("")}
    </div>
  </div>` : "";

  // ── パーソナライズ: 自分のタスク ──
  const _myName = typeof currentUserName !== "undefined" ? currentUserName : "";
  const _myTasks = _myName ? (_personTasks[_myName] || []) : [];
  const myTasksHtml = _myName && _myTasks.length > 0 ? (() => {
    const sorted = [..._myTasks].sort((a,b)=>a.priority-b.priority);
    const urgentCount = sorted.filter(t=>t.priority===1).length;
    const hourStr = now.getHours() < 12 ? "おはようございます" : now.getHours() < 18 ? "こんにちは" : "お疲れ様です";
    return `<div class="db2-my-tasks">
      <div class="db2-my-tasks-hd">
        <div class="db2-my-tasks-greeting">
          <span class="db2-my-tasks-wave">👋</span>
          <span>${hourStr}、<strong>${escapeHtml(_myName)}</strong>さん</span>
          ${urgentCount > 0 ? `<span class="db2-my-tasks-urgent-badge">🚨 緊急 ${urgentCount}件</span>` : ""}
        </div>
        <span class="db2-my-tasks-count">あなたの担当: ${_myTasks.length}件の対応が必要</span>
      </div>
      <div class="db2-my-tasks-list">
        ${sorted.slice(0, 5).map(t => `<button class="db2-person-task db2-person-task--${t.cls||"info"}" data-nav-product-detail="${escapeHtml(t.pid)}">
          <span class="db2-person-task-icon">${t.icon}</span>
          <div class="db2-person-task-body">
            <span class="db2-person-task-pname">${escapeHtml(t.pname||"名称未入力")}</span>
            <span class="db2-person-task-label">${escapeHtml(t.label)}</span>
          </div>
          <span class="db2-person-task-arrow">›</span>
        </button>`).join("")}
        ${_myTasks.length > 5 ? `<button class="db2-my-tasks-more" data-set-responsible-filter="${escapeHtml(_myName)}" data-nav="products">他 ${_myTasks.length-5} 件を確認 →</button>` : ""}
      </div>
    </div>`;
  })() : "";

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
    zeroStockCount > 0
      ? `<div class="db2-alert db2-alert-danger"><span>📦</span><span><strong>${zeroStockCount}件</strong>の発売商品が在庫0です</span><button class="db2-alert-btn" data-todo-key="noStock">確認する →</button></div>`
      : "",
    lowStockCount > 0
      ? `<div class="db2-alert db2-alert-warn"><span>📉</span><span><strong>${lowStockCount}件</strong>の発売商品が残り5個以下です</span><button class="db2-alert-btn" data-todo-key="lowStock">在庫確認 →</button></div>`
      : "",
    staleCount > 0
      ? `<div class="db2-alert db2-alert-info"><span>⏳</span><span><strong>${staleCount}件</strong>の商品が6ヶ月以上更新されていません。成分・法令の見直しを推奨します</span><button class="db2-alert-btn" data-todo-key="stale">確認する →</button></div>`
      : "",
    stg.pct >= 80
      ? `<div class="db2-alert db2-alert-${stg.pct >= 95 ? "danger" : "warn"}"><span>${stg.pct >= 95 ? "🚨" : "⚠️"}</span><span>保存容量が残りわずかです（${stg.usedMB}MB / 5MB使用中）</span><button class="db2-alert-btn" data-nav="settings-nav">設定 →</button></div>`
      : "",
    (() => {
      if (typeof demoMode !== "undefined" && demoMode) return ""; // デモ中は非表示
      const pi = typeof PLANS !== "undefined" ? (PLANS[typeof currentPlan !== "undefined" ? currentPlan : "free"] || PLANS.free) : null;
      if (!pi || pi.limit === Infinity) return "";
      const used = products.length;
      const pct = Math.round(used / pi.limit * 100);
      if (pct < 80) return "";
      const remaining = pi.limit - used;
      return pct >= 100
        ? `<div class="db2-alert db2-alert-danger"><span>🚫</span><span><strong>${pi.label}プランの上限（${pi.limit}商品）</strong>に達しました。新しい商品を追加するにはプランのアップグレードが必要です</span><button class="db2-alert-btn" data-nav="settings-nav">アップグレード →</button></div>`
        : `<div class="db2-alert db2-alert-warn"><span>📊</span><span>${pi.label}プランの残り枠は<strong>${remaining}件</strong>です（${used}/${pi.limit}件使用中）</span><button class="db2-alert-btn" data-nav="settings-nav">プランを確認 →</button></div>`;
    })(),
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
        ${(() => {
          const hasPerm = typeof Notification !== "undefined" && Notification.permission === "granted";
          const lastN = typeof lastNotifDate !== "undefined" ? lastNotifDate : null;
          const lastLabel = lastN ? `最終: ${lastN}` : "未設定";
          return hasPerm
            ? `<button class="db2-notif-btn db2-notif-btn--on" data-action="setup-notif" title="${lastLabel}">🔔 通知ON</button>`
            : `<button class="db2-notif-btn" data-action="setup-notif" title="週次サマリー通知を設定">🔔 週次通知</button>`;
        })()}
        <button class="demo-start-btn demo-start-btn--sm" data-action="demo-start">🎯 デモ</button>
        <button class="db2-export-btn" data-action="export-csv" title="全商品データをExcel対応CSVでダウンロード">📥 CSV出力</button>
      </div>
    </div>
    <div class="db2-kpi-row">
      <button class="db2-kpi-card db2-kpi-green" data-nav="products" data-set-filter="all">
        <div class="db2-kpi-val">${onSaleCount}${_relDiffHtml}</div>
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
      ${reviewCount > 0 ? `<button class="db2-kpi-card db2-kpi-red" data-nav="team-approval">
        <div class="db2-kpi-val">${reviewCount}</div>
        <div class="db2-kpi-lbl">👥 承認待ち</div>
      </button>` : ""}
      <button class="db2-kpi-card ${approvedForRelease > 0 ? "db2-kpi-purple" : "db2-kpi-muted"}" data-nav="dev-products">
        <div class="db2-kpi-val">${approvedForRelease}</div>
        <div class="db2-kpi-lbl">🚀 発売準備完了</div>
      </button>
      <div class="db2-kpi-card ${suggestions.length > 0 ? "db2-kpi-red" : "db2-kpi-muted"}">
        <div class="db2-kpi-val">${suggestions.length}</div>
        <div class="db2-kpi-lbl">✦ AI提案</div>
      </div>
      ${avgCostRate !== null ? `<div class="db2-kpi-card ${avgCostRate > 40 ? "db2-kpi-red" : avgCostRate > 30 ? "db2-kpi-amber" : "db2-kpi-green"}">
        <div class="db2-kpi-val">${avgCostRate}%</div>
        <div class="db2-kpi-lbl">📊 平均原価率</div>
      </div>` : ""}
      ${avgProfitRate !== null ? `<div class="db2-kpi-card db2-kpi-green">
        <div class="db2-kpi-val">${avgProfitRate}%</div>
        <div class="db2-kpi-lbl">💹 平均粗利率</div>
      </div>` : ""}
      ${(zeroStockCount + lowStockCount) > 0 ? `<button class="db2-kpi-card ${zeroStockCount > 0 ? "db2-kpi-red" : "db2-kpi-amber"}" data-nav="products" data-set-filter="noStock">
        <div class="db2-kpi-val">${zeroStockCount + lowStockCount}</div>
        <div class="db2-kpi-lbl">📦 在庫要確認</div>
      </button>` : ""}
      ${complianceRate !== null ? (complianceRate < 100 ? `<button class="db2-kpi-card ${complianceRate >= 80 ? "db2-kpi-amber" : "db2-kpi-red"}" data-nav="products" data-set-filter="hasLabelErrors" title="表示エラーのある商品を確認する">
        <div class="db2-kpi-val">${complianceRate}%</div>
        <div class="db2-kpi-lbl">🏷 表示適合率</div>
      </button>` : `<div class="db2-kpi-card db2-kpi-green" title="食品表示エラーがない発売商品の割合">
        <div class="db2-kpi-val">${complianceRate}%</div>
        <div class="db2-kpi-lbl">🏷 表示適合率</div>
      </div>`) : ""}
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
        : aiBriefingText === "__offline__"
        ? `<div class="db2-ai-offline"><span>⚡</span><span>AIサーバーに接続できませんでした。</span><button class="action" data-action="fetch-ai-briefing">↺ 再試行</button></div>`
        : aiBriefingText
        ? `<div class="db2-ai-text">${typeof renderMarkdown === "function" ? renderMarkdown(aiBriefingText) : escapeHtml(aiBriefingText)}</div>`
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
    const updStr = formatDate(p.updatedAt||"");
    // 健康バッジ: 軽量版（完成度 % を色付きバッジとして表示、calcProductHealthは呼ばない）
    const badgeColor = pctColor;
    const urgentTask = _personTasks[p.specResponsible?.trim()]?.find(t=>t.pid===p.id&&t.priority===1);
    return `<button class="recent-prod-card" data-nav-product-detail="${escapeHtml(p.id)}">
      <div class="recent-prod-thumb-wrap">
        ${thumb}
        <span class="recent-prod-health" style="background:${badgeColor}" title="完成度 ${comp.pct}%">${comp.pct}</span>
        ${urgentTask ? `<span class="recent-prod-urgent-dot" title="${escapeHtml(urgentTask.label)}"></span>` : ""}
      </div>
      <div class="recent-prod-info">
        <div class="recent-prod-name">${escapeHtml(p.internalName||p.name||"（名称未入力）")}</div>
        <div class="recent-prod-meta">
          <span class="pipeline-chip" style="color:${ps.color};background:${ps.bg}">${ps.label}</span>
          ${p.category ? `<span class="tag-chip">${escapeHtml(p.category)}</span>` : ""}
        </div>
        <div class="recent-prod-bar"><div class="recent-prod-fill" style="width:${comp.pct}%;background:${pctColor}"></div></div>
        <div class="db2-recent-foot">
          <span class="recent-prod-pct" style="color:${pctColor}">${comp.pct}%完成</span>
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

  // ── 開発パイプラインファネル ──
  const _funnelStages = [
    { id:"ideation",    label:"💡 企画",  color:"#7c3aed" },
    { id:"development", label:"🔨 開発",  color:"#2563eb" },
    { id:"testing",     label:"🧪 試作",  color:"#0891b2" },
    { id:"review",      label:"👥 審査",  color:"#d97706" },
    { id:"approved",    label:"✅ 承認",  color:"#16a34a" },
  ];
  const _funnelCounts = Object.fromEntries(_funnelStages.map(s => [s.id, 0]));
  products.filter(p => p.phase === "development").forEach(p => {
    // approvalStatus=review → 審査ステージとみなす
    const phase = p.approvalStatus === "review" ? "review"
                : p.productStatus === "approved" ? "approved"
                : (p.devProject?.devPhase || "development");
    const key = _funnelCounts[phase] !== undefined ? phase : "development";
    _funnelCounts[key]++;
  });
  const _maxFunnel = Math.max(...Object.values(_funnelCounts), 1);
  const devFunnelHtml = inDevCount > 0 ? `<div class="dash-panel">
    <div class="dash-panel-hd">🔬 開発パイプライン <span style="font-size:11px;font-weight:400;color:var(--text-sub);margin-left:4px">${inDevCount}件</span></div>
    <div class="dev-funnel">
      ${_funnelStages.map(s => {
        const cnt = _funnelCounts[s.id] || 0;
        const pct = Math.round(cnt / _maxFunnel * 100);
        return `<div class="dev-funnel-row${cnt === 0 ? " dev-funnel-row--zero" : ""}">
          <span class="dev-funnel-lbl">${s.label}</span>
          <div class="dev-funnel-bar-wrap">
            <div class="dev-funnel-bar" style="width:${pct}%;background:${s.color}"></div>
          </div>
          <span class="dev-funnel-cnt${cnt === 0 ? " dev-funnel-cnt--zero" : ""}">${cnt}</span>
        </div>`;
      }).join("")}
      <div class="dev-funnel-arrow-row">
        <span class="dev-funnel-arrow">↓ 発売</span>
        <span class="dev-funnel-on-sale">🚀 発売中 ${onSaleCount}件</span>
      </div>
    </div>
  </div>` : "";

  // ── 月次発売トレンド（過去6ヶ月）──
  const _now = new Date();
  const _trendMonths = Array.from({length: 6}, (_, i) => {
    const d = new Date(_now.getFullYear(), _now.getMonth() - (5 - i), 1);
    return { key: `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`, label: `${d.getMonth()+1}月` };
  });
  const _relByMonth = {};
  rel.forEach(p => { if (p.releasedAt) { const m = p.releasedAt.substring(0,7); _relByMonth[m] = (_relByMonth[m]||0)+1; } });
  const _trendData = _trendMonths.map(m => ({ ...m, count: _relByMonth[m.key]||0 }));
  const _maxTrend = Math.max(..._trendData.map(m => m.count), 1);
  const _devByMonth = {};
  products.filter(p => p.phase === "development" && p.updatedAt).forEach(p => {
    const m = (p.updatedAt||"").substring(0,7);
    if (_trendMonths.some(t => t.key === m)) _devByMonth[m] = (_devByMonth[m]||0)+1;
  });
  const trendHtml = _trendData.some(m => m.count > 0 || _devByMonth[m.key]) ? `<div class="dash-panel">
    <div class="dash-panel-hd">📈 月次トレンド <span style="font-size:10px;font-weight:400;color:var(--text-sub);margin-left:4px">過去6ヶ月</span></div>
    <div class="trend-chart">
      ${_trendData.map(m => `<div class="trend-col">
        <div class="trend-bars">
          <div class="trend-bar trend-bar--dev" style="height:${_devByMonth[m.key]?Math.max(4,Math.round((_devByMonth[m.key]||0)/_maxTrend*56)):0}px" title="開発中更新:${_devByMonth[m.key]||0}件"></div>
          <div class="trend-bar trend-bar--rel" style="height:${m.count?Math.max(4,Math.round(m.count/_maxTrend*56)):0}px" title="発売:${m.count}件"></div>
        </div>
        <div class="trend-val">${m.count||(_devByMonth[m.key]?"·":"")}</div>
        <div class="trend-lbl">${m.label}</div>
      </div>`).join("")}
    </div>
    <div class="trend-legend"><span class="trend-legend-dot trend-legend-dot--rel"></span>発売 <span class="trend-legend-dot trend-legend-dot--dev" style="margin-left:8px"></span>開発</div>
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

  const withCost = withCostEarly;
  const costHtml = withCost.length ? (() => {
    const best    = [...withCost].filter(({c})=>c.profitRate!==null).sort((a,b)=>(b.c.profitRate||0)-(a.c.profitRate||0))[0];
    const worst   = [...withCost].filter(({c})=>c.costRate!==null&&c.costRate>40).sort((a,b)=>(b.c.costRate||0)-(a.c.costRate||0))[0];
    const avgRate = avgCostRate;
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

  // 収益性ランキング TOP5
  const _profitRanked = relDerivedAll
    .filter(({c}) => c.profitRate !== null && c.profitRate !== undefined)
    .sort((a, b) => b.c.profitRate - a.c.profitRate).slice(0, 5);
  const profitRankHtml = _profitRanked.length >= 2 ? `<div class="dash-panel">
    <div class="dash-panel-hd">🏆 粗利率 TOP ${_profitRanked.length}</div>
    <div class="cat-chart-list">
      ${_profitRanked.map(({p, c}, i) => {
        const pct = Math.round(c.profitRate);
        const barColor = pct >= 60 ? "#16a34a" : pct >= 40 ? "#2563eb" : "#d97706";
        return `<button class="cat-chart-row" data-nav-product-detail="${escapeHtml(p.id)}">
          <span class="profit-rank-num">${i+1}</span>
          <span class="cat-chart-label">${escapeHtml(p.internalName||p.name||"—")}</span>
          <div class="cat-chart-bar-wrap"><div class="cat-chart-bar" style="width:${Math.min(100,pct)}%;background:${barColor}"></div></div>
          <span class="cat-chart-count" style="color:${barColor}">${pct}%</span>
        </button>`;
      }).join("")}
    </div>
  </div>` : "";

  // ─────────────────────────────────────────────────
  // ④b 食品表示チェック全件サマリー
  // ─────────────────────────────────────────────────
  const _lcSummary = (() => {
    if (typeof checkFoodLabel !== "function") return null;
    let errCount = 0, warnCount = 0, okCount = 0;
    const errProds = [];
    relDerivedAll.forEach(({p, d}) => {
      const issues = checkFoodLabel(p, d);
      const errs = issues.filter(i => i.level === "error").length;
      const warns = issues.filter(i => i.level === "warn").length;
      if (errs > 0) { errCount++; errProds.push({ p, errs }); }
      else if (warns > 0) warnCount++;
      else okCount++;
    });
    return { errCount, warnCount, okCount, errProds: errProds.sort((a,b)=>b.errs-a.errs).slice(0,3) };
  })();
  const labelCheckSummaryHtml = _lcSummary && ((_lcSummary.errCount + _lcSummary.warnCount) > 0) ? `<div class="dash-panel">
    <div class="dash-panel-hd">🏷 食品表示チェック</div>
    <div class="lcs-row">
      <div class="lcs-chip lcs-chip--error"><span class="lcs-num">${_lcSummary.errCount}</span><span class="lcs-lbl">エラーあり</span></div>
      <div class="lcs-chip lcs-chip--warn"><span class="lcs-num">${_lcSummary.warnCount}</span><span class="lcs-lbl">警告あり</span></div>
      <div class="lcs-chip lcs-chip--ok"><span class="lcs-num">${_lcSummary.okCount}</span><span class="lcs-lbl">問題なし</span></div>
    </div>
    ${_lcSummary.errProds.length ? `<div class="lcs-err-list">${_lcSummary.errProds.map(({p, errs}) => `<button class="lcs-err-item" data-nav-product-detail="${escapeHtml(p.id)}">
      <span class="lcs-err-name">${escapeHtml(p.internalName||p.name||"—")}</span>
      <span class="lcs-err-count">エラー${errs}件</span>
    </button>`).join("")}</div>` : ""}
  </div>` : "";

  // ─────────────────────────────────────────────────
  // ⑤0 販売チャネル別商品数
  // ─────────────────────────────────────────────────
  const _chMap = new Map();
  rel.forEach(p => {
    (p.salesChannels || []).forEach(ch => {
      _chMap.set(ch, (_chMap.get(ch) || 0) + 1);
    });
  });
  const _chRanked = [..._chMap.entries()].sort((a, b) => b[1] - a[1]);
  const _maxCh = _chRanked.reduce((m, [, v]) => Math.max(m, v), 1);
  const channelDistHtml = _chRanked.length >= 2 ? `<div class="dash-panel">
    <div class="dash-panel-hd">🛒 販売チャネル別商品数</div>
    <div class="cat-chart-list">
      ${_chRanked.map(([name, count]) => `<div class="cat-chart-row">
        <span class="cat-chart-label">${escapeHtml(name)}</span>
        <div class="cat-chart-bar-wrap"><div class="cat-chart-bar" style="width:${Math.round(count/_maxCh*100)}%"></div></div>
        <span class="cat-chart-count">${count}</span>
      </div>`).join("")}
    </div>
  </div>` : "";

  // ─────────────────────────────────────────────────
  // ⑤a アレルゲン分布
  // ─────────────────────────────────────────────────
  const _allergenMap = new Map();
  relDerivedAll.forEach(({p, d}) => {
    (d.allergens || []).forEach(a => {
      _allergenMap.set(a, (_allergenMap.get(a) || 0) + 1);
    });
  });
  const _allergenRanked = [..._allergenMap.entries()].sort((a, b) => b[1] - a[1]);
  const _maxAllergen = _allergenRanked.reduce((m, [, v]) => Math.max(m, v), 1);
  const allergenDistHtml = _allergenRanked.length >= 2 ? `<div class="dash-panel">
    <div class="dash-panel-hd">🥜 アレルゲン含有商品数</div>
    <div class="cat-chart-list">
      ${_allergenRanked.map(([name, count]) => {
        const pct = Math.round(count / _maxAllergen * 100);
        const relPct = Math.round(count / Math.max(rel.length, 1) * 100);
        const barColor = relPct >= 50 ? "#dc2626" : relPct >= 30 ? "#d97706" : "#64748b";
        return `<button class="cat-chart-row" data-set-allergen-filter="${escapeHtml(name)}" title="${escapeHtml(name)}を含む商品を絞り込む">
          <span class="cat-chart-label">${escapeHtml(name)}</span>
          <div class="cat-chart-bar-wrap"><div class="cat-chart-bar" style="width:${pct}%;background:${barColor}"></div></div>
          <span class="cat-chart-count" style="color:${barColor}">${count}</span>
        </button>`;
      }).join("")}
    </div>
    <p style="font-size:11px;color:var(--text-sub,#94a3b8);margin:8px 0 0">クリックで対象商品を絞り込み</p>
  </div>` : "";

  // ─────────────────────────────────────────────────
  // ⑤b 担当者別商品数
  // ─────────────────────────────────────────────────
  const _respMap = new Map();
  relDerivedAll.forEach(({p, d}) => {
    const r = p.specResponsible || "";
    if (!r) return;
    if (!_respMap.has(r)) _respMap.set(r, { total: 0, done: 0 });
    const entry = _respMap.get(r);
    entry.total++;
    if (calcCompletion(p, d).pct >= 100) entry.done++;
  });
  const _respRanked = [..._respMap.entries()].sort((a, b) => b[1].total - a[1].total).slice(0, 6);
  const _maxResp = _respRanked.reduce((m, [, v]) => Math.max(m, v.total), 1);
  const responsibleHtml = _respRanked.length >= 2 ? `<div class="dash-panel">
    <div class="dash-panel-hd">👤 担当者別 商品数</div>
    <div class="cat-chart-list">
      ${_respRanked.map(([name, v]) => {
        const doneRate = Math.round(v.done / v.total * 100);
        const barColor = doneRate >= 100 ? "#16a34a" : doneRate >= 60 ? "#2563eb" : "#d97706";
        return `<button class="cat-chart-row" data-set-responsible-filter="${escapeHtml(name)}" data-nav="products" title="クリックで絞り込み">
          <span class="cat-chart-label">${escapeHtml(name)}</span>
          <div class="cat-chart-bar-wrap"><div class="cat-chart-bar" style="width:${Math.round(v.total/_maxResp*100)}%;background:${barColor}"></div></div>
          <span class="cat-chart-count">${v.total}</span>
          <span style="font-size:10px;color:${barColor};flex-shrink:0;width:36px;text-align:right">${doneRate}%完</span>
        </button>`;
      }).join("")}
    </div>
  </div>` : "";

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
             : `<span class="db2-devproj-date">${formatDate(targetDate)}</span>`)
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
  const _parseActivityDate = (s) => {
    if (!s) return 0;
    try { return new Date(s.replace(/(\d{4})\/(\d{1,2})\/(\d{1,2})\s/, "$1-$2-$3T")).getTime(); } catch { return 0; }
  };
  activityItems.sort((a, b) => _parseActivityDate(b.ev.savedAt) - _parseActivityDate(a.ev.savedAt));
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
  // ⑧ 今月の発売予定商品（開発中）
  // ─────────────────────────────────────────────────
  const _thisMonthEnd = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-31`;
  const _thisMonthStart = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-01`;
  const upcomingReleases = products.filter(p =>
    p.phase === "development" &&
    p.devProject?.targetReleaseDate &&
    p.devProject.targetReleaseDate >= todayIso &&
    p.devProject.targetReleaseDate <= _thisMonthEnd
  ).sort((a, b) => a.devProject.targetReleaseDate.localeCompare(b.devProject.targetReleaseDate));
  const upcomingReleasesHtml = upcomingReleases.length > 0 ? `
  <div class="db2-section-wrap">
    <div class="db2-section-hd">📅 今月の発売予定 <span class="db2-section-hd-sub">${now.getMonth()+1}月中</span></div>
    <div class="db2-released-list">
      ${upcomingReleases.map(p => {
        const d = p.devProject.targetReleaseDate;
        const dLeft = Math.ceil((new Date(d) - new Date(todayIso)) / 86400000);
        const cls = dLeft <= 7 ? "db2-upcoming--urgent" : dLeft <= 14 ? "db2-upcoming--warn" : "";
        const ps = PRODUCT_STATUSES.find(s => s.id === (p.productStatus || "draft"));
        return `<button class="db2-released-row" data-nav-product-detail="${escapeHtml(p.id)}">
          <span class="db2-released-date ${cls}">${escapeHtml(d)}</span>
          <span class="db2-released-name">${escapeHtml(p.internalName || p.name || "（名称未入力）")}</span>
          ${ps ? `<span class="dps-chip" style="background:${ps.bg};color:${ps.color};border:1px solid ${ps.color}40;font-size:10px;padding:1px 6px">${ps.label}</span>` : ""}
          <span class="db2-released-arrow">›</span>
        </button>`;
      }).join("")}
    </div>
  </div>` : "";

  // ─────────────────────────────────────────────────
  // ⑨ 月次発売トレンドグラフ
  // ─────────────────────────────────────────────────
  const trendChartHtml = (() => {
    const MONTHS = 12;
    const months = [];
    for (let i = MONTHS - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ year: d.getFullYear(), month: d.getMonth() + 1, label: `${d.getMonth()+1}月` });
    }
    // releasedAt は ja-JP ロケール (例: "2026/7/18" or "2026年7月18日")
    const parseReleasedAt = (s) => {
      if (!s) return null;
      const m = s.match(/(\d{4})[\/年](\d{1,2})/);
      return m ? { year: parseInt(m[1]), month: parseInt(m[2]) } : null;
    };
    const counts = months.map(({ year, month }) => {
      return products.filter(p => {
        const r = parseReleasedAt(p.releasedAt);
        return r && r.year === year && r.month === month && p.productStatus !== "discontinued";
      }).length;
    });
    const maxC = Math.max(...counts, 1);
    const totalReleased = counts.reduce((s, c) => s + c, 0);
    if (totalReleased === 0) return "";
    const W = 320, H = 72, PAD = 4;
    const barW = Math.floor((W - PAD * 2) / MONTHS) - 2;
    const bars = months.map(({ label }, i) => {
      const h = Math.max(2, Math.round((counts[i] / maxC) * (H - 20)));
      const x = PAD + i * ((W - PAD * 2) / MONTHS);
      const y = H - h - 16;
      const isThisMonth = i === MONTHS - 1;
      const fill = isThisMonth ? "#2563eb" : counts[i] > 0 ? "#93c5fd" : "#e2e8f0";
      const labelY = H - 2;
      const showLabel = i === 0 || i === MONTHS - 1 || i === Math.floor(MONTHS / 2);
      return `<rect x="${x}" y="${y}" width="${barW}" height="${h}" fill="${fill}" rx="2"/>
        ${counts[i] > 0 ? `<text x="${x + barW/2}" y="${y - 2}" text-anchor="middle" font-size="8" fill="#64748b">${counts[i]}</text>` : ""}
        ${showLabel ? `<text x="${x + barW/2}" y="${labelY}" text-anchor="middle" font-size="8" fill="#94a3b8">${label}</text>` : ""}`;
    }).join("");
    return `<div class="db2-section-wrap db2-trend-wrap">
      <div class="db2-section-hd">📈 月次発売トレンド <span class="db2-section-hd-sub">直近12ヶ月 計${totalReleased}件</span></div>
      <svg viewBox="0 0 ${W} ${H}" class="db2-trend-chart" aria-label="月次発売トレンドグラフ">${bars}</svg>
    </div>`;
  })();

  // ─────────────────────────────────────────────────
  // 組み立て
  // ─────────────────────────────────────────────────
  return saasLayout("ダッシュボード", `
    ${alertBits}
    ${headerHtml}
    ${myTasksHtml}
    ${urgentHtml}
    <div class="db2-top-grid">
      <div class="db2-top-left">${aiTopHtml}</div>
      <div class="db2-top-right">${quickHtml}</div>
    </div>
    ${activityFeedHtml}
    ${personTodoHtml}
    ${devProjectsHtml}
    ${recentHtml}
    ${recentReleasedHtml}
    ${upcomingReleasesHtml}
    ${trendChartHtml}
    <div class="db2-bottom-grid">
      <div class="db2-bottom-main">${aiRecommHtml}</div>
      <div class="db2-bottom-side">
        ${devFunnelHtml}
        ${trendHtml}
        ${compDistHtml}
        ${catHtml}
        ${costHtml}
        ${profitRankHtml}
        ${labelCheckSummaryHtml}
        ${channelDistHtml}
        ${allergenDistHtml}
        ${responsibleHtml}
      </div>
    </div>
    ${systemHtml}
  `);
}
