/* Прогресс: ошибки (веду я в me/progress.js), перевод с первой попытки, фразы, грамматика, дисциплина, срезы. */
import { S, CAT, route, show, crumbs, esc, dayName } from './core.js';
import { ERRORS, SNAPSHOTS } from '../me/progress.js';
import { cardMap, active, LEARNED } from './srs.js';
import { mastery, modScore, PASS, topicEntry } from './grammar.js';
import { isDone } from './days.js';
import { timeChart, factMin } from './method.js';

import { errState as errAt } from './dynamics.js';
const errState = e => errAt(e) || ['активна', 'bad', 0];
export const activeErrors = () => ERRORS.filter(e => errState(e)[2] === 0).length;

function progress() {
  const m = cardMap(), all = active(), learned = all.filter(k => S.srs[k].b >= LEARNED), fresh = all.filter(k => !S.srs[k].n);
  const hard = all.filter(k => (S.srs[k].l || 0) >= 2).sort((a, b) => S.srs[b].l - S.srs[a].l);
  const acc = CAT.days.map(d => { const v = Object.values((S.days[d.id] || {}).tr || {}).filter(x => x.first); return { d, n: v.length, ok: v.filter(x => x.fo).length }; }).filter(x => x.n);
  const errs = ERRORS.slice().sort((a, b) => errState(a)[2] - errState(b)[2]);
  const mins = CAT.days.reduce((a, d) => a + (parseInt((S.days[d.id] || {}).min) || 0), 0);
  const ready = CAT.grammar.filter(t => t.ready);

  show(`<h1>Мой прогресс</h1>
  <div class="rule"><b>Как понять, что прогресс есть.</b> Смотри на три вещи, а не на количество новых слов:
  <ol class="alg"><li><b>Ошибки уходят.</b> «Активных» меньше, «побеждённых» больше.</li>
  <li><b>Перевод с первой попытки растёт.</b> Например, было 50%, через месяц на новых темах стало 70% и выше.</li>
  <li><b>Срезы раз в месяц:</b> меньше ошибок на 100 слов и длиннее текст за те же 2 минуты.</li></ol></div>

  <h2>Мои типичные ошибки</h2><p class="mute">Веду я после каждого отчёта. Ошибка побеждена, когда 3 отчёта подряд её нет там, где она могла быть.</p>
  <table class="ex errs">${errs.map(e => { const [t, c] = errState(e), [tid, mid] = (e.topic || '').split('/'), te = tid && topicEntry(tid);
    return `<tr><td><b>${esc(e.title)}</b><small><s>${esc(e.bad)}</s> → ${esc(e.good)}</small></td><td><span class="pill ${c}">${t}</span><small class="mute">была: ${e.seen.length} раз${e.clean.length ? ` · чисто: ${e.clean.length}` : ''}</small>${te ? `<small><a href="#/g/${tid}${mid ? '/' + mid : ''}">тренировать →</a></small>` : ''}</td></tr>`; }).join('')}</table>

  <h2>Перевод с первой попытки</h2>
  ${acc.length ? `<table class="ex">${acc.map(a => `<tr><td><a href="#/day/${a.d.id}">${dayName(a.d.date)} · ${esc(a.d.title)}</a></td><td><b>${Math.round(a.ok / a.n * 100)}%</b> <span class="mute">(${a.ok} из ${a.n}${a.n < a.d.nTr ? `, сделано ${a.n} из ${a.d.nTr}` : ''})</span></td></tr>`).join('')}</table>` : '<p class="mute">Пока нет данных: сделай раздел «Переведи сам» в модуле дня.</p>'}

  <h2>Фразы</h2>
  <table class="ex"><tr><td>В повторении</td><td><b>${all.length}</b> · <a href="#/review/all">все фразы</a></td></tr>
  <tr><td>Выучено (держатся неделю и дольше)</td><td><b>${learned.length}</b></td></tr>
  <tr><td>В процессе</td><td>${all.length - learned.length - fresh.length}</td></tr><tr><td>Ещё ни разу не повторял</td><td>${fresh.length}</td></tr></table>
  ${hard.length ? `<p><b>Трудные фразы</b> (забывал 2 раза и больше):</p><table class="ex">${hard.slice(0, 15).map(k => `<tr><td>${esc(k)}</td><td>${esc(m.get(k).ru)} · забыл ${S.srs[k].l}×</td></tr>`).join('')}</table>` : ''}

  <h2>Грамматика</h2><table class="ex">${ready.map(t => `<tr><td><a href="#/g/${t.id}">${t.level} · ${esc(t.title)}</a></td><td>сдано ${t.modules.filter(x => modScore(t.id, x.id) >= PASS).length} из ${t.modules.length} · автомат ${mastery(t)} из ${t.total}${S.tests.exam[t.id] != null ? ` · экзамен ${S.tests.exam[t.id]}%` : ''}</td></tr>`).join('')}</table>
  <p class="mute">Дорожная карта: готово ${ready.length} тем из ${CAT.grammar.length}.</p>

  <h2 id="time">Время по дням</h2><p class="mute">Из виджета плана на главной: минуты, которые ты вписал у каждого блока, плюс «сверх плана».</p>${timeChart()}

  <h2>Дисциплина</h2><table class="ex"><tr><td>Модулей дня сделано</td><td><b>${CAT.days.filter(d => isDone(d.id)).length}</b> из ${CAT.days.length}</td></tr><tr><td>Всего времени по плану</td><td><b>${Object.keys(S.plan).reduce((a, k) => a + factMin(k), 0)}</b> мин</td></tr><tr><td>Минут (по отчётам модулей)</td><td>${mins}</td></tr></table>

  <h2>Контрольные срезы</h2><p class="mute">Раз в месяц одно и то же задание: 2 минуты о себе. Я считаю ошибки и оцениваю уровень.</p>
  <table class="ex">${SNAPSHOTS.map(x => `<tr><td><b>${dayName(x.date)} ${x.date.slice(0, 4)}</b><small class="mute">${esc(x.what)}</small></td><td>уровень <b>${esc(x.level)}</b> · ${x.words} слов · <b>${x.err100}</b> ошибок на 100 слов · опечаток ${x.typos}<small class="mute">${esc(x.note)}</small></td></tr>`).join('')}</table>`,
    crumbs(['#/', 'Главная'], 'Прогресс'));
}
export function register() { route(/^progress$/, progress); }
