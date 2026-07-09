function isDraftUnsaved() {
  return editId === "new" && draft && (draft.name?.trim() || draft.ingredients?.some(i => i.name?.trim()));
}

// ── ⑨ イベントデリゲーション（起動時1回のみ登録） ───────────────────────
function setupDelegation() {
  let masterSearchTimer, savedSearchTimer;

  // ── クリック ──
  document.addEventListener("click", e => {
    const t = e.target;

    // [data-action]
    const ael = t.closest("[data-action]");
    if (ael) {
      const act = ael.dataset.action;
      switch (act) {
        case "new": if (!canCreateMore()) { showModal({ message: `${planInfo().label}プランは${planInfo().note}です。プランを変更してください。` }); return; } assistMessage = ""; draft = emptyProduct(); editId = "new"; view = "edit"; render(); return;
        case "menu": { if(isDraftUnsaved()){showModal({message:"保存されていません。このまま移動しますか？",confirmLabel:"移動する",cancelLabel:"キャンセル",onConfirm:()=>{view="menu";editId=null;draft=null;render();}});return;} view="menu";editId=null;draft=null;render();return; }
        case "plan-page": view = "home"; editId = null; draft = null; render(); return;
        case "saved": { if(isDraftUnsaved()){showModal({message:"保存されていません。このまま移動しますか？",confirmLabel:"移動する",cancelLabel:"キャンセル",onConfirm:()=>{view="saved";editId=null;draft=null;render();}});return;} view="saved";render();return; }
        case "home": { if(isDraftUnsaved()){showModal({message:"保存されていません。このまま移動しますか？",confirmLabel:"移動する",cancelLabel:"キャンセル",onConfirm:()=>{view="menu";editId=null;draft=null;assistMessage="";render();}});return;} view="menu";editId=null;draft=null;assistMessage="";render();return; }
        case "save": saveCurrent(); return;
        case "save-master": saveMaster(); return;
        case "back-to-saas": saasView = productDetailId ? "product-detail" : "products"; view = "saas"; render(); return;
        case "toggle-sidebar": sidebarOpen = !sidebarOpen; render(); return;
        case "close-sidebar": sidebarOpen = false; render(); return;
        case "confirm-print": printPreviewOpen = false; render(); setTimeout(printLabels, 50); return;
        case "open-print-preview": printPreviewOpen = true; render(); return;
        case "close-print-preview": printPreviewOpen = false; render(); return;
        case "add-ing": { const p = currentProduct(); p.ingredients.push({ id: uid(), name: "", weight: "" }); render(); return; }
        case "toggle-bulk-paste": { ingBulkPasteOpen = !ingBulkPasteOpen; render(); return; }
        case "confirm-bulk-paste": {
          const ta = document.getElementById("bulk-paste-textarea");
          if (!ta?.value.trim()) { ingBulkPasteOpen = false; render(); return; }
          const p = currentProduct(); if (!p) return;
          const newIngs = ta.value.split(/\n/).map(s => s.trim()).filter(Boolean).flatMap(line => {
            const m = line.match(/^(.+?)\s+(\d+(?:\.\d+)?)\s*g?$/i);
            const name = (m ? m[1] : line).replace(/[\/／]/g, "").trim();
            if (!name) return [];
            return [{ id: uid(), name, weight: m ? m[2] : "" }];
          });
          if (!newIngs.length) { ingBulkPasteOpen = false; render(); return; }
          if (p.ingredients.length === 1 && !p.ingredients[0].name) p.ingredients = newIngs;
          else p.ingredients = [...p.ingredients, ...newIngs];
          ingBulkPasteOpen = false; render(); return;
        }
        case "run-ai-label-check": { runAiLabelCheck(); return; }
        case "sort-additives": { const p = currentProduct(); const n = p.ingredients.filter(i => !isAdditive(i.name)); const a = p.ingredients.filter(i => isAdditive(i.name)); p.ingredients = [...n,...a]; render(); return; }
        case "sort-by-weight": { const p = currentProduct(); p.ingredients = [...p.ingredients].sort((a,b) => (parseFloat(b.weight)||0)-(parseFloat(a.weight)||0)); render(); return; }
        case "normalize-label": { const p = currentProduct(); const { next, changes } = normalizeLabelText(p); assistMessage = changes.length ? `整えました：${changes.slice(0,4).join("、")}${changes.length>4?" ほか":""}` : "すでに食品表示向けに整っています。"; if (editId==="new") draft=next; else products=products.map(x=>x.id===p.id?next:x); render(); return; }
        case "show-tutorial": showTutorial=true; tutorialStep=0; safeSet("food-label-tutorial-done",""); render(); return;
        case "open-ai-panel": showAiPanel=true; render(); return;
        case "close-ai-panel": showAiPanel=false; render(); return;
        case "copy-ai-prompt": { const ta=document.getElementById("ai-prompt-text"); if(ta) navigator.clipboard?.writeText(ta.value).then(()=>showStatus("プロンプトをコピーしました")).catch(()=>{ta.select();document.execCommand("copy");showStatus("コピーしました");}); return; }
        case "download-image": downloadImageLabel(); return;
        case "batch-print": batchPrint(); return;
        case "export-csv": exportCsv(); return;
        case "export-json": exportJson(); return;
        case "save-mfr-tpl": { const nameEl=document.getElementById("mfr-tpl-name"); const label=nameEl?.value?.trim(); if(!label){showStatus("テンプレート名を入力してください");return;} const p=currentProduct(); mfrTemplates=[...mfrTemplates.filter(t=>t.label!==label),{label,name:p.manufacturerName,postal:p.manufacturerPostal,address:p.manufacturerAddress,phone:p.manufacturerPhone}]; safeSet("food-label-mfr-templates",JSON.stringify(mfrTemplates)); showStatus(`「${label}」を保存しました`); return; }
        case "del-mfr-tpl": { const sel=document.querySelector("[data-mfr-tpl-select]"); const idx=Number(sel?.value); if(isNaN(idx)||!mfrTemplates[idx])return; mfrTemplates.splice(idx,1); safeSet("food-label-mfr-templates",JSON.stringify(mfrTemplates)); render(); return; }
        case "print-spec": doPrintSpec(); return;
        case "copy-spec": { const area=document.getElementById("spec-print-area"); if(!area)return; const text=[...area.querySelectorAll("tr")].map(tr=>{const th=tr.querySelector("th")?.textContent?.trim()||"";const td=tr.querySelector("td")?.textContent?.trim()||"";return th&&td?`${th}：${td}`:""}).filter(Boolean).join("\n"); copyPlainText(text); return; }
        case "generate-ai-desc": case "regen-ai-desc": { const pid=aiDescId||(products.find(x=>x.name?.trim())?.id); const p=pid?products.find(x=>x.id===pid):null; if(!p)return; aiEditText=generateAiDesc(p,aiDescChannel); render(); return; }
        case "copy-ai-desc": { const ta=document.getElementById("ai-desc-prompt"); if(ta) copyPlainText(ta.value); return; }
        case "copy-ai-result": { const ta=document.getElementById("ai-result-text"); if(ta){ta.select();copyPlainText(ta.value);showStatus("コピーしました");} return; }
        case "save-ai-result": { const ta=document.getElementById("ai-result-text"); if(!ta)return; const pid=aiDescId||(products.find(x=>x.name?.trim())?.id); if(!pid)return; aiEditText=ta.value; saveAiText(pid,aiDescChannel,ta.value); showStatus("保存しました"); render(); return; }
        case "remove-product-image": { const p=products.find(x=>x.id===productDetailId); if(!p)return; p.imageDataUrl=""; saveProducts(); render(); return; }
        case "add-cost-item": { const p=products.find(x=>x.id===productDetailId); if(!p)return; saveCostItems(); p.costItems=[...(p.costItems||[]),{id:uid(),name:"",amount:"",unit:"g",unitPrice:""}]; saveProducts(); render(); return; }
        case "add-additive-kw": { const inp=document.getElementById("additive-kw-input"); if(!inp)return; const kws=inp.value.split(/[、,，\s]+/).map(s=>s.trim()).filter(Boolean); if(!kws.length)return; userAdditiveKw=[...new Set([...userAdditiveKw,...kws])]; safeSet("food-label-additive-kw",JSON.stringify(userAdditiveKw)); render(); return; }
        case "save-supabase-cfg": { const url=document.getElementById("sb-url-input")?.value?.trim(); const key=document.getElementById("sb-key-input")?.value?.trim(); if(!url||!key){showStatus("URLとAPIキーを両方入力してください");return;} if(!url.startsWith("https://")){showStatus("URLはhttps://で始まる必要があります");return;} safeSet("fmcc-supabase-url",url); safeSet("fmcc-supabase-key",key); showStatus("Supabase設定を保存しました"); render(); return; }
        case "supabase-push": supabasePush(); return;
        case "supabase-pull": supabasePull(); return;
        case "save-openai-key": { const inp=document.getElementById("openai-key-input"); if(!inp)return; const key=inp.value.trim(); if(!key){showStatus("APIキーを入力してください");return;} if(!key.startsWith("sk-")){showStatus("APIキーは sk- で始まる文字列です");return;} sessionStorage.setItem("fmcc-openai-key",key); showStatus("APIキーを保存しました（このセッション中のみ有効）"); render(); return; }
        case "clear-openai-key": sessionStorage.removeItem("fmcc-openai-key"); showStatus("APIキーを削除しました"); render(); return;
        case "copy-output": copyLabels(); return;
        case "copy-image-output": copyImageLabels(); return;
      }
      return;
    }

    // [data-plan]
    const planEl = t.closest("[data-plan]");
    if (planEl) { currentPlan=planEl.dataset.plan; safeSet("food-label-plan",currentPlan); render(); return; }

    // [data-edit]
    const editEl = t.closest("[data-edit]");
    if (editEl) { editId=editEl.dataset.edit; view="edit"; assistMessage=""; render(); return; }

    // [data-print]
    const printEl = t.closest("[data-print]");
    if (printEl) { editId=printEl.dataset.print; view="edit"; render(); return; }

    // [data-dup]
    const dupEl = t.closest("[data-dup]");
    if (dupEl) { if(!canCreateMore()){showModal({message:`${planInfo().label}プランは${planInfo().note}です。プランを変更してください。`});return;} const src=products.find(p=>p.id===dupEl.dataset.dup); if(!src)return; products=[{...structuredClone(src),id:uid(),name:`${src.name}（複製）`,updatedAt:new Date().toLocaleDateString("ja-JP"),ingredients:src.ingredients.map(i=>({...i,id:uid()}))},...products]; saveProducts(); render(); return; }

    // [data-del]
    const delEl = t.closest("[data-del]");
    if (delEl) { const p=products.find(x=>x.id===delEl.dataset.del); if(!p)return; showModal({message:`「${p.name||"この商品"}」を削除しますか？\nこの操作は取り消せません。`,confirmLabel:"削除する",cancelLabel:"キャンセル",onConfirm:()=>{products=products.filter(x=>x.id!==p.id);safeDel(`food-label-history-${p.id}`);saveProducts();render();}}); return; }

    // [data-volume-unit]
    const volUnitEl = t.closest("[data-volume-unit]");
    if (volUnitEl) { const p=currentProduct(); const {amount}=splitVolume(p.volume); p.volumeCustomUnit=volUnitEl.dataset.volumeUnit==="その他"; p.volume=buildVolume(amount,volUnitEl.dataset.volumeUnit==="その他"?"":volUnitEl.dataset.volumeUnit); render(); return; }

    // [data-date-preset]
    const dpEl = t.closest("[data-date-preset]");
    if (dpEl) { const preset=DATE_PRESETS.find(([id])=>id===dpEl.dataset.datePreset); if(!preset)return; currentProduct().bestBefore=presetDateValue(preset[2]); render(); return; }

    // [data-bb-mode]
    const bbModeEl = t.closest("[data-bb-mode]");
    if (bbModeEl) { const p=currentProduct(); const mode=bbModeEl.dataset.bbMode; if(mode==="date") p.bestBefore=""; else if(mode==="days") p.bestBefore="製造日より1日"; else if(mode==="months") p.bestBefore="製造日より1ヶ月"; else p.bestBefore=""; render(); return; }

    // [data-storage]
    const storageEl = t.closest("[data-storage]");
    if (storageEl) { const s=storageEl.dataset.storage; updateCurrent("storage",s); if(s!=="自由入力"){recentStorage=[s,...recentStorage.filter(x=>x!==s)].slice(0,3);safeSet("food-label-recent-storage",JSON.stringify(recentStorage));} return; }

    // [data-mfr]
    const mfrEl = t.closest("[data-mfr]");
    if (mfrEl) { const p=currentProduct(); const cur=selectedMfrTypes(p); const type=mfrEl.dataset.mfr; const next=cur.includes(type)?cur.filter(x=>x!==type):[...cur,type]; p.manufacturerTypes=next.length?next:[type]; p.manufacturerType=p.manufacturerTypes[0]; render(); return; }

    // [data-nutr-mode]
    const nutrModeEl = t.closest("[data-nutr-mode]");
    if (nutrModeEl) { const p=currentProduct(); if(nutrModeEl.dataset.nutrMode==="manual") p.nutritionManual={...derive(p).autoNutrition}; p.nutritionMode=nutrModeEl.dataset.nutrMode; render(); return; }

    // .nutr-unit-btn
    const nutrUnitEl = t.closest(".nutr-unit-btn[data-value]");
    if (nutrUnitEl) { currentProduct().nutritionUnit=nutrUnitEl.dataset.value; render(); return; }

    // [data-alg-mode]
    const algModeEl = t.closest("[data-alg-mode]");
    if (algModeEl) { const p=currentProduct(); if(algModeEl.dataset.algMode==="manual") p.allergensManual=derive(p).autoAllergens.join("、"); p.allergensMode=algModeEl.dataset.algMode; render(); return; }

    // [data-contamination]
    const contEl = t.closest("[data-contamination]");
    if (contEl) { const p=currentProduct(); p.contaminationEnabled=contEl.dataset.contamination==="on"; if(p.contaminationEnabled&&!p.contaminationAllergens&&!p.contaminationText){p.contaminationAllergens=derive(p).allergens.join("、");p.contaminationText=buildContaminationText(p);} render(); return; }

    // [data-tutorial]
    const tutEl = t.closest("[data-tutorial]");
    if (tutEl) { const act=tutEl.dataset.tutorial; if(act==="next"&&tutorialStep<TUTORIAL_STEPS.length-1){tutorialStep++;render();}else if(act==="prev"&&tutorialStep>0){tutorialStep--;render();}else if(act==="done"||act==="skip"){showTutorial=false;safeSet("food-label-tutorial-done","1");render();} return; }

    // [data-ai-example]
    const aiExEl = t.closest("[data-ai-example]");
    if (aiExEl) { const ta=document.getElementById("ai-prompt-text"); if(ta) ta.value=ta.value+"\n\n【質問】\n"+aiExEl.dataset.aiExample; return; }

    // .check-jumpable
    const jumpEl = t.closest(".check-jumpable[data-jump-label]");
    if (jumpEl) { handleChecklistJump(jumpEl.dataset.jumpLabel); return; }

    // [data-saved-sort]
    const savedSortEl = t.closest("[data-saved-sort]");
    if (savedSortEl) { savedSort=savedSortEl.dataset.savedSort; render(); return; }

    // [data-saved-filter]
    const savedFilterEl = t.closest("[data-saved-filter]");
    if (savedFilterEl) { savedFilter=savedFilterEl.dataset.savedFilter; render(); return; }

    // [data-zoom]
    const zoomEl = t.closest("[data-zoom]");
    if (zoomEl) { previewZoom=zoomEl.dataset.zoom==="実寸"?"実寸":Number(zoomEl.dataset.zoom); render(); return; }

    // [data-mobile-tab]
    const mobileTabEl = t.closest("[data-mobile-tab]");
    if (mobileTabEl) { mobilePreviewTab = mobileTabEl.dataset.mobileTab; render(); return; }

    // [data-toggle-section]
    const sectionEl = t.closest("[data-toggle-section]");
    if (sectionEl) { const title=sectionEl.dataset.toggleSection; if(openSections.has(title))openSections.delete(title);else openSections.add(title); render(); return; }

    // [data-target-choice]
    const tcEl = t.closest("[data-target-choice]");
    if (tcEl) { printTarget=tcEl.dataset.targetChoice; render(); return; }

    // [data-restore-history]
    const rhEl = t.closest("[data-restore-history]");
    if (rhEl) { const hist=loadHistory(rhEl.dataset.historyPid); const idx=Number(rhEl.dataset.restoreHistory); if(!hist[idx])return; showModal({message:`${hist[idx].savedAt} の状態に戻しますか？`,confirmLabel:"復元",cancelLabel:"キャンセル",onConfirm:()=>{const r={...hist[idx].snapshot};products=products.map(x=>x.id===r.id?r:x);saveProducts();render();showStatus("復元しました");}}); return; }

    // [data-nav]
    const navEl = t.closest("[data-nav]");
    if (navEl) {
      const nav=navEl.dataset.nav; sidebarOpen=false;
      if(nav==="label-nav"){if(products.length>0){editId=products[0].id;view="edit";saasView="label-nav";}else{view="edit";editId="new";draft=extendProductMaster(emptyProduct());saasView="label-nav";}}
      else if(nav==="spec-sheet-nav"){saasView="spec-sheet-nav";view="saas";if(!specSheetId&&products.length>0)specSheetId=products[0].id;}
      else if(nav==="ai-descriptions-nav"){saasView="ai-descriptions-nav";view="saas";if(!aiDescId&&products.length>0)aiDescId=products[0].id;}
      else if(nav==="settings-nav"){saasView="settings-nav";view="saas";}
      else{saasView=nav;view="saas";}
      safeSet("fmcc-view",saasView); render(); return;
    }

    // [data-quick-new]
    if (t.closest("[data-quick-new]")) { if(!canCreateMore()){showModal({message:`${planInfo().label}プランは${planInfo().note}です。`});return;} draft=extendProductMaster(emptyProduct());editId="new";view="edit";sidebarOpen=false;render(); return; }

    // [data-nav-product-detail]
    const navPdEl = t.closest("[data-nav-product-detail]");
    if (navPdEl) { productDetailId=navPdEl.dataset.navProductDetail;saasView="product-detail";view="saas";safeSet("fmcc-view",saasView);render(); return; }

    // [data-label-from]
    const lfEl = t.closest("[data-label-from]");
    if (lfEl) { const pid=lfEl.dataset.labelFrom; const p=products.find(x=>x.id===pid); if(!p)return; editId=pid;view="edit";sidebarOpen=false;render(); return; }

    // [data-spec-from]
    const sfEl = t.closest("[data-spec-from]");
    if (sfEl) { specSheetId=sfEl.dataset.specFrom;saasView="spec-sheet-nav";view="saas";sidebarOpen=false;safeSet("fmcc-view",saasView);render(); return; }

    // [data-ai-from]
    const afEl = t.closest("[data-ai-from]");
    if (afEl) { aiDescId=afEl.dataset.aiFrom;saasView="ai-descriptions-nav";view="saas";sidebarOpen=false;safeSet("fmcc-view",saasView);render(); return; }

    // [data-detail-tab]
    const dtEl = t.closest("[data-detail-tab]");
    if (dtEl) { productDetailTab=dtEl.dataset.detailTab; render(); return; }

    // [data-master-filter]
    const mfEl = t.closest("[data-master-filter]");
    if (mfEl) { masterFilter=mfEl.dataset.masterFilter; render(); return; }

    // [data-toggle-star]
    const starEl = t.closest("[data-toggle-star]");
    if (starEl) { const p=products.find(x=>x.id===starEl.dataset.toggleStar); if(p){p.starred=!p.starred;saveProducts();render();} return; }

    // [data-todo-key]
    if (t.closest("[data-todo-key]")) { saasView="products";view="saas";safeSet("fmcc-view",saasView);render(); return; }

    // [data-ai-ch]
    const aiChEl = t.closest("[data-ai-ch]");
    if (aiChEl) { aiDescChannel=aiChEl.dataset.aiCh;aiEditText="";render(); return; }

    // [data-set-cost-mode]
    const costModeEl = t.closest("[data-set-cost-mode]");
    if (costModeEl) { const p=products.find(x=>x.id===productDetailId); if(!p)return; saveMaster();p.costMode=costModeEl.dataset.setCostMode;saveProducts();render(); return; }

    // [data-remove-cost]
    const removeCostEl = t.closest("[data-remove-cost]");
    if (removeCostEl) { const p=products.find(x=>x.id===productDetailId); if(!p)return; saveCostItems(); const i=parseInt(removeCostEl.dataset.removeCost); p.costItems.splice(i,1);saveProducts();render(); return; }

    // [data-del-additive-kw]
    const delKwEl = t.closest("[data-del-additive-kw]");
    if (delKwEl) { const i=parseInt(delKwEl.dataset.delAdditiveKw); userAdditiveKw=userAdditiveKw.filter((_,idx)=>idx!==i); safeSet("food-label-additive-kw",JSON.stringify(userAdditiveKw));render(); return; }

    // [data-remove-ing]
    const remIngEl = t.closest("[data-remove-ing]");
    if (remIngEl) { const p=currentProduct(); p.ingredients.splice(Number(remIngEl.dataset.removeIng),1); if(!p.ingredients.length) p.ingredients.push({id:uid(),name:"",weight:""}); render(); return; }
  });

  // ── input ──
  document.addEventListener("input", e => {
    const t = e.target;
    if (t.matches("[data-field]"))           { const p=currentProduct(); p[t.dataset.field]=t.value; scheduleAutoSave(); return; }
    if (t.matches("[data-volume-amount]"))   { const p=currentProduct(); const {unit}=splitVolume(p.volume); p.volume=buildVolume(t.value,p.volumeCustomUnit?unit:(unit||"個")); return; }
    if (t.matches("[data-volume-custom-unit]")) { const p=currentProduct(); const {amount}=splitVolume(p.volume); p.volumeCustomUnit=true; p.volume=buildVolume(amount,t.value); return; }
    if (t.matches("[data-ing-name]"))        { const p=currentProduct(); if(!p)return; const ing=p.ingredients[Number(t.dataset.ingName)]; if(!ing)return; ing.name=t.value.replace(/[\/／]/g,""); return; }
    if (t.matches("[data-ing-weight]"))      { const p=currentProduct(); if(!p)return; const ing=p.ingredients[Number(t.dataset.ingWeight)]; if(!ing)return; ing.weight=t.value; return; }
    if (t.matches("[data-nutr]"))            { const p=currentProduct(); p.nutritionManual={...p.nutritionManual,[t.dataset.nutr]:t.value}; return; }
    if (t.matches("[data-bb-days]"))         { const v=parseInt(t.value)||1; currentProduct().bestBefore=`製造日より${v}日`; const prev=document.querySelector(".bb-preview strong"); if(prev) prev.textContent=`製造日より${v}日`; return; }
    if (t.matches("[data-bb-months]"))       { const v=parseInt(t.value)||1; currentProduct().bestBefore=`製造日より${v}ヶ月`; const prev=document.querySelector(".bb-preview strong"); if(prev) prev.textContent=`製造日より${v}ヶ月`; return; }
    if (t.matches("[data-print-offset]"))    { if(t.dataset.printOffset==="x"){printOffsetX=t.value;safeSet("food-label-offset-x",t.value);}else{printOffsetY=t.value;safeSet("food-label-offset-y",t.value);} return; }
    if (t.matches("[data-print-cfg]"))       { printCfg={...printCfg,label:"自由入力",[t.dataset.printCfg]:t.value}; safeSet("food-label-print-cfg",JSON.stringify(printCfg)); scheduleRender(); return; }
    if (t.matches("[data-master-search]"))   { clearTimeout(masterSearchTimer); masterSearchTimer=setTimeout(()=>{masterSearch=t.value;render();},200); return; }
    if (t.matches("[data-saved-search]"))    { clearTimeout(savedSearchTimer); savedSearchTimer=setTimeout(()=>{savedSearch=t.value;render();},200); return; }
    if (t.matches("[data-master-field]"))    { const f=t.dataset.masterField; if(["directCost","price","directPackaging","directShipping","directOther"].includes(f)) refreshCostKpis(); scheduleAutoSaveMaster(); return; }
  });

  // ── change ──
  document.addEventListener("change", e => {
    const t = e.target;
    if (t.matches("[data-field]"))             { const p=currentProduct(); p[t.dataset.field]=t.value; scheduleRender(); return; }
    if (t.matches("[data-volume-amount]"))     { const p=currentProduct(); const {unit}=splitVolume(p.volume); p.volume=buildVolume(t.value,p.volumeCustomUnit?unit:(unit||"個")); scheduleRender(); return; }
    if (t.matches("[data-volume-custom-unit]")){ const p=currentProduct(); const {amount}=splitVolume(p.volume); p.volumeCustomUnit=true; p.volume=buildVolume(amount,t.value); render(); return; }
    if (t.matches("[data-ing-name]"))          { const p=currentProduct(); if(!p)return; const v=t.value.replace(/[\/／]/g,""); t.value=v; const ing=p.ingredients[Number(t.dataset.ingName)]; if(!ing)return; ing.name=v; scheduleRender(); return; }
    if (t.matches("[data-ing-weight]"))        { const p=currentProduct(); if(!p)return; const ing=p.ingredients[Number(t.dataset.ingWeight)]; if(!ing)return; ing.weight=t.value; scheduleRender(); return; }
    if (t.matches("[data-nutr]"))              { const p=currentProduct(); p.nutritionManual={...p.nutritionManual,[t.dataset.nutr]:t.value}; scheduleRender(); return; }
    if (t.matches("[data-date-input]"))        { currentProduct().bestBefore=dateInputToLabel(t.value); render(); return; }
    if (t.matches("[data-bb-days]"))           { render(); return; }
    if (t.matches("[data-bb-months]"))         { render(); return; }
    if (t.matches("[data-spec-select]"))       { specSheetId=t.value; render(); return; }
    if (t.matches("[data-ai-product-select]")) { aiDescId=t.value; aiEditText=""; render(); return; }
    if (t.matches("[data-sel-print]"))         { t.checked?selectedForPrint.add(t.dataset.selPrint):selectedForPrint.delete(t.dataset.selPrint); render(); return; }
    if (t.matches("[data-csv-import]"))        { if(t.files[0]) importCsvFile(t.files[0]); return; }
    if (t.matches("[data-json-import]"))       { if(!t.files[0]) return; const f=t.files[0]; showModal({message:`JSONをインポートします。\n\n既存データとの結合方法を選んでください。`,confirmLabel:"マージ追加",cancelLabel:"全て置き換え",onConfirm:()=>importJsonFile(f,"merge"),onCancel:()=>importJsonFile(f,"replace")}); return; }
    if (t.matches("[data-mfr-tpl-select]"))   { const idx=Number(t.value); if(isNaN(idx)||!mfrTemplates[idx])return; const tpl=mfrTemplates[idx]; const p=currentProduct(); Object.assign(p,{manufacturerName:tpl.name,manufacturerPostal:tpl.postal,manufacturerAddress:tpl.address,manufacturerPhone:tpl.phone}); render(); return; }
    if (t.matches("[data-print-cfg]"))         { printCfg={...printCfg,label:"自由入力",[t.dataset.printCfg]:t.value}; safeSet("food-label-print-cfg",JSON.stringify(printCfg)); scheduleRender(); return; }
    if (t.matches("[data-size]"))              { printCfg={...(SIZE_PRESETS.find(s=>s.label===t.value)||SIZE_PRESETS[1])}; safeSet("food-label-print-cfg",JSON.stringify(printCfg)); render(); return; }
    if (t.id==="spec-show-cost")               { specShowCost=t.checked; render(); return; }
    if (t.id==="spec-show-sig")                { specShowSig=t.checked; render(); return; }
    if (t.matches("[data-cost-name],[data-cost-amount],[data-cost-unit],[data-cost-price],[data-cost-punit],[data-cost-loss]")) { saveCostItems(); render(); return; }
    if (t.matches("[data-master-field],[data-sales-ch]")) { scheduleAutoSaveMaster(); return; }
  });
}

// ── bindDynamic: render()毎に呼ばれる最小限バインド ─────────────────────
function bindDynamic() {
  // AI結果テキスト追跡（element参照が毎回変わるため委譲不可）
  const aiResultTa = document.getElementById("ai-result-text");
  if (aiResultTa) aiResultTa.addEventListener("input", () => { aiEditText = aiResultTa.value; });

  // 商品画像アップロード
  const imgInput = document.getElementById("product-image-input");
  if (imgInput) {
    imgInput.addEventListener("change", () => handleImageFile(imgInput.files[0]));
    const dropZone = document.getElementById("image-drop-zone");
    if (dropZone) {
      dropZone.addEventListener("click", () => imgInput.click());
      dropZone.addEventListener("dragover", e => { e.preventDefault(); dropZone.classList.add("drag-over"); });
      dropZone.addEventListener("dragleave", () => dropZone.classList.remove("drag-over"));
      dropZone.addEventListener("drop", e => { e.preventDefault(); dropZone.classList.remove("drag-over"); handleImageFile(e.dataTransfer.files[0]); });
    }
  }

  // 原材料ドラッグ並び替え（dragstart にelement特有の情報が必要）
  document.querySelectorAll(".ing-row[data-ing-idx]").forEach(el => {
    el.addEventListener("dragstart", e => { dragSrcIdx=Number(el.dataset.ingIdx); el.classList.add("dragging"); e.dataTransfer.effectAllowed="move"; });
    el.addEventListener("dragend", () => { el.classList.remove("dragging"); document.querySelectorAll(".ing-row").forEach(r=>r.classList.remove("drag-over")); });
    el.addEventListener("dragover", e => { e.preventDefault(); el.classList.add("drag-over"); });
    el.addEventListener("dragleave", () => el.classList.remove("drag-over"));
    el.addEventListener("drop", e => { e.preventDefault(); const p=currentProduct(); const dest=Number(el.dataset.ingIdx); if(dragSrcIdx!==null&&dragSrcIdx!==dest){const arr=[...p.ingredients];const [moved]=arr.splice(dragSrcIdx,1);arr.splice(dest,0,moved);p.ingredients=arr;dragSrcIdx=null;render();} });
  });

  // AI相談（IDベースのDOM要素）
  const consultSel = document.getElementById("consult-product-sel");
  if (consultSel) consultSel.addEventListener("change", () => { aiConsultProductId=consultSel.value; aiConsultInput=""; render(); });
  document.getElementById("consult-clear")?.addEventListener("click", () => { if(!aiConsultProductId)return; saveConsultHistory(aiConsultProductId,[]); render(); });
  document.getElementById("consult-input")?.addEventListener("input", e => { aiConsultInput=e.target.value; });
  document.getElementById("consult-send")?.addEventListener("click", () => sendConsultMessage(null));
  document.getElementById("consult-input")?.addEventListener("keydown", e => { if((e.ctrlKey||e.metaKey)&&e.key==="Enter") sendConsultMessage(null); });
  document.querySelectorAll(".consult-tpl-btn").forEach(btn => {
    btn.addEventListener("click", () => { const q=btn.dataset.consultQ; const key=btn.dataset.consultKey; document.getElementById("consult-input").value=q; aiConsultInput=q; sendConsultMessage(key); });
  });

  // 商品登録メニュー（stopPropagation が必要なため委譲不可）
  document.querySelector("[data-reg-toggle]")?.addEventListener("click", e => {
    e.stopPropagation();
    if (!canCreateMore()) { showModal({ message: `${planInfo().label}プランは${planInfo().note}です。` }); return; }
    registerMenuOpen = !registerMenuOpen; render();
  });
  document.querySelectorAll("[data-reg-mode]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const mode=btn.dataset.regMode; registerMenuOpen=false; aiRegAnalysisStep=-1;
      if (mode==="manual") { draft=extendProductMaster(emptyProduct()); editId="new"; view="edit"; sidebarOpen=false; render(); return; }
      if (mode==="ai-chat") { aiRegChatMessages=[{role:"ai",content:AI_CHAT_FLOW[0].q}]; aiRegChatInput=""; aiRegChatStep=0; aiRegChatDraft={}; saasView="reg-ai-chat"; }
      else { saasView=mode==="photo"?"reg-photo":"reg-spec"; }
      safeSet("fmcc-view",saasView); render();
    });
  });
  if (registerMenuOpen) {
    setTimeout(() => {
      document.addEventListener("click", function closeReg(e) {
        if (!e.target.closest(".reg-btn-wrap")) { registerMenuOpen=false; render(); document.removeEventListener("click",closeReg); }
      });
    }, 0);
  }

  // 写真/規格書ファイルアップロード
  ["photo","spec"].forEach(type => {
    const dropZone=document.getElementById(`${type}-drop-zone`);
    const fileInput=document.getElementById(`${type}-file-input`);
    const selectBtn=document.getElementById(`${type}-select-btn`);
    if (selectBtn) selectBtn.addEventListener("click", ()=>fileInput?.click());
    if (fileInput) fileInput.addEventListener("change", ()=>{ const f=fileInput.files[0]; if(f) processRegFile(type,f); });
    if (dropZone) {
      dropZone.addEventListener("dragover", e=>{e.preventDefault();dropZone.classList.add("drag-over");});
      dropZone.addEventListener("dragleave", ()=>dropZone.classList.remove("drag-over"));
      dropZone.addEventListener("drop", e=>{e.preventDefault();dropZone.classList.remove("drag-over");const f=e.dataTransfer.files[0];if(f)processRegFile(type,f);});
    }
  });
  document.querySelector("[data-reg-go-editor]")?.addEventListener("click", () => {
    aiRegAnalysisStep=-1; draft=extendProductMaster(emptyProduct());
    if (aiRegChatDraft&&Object.keys(aiRegChatDraft).length) { Object.assign(draft,aiRegChatDraft); draft.name=draft.name||"AI登録商品"; }
    else draft.name="AI解析済み商品（確認・修正してください）";
    editId="new"; view="edit"; sidebarOpen=false; render();
  });

  // AIチャット登録
  document.getElementById("ai-chat-input")?.addEventListener("input", e=>{aiRegChatInput=e.target.value;});
  document.getElementById("ai-chat-send")?.addEventListener("click", ()=>sendAiChatMessage());
  document.getElementById("ai-chat-input")?.addEventListener("keydown", e=>{if((e.ctrlKey||e.metaKey)&&e.key==="Enter")sendAiChatMessage();});
}