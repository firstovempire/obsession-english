/* Модули дня: архив год → месяц → число, страница модуля, отчёт для Claude. */
import { S, save, CAT, loadModule, route, show, crumbs, link, esc, fmt, plain, norm, diff, sayBtns, wireCommon, copyText, dayName, monName, plural, loading } from './core.js';
import { enrollDay, dueList } from './srs.js';
import { modScore, mastery, topicEntry, PASS } from './grammar.js';
import { planReport, factMin } from './method.js';
import { dynamicsHtml } from './dynamics.js';

const TYPE = { regular: '', review: 'обзор недели', snapshot: 'срез месяца' };
export const dayState = id => S.days[id];
export const isDone = id => !!(S.days[id] || {}).done;
export const badge = id => { const s = S.days[id]; return s && s.done ? '<span class="badge ok">✓ сделан</span>' : `<span class="badge">${s ? 'начат' : 'не начат'}</span>`; };
export const latest = () => CAT.days[CAT.days.length - 1];
const ym = d => d.date.slice(0, 7);
const H = (...p) => crumbs(['#/', 'Главная'], ['#/days', 'Модули дня'], ...p);
const dayRow = d => `<a class="row" href="#/day/${d.id}"><span class="num">${+d.date.slice(8)}</span><span><b>${esc(d.title)}${TYPE[d.type] ? ` <span class="pill mid">${TYPE[d.type]}</span>` : ''}</b><small>${esc(d.focus)}</small></span>${badge(d.id)}</a>`;

/* ---------- архив ---------- */
function archive(year) {
  const years = [...new Set(CAT.days.map(d => d.date.slice(0, 4)))].reverse();
  const ys = year ? [year] : years;
  show(`<h1>${year ? 'Модули дня ' + year : 'Модули дня'}</h1><p class="mute">Папки по месяцам, внутри числа и темы.</p>` + ys.map(y => {
    const months = [...new Set(CAT.days.filter(d => d.date.startsWith(y)).map(ym))].reverse();
    return `<h2>${y}</h2><div class="list">` + months.map(k => {
      const ds = CAT.days.filter(d => ym(d) === k), dn = ds.filter(d => isDone(d.id)).length;
      return `<a class="row" href="#/days/${k.replace('-', '/')}"><span class="num">🗀</span><span><b>${monName(k.slice(0, 4), k.slice(5))}</b><small>${plural(ds.length, 'модуль', 'модуля', 'модулей')} · последний: ${dayName(ds[ds.length - 1].date)}</small></span><span class="badge ${dn === ds.length ? 'ok' : ''}">сделано ${dn} из ${ds.length}</span></a>`;
    }).join('') + '</div>';
  }).join('') + (CAT.days.length ? '' : '<p>Пока пусто.</p>'), year ? H(year) : crumbs(['#/', 'Главная'], 'Модули дня'));
}
function month(y, m) {
  const ds = CAT.days.filter(d => ym(d) === `${y}-${m}`);
  if (!ds.length) return archive();
  show(`<h1>${monName(y, m)}</h1><p class="mute">Новые сверху. Сделано ${ds.filter(d => isDone(d.id)).length} из ${ds.length}.</p><div class="list">${ds.slice().reverse().map(dayRow).join('')}</div>`,
    H([`#/days/${y}`, y], monName(y, m)));
}

/* ---------- ссылки на грамматику ---------- */
function refRow(r, n) {
  const [tid, mid] = r.split('/'), t = topicEntry(tid); if (!t) return '';
  if (mid) {
    const m = t.modules.find(x => x.id === mid); if (!m) return '';
    const b = modScore(tid, mid);
    return `<a class="row" href="#/g/${tid}/${mid}"><span class="num">${n}</span><span><b>${esc(t.title)}: ${esc(plain(m.title))}</b><small>${esc(m.desc)} · теория + тест</small></span><span class="badge ${b >= PASS ? 'ok' : ''}">${b == null ? 'не пройден' : b + '%'}</span></a>`;
  }
  return `<a class="row" href="#/g/${tid}"><span class="num">${n}</span><span><b>${esc(t.title)}</b><small>вся тема</small></span><span class="badge">${mastery(t)} из ${t.total}</span></a>`;
}

/* ---------- перевод (общий для разминки и перевода дня) ---------- */
const trHtml = (items, key, s) => items.map((t, i) => `<div class="tr" data-k="${key}" data-i="${i}"><p class="trq"><span class="mute">${i + 1}.</span> ${esc(t.ru)}</p><div class="trrow"><input class="inp" autocomplete="off" spellcheck="false" value="${esc(((s[key] || {})[i] || {}).v || '')}"><button class="btn alt chk">Проверить</button></div><div class="trfb"></div></div>`).join('');
function wireTr(d, s, onChange = () => {}) {
  document.querySelectorAll('.tr').forEach(box => {
    const key = box.dataset.k, i = +box.dataset.i, t = (key === 'wu' ? d.warmup : d.translate)[i], bucket = s[key] || (s[key] = {});
    const inp = box.querySelector('.inp'), fb = box.querySelector('.trfb');
    const render = () => {
      const r = bucket[i]; if (!r || r.ok == null) { fb.innerHTML = ''; return; }
      const best = t.a[0];
      fb.innerHTML = r.ok === true
        ? `<div class="why ok"><b class="h">${r.self ? 'Отмечено как верное: проверю в отчёте' : 'Верно'}</b>${esc(best)} ${sayBtns(best)}${t.note ? `<p class="mute">${t.note}</p>` : ''}</div>`
        : `<div class="why bad"><b class="h">Сравни с образцом</b><p class="df">${diff(r.v, best)}</p>${t.a.length > 1 ? `<p class="mute">Тоже верно: ${t.a.slice(1).map(esc).join(' / ')}</p>` : ''}${t.note ? `<p>${t.note}</p>` : ''}${sayBtns(best)}
           <div class="btns sm"><button class="btn alt mine">Мой вариант тоже верный</button><button class="btn alt redo">Написать заново</button></div></div>`;
      wireCommon(fb);
      const m = fb.querySelector('.mine'); if (m) m.onclick = () => { r.ok = true; r.self = true; save(); render(); onChange(); };
      const rd = fb.querySelector('.redo'); if (rd) rd.onclick = () => { r.ok = null; save(); inp.value = ''; inp.focus(); render(); };
    };
    const check = () => {
      const v = inp.value.trim(); if (!v) return;
      const ok = t.a.some(x => norm(x) === norm(v)), p = bucket[i];
      bucket[i] = p && p.first ? Object.assign(p, { v, ok, self: false }) : { v, ok, first: v, fo: ok };
      save(); render(); onChange();
    };
    box.querySelector('.chk').onclick = check;
    inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); check(); } };
    render();
  });
}
const trReport = (items, bucket) => (items || []).map((t, i) => { const r = (bucket || {})[i] || {}; return `${i + 1}. ${t.ru}\n   первый ответ: ${r.first || '—'}${r.v && r.v !== r.first ? `\n   финальный: ${r.v}` : ''}  [${r.fo ? 'совпало сразу' : r.ok === true ? (r.self ? 'считаю верным' : 'исправил') : r.ok === false ? 'не совпало' : 'не делал'}]`; }).join('\n');

/* ---------- страница модуля ---------- */
async function dayPage(id) {
  const meta = CAT.days.find(x => x.id === id); if (!meta) return archive();
  loading(); const d = (await loadModule(meta.file)).default;
  const s = S.days[id] || (S.days[id] = { tr: {}, wu: {}, speak: '', write: '', hard: '', min: '' }); save();
  enrollDay(id);
  const G = g => `<button class="ico gbtn" data-guide="${g}">? как делать</button>`;
  const parts = []; let n = 0;
  /* раздел: шапка с отметкой «сделано»; сделанный раздел сворачивается до шапки (s.sec[key] = true) */
  const marks = s.sec || (s.sec = {});
  const sec = (key, title, tagT, body) => { const mk = key !== 'rep'; parts.push({ key, title, mk, html: `<section class="sec" id="s-${key}"><h2><span class="sn">${++n}</span><button type="button" class="st" disabled>${title}</button><span class="tag">${tagT}</span>${mk ? `<button type="button" class="secdone" data-sd="${key}" aria-pressed="false">Готово</button>` : ''}</h2><div class="secb">${body}</div></section>` }); };
  const due = dueList().length;
  sec('dyn', 'Итоги и динамика', 'посмотреть', dynamicsHtml(d.date, factMin));
  if (d.tasks && d.tasks.length) sec('tk', 'Задания для блоков плана', 'план', `<p class="mute">Что именно делать в блоках сегодняшнего плана, кроме модуля. Темы и материал подобраны под тебя.</p><div class="steps">${d.tasks.map(t => `<div class="rule"><b>${t.min ? t.min + '′ · ' : ''}${esc(t.block)}</b><br>${t.d}</div>`).join('')}</div>`);
  sec('rev', 'Повторение фраз', 'вспомнить', `${G('srs')}<p>${due ? `Сегодня к повтору <b>${due}</b>. Сделай их первыми, пока свежая голова.` : 'На сегодня всё повторено.'}</p><div class="btns sm"><a class="btn ${due ? '' : 'alt'}" href="#/review">Открыть повторение</a></div>`);
  if (d.warmup && d.warmup.length) sec('wu', 'Разминка: старые темы', 'вспомнить', `<p class="mute">Темы прошлых дней на новых предложениях. Если ошибся, сначала открой тему и повтори её, потом иди дальше.</p>${trHtml(d.warmup, 'wu', s)}`);
  if (d.review) sec('err', 'Разбор твоих ошибок', 'понять', d.review);
  if (d.theory) sec('th', 'Грамматика дня', 'понять', G('grammar') + d.theory + ((d.related || []).length ? `<h2>Закрепи тестами</h2><p class="mute">В тестах другие предложения, чем в теории: они проверяют, что ты понял правило, а не запомнил пример. Зачёт: ${PASS}%.</p><div class="list">${d.related.map((r, i) => refRow(r, i + 1)).join('')}</div>` : ''));
  if (d.phrases) sec('ph', 'Фразы дня', 'выучить', `<p class="mute">Послушай каждую, повтори вслух 3 раза с той же интонацией. Специально не зубри: с завтрашнего дня они будут приходить в повторение.</p><table class="ex ph">` +
    d.phrases.map(p => `<tr><td><b>${esc(p.en)}</b>${p.note ? `<small class="mute">${p.note}</small>` : ''}</td><td>${esc(p.ru)}</td><td class="say">${sayBtns(p.en)}</td></tr>`).join('') + '</table>');
  if (d.translate) sec('tr', 'Переведи сам', 'применить', `<p class="mute">Предложения новые, их не было ни в теории, ни во фразах. Пиши по-английски без подсказок. Enter = проверить. Если написал по-другому, но уверен, что верно, отметь это, а я проверю в отчёте.</p>${trHtml(d.translate, 'tr', s)}`);
  if (d.letter) sec('let', 'Письмо от ' + esc(d.letter.from), 'читать', `<p class="mute">Mr. X это вымышленный собеседник, с которым ты переписываешься. Прочитай письмо вслух. Сначала попробуй понять без словарика.</p>
    <div class="letter"><p>${esc(d.letter.text).replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p><div class="btns sm">${sayBtns(d.letter.text)}</div></div>
    ${d.letter.gloss ? `<details><summary>Словарик к письму</summary><table class="ex">${d.letter.gloss.map(g => `<tr><td><b>${esc(g[0])}</b></td><td>${esc(g[1])}</td></tr>`).join('')}</table></details>` : ''}`);
  if (d.write) sec('wr', 'Письмо', 'писать', `${G('writing')}<p><b>${d.write.task}</b></p>${d.write.words ? `<p class="mute">Используй минимум 3: ${d.write.words.map(esc).join(' · ')}</p>` : ''}
    <p class="mute">Без переводчика. Не знаешь слово, напиши его по-русски в скобках, я подскажу. Перед отправкой проверь себя по чек-листу из подсказки.</p><textarea class="ta" id="write" rows="8" placeholder="Hi X, …">${esc(s.write)}</textarea>`);
  if (d.speak) sec('sp', 'Говорение', 'говорить', `${G('speaking')}<p><b>${d.speak.task}</b></p>${d.speak.plan ? '<ol class="alg">' + d.speak.plan.map(x => `<li>${x}</li>`).join('') + '</ol>' : ''}
    <div class="rule"><b>Как:</b> 1) подумай 1 минуту, без записей на русском; 2) нажми в поле ниже и включи диктовку <kbd>Win</kbd>+<kbd>H</kbd> (на телефоне микрофон на клавиатуре); 3) говори 1–2 минуты без остановок, ошибки не исправляй; 4) текст после диктовки не редактируй.</div>
    <textarea class="ta" id="speak" rows="6" placeholder="Здесь появится текст диктовки…">${esc(s.speak)}</textarea>`);
  if (d.think) sec('th2', 'Думать на английском сегодня', 'привычка', d.think);
  sec('rep', 'Отчёт для Claude', 'отправить', `<p class="mute">Скопируй и пришли мне в чат. Я разберу ошибки, и следующий модуль соберу из них.</p>
    <div class="trrow"><label class="mute" style="white-space:nowrap" for="min">Минут сегодня всего</label><input class="inp" id="min" inputmode="numeric" style="max-width:110px" value="${esc(s.min)}"></div>
    <textarea class="ta" id="hard" rows="3" placeholder="Что было трудно? Что выписал из видео или shadowing? Процент понимания сцены? (можно по-русски)">${esc(s.hard)}</textarea>
    <div class="btns"><button class="btn" id="copy">Скопировать отчёт</button><button class="btn alt" id="done">${s.done ? '✓ Модуль сделан' : 'Отметить модуль сделанным'}</button></div><p class="mute" id="copied" aria-live="polite"></p>`);

  const [y, m] = id.split('-');
  show(`<p class="mute">${dayName(d.date)} ${y} · модуль дня${TYPE[d.type] ? ' · ' + TYPE[d.type] : ''}</p><h1>${esc(d.title)}</h1><p class="mute">${esc(d.focus)}</p>
    <div class="dprog" id="dprog"></div>
    <nav class="toc">${parts.map((p, i) => `<a href="javascript:void 0" data-to="s-${p.key}"><span>${i + 1}</span>${p.title.replace(/<[^>]+>/g, '')}</a>`).join('')}</nav>${parts.map(p => p.html).join('')}`,
    H([`#/days/${y}`, y], [`#/days/${y}/${m}`, monName(y, m)], dayName(d.date)));
  const go = key => { const el = document.getElementById('s-' + key); if (!el) return; el.classList.add('open'); const st = el.querySelector(':scope > h2 .st'); if (st && el.classList.contains('dn')) st.setAttribute('aria-expanded', 'true'); el.scrollIntoView({ behavior: 'smooth' }); };
  document.querySelectorAll('[data-to]').forEach(a => a.onclick = () => go(a.dataset.to.slice(2)));
  const mk = parts.filter(p => p.mk);
  const paintMarks = () => {
    mk.forEach(p => {
      const on = !!marks[p.key], el = document.getElementById('s-' + p.key), b = el.querySelector('.secdone');
      el.classList.toggle('dn', on); b.setAttribute('aria-pressed', on); const st = el.querySelector(':scope > h2 .st'); st.disabled = !on; if (on) st.setAttribute('aria-expanded', el.classList.contains('open')); else st.removeAttribute('aria-expanded');
      const t = document.querySelector(`[data-to="s-${p.key}"]`); if (t) t.classList.toggle('ok', on);
    });
    const k = mk.filter(p => marks[p.key]).length, next = mk.find(p => !marks[p.key]), box = document.getElementById('dprog');
    box.innerHTML = `<div class="dpbar" role="progressbar" aria-valuemin="0" aria-valuemax="${mk.length}" aria-valuenow="${k}" aria-label="Разделов сделано"><i style="width:${k / mk.length * 100}%"></i></div>
      <div class="dprow"><span class="mute">Сделано разделов: <b>${k} из ${mk.length}</b></span>${next ? `<button type="button" class="btn sm" id="dnext">Продолжить: ${parts.indexOf(next) + 1}. ${next.title.replace(/<[^>]+>/g, '')} →</button>` : `<button type="button" class="btn sm" id="dnext">Все разделы сделаны: к отчёту →</button>`}</div>`;
    document.getElementById('dnext').onclick = () => go(next ? next.key : 'rep');
  };
  const setMark = (key, on) => { marks[key] = on; if (!on) delete marks[key]; save(); paintMarks(); };
  document.querySelectorAll('[data-sd]').forEach(b => b.onclick = e => { e.stopPropagation(); const key = b.dataset.sd, on = !marks[key]; setMark(key, on); const el = document.getElementById('s-' + key); el.classList.remove('open'); paintMarks(); if (on) { const i = mk.findIndex(p => p.key === key), nx = mk.slice(i + 1).find(p => !marks[p.key]) || mk.find(p => !marks[p.key]); if (nx) go(nx.key); } });
  /* свёрнутый раздел раскрывается кликом по шапке */
  document.querySelectorAll('.sec > h2 .st').forEach(t => t.onclick = () => { const el = t.closest('.sec'); if (!el.classList.contains('dn')) return; el.classList.toggle('open'); t.setAttribute('aria-expanded', el.classList.contains('open')); });
  paintMarks();
  /* разминка и перевод отмечаются сами, когда проверено каждое предложение */
  const autoMark = () => ['wu', 'tr'].forEach(key => { const items = key === 'wu' ? d.warmup : d.translate; if (!items || !items.length || marks[key]) return; const b = s[key] || {}; if (items.every((_, i) => b[i] && b[i].ok != null)) { const el = document.getElementById('s-' + key); el.classList.add('open'); setMark(key, true); } });
  wireTr(d, s, autoMark);
  ['speak', 'write', 'hard', 'min'].forEach(k => { const el = document.getElementById(k); if (el) el.oninput = () => { s[k] = el.value; save(); }; });
  document.getElementById('done').onclick = e => { s.done = !s.done; save(); e.target.textContent = s.done ? '✓ Модуль сделан' : 'Отметить модуль сделанным'; };
  document.getElementById('copy').onclick = () => {
    const tests = (d.related || []).filter(r => r.includes('/')).map(r => { const [tid, mid] = r.split('/'), t = topicEntry(tid), mm = t && t.modules.find(x => x.id === mid); return mm ? `${t.title} / ${plain(mm.title)}: ${modScore(tid, mid) == null ? 'не проходил' : modScore(tid, mid) + '%'}` : ''; }).filter(Boolean).join('\n');
    const txt = `=== Модуль дня ${d.date} · ${d.title} ===\nМинут всего: ${s.min || '?'}\n` +
      (d.warmup && d.warmup.length ? `\n--- Разминка ---\n${trReport(d.warmup, s.wu)}\n` : '') +
      `\n--- Перевод ---\n${trReport(d.translate, s.tr)}\n\n--- Тесты ---\n${tests || '—'}\n\n--- Письмо${d.letter ? ' (ответ ' + d.letter.from + ')' : ''} ---\n${s.write || '—'}\n\n--- Говорение (диктовка) ---\n${s.speak || '—'}\n\n--- Трудно / выписал ---\n${s.hard || '—'}\n\nПовторение: к повтору ${dueList().length}` + (planReport() ? `\n\n${planReport()}` : '');
    copyText(txt, document.getElementById('copied'));
  };
}

export function register() {
  route(/^days$/, () => archive());
  route(/^days\/(\d{4})$/, y => archive(y));
  route(/^days\/(\d{4})\/(\d{2})$/, month);
  route(/^days\/(\d{4})-(\d{2})$/, (y, m) => location.replace(`#/days/${y}/${m}`)); // старые ссылки
  route(/^day\/(\d{4}-\d{2}-\d{2})$/, dayPage);
  route(/^day$/, () => latest() ? location.replace('#/day/' + latest().id) : archive());
}
