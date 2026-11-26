/* Модули дня, архив по месяцам, повторение (SRS), прогресс, план.
   Новый день = файл days/ГГГГ-ММ/ДД.js и одна строка в index.html. Этот файл менять не нужно.
   Формат дня:
   DAYS.push({ id:'2026-11-26', date:'2026-11-26', title, focus,
     related:['to-be/need', 'present-simple'],    // тема или тема/модуль из грамматики
     review:`разбор ошибок`, theory:`html`,
     phrases:[{en, ru, note}],                     // выучить: уходят в повторение
     translate:[{ru, a:['вариант 1','вариант 2'], note}],  // новые предложения, не из теории
     letter:{from, text, gloss:[[en, ru]]}, speak:{task, plan}, write:{task, words}, think:`html` }) */
(function () {
const KEY = 'eng-days-v1', TKEY = 'eng-tests-v1', DAY = 864e5, STEPS = [1, 3, 7, 16, 35, 90], LEARNED = 3;
const MON = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const MONG = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
let D = { days: {}, srs: {} };
try { D = Object.assign(D, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
if (D.days.d01 && !D.days['2026-11-26']) { D.days['2026-11-26'] = D.days.d01; delete D.days.d01; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) {} };
const T = () => { try { return Object.assign({ mods: {}, q: {}, exam: {} }, JSON.parse(localStorage.getItem(TKEY) || '{}')); } catch (e) { return { mods: {}, q: {}, exam: {} }; } };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return +d; };
const DAYS = (window.DAYS || []).slice().sort((a, b) => a.date < b.date ? -1 : 1), DECK = window.DECK || [];
const ERRORS = window.ERRORS || [], SNAPSHOTS = window.SNAPSHOTS || [], TOPICS = window.TOPICS || [];
const dd = s => { const [y, m, d] = s.split('-'); return { y, m: +m, d: +d }; };
const dayName = s => { const x = dd(s); return x.d + ' ' + MONG[x.m - 1]; };
const monKey = s => s.slice(0, 7), monName = k => MON[+k.slice(5) - 1] + ' ' + k.slice(0, 4);
const ds = id => D.days[id];
const badge = id => { const s = ds(id); return s && s.done ? '<span class="badge ok">✓ сделан</span>' : `<span class="badge">${s ? 'начат' : 'не начат'}</span>`; };

/* ---------- озвучка ---------- */
let voice = null;
const pickVoice = () => { const v = speechSynthesis.getVoices().filter(x => /^en/i.test(x.lang)); voice = v.find(x => /en-US/i.test(x.lang) && /natural|online/i.test(x.name)) || v.find(x => /en-US/i.test(x.lang)) || v[0] || null; };
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function say(t, slow) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t);
  u.lang = 'en-US'; if (voice) u.voice = voice; u.rate = slow ? .7 : .95; speechSynthesis.speak(u);
}
const sayBtns = t => `<button class="ico" data-say="${esc(t)}" title="Послушать">🔊</button><button class="ico" data-say="${esc(t)}" data-slow="1" title="Медленно">🐢</button>`;
const wireSay = root => root.querySelectorAll('[data-say]').forEach(b => b.onclick = () => say(b.dataset.say, b.dataset.slow));

/* ---------- сравнение ответа ---------- */
const CON = { "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "that's": 'that is', "what's": 'what is', "there's": 'there is', "don't": 'do not', "doesn't": 'does not', "isn't": 'is not', "aren't": 'are not', "can't": 'cannot', "i've": 'i have', "let's": 'let us', "i'd": 'i would', "won't": 'will not' };
const norm = s => s.toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim()
  .split(' ').map(w => CON[w] || w).join(' ').replace(/\bcan not\b/g, 'cannot');
function diff(user, model) {
  const a = user.trim().split(/\s+/).filter(Boolean), b = model.trim().split(/\s+/), k = w => norm(w);
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

/* ---------- повторение (SRS) ---------- */
const cards = () => {
  const m = new Map();
  DECK.forEach(c => m.set(c.en, Object.assign({ src: 'Из твоих отчётов' }, c)));
  DAYS.forEach(d => (d.phrases || []).forEach(c => m.set(c.en, Object.assign({ src: dayName(d.date) + ' · ' + d.title }, c))));
  return m;
};
function enroll(list, when) { list.forEach(c => { if (!D.srs[c.en]) D.srs[c.en] = { b: 0, due: when, l: 0, n: 0 }; }); save(); }
enroll(DECK, today());
const dueList = () => { const t = today(), m = cards(); return Object.keys(D.srs).filter(k => m.has(k) && D.srs[k].due <= t).map(k => m.get(k)); };
function grade(en, g) {
  const r = D.srs[en]; if (!r) return;
  r.n = (r.n || 0) + 1;
  if (g === 0) { r.b = 0; r.l = (r.l || 0) + 1; } else if (g === 2) r.b = Math.min(r.b + 1, STEPS.length - 1);
  r.due = today() + (g === 0 ? 0 : STEPS[r.b]) * DAY; save();
}

/* ---------- связи с грамматикой ---------- */
function ref(r) { // 'topic' или 'topic/module'
  const [tid, mid] = r.split('/'), t = TOPICS.find(x => x.id === tid); if (!t) return null;
  const m = mid && t.modules.find(x => x.id === mid); if (mid && !m) return null;
  return { t, m };
}
function refRow(r, n) {
  const x = ref(r); if (!x) return '';
  const S = T();
  if (x.m) {
    const b = S.mods[x.t.id + '/' + x.m.id];
    return `<a class="row" href="#/${x.t.id}/${x.m.id}"><span class="num">${n}</span><span><b>${esc(x.t.title)}: ${x.m.title.replace(/\[|\]/g, '')}</b><small>${esc(x.m.desc)} · теория + тест</small></span><span class="badge ${b >= 85 ? 'ok' : ''}">${b == null ? 'не пройден' : b + '%'}</span></a>`;
  }
  const qs = x.t.modules.reduce((a, m) => a.concat(m.questions), []), k = qs.filter(q => ((S.q[x.t.id + '|' + q.q + '|' + q.a] || {}).s || 0) >= 3).length;
  return `<a class="row" href="#/${x.t.id}"><span class="num">${n}</span><span><b>${esc(x.t.title)}</b><small>вся тема</small></span><span class="badge">${k} из ${qs.length}</span></a>`;
}
function backlinks(tid) { // какие модули дня ссылаются на тему
  const ds = DAYS.filter(d => (d.related || []).some(r => r.split('/')[0] === tid));
  return ds.length ? `<h2>Где встречалось в модулях дня</h2><div class="list">` + ds.map(d => `<a class="row" href="#/day/${d.id}"><span class="num">☀</span><span><b>${dayName(d.date)} · ${esc(d.title)}</b><small>${esc(d.focus)}</small></span>${badge(d.id)}</a>`).join('') + '</div>' : '';
}

/* ---------- главная ---------- */
function home() {
  const last = DAYS[DAYS.length - 1], due = dueList().length, total = Object.keys(D.srs).length;
  const months = [...new Set(DAYS.map(d => monKey(d.date)))].reverse();
  return `<h1>Сегодня</h1>${planWidget()}<div class="list">
  ${last ? `<a class="row" href="#/day/${last.id}"><span class="num">☀</span><span><b>${dayName(last.date)} · ${esc(last.title)}</b><small>${esc(last.focus)}</small></span>${badge(last.id)}</a>` : ''}
  <a class="row" href="#/review"><span class="num">↻</span><span><b>Повторение фраз</b><small>Каждый день первым делом, 5–10 минут</small></span><span class="badge ${due ? '' : 'ok'}">${due ? 'к повтору: ' + due : 'всё повторено'}</span></a>
  <a class="row" href="#/progress"><span class="num">↗</span><span><b>Мой прогресс</b><small>Ошибки, которые уходят, выученные фразы, точность перевода, срезы</small></span><span class="badge">фраз: ${total}</span></a>
  <a class="row" href="#/plan"><span class="num">◎</span><span><b>Система и план до B2</b><small>Как распределять час, недельный ритм, маршрут, что учить наизусть</small></span><span></span></a>
  </div>
  <h1 class="h1gap">Модули дня</h1><div class="list">` + months.map(k => { const ds = DAYS.filter(d => monKey(d.date) === k), dn = ds.filter(d => (ds && D.days[d.id] || {}).done).length;
    return `<a class="row" href="#/days/${k}"><span class="num">🗀</span><span><b>${monName(k)}</b><small>${ds.length} модул${ds.length % 10 === 1 && ds.length !== 11 ? 'ь' : ds.length % 10 > 1 && ds.length % 10 < 5 && (ds.length < 10 || ds.length > 20) ? 'я' : 'ей'} · последний: ${dayName(ds[ds.length - 1].date)}</small></span><span class="badge ${dn === ds.length ? 'ok' : ''}">сделано ${dn} из ${ds.length}</span></a>`; }).join('') + `</div>
  <h1 class="h1gap">Грамматика</h1>`;
}
function month(k, show, link) {
  const ds = DAYS.filter(d => monKey(d.date) === k);
  show(`<h1>${monName(k)}</h1><p class="mute">Модули дня по числам. Новые сверху.</p><div class="list">` + ds.slice().reverse().map(d => `<a class="row" href="#/day/${d.id}"><span class="num">${dd(d.date).d}</span><span><b>${esc(d.title)}</b><small>${esc(d.focus)}</small></span>${badge(d.id)}</a>`).join('') + '</div>',
    link('#/', 'Главная') + ' / ' + monName(k));
}

/* ---------- модуль дня ---------- */
function dayPage(d, show, link) {
  const s = D.days[d.id] || (D.days[d.id] = { tr: {}, speak: '', write: '', hard: '', min: '' }); save();
  enroll(d.phrases || [], today() + DAY);
  const parts = []; let n = 0;
  const sec = (id, t, tag, body) => { parts.push({ id, t, tag, html: `<section class="sec" id="s-${id}"><h2><span class="sn">${++n}</span>${t}<span class="tag">${tag}</span></h2>${body}</section>` }); };
  const due = dueList().length;
  sec('rev', 'Повторение фраз', 'вспомнить', `<button class="ico gbtn" data-guide="srs">? как делать</button><p>${due ? `Сегодня к повтору <b>${due}</b>. Сделай их первыми, пока свежая голова.` : 'На сегодня всё повторено.'}</p><div class="btns sm"><a class="btn ${due ? '' : 'alt'}" href="#/review">Открыть повторение</a></div>`);
  if (d.review) sec('err', 'Разбор твоих ошибок', 'понять', d.review);
  if (d.theory) sec('th', 'Грамматика дня', 'понять',
    `<button class="ico gbtn" data-guide="grammar">? как делать</button>` + d.theory + ((d.related || []).length ? `<h2>Закрепи тестами</h2><p class="mute">В тестах другие предложения, чем в теории: они проверяют, что ты понял правило, а не запомнил пример. Зачёт: 85%.</p><div class="list">${d.related.map((r, i) => refRow(r, i + 1)).join('')}</div>` : ''));
  if (d.phrases) sec('ph', 'Фразы дня', 'выучить', `<p class="mute">Послушай каждую, повтори вслух 3 раза с той же интонацией. Специально не зубри: с завтрашнего дня они будут приходить в повторение, и выучатся сами.</p><table class="ex ph">` +
    d.phrases.map(p => `<tr><td><b>${esc(p.en)}</b>${p.note ? `<small class="mute">${p.note}</small>` : ''}</td><td>${esc(p.ru)}</td><td class="say">${sayBtns(p.en)}</td></tr>`).join('') + '</table>');
  if (d.translate) sec('tr', 'Переведи сам', 'применить', `<p class="mute">Предложения новые, их не было ни в теории, ни во фразах. Пиши по-английски без подсказок. Enter = проверить. Если написал по-другому, но уверен, что верно, отметь это, а я проверю в отчёте.</p>` +
    d.translate.map((t, i) => `<div class="tr" data-i="${i}"><p class="trq"><span class="mute">${i + 1}.</span> ${esc(t.ru)}</p><div class="trrow"><input class="inp" autocomplete="off" spellcheck="false" value="${esc((s.tr[i] || {}).v || '')}"><button class="btn alt chk">Проверить</button></div><div class="trfb"></div></div>`).join(''));
  if (d.letter) sec('let', 'Письмо от ' + esc(d.letter.from), 'читать', `<p class="mute">Mr. X это вымышленный собеседник, с которым ты переписываешься. Прочитай письмо вслух. Сначала попробуй понять без словарика.</p>
    <div class="letter">${esc(d.letter.text).replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>').replace(/^/, '<p>')}</p><div class="btns sm">${sayBtns(d.letter.text)}</div></div>
    ${d.letter.gloss ? `<details><summary>Словарик к письму</summary><table class="ex">${d.letter.gloss.map(g => `<tr><td><b>${esc(g[0])}</b></td><td>${esc(g[1])}</td></tr>`).join('')}</table></details>` : ''}`);
  if (d.write) sec('wr', 'Письмо', 'писать', `<button class="ico gbtn" data-guide="writing">? как делать</button><p><b>${d.write.task}</b></p>${d.write.words ? `<p class="mute">Используй минимум 3: ${d.write.words.map(esc).join(' · ')}</p>` : ''}
    <p class="mute">Без переводчика. Не знаешь слово, напиши его по-русски в скобках, я подскажу.</p><textarea class="ta" id="write" rows="8" placeholder="Hi X, …">${esc(s.write)}</textarea>`);
  if (d.speak) sec('sp', 'Говорение', 'говорить', `<button class="ico gbtn" data-guide="speaking">? как делать</button><p><b>${d.speak.task}</b></p>${d.speak.plan ? '<ol class="alg">' + d.speak.plan.map(x => `<li>${x}</li>`).join('') + '</ol>' : ''}
    <div class="rule"><b>Как:</b> 1) подумай 1 минуту, без записей на русском; 2) нажми в поле ниже и включи диктовку <kbd>Win</kbd>+<kbd>H</kbd>; 3) говори 1–2 минуты без остановок, ошибки не исправляй; 4) текст после диктовки не редактируй: мне нужно, как ты сказал на самом деле.</div>
    <textarea class="ta" id="speak" rows="6" placeholder="Здесь появится текст диктовки…">${esc(s.speak)}</textarea>`);
  if (d.think) sec('th2', 'Думать на английском сегодня', 'привычка', d.think);
  sec('rep', 'Отчёт для Claude', 'отправить', `<p class="mute">Скопируй и пришли мне в чат. Я разберу ошибки, и завтрашний модуль соберу из них.</p>
    <div class="trrow"><label class="mute" style="white-space:nowrap" for="min">Минут сегодня всего</label><input class="inp" id="min" inputmode="numeric" style="max-width:110px" value="${esc(s.min)}"></div>
    <textarea class="ta" id="hard" rows="3" placeholder="Что было трудно или непонятно? Что выписал из мультика или shadowing? (можно по-русски)">${esc(s.hard)}</textarea>
    <div class="btns"><button class="btn" id="copy">Скопировать отчёт</button><button class="btn alt" id="done">${s.done ? '✓ Модуль сделан' : 'Отметить модуль сделанным'}</button></div><p class="mute" id="copied" aria-live="polite"></p>`);

  const toc = `<nav class="toc">${parts.map((p, i) => `<a href="javascript:void 0" data-to="s-${p.id}"><span>${i + 1}</span>${p.t.replace(/<[^>]+>/g, '')}</a>`).join('')}</nav>`;
  show(`<p class="mute">${dayName(d.date)} · модуль дня</p><h1>${esc(d.title)}</h1><p class="mute">${esc(d.focus)}</p>${toc}${parts.map(p => p.html).join('')}`,
    link('#/', 'Главная') + ' / ' + link('#/days/' + monKey(d.date), monName(monKey(d.date))) + ' / ' + dayName(d.date));
  const app = document.getElementById('app');
  wireSay(app); wire();
  app.querySelectorAll('[data-to]').forEach(a => a.onclick = () => document.getElementById(a.dataset.to).scrollIntoView({ behavior: 'smooth' }));

  app.querySelectorAll('.tr').forEach(box => {
    const i = +box.dataset.i, t = d.translate[i], inp = box.querySelector('.inp'), fb = box.querySelector('.trfb');
    const render = () => {
      const r = s.tr[i]; if (!r || r.ok == null) { fb.innerHTML = ''; return; }
      const best = t.a[0];
      fb.innerHTML = r.ok === true
        ? `<div class="why ok"><b class="h">${r.self ? 'Отмечено как верное: проверю в отчёте' : 'Верно'}</b>${esc(best)} ${sayBtns(best)}${t.note ? `<p class="mute">${t.note}</p>` : ''}</div>`
        : `<div class="why bad"><b class="h">Сравни с образцом</b><p class="df">${diff(r.v, best)}</p>${t.a.length > 1 ? `<p class="mute">Тоже верно: ${t.a.slice(1).map(esc).join(' / ')}</p>` : ''}${t.note ? `<p>${t.note}</p>` : ''}${sayBtns(best)}
           <div class="btns sm"><button class="btn alt mine">Мой вариант тоже верный</button><button class="btn alt redo">Написать заново</button></div></div>`;
      wireSay(fb);
      const m = fb.querySelector('.mine'); if (m) m.onclick = () => { r.ok = true; r.self = true; save(); render(); };
      const rd = fb.querySelector('.redo'); if (rd) rd.onclick = () => { r.ok = null; save(); inp.value = ''; inp.focus(); render(); };
    };
    const check = () => {
      const v = inp.value.trim(); if (!v) return;
      const ok = t.a.some(x => norm(x) === norm(v)), p = s.tr[i];
      s.tr[i] = p && p.first ? Object.assign(p, { v, ok, self: false }) : { v, ok, first: v, fo: ok };
      save(); render();
    };
    box.querySelector('.chk').onclick = check;
    inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); check(); } };
    render();
  });
  ['speak', 'write', 'hard', 'min'].forEach(id => { const el = document.getElementById(id); if (el) el.oninput = () => { s[id] = el.value; save(); }; });
  document.getElementById('done').onclick = e => { s.done = !s.done; save(); e.target.textContent = s.done ? '✓ Модуль сделан' : 'Отметить модуль сделанным'; };
  document.getElementById('copy').onclick = () => {
    const S = T();
    const tr = (d.translate || []).map((t, i) => { const r = s.tr[i] || {}; return `${i + 1}. ${t.ru}\n   первый ответ: ${r.first || '—'}${r.v && r.v !== r.first ? `\n   финальный: ${r.v}` : ''}  [${r.fo ? 'совпало сразу' : r.ok === true ? (r.self ? 'считаю верным' : 'исправил') : r.ok === false ? 'не совпало' : 'не делал'}]`; }).join('\n');
    const tests = (d.related || []).map(r => { const x = ref(r); return x && x.m ? `${x.t.title} / ${x.m.title.replace(/\[|\]/g, '')}: ${S.mods[x.t.id + '/' + x.m.id] == null ? 'не проходил' : S.mods[x.t.id + '/' + x.m.id] + '%'}` : ''; }).filter(Boolean).join('\n');
    const txt = `=== Модуль дня ${d.date} · ${d.title} ===\nМинут всего: ${s.min || '?'}\n\n--- Перевод ---\n${tr}\n\n--- Тесты ---\n${tests || '—'}\n\n--- Письмо (ответ ${d.letter ? d.letter.from : ''}) ---\n${s.write || '—'}\n\n--- Говорение (диктовка) ---\n${s.speak || '—'}\n\n--- Трудно / выписал ---\n${s.hard || '—'}\n\nПовторение: к повтору ${dueList().length}, всего карточек ${Object.keys(D.srs).length}`;
    copyText(txt);
  };
}
function copyText(txt) {
  const msg = document.getElementById('copied'), ok = () => msg.textContent = 'Скопировано. Вставь в чат с Claude.';
  const fallback = () => { const t = document.createElement('textarea'); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); ok(); } catch (e) { msg.textContent = 'Не удалось скопировать, выдели текст вручную.'; } t.remove(); };
  if (navigator.clipboard && window.isSecureContext !== false) navigator.clipboard.writeText(txt).then(ok, fallback); else fallback();
}

/* ---------- повторение ---------- */
function review(show, link) {
  const queue = dueList().sort(() => Math.random() - .5); let done = 0, again = 0;
  const cr = link('#/', 'Главная') + ' / повторение';
  function next() {
    const c = queue.shift();
    if (!c) return show(`<h1>${done ? 'Повторение окончено' : 'Нечего повторять'}</h1><p class="mute">${done ? `Карточек: ${done}, из них пришлось повторить ещё раз: ${again}.` : 'Все карточки повторены. Новые появятся завтра.'}</p><div class="btns"><a class="btn" href="#/">На главную</a></div>`, cr);
    show(`<div class="meta"><span>Осталось: ${queue.length + 1}</span><span>${esc(c.src)}</span></div><div class="bar"><i style="width:${done / (done + queue.length + 1) * 100}%"></i></div>
      <p class="mute">Скажи вслух по-английски, потом напиши:</p><p class="q">${esc(c.ru)}</p>
      <div class="trrow"><input class="inp" id="ri" autocomplete="off" spellcheck="false" placeholder="Enter = показать ответ"><button class="btn" id="rv">Показать</button></div><div id="rfb"></div>`, cr);
    const inp = document.getElementById('ri'), fb = document.getElementById('rfb'); inp.focus();
    const reveal = () => {
      const v = inp.value.trim(), ok = v && norm(v) === norm(c.en);
      inp.disabled = true; document.getElementById('rv').remove(); say(c.en);
      fb.innerHTML = `<div class="why ${ok ? 'ok' : ''}"><b class="h">${ok ? 'Точно' : 'Ответ'}</b><p class="df">${v && !ok ? diff(v, c.en) : esc(c.en)}</p>${c.note ? `<p class="mute">${c.note}</p>` : ''}${sayBtns(c.en)}</div>
        <p class="mute">Как вспомнил? Клавиши 1 / 2 / 3</p><div class="btns"><button class="btn alt g" data-g="0">1 · Не вспомнил</button><button class="btn alt g" data-g="1">2 · С трудом</button><button class="btn g" data-g="2">3 · Легко</button></div>`;
      wireSay(fb);
      const go = g => { document.onkeydown = null; grade(c.en, g); done++; if (g === 0) { again++; queue.splice(Math.min(4, queue.length), 0, c); } next(); };
      fb.querySelectorAll('.g').forEach(b => b.onclick = () => go(+b.dataset.g));
      document.onkeydown = e => { if (/^[123]$/.test(e.key)) { e.preventDefault(); go(e.key - 1); } };
    };
    document.getElementById('rv').onclick = reveal;
    inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); reveal(); } };
  }
  next();
}

/* ---------- прогресс ---------- */
function progress(show, link) {
  const S = T(), m = cards();
  // дни и серия
  const doneDays = DAYS.filter(d => (D.days[d.id] || {}).done);
  const mins = DAYS.reduce((a, d) => a + (parseInt((D.days[d.id] || {}).min) || 0), 0);
  // фразы
  const all = Object.keys(D.srs).filter(k => m.has(k)), learned = all.filter(k => D.srs[k].b >= LEARNED), fresh = all.filter(k => !D.srs[k].n);
  const hard = all.filter(k => (D.srs[k].l || 0) >= 2).sort((a, b) => D.srs[b].l - D.srs[a].l);
  // перевод с первой попытки по дням
  const acc = DAYS.map(d => { const tr = (D.days[d.id] || {}).tr || {}, v = Object.values(tr).filter(x => x.first); return { d, n: v.length, ok: v.filter(x => x.fo).length, total: (d.translate || []).length }; }).filter(x => x.n);
  // ошибки
  const st = e => { const last = e.seen[e.seen.length - 1] || '', after = e.clean.filter(c => c > last).length; return after >= 3 ? ['побеждена', 'ok'] : after >= 1 ? ['уходит', 'mid'] : ['активна', 'bad']; };
  const errs = ERRORS.slice().sort((a, b) => ({ bad: 0, mid: 1, ok: 2 })[st(a)[1]] - ({ bad: 0, mid: 1, ok: 2 })[st(b)[1]]);
  const topicRow = t => { const qs = t.modules.reduce((a, x) => a.concat(x.questions), []), k = qs.filter(q => ((S.q[t.id + '|' + q.q + '|' + q.a] || {}).s || 0) >= 3).length, mp = t.modules.filter(x => S.mods[t.id + '/' + x.id] >= 85).length;
    return `<tr><td><a href="#/${t.id}">${esc(t.title)}</a></td><td>модулей сдано ${mp} из ${t.modules.length} · на автомате ${k} из ${qs.length}${S.exam[t.id] != null ? ` · экзамен ${S.exam[t.id]}%` : ''}</td></tr>`; };

  show(`<h1>Мой прогресс</h1>
  <div class="rule"><b>Как понять, что прогресс есть.</b> Смотри на три вещи, а не на количество новых слов:
  <ol class="alg"><li><b>Ошибки уходят.</b> Список «активных» ошибок короче, «побеждённых» больше.</li>
  <li><b>Перевод с первой попытки растёт.</b> Например, было 50%, через месяц на новых темах стало 70% и выше.</li>
  <li><b>Срезы раз в месяц:</b> меньше ошибок на 100 слов и длиннее текст за те же 2 минуты.</li></ol></div>

  <h2>Мои типичные ошибки</h2><p class="mute">Веду я после каждого отчёта. Ошибка побеждена, когда 3 отчёта подряд её нет там, где она могла быть.</p>
  <table class="ex errs">${errs.map(e => { const [t, c] = st(e), x = e.topic && ref(e.topic); return `<tr><td><b>${esc(e.title)}</b><small><s>${esc(e.bad)}</s> → ${esc(e.good)}</small></td><td><span class="pill ${c}">${t}</span><small class="mute">была: ${e.seen.length} раз${e.clean.length ? ` · чисто: ${e.clean.length}` : ''}</small>${x ? `<small><a href="#/${e.topic.replace('/', '/')}">тренировать →</a></small>` : ''}</td></tr>`; }).join('')}</table>

  <h2>Перевод с первой попытки</h2>
  ${acc.length ? `<table class="ex">${acc.map(a => `<tr><td>${dayName(a.d.date)} · ${esc(a.d.title)}</td><td><b>${Math.round(a.ok / a.n * 100)}%</b> <span class="mute">(${a.ok} из ${a.n}${a.n < a.total ? `, сделано ${a.n} из ${a.total}` : ''})</span></td></tr>`).join('')}</table>` : '<p class="mute">Пока нет данных: сделай раздел «Переведи сам» в модуле дня.</p>'}

  <h2>Фразы</h2>
  <table class="ex"><tr><td>Всего в повторении</td><td><b>${all.length}</b></td></tr>
  <tr><td>Выучено (держатся неделю и дольше)</td><td><b>${learned.length}</b></td></tr>
  <tr><td>В процессе</td><td>${all.length - learned.length - fresh.length}</td></tr><tr><td>Ещё ни разу не повторял</td><td>${fresh.length}</td></tr></table>
  ${hard.length ? `<p><b>Трудные фразы</b> (забывал 2 раза и больше). Я сделаю на них отдельные упражнения:</p><table class="ex">${hard.slice(0, 10).map(k => `<tr><td>${esc(k)}</td><td>${esc(m.get(k).ru)} · забыл ${D.srs[k].l}×</td></tr>`).join('')}</table>` : ''}

  <h2>Грамматика</h2><table class="ex">${TOPICS.map(topicRow).join('')}</table>

  <h2>Дисциплина</h2><table class="ex"><tr><td>Модулей дня сделано</td><td><b>${doneDays.length}</b> из ${DAYS.length}</td></tr><tr><td>Минут (по отчётам модулей)</td><td>${mins}</td></tr></table>

  <h2>Контрольные срезы</h2><p class="mute">Раз в месяц одно и то же задание: 2 минуты о себе. Я считаю ошибки и оцениваю уровень.</p>
  <table class="ex">${SNAPSHOTS.map(x => `<tr><td><b>${dayName(x.date)} ${x.date.slice(0, 4)}</b><small class="mute">${esc(x.what)}</small></td><td>уровень <b>${esc(x.level)}</b> · ${x.words} слов · <b>${x.err100}</b> ошибок на 100 слов · опечаток ${x.typos}<small class="mute">${esc(x.note)}</small></td></tr>`).join('')}</table>`,
    link('#/', 'Главная') + ' / прогресс');
}

/* ---------- план недели и подсказки ---------- */
const WEEK = window.WEEK || [], GUIDES = window.GUIDES || {}, WD = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const monday = (d = new Date()) => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - (x.getDay() + 6) % 7); return x; };
const fixHref = h => h === '#/day/' ? (DAYS.length ? '#/day/' + DAYS[DAYS.length - 1].id : '#/') : h;
const pstate = k => (D.plan || (D.plan = {}))[k] || (D.plan[k] = { done: {}, min: false });
const blocksFor = (d, st) => st.min ? (window.WEEK_MIN_DAY || []) : (WEEK[d.getDay()] || { blocks: [] }).blocks;
const ratio = d => { const st = (D.plan || {})[iso(d)]; if (!st) return 0; const b = blocksFor(d, st); return b.length ? b.filter((_, i) => st.done[i]).length / b.length : 0; };

function planWidget() {
  const now = new Date(), k = iso(now), st = pstate(k), w = WEEK[now.getDay()]; if (!w) return '';
  const bl = blocksFor(now, st), tot = bl.reduce((a, b) => a + b.min, 0), dn = bl.reduce((a, b, i) => a + (st.done[i] ? b.min : 0), 0);
  const mon = monday(now);
  const strip = Array.from({ length: 7 }, (_, i) => { const d = new Date(mon); d.setDate(mon.getDate() + i); const r = ratio(d), wk = WEEK[d.getDay()], cur = iso(d) === k, past = d < now && !cur && DAYS.length && iso(d) >= DAYS[0].date;
    return `<a class="wd ${cur ? 'cur' : ''} ${r === 1 ? 'full' : r > 0 ? 'part' : past ? 'miss' : ''}" href="#/week"><b>${WD[d.getDay()]}</b><small>${esc(wk.theme)}</small><i style="width:${r * 100}%"></i></a>`; }).join('');
  return `<div class="plan-w">
    <div class="pw-head"><div><b>${esc(w.name)} · ${esc(st.min ? 'Минимум (тяжёлый день)' : w.theme)}</b><small class="mute">${st.min ? 'Пропуск хуже короткого дня. Сделай хотя бы это.' : esc(w.note)}</small></div><span class="badge ${dn === tot ? 'ok' : ''}">${dn} / ${tot} мин</span></div>
    <div class="pw-list">${bl.map((b, i) => `<div class="pb ${st.done[i] ? 'on' : ''}"><label><input type="checkbox" data-pb="${i}" ${st.done[i] ? 'checked' : ''}><span class="pm">${b.min}′</span><span><b>${esc(b.t)}</b>${b.d ? `<small>${esc(b.d)}</small>` : ''}</span></label><span class="pa">${b.href ? `<a class="ico" href="${fixHref(b.href)}" title="Открыть">→</a>` : ''}${b.g ? `<button class="ico" data-guide="${b.g}" title="Как делать правильно">?</button>` : ''}</span></div>`).join('')}</div>
    <div class="pw-foot"><button class="lnk" id="pmin">${st.min ? '← вернуть полный план' : 'Тяжёлый день? Переключить на минимум (30 мин)'}</button><a class="lnk" href="#/week">План недели и подсказки →</a></div>
    <div class="wstrip">${strip}</div></div>`;
}
function wire() {
  const k = iso(new Date());
  document.querySelectorAll('[data-pb]').forEach(c => c.onchange = () => { const st = pstate(k); st.done[c.dataset.pb] = c.checked; save(); route(); });
  const m = document.getElementById('pmin'); if (m) m.onclick = () => { const st = pstate(k); st.min = !st.min; st.done = {}; save(); route(); };
  document.querySelectorAll('[data-guide]').forEach(b => b.onclick = e => { e.preventDefault(); openGuide(b.dataset.guide); });
}
const route = () => dispatchEvent(new HashChangeEvent('hashchange'));
function guideHtml(id) {
  const g = GUIDES[id]; if (!g) return '';
  const ul = (t, a) => a && a.length ? `<h3>${t}</h3><ul>${a.map(x => `<li>${x}</li>`).join('')}</ul>` : '';
  return `<h2>${esc(g.title)}</h2><p>${g.intro}</p><h3>Механика</h3><div class="steps">${g.steps.map(x => `<p>${x}</p>`).join('')}</div>${ul('Что записывать', g.write)}${ul('Что и когда повторять', g.repeat)}${ul('Как проверить себя', g.check)}${g.bad ? `<div class="trap"><b>Частые ошибки</b><ul>${g.bad.map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}`;
}
function openGuide(id) {
  let dlg = document.getElementById('gdlg');
  if (!dlg) { dlg = document.createElement('dialog'); dlg.id = 'gdlg'; dlg.className = 'gdlg'; document.body.appendChild(dlg); dlg.onclick = e => { if (e.target === dlg) dlg.close(); }; }
  dlg.innerHTML = `<button class="ico gx" title="Закрыть">✕</button>${guideHtml(id)}`;
  dlg.querySelector('.gx').onclick = () => dlg.close();
  dlg.showModal(); dlg.scrollTop = 0;
}
function weekPage(show, link) {
  const now = new Date(), mon = monday(now), wk = iso(mon), R = (D.retro || (D.retro = {}))[wk] || (D.retro[wk] = {});
  const order = [1, 2, 3, 4, 5, 6, 0];
  const days = order.map(i => { const w = WEEK[i], d = new Date(mon); d.setDate(mon.getDate() + (i + 6) % 7); const tot = w.blocks.reduce((a, b) => a + b.min, 0), cur = i === now.getDay();
    return `<details class="wkd ${cur ? 'cur' : ''}" ${cur ? 'open' : ''}><summary><b>${w.name}</b> · ${esc(w.theme)} <span class="mute">· ${tot} мин${ratio(d) ? ` · сделано ${Math.round(ratio(d) * 100)}%` : ''}</span></summary><p class="mute">${esc(w.note)}</p>
      <table class="ex">${w.blocks.map(b => `<tr><td><b>${b.min}′ ${esc(b.t)}</b><small class="mute">${esc(b.d || '')}</small></td><td style="width:1%;white-space:nowrap">${b.g ? `<button class="ico" data-guide="${b.g}">? как</button>` : ''}</td></tr>`).join('')}</table></details>`; }).join('');
  const total = order.reduce((a, i) => a + WEEK[i].blocks.reduce((x, b) => x + b.min, 0), 0);
  show(`<h1>План недели</h1><p class="mute">Около ${Math.round(total / 60)} часов в неделю. Основа каждый будний день одна и та же: повторение, модуль дня, Mr. X (50 мин). Меняется вторая половина: слушание, чтение, грамматика, говорение, погружение.</p>
    ${days}
    <h2>Подсказки: как делать правильно</h2><div class="glist">${Object.keys(GUIDES).map(id => `<button class="gcard" data-guide="${id}"><b>${esc(GUIDES[id].title)}</b><small>${esc(GUIDES[id].short)}</small></button>`).join('')}</div>
    <h2>Самоанализ недели <span class="mute" style="font-size:16px;font-weight:400">· неделя с ${dayName(wk)}</span></h2><p class="mute">Заполняй в воскресенье, цифры бери со страницы <a href="#/progress">прогресса</a>. Потом скопируй и пришли мне.</p>
    ${(window.RETRO_Q || []).map((q, i) => `<p class="trq">${i + 1}. ${esc(q)}</p><textarea class="ta" rows="2" data-rq="${i}">${esc(R[i] || '')}</textarea>`).join('')}
    <div class="btns"><button class="btn" id="rcopy">Скопировать самоанализ</button></div><p class="mute" id="copied" aria-live="polite"></p>`,
    link('#/', 'Главная') + ' / план недели');
  wire();
  document.querySelectorAll('[data-rq]').forEach(t => t.oninput = () => { R[t.dataset.rq] = t.value; save(); });
  document.getElementById('rcopy').onclick = () => copyText(`=== Самоанализ недели с ${dayName(wk)} ===\n` + (window.RETRO_Q || []).map((q, i) => `${i + 1}. ${q}\n   ${R[i] || '—'}`).join('\n'));
}

window.DAYUI = {
  home, backlinks, wire,
  route(tid, mid, show, link) {
    document.onkeydown = null; if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (tid === 'day') { const d = DAYS.find(x => x.id === mid) || DAYS[DAYS.length - 1]; if (d) { dayPage(d, show, link); return true; } }
    if (tid === 'days') { const k = mid || (DAYS.length && monKey(DAYS[DAYS.length - 1].date)); if (k) { month(k, show, link); return true; } }
    if (tid === 'review') { review(show, link); return true; }
    if (tid === 'week') { weekPage(show, link); return true; }
    if (tid === 'guide' && GUIDES[mid]) { show(`<div class="sec">${guideHtml(mid)}</div>`, link('#/', 'Главная') + ' / ' + link('#/week', 'план недели')); return true; }
    if (tid === 'progress') { progress(show, link); return true; }
    if (tid === 'plan' && window.PLAN) { show(window.PLAN, link('#/', 'Главная') + ' / система'); return true; }
    return false;
  }
};
})();
