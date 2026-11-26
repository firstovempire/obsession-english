/* Методика: система (план до B2), план недели, виджет «сегодня», подсказки (окно), самоанализ недели. */
import { S, save, route, show, crumbs, esc, iso, dayName, copyText, rerender, setGuideOpener, wireCommon } from './core.js';
import { WEEK, MIN_DAY } from '../content/method/week.js';
import { GUIDES, RETRO_Q } from '../content/method/guides.js';
import PLAN from '../content/method/plan.js';
import BOOKS, { RULES, WHERE } from '../content/method/books.js';
import { latest } from './days.js';
import { CAT } from './core.js';

const WD = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const monday = (d = new Date()) => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - (x.getDay() + 6) % 7); return x; };
const fixHref = h => h === '#/day' ? (latest() ? '#/day/' + latest().id : '#/days') : h;
const pstate = k => S.plan[k] || (S.plan[k] = { done: {}, min: false });
const blocksFor = (d, st) => st.min ? MIN_DAY : (WEEK[d.getDay()] || { blocks: [] }).blocks;
const ratio = d => { const st = S.plan[iso(d)]; if (!st) return 0; const b = blocksFor(d, st); return b.length ? b.filter((_, i) => st.done[i]).length / b.length : 0; };
const startDate = () => CAT.days.length ? CAT.days[0].date : '9999';
const H = (...p) => crumbs(['#/', 'Главная'], ['#/method', 'Методика'], ...p);

/* ---------- виджет «сегодня» ----------
   S.plan[дата] = { done:{i:true}, min:false, mins:{i:минут, x:сверх плана}, closed:ms }
   Минуты пишешь сам по факту; «Закончить день» фиксирует день, итог идёт в график на странице прогресса. */
const num = v => Math.max(0, Math.min(900, parseInt(v) || 0));
export const factMin = k => { const st = S.plan[k]; return st && st.mins ? Object.values(st.mins).reduce((a, v) => a + num(v), 0) : 0; };
export const planMin = d => { const st = S.plan[iso(d)] || { min: false }; return blocksFor(d, st).reduce((a, b) => a + b.min, 0); };
const fmtMin = m => m >= 60 ? `${Math.floor(m / 60)} ч${m % 60 ? ' ' + m % 60 + ' мин' : ''}` : m + ' мин';
export function planWidget() {
  const now = new Date(), k = iso(now), st = S.plan[k] || { done: {}, min: false }, w = WEEK[now.getDay()], mins = st.mins || {}, closed = !!st.closed;
  const bl = blocksFor(now, st), tot = bl.reduce((a, b) => a + b.min, 0), fact = factMin(k), mon = monday(now);
  const strip = Array.from({ length: 7 }, (_, i) => { const d = new Date(mon); d.setDate(mon.getDate() + i); const r = ratio(d), wk = WEEK[d.getDay()], cur = iso(d) === k, past = d < now && !cur && iso(d) >= startDate(), f = factMin(iso(d));
    return `<a class="wd ${cur ? 'cur' : ''} ${r === 1 ? 'full' : r > 0 ? 'part' : past ? 'miss' : ''}" href="#/method/week"><b>${WD[d.getDay()]}${f ? ` <em>${f}′</em>` : ''}</b><small>${esc(wk.theme)}</small><i style="width:${r * 100}%"></i></a>`; }).join('');
  const val = key => mins[key] != null && mins[key] !== '' ? num(mins[key]) : '';
  const inp = (key, ph) => `<span class="pmw"><input class="pmin" type="number" inputmode="numeric" min="0" max="900" data-pm="${key}" value="${val(key)}" placeholder="${ph}" aria-label="Сколько минут ушло" ${closed ? 'disabled' : ''}><small>мин</small></span>`;
  return `<div class="plan-w ${closed ? 'closed' : ''}">
    <div class="pw-head"><div><b>${esc(w.name)} · ${esc(st.min ? 'Минимум (тяжёлый день)' : w.theme)}</b><small class="mute">${st.min ? 'Пропуск хуже короткого дня. Сделай хотя бы это.' : esc(w.note)}</small></div><span class="badge ${fact >= tot ? 'ok' : ''}" id="pwsum">${fact} / ${tot} мин</span></div>
    ${closed ? '' : '<p class="mute pw-hint">Отмечай блок галочкой и пиши справа, сколько минут <b>на самом деле</b> ушло. В конце нажми «Закончить день», даже если успел не всё.</p>'}
    <div class="pw-list">${bl.map((b, i) => `<div class="pb ${st.done[i] ? 'on' : ''}"><label><input type="checkbox" data-pb="${i}" ${st.done[i] ? 'checked' : ''} ${closed ? 'disabled' : ''}><span class="pm">${b.min}′</span><span><b>${esc(b.t)}</b>${b.d ? `<small>${esc(b.d)}</small>` : ''}</span></label>${inp(i, b.min)}<span class="pa">${b.href ? `<a class="ico" href="${fixHref(b.href)}" title="Открыть">→</a>` : ''}${b.g ? `<button class="ico" data-guide="${b.g}" title="Как делать правильно">?</button>` : ''}</span></div>`).join('')}
    ${readingNow().length ? `<div class="pb rd"><span class="pm">📖</span><span><small>Сейчас читаешь</small><b>${readingNow().map(b => esc(b.title)).join(', ')}</b></span><span class="pa"><a class="ico" href="#/method/books" title="Что читать">→</a></span></div>` : ''}
    <div class="pb extra"><label><span class="pm">+</span><span><b>Сверх плана</b><small>Книга, сериал, разговор: всё на английском помимо блоков.</small></span></label>${inp('x', 0)}<span class="pa"></span></div></div>
    ${closed ? `<div class="pw-done"><b>✓ День закрыт: ${fmtMin(fact)}</b> <span class="mute">из ${tot} мин по плану · блоков ${bl.filter((_, i) => st.done[i]).length} из ${bl.length}</span><br><button class="lnk" id="preopen">исправить</button> · <a class="lnk" href="#/progress">график времени</a></div>`
      : `<div class="btns"><button class="btn" id="pclose">Закончить день</button></div>`}
    <div class="pw-foot">${closed ? '<span></span>' : `<button class="lnk" id="pmin">${st.min ? '← вернуть полный план' : 'Тяжёлый день? Переключить на минимум (30 мин)'}</button>`}<a class="lnk" href="#/method/week">План недели и подсказки →</a></div>
    <div class="wstrip">${strip}</div></div>`;
}
export function wirePlan() {
  const k = iso(new Date()), sum = document.getElementById('pwsum');
  document.querySelectorAll('[data-pb]').forEach(c => c.onchange = () => { pstate(k).done[c.dataset.pb] = c.checked; save(); rerender(); });
  document.querySelectorAll('[data-pm]').forEach(c => {
    c.oninput = () => { const st = pstate(k); (st.mins || (st.mins = {}))[c.dataset.pm] = c.value === '' ? '' : num(c.value); save(); if (sum) sum.textContent = sum.textContent.replace(/^\d+/, factMin(k)); };
    c.onchange = () => { const st = pstate(k), i = c.dataset.pm; if (i !== 'x' && num(c.value) > 0 && !st.done[i]) { st.done[i] = true; save(); } rerender(); };
  });
  const cl = document.getElementById('pclose');
  if (cl) cl.onclick = () => { const st = pstate(k); if (!factMin(k) && !confirm('Минуты не записаны. Всё равно закрыть день с нулём?')) return; st.closed = Date.now(); save(); rerender(); };
  const ro = document.getElementById('preopen'); if (ro) ro.onclick = () => { delete pstate(k).closed; save(); rerender(); };
  const m = document.getElementById('pmin'); if (m) m.onclick = () => { const st = pstate(k); if (factMin(k) - num((st.mins || {}).x) > 0 && !confirm('Минуты по блокам сбросятся (кроме «сверх плана»). Переключить?')) return; st.min = !st.min; st.done = {}; st.mins = st.mins && st.mins.x ? { x: st.mins.x } : {}; save(); rerender(); };
}
/* строки для отчёта модуля дня: сколько времени ушло сегодня по блокам */
export function planReport(k = iso(new Date())) {
  const st = S.plan[k]; if (!st || !st.mins) return '';
  const bl = blocksFor(new Date(k + 'T12:00'), st), m = st.mins;
  const rows = bl.map((b, i) => num(m[i]) ? `  ${b.t}: ${num(m[i])} мин (план ${b.min})` : '').filter(Boolean);
  if (num(m.x)) rows.push(`  Сверх плана: ${num(m.x)} мин`);
  return rows.length ? `Время за день: ${factMin(k)} мин из ${bl.reduce((a, b) => a + b.min, 0)}${st.closed ? ' (день закрыт)' : ''}\n${rows.join('\n')}` : '';
}

/* ---------- график времени (страница прогресса) ---------- */
export function timeChart(days = 28) {
  const now = new Date(); now.setHours(12, 0, 0, 0);
  const start = startDate(), todayK = iso(new Date()), list = [];
  for (let i = days - 1; i >= 0; i--) { const d = new Date(now); d.setDate(now.getDate() - i); const k = iso(d); if (k < start && !factMin(k)) continue; list.push({ d, k, f: factMin(k), p: planMin(d), c: !!(S.plan[k] || {}).closed }); }
  if (!list.length) return '<p class="mute">Данные появятся с первого дня занятий.</p>';
  const top = Math.ceil(Math.max(60, ...list.map(x => Math.max(x.f, x.p))) / 30) * 30;
  const mon = iso(monday()), pd = monday(); pd.setDate(pd.getDate() - 7); const pk = iso(pd);
  const wsum = (a, b) => Object.keys(S.plan).filter(k => k >= a && k < b).reduce((s, k) => s + factMin(k), 0);
  const thisW = wsum(mon, '9999'), lastW = wsum(pk, mon), wplan = WEEK.reduce((a, w) => a + w.blocks.reduce((x, b) => x + b.min, 0), 0);
  const withData = list.filter(x => x.f), avg = withData.length ? Math.round(withData.reduce((a, x) => a + x.f, 0) / withData.length) : 0;
  const tip = x => `${dayName(x.k)}: ${x.f ? fmtMin(x.f) : 'нет данных'} · план ${x.p} мин${x.c ? '' : x.f ? ' · день не закрыт' : ''}`;
  return `<div class="tstats"><div><small>Эта неделя</small><b>${thisW ? fmtMin(thisW) : '—'}</b><small>план ~${fmtMin(wplan)}</small></div><div><small>Прошлая неделя</small><b>${lastW ? fmtMin(lastW) : '—'}</b></div><div><small>В среднем за день</small><b>${avg ? fmtMin(avg) : '—'}</b><small>по дням с данными</small></div></div>
  <div class="tchart"><div class="tgrid"><span style="bottom:100%"><em>${top}</em></span><span style="bottom:50%"><em>${top / 2}</em></span><span style="bottom:0"><em>0</em></span></div>
    <div class="tbars">${list.map(x => `<div class="tcol ${x.k === todayK ? 'cur' : ''}" tabindex="0" aria-label="${esc(tip(x))}" data-tip="${esc(tip(x))}"><span class="tarea"><i class="tbar ${x.c ? '' : 'open'}" style="height:${x.f / top * 100}%"></i><i class="tplan" style="bottom:${x.p / top * 100}%"></i></span><small>${x.d.getDate()}</small></div>`).join('')}</div></div>
  <p class="mute tleg"><i class="lg-bar"></i> факт, день закрыт · <i class="lg-bar open"></i> не закрыт · <i class="lg-plan"></i> план. Наведи на столбик, чтобы увидеть цифры.</p>
  <details><summary>Таблицей</summary><table class="ex">${list.slice().reverse().filter(x => x.f || x.k < todayK).map(x => `<tr><td>${dayName(x.k)}</td><td><b>${x.f ? fmtMin(x.f) : '—'}</b> <span class="mute">· план ${x.p} мин${x.c || !x.f ? '' : ' · не закрыт'}</span></td></tr>`).join('')}</table></details>`;
}


/* ---------- книги ---------- */
const BST = { want: 'хочу', reading: 'читаю', done: 'прочитал' };
const bstate = id => (S.books || {})[id] || {};
const stageDone = st => st.books.filter(b => bstate(b.id).s === 'done').length;
const curStage = () => BOOKS.find(st => stageDone(st) < 2) || BOOKS[BOOKS.length - 1];
export const readingNow = () => BOOKS.flatMap(st => st.books).filter(b => bstate(b.id).s === 'reading');
const KIND = { graded: ['адаптация', 'mid'], native: ['для носителей', ''], philo: ['философия', 'ok'] };
const GET = { shop: 'epub в магазине / Onleihe', free: 'бесплатно: Standard Ebooks', graded: 'адаптация: см. «Где брать»' };
function booksPage() {
  const cur = curStage(), total = BOOKS.reduce((a, st) => a + st.books.length, 0), done = BOOKS.reduce((a, st) => a + stageDone(st), 0), now = readingNow();
  show(`<h1>Что читать</h1><p class="mute">Маршрут от адаптаций A2 до Аристотеля без адаптации. Сложность растёт плавно, на каждом этапе 3–6 книг на выбор. Прочитано ${done} из ${total}.</p>
  ${now.length ? `<div class="rule"><b>Сейчас читаешь:</b> ${now.map(b => `<i>${esc(b.title)}</i>`).join(', ')}</div>` : ''}
  <details class="wkd"><summary><b>Как выбирать и читать</b> <span class="mute">· 5 правил</span></summary><ol class="alg">${RULES.map(r => `<li>${r}</li>`).join('')}</ol></details>
  <details class="wkd"><summary><b>Где брать epub</b></summary><table class="ex">${WHERE.map(w => `<tr><td><b>${esc(w[0])}</b></td><td>${w[1]}</td></tr>`).join('')}</table></details>
  ${BOOKS.map(st => { const n = stageDone(st), isCur = st === cur;
    return `<h2 class="bst ${isCur ? 'cur' : ''}">${esc(st.title)} <span class="pill ${isCur ? 'ok' : ''}">${esc(st.level)}</span>${isCur ? ' <span class="pill mid">твой этап</span>' : ''}</h2>
    <p class="mute">${esc(st.when)} · ${esc(st.goal)} · прочитано ${n} из ${st.books.length}${n >= 2 ? ' ✓ можно дальше' : ', для перехода нужно 2'}</p>
    <div class="blist">${st.books.map(b => { const s = bstate(b.id).s || '', k = KIND[b.kind] || ['', ''];
      return `<div class="book ${s}"><div><b>${esc(b.title)}</b><small>${esc(b.author)}${b.series ? ' · ' + esc(b.series) : ''}</small><small class="mute">${esc(b.why)}</small>
      <small><span class="pill ${k[1]}">${k[0]}</span> <span class="mute">${GET[b.get] || ''}</span></small></div>
      <div class="bbtn">${Object.keys(BST).map(v => `<button class="${s === v ? 'on' : ''}" data-bk="${b.id}" data-bv="${v}">${BST[v]}</button>`).join('')}</div></div>`; }).join('')}</div>`; }).join('')}`, H('Что читать'));
  document.querySelectorAll('[data-bk]').forEach(btn => btn.onclick = () => {
    const B = S.books || (S.books = {}), id = btn.dataset.bk, v = btn.dataset.bv;
    if ((B[id] || {}).s === v) delete B[id]; else B[id] = { s: v, at: iso(new Date()) };
    save(); rerender();
  });
}

/* ---------- подсказки ---------- */
function guideHtml(id) {
  const g = GUIDES[id]; if (!g) return '<p>Подсказка не найдена.</p>';
  const ul = (t, a) => a && a.length ? `<h3>${t}</h3><ul>${a.map(x => `<li>${x}</li>`).join('')}</ul>` : '';
  return `<h2>${esc(g.title)}</h2><p>${g.intro}</p><h3>Механика</h3><div class="steps">${g.steps.map(x => `<p>${x}</p>`).join('')}</div>${ul('Что записывать', g.write)}${ul('Что и когда повторять', g.repeat)}${ul('Как проверить себя', g.check)}${g.bad ? `<div class="trap"><b>Частые ошибки</b><ul>${g.bad.map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}<p><a href="#/method/guide/${id}" class="mute">открыть отдельной страницей</a></p>`;
}
setGuideOpener(id => {
  let dlg = document.getElementById('gdlg');
  if (!dlg) { dlg = document.createElement('dialog'); dlg.id = 'gdlg'; dlg.className = 'gdlg'; document.body.appendChild(dlg); dlg.onclick = e => { if (e.target === dlg) dlg.close(); }; addEventListener('hashchange', () => dlg.open && dlg.close()); }
  dlg.innerHTML = `<button class="ico gx" title="Закрыть">✕</button>${guideHtml(id)}`;
  dlg.querySelector('.gx').onclick = () => dlg.close();
  dlg.showModal(); dlg.scrollTop = 0;
});

/* ---------- страницы ---------- */
function methodHome() {
  show(`<h1>Методика</h1><div class="list">
    <a class="row" href="#/method/week"><span class="num">▦</span><span><b>План недели</b><small>Блоки по минутам на каждый день, самоанализ недели</small></span><span></span></a>
    <a class="row" href="#/method/plan"><span class="num">◎</span><span><b>Система и маршрут до B2</b><small>Принцип, что заучивать, как устроены проверки, маршрут по месяцам, сроки</small></span><span></span></a>
    <a class="row" href="#/method/books"><span class="num">❑</span><span><b>Что читать</b><small>Книги по этапам от A2 до Аристотеля, где брать epub, отметки «читаю / прочитал»</small></span><span></span></a></div>
    <h2>Подсказки: как делать правильно</h2><div class="glist">${Object.keys(GUIDES).map(id => `<button class="gcard" data-guide="${id}"><b>${esc(GUIDES[id].title)}</b><small>${esc(GUIDES[id].short)}</small></button>`).join('')}</div>`, crumbs(['#/', 'Главная'], 'Методика'));
}
function weekPage() {
  const now = new Date(), mon = monday(now), wk = iso(mon), R = S.retro[wk] || (S.retro[wk] = {});
  const order = [1, 2, 3, 4, 5, 6, 0];
  const total = order.reduce((a, i) => a + WEEK[i].blocks.reduce((x, b) => x + b.min, 0), 0);
  show(`<h1>План недели</h1><p class="mute">Около ${Math.round(total / 60)} часов в неделю. Основа каждый будний день одна и та же: повторение, модуль дня, Mr. X (50 мин). Меняется вторая половина: слушание, чтение, грамматика, говорение, погружение.</p>` +
    order.map(i => { const w = WEEK[i], d = new Date(mon); d.setDate(mon.getDate() + (i + 6) % 7); const tot = w.blocks.reduce((a, b) => a + b.min, 0), cur = i === now.getDay(), r = ratio(d);
      return `<details class="wkd ${cur ? 'cur' : ''}" ${cur ? 'open' : ''}><summary><b>${w.name}</b> · ${esc(w.theme)} <span class="mute">· ${tot} мин${r ? ` · сделано ${Math.round(r * 100)}%` : ''}</span></summary><p class="mute">${esc(w.note)}</p>
      <table class="ex">${w.blocks.map(b => `<tr><td><b>${b.min}′ ${esc(b.t)}</b><small class="mute">${esc(b.d || '')}</small></td><td style="width:1%;white-space:nowrap">${b.g ? `<button class="ico" data-guide="${b.g}">? как</button>` : ''}</td></tr>`).join('')}</table></details>`; }).join('') +
    `<h2>Подсказки</h2><div class="glist">${Object.keys(GUIDES).map(id => `<button class="gcard" data-guide="${id}"><b>${esc(GUIDES[id].title)}</b><small>${esc(GUIDES[id].short)}</small></button>`).join('')}</div>
    <h2>Самоанализ недели <span class="mute" style="font-size:16px;font-weight:400">· неделя с ${dayName(wk)}</span></h2><p class="mute">Заполняй в воскресенье, цифры бери со страницы <a href="#/progress">прогресса</a>. Потом скопируй и пришли мне.</p>
    ${RETRO_Q.map((q, i) => `<p class="trq">${i + 1}. ${esc(q)}</p><textarea class="ta" rows="2" data-rq="${i}">${esc(R[i] || '')}</textarea>`).join('')}
    <div class="btns"><button class="btn" id="rcopy">Скопировать самоанализ</button></div><p class="mute" id="copied" aria-live="polite"></p>`, H('План недели'));
  document.querySelectorAll('[data-rq]').forEach(t => t.oninput = () => { R[t.dataset.rq] = t.value; save(); });
  document.getElementById('rcopy').onclick = () => copyText(`=== Самоанализ недели с ${dayName(wk)} ===\n` + RETRO_Q.map((q, i) => `${i + 1}. ${q}\n   ${R[i] || '—'}`).join('\n'), document.getElementById('copied'));
}

export function register() {
  route(/^method$/, methodHome);
  route(/^method\/week$/, weekPage);
  route(/^method\/books$/, booksPage);
  route(/^method\/plan$/, () => show(PLAN, H('Система')));
  route(/^method\/guide\/([\w-]+)$/, id => show(`<div class="sec">${guideHtml(id)}</div>`, H('Подсказка')));
  route(/^(week|plan)$/, p => location.replace('#/method/' + p)); // старые ссылки
}
