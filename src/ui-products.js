// ── 商品マスター一覧 UI モジュール ────────────────────────────────────
// 依存: products, derive, calcCompletion, calcCosts, calcTodo, saasLayout,
//       registerBtnHtml, productStatusBadges, escapeHtml,
//       masterSearch, masterFilter, masterSort, masterView, masterSelected,
//       masterCategoryFilter, masterCompletionFilter, masterPipelineFilter,
//       masterResponsibleFilter, savedSearchPresets, PRODUCT_STATUSES (globals)

function productsListHtml() {
  const todayIso = new Date().toISOString().split("T")[0];
  const soonIso  = new Date(Date.now() + 30*24*60*60*1000).toISOString().split("T")[0];
  const releasedStatuses = PRODUCT_STATUSES.filter(s => ["on_sale","discontinued"].includes(s.id));

  const relAll = products.filter(p => (p.phase || "released") === "released");
  let list = [...relAll];
  if (masterSearch) { const _ms = masterSearch.toLowerCase(); list = list.filter(p => (p.internalName||"").toLowerCase().includes(_ms)||(p.name||"").toLowerCase().includes(_ms)||(p.code||"").toLowerCase().includes(_ms)||(p.category||"").toLowerCase().includes(_ms)||(p.janCode||"").includes(_ms)||(p.specResponsible||"").toLowerCase().includes(_ms)||derive(p).allergens.join(" ").includes(_ms)); }
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
  if (masterFilter==="lowStock")      list = list.filter(p=>p.currentStock!=null&&p.currentStock!==""&&parseFloat(p.currentStock)>0&&parseFloat(p.currentStock)<=5);
  if (masterFilter==="hasLabelErrors") list = list.filter(p=>{ if(typeof checkFoodLabel!=="function") return false; const d=derive(p); return checkFoodLabel(p,d).some(i=>i.level==="error"); });
  if (masterFilter==="stale")         { const _staleIso=new Date(Date.now()-180*24*60*60*1000).toISOString().split("T")[0]; list=list.filter(p=>p.updatedAt&&p.updatedAt<_staleIso); }
  if (masterPipelineFilter)           list = list.filter(p=>(p.productStatus||"draft")===masterPipelineFilter);
  if (masterCategoryFilter)           list = list.filter(p=>(p.category||"")===masterCategoryFilter);
  if (masterResponsibleFilter)        list = list.filter(p=>(p.specResponsible||"")===masterResponsibleFilter);
  if (masterAllergenFilter)           list = list.filter(p=>derive(p).allergens.includes(masterAllergenFilter));
  if (masterIngFilter) { const _mi = masterIngFilter.toLowerCase(); list = list.filter(p=>(p.ingredients||[]).some(i=>(i.name||"").toLowerCase().includes(_mi))); }
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
  } else if (masterSort==="releasedAt") {
    list.sort((a,b)=>{
      if (!a.releasedAt && !b.releasedAt) return 0;
      if (!a.releasedAt) return 1;
      if (!b.releasedAt) return -1;
      return new Date(b.releasedAt) - new Date(a.releasedAt);
    });
  } else if (masterSort==="currentStock") {
    list.sort((a,b)=>{
      const av = a.currentStock!=null&&a.currentStock!==""?parseFloat(a.currentStock):Infinity;
      const bv = b.currentStock!=null&&b.currentStock!==""?parseFloat(b.currentStock):Infinity;
      return av - bv;
    });
  } else if (masterSort==="labelErrors") {
    const errKeys = new Map(list.map(p => { const d = derive(p); const issues = typeof checkFoodLabel === "function" ? checkFoodLabel(p, d) : []; return [p.id, issues.filter(i => i.level === "error").length]; }));
    list.sort((a,b) => errKeys.get(b.id) - errKeys.get(a.id));
  } else if (masterSort==="costRate") {
    const crKeys = new Map(list.map(p => [p.id, calcCosts(p).costRate ?? -1]));
    list.sort((a,b) => crKeys.get(b.id) - crKeys.get(a.id));
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
    const costs = calcCosts(p);
    const thumb = p.imageDataUrl
      ? `<img class="product-thumb" src="${p.imageDataUrl}" alt="商品画像" onerror="this.onerror=null;this.outerHTML='<div class=\\'product-thumb-placeholder product-thumb-error\\'>⚠️</div>'">`
      : `<button class="product-thumb-placeholder product-thumb-add" data-open-and-jump="${escapeHtml(p.id)}:商品画像" title="クリックして画像を追加" onclick="event.stopPropagation()">📷<span class="thumb-add-label">画像を追加</span></button>`;
    const missingHtml = comp.missing.length
      ? `<div class="comp-missing">${comp.missing.map(m=>`<button class="comp-missing-btn" data-open-and-jump="${escapeHtml(p.id)}:${escapeHtml(m)}" title="${escapeHtml(m)}の入力欄へ移動">${escapeHtml(m)}</button>`).join("")}</div>`
      : "";
    const pctColor = comp.pct >= 100 ? "#16a34a" : comp.pct >= 60 ? "#2563eb" : "#d97706";
    const expiryChip = p.expiryDate && p.expiryDate < todayIso
      ? `<span class="expiry-chip expired">🚨 期限切れ</span>`
      : p.expiryDate && p.expiryDate <= soonIso
      ? `<span class="expiry-chip soon">⏰ ${Math.max(0,Math.ceil((new Date(p.expiryDate)-Date.now())/864e5))}日後</span>`
      : "";
    const _staleIso = new Date(Date.now() - 180*24*60*60*1000).toISOString().split("T")[0];
    const staleBadge = (p.updatedAt && p.updatedAt < _staleIso)
      ? `<span class="stale-badge" title="6ヶ月以上更新されていません。成分・法令の見直しをご確認ください">⏳ 未更新${Math.floor((Date.now()-new Date(p.updatedAt))/864e5/30)}ヶ月</span>`
      : "";
    const _labelIssues = typeof checkFoodLabel === "function" ? checkFoodLabel(p, d) : [];
    const _labelErr  = _labelIssues.filter(i => i.level === "error").length;
    const _labelWarn = _labelIssues.filter(i => i.level === "warn").length;
    const labelCheckBadge = _labelErr > 0
      ? `<span class="label-check-badge label-check--error" title="食品表示にエラーがあります&#10;クリックで詳細確認">⚠️ 表示エラー${_labelErr}件</span>`
      : _labelWarn > 0
      ? `<span class="label-check-badge label-check--warn" title="食品表示に警告があります&#10;クリックで詳細確認">🟡 警告${_labelWarn}件</span>`
      : "";
    const _psCard = PRODUCT_STATUSES.find(s => s.id === (p.productStatus || "on_sale")) || PRODUCT_STATUSES.find(s => s.id === "on_sale") || PRODUCT_STATUSES[0];
    const isDiscontinued = p.productStatus === "discontinued";
    const _dangerLevel = (_labelErr > 0 || (p.expiryDate && p.expiryDate < todayIso)) ? "critical"
      : (_labelWarn > 0 || (p.expiryDate && p.expiryDate <= soonIso) || (costs.costRate !== null && costs.costRate > 60) || (p.updatedAt && p.updatedAt < _staleIso)) ? "warning"
      : "";
    return `<div class="master-card${isDiscontinued?" master-card--discontinued":""}${_dangerLevel?" master-card--"+_dangerLevel:""}" data-nav-product-detail="${escapeHtml(p.id)}" role="button" tabindex="0" title="クリックで詳細編集" style="border-left: 4px solid ${_dangerLevel==="critical"?"#ef4444":_dangerLevel==="warning"?"#f59e0b":_psCard.color};">
      <div class="master-card-inner">
        ${thumb}
        <div class="master-card-body">
          <div class="master-card-title-row">
            <span class="master-card-name">${escapeHtml(p.internalName||p.name||"（名称未入力）")}</span>
            ${p.internalName&&p.name?`<span class="display-name-note">表示名：${escapeHtml(p.name)}</span>`:""}
            ${(() => { const ps = PRODUCT_STATUSES.find(s=>s.id===(p.productStatus||"on_sale"))||PRODUCT_STATUSES.find(s=>s.id==="on_sale")||PRODUCT_STATUSES[0]; return `<select class="pipeline-chip-select" data-quick-status-select="${escapeHtml(p.id)}" style="color:${ps.color};background:${ps.bg};border-color:${ps.color}" onclick="event.stopPropagation()" title="クリックしてステータスを変更">${releasedStatuses.map(s=>`<option value="${s.id}"${(p.productStatus||"on_sale")===s.id?" selected":""}>${s.label}</option>`).join("")}</select>`; })()}
            ${statusBadge(p)}
            ${approvalBadge(p)}
            <button class="star-btn${p.starred?" on":""}" data-toggle-star="${escapeHtml(p.id)}" onclick="event.stopPropagation()">${p.starred?"★":"☆"}</button>
          </div>
          <div class="master-card-meta">
            ${p.code?`<span class="meta-item">品番：${escapeHtml(p.code)}</span>`:""}
            ${p.category?`<span class="meta-item">${escapeHtml(p.category)}</span>`:""}
            ${p.price?`<span class="meta-item">¥${escapeHtml(p.price)}</span>`:""}
            ${costs.costRate !== null ? `<span class="meta-item meta-cost-rate${costs.costRate > 60 ? " meta-cost-rate--warn" : costs.costRate > 40 ? " meta-cost-rate--mid" : " meta-cost-rate--ok"}" title="原価率">原価 ${costs.costRate}%</span>` : ""}
            ${p.releasedAt?`<span class="meta-item">🚀 ${escapeHtml(p.releasedAt)}</span>`:""}
            ${(isDiscontinued&&p.discontinuedAt)?`<span class="meta-item">🔴 終売：${escapeHtml(p.discontinuedAt)}</span>`:""}
            ${(isDiscontinued&&p.discontinuedReason)?`<span class="meta-item meta-discontinued-reason">${escapeHtml(p.discontinuedReason)}</span>`:""}
            <span class="meta-item">更新：${escapeHtml(p.updatedAt||"")}</span>
            ${(p.currentStock!=null&&p.currentStock!=="") ? `<span class="meta-item meta-stock">📦 在庫：${escapeHtml(String(p.currentStock))}${escapeHtml(p.stockUnit||"")}</span>` : ""}
            ${expiryChip}
            ${staleBadge}
            ${labelCheckBadge}
            ${d.allergens.length > 0 ? `<div class="master-card-allergens">${d.allergens.slice(0,5).map(a=>`<span class="mt-allergen-chip">${escapeHtml(a)}</span>`).join("")}${d.allergens.length>5?`<span class="mt-allergen-more">+${d.allergens.length-5}</span>`:""}</div>` : ""}
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
  const sortIcon = col => masterSort === col ? " ▲" : "";
  const tableHtml = masterView === "table" && list.length ? `<table class="master-table" data-visible-ids="${allVisibleIds.join(",")}">
    <thead><tr>
      <th class="mt-col-check" onclick="event.stopPropagation()"><input type="checkbox" data-select-all ${allChecked?"checked":""} title="すべて選択/解除"></th>
      <th class="mt-col-name mt-sortable${masterSort==="name"?" mt-sort-active":""}" data-sort-col="name">商品名${sortIcon("name")}</th>
      <th class="mt-col-comp mt-sortable${masterSort==="completion"?" mt-sort-active":""}" data-sort-col="completion">完成度${sortIcon("completion")}</th>
      <th class="mt-col-status">ステータス</th>
      <th class="mt-col-pub">公開状態</th>
      <th class="mt-col-release mt-sortable${masterSort==="releasedAt"?" mt-sort-active":""}" data-sort-col="releasedAt">発売日${sortIcon("releasedAt")}</th>
      <th class="mt-col-expiry mt-sortable${masterSort==="expiryDate"?" mt-sort-active":""}" data-sort-col="expiryDate">賞味期限${sortIcon("expiryDate")}</th>
      <th class="mt-col-stock mt-sortable${masterSort==="currentStock"?" mt-sort-active":""}" data-sort-col="currentStock">在庫数${sortIcon("currentStock")}</th>
      <th class="mt-col-date mt-sortable${masterSort==="updatedAt"?" mt-sort-active":""}" data-sort-col="updatedAt">更新日${sortIcon("updatedAt")}</th>
      <th class="mt-col-cat">カテゴリ</th>
      <th class="mt-col-responsible">担当者</th>
      <th class="mt-col-allergen">アレルゲン</th>
      <th class="mt-col-label mt-sortable${masterSort==="labelErrors"?" mt-sort-active":""}" data-sort-col="labelErrors" title="食品表示チェック結果">表示${sortIcon("labelErrors")}</th>
      <th class="mt-col-actions">操作</th>
    </tr></thead>
    <tbody>${list.map(p => {
      const d = derive(p);
      const comp = calcCompletion(p, d);
      const ps = PRODUCT_STATUSES.find(s=>s.id===(p.productStatus||"on_sale"))||PRODUCT_STATUSES.find(s=>s.id==="on_sale")||PRODUCT_STATUSES[0];
      const pctColor = comp.pct >= 100 ? "#16a34a" : comp.pct >= 60 ? "#2563eb" : "#d97706";
      const expiryClass = p.expiryDate && p.expiryDate < todayIso ? "mt-expiry-expired"
        : p.expiryDate && p.expiryDate <= soonIso ? "mt-expiry-soon" : "";
      const expiryHtml = `<button class="mt-expiry-edit-btn" data-inline-expiry="${escapeHtml(p.id)}" title="クリックして賞味期限を更新">${
        p.expiryDate
          ? `<span class="mt-expiry-date ${expiryClass}">${escapeHtml(p.expiryDate)}</span>`
          : `<span class="mt-expiry-none">—</span>`
      }✏️</button>`;
      const _lcIssues = typeof checkFoodLabel === "function" ? checkFoodLabel(p, d) : [];
      const _lcErr = _lcIssues.filter(i => i.level === "error").length;
      const _lcWarn = _lcIssues.filter(i => i.level === "warn").length;
      const _trCosts = calcCosts(p);
      const _trDanger = (_lcErr > 0 || (p.expiryDate && p.expiryDate < todayIso)) ? "critical"
        : (_lcWarn > 0 || (p.expiryDate && p.expiryDate <= soonIso) || (_trCosts.costRate !== null && _trCosts.costRate > 60)) ? "warning"
        : "";
      const labelColHtml = _lcErr > 0
        ? `<button class="label-check-badge label-check--error" data-nav-product-detail="${escapeHtml(p.id)}" onclick="event.stopPropagation()" title="${_lcErr}件のエラー">⚠️${_lcErr}</button>`
        : _lcWarn > 0
        ? `<button class="label-check-badge label-check--warn" data-nav-product-detail="${escapeHtml(p.id)}" onclick="event.stopPropagation()" title="${_lcWarn}件の警告">🟡${_lcWarn}</button>`
        : `<span class="mt-label-ok" title="問題なし">✅</span>`;
      const isSelected = masterSelected.has(p.id);
      const isDiscRow = p.productStatus === "discontinued";
      return `<tr class="master-row${isSelected?" master-row--selected":""}${isDiscRow?" master-row--discontinued":""}${_trDanger?" master-row--"+_trDanger:""}" data-nav-product-detail="${escapeHtml(p.id)}" role="button" tabindex="0">
        <td class="mt-col-check" onclick="event.stopPropagation()"><input type="checkbox" class="row-check" data-select-product="${escapeHtml(p.id)}" ${isSelected?"checked":""}></td>
        <td class="mt-col-name"><div class="mt-name-wrap">${p.starred?`<span class="mt-star">★</span>`:""}<span class="mt-name">${escapeHtml(p.internalName||p.name||"（名称未入力）")}</span>${p.internalName&&p.name?`<small class="mt-display-name">${escapeHtml(p.name)}</small>`:""}</div></td>
        <td class="mt-col-comp"><div class="mt-comp-wrap"><div class="mt-comp-bar"><div class="mt-comp-fill" style="width:${comp.pct}%;background:${pctColor}"></div></div><span class="mt-comp-pct" style="color:${pctColor}">${comp.pct}%</span></div></td>
        <td class="mt-col-status" onclick="event.stopPropagation()"><select class="pipeline-chip-select" data-quick-status-select="${escapeHtml(p.id)}" style="color:${ps.color};background:${ps.bg};border-color:${ps.color}">${releasedStatuses.map(s=>`<option value="${s.id}"${(p.productStatus||"on_sale")===s.id?" selected":""}>${s.label}</option>`).join("")}</select></td>
        <td onclick="event.stopPropagation()">${statusBadge(p)}${p.approvalStatus==="review"?`<span class="mt-approval-actions"><button class="btn-approval-quick btn-approval-approve" data-action="approve-product" data-pid="${escapeHtml(p.id)}" title="承認する">✓</button><button class="btn-approval-quick btn-approval-reject" data-action="reject-product" data-pid="${escapeHtml(p.id)}" title="差し戻す">↩</button></span>`:approvalBadge(p)}</td>
        <td class="mt-col-release">${escapeHtml(p.releasedAt||"—")}</td>
        <td class="mt-col-expiry" onclick="event.stopPropagation()">${expiryHtml}</td>
        <td class="mt-col-stock" onclick="event.stopPropagation()"><button class="mt-stock-edit-btn" data-inline-stock="${escapeHtml(p.id)}" title="クリックして在庫を更新">${(p.currentStock!=null&&p.currentStock!=="")?`<span class="mt-stock-val${parseFloat(p.currentStock)<=0?" mt-stock-zero":parseFloat(p.currentStock)<=5?" mt-stock-low":""}">${escapeHtml(String(p.currentStock))}${escapeHtml(p.stockUnit||"")}</span>`:`<span class="mt-stock-none">—</span>`}✏️</button></td>
        <td class="mt-col-date">${escapeHtml(p.updatedAt||"")}</td>
        <td class="mt-col-cat">${escapeHtml(p.category||"")}</td>
        <td class="mt-col-responsible">${p.specResponsible ? `<button class="mt-responsible-chip" data-set-responsible-filter="${escapeHtml(p.specResponsible)}" onclick="event.stopPropagation()" title="この担当者で絞り込む">${escapeHtml(p.specResponsible)}</button>` : `<span class="mt-responsible-none">—</span>`}</td>
        <td class="mt-col-allergen" onclick="event.stopPropagation()">${d.allergens.length ? d.allergens.slice(0,4).map(a=>`<button class="mt-allergen-chip" data-set-allergen-filter="${escapeHtml(a)}" title="${escapeHtml(a)}で絞り込む">${escapeHtml(a)}</button>`).join("")+(d.allergens.length>4?`<span class="mt-allergen-more">+${d.allergens.length-4}</span>`:"") : `<span class="mt-responsible-none">なし</span>`}</td>
        <td class="mt-col-label" onclick="event.stopPropagation()">${labelColHtml}</td>
        <td class="mt-col-actions" onclick="event.stopPropagation()">
          <button class="btn-action-sm" data-label-from="${escapeHtml(p.id)}">ラベル</button>
          <button class="btn-action-sm" data-spec-from="${escapeHtml(p.id)}">規格書</button>
          <button class="btn-action-sm" data-dup="${escapeHtml(p.id)}">複製</button>
          <button class="btn-action-sm danger" data-del="${escapeHtml(p.id)}">削除</button>
        </td>
      </tr>`;
    }).join("")}</tbody>
  </table>` : "";

  // ── 担当者リスト（一括操作バー・フィルターで共用） ──
  const allResponsiblesEarly = [...new Set(relAll.map(p=>p.specResponsible||"").filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ja"));
  const allCategoriesEarly   = [...new Set(relAll.map(p=>p.category||"").filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ja"));

  // ── 一括操作バー ──
  const bulkBarHtml = masterSelected.size > 0 ? `
    <div class="bulk-action-bar">
      <span class="bulk-count">${masterSelected.size}件選択中</span>
      <select class="bulk-status-select" id="bulk-status-select">
        <option value="">ステータスを選択...</option>
        ${releasedStatuses.map(s=>`<option value="${s.id}">${s.label}に変更</option>`).join("")}
      </select>
      <button class="action primary bulk-apply-btn" data-action="bulk-apply-status">一括変更</button>
      <select class="bulk-status-select" id="bulk-responsible-select">
        <option value="">担当者を変更...</option>
        ${allResponsiblesEarly.map(r=>`<option value="${escapeHtml(r)}">${escapeHtml(r)}</option>`).join("")}
      </select>
      <button class="action primary bulk-apply-btn" data-action="bulk-apply-responsible">担当者変更</button>
      <select class="bulk-status-select" id="bulk-category-select">
        <option value="">カテゴリを変更...</option>
        ${allCategoriesEarly.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("")}
        <option value="__new__">＋ 新しいカテゴリ...</option>
      </select>
      <button class="action primary bulk-apply-btn" data-action="bulk-apply-category">カテゴリ変更</button>
      <button class="action danger bulk-delete-btn" data-action="bulk-delete" style="background:#ef4444;color:#fff;border:none">🗑 削除</button>
      <button class="action bulk-clear-btn" data-action="clear-bulk-select">✕ 選択解除</button>
    </div>` : "";

  const TODO_LABELS = {
    incomplete:"完成度100%未満", noBestBefore:"賞味期限未設定",
    noIngredients:"原材料未入力", noMfr:"製造者未設定", noJan:"JANコード未登録",
    expired:"賞味期限切れ", expiringSoon:"30日以内に期限切れ",
    noImage:"商品画像未登録", noCost:"原価未設定", noStock:"在庫なし・未設定", lowStock:"在庫残り5個以下",
    stale:"6ヶ月以上更新なし", hasLabelErrors:"表示エラーあり",
  };
  const isAnyFilterActive = masterFilter !== "all" || masterCategoryFilter || masterCompletionFilter || masterPipelineFilter || masterResponsibleFilter || masterAllergenFilter;
  const currentContent = masterView === "table" ? tableHtml : cards;
  const emptyHtml = !currentContent
    ? TODO_LABELS[masterFilter]
      ? `<div class="empty-state"><p>✅ ${TODO_LABELS[masterFilter]}に該当する商品はありません！</p><button class="action" data-clear-all-filters>すべての商品を表示</button></div>`
      : masterSearch
        ? `<div class="empty-state"><p>「${escapeHtml(masterSearch)}」に一致する商品が見つかりません。</p><button class="action" data-clear-search>検索をクリア</button></div>`
        : isAnyFilterActive
          ? `<div class="empty-state"><p>絞り込み条件に一致する商品がありません。</p><button class="action" data-clear-all-filters>フィルターをリセット</button></div>`
          : (() => {
              const devReady = products.filter(p => p.phase === "development" && p.productStatus === "approved").length;
              const devTotal = products.filter(p => p.phase === "development").length;
              if (devReady > 0) {
                return `<div class="empty-state"><p>発売後の商品がまだありません。</p><p class="empty-state-sub">承認済みの開発中商品が <strong>${devReady}件</strong> あります。🚀 発売することでここに表示されます。</p><button class="action primary" data-nav="dev-products">🔬 開発中商品を確認する</button></div>`;
              }
              if (devTotal > 0) {
                return `<div class="empty-state"><p>発売後の商品がまだありません。</p><p class="empty-state-sub">開発中の商品を「承認済み」にして🚀 発売することでここに表示されます。</p><button class="action primary" data-nav="dev-products">🔬 開発中商品を確認する</button><button class="action" data-reg-mode="manual" style="margin-top:6px">✏️ 新規登録</button></div>`;
              }
              return `<div class="empty-state"><p>商品がまだ登録されていません。</p><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:12px"><button class="action primary" data-reg-mode="photo">📷 写真から登録</button><button class="action" data-reg-mode="spec">📄 規格書から登録</button><button class="action" data-reg-mode="manual">✏️ 手動で登録</button></div></div>`;
            })()
    : "";

  const resultCount = list.length !== relAll.length
    ? `<span class="result-count">${list.length}件</span>`
    : "";

  const noImgBanner = masterFilter === "noImage" && list.length > 0
    ? `<div class="no-img-banner">
        <span class="no-img-banner-ico">📷</span>
        <div>
          <strong>${list.length}件</strong>の商品に画像が未登録です。
          カードの「📷 画像を追加」ボタンをクリックすると、その商品の画像アップロード画面へすぐ移動できます。
        </div>
        <button class="action" style="flex-shrink:0;font-size:12px" data-master-filter="all">すべて表示</button>
      </div>`
    : "";

  const SORT_LABELS = { updatedAt:"更新日（新しい順）", name:"商品名（あいうえお順）", completion:"完成度（低い順）", expiryDate:"賞味期限（近い順）", releasedAt:"発売日（新しい順）", currentStock:"在庫数（少ない順）", labelErrors:"表示エラー（多い順）", costRate:"原価率（高い順）" };
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
  const responsibleChip = masterResponsibleFilter
    ? `<span class="filter-active-tag">👤 ${escapeHtml(masterResponsibleFilter)}<button class="filter-clear-btn" data-clear-responsible-filter title="担当者フィルターを解除">✕</button></span>`
    : "";
  const allergenChip = masterAllergenFilter
    ? `<span class="filter-active-tag" style="background:#fef9c3;color:#854d0e;border-color:#fde047">🥜 ${escapeHtml(masterAllergenFilter)}<button class="filter-clear-btn" data-clear-allergen-filter style="color:#854d0e" title="アレルゲンフィルターを解除">✕</button></span>`
    : "";
  const ingFilterChip = masterIngFilter
    ? `<span class="filter-active-tag" style="background:#f0fdf4;color:#15803d;border-color:#86efac">🌾 原材料:${escapeHtml(masterIngFilter)}<button class="filter-clear-btn" data-clear-ing-filter style="color:#15803d" title="原材料フィルターを解除">✕</button></span>`
    : "";
  const activeFilterCount = (isTodoFilter?1:0) + (masterCategoryFilter?1:0) + (masterCompletionFilter?1:0) + (masterPipelineFilter?1:0) + (masterResponsibleFilter?1:0) + (masterAllergenFilter?1:0) + (masterIngFilter?1:0);
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
      ${releasedStatuses.map(s=>`<option value="${s.id}"${masterPipelineFilter===s.id?" selected":""}>${s.label}</option>`).join("")}
    </select>`;

  const allCats = [...new Set(relAll.map(p=>p.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ja"));
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

  const allResponsibles = allResponsiblesEarly;
  const responsibleSelect = allResponsibles.length ? `
    <select class="sort-select" data-master-responsible-filter title="担当者で絞り込み">
      <option value="">担当者: すべて</option>
      ${allResponsibles.map(r=>`<option value="${escapeHtml(r)}"${masterResponsibleFilter===r?" selected":""}>${escapeHtml(r)}</option>`).join("")}
    </select>` : "";

  const isAnyActive = masterFilter !== "all" || masterSearch || masterCategoryFilter || masterCompletionFilter || masterPipelineFilter || masterResponsibleFilter || masterAllergenFilter || masterIngFilter;
  const COMP_LBL = { lt100:"完成度100%未満", lt60:"完成度60%未満", lt30:"完成度30%未満" };
  const currentLabel = [
    masterFilter !== "all" ? (TODO_LABELS[masterFilter] || {all:"すべて",starred:"★",active:"公開中",draft:"下書き"}[masterFilter] || masterFilter) : "",
    masterPipelineFilter ? (PRODUCT_STATUSES.find(s=>s.id===masterPipelineFilter)?.label || masterPipelineFilter) : "",
    masterCategoryFilter ? masterCategoryFilter : "",
    masterCompletionFilter ? COMP_LBL[masterCompletionFilter] : "",
    masterResponsibleFilter ? `担当:${masterResponsibleFilter}` : "",
    masterAllergenFilter ? `アレルゲン:${masterAllergenFilter}` : "",
    masterIngFilter ? `原材料:${masterIngFilter}` : "",
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
        <input class="search-box" placeholder="商品名・品番・カテゴリ・JAN・担当者・アレルゲンで検索... (/ キー)" data-master-search value="${escapeHtml(masterSearch)}">
        ${masterSearch ? `<button class="search-clear-btn" data-clear-search title="検索をクリア">✕</button>` : ""}
      </div>
      <div class="filter-btns">
        ${["all","starred","active","draft"].map(f=>`<button class="filter-btn${masterFilter===f?" active":""}" data-master-filter="${f}">${{all:"すべて",starred:"★お気に入り",active:"公開中",draft:"下書き"}[f]}</button>`).join("")}
        ${isTodoFilter?`<span class="filter-active-tag">📋 ${TODO_LABELS[masterFilter]}<button class="filter-clear-btn" data-master-filter="all">✕</button></span>`:""}
        ${catChip}
        ${completionChip}
        ${pipelineChip}
        ${responsibleChip}
        ${allergenChip}
        ${ingFilterChip}
        ${resetAllBtn}
        ${saveSearchBtn}
        ${resultCount}
      </div>
      <div class="toolbar-right">
        ${pipelineSelect}
        ${todoFilterSelect}
        ${categorySelect}
        ${completionSelect}
        ${responsibleSelect}
        <select class="sort-select" data-master-sort title="並び替え">
          ${Object.entries(SORT_LABELS).map(([v,l])=>`<option value="${v}"${masterSort===v?" selected":""}>${l}</option>`).join("")}
        </select>
        <div class="ing-cross-search-wrap" title="原材料名を入力して、その原材料を使用している商品をすべて検索（サプライヤー変更の影響調査に）">
          <span class="ing-cross-icon">🌾</span>
          <input class="ing-cross-input" list="ing-cross-datalist" placeholder="原材料クロス検索..." value="${escapeHtml(masterIngFilter)}" data-master-ing-filter>
          <datalist id="ing-cross-datalist">${(typeof ingMaster !== "undefined" ? ingMaster : []).slice(0, 200).map(n=>`<option value="${escapeHtml(n)}">`).join("")}</datalist>
        </div>
        ${isAnyActive ? `<button class="action csv-filtered-btn" data-action="export-csv-filtered" title="現在の絞り込み結果のみCSV出力">↓ 絞込CSV(${list.length}件)</button>` : ""}
        <button class="action csv-all-btn" data-action="export-csv" title="全商品データをExcel対応CSVでダウンロード">📥 CSV出力</button>
        <div class="view-toggle" role="group" aria-label="表示切替">
          <button class="view-toggle-btn${masterView==="card"?" active":""}" data-master-view="card" title="カード表示">⊞ カード</button>
          <button class="view-toggle-btn${masterView==="table"?" active":""}" data-master-view="table" title="テーブル表示">☰ テーブル</button>
        </div>
        ${registerBtnHtml()}
      </div>
    </div>
    ${presetChips}
    <div class="kbd-hints"><kbd>D</kbd> ダッシュ &nbsp;·&nbsp; <kbd>P</kbd> 商品一覧 &nbsp;·&nbsp; <kbd>A</kbd> アレルゲン表 &nbsp;·&nbsp; <kbd>N</kbd> 新規登録 &nbsp;·&nbsp; <kbd>/</kbd> 検索 &nbsp;·&nbsp; <kbd>?</kbd> ヘルプ</div>
    ${bulkBarHtml}
    ${noImgBanner}
    <div class="master-list${masterView==="table"?" master-list--table":""}">${currentContent || emptyHtml}</div>
  `);
}

// ── 商品開発（発売前）一覧 ────────────────────────────────────────────
function devProductsHtml() {
  const todayIso = new Date().toISOString().split("T")[0];
  const allDevList = products.filter(p => p.phase === "development");
  const STATUS_ORDER = ["draft","in_progress","review","approved"];
  const devList = masterSearch
    ? (() => { const _ms = masterSearch.toLowerCase(); return allDevList.filter(p => (p.internalName||"").toLowerCase().includes(_ms)||(p.name||"").toLowerCase().includes(_ms)||(p.code||"").toLowerCase().includes(_ms)||(p.category||"").toLowerCase().includes(_ms)||(p.janCode||"").includes(_ms)||(p.specResponsible||"").toLowerCase().includes(_ms)||derive(p).allergens.join(" ").includes(_ms)); })()
    : allDevList;
  const sorted = [...devList].sort((a, b) => {
    // 発売予定日が設定されている商品は期限切れ・近い順を優先
    const ta = a.devProject?.targetReleaseDate;
    const tb = b.devProject?.targetReleaseDate;
    const overA = ta && ta < todayIso;
    const overB = tb && tb < todayIso;
    if (overA !== overB) return overA ? -1 : 1;
    // 両方とも期限あり → 近い順
    if (ta && tb) return ta.localeCompare(tb);
    if (ta) return -1;
    if (tb) return 1;
    // 期限なし → ステータス順
    const ia = STATUS_ORDER.indexOf(a.productStatus || "draft");
    const ib = STATUS_ORDER.indexOf(b.productStatus || "draft");
    if (ia !== ib) return ia - ib;
    return (b.updatedAt || "").localeCompare(a.updatedAt || "");
  });
  const devStatuses = PRODUCT_STATUSES.filter(s => STATUS_ORDER.includes(s.id));
  const statusCounts = devStatuses.map(s => ({ ...s, count: allDevList.filter(p => (p.productStatus || "draft") === s.id).length }));
  const statusStyleSelect = (s) => { const f = PRODUCT_STATUSES.find(x => x.id === s); return f ? `color:${f.color};background:${f.bg};border-color:${f.color}` : ""; };
  const pipelineSummary = allDevList.length ? `<div class="dev-pipeline-summary">
    ${statusCounts.map(s => `<div class="dps-item${s.count===0?" dps-item--zero":""}">
      <span class="dps-chip" style="background:${s.bg};color:${s.color};border:1.5px solid ${s.color}40">${s.label}</span>
      <span class="dps-count">${s.count}件</span>
    </div>`).join(`<span class="dps-arrow">›</span>`)}
  </div>` : "";

  const cards = sorted.map(p => {
    const d = derive(p);
    const comp = calcCompletion(p, d);
    const compColor = comp.pct >= 100 ? "#16a34a" : comp.pct >= 60 ? "#2563eb" : "#d97706";
    const canRelease = p.productStatus === "approved";
    const trd = p.devProject?.targetReleaseDate;
    const daysLeft = trd ? Math.ceil((new Date(trd) - new Date(todayIso)) / 86400000) : null;
    const deadlineBadge = daysLeft !== null
      ? daysLeft < 0
        ? `<span class="dev-deadline-badge dev-deadline--over">⚠️ ${Math.abs(daysLeft)}日超過</span>`
        : daysLeft <= 7
        ? `<span class="dev-deadline-badge dev-deadline--urgent">🔥 残り${daysLeft}日</span>`
        : daysLeft <= 30
        ? `<span class="dev-deadline-badge dev-deadline--warn">⏰ 残り${daysLeft}日</span>`
        : `<span class="dev-deadline-badge dev-deadline--ok">📅 ${escapeHtml(trd)}</span>`
      : "";
    const _devLcIssues = typeof checkFoodLabel === "function" ? checkFoodLabel(p, d) : [];
    const _devLcErr = _devLcIssues.filter(i => i.level === "error").length;
    const _devLcWarn = _devLcIssues.filter(i => i.level === "warn").length;
    const devLabelBadge = _devLcErr > 0
      ? `<span class="label-check-badge label-check--error" title="食品表示エラー${_devLcErr}件">⚠️ ${_devLcErr}件</span>`
      : _devLcWarn > 0
      ? `<span class="label-check-badge label-check--warn" title="食品表示警告${_devLcWarn}件">🟡 ${_devLcWarn}件</span>`
      : "";
    return `<div class="dev-card" data-nav-product-detail="${escapeHtml(p.id)}">
      <div class="dev-card-img">${p.imageDataUrl && p.imageDataUrl !== "1"
        ? `<img src="${escapeHtml(p.imageDataUrl)}" alt="">`
        : `<span class="dev-card-noimg">📦</span>`}
      </div>
      <div class="dev-card-body">
        <div class="dev-card-name">${escapeHtml(p.name || "（名称未入力）")}</div>
        <div class="dev-card-meta">
          <select class="pipeline-chip-select dev-status-select" data-quick-status-select="${escapeHtml(p.id)}" onclick="event.stopPropagation()" style="${statusStyleSelect(p.productStatus || "draft")}">
            ${devStatuses.map(s => `<option value="${s.id}"${(p.productStatus||"draft")===s.id?" selected":""}>${s.label}</option>`).join("")}
          </select>
          ${p.category ? `<span class="dev-cat-chip">${escapeHtml(p.category)}</span>` : ""}
          ${deadlineBadge}
          ${devLabelBadge}
          ${(p.devProject?.projectManager || p.specResponsible) ? `<span class="dev-responsible-chip">👤 ${escapeHtml(p.devProject?.projectManager || p.specResponsible)}</span>` : ""}
          ${p.updatedAt ? `<span class="dev-updated-at">更新: ${escapeHtml(p.updatedAt)}</span>` : ""}
        </div>
        <div class="dev-comp-bar" title="入力完成度 ${comp.pct}%">
          <div class="dev-comp-fill" style="width:${comp.pct}%;background:${compColor}"></div>
          <span class="dev-comp-pct" style="color:${compColor}">${comp.pct}%</span>
        </div>
        <div class="dev-card-actions">
          <button class="action" data-nav-product-detail="${escapeHtml(p.id)}" onclick="event.stopPropagation()">編集</button>
          ${canRelease ? `<button class="action action--release action--release--ready" data-action="release-product" data-pid="${escapeHtml(p.id)}" onclick="event.stopPropagation()">🚀 発売する</button>` : ""}
        </div>
      </div>
    </div>`;
  }).join("");

  const totalDevCount = allDevList.length;
  const emptyHtml = masterSearch
    ? `<div class="empty-state"><p>「${escapeHtml(masterSearch)}」に一致する開発中商品が見つかりません。</p><button class="action" data-clear-search>検索をクリア</button></div>`
    : `<div class="empty-state">
        <div class="empty-ico">🔬</div>
        <p>開発中の商品がありません</p>
        <p class="empty-hint">新商品のアイデアを登録して、試作・審査・発売までのフローを管理できます。</p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px">
          <button class="action primary" data-nav="template-select">✏️ 新商品を登録する</button>
        </div>
        <div class="empty-features">
          <span>✅ 試作フェーズ管理</span>
          <span>✅ 発売予定日アラート</span>
          <span>✅ 承認ワークフロー</span>
        </div>
      </div>`;

  return saasLayout("商品開発（発売前）", `
    <div class="dev-header">
      <h2 class="dev-title">🔬 開発中商品 <span class="dev-count">${masterSearch ? `${sorted.length}/${totalDevCount}` : `${totalDevCount}`}件</span></h2>
      <div class="dev-header-actions">
        <div class="dev-search-wrap">
          <input class="search-box" placeholder="商品名・品番・カテゴリ・JAN・担当者・アレルゲンで検索... (/ キー)" data-master-search value="${escapeHtml(masterSearch)}">
          ${masterSearch ? `<button class="search-clear-btn" data-clear-search title="検索をクリア">✕</button>` : ""}
        </div>
        ${totalDevCount ? `<button class="action primary" data-reg-mode="manual">＋ 新規登録</button>` : ""}
      </div>
    </div>
    ${pipelineSummary}
    ${sorted.length ? `<div class="dev-grid">${cards}</div>` : emptyHtml}
  `);
}
