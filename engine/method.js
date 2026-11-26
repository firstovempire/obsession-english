/* Методика: система (план до B2), план недели, виджет «сегодня», подсказки (окно), самоанализ недели. */
import { S, save, route, show, crumbs, esc, iso, dayName, copyText, rerender, setGuideOpener, wireCommon } from './core.js';
import { WEEK, MIN_DAY } from '../content/method/week.js';
import { GUIDES, RETRO_Q } from '../content/method/guides.js';
import PLAN from '../content/method/plan.js';
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

/* ---------- виджет «сегодня» ---------- */
export function planWidget() {
  const now = new Date(), k = iso(now), st = S.plan[k] || { done: {}, min: false }, w = WEEK[now.getDay()];
  const bl = blocksFor(now, st), tot = bl.reduce((a, b) => a + b.min, 0), dn = bl.reduce((a, b, i) => a + (st.done[i] ? b.min : 0), 0), mon = monday(now);
  const strip = Array.from({ length: 7 }, (_, i) => { const d = new Date(mon); d.setDate(mon.getDate() + i); const r = ratio(d), wk = WEEK[d.getDay()], cur = iso(d) === k, past = d < now && !cur && iso(d) >= startDate();
    return `<a class="wd ${cur ? 'cur' : ''} ${r === 1 ? 'full' : r > 0 ? 'part' : past ? 'miss' : ''}" href="#/method/week"><b>${WD[d.getDay()]}</b><small>${esc(wk.theme)}</small><i style="width:${r * 100}%"></i></a>`; }).join('');
  return `<div class="plan-w">
    <div class="pw-head"><div><b>${esc(w.name)} · ${esc(st.min ? 'Минимум (тяжёлый день)' : w.theme)}</b><small class="mute">${st.min ? 'Пропуск хуже короткого дня. Сделай хотя бы это.' : esc(w.note)}</small></div><span class="badge ${dn === tot ? 'ok' : ''}">${dn} / ${tot} мин</span></div>
    <div class="pw-list">${bl.map((b, i) => `<div class="pb ${st.done[i] ? 'on' : ''}"><label><input type="checkbox" data-pb="${i}" ${st.done[i] ? 'checked' : ''}><span class="pm">${b.min}′</span><span><b>${esc(b.t)}</b>${b.d ? `<small>${esc(b.d)}</small>` : ''}</span></label><span class="pa">${b.href ? `<a class="ico" href="${fixHref(b.href)}" title="Открыть">→</a>` : ''}${b.g ? `<button class="ico" data-guide="${b.g}" title="Как делать правильно">?</button>` : ''}</span></div>`).join('')}</div>
    <div class="pw-foot"><button class="lnk" id="pmin">${st.min ? '← вернуть полный план' : 'Тяжёлый день? Переключить на минимум (30 мин)'}</button><a class="lnk" href="#/method/week">План недели и подсказки →</a></div>
    <div class="wstrip">${strip}</div></div>`;
}
export function wirePlan() {
  const k = iso(new Date());
  document.querySelectorAll('[data-pb]').forEach(c => c.onchange = () => { pstate(k).done[c.dataset.pb] = c.checked; save(); rerender(); });
  const m = document.getElementById('pmin'); if (m) m.onclick = () => { const st = pstate(k); st.min = !st.min; st.done = {}; save(); rerender(); };
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
    <a class="row" href="#/method/plan"><span class="num">◎</span><span><b>Система и маршрут до B2</b><small>Принцип, что заучивать, как устроены проверки, маршрут по месяцам, сроки</small></span><span></span></a></div>
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
  route(/^method\/plan$/, () => show(PLAN, H('Система')));
  route(/^method\/guide\/([\w-]+)$/, id => show(`<div class="sec">${guideHtml(id)}</div>`, H('Подсказка')));
  route(/^(week|plan)$/, p => location.replace('#/method/' + p)); // старые ссылки
}
