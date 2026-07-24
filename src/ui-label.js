function editorHtml(p) {
  const d = derive(p);
  const { pct, missing } = calcCompletion(p, d);
  const pctColor = pct >= 100 ? "#16a34a" : pct >= 60 ? "#2563eb" : "#d97706";
  const completionHtml = `<div class="completion-bar-wrap">
    <div class="completion-bar-head">
      <span>入力完成度</span>
      <strong style="color:${pctColor}">${pct}%</strong>
      ${missing.length ? `<span class="completion-missing">未入力：${missing.join("・")}</span>` : `<span class="completion-ok">✓ すべて入力済み</span>`}
    </div>
    <div class="completion-bar-track"><div class="completion-bar-fill" style="width:${pct}%;background:${pctColor}"></div></div>
  </div>`;
  const recentStorageOpts = recentStorage.filter((s) => STORAGE_OPTS.includes(s));
  const storageHtml = `${recentStorageOpts.length ? `<div class="recent-storage-label">よく使う保存方法</div><div class="choice-grid">${recentStorageOpts.map((s) => `<button class="${p.storage === s ? "selected" : ""}" data-storage="${escapeHtml(s)}">${p.storage === s ? "✓ " : ""}${escapeHtml(s)}</button>`).join("")}</div><div class="recent-storage-label">すべての保存方法</div>` : ""}<div class="choice-grid">${STORAGE_OPTS.map((s) => `<button class="${p.storage === s ? "selected" : ""}" data-storage="${escapeHtml(s)}">${p.storage === s ? "✓ " : ""}${escapeHtml(s)}</button>`).join("")}</div>${p.storage === "自由入力" ? `<label class="field"><span>保存方法</span><input data-field="storageCustom" value="${escapeHtml(p.storageCustom)}"></label>` : ""}`;
  const mobileTabHtml = `<div class="mobile-tab-bar"><button class="mobile-tab${mobilePreviewTab==="form"?" active":""}" data-mobile-tab="form">✏️ 入力</button><button class="mobile-tab${mobilePreviewTab==="preview"?" active":""}" data-mobile-tab="preview">👁 プレビュー</button></div>`;
  return `<div class="page">${headerHtml(p.name || "新商品ラベル作成")}${mobileTabHtml}
    <div class="editor-shell">
      <div class="form-column${mobilePreviewTab==="preview"?" mobile-hidden":""}">`+`
        ${completionHtml}
        ${section("商品情報", productInfoHtml(p))}
        ${janCodeHtml(p)}
        ${section("保存方法", storageHtml)}
        ${section("原材料", (() => {
          const totalW = p.ingredients.reduce((s, i) => s + (parseFloat(i.weight) || 0), 0);
          const ingListHtml = p.ingredients.map((i, idx) => {
            const pct = totalW > 0 && parseFloat(i.weight) ? Math.round(parseFloat(i.weight) / totalW * 100) : null;
            const pctBadge = pct !== null ? `<span class="ing-pct">${pct}%</span>` : "";
            const est = i.name && i.weight ? estimateNutrition(i.name) : null;
            return `<div class="ing-row" draggable="true" data-ing-idx="${idx}">
              <span class="drag-handle" title="ドラッグで並び替え">⠿</span>
              <input list="ing-master-list" data-ing-name="${idx}" value="${escapeHtml(i.name)}" placeholder="原材料名">
              <input type="number" data-ing-weight="${idx}" value="${escapeHtml(i.weight)}" placeholder="g">
              ${pctBadge}
              <div class="badges">${isAdditive(i.name) ? `<b class="violet">添加物</b>` : ""}${est ? `<b class="${est.estimated ? "amber" : "green"}">${est.estimated ? "推定" : "DB"}</b>` : ""}</div>
              <button class="icon-btn" data-remove-ing="${idx}">×</button>
            </div>`;
          }).join("");
          const sortBtns = `<div class="ing-sort-row">
            <button class="action-sub" data-action="sort-by-weight">重量順に並べ直す</button>
            <button class="action-sub" data-action="sort-additives">添加物を末尾へ</button>
          </div>`;
          const preview = d.ingLabel ? `<div class="ing-preview-wrap"><div class="ing-preview-label">ラベル表示プレビュー</div><div class="ing-preview">${escapeHtml(d.ingLabel)}</div></div>` : "";
          const bulkPasteHtml = ingBulkPasteOpen ? `<div class="bulk-paste-area"><p class="notice">1行に1つ入力。「原材料名 重量」形式で重量も入力できます</p><textarea id="bulk-paste-textarea" rows="6" placeholder="例：&#10;小麦粉 100&#10;砂糖 50&#10;食塩&#10;加工でん粉"></textarea><div class="bulk-paste-btns"><button class="action primary" data-action="confirm-bulk-paste">追加する</button><button class="action" data-action="toggle-bulk-paste">閉じる</button></div></div>` : "";
          return `<div class="ing-list" id="ing-list">${ingListHtml}</div><div class="ing-add-row"><button class="action" data-action="add-ing">＋ 1件追加</button><button class="action-sub" data-action="toggle-bulk-paste">📋 まとめて入力</button></div>${bulkPasteHtml}${sortBtns}${preview}`;
        })())}
        ${nutritionEditorHtml(p, d)}
        ${allergenEditorHtml(p, d)}
        ${contaminationEditorHtml(p)}
        ${labelAssistHtml(p, d)}
        ${manufacturerEditorHtml(p)}
        ${section("印刷・サイズ設定", printSettingsBodyHtml())}
        ${historyHtml(p)}
        <datalist id="ing-master-list">${[...ingMaster, ...Object.keys(NUTRITION_DB)].filter((v,i,a)=>a.indexOf(v)===i && !v.includes("/") && !v.includes("／")).map(n => `<option value="${escapeHtml(n)}">`).join("")}</datalist>
      </div>
      <div class="preview-column${mobilePreviewTab==="form"?" mobile-hidden":""}">${previewHtml(p, d)}</div>
    </div>
    <button class="fab-save" data-action="save" title="保存する">保存する</button>
  </div>`;
}
function section(title, body, accent = false) {
  const open = openSections.has(title);
  return `<section class="section${accent ? " accent" : ""}${open ? " open" : ""}">
    <button class="section-header" data-toggle-section="${escapeHtml(title)}">
      <span class="section-title-text">${escapeHtml(title)}</span>
      <span class="section-chevron">${open ? "▲" : "▼"}</span>
    </button>
    <div class="section-body"${open ? "" : ' style="display:none"'}>${body}</div>
  </section>`;
}
function calcCompletion(p, d) {
  const items = [
    { ok: !!p.name?.trim(), label: "名称" },
    { ok: p.ingredients.some((i) => i.name?.trim()), label: "原材料名" },
    { ok: !!p.volume?.trim(), label: "内容量" },
    { ok: !!p.bestBefore?.trim(), label: "賞味期限" },
    { ok: !!d.storage?.trim(), label: "保存方法" },
    { ok: !!p.manufacturerName?.trim(), label: "製造者名" },
    { ok: !!p.manufacturerAddress?.trim(), label: "製造者住所" },
  ];
  const filled = items.filter((i) => i.ok).length;
  const pct = Math.round((filled / items.length) * 100);
  const missing = items.filter((i) => !i.ok).map((i) => i.label);
  return { pct, missing };
}
function manufacturerEditorHtml(p) {
  const selected = selectedMfrTypes(p);
  const tplHtml = mfrTemplates.length
    ? `<div class="mfr-tpl-row"><select data-mfr-tpl-select><option value="">テンプレートを選択...</option>${mfrTemplates.map((t, i) => `<option value="${i}">${escapeHtml(t.label)}</option>`)}</select><button class="action" data-action="del-mfr-tpl">削除</button></div>`
    : "";
  return section("製造者・製造所・加工者", `${tplHtml}<div class="mfr-choice">${MFR_TYPES.map((t) => `<button class="${selected.includes(t) ? "selected" : ""}" data-mfr="${t}">${selected.includes(t) ? "✓ " : ""}${t}</button>`).join("")}</div><p class="notice">複数選択できます。</p><label class="field"><span>名称<b>必須</b></span><input data-field="manufacturerName" value="${escapeHtml(p.manufacturerName)}" placeholder="例：株式会社APW"></label><div class="two-col"><label class="field"><span>郵便番号</span><input data-field="manufacturerPostal" value="${escapeHtml(p.manufacturerPostal)}"></label><label class="field"><span>電話番号</span><input data-field="manufacturerPhone" value="${escapeHtml(p.manufacturerPhone)}"></label></div><label class="field"><span>住所</span><input data-field="manufacturerAddress" value="${escapeHtml(p.manufacturerAddress)}"></label><div class="mfr-tpl-save-row"><input id="mfr-tpl-name" placeholder="テンプレート名（例：本店・工場）"><button class="action" data-action="save-mfr-tpl">テンプレートとして保存</button></div>`);
}
const HISTORY_DIFF_FIELDS = [
  ["名称", x => x.name || ""],
  ["内容量", x => x.volume || ""],
  ["賞味期限", x => x.bestBefore || ""],
  ["保存方法", x => (x.storage||"")+(x.storageCustom||"")],
  ["製造者名", x => x.manufacturerName || ""],
  ["製造者住所", x => x.manufacturerAddress || ""],
  ["カテゴリ", x => x.category || ""],
  ["原産地", x => x.originCountry || ""],
  ["原材料数", x => String((x.ingredients||[]).filter(i=>i.name?.trim()).length)],
];
function calcHistoryDiff(snap, current) {
  return HISTORY_DIFF_FIELDS.filter(([, fn]) => fn(snap) !== fn(current)).map(([l]) => l);
}
function historyHtml(p) {
  const hist = loadHistory(p.id);
  if (!hist.length) return "";
  const rows = hist.map((h, i) => {
    const diff = calcHistoryDiff(h.snapshot, p);
    return `<div class="history-row">
      <span class="history-date">${escapeHtml(h.savedAt)}</span>
      ${diff.length
        ? `<span class="history-diff-chip">変更: ${diff.map(l=>escapeHtml(l)).join("・")}</span>`
        : `<span class="history-diff-chip history-diff-same">変更なし</span>`}
      <button class="action" data-restore-history="${i}" data-history-pid="${escapeHtml(p.id)}">この時点に戻す</button>
    </div>`;
  }).join("");
  return section("変更履歴", `<div class="history-list">${rows}</div>`);
}
function detectBestBeforeMode(v) {
  if (!v) return "date";
  if (/^製造日より\d+日$/.test(v)) return "days";
  if (/^製造日より\d+[かヶ]月$/.test(v)) return "months";
  if (/^\d{4}[./-]/.test(v) || /^\d{4}-\d{2}-\d{2}$/.test(v) || /^\d{4}年/.test(v)) return "date";
  return "text";
}
function productInfoHtml(p) {
  const volume = splitVolume(p.volume);
  const isCustomUnit = !!p.volumeCustomUnit || (!!volume.unit && !VOLUME_UNITS.includes(volume.unit));
  const activeUnit = isCustomUnit ? "その他" : (volume.unit || "個");
  const dateValue = toDateInputValue(p.bestBefore);
  const bbMode = detectBestBeforeMode(p.bestBefore);
  const bbDays   = (p.bestBefore||"").match(/製造日より(\d+)日/)?.[1] || "";
  const bbMonths = (p.bestBefore||"").match(/製造日より(\d+)[かヶ]月/)?.[1] || "";
  const bbModes = [
    ["date",   "年月日"],
    ["days",   "製造日より○日"],
    ["months", "製造日より○ヶ月"],
    ["text",   "自由入力"],
  ];
  const bbInput = bbMode === "date"
    ? `<input type="date" data-date-input value="${escapeHtml(dateValue)}">
       <div class="unit-tabs date-tabs">${DATE_PRESETS.map(([id, label]) => `<button data-date-preset="${id}">${escapeHtml(label)}</button>`).join("")}</div>`
    : bbMode === "days"
    ? `<div class="bb-num-wrap"><input type="number" data-bb-days value="${escapeHtml(bbDays)}" min="1" max="3650" placeholder="90" style="width:90px"><span class="bb-unit">日</span></div>`
    : bbMode === "months"
    ? `<div class="bb-num-wrap"><input type="number" data-bb-months value="${escapeHtml(bbMonths)}" min="1" max="120" placeholder="3" style="width:90px"><span class="bb-unit">ヶ月</span></div>`
    : `<input data-field="bestBefore" value="${escapeHtml(p.bestBefore||"")}" placeholder="例：製造日より90日">`;
  const bbPreview = p.bestBefore ? `<div class="bb-preview">ラベル表示：<strong>${escapeHtml(p.bestBefore)}</strong></div>` : "";
  return `<div class="two-col">
      <label class="field"><span>社内名称<span class="field-note">管理用・ラベル非表示</span></span><input data-field="internalName" value="${escapeHtml(p.internalName||"")}" placeholder="例：ドーナツ プレーン"></label>
      <label class="field"><span>名称（表示名）<b>必須</b></span><input data-field="name" value="${escapeHtml(p.name)}" placeholder="例：油菓子"></label>
    </div>
    <div class="two-col">
      <div class="field">
        <span>内容量</span>
        <div class="volume-row">
          <input class="volume-amount-input" inputmode="decimal" data-volume-amount value="${escapeHtml(volume.amount)}" placeholder="数量（例：6）">
          <div class="unit-tabs volume-unit-tabs">${VOLUME_UNITS.map((u) => `<button class="${activeUnit === u ? "selected" : ""}" data-volume-unit="${escapeHtml(u)}">${escapeHtml(u)}</button>`).join("")}</div>
        </div>
        ${activeUnit === "その他" ? `<input data-volume-custom-unit value="${escapeHtml(isCustomUnit ? volume.unit : "")}" placeholder="単位を入力 例：ホール・パック・瓶" style="margin-top:6px">` : ""}
        ${p.volume ? `<div class="bb-preview">ラベル表示：<strong>${escapeHtml(p.volume)}</strong></div>` : `<div class="bb-preview" style="color:#f87171">数量を入力してください</div>`}
      </div>
      <div class="field">
        <span>賞味期限</span>
        <div class="unit-tabs bb-mode-tabs">${bbModes.map(([id, label]) => `<button class="${bbMode===id?"selected":""}" data-bb-mode="${id}">${escapeHtml(label)}</button>`).join("")}</div>
        ${bbInput}
        ${bbPreview}
      </div>
    </div>`;
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
  const nutrUnit = p.nutritionUnit || "100g当たり";
  const nutrUnits = ["100g当たり", "1食分当たり", "1個当たり"];
  const unitSelector = `<div class="nutr-unit-row"><span class="nutr-unit-label">表示単位：</span>${nutrUnits.map(u => `<button class="nutr-unit-btn${nutrUnit===u?" selected":""}" data-field="nutritionUnit" data-value="${u}">${u}</button>`).join("")}</div>`;
  return section("栄養成分表示", `${unitSelector}<div class="mode-row"><button class="${p.nutritionMode !== "manual" ? "selected" : ""}" data-nutr-mode="auto">自動計算</button><button class="${p.nutritionMode === "manual" ? "selected" : ""}" data-nutr-mode="manual">自分で編集</button></div><div class="nutrition-grid">${row("kcal", "エネルギー", "kcal")}${row("protein", "たんぱく質", "g")}${row("fat", "脂質", "g")}${row("carbs", "炭水化物", "g")}${row("salt", "食塩相当量", "g")}</div>${d.autoNutrition.hasEst ? `<p class="notice">一部の原材料は近い食品成分データで推定しています。</p>` : ""}`, true);
}
function allergenEditorHtml(p, d) {
  const autoBody = d.autoAllergens.length
    ? `<div class="chips allergen">${d.autoAllergens.map((a) => `<span>${escapeHtml(a)}</span>`).join("")}</div>
       <p class="notice" style="margin-top:6px;font-size:11px;color:#92400e;background:#fffbeb;border-color:#fde68a">
         ⚠ <strong>自動推定です。必ず目視で確認してください。</strong><br>
         原材料名の表記が正確でない場合、検出もれや誤検出があります。確認後「自分で編集」で修正してください。
       </p>`
    : `<em style="color:#64748b">検出なし</em>
       <p class="notice" style="margin-top:6px;font-size:11px">原材料名を入力するとアレルゲンを自動検出します。「自分で編集」で手動指定も可能です。</p>`;
  return section("アレルゲン", `<div class="mode-row"><button class="${p.allergensMode !== "manual" ? "selected" : ""}" data-alg-mode="auto">自動検出</button><button class="${p.allergensMode === "manual" ? "selected" : ""}" data-alg-mode="manual">自分で編集</button></div>${p.allergensMode === "manual" ? `<input class="wide-input" data-field="allergensManual" value="${escapeHtml(p.allergensManual || "")}" placeholder="例：小麦、卵、乳"><p class="notice" style="margin-top:6px;font-size:11px">食品表示基準の特定原材料（8品目）および特定原材料に準ずるもの（20品目）を確認してください。</p>` : autoBody}`);
}
function contaminationEditorHtml(p) {
  return section("コンタミネーション", `<div class="mode-row"><button class="${!p.contaminationEnabled ? "selected" : ""}" data-contamination="off">表示しない</button><button class="${p.contaminationEnabled ? "selected" : ""}" data-contamination="on">表示する</button></div>${p.contaminationEnabled ? `<label class="field"><span>対象アレルゲン</span><input data-field="contaminationAllergens" value="${escapeHtml(p.contaminationAllergens || "")}" placeholder="例：小麦、卵、乳成分"></label><label class="field"><span>表示文</span><input data-field="contaminationText" value="${escapeHtml(p.contaminationText || "")}" placeholder="例：本品製造工場では、小麦・卵・乳成分を含む製品を製造しています。"></label><p class="notice">表示文が空の場合、対象アレルゲンから定型文を作ります。</p>` : `<p class="notice">同じ工場・同じラインで扱うアレルゲンがある場合に使います。</p>`}`);
}
function labelAssistHtml(p, d) {
  const checks = labelChecklist(p, d);
  const okCount = checks.filter((c) => c.ok).length;
  const aiCheckHtml = (() => {
    if (aiLabelCheckLoading) return `<div class="ai-check-loading">🤖 AIが食品表示法を照合中...</div>`;
    if (aiLabelCheckResult) return `<div class="ai-check-result">${renderMarkdown(aiLabelCheckResult)}<button class="action-sub" data-action="run-ai-label-check" style="margin-top:8px">再チェック</button></div>`;
    return `<button class="action ai-check-btn" data-action="run-ai-label-check">🔍 AI食品表示法チェック</button>`;
  })();
  return section("表示チェックリスト", `
    <div class="assist-actions">
      <button class="action primary" data-action="normalize-label">食品表示向けに整える</button>
      <button class="action ai-consult-btn" data-action="open-ai-panel">💬 AIに相談</button>
    </div>
    ${assistMessage ? `<p class="notice success">${escapeHtml(assistMessage)}</p>` : ""}
    <div class="checklist-summary"><span>${okCount} / ${checks.length} 項目OK</span>${okCount < checks.length ? `<span class="checklist-warn-hint">⬇ 要確認項目をクリックで該当欄へジャンプ</span>` : ""}</div>
    <div class="check-list">${checks.map((item) => `<div class="${item.ok ? "check-ok" : "check-warn check-jumpable"}" ${!item.ok ? `data-jump-label="${escapeHtml(item.label)}" title="クリックで該当欄へ移動"` : ""}><b>${item.ok ? "✓" : "!"}</b><span>${escapeHtml(item.label)}</span></div>`).join("")}</div>
    <div class="ai-check-wrap">${aiCheckHtml}</div>
    <p class="notice">この機能は表示補助です。法令適合の最終確認は事業者の責任で行ってください。</p>`);
}
function labelChecklist(p, d) {
  const ingWithWeight = p.ingredients.filter((i) => i.name?.trim() && Number(i.weight) > 0);
  const ingAny = p.ingredients.some((i) => i.name?.trim());
  const hasWeight = ingWithWeight.length > 0;
  return [
    { label: p.name?.trim() ? "名称が入力されています" : "名称が未入力です → 商品情報で入力してください", ok: !!p.name?.trim() },
    { label: ingAny ? "原材料名が入力されています" : "原材料名が未入力です → 原材料セクションで追加してください", ok: ingAny },
    { label: hasWeight ? "原材料の重量が入力されています（栄養成分を自動計算）" : "原材料重量：任意入力（重量を入力すると栄養成分を自動計算できます）", ok: true },
    { label: p.volume?.trim() ? "内容量が入力されています" : "内容量が未入力です → 商品情報で入力してください", ok: !!p.volume?.trim() },
    { label: p.bestBefore?.trim() ? "賞味期限が入力されています" : "賞味期限が未入力です → 商品情報で入力してください", ok: !!p.bestBefore?.trim() },
    { label: d.storage?.trim() ? "保存方法が入力されています" : "保存方法が未入力です → 保存方法セクションで選択してください", ok: !!d.storage?.trim() },
    { label: p.manufacturerName?.trim() ? "製造者名が入力されています" : "製造者名が未入力です → 製造者セクションで入力してください", ok: !!p.manufacturerName?.trim() },
    { label: p.manufacturerAddress?.trim() ? "製造者住所が入力されています" : "製造者住所が未入力です → 製造者セクションで入力してください", ok: !!p.manufacturerAddress?.trim() },
    { label: d.nutrition.kcal > 0 ? "栄養成分が計算・設定されています" : "栄養成分は未計算（任意：原材料に重量を入力するか手動で設定してください）", ok: true },
    {
      label: p.allergensMode === "manual"
        ? (p.allergensManual?.trim() ? "アレルゲンが手動設定されています" : "アレルゲンの手動入力が未記入です → アレルゲンセクションで入力してください")
        : (d.autoAllergens.length > 0 ? `アレルゲンを自動検出済み（${d.autoAllergens.join("・")}）` : "アレルゲン：検出なし（非アレルゲン原料のみ、または原材料未入力）"),
      ok: p.allergensMode === "manual" ? !!p.allergensManual?.trim() : true,
    },
    { label: p.contaminationEnabled ? (buildContaminationText(p) ? "コンタミネーション表示が設定されています" : "コンタミネーションの内容が未設定です") : "コンタミネーション：表示しない設定", ok: p.contaminationEnabled ? !!buildContaminationText(p) : true },
    { label: !p.janCode || [8, 13].includes(normalizedJan(p.janCode).length) ? "JANコードの桁数が正しい" : "JANコードは8桁または13桁にしてください", ok: !p.janCode || [8, 13].includes(normalizedJan(p.janCode).length) },
  ];
}
function previewHtml(p, d) {
  const targetChoices = [["label", "表示ラベルのみ"], ["nutrition", "栄養成分表示のみ"], ["both", "両方"]];
  const labelStyle = `style="width:${escapeHtml(printCfg.w || "90")}mm;${printCfg.h ? `min-height:${escapeHtml(printCfg.h)}mm;` : ""}font-size:${escapeHtml(printCfg.fs || "7.5")}pt;"`;
  const printable = printablePreviewHtml(p, d, labelStyle, true);
  const ZOOM_OPTS = [50, 75, 100, 150];
  const isJissun = previewZoom === "実寸";
  const zoomStyle = isJissun
    ? `padding:${escapeHtml(printCfg.margin || "3")}mm;width:fit-content;`
    : `padding:${escapeHtml(printCfg.margin || "3")}mm;transform:scale(${Number(previewZoom) / 100});transform-origin:top left;width:fit-content;`;
  return `<aside class="preview-panel">
    <div class="preview-top-bar">
      <div class="target-tabs">${targetChoices.map(([id, label]) => `<button class="${printTarget === id ? "selected" : ""}" data-target-choice="${id}">${label}</button>`).join("")}</div>
      <div class="zoom-controls">
        ${ZOOM_OPTS.map((z) => `<button class="zoom-btn${previewZoom === z ? " selected" : ""}" data-zoom="${z}">${z}%</button>`).join("")}
        <button class="zoom-btn${isJissun ? " selected" : ""}" data-zoom="実寸">実寸</button>
      </div>
    </div>
    ${isJissun ? `<div class="jissun-badge">📐 実寸表示中（画面解像度に依存します）</div>` : ""}
    <div class="preview-area-wrap">
      <div id="print-area" style="${zoomStyle}">${printable}</div>
    </div>
    <div class="output-actions">
      <button class="action print-btn" data-action="open-print-preview">🖨 印刷プレビュー</button>
      <button class="action secondary" data-action="copy-image-output">画像コピー</button>
      <button class="action" data-action="download-image">⬇ 画像保存</button>
      <button class="action" data-action="copy-output">文字コピー</button>
    </div>
    <p class="label-disclaimer">※ 表示内容の最終確認・法令適合の判断は事業者様の責任で行ってください。</p>
    ${printPreviewOpen ? printPreviewModalHtml(printable) : ""}
    ${showAiPanel ? aiPanelHtml(p, d) : ""}
  </aside>`;
}
function printablePreviewHtml(p, d, labelStyle, showHeadings) {
  return `<div class="print-stack">${printTarget !== "nutrition" ? `<div>${showHeadings ? `<h2 class="preview-heading">表示ラベル</h2>` : ""}<div class="print-sized" ${labelStyle}>${basicLabelHtml(p, d)}${contaminationNoteHtml(d)}</div></div>` : ""}${printTarget !== "label" ? `<div>${showHeadings ? `<h2 class="preview-heading">栄養成分表示</h2>` : ""}<div class="print-sized" ${labelStyle}>${nutritionLabelHtml(d)}</div></div>` : ""}</div>`;
}
function contaminationNoteHtml(d) {
  if (!d.contamination) return "";
  return `<div class="contamination-note">※${escapeHtml(d.contamination)}</div>`;
}
function printPreviewModalHtml(printable) {
  return `<div class="print-preview-modal"><div class="print-preview-card"><div class="print-preview-head"><div><b>印刷前確認</b><span>ブラウザの印刷ダイアログで表示されない場合も、ここでサイズ感を確認できます。</span></div><button class="action" data-action="close-print-preview">閉じる</button><button class="action primary" data-action="confirm-print">この内容で印刷</button></div><div class="print-preview-sheet" style="padding:${escapeHtml(printCfg.margin || "3")}mm;">${printable}</div></div></div>`;
}
function printSettingsBodyHtml() {
  const previewNote = printPreviewSupportHtml();
  return `<div class="print-controls"><label class="field"><span>サイズプリセット</span><select data-size>${SIZE_PRESETS.map((s) => `<option ${s.label === printCfg.label ? "selected" : ""}>${s.label}</option>`).join("")}</select></label></div>
    <div class="size-controls">
      <label class="field"><span>幅(mm)</span><input type="number" data-print-cfg="w" value="${escapeHtml(printCfg.w || "")}" placeholder="90"></label>
      <label class="field"><span>高さ(mm)</span><input type="number" data-print-cfg="h" value="${escapeHtml(printCfg.h || "")}" placeholder="自動"></label>
      <label class="field"><span>余白(mm)</span><input type="number" data-print-cfg="margin" value="${escapeHtml(printCfg.margin || "")}" placeholder="3"></label>
      <label class="field"><span>文字(pt)</span><input type="number" step="0.1" data-print-cfg="fs" value="${escapeHtml(printCfg.fs || "")}" placeholder="7.5"></label>
    </div>
    <div class="offset-controls">
      <span class="offset-label">印刷位置補正</span>
      <label><span>上下(mm)</span><input type="number" step="0.5" data-print-offset="y" value="${escapeHtml(printOffsetY)}" placeholder="0"></label>
      <label><span>左右(mm)</span><input type="number" step="0.5" data-print-offset="x" value="${escapeHtml(printOffsetX)}" placeholder="0"></label>
    </div>
    ${previewNote}`;
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
  const labelStyle = `style="width:${escapeHtml(printCfg.w || "90")}mm;${printCfg.h ? `min-height:${escapeHtml(printCfg.h)}mm;` : ""}font-size:${escapeHtml(printCfg.fs || "7.5")}pt;"`;
  return `<style>${copyHtmlStyles()}</style>${printablePreviewHtml(p, d, labelStyle, true)}`;
}
function copyHtmlDocument(html) {
  return `<!doctype html><html><head><meta charset="UTF-8"></head><body>${html}</body></html>`;
}
function basicLabelHtml(p, d) {
  const makerLines = [
    [p.manufacturerName, p.manufacturerPostal ? `〒${p.manufacturerPostal}` : ""].filter(Boolean).join(" "),
    p.manufacturerAddress,
    p.manufacturerPhone,
  ].filter(Boolean);
  const maker = makerLines.map((l) => escapeHtml(l)).join("<br>");
  const rows = [["名称", p.name || "ー"], ["原材料名", d.ingLabel || "ー"], ["内容量", p.volume || "ー"], ["賞味期限", p.bestBefore || "ー"], ["保存方法", d.storage || "ー"]];
  if (p.originCountry?.trim()) rows.push(["原産地", p.originCountry]);
  if (d.allergens.length) rows.push(["アレルゲン", `${d.allergens.join("・")}を含む`]);
  const makerRows = selectedMfrTypes(p).map(type => `<tr><th>${escapeHtml(type)}</th><td>${maker || "ー"}</td></tr>`).join("");
  const barcode = canUseJanCode() ? janBarcodeSvg(p.janCode) : "";
  return `<div class="label-paper basic-label"><table><tbody>${rows.map(([k, v]) => `<tr><th>${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}${makerRows}</tbody></table>${barcode ? `<div class="label-barcode-footer"><div class="barcode-title">JANコード</div>${barcode}</div>` : ""}</div>`;
}
function nutritionLabelHtml(d) {
  const n = d.nutrition;
  return `<div class="label-paper nutrition-label"><h3>栄養成分表示</h3><p>${escapeHtml(d.nutritionUnit||"100g当たり")}</p><table><tbody>
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
    showModal({
      message: `${planInfo().label}プランは${planInfo().note}です。プランを変更すると追加できます。`,
      onConfirm: () => { view = "home"; render(); },
    });
    return;
  }
  p.updatedAt = new Date().toLocaleDateString("ja-JP");
  if (exists) saveHistory(p);
  products = exists ? products.map((x) => (x.id === p.id ? p : x)) : [p, ...products];
  if (!exists) saveTimelineEvent(p.id, "registered", "🆕 登録", "", []);
  if (exists) saveTimelineEvent(p.id, "label_edited", "🏷 ラベル編集・保存", "", []);
  saveProducts();
  p.ingredients.forEach((i) => { if (i.name?.trim()) saveIngMaster(i.name); });
  view = "edit";
  editId = p.id;
  draft = null;
  autoSaveStatus = "保存済み";
  showStatus("保存しました");
}


function printLabels() {
  const style = document.createElement("style");
  style.id = "print-style";
  style.textContent = `
    @page { margin: 0; size: auto; }
    @media print {
      body > * { display: none !important; }
      #print-area { display: block !important; position: fixed !important; top: ${printOffsetY || 0}mm !important; left: ${printOffsetX || 0}mm !important; background: #fff !important; padding: ${printCfg.margin}mm !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      #print-area .label-paper { width: ${printCfg.w || 90}mm !important; ${printCfg.h ? `min-height: ${printCfg.h}mm !important;` : ""} font-size: ${printCfg.fs || 7.5}pt !important; box-shadow: none !important; break-inside: avoid; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
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
  if (navigator.clipboard?.write && window.ClipboardItem) {
    const blob = new Blob([html], { type: "text/html" });
    const textBlob = new Blob([text], { type: "text/plain" });
    return navigator.clipboard.write([new ClipboardItem({ "text/html": blob, "text/plain": textBlob })]);
  }
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  return Promise.resolve();
}

function imageCopyRows(p, d) {
  const maker = [
    [p.manufacturerName, p.manufacturerPostal ? `〒${p.manufacturerPostal}` : ""].filter(Boolean).join(" "),
    p.manufacturerAddress,
    p.manufacturerPhone,
  ].filter(Boolean).join("\n");
  const rows = [["名称", p.name || "ー"], ["原材料名", d.ingLabel || "ー"], ["内容量", p.volume || "ー"], ["賞味期限", p.bestBefore || "ー"], ["保存方法", d.storage || "ー"]];
  if (p.originCountry?.trim()) rows.push(["原産地", p.originCountry]);
  selectedMfrTypes(p).forEach((type) => rows.push([type, maker || "ー"]));
  if (d.allergens.length) rows.push(["アレルゲン", `${d.allergens.join("・")}を含む`]);
  return rows;
}

function wrapCanvasText(ctx, text, maxWidth) {
  const result = [];
  String(text || "").split("\n").forEach((paragraph) => {
    const chars = paragraph.split("");
    let line = "";
    chars.forEach((ch) => {
      const next = line + ch;
      if (line && ctx.measureText(next).width > maxWidth) { result.push(line); line = ch; }
      else { line = next; }
    });
    result.push(line);
  });
  const lines = result.filter((l) => l !== "");
  return lines.length ? lines : ["ー"];
}

function drawTextLines(ctx, lines, x, y, lineHeight) {
  lines.forEach((line, idx) => ctx.fillText(line, x, y + idx * lineHeight));
}

function drawTableImage(ctx, x, y, width, title, rows, fs, font) {
  const F = font || `"Meiryo","Yu Gothic","MS Gothic",sans-serif`;
  const keyW = Math.min(112, Math.max(78, width * 0.26));
  const pad = 8;
  const lineH = fs * 1.45;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  ctx.lineWidth = 1;
  ctx.font = `${fs}px ${F}`;
  let cy = y;
  if (title) {
    ctx.font = `700 ${fs + 2}px ${F}`;
    ctx.textAlign = "left";
    ctx.fillText(title, x, cy + fs + 2);
    cy += fs + 12;
    ctx.font = `${fs}px ${F}`;
  }
  rows.forEach(([key, value]) => {
    const valueLines = wrapCanvasText(ctx, value, width - keyW - pad * 3);
    const rowH = Math.max(28, valueLines.length * lineH + pad * 1.4);
    ctx.strokeRect(x, cy, width, rowH);
    ctx.beginPath();
    ctx.moveTo(x + keyW, cy);
    ctx.lineTo(x + keyW, cy + rowH);
    ctx.stroke();
    ctx.font = `700 ${fs}px ${F}`;
    ctx.fillText(String(key || ""), x + pad, cy + pad + fs);
    ctx.font = `${fs}px ${F}`;
    drawTextLines(ctx, valueLines, x + keyW + pad, cy + pad + fs, lineH);
    cy += rowH;
  });
  return cy;
}

function drawNutritionImage(ctx, x, y, width, d, fs, font) {
  const n = d.nutrition;
  return drawTableImage(ctx, x, y, width, "", [
    ["100g当たり", ""],
    ["エネルギー", `${n.kcal}kcal`],
    ["たんぱく質", `${n.protein}g`],
    ["脂質", `${n.fat}g`],
    ["炭水化物", `${n.carbs}g`],
    ["食塩相当量", `${n.salt}g`],
    ["備考", `この表示値は目安です。${d.autoNutrition.hasEst ? "一部推定値を含みます。" : ""}`],
  ], fs, font);
}

function crc32(buf) {
  let c = 0xffffffff;
  const table = crc32.t || (crc32.t = Array.from({ length: 256 }, (_, n) => {
    let v = n;
    for (let k = 0; k < 8; k++) v = (v & 1) ? (0xedb88320 ^ (v >>> 1)) : (v >>> 1);
    return v >>> 0;
  }));
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return ((c ^ 0xffffffff) >>> 0);
}
function pngWith300dpi(bytes) {
  // 300 DPI = 11811 pixels/metre (rounded)
  const ppm = 11811;
  const type = new TextEncoder().encode("pHYs");
  const data = new Uint8Array(9);
  const dv = new DataView(data.buffer);
  dv.setUint32(0, ppm);
  dv.setUint32(4, ppm);
  data[8] = 1; // unit = metre
  const payload = new Uint8Array([...type, ...data]);
  const crc = crc32(payload);
  const chunk = new Uint8Array(12 + 9);
  const cdv = new DataView(chunk.buffer);
  cdv.setUint32(0, 9); // data length
  chunk.set(payload, 4);
  cdv.setUint32(13, crc);
  // Insert after IHDR (8-byte sig + 4+4+13+4 = 25 → total 33 bytes)
  const out = new Uint8Array(bytes.length + chunk.length);
  out.set(bytes.slice(0, 33));
  out.set(chunk, 33);
  out.set(bytes.slice(33), 33 + chunk.length);
  return out;
}
// canvas.toBlob() を使用（toDataURL より大容量キャンバスに対して安定）
function canvasToPngBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) { reject(new Error("toBlob failed")); return; }
      resolve(blob);
    }, "image/png");
  });
}

function downloadImageDataUrl(dataUrl) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `food-label-${new Date().toISOString().slice(0, 10)}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  showStatus("\u753b\u50cf\u3092\u4fdd\u5b58\u3057\u307e\u3057\u305f");
}

function showImageSavePanel(dataUrl) {
  document.querySelector(".image-save-modal")?.remove();
  const modal = document.createElement("div");
  modal.className = "print-preview-modal image-save-modal";
  modal.innerHTML = `
    <div class="print-preview-card">
      <div class="print-preview-head">
        <div>
          <b>\u753b\u50cf\u3092\u4fdd\u5b58</b>
          <span>PNG\u753b\u50cf\u3068\u3057\u3066\u4fdd\u5b58\u3067\u304d\u307e\u3059\u3002P-touch\u306b\u53d6\u308a\u8fbc\u3080\u5834\u5408\u306f\u3001\u4fdd\u5b58\u3057\u305f\u753b\u50cf\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002</span>
        </div>
        <button class="action" data-image-close>\u9589\u3058\u308b</button>
        <button class="action primary" data-image-save>\u753b\u50cf\u3092\u4fdd\u5b58</button>
      </div>
      <div class="print-preview-sheet">
        <img src="${dataUrl}" alt="\u98df\u54c1\u8868\u793a\u30e9\u30d9\u30eb\u753b\u50cf" style="max-width:100%;height:auto;background:#fff;border:1px solid #ddd;">
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.querySelector("[data-image-close]").addEventListener("click", () => modal.remove());
  modal.querySelector("[data-image-save]").addEventListener("click", () => downloadImageDataUrl(dataUrl));
  showStatus("\u753b\u50cf\u4fdd\u5b58\u753b\u9762\u3092\u958b\u304d\u307e\u3057\u305f");
}

function openImageSaveWindow(dataUrl) {
  const win = window.open("", "_blank");
  if (!win) return false;
  win.document.open();
  win.document.write(`<!doctype html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>\u753b\u50cf\u4fdd\u5b58</title>
        <style>
          body{font-family:system-ui,-apple-system,"Yu Gothic",sans-serif;margin:24px;background:#f7f4ef;color:#1f1b2d;}
          .bar{display:flex;gap:12px;align-items:center;margin-bottom:16px;}
          a{background:#159c8f;color:white;text-decoration:none;border-radius:10px;padding:12px 18px;font-weight:800;}
          p{margin:0;color:#554f46;}
          img{display:block;max-width:100%;height:auto;background:white;border:1px solid #ddd;box-shadow:0 10px 30px rgba(0,0,0,.12);}
        </style>
      </head>
      <body>
        <div class="bar">
          <a href="${dataUrl}" download="food-label-${new Date().toISOString().slice(0, 10)}.png">\u753b\u50cf\u3092\u4fdd\u5b58</a>
          <p>\u4fdd\u5b58\u30dc\u30bf\u30f3\u304c\u52d5\u304b\u306a\u3044\u5834\u5408\u306f\u3001\u753b\u50cf\u3092\u53f3\u30af\u30ea\u30c3\u30af\u3057\u3066\u4fdd\u5b58\u3057\u3066\u304f\u3060\u3055\u3044\u3002</p>
        </div>
        <img src="${dataUrl}" alt="\u98df\u54c1\u8868\u793a\u30e9\u30d9\u30eb">
      </body>
    </html>`);
  win.document.close();
  return true;
}

function downloadCanvasImage(canvas) {
  const dataUrl = canvas.toDataURL("image/png");
  const opened = openImageSaveWindow(dataUrl);
  showImageSavePanel(dataUrl);
  showStatus(opened ? "\u753b\u50cf\u4fdd\u5b58\u753b\u9762\u3092\u958b\u304d\u307e\u3057\u305f" : "\u753b\u50cf\u4fdd\u5b58\u753b\u9762\u3092\u8868\u793a\u3057\u307e\u3057\u305f");
}

// ③ 高解像度ラベルCanvas構築（copyとsaveで共用）
async function buildLabelCanvas(p, d, scale) {
  scale = scale || 8;
  const pxPerMm = 4;
  const margin = Math.max(8, Number(printCfg.margin || 3) * pxPerMm);
  const contentW = Math.max(260, Number(printCfg.w || 90) * pxPerMm);
  const fs = Math.max(12, Number(printCfg.fs || 7.5) * 1.8);
  const FONT = '"Meiryo","Yu Gothic","MS Gothic",sans-serif';
  const roughRows = imageCopyRows(p, d).length + (printTarget !== "label" ? 8 : 0);
  const canvas = document.createElement("canvas");
  canvas.width  = Math.ceil((contentW + margin * 2) * scale);
  canvas.height = Math.ceil((Math.max(180, roughRows * 42 + margin * 2 + 80)) * scale);
  await document.fonts.ready;
  const ctx = canvas.getContext("2d", { alpha: false });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.scale(scale, scale);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
  let y = margin;
  if (printTarget !== "nutrition") {
    y = drawTableImage(ctx, margin, y, contentW, "", imageCopyRows(p, d), fs, FONT);
    const jan = normalizedJan(p.janCode);
    if (canUseJanCode() && jan) {
      y += 10;
      y += drawBarcodeOnCanvas(ctx, jan, margin, y, contentW, fs) + 8;
    }
    if (d.contamination) {
      ctx.font = `${Math.max(10, fs * 0.82)}px ${FONT}`;
      const note = `※${d.contamination}`;
      const lines = wrapCanvasText(ctx, note, contentW);
      drawTextLines(ctx, lines, margin, y + fs, fs * 1.25);
      y += lines.length * fs * 1.25 + 12;
    }
  }
  if (printTarget !== "label") {
    if (printTarget === "both") y += 22;
    y = drawNutritionImage(ctx, margin, y, contentW, d, fs, FONT);
  }
  const finalH = Math.ceil((y + margin) * scale);
  const trimmed = document.createElement("canvas");
  trimmed.width = canvas.width;
  trimmed.height = finalH;
  const trimCtx = trimmed.getContext("2d", { alpha: false });
  trimCtx.imageSmoothingEnabled = true;
  trimCtx.imageSmoothingQuality = "high";
  trimCtx.fillStyle = "#fff";
  trimCtx.fillRect(0, 0, trimmed.width, trimmed.height);
  trimCtx.drawImage(canvas, 0, 0);
  return trimmed;
}

// ② 画像コピー（Chrome: Promise<Blob>をClipboardItemに渡してジェスチャ制約を回避）
async function copyImageLabels() {
  showStatus("画像をコピー中です...");
  const p = currentProduct();
  const d = derive(p);
  if (navigator.clipboard?.write && window.ClipboardItem) {
    const blobPromise = buildLabelCanvas(p, d).then(c => canvasToPngBlob(c));
    try {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blobPromise })]);
      showStatus("画像としてコピーしました ✓");
    } catch (e) {
      console.warn("clipboard.write failed:", e);
      try { downloadCanvasImage(await buildLabelCanvas(p, d)); } catch {}
      showStatus("コピー失敗 → 画像をダウンロードします（ブラウザのクリップボード権限を確認してください）");
    }
    return;
  }
  try {
    downloadCanvasImage(await buildLabelCanvas(p, d));
  } catch {
    showStatus("画像コピーに失敗しました");
  }
}

function copyLabels() {
  const p = currentProduct();
  const d = derive(p);
  const parts = [];
  if (printTarget !== "nutrition") {
    const maker = [p.manufacturerName, p.manufacturerPostal ? `〒${p.manufacturerPostal}` : "", p.manufacturerAddress, p.manufacturerPhone].filter(Boolean).join(" ");
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
  if (printTarget !== "label") {
    const n = d.nutrition;
    parts.push(`栄養成分表示（100g当たり）\nエネルギー：${n.kcal}kcal\nたんぱく質：${n.protein}g\n脂質：${n.fat}g\n炭水化物：${n.carbs}g\n食塩相当量：${n.salt}g`);
  }
  copyPlainText(parts.join("\n\n"));
}

function copyPlainText(text) {
  const success = () => showStatus("\u6587\u5b57\u3060\u3051\u30b3\u30d4\u30fc\u3067\u304d\u307e\u3057\u305f");
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(success).catch(() => showStatus("\u30b3\u30d4\u30fc\u306b\u5931\u6557\u3057\u307e\u3057\u305f"));
    return;
  }
  showStatus("\u30b3\u30d4\u30fc\u306b\u5931\u6557\u3057\u307e\u3057\u305f");
}

