function karteTabHtml(p, d) {
  const comp      = calcCompletion(p, d);
  const costs     = calcCosts(p);
  const compColor = comp.pct >= 100 ? "#16a34a" : comp.pct >= 60 ? "#2563eb" : "#d97706";
  const isReleased = (p.phase || "released") === "released";

  // ── タイムライン ──
  const tlEvents = loadTimeline(p.id).slice(0, 8);
  const tlHtml = tlEvents.length
    ? `<div class="karte-tl-list">${tlEvents.map(ev => `
        <div class="karte-tl-row">
          <span class="karte-tl-ico">${ev.icon || "📌"}</span>
          <div class="karte-tl-body">
            <span class="karte-tl-lbl">${escapeHtml(ev.label)}</span>
            <span class="karte-tl-date">${escapeHtml(ev.savedAt || "")}${ev.savedBy && ev.savedBy !== "—" ? ` · ${escapeHtml(ev.savedBy)}` : ""}</span>
            ${ev.comment ? `<span class="karte-tl-cmt">${escapeHtml(ev.comment)}</span>` : ""}
          </div>
        </div>`).join("")}</div>
      <button class="karte-link" data-detail-tab="history">すべての履歴を見る →</button>`
    : `<p class="karte-empty">まだイベントはありません。ラベルを保存すると自動記録されます。</p>`;

  // ── 完成度チェック ──
  const CHECK_ITEMS = ["名称","内容量","賞味期限","保存方法","製造者名","製造者住所","原材料名"];
  const checklistHtml = CHECK_ITEMS.map(lbl => {
    const missing = comp.missing.includes(lbl);
    return `<div class="karte-check-item${missing ? " karte-check-item--ng" : " karte-check-item--ok"}">
      <span>${missing ? "⚠️" : "✅"}</span>
      <span class="karte-check-lbl">${escapeHtml(lbl)}</span>
    </div>`;
  }).join("");

  // ── 原価サマリー ──
  const costOk  = costs.costRate !== null && costs.costRate <= 35;
  const costWarn = costs.costRate !== null && costs.costRate > 40;
  const costColor = costWarn ? "#dc2626" : costOk ? "#16a34a" : "inherit";
  const costHtml = `
    <div class="karte-cost-grid">
      <div class="karte-cost-item">
        <div class="karte-cost-val">${costs.totalCost > 0 ? `¥${Math.round(costs.totalCost).toLocaleString()}` : "—"}</div>
        <div class="karte-cost-lbl">原価</div>
      </div>
      <div class="karte-cost-item">
        <div class="karte-cost-val" style="color:${costColor}">${costs.costRate !== null ? `${costs.costRate}%` : "—"}</div>
        <div class="karte-cost-lbl">原価率</div>
      </div>
      <div class="karte-cost-item">
        <div class="karte-cost-val">${costs.profitRate !== null ? `${costs.profitRate}%` : "—"}</div>
        <div class="karte-cost-lbl">粗利率</div>
      </div>
    </div>
    <button class="karte-link" data-detail-tab="cost">原価を詳しく見る →</button>`;

  // ── 栄養成分 ──
  const nutr = d.nutrition;
  const nutrHtml = nutr && nutr.kcal > 0
    ? `<div class="karte-nutr-grid">
        <div class="karte-nutr-item"><span class="karte-nutr-val">${nutr.kcal}</span><span class="karte-nutr-lbl">kcal</span></div>
        <div class="karte-nutr-item"><span class="karte-nutr-val">${nutr.protein}g</span><span class="karte-nutr-lbl">たんぱく質</span></div>
        <div class="karte-nutr-item"><span class="karte-nutr-val">${nutr.fat}g</span><span class="karte-nutr-lbl">脂質</span></div>
        <div class="karte-nutr-item"><span class="karte-nutr-val">${nutr.carbs}g</span><span class="karte-nutr-lbl">炭水化物</span></div>
        <div class="karte-nutr-item"><span class="karte-nutr-val">${nutr.salt}g</span><span class="karte-nutr-lbl">食塩相当量</span></div>
      </div>`
    : `<span class="karte-none">原材料の重量を入力すると自動計算されます</span>`;

  // ── アレルゲン ──
  const allergens = d.allergens || [];
  const allergenHtml = allergens.length
    ? allergens.map(a => `<span class="karte-chip karte-chip--allergen">${escapeHtml(a)}</span>`).join("")
    : `<span class="karte-none">なし（または未入力）</span>`;

  // ── 承認 ──
  const apMap = { review:{ txt:"👥 承認待ち", cls:"review" }, approved:{ txt:"✅ 承認済み", cls:"ok" }, rejected:{ txt:"↩ 差し戻し", cls:"ng" } };
  const apInfo = apMap[p.approvalStatus];
  const approvalChip = apInfo ? `<span class="karte-chip karte-chip--ap-${apInfo.cls}">${apInfo.txt}</span>` : `<span class="karte-none">未申請</span>`;

  // ── 商品基本情報 ──
  const infoRows = [
    ["商品名", p.name],
    ["内容量", p.volume],
    ["賞味期限", p.bestBefore],
    ["保存方法", p.storage],
    ["カテゴリ", p.category],
    isReleased ? ["発売日", p.releasedAt] : ["担当者", p.specResponsible],
  ].filter(([, v]) => v).map(([lbl, val]) =>
    `<div class="karte-info-row"><span class="karte-info-lbl">${lbl}</span><span class="karte-info-val">${escapeHtml(val)}</span></div>`
  ).join("");

  return `<div class="karte-layout">

    <!-- 左列: ラベル + アクション -->
    <div class="karte-col karte-col--left">
      <div class="karte-panel karte-panel--preview">
        <div class="karte-panel-hd">🏷 ラベルプレビュー</div>
        <div class="karte-label-wrap">${basicLabelHtml(p, d)}</div>
        <div style="margin-top:8px">${nutritionLabelHtml(d)}</div>
      </div>
      <div class="karte-panel">
        <div class="karte-panel-hd">⚡ クイックアクション</div>
        <div class="karte-quick-actions">
          <button class="karte-qa-btn" data-label-from="${escapeHtml(p.id)}">✏️ ラベル編集</button>
          <button class="karte-qa-btn" data-action="open-print-preview">🖨 印刷・PDF</button>
          <button class="karte-qa-btn" data-spec-from="${escapeHtml(p.id)}">📄 規格書</button>
          <button class="karte-qa-btn" data-action="open-ai-consult-for" data-pid="${escapeHtml(p.id)}">💬 AI相談</button>
          <button class="karte-qa-btn" data-ai-from="${escapeHtml(p.id)}">✨ AI説明文</button>
          <button class="karte-qa-btn" data-detail-tab="ai">🔍 表示チェック</button>
        </div>
      </div>
    </div>

    <!-- 右列: 情報パネル群 -->
    <div class="karte-col karte-col--right">

      <!-- 商品基本情報 -->
      ${infoRows ? `<div class="karte-panel">
        <div class="karte-panel-hd">ℹ️ 商品情報</div>
        <div class="karte-info-list">${infoRows}</div>
        <button class="karte-link" data-detail-tab="basic">詳細を編集 →</button>
      </div>` : ""}

      <!-- 完成度 -->
      <div class="karte-panel karte-panel--comp">
        <div class="karte-comp-hd">
          <span class="karte-panel-hd" style="margin-bottom:0">📋 完成度</span>
          <span class="karte-comp-pct" style="color:${compColor}">${comp.pct}%</span>
        </div>
        <div class="karte-comp-bar"><div class="karte-comp-bar-fill" style="width:${comp.pct}%;background:${compColor}"></div></div>
        <div class="karte-check-grid">${checklistHtml}</div>
      </div>

      <!-- 原価サマリー -->
      <div class="karte-panel">
        <div class="karte-panel-hd">💰 原価サマリー</div>
        ${costHtml}
      </div>

      <!-- タイムライン -->
      <div class="karte-panel">
        <div class="karte-panel-hd">📜 商品タイムライン</div>
        ${tlHtml}
      </div>

      <!-- アレルゲン -->
      <div class="karte-panel">
        <div class="karte-panel-hd">🥜 アレルゲン</div>
        <div class="karte-chips-row">${allergenHtml}</div>
        <button class="karte-link" data-detail-tab="ingredients">原材料を編集 →</button>
      </div>

      <!-- 栄養成分 -->
      <div class="karte-panel">
        <div class="karte-panel-hd">🔬 栄養成分（100g当たり）</div>
        ${nutrHtml}
      </div>

      <!-- 承認 + 発売準備チェック -->
      <div class="karte-panel">
        <div class="karte-panel-hd">👥 承認ステータス</div>
        <div>${approvalChip}</div>
        ${!isReleased ? releaseReadinessHtml(p, d) : ""}
        ${p.productStatus === "approved" && p.approvalStatus === "approved"
          ? `<div style="margin-top:8px"><button class="action primary" style="font-size:12px" data-action="release-product" data-pid="${escapeHtml(p.id)}">🚀 発売する</button></div>`
          : ""}
        <button class="karte-link" data-detail-tab="approval">チーム承認を管理する →</button>
      </div>

    </div>
  </div>`;
}

function productDetailHtml() {
  const p = products.find(x=>x.id===productDetailId) || (editId==="new"?draft:null);
  if (!p) return saasLayout("商品詳細", `<p>商品が見つかりません。<button class="action" data-nav="products">一覧へ戻る</button></p>`);
  const d = derive(p);
  const chkd = (val) => val ? "checked" : "";
  const channelChks = SALES_CHANNELS_LIST.map(ch=>`<label class="check-label"><input type="checkbox" data-sales-ch="${escapeHtml(ch)}" ${chkd((p.salesChannels||[]).includes(ch))}> ${escapeHtml(ch)}</label>`).join("");
  const catOpts = ["", ...PRODUCT_CATEGORIES].map(c=>`<option value="${escapeHtml(c)}"${p.category===c?" selected":""}>${c||"カテゴリを選択"}</option>`).join("");
  const statusOpts = [["active","公開中"],["draft","下書き"],["inactive","非公開"]].map(([v,l])=>`<option value="${v}"${p.publishStatus===v?" selected":""}>${l}</option>`).join("");

  const tab = productDetailTab || "karte";
  const comp = calcCompletion(p, d);
  const isMissing = (label) => comp.missing.includes(label);
  const compColor = comp.pct >= 100 ? "#16a34a" : comp.pct >= 60 ? "#2563eb" : "#d97706";
  const curStatusId = p.productStatus || ((p.phase || "released") === "development" ? "draft" : "on_sale");
  const statusInfo = PRODUCT_STATUSES.find(s => s.id === curStatusId) || PRODUCT_STATUSES[0];
  const summaryStrip = `<div class="detail-summary-strip">
    <span class="dss-item">
      <span class="dss-label">ステータス</span>
      <span class="dss-chip" style="background:${statusInfo.bg};color:${statusInfo.color};border:1.5px solid ${statusInfo.color}40">${statusInfo.label}</span>
    </span>
    ${p.specResponsible ? `<span class="dss-item"><span class="dss-label">担当者</span><span class="dss-value">${escapeHtml(p.specResponsible)}</span></span>` : ""}
    ${(p.phase === "released" && p.releasedAt) ? `<span class="dss-item"><span class="dss-label">発売日</span><span class="dss-value">${escapeHtml(p.releasedAt)}</span></span>` : ""}
    <span class="dss-item"><span class="dss-label">更新日</span><span class="dss-value">${escapeHtml(p.updatedAt||"—")}</span></span>
  </div>`;
  const completionBanner = `<div class="detail-comp-banner">
    <div class="dcb-bar-wrap"><div class="dcb-bar-fill" style="width:${comp.pct}%;background:${compColor}"></div></div>
    <span class="dcb-pct" style="color:${compColor}">${comp.pct}%</span>
    ${comp.missing.length
      ? `<span class="dcb-missing">未入力: ${comp.missing.map(m=>`<button class="dcb-missing-btn" data-jump-to-field="${escapeHtml(m)}" title="クリックして${escapeHtml(m)}の入力欄へ移動">${escapeHtml(m)}</button>`).join("")}</span>`
      : `<span class="dcb-done">✅ 必須項目すべて入力済み</span>`}
  </div>`;
  // 未入力項目をタブへマッピングしてバッジ数を計算
  const TAB_FIELDS = {
    karte: [],
    basic:       ["名称","内容量","賞味期限","保存方法","製造者名","製造者住所"],
    ingredients: ["原材料名"],
    cost: [], label: [], spec: [], ai: [], history: [], approval: [],
  };
  const tabBadge = (id) => {
    const n = (TAB_FIELDS[id]||[]).filter(f => comp.missing.includes(f)).length;
    return n > 0 ? `<span class="tab-badge">${n}</span>` : "";
  };
  const tlCount = loadTimeline(p.id).length + loadHistory(p.id).length;
  const approvalDot = p.approvalStatus && p.approvalStatus !== "none" ? ` <span class="tab-approval-dot ${p.approvalStatus}"></span>` : "";
  // "check" → "ai" にリダイレクト（旧タブ名との後方互換）
  const _tab = (tab === "check") ? "ai" : tab;
  const tabs = [
    { id:"karte",       label:"📋 カルテ" },
    { id:"basic",       label:"基本情報" },
    { id:"ingredients", label:"原材料" },
    { id:"label",       label:"🏷 ラベル" },
    { id:"spec",        label:"📄 規格書" },
    { id:"cost",        label:"💴 原価" },
    { id:"ai",          label:"🤖 AI・チェック" },
    { id:"history",     label:`📜 履歴${tlCount>0?` (${tlCount})`:""}` },
    { id:"approval",    label:`👥 承認${approvalDot}` },
  ];
  const tabNav = `${completionBanner}<div class="detail-tabs">${tabs.map(t=>`<button class="detail-tab${_tab===t.id?" active":""}" data-detail-tab="${t.id}">${t.label}${tabBadge(t.id)}</button>`).join("")}</div>`;

  // ── タブコンテンツ ──
  let tabContent = "";
  if (_tab === "karte") {
    tabContent = karteTabHtml(p, d);
  } else if (_tab === "basic") {
    const phaseStatuses = (p.phase || "released") === "development"
      ? PRODUCT_STATUSES.filter(s => !["on_sale","discontinued"].includes(s.id))
      : PRODUCT_STATUSES.filter(s => ["on_sale","discontinued"].includes(s.id));
    const curStatus = p.productStatus || ((p.phase || "released") === "development" ? "draft" : "on_sale");
    const pipelineHtml = `<div class="pipeline-selector">
      <span class="pipeline-selector-lbl">ステータス</span>
      <div class="pipeline-steps">
        ${phaseStatuses.map(s => `
          <button class="pipeline-step${curStatus===s.id?" active":""}" data-set-pipeline-status="${s.id}" style="${curStatus===s.id?`background:${s.bg};color:${s.color};border-color:${s.color}`:""}">
            ${s.label}
          </button>`).join(`<span class="pipeline-arrow">›</span>`)}
      </div>
    </div>`;
    tabContent = `
      ${pipelineHtml}
      <div class="detail-basic-layout">
      <div class="detail-basic-form">
      <div class="detail-grid">
        <div class="detail-section">
          <h3 class="detail-section-title">基本情報</h3>
          <div class="field-grid">
            <label class="field${isMissing("名称")?" field--missing":""}"><span>商品名<b>必須</b></span><input data-master-field="name" value="${escapeHtml(p.name||"")}" placeholder="例：米粉ドーナツ プレーン"></label>
            <div class="field">
              <span>品番・商品コード <span class="field-opt">任意</span></span>
              <input data-master-field="code" value="${escapeHtml(p.code||"")}" placeholder="例：SW-001">
              <p class="field-hint">自社での管理番号です。ラベルには印刷されません。</p>
            </div>
            <label class="field"><span>カテゴリ</span><select data-master-field="category">${catOpts}</select></label>
            <div class="field">
              <span>JANコード <span class="field-opt">任意</span></span>
              <div class="jan-input-row">
                <input data-master-field="janCode" value="${escapeHtml(p.janCode||"")}" placeholder="13桁の数字" maxlength="13" inputmode="numeric">
                ${p.janCode ? `<span class="jan-check ${p.janCode.length===13?"jan-ok":"jan-ng"}">${p.janCode.length===13?"✓ 13桁":p.janCode.length+"桁"}</span>` : ""}
              </div>
              <p class="field-hint">バーコード管理をしている場合に入力。</p>
            </div>
            <label class="field${isMissing("内容量")?" field--missing":""}"><span>内容量</span><input data-master-field="volume" value="${escapeHtml(p.volume||"")}" placeholder="例：100g"></label>
            <div class="field${isMissing("賞味期限")?" field--missing":""}">
              <span>賞味期限</span>
              <input data-master-field="bestBefore" value="${escapeHtml(p.bestBefore||"")}" placeholder="例：製造日より90日">
              <div class="quick-chips">
                ${["7日","14日","30日","60日","90日","6ヶ月","1年"].map(d=>`<button class="quick-chip" data-quick-best-before="製造日より${d}">製造日より${d}</button>`).join("")}
              </div>
            </div>
            <label class="field"><span>賞味期限日（管理用）<span class="field-hint">ラベル非表示・アラート用</span></span><input type="date" data-master-field="expiryDate" value="${escapeHtml(p.expiryDate||"")}"></label>
            <div class="field${isMissing("保存方法")?" field--missing":""}">
              <span>保存方法</span>
              <input data-master-field="storage" list="storage-opts-dl" autocomplete="off" value="${escapeHtml(p.storage||"")}" placeholder="例：高温多湿を避けて保存">
              <datalist id="storage-opts-dl">${STORAGE_OPTS.filter(o=>o!=="自由入力").map(o=>`<option value="${escapeHtml(o)}"></option>`).join("")}</datalist>
              <button class="ai-suggest-btn" data-action="suggest-storage">✦ AIが原材料から提案</button>
            </div>
            <div class="field">
              <span>原産地 <span class="field-opt">任意</span></span>
              <input data-master-field="originCountry" value="${escapeHtml(p.originCountry||"")}" placeholder="例：国産、アメリカ産、中国">
              <p class="field-hint">農産物・畜産物・水産物を主原料とする場合は表示が義務付けられています。</p>
            </div>
          </div>
        </div>
        <div class="detail-section">
          <h3 class="detail-section-title">販売・管理情報</h3>
          ${p.phase === "released" ? `<label class="field"><span>公開ステータス</span><select data-master-field="publishStatus">${statusOpts}</select></label>` : ""}
          ${p.phase === "released" ? `<div class="field"><span>発売日 <span class="field-opt">自動設定</span></span><input value="${escapeHtml(p.releasedAt||"未設定")}" readonly style="background:var(--bg-secondary,#f8fafc);color:var(--text-secondary,#64748b);cursor:default"><p class="field-hint">「🚀 発売する」で自動入力されます。</p></div>` : ""}
          ${p.productStatus === "discontinued" ? `<div class="field"><span>終売日 <span class="field-opt">自動設定</span></span><input value="${escapeHtml(p.discontinuedAt||"未設定")}" readonly style="background:var(--bg-secondary,#f8fafc);color:var(--text-secondary,#64748b);cursor:default"></div>` : ""}
          ${p.productStatus === "discontinued" ? `<label class="field full"><span>終売理由</span><input data-master-field="discontinuedReason" value="${escapeHtml(p.discontinuedReason||"")}" placeholder="例：後継品発売のため"></label>` : ""}
          <div class="field"><span class="field-label">販売チャネル</span><div class="check-group">${channelChks}</div></div>
          <label class="field full"><span>メモ</span><textarea data-master-field="memo" rows="3">${escapeHtml(p.memo||"")}</textarea></label>
        </div>
        <div class="detail-section">
          <h3 class="detail-section-title">製造者情報</h3>
          <div class="field-grid">
            <label class="field${isMissing("製造者名")?" field--missing":""}"><span>製造者名</span><input data-master-field="manufacturerName" value="${escapeHtml(p.manufacturerName||"")}"></label>
            <label class="field${isMissing("製造者住所")?" field--missing":""}"><span>製造者住所</span><input data-master-field="manufacturerAddress" value="${escapeHtml(p.manufacturerAddress||"")}"></label>
            <label class="field"><span>電話番号</span><input data-master-field="manufacturerPhone" value="${escapeHtml(p.manufacturerPhone||"")}"></label>
          </div>
        </div>
        <div class="detail-section">
          <h3 class="detail-section-title">規格書・出荷情報</h3>
          <div class="field-grid">
            <label class="field"><span>版数（Rev）</span><input data-master-field="specVersion" value="${escapeHtml(p.specVersion||"1")}" placeholder="例：1"></label>
            <label class="field"><span>担当者</span><input data-master-field="specResponsible" value="${escapeHtml(p.specResponsible||"")}" placeholder="例：田中 太郎"></label>
            <label class="field"><span>荷姿</span><input data-master-field="packaging" value="${escapeHtml(p.packaging||"")}" placeholder="例：段ボール箱"></label>
            <label class="field"><span>ケース入数</span><input data-master-field="caseCount" value="${escapeHtml(p.caseCount||"")}" placeholder="例：12個"></label>
            <label class="field full"><span>製品サイズ</span><input data-master-field="productSize" value="${escapeHtml(p.productSize||"")}" placeholder="例：W120×D80×H40mm / 150g"></label>
          </div>
        </div>
        <div class="detail-section">
          <h3 class="detail-section-title">在庫情報 <span class="field-opt">任意</span></h3>
          <p class="field-hint" style="margin-bottom:12px">AI棚スキャンで自動更新できます。手動での上書きも可能です。</p>
          <div class="field-grid">
            <label class="field"><span>現在の在庫数</span><input type="number" min="0" step="1" data-master-field="currentStock" value="${escapeHtml(String(p.currentStock??''))}" placeholder="例：100"></label>
            <label class="field"><span>単位</span>
              <select data-master-field="stockUnit">
                ${["袋","箱","枚","kg","g","本","個","缶","瓶","パック"].map(u=>`<option value="${u}"${(p.stockUnit||"袋")===u?" selected":""}>${u}</option>`).join("")}
                <option value="その他"${(p.stockUnit||"袋")==="その他"?" selected":""}>その他</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      ${imageUploadSectionHtml(p)}
      </div>
      <div class="detail-basic-preview">
        <div class="mini-label-panel" id="detail-mini-preview">
          <div class="mlp-header">🏷 ラベルプレビュー</div>
          <div class="mlp-hint">保存のたびに自動更新</div>
          <div class="mlp-label-wrap">
            ${basicLabelHtml(p, d)}
          </div>
          <div class="mlp-nutrition-wrap">
            ${nutritionLabelHtml(d)}
          </div>
        </div>
      </div>
      </div>`;
  } else if (_tab === "ingredients") {
    tabContent = masterIngredientsTabHtml(p, d, isMissing);
  } else if (_tab === "label") {
    // ラベル作成タブ — 編集画面に遷移して戻れるようにする
    tabContent = `<div class="detail-section">
      <h3 class="detail-section-title">🏷 ラベル作成・印刷</h3>
      <p class="notice" style="margin-bottom:16px">この商品の食品表示ラベルを作成・印刷できます。</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px">
        <button class="action primary" data-label-from="${escapeHtml(p.id)}">✏️ ラベルを編集する</button>
      </div>
      <div class="karte-label-preview">
        <div class="mlp-header">🏷 現在のラベルプレビュー</div>
        <div class="mlp-label-wrap" style="margin-top:10px">${basicLabelHtml(p, d)}</div>
        <div class="mlp-nutrition-wrap" style="margin-top:10px">${nutritionLabelHtml(d)}</div>
      </div>
    </div>`;
  } else if (_tab === "spec") {
    tabContent = `<div class="detail-section">
      <h3 class="detail-section-title">📄 商品規格書</h3>
      <p class="notice" style="margin-bottom:16px">この商品の規格書（A4）を生成・PDF印刷できます。規格書バージョン: <strong>v${escapeHtml(p.specVersion||"1")}</strong></p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px">
        <button class="action primary" data-spec-from="${escapeHtml(p.id)}">📋 規格書を開く</button>
        <button class="action" data-action="karte-spec-version-up" data-pid="${escapeHtml(p.id)}">📈 バージョンアップ (v${escapeHtml(p.specVersion||"1")} → v${parseInt(p.specVersion||"1")+1})</button>
      </div>
      <div class="detail-grid">
        <div class="field-grid">
          <label class="field"><span>版数（Rev）</span><input data-master-field="specVersion" value="${escapeHtml(p.specVersion||"1")}" placeholder="例：1"></label>
          <label class="field"><span>担当者</span><input data-master-field="specResponsible" value="${escapeHtml(p.specResponsible||"")}" placeholder="例：田中 太郎"></label>
          <label class="field"><span>荷姿</span><input data-master-field="packaging" value="${escapeHtml(p.packaging||"")}" placeholder="例：段ボール箱"></label>
          <label class="field"><span>ケース入数</span><input data-master-field="caseCount" value="${escapeHtml(p.caseCount||"")}" placeholder="例：12個"></label>
          <label class="field full"><span>製品サイズ</span><input data-master-field="productSize" value="${escapeHtml(p.productSize||"")}" placeholder="例：W120×D80×H40mm / 150g"></label>
        </div>
      </div>
    </div>`;
  } else if (_tab === "cost") {
    tabContent = costEditorHtml(p);
  } else if (_tab === "ai") {
    const issues = checkFoodLabel(p, d);
    const errorCount = issues.filter(i=>i.level==="error").length;
    const warnCount  = issues.filter(i=>i.level==="warn").length;
    const infoCount  = issues.filter(i=>i.level==="info").length;
    const compScore  = Math.max(0, 100 - errorCount * 15 - warnCount * 5);
    const scoreColor = compScore >= 90 ? "#16a34a" : compScore >= 70 ? "#ca8a04" : "#dc2626";
    const scoreBg    = compScore >= 90 ? "#f0fdf4" : compScore >= 70 ? "#fefce8" : "#fef2f2";
    const scoreBorder= compScore >= 90 ? "#bbf7d0" : compScore >= 70 ? "#fde68a" : "#fca5a5";
    const scoreLabel = compScore >= 90 ? "適合" : compScore >= 70 ? "要確認" : "要修正";
    const { changes: autoFixChanges } = normalizeLabelText(p);
    const canAutoFix = autoFixChanges.length > 0;
    const LEGAL_REFS = {
      "name":"食品表示基準 第3条第1項（別表第1第1号）","ingredients":"食品表示基準 第3条第1項（第7号）",
      "volume":"食品表示基準 第3条第1項（第1号）","bestBefore":"食品表示基準 第3条第1項（第9・10号）",
      "storage":"食品表示基準 第3条第1項（第11号）","manufacturerName":"食品表示基準 第3条第1項（第12号）",
      "manufacturerAddress":"食品表示基準 第3条第1項（第12号）","janCode":"JISコード X 0502",
    };
    const issueHtml = issues.length ? issues.map(i => {
      const icon = i.level==="error" ? "🔴" : i.level==="warn" ? "🟡" : "🔵";
      const fixEntry = i.field ? CHECK_FIX_MAP[i.field] : null;
      const fixBtn = fixEntry ? `<button class="check-fix-btn" data-check-fix="${escapeHtml(i.field)}">修正する →</button>` : "";
      const legalRef = i.field && LEGAL_REFS[i.field] ? `<span class="check-legal-ref">📋 ${escapeHtml(LEGAL_REFS[i.field])}</span>` : "";
      return `<div class="check-issue check-issue-${i.level}">
        <div class="check-issue-top"><span class="check-issue-msg">${icon} ${escapeHtml(i.msg)}</span>${fixBtn}</div>
        ${legalRef}
      </div>`;
    }).join("") : "";
    tabContent = `
      <div class="detail-section">
        <h3 class="detail-section-title">✅ 食品表示基準チェック</h3>
        <div class="check-score-card" style="background:${scoreBg};border:1.5px solid ${scoreBorder}">
          <div class="csc-left">
            <div class="csc-score" style="color:${scoreColor}">${compScore}<span class="csc-unit">点</span></div>
            <div class="csc-label" style="color:${scoreColor}">${scoreLabel}</div>
          </div>
          <div class="csc-right">
            <div class="csc-bar-track"><div class="csc-bar-fill" style="width:${compScore}%;background:${scoreColor}"></div></div>
            <div class="csc-counts">
              ${errorCount > 0 ? `<span class="csc-err">🔴 必須エラー ${errorCount}件</span>` : ""}
              ${warnCount  > 0 ? `<span class="csc-warn">🟡 警告 ${warnCount}件</span>` : ""}
              ${infoCount  > 0 ? `<span class="csc-info">🔵 参考 ${infoCount}件</span>` : ""}
              ${errorCount === 0 && warnCount === 0 ? `<span class="csc-ok">✅ 問題なし</span>` : ""}
            </div>
            ${canAutoFix ? `<button class="action" style="margin-top:8px;font-size:12px" data-action="master-auto-fix">✨ 自動整形（${autoFixChanges.length}件）</button>` : ""}
          </div>
        </div>
        <div class="check-issues">${issueHtml || '<p class="notice" style="margin-top:12px">✅ 問題は見つかりませんでした。</p>'}</div>
        <p class="notice" style="margin-top:8px">※ 食品表示基準（令和元年改正対応）に基づく参考情報です。最終確認は専門家にご相談ください。</p>
      </div>
      <div class="detail-section" style="margin-top:16px">
        <h3 class="detail-section-title">🤖 AI機能</h3>
        <div class="ai-karte-panel">
          <div class="ai-panel-block">
            <h4>✦ AI説明文生成</h4>
            <p class="field-hint">楽天・Amazon・Yahoo・Instagram向けの商品説明文をAIが自動生成します。</p>
            <button class="action primary" data-ai-from="${escapeHtml(p.id)}">✦ AI説明文を開く</button>
          </div>
          <div class="ai-panel-block">
            <h4>💬 AI商品相談</h4>
            <p class="field-hint">商品改善・食品表示・ネーミングについてAIに相談できます。</p>
            <button class="action" data-action="open-ai-consult-for" data-pid="${escapeHtml(p.id)}">💬 AI相談を開く</button>
          </div>
        </div>
      </div>`;
  } else if (_tab === "history") {
    const hist = loadHistory(p.id);
    const tl   = loadTimeline(p.id);
    // タイムラインイベントと変更履歴スナップショットをマージして時系列表示
    const tlItems = tl.map(ev => ({
      type: "event",
      eventType: ev.eventType || "label_edited",
      icon: ev.icon || "📌",
      label: ev.label,
      savedAt: ev.savedAt || "",
      savedBy: ev.savedBy,
      comment: ev.comment,
      changedFields: ev.changedFields || [],
      changes: ev.changes || {},
    }));
    const snapItems = hist.map((h, i) => ({
      type: "snap",
      eventType: "saved",
      icon: "💾",
      label: "保存スナップショット",
      savedAt: h.savedAt || "",
      savedBy: h.savedBy,
      diff: calcHistoryDiff(h.snapshot, p),
      restoreIdx: i,
      pid: p.id,
    }));
    const allItems = [...tlItems, ...snapItems].sort((a, b) =>
      (b.savedAt || "").localeCompare(a.savedAt || "")
    );

    if (!allItems.length) {
      tabContent = `<div class="detail-section"><p class="notice">変更履歴がありません。フィールドを編集・保存すると自動記録されます。</p></div>`;
    } else {
      // 月でグループ化
      const groups = {};
      allItems.forEach(item => {
        const dt = item.savedAt ? new Date(item.savedAt.replace(/\//g, "-")) : null;
        const key = dt && !isNaN(dt) ? `${dt.getFullYear()}年${dt.getMonth()+1}月` : "日時不明";
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
      });

      const renderChanges = (changes) => {
        const entries = Object.entries(changes || {});
        if (!entries.length) return "";
        return `<div class="tl2-changes">${entries.map(([field, ch]) => {
          const lbl = TRACKED_MASTER_FIELDS[field] || field;
          const from = ch.from != null ? escapeHtml(String(ch.from)) : "—";
          const to   = ch.to   != null ? escapeHtml(String(ch.to))   : "—";
          return `<span class="tl2-change-row"><span class="tl2-change-lbl">${escapeHtml(lbl)}</span><span class="tl2-change-from">${from}</span><span class="tl2-change-arrow">→</span><span class="tl2-change-to">${to}</span></span>`;
        }).join("")}</div>`;
      };

      const renderItem = (item) => {
        const dotColor = TIMELINE_EVENT_COLORS[item.eventType] || "#94a3b8";
        const metaRight = [
          item.savedAt ? `<span class="tl2-date">${escapeHtml(item.savedAt)}</span>` : "",
          item.savedBy && item.savedBy !== "—" ? `<span class="tl2-user">👤 ${escapeHtml(item.savedBy)}</span>` : "",
        ].filter(Boolean).join("");

        if (item.type === "event") {
          const changesHtml = renderChanges(item.changes);
          const fieldsHtml = !changesHtml && item.changedFields.length
            ? `<div class="tl-fields">${item.changedFields.map(f=>`<span class="tl-field-chip">${escapeHtml(f)}</span>`).join("")}</div>` : "";
          return `<div class="tl2-row">
            <div class="tl2-dot-col">
              <span class="tl2-dot" style="background:${dotColor};border-color:${dotColor}">${item.icon}</span>
              <span class="tl2-line"></span>
            </div>
            <div class="tl2-body">
              <div class="tl2-meta">
                <span class="tl2-label">${escapeHtml(item.label)}</span>
                <span class="tl2-meta-right">${metaRight}</span>
              </div>
              ${item.comment ? `<div class="tl2-comment">${escapeHtml(item.comment)}</div>` : ""}
              ${changesHtml}${fieldsHtml}
            </div>
          </div>`;
        } else {
          const diffHtml = item.diff && item.diff.length
            ? `<div class="tl-fields" style="margin-top:4px">${item.diff.map(f=>`<span class="tl-field-chip">${escapeHtml(f)}</span>`).join("")}</div>`
            : `<span class="tl2-comment" style="opacity:.5">変更なし</span>`;
          return `<div class="tl2-row">
            <div class="tl2-dot-col">
              <span class="tl2-dot" style="background:#64748b;border-color:#64748b">💾</span>
              <span class="tl2-line"></span>
            </div>
            <div class="tl2-body">
              <div class="tl2-meta">
                <span class="tl2-label">保存スナップショット</span>
                <span class="tl2-meta-right">${metaRight}
                  <button class="action" style="font-size:11px;padding:2px 8px" data-restore-history="${item.restoreIdx}" data-history-pid="${escapeHtml(item.pid)}">↩ 戻す</button>
                </span>
              </div>
              ${diffHtml}
            </div>
          </div>`;
        }
      };

      const groupsHtml = Object.entries(groups).map(([month, items]) => `
        <div class="tl2-month-group">
          <div class="tl2-month-hd">${escapeHtml(month)}<span class="tl2-month-count">${items.length}件</span></div>
          <div class="tl2-list">${items.map(renderItem).join("")}</div>
        </div>`).join("");

      const totalEvents = tlItems.length;
      const totalSnaps  = snapItems.length;
      tabContent = `<div class="detail-section">
        <div class="tl2-header">
          <h3 class="detail-section-title" style="margin-bottom:0">📜 商品タイムライン</h3>
          <span class="tl2-summary">イベント ${totalEvents}件 / スナップショット ${totalSnaps}件</span>
        </div>
        <div class="tl2-groups">${groupsHtml}</div>
      </div>`;
    }
  } else if (false && tab === "check") { // 統合済み → _tab === "ai" で処理
    const issues = checkFoodLabel(p, d);
    const errorCount = issues.filter(i=>i.level==="error").length;
    const warnCount  = issues.filter(i=>i.level==="warn").length;
    const infoCount  = issues.filter(i=>i.level==="info").length;
    const compScore  = Math.max(0, 100 - errorCount * 15 - warnCount * 5);
    const scoreColor = compScore >= 90 ? "#16a34a" : compScore >= 70 ? "#ca8a04" : "#dc2626";
    const scoreBg    = compScore >= 90 ? "#f0fdf4" : compScore >= 70 ? "#fefce8" : "#fef2f2";
    const scoreBorder= compScore >= 90 ? "#bbf7d0" : compScore >= 70 ? "#fde68a" : "#fca5a5";
    const scoreLabel = compScore >= 90 ? "適合" : compScore >= 70 ? "要確認" : "要修正";
    // 自動修正可能かどうか
    const { changes: autoFixChanges } = normalizeLabelText(p);
    const canAutoFix = autoFixChanges.length > 0;
    const LEGAL_REFS = {
      "name":                "食品表示基準 第3条第1項（別表第1第1号）",
      "ingredients":         "食品表示基準 第3条第1項（第7号）",
      "volume":              "食品表示基準 第3条第1項（第1号）",
      "bestBefore":          "食品表示基準 第3条第1項（第9・10号）",
      "storage":             "食品表示基準 第3条第1項（第11号）",
      "manufacturerName":    "食品表示基準 第3条第1項（第12号）",
      "manufacturerAddress": "食品表示基準 第3条第1項（第12号）",
      "janCode":             "JISコード X 0502",
    };
    const issueHtml = issues.length ? issues.map(i => {
      const icon = i.level==="error" ? "🔴" : i.level==="warn" ? "🟡" : "🔵";
      const cls  = `check-issue check-issue-${i.level}`;
      const fixEntry = i.field ? CHECK_FIX_MAP[i.field] : null;
      const fixBtn = fixEntry ? `<button class="check-fix-btn" data-check-fix="${escapeHtml(i.field)}">修正する →</button>` : "";
      const legalRef = i.field && LEGAL_REFS[i.field] ? `<span class="check-legal-ref">📋 ${escapeHtml(LEGAL_REFS[i.field])}</span>` : "";
      return `<div class="${cls}">
        <div class="check-issue-top"><span class="check-issue-msg">${icon} ${escapeHtml(i.msg)}</span>${fixBtn}</div>
        ${legalRef}
      </div>`;
    }).join("") : "";
    tabContent = `
      <div class="detail-section">
        <h3 class="detail-section-title">食品表示基準チェック</h3>
        <div class="check-score-card" style="background:${scoreBg};border:1.5px solid ${scoreBorder}">
          <div class="csc-left">
            <div class="csc-score" style="color:${scoreColor}">${compScore}<span class="csc-unit">点</span></div>
            <div class="csc-label" style="color:${scoreColor}">${scoreLabel}</div>
          </div>
          <div class="csc-right">
            <div class="csc-bar-track"><div class="csc-bar-fill" style="width:${compScore}%;background:${scoreColor}"></div></div>
            <div class="csc-counts">
              ${errorCount > 0 ? `<span class="csc-err">🔴 必須エラー ${errorCount}件</span>` : ""}
              ${warnCount  > 0 ? `<span class="csc-warn">🟡 警告 ${warnCount}件</span>` : ""}
              ${infoCount  > 0 ? `<span class="csc-info">🔵 参考 ${infoCount}件</span>` : ""}
              ${errorCount === 0 && warnCount === 0 ? `<span class="csc-ok">✅ 問題なし</span>` : ""}
            </div>
            ${canAutoFix ? `<button class="action" style="margin-top:8px;font-size:12px" data-action="master-auto-fix">✨ 自動整形（${autoFixChanges.length}件）</button>` : ""}
          </div>
        </div>
        <div class="check-issues">${issueHtml || '<p class="notice" style="margin-top:12px">✅ 問題は見つかりませんでした。すべての必須項目が入力されています。</p>'}</div>
        <p class="notice" style="margin-top:16px">※ このチェックは食品表示基準（令和元年改正対応）に基づく参考情報です。最終確認は専門家にご相談ください。</p>
      </div>`;
  } else if (_tab === "approval") {
    tabContent = approvalTabHtml(p);
  }

  // 前後移動ナビゲーション
  const sortedForNav = [...products].sort((a,b) => {
    if (masterSort === "name") return (a.internalName||a.name||"").localeCompare(b.internalName||b.name||"", "ja");
    if (masterSort === "completion") { const da=derive(a),db=derive(b); return calcCompletion(b,db).pct-calcCompletion(a,da).pct; }
    if (masterSort === "expiryDate") {
      if (!a.expiryDate && !b.expiryDate) return 0;
      if (!a.expiryDate) return 1; if (!b.expiryDate) return -1;
      return a.expiryDate.localeCompare(b.expiryDate);
    }
    if (masterSort === "releasedAt") return new Date(b.releasedAt||0) - new Date(a.releasedAt||0);
    return (b.updatedAt||"").localeCompare(a.updatedAt||"");
  }).filter(x => {
    if (x.phase !== (p.phase || "released")) return false;
    if (masterSearch && !(x.internalName||"").includes(masterSearch) && !(x.name||"").includes(masterSearch) && !(x.code||"").includes(masterSearch) && !(x.category||"").includes(masterSearch)) return false;
    if (masterPipelineFilter && x.productStatus !== masterPipelineFilter) return false;
    if (masterCategoryFilter && x.category !== masterCategoryFilter) return false;
    return true;
  });
  const navIdx = sortedForNav.findIndex(x => x.id === p.id);
  const prevProd = navIdx > 0 ? sortedForNav[navIdx-1] : null;
  const nextProd = navIdx >= 0 && navIdx < sortedForNav.length-1 ? sortedForNav[navIdx+1] : null;
  const navPosLabel = navIdx >= 0 ? `${navIdx+1}/${sortedForNav.length}` : "";

  return saasLayout(`${escapeHtml(p.name||"新規商品")} – 商品詳細`, `
    <div class="detail-breadcrumb">
      ${p.phase === "development"
        ? `<button class="bread-link" data-nav="dev-products">← 開発中商品</button>`
        : `<button class="bread-link" data-nav="products">← 商品管理</button>`}
      <span class="bread-sep">›</span>
      <span class="bread-current">${escapeHtml(p.name||"新規商品")}</span>
      <span class="phase-chip phase-chip--${p.phase === "development" ? "dev" : "released"}">${p.phase === "development" ? "🔬 開発中" : p.productStatus === "discontinued" ? "⬛ 終売" : "✅ 発売中"}</span>
      ${sortedForNav.length > 1 ? `<div class="detail-nav-arrows">
        <button class="detail-nav-btn" aria-label="${prevProd?`前の商品: ${escapeHtml(prevProd.name||"前の商品")}`:"前の商品（なし）"}" ${prevProd?`data-nav-product-detail="${escapeHtml(prevProd.id)}" title="${escapeHtml(prevProd.name||"前の商品")}"`:`disabled`}>◀</button>
        <span class="detail-nav-pos">${escapeHtml(navPosLabel)}</span>
        <button class="detail-nav-btn" aria-label="${nextProd?`次の商品: ${escapeHtml(nextProd.name||"次の商品")}`:"次の商品（なし）"}" ${nextProd?`data-nav-product-detail="${escapeHtml(nextProd.id)}" title="${escapeHtml(nextProd.name||"次の商品")}"`:`disabled`}>▶</button>
      </div>` : ""}
    </div>
    <div class="detail-header-actions">
      <span id="master-autosave-status" class="autosave-status${masterAutoSaveStatus==="saved"?" autosave-ok":masterAutoSaveStatus==="editing"?" autosave-editing":""}">${masterAutoSaveStatus==="saved"?"保存済み":masterAutoSaveStatus==="editing"?"編集中…":""}</span>
      <button class="action primary" data-action="save-master">保存する</button>
      ${p.phase === "development" ? `<button class="action action--release${p.productStatus === "approved" ? " action--release--ready" : ""}" data-action="release-product" data-pid="${escapeHtml(p.id)}" title="${p.productStatus === "approved" ? "承認済み：発売できます" : "発売済み商品として商品管理へ移行"}">🚀 発売する</button>` : ""}
      ${p.phase === "released" && p.productStatus !== "discontinued" ? `<button class="action action--discontinue" data-action="discontinue-product" data-pid="${escapeHtml(p.id)}" title="この商品を終売にする">🔴 終売にする</button>` : ""}
      <button class="action" data-dup-goto="${escapeHtml(p.id)}" title="この商品のコピーを作成して編集画面へ">複製</button>
    </div>
    ${summaryStrip}
    ${tabNav}
    <div class="kbd-hints kbd-hints--detail"><kbd>1</kbd>〜<kbd>8</kbd> タブ切替 &nbsp;·&nbsp; <kbd>Ctrl</kbd>+<kbd>S</kbd> 保存 &nbsp;·&nbsp; <kbd>Esc</kbd> 一覧へ戻る</div>
    ${tabContent}
    <button class="fab-save" data-action="save-master">保存する</button>
  `);
}

// ── 承認タブ ──────────────────────────────────────────────────────────
function approvalTabHtml(p) {
  const st = p.approvalStatus || "none";
  const currentRole = teamMembers.find(m => m.name === currentUserName)?.role || "";
  const canApprove = currentRole === "admin" || currentRole === "reviewer";
  const canRequest = !!currentUserName && st === "none";
  const canCancel  = !!currentUserName && st === "review" && (p.assignedTo === currentUserName || currentRole === "admin");

  const stateInfo = {
    none:     { icon:"⬜", label:"未申請",   color:"#64748b", bg:"#f8fafc", border:"#e2e8f0" },
    review:   { icon:"🔵", label:"確認待ち", color:"#1d4ed8", bg:"#eff6ff", border:"#bfdbfe" },
    approved: { icon:"✅", label:"承認済み", color:"#15803d", bg:"#f0fdf4", border:"#bbf7d0" },
    rejected: { icon:"↩", label:"差し戻し", color:"#dc2626", bg:"#fef2f2", border:"#fca5a5" },
  }[st] || { icon:"⬜", label:"未申請", color:"#64748b", bg:"#f8fafc", border:"#e2e8f0" };

  const memberOpts = teamMembers.length
    ? teamMembers.filter(m => m.role==="admin"||m.role==="reviewer")
        .map(m=>`<option value="${escapeHtml(m.name)}"${p.assignedTo===m.name?" selected":""}>${escapeHtml(m.name)}（${m.role==="admin"?"管理者":"確認者"}）</option>`).join("")
    : "";

  const requestSection = (st === "none" || st === "rejected") ? `
    <div class="approval-action-card">
      <h4>確認依頼を送る</h4>
      ${!currentUserName ? `<p class="notice">⚠ 先にサイドバーでユーザーを設定してください。</p>` : ""}
      ${memberOpts ? `<label class="field" style="margin-bottom:10px"><span>確認者を指定</span><select id="approval-assign-select"><option value="">指定なし</option>${memberOpts}</select></label>` : ""}
      <label class="field" style="margin-bottom:10px"><span>依頼メモ（任意）</span><textarea id="approval-req-comment" rows="2" placeholder="確認してほしいポイントなど..." style="width:100%;resize:vertical">${escapeHtml(p.approvalComment||"")}</textarea></label>
      <button class="action primary" data-action="request-approval" data-pid="${escapeHtml(p.id)}"${!currentUserName?" disabled":""}>📨 確認依頼を送る</button>
    </div>` : "";

  const approveSection = (st === "review" && canApprove) ? `
    <div class="approval-action-card">
      <h4>承認 / 差し戻し</h4>
      <label class="field" style="margin-bottom:10px"><span>コメント（任意）</span><textarea id="approval-judge-comment" rows="2" placeholder="承認理由・差し戻し理由など..." style="width:100%;resize:vertical"></textarea></label>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="action primary" data-action="approve-product" data-pid="${escapeHtml(p.id)}">✅ 承認する</button>
        <button class="action danger-outline" data-action="reject-product" data-pid="${escapeHtml(p.id)}">↩ 差し戻す</button>
      </div>
    </div>` : "";

  const cancelSection = canCancel ? `<button class="action" style="margin-top:8px" data-action="cancel-approval" data-pid="${escapeHtml(p.id)}">確認依頼を取り消す</button>` : "";

  return `<div class="detail-section">
    <h3 class="detail-section-title">承認ステータス</h3>
    <div class="approval-status-banner" style="background:${stateInfo.bg};border:1px solid ${stateInfo.border};border-radius:10px;padding:16px 20px;margin-bottom:16px">
      <div style="font-size:22px;margin-bottom:4px">${stateInfo.icon} <strong style="color:${stateInfo.color}">${stateInfo.label}</strong></div>
      ${p.assignedTo ? `<div style="font-size:12px;color:#64748b">依頼者：${escapeHtml(p.assignedTo)}</div>` : ""}
      ${p.approverName ? `<div style="font-size:12px;color:#64748b">承認者：${escapeHtml(p.approverName)}　${escapeHtml(p.approvalDate||"")}</div>` : ""}
      ${p.approvalComment ? `<div style="font-size:13px;margin-top:8px;white-space:pre-wrap">${escapeHtml(p.approvalComment)}</div>` : ""}
    </div>
    ${cancelSection}
    ${requestSection}
    ${approveSection}
    ${teamMembers.length === 0 ? `<p class="notice" style="margin-top:12px">⚠ チームメンバーが登録されていません。<button class="action" style="margin-left:8px" data-nav="settings-nav">設定画面で登録する</button></p>` : ""}
    <p class="notice" style="margin-top:16px">現在のユーザー：<strong>${currentUserName ? escapeHtml(currentUserName) : "（未設定）"}</strong>　役割：<strong>${({admin:"管理者",editor:"編集者",reviewer:"確認者"}[currentRole]||"未設定")}</strong></p>
  </div>`;
}

// ── ⑦ 食品表示法チェック ─────────────────────────────────────────────
function checkFoodLabel(p, d) {
  const issues = [];
  const err  = (msg, field) => issues.push({ level: "error", msg, field });
  const warn = (msg, field) => issues.push({ level: "warn",  msg, field });
  const info = (msg)        => issues.push({ level: "info",  msg });

  // 必須項目（食品表示基準 第3条）
  if (!p.name?.trim())                                          err("「名称」は必須項目です（食品表示基準 第3条）", "name");
  if (!(p.ingredients||[]).some(i=>i.name?.trim()))             err("「原材料名」は必須項目です", "ingredients");
  if (!p.volume?.trim())                                        err("「内容量」は必須項目です", "volume");
  if (!p.bestBefore?.trim())                                    err("「賞味期限」または「消費期限」は必須項目です", "bestBefore");
  if (!d.storage?.trim())                                       err("「保存方法」は必須項目です", "storage");
  if (!p.manufacturerName?.trim())                              err("「製造者名」は必須項目です（名称・住所・電話番号）", "manufacturerName");
  if (!p.manufacturerAddress?.trim())                           err("「製造者住所」は必須項目です", "manufacturerAddress");

  // アレルゲン
  const ings = (p.ingredients||[]).filter(i=>i.name?.trim());
  if (ings.length && !d.allergens.length && p.allergensMode !== "manual") {
    info("アレルゲンが検出されていません。原材料名を確認してください。");
  }

  // 添加物区分「／」
  const hasAdditives = ings.some(i=>isAdditive(i.name));
  const hasFoods     = ings.some(i=>!isAdditive(i.name));
  if (hasAdditives && hasFoods && d.ingLabel && !d.ingLabel.includes("／")) {
    warn("食品原材料と添加物は「／」で区切る必要があります（食品表示基準 第3条）");
  }

  // 内容量の形式
  if (p.volume && !/\d/.test(p.volume)) {
    warn("内容量に数値が含まれていません。「100g」「500ml」「6個入り」等の形式で入力してください", "volume");
  }

  // JANコード桁数
  if (p.janCode?.trim() && ![8,13].includes(p.janCode.trim().length)) {
    warn(`JANコードは8桁または13桁です（現在 ${p.janCode.trim().length} 桁）`, "janCode");
  }

  // 栄養成分の重量未入力
  const hasWeights = ings.some(i=>parseFloat(i.weight)>0);
  if (ings.length && !hasWeights && p.nutritionMode !== "manual") {
    info("原材料の重量(g)を入力すると栄養成分が自動計算されます");
  }

  // 賞味期限の形式チェック
  const bb = p.bestBefore?.trim();
  if (bb && !/^(\d{4}[.\/\-年]|\d{2}[.\/\-年]|製造日より)/.test(bb)) {
    warn("賞味期限の形式を確認してください（例：2026/10/01、製造日より90日）", "bestBefore");
  }

  // 原材料の配合順チェック（重量が3件以上入力されている場合のみ判定）
  const ingsWithWeight = ings.filter(i => parseFloat(i.weight) > 0);
  if (ingsWithWeight.length >= 3) {
    const weights = ingsWithWeight.map(i => parseFloat(i.weight));
    const isDescending = weights.every((w, idx) => idx === 0 || weights[idx - 1] >= w);
    if (!isDescending) {
      warn("原材料名は配合量の多い順に表示する義務があります（食品表示基準 第3条）。原材料タブの「重量順に並べ直す」で修正してください");
    }
  }

  // 名称と食品添加物の混在チェック（名称に「添加物」「保存料」等が含まれていないか）
  const additiveKeywordsInName = ["添加物","保存料","着色料","甘味料","香料","酸化防止剤"].filter(k => (p.name||"").includes(k));
  if (additiveKeywordsInName.length) {
    warn(`「名称」フィールドに添加物名（${additiveKeywordsInName.join("・")}）が含まれています。名称は商品の一般的名称を入力し、添加物は原材料タブで登録してください`);
  }

  // 原産地チェック（農産物・畜産物・水産物が主原料と推定される場合）
  if (!p.originCountry?.trim()) {
    const originKeywords = ["牛肉","豚肉","鶏肉","羊肉","馬肉","魚","鮭","マグロ","エビ","カニ","イカ","タコ","米","小麦","大豆","野菜","果物","りんご","みかん","いちご","ぶどう","トマト","キャベツ","にんじん","じゃがいも","さつまいも"];
    const ingNames = ings.map(i=>i.name||"").join("・");
    const needsOrigin = originKeywords.some(k => ingNames.includes(k));
    if (needsOrigin) {
      info("農産物・畜産物・水産物が主原料に含まれる可能性があります。「原産地」の表示が義務付けられている場合があります（食品表示基準 第3条の2）。基本情報タブの「原産地」欄をご確認ください");
    }
  }

  // 栄養成分の整合性チェック（4・9・4ルール）
  const nutr = d.nutrition;
  const nKcal    = parseFloat(nutr.kcal)    || 0;
  const nProtein = parseFloat(nutr.protein) || 0;
  const nFat     = parseFloat(nutr.fat)     || 0;
  const nCarbs   = parseFloat(nutr.carbs)   || 0;
  if (nKcal > 0 || nProtein > 0 || nFat > 0 || nCarbs > 0) {
    const nutrUnit = p.nutritionUnit || "100g当たり";
    if (nutrUnit === "100g当たり" && (nProtein + nFat + nCarbs) > 100) {
      warn(`栄養成分の合計（たんぱく質 ${nProtein}g＋脂質 ${nFat}g＋炭水化物 ${nCarbs}g＝${(nProtein+nFat+nCarbs).toFixed(1)}g）が100gを超えています。表示単位「${nutrUnit}」に対して数値が不正の可能性があります`);
    }
    const calcKcal = Math.round(nProtein * 4 + nFat * 9 + nCarbs * 4);
    if (nKcal > 0 && calcKcal > 0 && Math.abs(nKcal - calcKcal) > Math.max(50, nKcal * 0.3)) {
      info(`エネルギー ${nKcal}kcal と三大栄養素から算出した値（約 ${calcKcal}kcal）に差があります（4・9・4ルール）。栄養成分が正確かご確認ください`);
    }
  }

  // アレルゲン括弧書きガイダンス
  if (d.allergens.length > 0 && d.ingLabel) {
    const ingStr = d.ingLabel;
    const hasBracket = d.allergens.some(a => ingStr.includes(`（${a}`) || ingStr.includes(`(${a}`));
    if (!hasBracket) {
      info(`アレルゲン（${d.allergens.join("・")}）を原材料名の中に括弧書きで表示する方法もあります（例：小麦粉（小麦を含む））。現在は別行表示のみです`);
    }
  }

  return issues;
}

function releaseReadinessHtml(p, d) {
  const comp = calcCompletion(p, d);
  const costs = calcCosts(p);

  const items = [
    {
      label: "ラベル必須項目（完成度100%）",
      ok: comp.pct >= 100,
      detail: comp.pct < 100 ? `未入力: ${comp.missing.join("・")}` : null,
      critical: true,
    },
    {
      label: "原価・販売価格が設定済み",
      ok: costs.totalCost > 0 && costs.price > 0,
      detail: costs.totalCost === 0 ? "原価未入力" : costs.price === 0 ? "販売価格未入力" : null,
      critical: true,
    },
    {
      label: "原価率が目標以内（≤目標原価率）",
      ok: (() => {
        const target = parseFloat(p.targetCostRate || "") || null;
        if (!target || costs.costRate === null) return true;
        return costs.costRate <= target;
      })(),
      detail: (() => {
        const target = parseFloat(p.targetCostRate || "") || null;
        if (!target || costs.costRate === null) return null;
        const diff = costs.costRate - target;
        return diff > 0 ? `目標比 +${diff.toFixed(1)}%` : null;
      })(),
      critical: false,
    },
    {
      label: "チーム承認済み",
      ok: p.approvalStatus === "approved",
      detail: p.approvalStatus === "rejected" ? "差し戻し中" : p.approvalStatus === "review" ? "承認待ち" : "未申請",
      critical: true,
    },
    {
      label: "担当者が設定済み",
      ok: !!(p.specResponsible && p.specResponsible.trim()),
      detail: null,
      critical: false,
    },
  ];

  const blockers = items.filter(i => i.critical && !i.ok);
  const allOk = items.every(i => i.ok);

  const itemsHtml = items.map(item => `
    <div class="rr-item${item.ok ? " rr-item--ok" : item.critical ? " rr-item--ng" : " rr-item--warn"}">
      <span class="rr-ico">${item.ok ? "✅" : item.critical ? "🚫" : "⚠️"}</span>
      <span class="rr-lbl">${escapeHtml(item.label)}</span>
      ${item.detail && !item.ok ? `<span class="rr-detail">${escapeHtml(item.detail)}</span>` : ""}
    </div>`).join("");

  return `<div class="rr-box" style="margin-top:10px">
    <div class="rr-hd">
      <span style="font-weight:600;font-size:12px">🚀 発売準備チェック</span>
      ${allOk
        ? `<span class="rr-badge rr-badge--ok">準備完了</span>`
        : blockers.length > 0
          ? `<span class="rr-badge rr-badge--ng">${blockers.length}件 未完了</span>`
          : `<span class="rr-badge rr-badge--warn">要確認</span>`}
    </div>
    <div class="rr-items">${itemsHtml}</div>
  </div>`;
}

