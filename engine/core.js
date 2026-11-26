/* Ядро: хранилище, каталог, загрузка контента, маршрутизатор, общие функции интерфейса. */

/* ---------- хранилище: один ключ, версия схемы, перенос старых данных ---------- */
const KEY = 'eng-v2';
const blank = () => ({ v: 2, tests: { mods: {}, q: {}, exam: {}, timer: true }, days: {}, srs: {}, plan: {}, retro: {}, backupAt: 0, created: Date.now() });
export function migrate(old) { // old = {'eng-tests-v1': {...}, 'eng-days-v1': {...}}
  const s = blank(), t = old['eng-tests-v1'] || {}, d = old['eng-days-v1'] || {};
  Object.assign(s.tests, t);
  s.days = d.days || {}; s.srs = d.srs || {}; s.plan = d.plan || {}; s.retro = d.retro || {};
  if (s.days.d01 && !s.days['2026-11-26']) { s.days['2026-11-26'] = s.days.d01; delete s.days.d01; }
  return s;
}
function loadState() {
  try { const raw = localStorage.getItem(KEY); if (raw) return Object.assign(blank(), JSON.parse(raw)); } catch (e) {}
  const old = {}; let found = false;
  for (const k of ['eng-tests-v1', 'eng-days-v1']) { try { const v = localStorage.getItem(k); if (v) { old[k] = JSON.parse(v); found = true; } } catch (e) {} }
  return found ? migrate(old) : blank();
}
export const S = loadState();
export const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { console.error(e); } };
save();
export const hasData = () => Object.keys(S.tests.q).length + Object.keys(S.days).length + Object.values(S.srs).filter(r => r.n).length > 0;
export function exportState() {
  S.backupAt = Date.now(); save();
  const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }), a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = `english-progress-${iso(new Date())}.json`; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
export function importState(obj) {
  const next = obj && obj.v === 2 ? Object.assign(blank(), obj) : (obj['eng-tests-v1'] || obj['eng-days-v1']) ? migrate(obj) : null;
  if (!next) throw new Error('Это не файл прогресса');
  Object.keys(S).forEach(k => delete S[k]); Object.assign(S, next); save();
}

/* ---------- каталог и ленивая загрузка ---------- */
export let CAT = null;
export async function loadCatalog() { CAT = await (await fetch('content/catalog.json', { cache: 'no-cache' })).json(); return CAT; }
const cache = new Map();
export const loadModule = file => { if (!cache.has(file)) cache.set(file, import('../' + file + '?v=' + encodeURIComponent(CAT.built))); return cache.get(file); };

/* ---------- даты ---------- */
export const MON = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
export const MONG = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
export const DAY = 864e5;
export const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
export const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return +d; };
export const dayName = s => { const [, m, d] = s.split('-'); return +d + ' ' + MONG[+m - 1]; };
export const monName = (y, m) => MON[+m - 1] + ' ' + y;
export const plural = (n, a, b, c) => { const k = n % 100, j = n % 10; return n + ' ' + (k > 10 && k < 20 ? c : j === 1 ? a : j > 1 && j < 5 ? b : c); };

/* ---------- текст ---------- */
export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const CLS = { a: 'a', an: 'a', 'a / an': 'a', the: 'the', '—': 'zero', this: 'a', these: 'a', that: 'the', those: 'the', do: 'a', "don't": 'a', does: 'the', "doesn't": 'the', '-s': 'the' };
export const cls = x => CLS[String(x).toLowerCase()];
export const tag = x => cls(x) ? `<span class="ar ar-${cls(x)}">${x}</span>` : x;
export const fmt = s => String(s).replace(/\[(a \/ an|an|a|doesn't|don't|does|do|-s|these|those|this|that|the|—)\]/gi, (m, x) => tag(x));
export const plain = s => String(s).replace(/\[|\]/g, '');
const CON = { "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "that's": 'that is', "what's": 'what is', "there's": 'there is', "don't": 'do not', "doesn't": 'does not', "isn't": 'is not', "aren't": 'are not', "can't": 'cannot', "i've": 'i have', "let's": 'let us', "i'd": 'i would', "won't": 'will not' };
export const norm = s => String(s).toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim()
  .split(' ').map(w => CON[w] || w).join(' ').replace(/\bcan not\b/g, 'cannot');
export function diff(user, model) { // подсветка: чего не хватает (ins) и что лишнее (del), по словам
  const a = user.trim().split(/\s+/).filter(Boolean), b = model.trim().split(/\s+/), k = norm;
  const L = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) L[i][j] = k(a[i]) === k(b[j]) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  let i = 0, j = 0; const out = [];
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && k(a[i]) === k(b[j])) { out.push(esc(b[j])); i++; j++; }
    else if (j < b.length && (i >= a.length || L[i][j + 1] >= L[i + 1][j])) { out.push(`<ins>${esc(b[j])}</ins>`); j++; }
    else { out.push(`<del>${esc(a[i])}</del>`); i++; }
  }
  return out.join(' ');
}

/* ---------- озвучка ---------- */
let voice = null;
const pickVoice = () => { const v = speechSynthesis.getVoices().filter(x => /^en/i.test(x.lang)); voice = v.find(x => /en-US/i.test(x.lang) && /natural|online/i.test(x.name)) || v.find(x => /en-US/i.test(x.lang)) || v[0] || null; };
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
export function say(t, slow) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t);
  u.lang = 'en-US'; if (voice) u.voice = voice; u.rate = slow ? .7 : .95; speechSynthesis.speak(u);
}
export const sayBtns = t => `<button class="ico" data-say="${esc(t)}" title="Послушать">🔊</button><button class="ico" data-say="${esc(t)}" data-slow="1" title="Медленно">🐢</button>`;

/* ---------- копирование ---------- */
export function copyText(txt, msgEl) {
  const ok = () => { if (msgEl) msgEl.textContent = 'Скопировано. Вставь в чат с Claude.'; };
  const fallback = () => { const t = document.createElement('textarea'); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); ok(); } catch (e) { if (msgEl) msgEl.textContent = 'Не удалось скопировать.'; } t.remove(); };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(ok, fallback); else fallback();
}

/* ---------- экран, навигация, маршруты ---------- */
const app = () => document.getElementById('app');
export const link = (h, t) => `<a href="${h}">${t}</a>`;
export const crumbs = (...parts) => parts.map(p => Array.isArray(p) ? link(p[0], p[1]) : p).join(' / ');
let cleanup = [];
export const onLeave = f => cleanup.push(f);
export function show(html, cr) {
  app().innerHTML = html; document.getElementById('crumbs').innerHTML = cr || '';
  wireCommon(app());
}
export function wireCommon(root) {
  root.querySelectorAll('[data-say]').forEach(b => b.onclick = () => say(b.dataset.say, b.dataset.slow));
  root.querySelectorAll('[data-guide]').forEach(b => b.onclick = e => { e.preventDefault(); openGuide(b.dataset.guide); });
}
let guideOpener = () => {};
export const setGuideOpener = f => { guideOpener = f; };
export const openGuide = id => guideOpener(id);

const routes = [];
export const route = (re, fn) => routes.push([re, fn]);
export const go = h => { if (location.hash === h) render(); else location.hash = h; };
export const rerender = () => render();
let navHook = () => {};
export const setNavHook = f => { navHook = f; };
export async function render() {
  cleanup.forEach(f => { try { f(); } catch (e) {} }); cleanup = [];
  document.onkeydown = null; if ('speechSynthesis' in window) speechSynthesis.cancel();
  const path = location.hash.replace(/^#\/?/, '');
  const back = document.getElementById('back'), parts = path.split('/').filter(Boolean);
  if (parts.length) { back.href = '#/' + parts.slice(0, -1).join('/'); back.removeAttribute('aria-disabled'); } else { back.removeAttribute('href'); back.setAttribute('aria-disabled', 'true'); }
  navHook(path);
  scrollTo(0, 0);
  for (const [re, fn] of routes) {
    const m = path.match(re);
    if (m) { try { await fn(...m.slice(1)); } catch (e) { console.error(e); show(`<h1>Ошибка</h1><p class="mute">${esc(e.message)}</p><p><a href="#/">На главную</a></p>`); } return; }
  }
  location.replace('#/');
}
export const loading = () => { app().innerHTML = '<p class="mute">Загрузка…</p>'; };
