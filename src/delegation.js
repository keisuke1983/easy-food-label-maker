function isDraftUnsaved() {
  return editId === "new" && draft && (draft.name?.trim() || draft.ingredients?.some(i => i.name?.trim()));
}

// ── AIダッシュボードブリーフィング取得 ────────────────────────────────
function fetchAiBriefingNow(forceRefresh) {
  if (aiBriefingLoading && !forceRefresh) return;
  const todayIso = new Date().toISOString().split("T")[0];
  const soonIso  = new Date(Date.now() + 30*24*60*60*1000).toISOString().split("T")[0];
  const total     = products.length;
  if (!total) return;

  const derivedAll = products.map(p => ({ p, d: derive(p) }));
  const incomplete = derivedAll.filter(({ p, d }) => calcCompletion(p, d).pct < 100).length;
  const expired    = products.filter(p => p.expiryDate && p.expiryDate < todayIso).length;
  const expSoon    = products.filter(p => p.expiryDate && p.expiryDate >= todayIso && p.expiryDate <= soonIso).length;
  const noIng      = products.filter(p => !(p.ingredients||[]).some(i => i.name?.trim())).length;
  const noMfr      = products.filter(p => !p.manufacturerName?.trim()).length;
  const noCost     = products.filter(p => (p.costMode||"direct")==="direct" ? !parseFloat(p.directCost) : !(p.costItems||[]).length).length;
  const review     = products.filter(p => p.approvalStatus === "review").length;
  const avgComp    = Math.round(derivedAll.reduce((s, {p, d}) => s + calcCompletion(p, d).pct, 0) / total);
  const weekStart  = new Date(); weekStart.setDate(weekStart.getDate() - (weekStart.getDay()||7) + 1); weekStart.setHours(0,0,0,0);
  const thisWeekNew = products.filter(p => { try { const d = new Date(p.createdAt?.replace(/\//g,"-")); return d >= weekStart; } catch { return false; } }).length;

  const lines = [
    `商品総数: ${total}件（完成: ${total - incomplete}件 / 未完了: ${incomplete}件 / 平均完成度: ${avgComp}%）`,
    expired  ? `🚨 賞味期限切れ: ${expired}件` : null,
    expSoon  ? `⏰ 30日以内期限: ${expSoon}件` : null,
    noIng    ? `原材料未入力: ${noIng}件` : null,
    noMfr    ? `製造者未設定: ${noMfr}件` : null,
    noCost   ? `原価未設定: ${noCost}件` : null,
    review   ? `承認待ち: ${review}件` : null,
    `今週追加: ${thisWeekNew}件`,
  ].filter(Boolean);

  aiBriefingLoading = true;
  aiBriefingText = "";
  render();

  fetch("/api/ai-briefing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ summary: lines.join("\n") }),
  })
  .then(r => r.json())
  .then(json => {
    aiBriefingLoading = false;
    if (json.text) {
      aiBriefingText = json.text;
      try {
        sessionStorage.setItem("fp-ai-briefing", JSON.stringify({
          text: json.text,
          exp: Date.now() + 2 * 60 * 60 * 1000,
        }));
      } catch {}
    } else {
      aiBriefingText = "⚠️ " + (json.error || "取得できませんでした。再試行してください。");
    }
    render();
  })
  .catch(() => {
    aiBriefingLoading = false;
    aiBriefingText = "";
    render();
  });
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
        case "retry-photo-reg": aiRegError = ""; aiRegAnalysisStep = -1; render(); return;
        case "retry-spec-reg": aiRegError = ""; aiRegAnalysisStep = -1; render(); return;

        // AI棚スキャン
        case "shelf-scan-retry": shelfScanPhase = "upload"; shelfScanItems = []; shelfScanError = ""; render(); return;
        case "shelf-scan-save": {
          // 数量入力欄の最新値を取得
          document.querySelectorAll("[data-shelf-qty]").forEach(el => {
            const idx = Number(el.dataset.shelfQty);
            if (!isNaN(idx) && shelfScanItems[idx]) shelfScanItems[idx].quantity = Math.max(0, Number(el.value) || 0);
          });
          saveShelfScanResults();
          return;
        }
        case "shelf-scan-qty-plus": {
          const idx = Number(ael.dataset.idx);
          if (!isNaN(idx) && shelfScanItems[idx]) { shelfScanItems[idx].quantity++; render(); } return;
        }
        case "shelf-scan-qty-minus": {
          const idx = Number(ael.dataset.idx);
          if (!isNaN(idx) && shelfScanItems[idx]) { shelfScanItems[idx].quantity = Math.max(0, shelfScanItems[idx].quantity - 1); render(); } return;
        }

        // チーム・承認
        case "request-approval": {
          const pid = ael.dataset.pid;
          const p = products.find(x => x.id === pid); if (!p) return;
          const assignSelect = document.getElementById("approval-assign-select");
          const commentEl = document.getElementById("approval-req-comment");
          p.approvalStatus = "review";
          p.assignedTo = currentUserName;
          p.assignedTo = currentUserName;
          if (assignSelect?.value) p.assignedTo = assignSelect.value;
          p.approvalComment = commentEl?.value?.trim() || "";
          p.approverName = ""; p.approvalDate = "";
          p.updatedAt = new Date().toLocaleDateString("ja-JP");
          saveProducts(); showStatus(`「${p.name||"商品"}」の確認依頼を送りました`); render(); return;
        }
        case "approve-product": {
          const pid = ael.dataset.pid;
          const p = products.find(x => x.id === pid); if (!p) return;
          const commentEl = document.getElementById("approval-judge-comment");
          p.approvalStatus = "approved";
          p.approverName = currentUserName || "（不明）";
          p.approvalDate = new Date().toLocaleDateString("ja-JP");
          p.approvalComment = commentEl?.value?.trim() || "";
          p.updatedAt = new Date().toLocaleDateString("ja-JP");
          saveProducts(); showStatus(`「${p.name||"商品"}」を承認しました`); render(); return;
        }
        case "reject-product": {
          const pid = ael.dataset.pid;
          const p = products.find(x => x.id === pid); if (!p) return;
          const commentEl = document.getElementById("approval-judge-comment");
          p.approvalStatus = "rejected";
          p.approverName = currentUserName || "（不明）";
          p.approvalDate = new Date().toLocaleDateString("ja-JP");
          p.approvalComment = commentEl?.value?.trim() || "";
          p.updatedAt = new Date().toLocaleDateString("ja-JP");
          saveProducts(); showStatus(`「${p.name||"商品"}」を差し戻しました`); render(); return;
        }
        case "cancel-approval": {
          const pid = ael.dataset.pid;
          const p = products.find(x => x.id === pid); if (!p) return;
          p.approvalStatus = "none"; p.assignedTo = ""; p.approvalComment = ""; p.approverName = ""; p.approvalDate = "";
          saveProducts(); showStatus("確認依頼を取り消しました"); render(); return;
        }
        case "add-team-member": {
          const nameEl = document.getElementById("team-member-name-input");
          const roleEl = document.getElementById("team-member-role-select");
          const name = nameEl?.value?.trim(); const role = roleEl?.value || "editor";
          if (!name) { showStatus("名前を入力してください"); return; }
          if (teamMembers.some(m => m.name === name)) { showStatus("同じ名前のメンバーがいます"); return; }
          teamMembers = [...teamMembers, { name, role }];
          safeSet("fmcc-team-members", JSON.stringify(teamMembers));
          if (nameEl) nameEl.value = "";
          showStatus(`「${name}」を追加しました`); render(); return;
        }
        case "del-team-member": {
          const idx = Number(ael.dataset.midx);
          const m = teamMembers[idx]; if (!m) return;
          teamMembers = teamMembers.filter((_, i) => i !== idx);
          safeSet("fmcc-team-members", JSON.stringify(teamMembers));
          if (currentUserName === m.name) { currentUserName = ""; safeSet("fmcc-current-user", ""); }
          showStatus(`「${m.name}」を削除しました`); render(); return;
        }
        case "set-current-user": {
          const name = ael.dataset.uname || "";
          currentUserName = currentUserName === name ? "" : name;
          safeSet("fmcc-current-user", currentUserName);
          showStatus(currentUserName ? `「${currentUserName}」として使用中` : "ユーザー選択を解除しました"); render(); return;
        }
        case "toggle-sidebar": sidebarOpen = !sidebarOpen; render(); return;
        case "close-sidebar": sidebarOpen = false; render(); return;
        case "confirm-print": printPreviewOpen = false; render(); setTimeout(printLabels, 50); return;
        case "open-print-preview": printPreviewOpen = true; render(); return;
        case "close-print-preview": printPreviewOpen = false; render(); return;
        case "add-ing": { const p = currentProduct(); p.ingredients.push({ id: uid(), name: "", weight: "" }); render(); return; }
        case "add-master-ing": {
          const p = products.find(x=>x.id===productDetailId); if(!p)return;
          if (!Array.isArray(p.ingredients)) p.ingredients = [];
          p.ingredients.push({ id: uid(), name: "", weight: "" });
          render();
          requestAnimationFrame(() => {
            const inputs = document.querySelectorAll("[data-master-ing-name]");
            if (inputs.length) inputs[inputs.length-1].focus();
          });
          return;
        }
        case "sort-master-ing": {
          const p = products.find(x=>x.id===productDetailId); if(!p)return;
          const withW = p.ingredients.filter(i=>parseFloat(i.weight)>0).sort((a,b)=>parseFloat(b.weight)-parseFloat(a.weight));
          const noW   = p.ingredients.filter(i=>!(parseFloat(i.weight)>0));
          p.ingredients = [...withW, ...noW];
          saveProducts(); render(); return;
        }
        case "master-auto-fix": {
          const p = products.find(x=>x.id===productDetailId); if(!p)return;
          const { next, changes } = normalizeLabelText(p);
          if (!changes.length) { showStatus("整形できる項目がありませんでした"); return; }
          Object.assign(p, next);
          saveProducts();
          render();
          showStatus(`✨ ${changes.length}件を自動整形しました：${changes.slice(0,3).join("・")}${changes.length>3?"…":""}`);
          return;
        }
        case "suggest-storage": {
          const p = products.find(x=>x.id===productDetailId); if(!p)return;
          const suggestion = suggestStorage(p.ingredients);
          const el = document.querySelector("[data-master-field='storage']");
          if (el && suggestion) {
            el.value = suggestion;
            p.storage = suggestion;
            scheduleAutoSaveMaster();
            el.classList.add("field-highlight");
            setTimeout(() => el.classList.remove("field-highlight"), 2000);
            showStatus(`✦ 保存方法を提案しました`);
          }
          return;
        }
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
        case "generate-ai-desc": case "regen-ai-desc": {
          const pid = aiDescId || (products.find(x => x.name?.trim())?.id);
          const p = pid ? products.find(x => x.id === pid) : null;
          if (!p) return;
          aiDescLoading = true; aiEditText = ""; render();
          const d = derive(p);
          fetch("/api/ai-description", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              product: {
                name: p.name, category: p.category, volume: p.volume,
                price: p.price, ingLabel: d.ingLabel, allergens: d.allergens,
                storage: d.storage, bestBefore: p.bestBefore,
                manufacturerName: p.manufacturerName, memo: p.memo,
              },
              channel: aiDescChannel,
            }),
          })
          .then(r => r.json())
          .then(json => {
            aiDescLoading = false;
            aiEditText = json.text || json.error || "生成に失敗しました。";
            render();
          })
          .catch(e => {
            aiDescLoading = false;
            aiEditText = generateAiDesc(p, aiDescChannel) + "\n\n---\n*AIサーバーに接続できなかったため、標準テンプレートを表示しています。*";
            render();
          });
          return;
        }
        case "copy-ai-desc": { const ta=document.getElementById("ai-desc-prompt"); if(ta) copyPlainText(ta.value); return; }
        case "copy-ai-result": { const ta=document.getElementById("ai-result-text"); if(ta){ta.select();copyPlainText(ta.value);showStatus("コピーしました");} return; }
        case "save-ai-result": { const ta=document.getElementById("ai-result-text"); if(!ta)return; const pid=aiDescId||(products.find(x=>x.name?.trim())?.id); if(!pid)return; aiEditText=ta.value; saveAiText(pid,aiDescChannel,ta.value); showStatus("保存しました"); render(); return; }
        case "activate-license": { activateLicense(); return; }
        case "bulk-apply-status": {
          const sel = document.getElementById("bulk-status-select");
          const newStatus = sel?.value;
          if (!newStatus) { showStatus("ステータスを選択してください"); return; }
          const ps = PRODUCT_STATUSES.find(s => s.id === newStatus);
          const today = new Date().toLocaleDateString("ja-JP");
          let count = 0;
          products = products.map(p => {
            if (!masterSelected.has(p.id)) return p;
            count++;
            return { ...p, productStatus: newStatus, updatedAt: today };
          });
          saveProducts();
          masterSelected.clear();
          showStatus(`${count}件のステータスを「${ps?.label || newStatus}」に変更しました`);
          render(); return;
        }
        case "clear-bulk-select": {
          masterSelected.clear(); render(); return;
        }
        case "bulk-delete": {
          const count = masterSelected.size;
          if (!count) return;
          if (!confirm(`選択した ${count} 件の商品を削除しますか？\nこの操作は元に戻せません。`)) return;
          masterSelected.forEach(id => trackCloudDelete(id));
          products = products.filter(p => !masterSelected.has(p.id));
          masterSelected.clear();
          saveProducts();
          showStatus(`${count}件の商品を削除しました`);
          render(); return;
        }
        case "save-as-template": {
          const pid = ael.dataset.pid;
          const p = products.find(x => x.id === pid); if (!p) return;
          const label = `${p.category||""}${p.category?"・":""}${p.internalName||p.name||"テンプレート"}`.slice(0, 40);
          const userTpls = JSON.parse(safeGet("fmcc-user-templates") || "[]");
          if (userTpls.length >= 10) { showStatus("テンプレートは最大10件まで保存できます。不要なものを削除してください。"); return; }
          const newTpl = {
            id: uid(), label, savedAt: new Date().toLocaleDateString("ja-JP"),
            defaults: {
              category: p.category||"", storage: p.storage||"直射日光・高温多湿を避けて保存", storageCustom: p.storageCustom||"",
              manufacturerType: p.manufacturerType||"製造者", manufacturerTypes: p.manufacturerTypes||["製造者"],
              manufacturerName: p.manufacturerName||"", manufacturerPostal: p.manufacturerPostal||"",
              manufacturerAddress: p.manufacturerAddress||"", manufacturerPhone: p.manufacturerPhone||"",
            }
          };
          safeSet("fmcc-user-templates", JSON.stringify([newTpl, ...userTpls]));
          showStatus(`「${label}」をテンプレートとして保存しました`); return;
        }
        case "remove-product-image": { const p=products.find(x=>x.id===productDetailId); if(!p)return; p.imageDataUrl=""; saveProducts(); render(); return; }
        case "add-cost-item": { const p=products.find(x=>x.id===productDetailId); if(!p)return; saveCostItems(); p.costItems=[...(p.costItems||[]),{id:uid(),name:"",amount:"",unit:"g",unitPrice:""}]; saveProducts(); render(); return; }
        case "add-additive-kw": { const inp=document.getElementById("additive-kw-input"); if(!inp)return; const kws=inp.value.split(/[、,，\s]+/).map(s=>s.trim()).filter(Boolean); if(!kws.length)return; userAdditiveKw=[...new Set([...userAdditiveKw,...kws])]; safeSet("food-label-additive-kw",JSON.stringify(userAdditiveKw)); render(); return; }
        case "save-company-info": {
          const info = {
            companyName:       document.getElementById("ci-company-name")?.value?.trim() || "",
            manufacturerName:  document.getElementById("ci-mfr-name")?.value?.trim() || "",
            manufacturerAddress: document.getElementById("ci-mfr-address")?.value?.trim() || "",
            manufacturerPhone: document.getElementById("ci-mfr-phone")?.value?.trim() || "",
          };
          safeSet("fmcc-company-info", JSON.stringify(info));
          showStatus("会社情報を保存しました。次回の新規商品作成から自動入力されます。");
          render(); return;
        }
        case "apply-company-info-all": {
          const ci = (() => { try { return JSON.parse(safeGet("fmcc-company-info") || "{}"); } catch { return {}; } })();
          if (!ci.manufacturerName && !ci.manufacturerAddress) { showStatus("先に会社情報を保存してください"); return; }
          showModal({ message: `全${products.length}件の商品の製造者情報（空欄のみ）を更新しますか？`, confirmLabel: "適用する", cancelLabel: "キャンセル",
            onConfirm: () => {
              let updated = 0;
              products.forEach(p => {
                let changed = false;
                if (ci.manufacturerName  && !p.manufacturerName?.trim())  { p.manufacturerName  = ci.manufacturerName;  changed = true; }
                if (ci.manufacturerAddress && !p.manufacturerAddress?.trim()) { p.manufacturerAddress = ci.manufacturerAddress; changed = true; }
                if (ci.manufacturerPhone && !p.manufacturerPhone?.trim()) { p.manufacturerPhone = ci.manufacturerPhone; changed = true; }
                if (changed) updated++;
              });
              saveProducts(); showStatus(`${updated}件の商品に製造者情報を適用しました`); render();
            }
          }); return;
        }
        case "save-supabase-cfg": { const url=document.getElementById("sb-url-input")?.value?.trim(); const key=document.getElementById("sb-key-input")?.value?.trim(); if(!url||!key){showStatus("接続先アドレスと認証キーを両方入力してください");return;} if(!url.startsWith("https://")){showStatus("接続先アドレスは https:// で始まる必要があります");return;} safeSet("fmcc-supabase-url",url); safeSet("fmcc-supabase-key",key); showStatus("☁ クラウド接続を保存しました"); render(); return; }
        case "disconnect-cloud": { if(!confirm("クラウド接続を解除しますか？\nデータはこのブラウザにはそのまま残ります。"))return; safeDel("fmcc-supabase-url"); safeDel("fmcc-supabase-key"); showStatus("クラウド接続を解除しました"); render(); return; }
        case "supabase-push": supabasePush(); return;
        case "supabase-pull": supabasePull(); return;
        case "stripe-checkout": { stripeCheckout(ael.dataset.plan); return; }
        case "activate-trial":  { activateTrialCode(); return; }
        case "fetch-ai-briefing": { fetchAiBriefingNow(); return; }
        case "refresh-ai-briefing": {
          aiBriefingText = "";
          try { sessionStorage.removeItem("fp-ai-briefing"); } catch {}
          fetchAiBriefingNow(true);
          return;
        }
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
    if (dupEl) { if(!canCreateMore()){showModal({message:`${planInfo().label}プランは${planInfo().note}です。プランを変更してください。`});return;} const src=products.find(p=>p.id===dupEl.dataset.dup); if(!src)return; const newDupId=uid(); products=[{...structuredClone(src),id:newDupId,name:`${src.name}（複製）`,updatedAt:new Date().toLocaleDateString("ja-JP"),ingredients:src.ingredients.map(i=>({...i,id:uid()}))},...products]; saveProducts(); showStatus("複製しました",{undoLabel:"元に戻す",onUndo:()=>{products=products.filter(p=>p.id!==newDupId);saveProducts();render();}}); render(); return; }

    // [data-dup-goto] — 詳細画面からの複製: 複製後に新商品の詳細へ遷移
    const dupGoEl = t.closest("[data-dup-goto]");
    if (dupGoEl) {
      if(!canCreateMore()){showModal({message:`${planInfo().label}プランは${planInfo().note}です。`});return;}
      const src=products.find(p=>p.id===dupGoEl.dataset.dupGoto); if(!src)return;
      const newId=uid();
      products=[{...structuredClone(src),id:newId,name:`${src.name}（複製）`,updatedAt:new Date().toLocaleDateString("ja-JP"),ingredients:src.ingredients.map(i=>({...i,id:uid()}))},...products];
      saveProducts(); productDetailId=newId; productDetailTab="basic"; saasView="product-detail";
      showStatus("複製しました。コピーを編集しています。"); render(); return;
    }

    // [data-del]
    const delEl = t.closest("[data-del]");
    if (delEl) {
      const p = products.find(x=>x.id===delEl.dataset.del); if(!p) return;
      const snapshot = structuredClone(p);
      const histKey = `food-label-history-${p.id}`;
      const histSnap = localStorage.getItem(histKey);
      trackCloudDelete(p.id);
      products = products.filter(x=>x.id!==p.id);
      safeDel(histKey);
      saveProducts(); render();
      showStatus(`「${p.internalName||p.name||"商品"}」を削除しました`, {
        undoLabel: "元に戻す",
        onUndo: () => {
          products = [snapshot, ...products];
          if (histSnap) localStorage.setItem(histKey, histSnap);
          saveProducts(); render();
          showStatus("削除を取り消しました");
        }
      });
      return;
    }

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
      if (navEl.dataset.setFilter) masterFilter = navEl.dataset.setFilter;
      if(nav==="label-nav"){if(products.length>0){editId=products[0].id;view="edit";saasView="label-nav";}else{view="edit";editId="new";draft=extendProductMaster(emptyProduct());saasView="label-nav";}}
      else if(nav==="spec-sheet-nav"){saasView="spec-sheet-nav";view="saas";if(!specSheetId&&products.length>0)specSheetId=products[0].id;}
      else if(nav==="ai-descriptions-nav"){saasView="ai-descriptions-nav";view="saas";if(!aiDescId&&products.length>0)aiDescId=products[0].id;}
      else if(nav==="settings-nav"){saasView="settings-nav";view="saas";}
      else if(nav==="shelf-scan"){saasView="shelf-scan";view="saas";shelfScanPhase="upload";shelfScanItems=[];shelfScanError="";}
      else{saasView=nav;view="saas";}
      safeSet("fmcc-view",saasView); render(); return;
    }

    // [data-quick-new]
    if (t.closest("[data-quick-new]")) { if(!canCreateMore()){showModal({message:`${planInfo().label}プランは${planInfo().note}です。`});return;} draft=extendProductMaster(emptyProduct());editId="new";view="edit";sidebarOpen=false;render(); return; }

    // [data-set-pipeline-status]
    const pipelineEl = t.closest("[data-set-pipeline-status]");
    if (pipelineEl) {
      const p = products.find(x => x.id === productDetailId);
      if (p) {
        p.productStatus = pipelineEl.dataset.setPipelineStatus;
        p.updatedAt = new Date().toLocaleDateString("ja-JP");
        saveHistory(p);
        saveProducts();
        showStatus(`ステータスを「${pipelineEl.textContent.trim()}」に変更しました`);
        render();
      }
      return;
    }

    // [data-open-and-jump] — カードビューの未入力バッジ → 商品詳細の対象フィールドへ
    const openJumpEl = t.closest("[data-open-and-jump]");
    if (openJumpEl) {
      const raw = openJumpEl.dataset.openAndJump;
      const colonIdx = raw.indexOf(":");
      if (colonIdx < 0) return;
      const pid = raw.slice(0, colonIdx);
      const label = raw.slice(colonIdx + 1);
      const entry = DETAIL_JUMP_MAP[label];
      productDetailId = pid;
      saasView = "product-detail";
      view = "saas";
      safeSet("fmcc-view", saasView);
      if (entry) { productDetailTab = entry.tab; }
      render();
      if (entry) requestAnimationFrame(() => {
        const el = document.querySelector(entry.field);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus();
          el.classList.add("field-highlight");
          setTimeout(() => el.classList.remove("field-highlight"), 2000);
        }
      });
      return;
    }

    // [data-nav-product-detail]
    const navPdEl = t.closest("[data-nav-product-detail]");
    if (navPdEl && !t.closest(".master-card-actions")) { productDetailId=navPdEl.dataset.navProductDetail;saasView="product-detail";view="saas";safeSet("fmcc-view",saasView);render(); return; }

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
    if (dtEl) { productDetailTab=dtEl.dataset.detailTab; render(); document.querySelector(".saas-content")?.scrollTo(0,0); return; }

    // [data-clear-search]
    if (t.closest("[data-clear-search]")) { masterSearch=""; render(); setTimeout(()=>document.querySelector("[data-master-search]")?.focus(),30); return; }

    // [data-clear-category-filter]
    if (t.closest("[data-clear-category-filter]")) { masterCategoryFilter=""; render(); return; }

    // [data-clear-completion-filter]
    if (t.closest("[data-clear-completion-filter]")) { masterCompletionFilter=""; render(); return; }

    // [data-clear-pipeline-filter]
    if (t.closest("[data-clear-pipeline-filter]")) { masterPipelineFilter=""; render(); return; }

    // [data-clear-all-filters]
    if (t.closest("[data-clear-all-filters]")) { masterFilter="all"; masterCategoryFilter=""; masterCompletionFilter=""; masterPipelineFilter=""; render(); return; }

    // [data-master-filter]
    const mfEl = t.closest("[data-master-filter]");
    if (mfEl) { masterFilter=mfEl.dataset.masterFilter; render(); return; }

    // [data-toggle-star]
    const starEl = t.closest("[data-toggle-star]");
    if (starEl) { const p=products.find(x=>x.id===starEl.dataset.toggleStar); if(p){p.starred=!p.starred;saveProducts();render();} return; }

    // [data-todo-key]
    const todoEl = t.closest("[data-todo-key]");
    if (todoEl) { saasView="products"; view="saas"; masterFilter=todoEl.dataset.todoKey; safeSet("fmcc-view",saasView); render(); return; }

    // [data-set-category]
    const setCatEl = t.closest("[data-set-category]");
    if (setCatEl) { masterCategoryFilter=setCatEl.dataset.setCategory; saasView="products"; view="saas"; safeSet("fmcc-view",saasView); render(); return; }

    // [data-set-completion-filter] — ダッシュボード完成度ウィジェットからの遷移
    const setCompEl = t.closest("[data-set-completion-filter]");
    if (setCompEl) { masterCompletionFilter=setCompEl.dataset.setCompletionFilter; masterFilter="all"; masterCategoryFilter=""; saasView="products"; view="saas"; safeSet("fmcc-view",saasView); render(); return; }

    // [data-jump-to-field] — 詳細ページの未入力バッジ → 対応フィールドへスクロール
    const jumpFieldEl = t.closest("[data-jump-to-field]");
    if (jumpFieldEl) {
      const label = jumpFieldEl.dataset.jumpToField;
      const entry = DETAIL_JUMP_MAP[label];
      if (!entry) return;
      if (productDetailTab !== entry.tab) { productDetailTab = entry.tab; render(); }
      requestAnimationFrame(() => {
        const el = document.querySelector(entry.field);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus();
          el.classList.add("field-highlight");
          setTimeout(() => el.classList.remove("field-highlight"), 2000);
        }
      });
      return;
    }

    // [data-master-view] — カード/テーブル表示切替
    const masterViewEl = t.closest("[data-master-view]");
    if (masterViewEl) { masterView=masterViewEl.dataset.masterView; safeSet("fmcc-master-view",masterView); render(); return; }

    // [data-sort-col] — テーブルヘッダーのソート切替
    const sortColEl = t.closest("[data-sort-col]");
    if (sortColEl) { masterSort=sortColEl.dataset.sortCol; safeSet("fmcc-master-sort",masterSort); render(); return; }

    // [data-use-template] — ビルトインテンプレートで新規作成
    const useTplEl = t.closest("[data-use-template]");
    if (useTplEl) {
      if (!canCreateMore()) { showModal({ message: `${planInfo().label}プランは${planInfo().note}です。プランを変更してください。` }); return; }
      const tpl = PRODUCT_TEMPLATES.find(x => x.id === useTplEl.dataset.useTemplate);
      const newProduct = extendProductMaster({ ...emptyProduct(), ...(tpl?.defaults || {}) });
      products = [newProduct, ...products];
      saveProducts();
      productDetailId = newProduct.id; productDetailTab = "basic"; saasView = "product-detail"; view = "saas";
      safeSet("fmcc-view", saasView);
      showStatus(tpl && tpl.id !== "blank" ? `「${tpl.label}」テンプレートを適用しました` : "新規商品を作成しました");
      render(); return;
    }

    // [data-use-user-template] — ユーザー定義テンプレートで新規作成
    const useUserTplEl = t.closest("[data-use-user-template]");
    if (useUserTplEl) {
      if (!canCreateMore()) { showModal({ message: `${planInfo().label}プランは${planInfo().note}です。` }); return; }
      const userTpls = JSON.parse(safeGet("fmcc-user-templates") || "[]");
      const tpl = userTpls[Number(useUserTplEl.dataset.useUserTemplate)];
      if (!tpl) return;
      const newProduct = extendProductMaster({ ...emptyProduct(), ...(tpl.defaults || {}) });
      products = [newProduct, ...products];
      saveProducts();
      productDetailId = newProduct.id; productDetailTab = "basic"; saasView = "product-detail"; view = "saas";
      safeSet("fmcc-view", saasView);
      showStatus(`「${tpl.label}」テンプレートを適用しました`);
      render(); return;
    }

    // [data-copy-from] — 既存商品コピーで新規作成
    const copyFromEl = t.closest("[data-copy-from]");
    if (copyFromEl) {
      if (!canCreateMore()) { showModal({ message: `${planInfo().label}プランは${planInfo().note}です。` }); return; }
      const src = products.find(x => x.id === copyFromEl.dataset.copyFrom); if (!src) return;
      const newProduct = {
        ...structuredClone(src), id: uid(),
        name: src.name ? `${src.name}（コピー）` : "",
        internalName: src.internalName ? `${src.internalName}（コピー）` : "",
        updatedAt: new Date().toLocaleDateString("ja-JP"),
        createdAt: new Date().toLocaleDateString("ja-JP"),
        ingredients: (src.ingredients||[]).map(i => ({ ...i, id: uid() })),
        productStatus: "draft", approvalStatus: "none", assignedTo: "", approverName: "", approvalDate: "",
      };
      products = [newProduct, ...products];
      saveProducts();
      productDetailId = newProduct.id; productDetailTab = "basic"; saasView = "product-detail"; view = "saas";
      safeSet("fmcc-view", saasView);
      showStatus("商品をコピーしました。商品名を更新してください。");
      render(); return;
    }

    // [data-del-user-tpl] — ユーザーテンプレート削除
    const delUserTplEl = t.closest("[data-del-user-tpl]");
    if (delUserTplEl) {
      const idx = Number(delUserTplEl.dataset.delUserTpl);
      const userTpls = JSON.parse(safeGet("fmcc-user-templates") || "[]");
      const removed = userTpls[idx];
      const updated = userTpls.filter((_,i) => i !== idx);
      safeSet("fmcc-user-templates", JSON.stringify(updated));
      showStatus(removed ? `「${removed.label}」を削除しました` : "テンプレートを削除しました");
      render(); return;
    }

    // [data-save-search] — 保存済み検索プリセット保存
    const saveSearchEl = t.closest("[data-save-search]");
    if (saveSearchEl) {
      const label = saveSearchEl.dataset.saveSearch;
      if (!label) return;
      if (savedSearchPresets.some(s => s.label === label)) { showStatus("同じ条件はすでに保存されています"); return; }
      savedSearchPresets = [...savedSearchPresets, { label, filter: masterFilter, category: masterCategoryFilter, completion: masterCompletionFilter, pipeline: masterPipelineFilter, search: masterSearch }];
      safeSet("fmcc-saved-searches", JSON.stringify(savedSearchPresets));
      showStatus(`「${label}」を保存しました`);
      render(); return;
    }

    // [data-apply-search] — 保存済み検索プリセット適用
    const applySearchEl = t.closest("[data-apply-search]");
    if (applySearchEl) {
      const idx = Number(applySearchEl.dataset.applySearch);
      const s = savedSearchPresets[idx];
      if (!s) return;
      masterFilter = s.filter || "all";
      masterCategoryFilter = s.category || "";
      masterCompletionFilter = s.completion || "";
      masterPipelineFilter = s.pipeline || "";
      masterSearch = s.search || "";
      render(); return;
    }

    // [data-del-search] — 保存済み検索プリセット削除
    const delSearchEl = t.closest("[data-del-search]");
    if (delSearchEl) {
      const idx = Number(delSearchEl.dataset.delSearch);
      savedSearchPresets = savedSearchPresets.filter((_,i) => i !== idx);
      safeSet("fmcc-saved-searches", JSON.stringify(savedSearchPresets));
      render(); return;
    }

    // [data-ai-ch]
    const aiChEl = t.closest("[data-ai-ch]");
    if (aiChEl) { aiDescChannel=aiChEl.dataset.aiCh;aiEditText="";render(); return; }

    // [data-set-cost-mode]
    const costModeEl = t.closest("[data-set-cost-mode]");
    if (costModeEl) { const p=products.find(x=>x.id===productDetailId); if(!p)return; saveMaster();p.costMode=costModeEl.dataset.setCostMode;saveProducts();render(); return; }

    // [data-remove-cost]
    const removeCostEl = t.closest("[data-remove-cost]");
    if (removeCostEl) { const p=products.find(x=>x.id===productDetailId); if(!p)return; saveCostItems(); const i=parseInt(removeCostEl.dataset.removeCost); p.costItems.splice(i,1);saveProducts();render(); return; }

    // [data-quick-best-before] — 賞味期限クイック入力
    const quickBBEl = t.closest("[data-quick-best-before]");
    if (quickBBEl) {
      const val = quickBBEl.dataset.quickBestBefore;
      const el = document.querySelector("[data-master-field='bestBefore']");
      if (el) {
        el.value = val;
        const p = products.find(x=>x.id===productDetailId); if(!p)return;
        p.bestBefore = val;
        scheduleAutoSaveMaster();
        el.classList.add("field-highlight");
        setTimeout(() => el.classList.remove("field-highlight"), 2000);
      }
      return;
    }

    // [data-remove-master-ing] — 原材料タブのインライン削除
    const removeMasterIngEl = t.closest("[data-remove-master-ing]");
    if (removeMasterIngEl) {
      const p = products.find(x=>x.id===productDetailId); if(!p)return;
      const idx = parseInt(removeMasterIngEl.dataset.removeMasterIng);
      p.ingredients.splice(idx, 1);
      if (!p.ingredients.length) p.ingredients = [{ id: uid(), name: "", weight: "" }];
      saveProducts(); render(); return;
    }

    // [data-check-fix] — チェックタブの「修正する →」ジャンプ
    const checkFixEl = t.closest("[data-check-fix]");
    if (checkFixEl) {
      const field = checkFixEl.dataset.checkFix;
      const entry = CHECK_FIX_MAP[field];
      if (!entry) return;
      productDetailTab = entry.tab;
      render();
      if (entry.selector) requestAnimationFrame(() => {
        const el = document.querySelector(entry.selector);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus();
          el.classList.add("field-highlight");
          setTimeout(() => el.classList.remove("field-highlight"), 2000);
        }
      });
      return;
    }

    // [data-del-additive-kw]
    const delKwEl = t.closest("[data-del-additive-kw]");
    if (delKwEl) { const i=parseInt(delKwEl.dataset.delAdditiveKw); userAdditiveKw=userAdditiveKw.filter((_,idx)=>idx!==i); safeSet("food-label-additive-kw",JSON.stringify(userAdditiveKw));render(); return; }

    // [data-remove-ing]
    const remIngEl = t.closest("[data-remove-ing]");
    if (remIngEl) { const p=currentProduct(); p.ingredients.splice(Number(remIngEl.dataset.removeIng),1); if(!p.ingredients.length) p.ingredients.push({id:uid(),name:"",weight:""}); render(); return; }
  });

  // ── keydown: グローバルナビゲーションショートカット (d/p/n/Esc) ──
  document.addEventListener("keydown", e => {
    if (e.target.matches("input,textarea,select,[contenteditable]")) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (view !== "saas") return;
    if (e.key === "d") { e.preventDefault(); saasView="dashboard"; masterSelected=new Set(); render(); return; }
    if (e.key === "p") { e.preventDefault(); saasView="products"; masterSelected=new Set(); render(); return; }
    if (e.key === "n") { e.preventDefault(); saasView="products"; masterSelected=new Set(); registerMenuOpen=true; render(); return; }
    if (e.key === "?") { e.preventDefault(); showShortcutsPanel(); return; }
    if (saasView === "product-detail" && productDetailId) {
      const DETAIL_TABS = ["basic","ingredients","cost","check","history","approval"];
      const tidx = parseInt(e.key) - 1;
      if (tidx >= 0 && tidx < DETAIL_TABS.length) { e.preventDefault(); productDetailTab = DETAIL_TABS[tidx]; render(); return; }
    }
    if (e.key === "Escape") {
      if (sidebarOpen) { e.preventDefault(); sidebarOpen=false; render(); return; }
      if (productDetailId && saasView==="product-detail") { e.preventDefault(); productDetailId=null; saasView="products"; render(); return; }
    }
  });

  // ── keydown: role="button" 要素のEnter/Spaceキー活性化 ──
  document.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const t = e.target;
    if (t.getAttribute("role") === "button" && t.tagName !== "BUTTON") {
      e.preventDefault();
      t.click();
    }
  });

  // ── keydown: Enter移動（原材料入力の流れを快適に） ──
  document.addEventListener("keydown", e => {
    if (e.key !== "Enter" || e.shiftKey || e.ctrlKey || e.metaKey) return;
    const t = e.target;
    if (t.matches("[data-master-ing-name]")) {
      e.preventDefault();
      const idx = Number(t.dataset.masterIngName);
      const weightEl = document.querySelector(`[data-master-ing-weight="${idx}"]`);
      if (weightEl) { weightEl.focus(); weightEl.select(); }
      return;
    }
    if (t.matches("[data-master-ing-weight]")) {
      e.preventDefault();
      const idx = Number(t.dataset.masterIngWeight);
      const nextNameEl = document.querySelector(`[data-master-ing-name="${idx + 1}"]`);
      if (nextNameEl) { nextNameEl.focus(); return; }
      const p = products.find(x=>x.id===productDetailId); if(!p)return;
      p.ingredients.push({ id: uid(), name: "", weight: "" });
      render();
      requestAnimationFrame(() => document.querySelector(`[data-master-ing-name="${idx + 1}"]`)?.focus());
      return;
    }
    if (t.matches("[data-ing-name]")) {
      e.preventDefault();
      const idx = Number(t.dataset.ingName);
      const weightEl = document.querySelector(`[data-ing-weight="${idx}"]`);
      if (weightEl) { weightEl.focus(); weightEl.select(); }
      return;
    }
    if (t.matches("[data-ing-weight]")) {
      e.preventDefault();
      const idx = Number(t.dataset.ingWeight);
      const p = currentProduct(); if (!p) return;
      const nextNameEl = document.querySelector(`[data-ing-name="${idx + 1}"]`);
      if (nextNameEl) { nextNameEl.focus(); return; }
      // 最後の行なら新しい行を追加してフォーカス
      p.ingredients.push({ id: uid(), name: "", weight: "" });
      render();
      requestAnimationFrame(() => document.querySelector(`[data-ing-name="${idx + 1}"]`)?.focus());
      return;
    }
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
    if (t.matches("[data-master-field]")) {
      const f = t.dataset.masterField;
      if (["price","directCost","directPackaging","directShipping","directOther"].includes(f)) {
        const v = parseFloat(t.value);
        if (!isNaN(v) && v < 0) {
          t.value = 0;
          showStatus(f === "price" ? "販売価格は0以上を入力してください" : "金額は0以上を入力してください");
        }
        if (f === "price" && !isNaN(v) && v === 0 && t.value !== "") {
          showStatus("⚠ 販売価格が0円です。原価計算が正しく行われません。");
        }
        refreshCostKpis();
      }
      scheduleAutoSaveMaster(); return;
    }
    // 原材料タブ インライン編集（master-ing-*）
    if (t.matches("[data-master-ing-name]")) {
      const p = products.find(x=>x.id===productDetailId); if(!p)return;
      const ing = p.ingredients[Number(t.dataset.masterIngName)]; if(!ing)return;
      ing.name = t.value.replace(/[\/／]/g, "");
      scheduleAutoSaveMaster(); return;
    }
    if (t.matches("[data-master-ing-weight]")) {
      const p = products.find(x=>x.id===productDetailId); if(!p)return;
      const ing = p.ingredients[Number(t.dataset.masterIngWeight)]; if(!ing)return;
      ing.weight = t.value;
      scheduleAutoSaveMaster(); return;
    }
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
    if (t.matches("[data-csv-import]"))        { if(t.files[0]) previewImportCsv(t.files[0]); return; }
    if (t.matches("[data-json-import]"))       { if(t.files[0]) previewImportJson(t.files[0]); return; }
    if (t.matches("[data-mfr-tpl-select]"))   { const idx=Number(t.value); if(isNaN(idx)||!mfrTemplates[idx])return; const tpl=mfrTemplates[idx]; const p=currentProduct(); Object.assign(p,{manufacturerName:tpl.name,manufacturerPostal:tpl.postal,manufacturerAddress:tpl.address,manufacturerPhone:tpl.phone}); render(); return; }
    if (t.matches("[data-print-cfg]"))         { printCfg={...printCfg,label:"自由入力",[t.dataset.printCfg]:t.value}; safeSet("food-label-print-cfg",JSON.stringify(printCfg)); scheduleRender(); return; }
    if (t.matches("[data-size]"))              { printCfg={...(SIZE_PRESETS.find(s=>s.label===t.value)||SIZE_PRESETS[1])}; safeSet("food-label-print-cfg",JSON.stringify(printCfg)); render(); return; }
    if (t.id==="spec-show-cost")               { specShowCost=t.checked; render(); return; }
    if (t.id==="spec-show-sig")                { specShowSig=t.checked; render(); return; }
    if (t.matches("[data-cost-name],[data-cost-amount],[data-cost-unit],[data-cost-price],[data-cost-punit],[data-cost-loss]")) { saveCostItems(); render(); return; }
    if (t.matches("[data-master-field],[data-sales-ch]")) { scheduleAutoSaveMaster(); return; }
    if (t.matches("[data-master-sort]")) { masterSort=t.value; render(); return; }
    if (t.matches("[data-todo-filter-select]")) { masterFilter=t.value||"all"; render(); return; }
    if (t.matches("[data-master-category-filter]")) { masterCategoryFilter=t.value; render(); return; }
    if (t.matches("[data-master-completion-filter]")) { masterCompletionFilter=t.value; render(); return; }
    if (t.matches("[data-master-pipeline-filter]")) { masterPipelineFilter=t.value; render(); return; }
    if (t.matches("[data-select-product]")) {
      const pid = t.dataset.selectProduct;
      const wasEmpty = masterSelected.size === 0;
      if (t.checked) masterSelected.add(pid); else masterSelected.delete(pid);
      const isNowEmpty = masterSelected.size === 0;
      if (wasEmpty !== isNowEmpty) {
        render();
      } else {
        const countEl = document.querySelector(".bulk-count");
        if (countEl) countEl.textContent = `${masterSelected.size}件選択中`;
        const allChk = document.querySelector("[data-select-all]");
        if (allChk) {
          const table = document.querySelector(".master-table[data-visible-ids]");
          const ids = (table?.dataset.visibleIds || "").split(",").filter(Boolean);
          allChk.checked = ids.length > 0 && ids.every(id => masterSelected.has(id));
        }
      }
      return;
    }
    if (t.matches("[data-select-all]")) {
      const table = document.querySelector(".master-table[data-visible-ids]");
      const ids = (table?.dataset.visibleIds || "").split(",").filter(Boolean);
      if (t.checked) ids.forEach(id => masterSelected.add(id));
      else ids.forEach(id => masterSelected.delete(id));
      render(); return;
    }
    if (t.matches("[data-quick-status-select]")) {
      const pid = t.dataset.quickStatusSelect;
      const p = products.find(x => x.id === pid);
      if (p) {
        p.productStatus = t.value;
        p.updatedAt = new Date().toLocaleDateString("ja-JP");
        saveProducts();
        const ps = PRODUCT_STATUSES.find(s => s.id === t.value);
        if (ps) { t.style.color = ps.color; t.style.background = ps.bg; t.style.borderColor = ps.color; }
        showStatus(`ステータスを「${ps?.label || t.value}」に変更しました`);
      }
      return;
    }
  });

  // ── グローバルキーボードショートカット ──
  document.addEventListener("keydown", e => {
    // 入力中・モーダル中は無視
    const active = document.activeElement;
    const inInput = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.tagName === "SELECT" || active.isContentEditable);
    if (inInput && e.key !== "Escape") return;

    // Escape: モーダル・パネルを閉じる
    if (e.key === "Escape") {
      if (document.querySelector(".app-modal")) { document.querySelector(".app-modal")?.remove(); return; }
      if (showAiPanel) { showAiPanel = false; render(); return; }
      if (printPreviewOpen) { printPreviewOpen = false; render(); return; }
      return;
    }

    // Ctrl+S or Cmd+S: 保存
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      if (view === "edit") { saveCurrent(); return; }
      if (view === "saas" && saasView === "product-detail") { saveMaster(); return; }
      return;
    }

    // SaaS画面でのみ有効なショートカット（入力フォーカスなし）
    if (inInput) return;
    if (view !== "saas") return;

    // / : 検索ボックスにフォーカス
    if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      const sb = document.querySelector("[data-master-search], [data-saved-search]");
      if (sb) { sb.focus(); sb.select(); }
      return;
    }

    // n : 新規商品作成
    if (e.key === "n" && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      if (!canCreateMore()) { showModal({ message: `${planInfo().label}プランは${planInfo().note}です。` }); return; }
      assistMessage = ""; draft = emptyProduct(); editId = "new"; view = "edit"; render();
      return;
    }
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
      if (mode==="template") { saasView="template-select"; safeSet("fmcc-view",saasView); render(); return; }
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

  // AI棚スキャン ファイルアップロード
  const shelfSelectBtn = document.getElementById("shelf-select-btn");
  const shelfFileInput = document.getElementById("shelf-file-input");
  const shelfDropZone  = document.getElementById("shelf-drop-zone");
  if (shelfSelectBtn) shelfSelectBtn.addEventListener("click", () => shelfFileInput?.click());
  if (shelfFileInput) shelfFileInput.addEventListener("change", () => { const f = shelfFileInput.files[0]; if (f) runShelfScan(f); });
  if (shelfDropZone) {
    shelfDropZone.addEventListener("dragover", e => { e.preventDefault(); shelfDropZone.classList.add("drag-over"); });
    shelfDropZone.addEventListener("dragleave", () => shelfDropZone.classList.remove("drag-over"));
    shelfDropZone.addEventListener("drop", e => { e.preventDefault(); shelfDropZone.classList.remove("drag-over"); const f = e.dataTransfer.files[0]; if (f) runShelfScan(f); });
  }

  // AIチャット登録
  document.getElementById("ai-chat-input")?.addEventListener("input", e=>{aiRegChatInput=e.target.value;});
  document.getElementById("ai-chat-send")?.addEventListener("click", ()=>sendAiChatMessage());
  document.getElementById("ai-chat-input")?.addEventListener("keydown", e=>{if((e.ctrlKey||e.metaKey)&&e.key==="Enter")sendAiChatMessage();});
}