/* Интервальное повторение фраз. Тексты карточек берутся из каталога (исправил опечатку в контенте — исправилось везде),
   прогресс по карточке лежит в S.srs[en] = {b: ступень, due, n: показов, l: забываний, off: убрана}. */
import { S, save, CAT, DAY, today, route, show, crumbs, esc, norm, diff, say, sayBtns, wireCommon } from './core.js';

export const STEPS = [1, 3, 7, 16, 35, 90], LEARNED = 3;
let map = null;
export const cardMap = () => map || (map = new Map(CAT.cards.map(c => [c.en, c])));
export function enroll(cards, when) { let ch = false; cards.forEach(c => { if (!S.srs[c.en]) { S.srs[c.en] = { b: 0, due: when, l: 0, n: 0 }; ch = true; } }); if (ch) save(); }
export const enrollDecks = () => enroll(CAT.cards.filter(c => !c.day), today());
export const enrollDay = id => enroll(CAT.cards.filter(c => c.day === id), today() + DAY);
export const active = () => Object.keys(S.srs).filter(k => cardMap().has(k) && !S.srs[k].off);
export const dueList = () => { const t = today(); return active().filter(k => S.srs[k].due <= t).map(k => cardMap().get(k)); };
function grade(en, g) {
  const r = S.srs[en]; if (!r) return;
  r.n = (r.n || 0) + 1;
  if (g === 0) { r.b = 0; r.l = (r.l || 0) + 1; } else if (g === 2) r.b = Math.min(r.b + 1, STEPS.length - 1);
  r.due = today() + (g === 0 ? 0 : STEPS[r.b]) * DAY; save();
}

function review() {
  const queue = dueList().sort(() => Math.random() - .5); let done = 0, again = 0;
  const cr = crumbs(['#/', 'Главная'], 'Повторение');
  function next() {
    const c = queue.shift();
    if (!c) return show(`<h1>${done ? 'Повторение окончено' : 'Нечего повторять'}</h1><p class="mute">${done ? `Карточек: ${done}, из них пришлось повторить ещё раз: ${again}.` : 'Все карточки повторены. Новые появятся завтра.'}</p><div class="btns"><a class="btn" href="#/">На главную</a></div>`, cr);
    show(`<div class="meta"><span>Осталось: ${queue.length + 1}</span><span>${c.day ? `<a href="#/day/${c.day}">${esc(c.src)}</a>` : esc(c.src)}</span></div><div class="bar"><i style="width:${done / (done + queue.length + 1) * 100}%"></i></div>
      <p class="mute">Скажи вслух по-английски, потом напиши:</p><p class="q">${esc(c.ru)}</p>
      <div class="trrow"><input class="inp" id="ri" autocomplete="off" spellcheck="false" placeholder="Enter = показать ответ"><button class="btn" id="rv">Показать</button></div><div id="rfb"></div>`, cr);
    const inp = document.getElementById('ri'), fb = document.getElementById('rfb'); inp.focus();
    const reveal = () => {
      const v = inp.value.trim(), ok = v && norm(v) === norm(c.en);
      inp.disabled = true; document.getElementById('rv').remove(); say(c.en);
      fb.innerHTML = `<div class="why ${ok ? 'ok' : ''}"><b class="h">${ok ? 'Точно' : 'Ответ'}</b><p class="df">${v && !ok ? diff(v, c.en) : esc(c.en)}</p>${c.note ? `<p class="mute">${c.note}</p>` : ''}${sayBtns(c.en)}</div>
        <p class="mute">Как вспомнил? Клавиши 1 / 2 / 3</p><div class="btns"><button class="btn alt g" data-g="0">1 · Не вспомнил</button><button class="btn alt g" data-g="1">2 · С трудом</button><button class="btn g" data-g="2">3 · Легко</button></div>
        <p><button class="lnk" id="off">Знаю намертво или фраза не нужна → убрать из повторения</button></p>`;
      wireCommon(fb);
      const go = g => { document.onkeydown = null; grade(c.en, g); done++; if (g === 0) { again++; queue.splice(Math.min(4, queue.length), 0, c); } next(); };
      fb.querySelectorAll('.g').forEach(b => b.onclick = () => go(+b.dataset.g));
      document.getElementById('off').onclick = () => { document.onkeydown = null; S.srs[c.en].off = true; save(); done++; next(); };
      document.onkeydown = e => { if (/^[123]$/.test(e.key)) { e.preventDefault(); go(e.key - 1); } };
    };
    document.getElementById('rv').onclick = reveal;
    inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); reveal(); } };
  }
  next();
}

/* список всех карточек: посмотреть и вернуть убранные */
function list() {
  const m = cardMap(), rows = [...m.values()].filter(c => S.srs[c.en]);
  const st = c => { const r = S.srs[c.en]; return r.off ? 'убрана' : !r.n ? 'новая' : r.b >= LEARNED ? 'выучена' : 'учится'; };
  show(`<h1>Все фразы</h1><p class="mute">Всего ${rows.length}. Убранные можно вернуть.</p><table class="ex">${rows.map(c => `<tr><td><b>${esc(c.en)}</b><small class="mute">${esc(c.ru)}</small></td><td style="width:1%;white-space:nowrap"><span class="pill ${st(c) === 'выучена' ? 'ok' : st(c) === 'убрана' ? 'mid' : ''}">${st(c)}</span>${S.srs[c.en].off ? ` <button class="ico" data-on="${esc(c.en)}">вернуть</button>` : ''}</td></tr>`).join('')}</table>`,
    crumbs(['#/', 'Главная'], ['#/review', 'Повторение'], 'все фразы'));
  document.querySelectorAll('[data-on]').forEach(b => b.onclick = () => { delete S.srs[b.dataset.on].off; S.srs[b.dataset.on].due = today(); save(); list(); });
}

export function register() { route(/^review$/, review); route(/^review\/all$/, list); }
