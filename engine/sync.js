/* Облачная синхронизация прогресса через Firebase (Firestore + вход через Google).
   Данные: users/{uid}/parts/{часть} = { data: JSON-строка, updated: ms }.
   Части: tests, srs, plan, retro, books, meta, days-ГГГГ (дни по годам, чтобы документы не росли бесконечно).
   Как решаются конфликты:
     sent[часть]  — что последним было синхронизировано (хранится в браузере);
     dirty[часть] — когда часть локально изменилась после синхронизации.
     Пришло из облака, а локально изменений нет → берём облачную версию целиком.
     Изменилось и там, и там → объединяем ключи; при совпадении ключа побеждает более свежая сторона.
   Библиотека Firebase грузится только при включённом облаке, обычная загрузка сайта не замедляется. */
import { S, save, setSaveHook } from './core.js';
import CONFIG from './firebase-config.js';

const V = '13.4.0', CDN = `https://www.gstatic.com/firebasejs/${V}/`;
const FLAG = 'eng-cloud', SENT = 'eng-cloud-sent', DIRTY = 'eng-cloud-dirty', DEBOUNCE = 2000;
const rd = k => { try { return JSON.parse(localStorage.getItem(k) || '{}'); } catch (e) { return {}; } };
let sent = rd(SENT), dirty = rd(DIRTY);
const persist = () => { localStorage.setItem(SENT, JSON.stringify(sent)); localStorage.setItem(DIRTY, JSON.stringify(dirty)); };
let fb = null, user = null, timer = null, status = 'off', lastSync = 0, unsub = null, onChange = () => {};
const listeners = [];

export const cloudUser = () => user;
export const cloudStatus = () => status;
export const cloudLastSync = () => lastSync;
export const cloudEnabled = () => localStorage.getItem(FLAG) === '1';
export const onCloud = f => listeners.push(f);
const set = s => { status = s; listeners.forEach(f => { try { f(s); } catch (e) {} }); };

/* ---------- части состояния ---------- */
function parts() {
  const p = { tests: S.tests, srs: S.srs, plan: S.plan, retro: S.retro, books: S.books || {}, meta: { backupAt: S.backupAt || 0, created: S.created || 0 } };
  for (const id in S.days) { const y = 'days-' + id.slice(0, 4); (p[y] || (p[y] = {}))[id] = S.days[id]; }
  return p;
}
function setPart(name, data) {
  if (name === 'meta') { S.backupAt = data.backupAt || 0; S.created = data.created || S.created; return; }
  if (name.startsWith('days-')) { // объекты дней обновляем на месте: открытая страница модуля держит ссылку на них
    const y = name.slice(5);
    for (const id in S.days) if (id.startsWith(y) && !(id in data)) delete S.days[id];
    for (const id in data) { const o = S.days[id]; if (o === data[id]) continue; if (o && typeof o === 'object') { const v = { ...data[id] }; for (const k in o) delete o[k]; Object.assign(o, v); } else S.days[id] = data[id]; }
    return;
  }
  S[name] = data;
}
const isObj = x => x && typeof x === 'object' && !Array.isArray(x);
function merge(a, b, depth) { // ключи из обоих; при конфликте — b
  if (!isObj(a) || !isObj(b) || depth <= 0) return b === undefined ? a : b;
  const out = { ...a }; for (const k in b) out[k] = k in a ? merge(a[k], b[k], depth - 1) : b[k]; return out;
}
const DEPTH = { tests: 2 };
function receive(name, r) { // r = {data, updated} из облака
  if (r.data === sent[name]) return false;
  const remote = JSON.parse(r.data || '{}'), localJson = JSON.stringify(parts()[name] || {});
  if (!dirty[name] && sent[name] !== undefined && localJson === sent[name]) setPart(name, remote); // локально не трогали
  else {
    const local = parts()[name] || {}, d = DEPTH[name] || 1, remoteWins = (r.updated || 0) >= (dirty[name] || 0);
    if (name === 'meta') setPart(name, { backupAt: Math.max(local.backupAt || 0, remote.backupAt || 0), created: Math.min(local.created || Infinity, remote.created || Infinity) });
    else setPart(name, remoteWins ? merge(local, remote, d) : merge(remote, local, d));
  }
  sent[name] = r.data;
  const now = JSON.stringify(parts()[name] || {});
  if (now === r.data) delete dirty[name]; else dirty[name] = dirty[name] || Date.now();
  return true;
}
function markDirty() {
  const p = parts(), t = Date.now();
  for (const name in p) if (JSON.stringify(p[name]) !== sent[name] && !dirty[name]) dirty[name] = t;
  persist();
}

/* ---------- Firebase ---------- */
async function load() {
  if (fb) return fb;
  const [app, auth, fs] = await Promise.all(['app', 'auth', 'firestore'].map(m => import(CDN + `firebase-${m}.js`)));
  const a = app.initializeApp(CONFIG);
  const db = fs.initializeFirestore(a, { localCache: fs.persistentLocalCache() });
  fb = { auth, fs, A: auth.getAuth(a), db };
  return fb;
}
const col = () => fb.fs.collection(fb.db, 'users', user.uid, 'parts');

async function push() {
  if (!user) return;
  markDirty();
  const p = parts(), names = Object.keys(dirty).filter(n => n in p);
  if (!names.length) { set(navigator.onLine ? 'ok' : 'offline'); return; }
  set('saving');
  const now = Date.now(), json = {};
  names.forEach(n => json[n] = JSON.stringify(p[n]));
  try {
    await Promise.all(names.map(n => fb.fs.setDoc(fb.fs.doc(col(), n), { data: json[n], updated: now })));
    names.forEach(n => { sent[n] = json[n]; if (JSON.stringify(parts()[n]) === json[n]) delete dirty[n]; });
    persist(); lastSync = Date.now(); set(navigator.onLine ? 'ok' : 'offline');
  } catch (e) { console.error(e); set('error'); }
}
function schedule() { if (!user) return; markDirty(); clearTimeout(timer); set('saving'); timer = setTimeout(push, DEBOUNCE); }

async function connect() {
  set('saving');
  const snap = await fb.fs.getDocs(col());
  let changed = false;
  snap.forEach(doc => { if (receive(doc.id, doc.data())) changed = true; });
  for (const n in parts()) if (sent[n] === undefined) dirty[n] = dirty[n] || 1; // в облаке такой части ещё нет
  persist(); if (changed) { save(); onChange(); }
  await push();
  if (unsub) unsub();
  unsub = fb.fs.onSnapshot(col(), s => {
    let ch = false;
    s.docChanges().forEach(c => { if (!c.doc.metadata.hasPendingWrites && receive(c.doc.id, c.doc.data())) ch = true; });
    if (ch) { persist(); save(); lastSync = Date.now(); set('ok'); onChange(); }
  }, e => { console.error(e); set('error'); });
  lastSync = Date.now(); set('ok');
}

/* ---------- действия ---------- */
export async function cloudStart(cb) {
  if (cb) onChange = cb;
  if (!cloudEnabled()) return;
  set('saving');
  try {
    await load();
    fb.auth.onAuthStateChanged(fb.A, async u => {
      const was = user && user.uid; user = u;
      if (!u) { if (unsub) unsub(); unsub = null; set('signedout'); return; }
      if (was !== u.uid) { try { await connect(); } catch (e) { console.error(e); set('error'); } }
    });
  } catch (e) { console.error(e); set('error'); }
}
export async function cloudLogin() {
  await load();
  localStorage.setItem(FLAG, '1');
  const prov = new fb.auth.GoogleAuthProvider();
  try { await fb.auth.signInWithPopup(fb.A, prov); }
  catch (e) { if (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment') return fb.auth.signInWithRedirect(fb.A, prov); localStorage.removeItem(FLAG); throw e; }
  if (!user || user.uid !== fb.A.currentUser.uid) { user = fb.A.currentUser; await connect(); }
  fb.auth.onAuthStateChanged(fb.A, u => { if (!u) { user = null; set('signedout'); } });
}
export async function cloudLogout() {
  if (unsub) unsub(); unsub = null;
  if (fb) await fb.auth.signOut(fb.A);
  localStorage.removeItem(FLAG); user = null; sent = {}; dirty = {}; persist(); set('off');
}
export const cloudSyncNow = () => push();
export const cloudAfterImport = () => { const p = parts(); for (const n in p) dirty[n] = Date.now(); persist(); return push(); };

setSaveHook(schedule);
addEventListener('online', () => user && push());
addEventListener('offline', () => user && set('offline'));
