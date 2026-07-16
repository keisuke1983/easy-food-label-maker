// IndexedDB画像ストレージ — localStorageの5MB上限対策
const _IDB_NAME = "fp-images";
const _IDB_STORE = "imgs";
let _idb = null;

function _openIdb() {
  if (_idb) return Promise.resolve(_idb);
  return new Promise((res, rej) => {
    const r = indexedDB.open(_IDB_NAME, 1);
    r.onupgradeneeded = e => e.target.result.createObjectStore(_IDB_STORE);
    r.onsuccess = e => { _idb = e.target.result; res(_idb); };
    r.onerror = () => rej();
  });
}

async function imgGet(id) {
  try {
    const db = await _openIdb();
    return await new Promise(res => {
      const r = db.transaction(_IDB_STORE).objectStore(_IDB_STORE).get(id);
      r.onsuccess = () => res(r.result || null);
      r.onerror = () => res(null);
    });
  } catch { return null; }
}

async function imgSet(id, dataUrl) {
  try {
    const db = await _openIdb();
    await new Promise(res => {
      const tx = db.transaction(_IDB_STORE, "readwrite");
      tx.objectStore(_IDB_STORE).put(dataUrl, id);
      tx.oncomplete = res; tx.onerror = res;
    });
  } catch {}
}

async function imgDelete(id) {
  try {
    const db = await _openIdb();
    await new Promise(res => {
      const tx = db.transaction(_IDB_STORE, "readwrite");
      tx.objectStore(_IDB_STORE).delete(id);
      tx.oncomplete = res; tx.onerror = res;
    });
  } catch {}
}

// 起動時に1回呼ぶ: 既存base64をIndexedDBへ移行 → "1"マーカーに置換後に復元
async function initImageStorage() {
  // フェーズ1: localStorage内のbase64画像をIndexedDBへ移行
  let migrated = 0;
  for (const p of products) {
    if (p.imageDataUrl && p.imageDataUrl.startsWith("data:")) {
      await imgSet(p.id, p.imageDataUrl);
      migrated++;
    }
  }
  if (migrated > 0) {
    saveProducts(); // stripしてlocalStorageを縮小（メモリ内はbase64のまま）
    return;         // メモリに画像が残っているので再renderは不要
  }

  // フェーズ2: "1"マーカーの商品画像をIndexedDBから復元
  const toRestore = products.filter(p => p.imageDataUrl === "1");
  if (!toRestore.length) return;
  await Promise.all(toRestore.map(async p => {
    const data = await imgGet(p.id);
    p.imageDataUrl = data || "";
  }));
  render();
}
