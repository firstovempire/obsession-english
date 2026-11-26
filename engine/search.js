/* Поиск по грамматике, модулям дня и фразам. Работает по каталогу, без загрузки файлов. */
import { CAT, route, show, crumbs, esc, plain, dayName } from './core.js';

const low = s => String(s || '').toLowerCase().replace(/ё/g, 'е');
function run(q) {
  const w = low(q).split(/\s+/).filter(Boolean); if (!w.length) return [];
  const hit = (...f) => { const t = low(f.join(' ')); return w.every(x => t.includes(x)); };
  const out = [];
  CAT.grammar.filter(t => t.ready).forEach(t => {
    if (hit(t.title, t.desc, t.group, t.level)) out.push({ k: 'Тема', h: `#/g/${t.id}`, t: t.title, s: t.desc });
    t.modules.forEach(m => { if (hit(t.title, m.title, m.desc)) out.push({ k: 'Модуль', h: `#/g/${t.id}/${m.id}`, t: `${t.title}: ${plain(m.title)}`, s: m.desc }); });
  });
  CAT.days.forEach(d => { if (hit(d.title, d.focus, d.date, dayName(d.date))) out.push({ k: 'День', h: `#/day/${d.id}`, t: `${dayName(d.date)} ${d.date.slice(0, 4)} · ${d.title}`, s: d.focus }); });
  CAT.cards.forEach(c => { if (hit(c.en, c.ru, c.note)) out.push({ k: 'Фраза', h: c.day ? `#/day/${c.day}` : '#/review/all', t: c.en, s: c.ru }); });
  return out;
}
function page(q = '') {
  q = decodeURIComponent(q);
  show(`<h1>Поиск</h1><input class="inp" id="sq" placeholder="артикли, to be, make an effort, 26 ноября…" value="${esc(q)}" autocomplete="off"><div id="sr"></div>`, crumbs(['#/', 'Главная'], 'Поиск'));
  const inp = document.getElementById('sq'), box = document.getElementById('sr');
  const draw = () => {
    const r = run(inp.value);
    box.innerHTML = !inp.value.trim() ? '<p class="mute">Ищет по темам грамматики, модулям, дням и всем фразам.</p>' : !r.length ? '<p class="mute">Ничего не найдено.</p>' :
      `<p class="mute">Найдено: ${r.length}</p><div class="list">${r.slice(0, 80).map(x => `<a class="row" href="${x.h}"><span class="num kind">${x.k}</span><span><b>${esc(x.t)}</b><small>${esc(x.s)}</small></span><span></span></a>`).join('')}</div>`;
    history.replaceState(null, '', '#/search/' + encodeURIComponent(inp.value));
  };
  inp.oninput = draw; inp.focus(); draw();
}
export function register() { route(/^search(?:\/(.*))?$/, page); }
