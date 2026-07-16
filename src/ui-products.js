// ── 商品マスター一覧 UI モジュール ────────────────────────────────────
// 依存: products, derive, calcCompletion, calcCosts, calcTodo, saasLayout,
//       registerBtnHtml, productStatusBadges, escapeHtml,
//       masterSearch, masterFilter, masterSort, masterView, masterSelected,
//       masterCategoryFilter, masterCompletionFilter, masterPipelineFilter,
//       savedSearchPresets, PRODUCT_STATUSES (globals)

function productsListHtml() {
  const todayIso = new Date().toISOString().split("T")[0];
  const soonIso  = new Date(Date.now() + 30*24*60*60*1000).toISOString().split("T")[0];

  let list = [...products];
  if (masterSearch) list = list.filter(p => (p.internalName||"").includes(masterSearch)||(p.name||"").includes(masterSearch)||(p.code||"").includes(masterSearch)||(p.category||"").includes(masterSearch));
  if (masterFilter==="starred")       list = list.filter(p=>p.starred);
  if (masterFilter==="active")        list = list.filter(p=>p.publishStatus==="active");
  if (masterFilter==="draft")         list = list.filter(p=>p.publishStatus==="draft");
  if (masterFilter==="review")        list = list.filter(p=>p.approvalStatus==="review");
  if (masterFilter==="approved")      list = list.filter(p=>p.approvalStatus==="approved");
  if (masterFilter==="incomplete")    list = list.filter(p=>{ const d=derive(p); return calcCompletion(p,d).pct<100; });
  if (masterFilter==="noBestBefore")  list = list.filter(p=>!p.bestBefore?.trim());
  if (masterFilter==="noIngredients") list = list.filter(p=>!(p.ingredients||[]).some(i=>i.name?.trim()));
  if (masterFilter==="noMfr")         list = list.filter(p=>!p.manufacturerName?.trim());
  if (masterFilter==="noJan")         list = list.filter(p=>!p.janCode?.trim());
  if (masterFilter==="expired")       list = list.filter(p=>p.expiryDate&&p.expiryDate<todayIso);
  if (masterFilter==="expiringSoon")  list = list.filter(p=>p.expiryDate&&p.expiryDate>=todayIso&&p.expiryDate<=soonIso);
  if (masterFilter==="noImage")       list = list.filter(p=>!p.imageDataUrl);
  if (masterFilter==="noCost")        list = list.filter(p=>(p.costMode||"direct")==="direct"?!parseFloat(p.directCost):!(p.costItems||[]).length);
  if (masterFilter==="noStock")       list = list.filter(p=>p.currentStock==null||p.currentStock===""||parseFloat(p.currentStock)===0);
  if (masterPipelineFilter)           list = list.filter(p=>(p.productStatus||"draft")===masterPipelineFilter);
  if (masterCategoryFilter)           list = list.filter(p=>(p.category||"")===masterCategoryFilter);
  if (masterCompletionFilter==="lt100") list = list.filter(p=>{ const d=derive(p); return calcCompletion(p,d).pct<100; });
  else if (masterCompletionFilter==="lt60") list = list.filter(p=>{ const d=derive(p); return calcCompletion(p,d).pct<60; });
  else if (masterCompletionFilter==="lt30") list = list.filter(p=>{ const d=derive(p); return calcCompletion(p,d).pct<30; });

  // ── ソート ──
  if (masterSort==="name") {
    list.sort((a,b)=>(a.internalName||a.name||"").localeCompare(b.internalName||b.name||"","ja"));
  } else if (masterSort==="completion") {
    const keys = new Map(list.map(p=>{ const d=derive(p); return [p.id, calcCompletion(p,d).pct]; }));
    list.sort((a,b)=>keys.get(a.id)-keys.get(b.id));
  } else if (masterSort==="expiryDate") {
    list.sort((a,b)=>{
      if (!a.expiryDate && !b.expiryDate) return 0;
      if (!a.expiryDate) return 1;
      if (!b.expiryDate) return -1;
      return a.expiryDate.localeCompare(b.expiryDate);
    });
  } else {
    list.sort((a,b)=>(b.updatedAt||"").localeCompare(a.updatedAt||""));
  }

  const statusBadge = (p) => {
    const label = p.publishStatus==="active"?"公開中":p.publishStatus==="draft"?"下書き":"非公開";
    const cls = p.publishStatus==="active"?"badge-active":p.publishStatus==="draft"?"badge-draft":"badge-inactive";
    return `<span class="status-badge ${cls}">${label}</span>`;
  };
  const approvalBadge = (p) => {
    if (!p.approvalStatus || p.approvalStatus === "none") return "";
    if (p.approvalStatus === "review")   return `<span class="status-badge badge-review">👥 確認待ち</span>`;
    if (p.approvalStatus === "approved") return `<span class="status-badge badge-approved">✓ 承認済</span>`;
    if (p.approvalStatus === "rejected") return `<span class="status-badge badge-rejected">↩ 差し戻し</span>`;
    return "";
  };

  // カードビュー（masterView === "card" のときだけ使う）
  const cards = masterView === "card" && list.length ? list.map(p => {
    const d = derive(p);
    const comp = calcCompletion(p, d);
    const thumb = p.imageDataUrl
      ? `<img class="product-thumb" src="${p.imageDataUrl}" alt="商品画像" onerror="this.onerror=null;this.outerHTML='<div class=\\'product-thumb-placeholder product-thumb-error\\'>⚠️</div>'">`
      : `<div class="product-thumb-placeholder">📦</div>`;
    const missingHtml = comp.missing.length
      ? `<div class="comp-missing">${comp.missing.map(m=>`<button class="comp-missing-btn" data-open-and-jump="${escapeHtml(p.id)}:${escapeHtml(m)}" title="${escapeHtml(m)}の入力欄へ移動">${escapeHtml(m)}</button>`).join("")}</div>`
      : "";
    const pctColor = comp.pct >= 100 ? "#16a34a" : comp.pct >= 60 ? "#2563eb" : "#d97706";
    const expiryChip = p.expiryDate && p.expiryDate < todayIso
      ? `<span class="expiry-chip expired">🚨 期限切れ</span>`
      : p.expiryDate && p.expiryDate <= soonIso
      ? `<span class="expiry-chip soon">⏰ ${Math.max(0,Math.ceil((new Date(p.expiryDate)-Date.now())/864e5))}日後</span>`
      : "";
    const _psCard = PRODUCT_STATUSES.find(s => s.id === (p.productStatus || "draft")) || PRODUCT_STATUSES[0];
    return `<div class="master-card" data-nav-product-detail="${escapeHtml(p.id)}" role="button" tabindex="0" title="クリックで詳細編集" style="border-left: 4px solid ${_psCard.color};">
      <div class="master-card-inner">
        ${thumb}
        <div class="master-card-body">
          <div class="master-card-title-row">
            <span class="master-card-name">${escapeHtml(p.internalName||p.name||"（名称未入力）")}</span>
            ${p.internalName&&p.name?`<span class="display-name-note">表示名：${escapeHtml(p.name)}</span>`:""}
            ${(() => { const ps = PRODUCT_STATUSES.find(s=>s.id===(p.productStatus||"draft"))||PRODUCT_STATUSES[0]; return `<select class="pipeline-chip-select" data-quick-status-select="${escapeHtml(p.id)}" style="color:${ps.color};background:${ps.bg};border-color:${ps.color}" onclick="event.stopPropagation()" title="クリックしてステータスを変更">${PRODUCT_STATUSES.map(s=>`<option value="${s.id}"${(p.productStatus||"draft")===s.id?" selected":""}>${s.label}</option>`).join("")}</select>`; })()}
            ${statusBadge(p)}
            ${approvalBadge(p)}
            <button class="star-btn${p.starred?" on":""}" data-toggle-star="${escapeHtml(p.id)}" onclick="event.stopPropagation()">${p.starred?"★":"☆"}</button>
          </div>
          <div class="master-card-meta">
            ${p.code?`<span class="meta-item">品番：${escapeHtml(p.code)}</span>`:""}
            ${p.category?`<span class="meta-item">${escapeHtml(p.category)}</span>`:""}
            ${p.price?`<span class="meta-item">¥${escapeHtml(p.price)}</span>`:""}
            <span class="meta-item">更新：${escapeHtml(p.updatedAt||"")}</span>
            ${(p.currentStock!=null&&p.currentStock!=="") ? `<span class="meta-item meta-stock">📦 在庫：${escapeHtml(String(p.currentStock))}${escapeHtml(p.stockUnit||"")}</span>` : ""}
            ${expiryChip}
          </div>
          <div class="comp-section">
            <div class="comp-bar-row">
              <div class="comp-bar-wrap" style="max-width:160px"><div class="comp-bar-fill" style="width:${comp.pct}%;background:${pctColor}"></div></div>
              <span class="comp-pct" style="color:${pctColor}">完成度 ${comp.pct}%</span>
            </div>
            ${missingHtml}
          </div>
          ${productStatusBadges(p, d)}
        </div>
      </div>
      <div class="master-card-actions">
        <button class="btn-action" data-label-from="${escapeHtml(p.id)}">🏷 ラベル</button>
        <button class="btn-action" data-spec-from="${escapeHtml(p.id)}">📋 規格書</button>
        <button class="btn-action" data-ai-from="${escapeHtml(p.id)}">✦ AI説明文</button>
        <button class="btn-action" data-dup="${escapeHtml(p.id)}">複製</button>
        <button class="btn-action" data-action="save-as-template" data-pid="${escapeHtml(p.id)}" onclick="event.stopPropagation()" title="カテゴリ・保存方法・製造者情報をテンプレートとして保存">📋 テンプレ保存</button>
        <button class="btn-action danger" data-del="${escapeHtml(p.id)}">削除</button>
      </div>
    </div>`;
  }).join("") : "";

  // テーブルビュー（masterView === "table" のときだけ使う）
  const allVisibleIds = list.map(p => p.id);
  const allChecked = allVisibleIds.length > 0 && allVisibleIds.every(id => masterSelected.has(id));
  const todayIso = new Date().toISOString().split("T")[0];
  const soonIso  = new Date(Date.now() + 30*24*60*60*1000).toISOString().split("T")[0];
  const sortIcon = col => masterSort === col ? " ▲" : "";
  const tableHtml = masterView === "table" && list.length ? `<table class="master-table" data-visible-ids="${allVisibleIds.join(",")}">
    <thead><tr>
      <th class="mt-col-check" onclick="event.stopPropagation()"><input type="checkbox" data-select-all ${allChecked?"checked":""} title="すべて選択/解除"></th>
      <th class="mt-col-name mt-sortable${masterSort==="name"?" mt-sort-active":""}" data-sort-col="name">商品名${sortIcon("name")}</th>
      <th class="mt-col-comp mt-sortable${masterSort==="completion"?" mt-sort-active":""}" data-sort-col="completion">完成度${sortIcon("completion")}</th>
      <th class="mt-col-status">ステータス</th>
      <th class="mt-col-pub">公開状態</th>
      <th class="mt-col-expiry mt-sortable${masterSort==="expiryDate"?" mt-sort-active":""}" data-sort-col="expiryDate">賞味期限${sortIcon("expiryDate")}</th>
      <th class="mt-col-date mt-sortable${masterSort==="updatedAt"?" mt-sort-active":""}" data-sort-col="updatedAt">更新日${sortIcon("updatedAt")}</th>
      <th class="mt-col-cat">カテゴリ</th>
      <th class="mt-col-actions">操作</th>
    </tr></thead>
    <tbody>${list.map(p => {
      const d = derive(p);
      const comp = calcCompletion(p, d);
      const ps = PRODUCT_STATUSES.find(s=>s.id===(p.productStatus||"draft"))||PRODUCT_STATUSES[0];
      const pctColor = comp.pct >= 100 ? "#16a34a" : comp.pct >= 60 ? "#2563eb" : "#d97706";
      const expiryClass = p.expiryDate && p.expiryDate < todayIso ? "mt-expiry-expired"
        : p.expiryDate && p.expiryDate <= soonIso ? "mt-expiry-soon" : "";
      const expiryHtml = p.expiryDate
        ? `<span class="mt-expiry-date ${expiryClass}">${escapeHtml(p.expiryDate)}</span>`
        : `<span class="mt-expiry-none">—</span>`;
      const isSelected = masterSelected.has(p.id);
      return `<tr class="master-row${isSelected?" master-row--selected":""}" data-nav-product-detail="${escapeHtml(p.id)}" role="button" tabindex="0">
        <td class="mt-col-check" onclick="event.stopPropagation()"><input type="checkbox" class="row-check" data-select-product="${escapeHtml(p.id)}" ${isSelected?"checked":""}></td>
        <td class="mt-col-name"><div class="mt-name-wrap">${p.starred?`<span class="mt-star">★</span>`:""}<span class="mt-name">${escapeHtml(p.internalName||p.name||"（名称未入力）")}</span>${p.internalName&&p.name?`<small class="mt-display-name">${escapeHtml(p.name)}</small>`:""}</div></td>
        <td class="mt-col-comp"><div class="mt-comp-wrap"><div class="mt-comp-bar"><div class="mt-comp-fill" style="width:${comp.pct}%;background:${pctColor}"></div></div><span class="mt-comp-pct" style="color:${pctColor}">${comp.pct}%</span></div></td>
        <td class="mt-col-status" onclick="event.stopPropagation()"><select class="pipeline-chip-select" data-quick-status-select="${escapeHtml(p.id)}" style="color:${ps.color};background:${ps.bg};border-color:${ps.color}">${PRODUCT_STATUSES.map(s=>`<option value="${s.id}"${(p.productStatus||"draft")===s.id?" selected":""}>${s.label}</option>`).join("")}</select></td>
        <td>${statusBadge(p)}</td>
        <td class="mt-col-expiry" onclick="event.stopPropagation()">${expiryHtml}</td>
        <td class="mt-col-date">${escapeHtml(p.updatedAt||"")}</td>
        <td class="mt-col-cat">${escapeHtml(p.category||"")}</td>
        <td class="mt-col-actions" onclick="event.stopPropagation()">
          <button class="btn-action-sm" data-label-from="${escapeHtml(p.id)}">ラベル</button>
          <button class="btn-action-sm" data-spec-from="${escapeHtml(p.id)}">規格書</button>
          <button class="btn-action-sm" data-dup="${escapeHtml(p.id)}">複製</button>
          <button class="btn-action-sm danger" data-del="${escapeHtml(p.id)}">削除</button>
        </td>
      </tr>`;
    }).join("")}</tbody>
  </table>` : "";

  // ── 一括操作バー ──
  const bulkBarHtml = masterSelected.size > 0 ? `
    <div class="bulk-action-bar">
      <span class="bulk-count">${masterSelected.size}件選択中</span>
      <select class="bulk-status-select" id="bulk-status-select">
        <option value="">ステータスを選択...</option>
        ${PRODUCT_STATUSES.map(s=>`<option value="${s.id}">${s.label}に変更</option>`).join("")}
      </select>
      <button class="action primary bulk-apply-btn" data-action="bulk-apply-status">一括変更</button>
      <button class="action danger bulk-delete-btn" data-action="bulk-delete" style="background:#ef4444;color:#fff;border:none">🗑 削除</button>
      <button class="action bulk-clear-btn" data-action="clear-bulk-select">✕ 選択解除</button>
    </div>` : "";

  const TODO_LABELS = {
    incomplete:"完成度100%未満", noBestBefore:"賞味期限未設定",
    noIngredients:"原材料未入力", noMfr:"製造者未設定", noJan:"JANコード未登録",
    expired:"賞味期限切れ", expiringSoon:"30日以内に期限切れ",
    noImage:"商品画像未登録", noCost:"原価未設定", noStock:"在庫なし・未設定",
  };
  const isAnyFilterActive = masterFilter !== "all" || masterCategoryFilter || masterCompletionFilter || masterPipelineFilter;
  const currentContent = masterView === "table" ? tableHtml : cards;
  const emptyHtml = !currentContent
    ? TODO_LABELS[masterFilter]
      ? `<div class="empty-state"><p>✅ ${TODO_LABELS[masterFilter]}に該当する商品はありません！</p><button class="action" data-clear-all-filters>すべての商品を表示</button></div>`
      : masterSearch
        ? `<div class="empty-state"><p>「${escapeHtml(masterSearch)}」に一致する商品が見つかりません。</p><button class="action" data-clear-search>検索をクリア</button></div>`
        : isAnyFilterActive
          ? `<div class="empty-state"><p>絞り込み条件に一致する商品がありません。</p><button class="action" data-clear-all-filters>フィルターをリセット</button></div>`
          : `<div class="empty-state"><p>商品がまだ登録されていません。</p><button class="action primary" data-quick-new="1">＋ 最初の商品を登録する</button></div>`
    : "";

  const resultCount = list.length !== products.length
    ? `<span class="result-count">${list.length}件</span>`
    : "";

  const SORT_LABELS = { updatedAt:"更新日（新しい順）", name:"商品名（あいうえお順）", completion:"完成度（低い順）", expiryDate:"賞味期限（近い順）" };
  const COMPLETION_LABELS = { lt100:"完成度 100%未満", lt60:"完成度 60%未満", lt30:"完成度 30%未満" };

  const isTodoFilter = !!TODO_LABELS[masterFilter];
  const catChip = masterCategoryFilter
    ? `<span class="filter-active-tag">🗂 ${escapeHtml(masterCategoryFilter)}<button class="filter-clear-btn" data-clear-category-filter title="カテゴリフィルターを解除">✕</button></span>`
    : "";
  const completionChip = masterCompletionFilter
    ? `<span class="filter-active-tag">📊 ${COMPLETION_LABELS[masterCompletionFilter]}<button class="filter-clear-btn" data-clear-completion-filter title="完成度フィルターを解除">✕</button></span>`
    : "";
  const pipelineChip = masterPipelineFilter
    ? (() => { const ps = PRODUCT_STATUSES.find(s=>s.id===masterPipelineFilter); return ps ? `<span class="filter-active-tag" style="color:${ps.color};background:${ps.bg}">● ${ps.label}<button class="filter-clear-btn" data-clear-pipeline-filter style="color:${ps.color}" title="ステータスフィルターを解除">✕</button></span>` : ""; })()
    : "";
  const activeFilterCount = (isTodoFilter?1:0) + (masterCategoryFilter?1:0) + (masterCompletionFilter?1:0) + (masterPipelineFilter?1:0);
  const resetAllBtn = activeFilterCount > 1
    ? `<button class="filter-reset-all-btn" data-clear-all-filters>✕ すべてリセット</button>`
    : "";

  const todoOpts = calcTodo();
  const todoFilterSelect = todoOpts.length ? `
    <select class="todo-filter-select" data-todo-filter-select title="課題でフィルター">
      <option value="">📋 課題フィルター...</option>
      ${todoOpts.map(o=>`<option value="${o.key}"${masterFilter===o.key?" selected":""}>${o.label}（${o.count}件）</option>`).join("")}
    </select>` : "";

  const pipelineSelect = `
    <select class="sort-select" data-master-pipeline-filter title="ステータスで絞り込み">
      <option value="">ステータス: すべて</option>
      ${PRODUCT_STATUSES.map(s=>`<option value="${s.id}"${masterPipelineFilter===s.id?" selected":""}>${s.label}</option>`).join("")}
    </select>`;

  const allCats = [...new Set(products.map(p=>p.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ja"));
  const categorySelect = allCats.length ? `
    <select class="sort-select" data-master-category-filter title="カテゴリで絞り込み">
      <option value="">カテゴリ: すべて</option>
      ${allCats.map(c=>`<option value="${escapeHtml(c)}"${masterCategoryFilter===c?" selected":""}>${escapeHtml(c)}</option>`).join("")}
    </select>` : "";
  const completionSelect = `
    <select class="sort-select" data-master-completion-filter title="完成度でフィルター">
      <option value="">完成度: すべて</option>
      <option value="lt100"${masterCompletionFilter==="lt100"?" selected":""}>完成度 100%未満</option>
      <option value="lt60"${masterCompletionFilter==="lt60"?" selected":""}>完成度 60%未満</option>
      <option value="lt30"${masterCompletionFilter==="lt30"?" selected":""}>完成度 30%未満</option>
    </select>`;

  const isAnyActive = masterFilter !== "all" || masterSearch || masterCategoryFilter || masterCompletionFilter || masterPipelineFilter;
  const COMP_LBL = { lt100:"完成度100%未満", lt60:"完成度60%未満", lt30:"完成度30%未満" };
  const currentLabel = [
    masterFilter !== "all" ? (TODO_LABELS[masterFilter] || {all:"すべて",starred:"★",active:"公開中",draft:"下書き"}[masterFilter] || masterFilter) : "",
    masterPipelineFilter ? (PRODUCT_STATUSES.find(s=>s.id===masterPipelineFilter)?.label || masterPipelineFilter) : "",
    masterCategoryFilter ? masterCategoryFilter : "",
    masterCompletionFilter ? COMP_LBL[masterCompletionFilter] : "",
    masterSearch ? `"${masterSearch}"` : "",
  ].filter(Boolean).join(" · ");
  const saveSearchBtn = isAnyActive
    ? `<button class="save-search-btn" data-save-search="${escapeHtml(currentLabel)}" title="現在の絞り込み条件を保存">⭐ 保存</button>`
    : "";
  const presetChips = savedSearchPresets.length
    ? `<div class="saved-search-row">${savedSearchPresets.map((s,i)=>`<span class="saved-search-chip${currentLabel===s.label?" active":""}"><button class="saved-search-apply" data-apply-search="${i}" title="クリックで適用">${escapeHtml(s.label)}</button><button class="saved-search-del" data-del-search="${i}" title="削除">×</button></span>`).join("")}</div>`
    : "";

  return saasLayout("商品管理", `
    <div class="master-toolbar">
      <div class="search-wrap">
        <input class="search-box" placeholder="商品名・品番・カテゴリで検索... (/ キー)" data-master-search value="${escapeHtml(masterSearch)}">
        ${masterSearch ? `<button class="search-clear-btn" data-clear-search title="検索をクリア">✕</button>` : ""}
      </div>
      <div class="filter-btns">
        ${["all","starred","active","draft"].map(f=>`<button class="filter-btn${masterFilter===f?" active":""}" data-master-filter="${f}">${{all:"すべて",starred:"★お気に入り",active:"公開中",draft:"下書き"}[f]}</button>`).join("")}
        ${isTodoFilter?`<span class="filter-active-tag">📋 ${TODO_LABELS[masterFilter]}<button class="filter-clear-btn" data-master-filter="all">✕</button></span>`:""}
        ${catChip}
        ${completionChip}
        ${pipelineChip}
        ${resetAllBtn}
        ${saveSearchBtn}
        ${resultCount}
      </div>
      <div class="toolbar-right">
        ${pipelineSelect}
        ${todoFilterSelect}
        ${categorySelect}
        ${completionSelect}
        <select class="sort-select" data-master-sort title="並び替え">
          ${Object.entries(SORT_LABELS).map(([v,l])=>`<option value="${v}"${masterSort===v?" selected":""}>${l}</option>`).join("")}
        </select>
        <div class="view-toggle" role="group" aria-label="表示切替">
          <button class="view-toggle-btn${masterView==="card"?" active":""}" data-master-view="card" title="カード表示">⊞ カード</button>
          <button class="view-toggle-btn${masterView==="table"?" active":""}" data-master-view="table" title="テーブル表示">☰ テーブル</button>
        </div>
        ${registerBtnHtml()}
      </div>
    </div>
    ${presetChips}
    <div class="kbd-hints"><kbd>D</kbd> ダッシュ &nbsp;·&nbsp; <kbd>P</kbd> 商品一覧 &nbsp;·&nbsp; <kbd>N</kbd> 新規登録 &nbsp;·&nbsp; <kbd>/</kbd> 検索 &nbsp;·&nbsp; <kbd>?</kbd> ヘルプ</div>
    ${bulkBarHtml}
    <div class="master-list${masterView==="table"?" master-list--table":""}">${currentContent || emptyHtml}</div>
  `);
}
