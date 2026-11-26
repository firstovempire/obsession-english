/* Грамматика: каталог по уровням, тема, теория модуля, тест, тренажёр автоматизма, экзамен. */
import { S, save, CAT, loadModule, route, show, crumbs, link, esc, fmt, tag, cls, plain, loading, onLeave, dayName } from './core.js';

export const PASS = 85, MASTER = 3;
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const T = () => S.tests;
const isM = q => ((T().q[q.id] || {}).s || 0) >= MASTER;

/* мастерство по теме без загрузки файла: по ключам «тема|вопрос|ответ» */
export function mastery(entry) {
  const pre = entry.id + '|'; let k = 0;
  for (const key in T().q) if (key.startsWith(pre) && T().q[key].s >= MASTER) k++;
  return Math.min(k, entry.total || 0);
}
export const modScore = (tid, mid) => T().mods[tid + '/' + mid];
export const topicEntry = id => CAT.grammar.find(t => t.id === id && t.ready);

async function getTopic(id) {
  const e = topicEntry(id); if (!e) return null;
  const t = (await loadModule(e.file)).default;
  if (!t._ready) {
    t.modules.forEach(m => m.questions.forEach(q => { q.id = t.id + '|' + q.q + '|' + q.a; q.keys = Object.keys(q.w); q.long = q.keys.some(k => k.length > 8); }));
    t._ready = true;
  }
  return t;
}
const all = t => t.modules.reduce((r, m) => r.concat(m.questions), []);
const nm = x => cls(x) ? tag(x) : `«${x}»`;
const label = x => x === '—' ? tag('—') + ' <small class="mute">ничего</small>' : tag(x);
const gap = q => fmt(q.q).replace(/___/g, '<span class="gap">&nbsp;</span>');
function fill(q) {
  const i = q.q.indexOf('___');
  if (i < 0) return gap(q);
  const pre = q.q.slice(0, i), start = /(^|[.!?]\s+|– )$/.test(pre);
  let post = q.q.slice(i + 3), ans = q.a;
  if (start) { if (ans === '—') post = post.replace(/[a-z]/, c => c.toUpperCase()); else ans = ans[0].toUpperCase() + ans.slice(1); }
  return fmt(pre) + (cls(ans) ? tag(ans) : `<span class="ar ar-a">${ans}</span>`) + fmt(post);
}
function record(q, ok, fast) {
  const r = T().q[q.id] || (T().q[q.id] = { s: 0, w: 0 });
  if (!ok) { r.s = 0; r.w++; } else if (fast) r.s = Math.min(r.s + 1, MASTER);
  save();
}
const G = (...p) => crumbs(['#/', 'Главная'], ['#/grammar', 'Грамматика'], ...p);

/* ---------- каталог ---------- */
function catalog() {
  const lv = CAT.levels.filter(l => CAT.grammar.some(t => t.level === l));
  show(`<h1>Грамматика</h1><p class="mute">Путь от A1 до B2. Серые темы появятся по плану, когда до них дойдём. В каждой теме: теория → тест (зачёт ${PASS}%) → тренажёр на скорость → экзамен.</p>` +
    lv.map(l => {
      const ts = CAT.grammar.filter(t => t.level === l), ready = ts.filter(t => t.ready).length;
      return `<h2 class="lvl"><span class="lv">${l}</span> <span class="mute">готово тем: ${ready} из ${ts.length}</span></h2>` +
        CAT.groups.filter(g => ts.some(t => t.group === g)).map(g => `<h3 class="grp">${g}</h3><div class="list">` + ts.filter(t => t.group === g).map(t => {
          if (!t.ready) return `<div class="row soon"><span class="num">${CAT.grammar.indexOf(t) + 1}</span><span><b>${esc(t.title)}</b><small>скоро</small></span><span></span></div>`;
          const k = mastery(t), pass = t.modules.filter(m => modScore(t.id, m.id) >= PASS).length;
          return `<a class="row" href="#/g/${t.id}"><span class="num">${CAT.grammar.indexOf(t) + 1}</span><span><b>${esc(t.title)}</b><small>${esc(t.desc)}</small></span><span class="badge ${k === t.total ? 'ok' : ''}">сдано ${pass}/${t.modules.length} · автомат ${k}/${t.total}</span></a>`;
        }).join('') + '</div>').join('');
    }).join(''), G());
}

/* ---------- тема ---------- */
async function topic(id) {
  loading(); const t = await getTopic(id); if (!t) return catalog();
  const qs = all(t), k = qs.filter(isM).length, ex = T().exam[t.id];
  const days = CAT.days.filter(d => d.related.some(r => r.split('/')[0] === t.id));
  show(`<p class="mute">${t.level} · ${esc(t.group)}</p><h1>${esc(t.title)}</h1><p class="mute">${esc(t.desc)}</p>
  <p>На автомате: <b>${k} из ${qs.length}</b></p><div class="bar"><i style="width:${k / qs.length * 100}%"></i></div>
  <h2>Модули</h2><div class="list">` + t.modules.map((m, i) => {
    const b = modScore(t.id, m.id);
    return `<a class="row" href="#/g/${t.id}/${m.id}"><span class="num">${i + 1}</span><span><b>${fmt(m.title)}</b><small>${m.desc}. Вопросов: ${m.questions.length}</small></span><span class="badge ${b >= PASS ? 'ok' : ''}">${b == null ? 'не пройден' : b >= PASS ? '✓ ' + b + '%' : b + '%, нужно ' + PASS + '%'}</span></a>`;
  }).join('') + `</div>
  <h2>Закрепление</h2><div class="list">
  <a class="row" href="#/g/${t.id}/drill"><span class="num">⚡</span><span><b>Тренажёр автоматизма</b><small>Все вопросы вперемешку на время. Ошибки возвращаются чаще. Вопрос закреплён после ${MASTER} быстрых верных ответов подряд</small></span><span></span></a>
  <a class="row" href="#/g/${t.id}/exam"><span class="num">★</span><span><b>Экзамен</b><small>25 случайных вопросов без повторов</small></span><span class="badge ${ex >= PASS ? 'ok' : ''}">${ex == null ? '' : 'лучший: ' + ex + '%'}</span></a></div>` +
  (days.length ? `<h2>Где встречалось в модулях дня</h2><div class="list">` + days.map(d => `<a class="row" href="#/day/${d.id}"><span class="num">☀</span><span><b>${dayName(d.date)} · ${esc(d.title)}</b><small>${esc(d.focus)}</small></span><span></span></a>`).join('') + '</div>' : ''),
  G([`#/g/${t.id}`, esc(t.title)]));
}

async function theory(id, mid) {
  loading(); const t = await getTopic(id); if (!t) return catalog();
  const m = t.modules.find(x => x.id === mid); if (!m) return topic(id);
  show(`<p class="mute">${esc(t.title)} · модуль ${t.modules.indexOf(m) + 1} из ${t.modules.length}</p><h1>${fmt(m.title)}</h1>${fmt(m.theory)}<div class="btns"><a class="btn" href="#/g/${t.id}/${m.id}/test">Начать тест</a><a class="btn alt" href="#/g/${t.id}">Все модули</a></div>`,
    G([`#/g/${t.id}`, esc(t.title)]));
}

/* ---------- тест / тренажёр / экзамен ---------- */
async function runner(id, mode, mid) {
  loading(); const t = await getTopic(id); if (!t) return catalog();
  const m = mid && t.modules.find(x => x.id === mid); if (mode === 'test' && !m) return topic(id);
  const base = mode === 'test' ? m.questions : all(t);
  const queue = mode === 'test' ? shuffle(base) : mode === 'exam' ? shuffle(base).slice(0, 25) : [];
  const total = queue.length, first = new Map(), last = [];
  let cur, opts, done = false, t0, raf, auto, streak = 0, n = 0, right = 0;
  const cr = G([`#/g/${t.id}`, esc(t.title)], m ? [`#/g/${t.id}/${m.id}`, 'теория'] : (mode === 'drill' ? 'тренажёр' : 'экзамен'));
  const stop = () => { clearTimeout(raf); clearTimeout(auto); };
  onLeave(stop);

  function pick() {
    if (mode !== 'drill') return queue.shift();
    const pool = base.filter(q => !last.includes(q.id));
    const wt = q => { const r = T().q[q.id]; return !r ? 3 : r.s >= MASTER ? .4 : r.w && r.s === 0 ? 8 : 4; };
    let x = Math.random() * pool.reduce((s, q) => s + wt(q), 0);
    for (const q of pool) { x -= wt(q); if (x <= 0) return q; }
    return pool[0];
  }
  const limit = q => 4 + (q.q + ' ' + (q.hint || '') + (q.long ? ' ' + q.keys.join(' ') : '')).split(/\s+/).length * .5;

  function next() {
    stop(); cur = pick(); if (!cur) return finish();
    done = false; n++; last.push(cur.id); if (last.length > Math.min(5, base.length - 1)) last.shift();
    opts = cur.long ? shuffle(cur.keys) : cur.keys;
    const mast = base.filter(isM).length;
    const prog = mode === 'drill' ? mast / base.length : mode === 'exam' ? (n - 1) / total : (total - new Set(queue.concat(cur)).size) / total;
    const left = mode === 'test' ? `Осталось: ${queue.length + 1}` : mode === 'exam' ? `Вопрос ${n} из ${total}` : `Закреплено: ${mast} из ${base.length}`;
    show(`<div class="meta"><span>${left}</span><span>${mode === 'drill' ? 'Серия: ' + streak : first.has(cur) ? 'Повтор ошибки' : ''}</span></div><div class="bar"><i style="width:${prog * 100}%"></i></div>
    ${mode === 'drill' && T().timer ? '<div class="bar time"><i id="tm" style="width:100%"></i></div>' : ''}
    <p class="q" id="qq">${gap(cur)}</p>${cur.hint ? `<p class="mute">${cur.hint}</p>` : ''}
    <div class="opts ${cur.long ? 'long' : ''}">${opts.map((o, i) => `<button class="opt" data-i="${i}"><kbd class="kb">${i + 1}</kbd><span>${label(o)}</span></button>`).join('')}</div>
    <div class="fb" id="fb" aria-live="polite"></div>
    ${mode === 'drill' ? `<div class="btns"><button class="btn alt" id="stop">Закончить</button><label class="sw"><input type="checkbox" id="tsw" ${T().timer ? 'checked' : ''}> таймер</label></div>` : ''}`, cr);
    document.querySelectorAll('.opt').forEach(b => b.onclick = () => answer(opts[+b.dataset.i]));
    const st = document.getElementById('stop'); if (st) st.onclick = finish;
    const sw = document.getElementById('tsw');
    if (sw) sw.onchange = () => { T().timer = sw.checked; save(); if (!T().timer) { clearTimeout(raf); const x = document.querySelector('.time'); if (x) x.remove(); } };
    t0 = performance.now();
    if (mode === 'drill' && T().timer) {
      const lim = limit(cur) * 1000;
      (function tick() {
        const r = 1 - (performance.now() - t0) / lim, el = document.getElementById('tm');
        if (!el || done) return;
        el.style.width = Math.max(0, r) * 100 + '%';
        if (r <= 0) return answer(null);
        raf = setTimeout(tick, 50);
      })();
    }
  }

  function answer(o) {
    if (done) return; done = true; clearTimeout(raf);
    const ok = o === cur.a, fast = (performance.now() - t0) / 1000 <= limit(cur);
    record(cur, ok, fast && mode === 'drill');
    if (!first.has(cur)) first.set(cur, ok);
    if (ok) { right++; streak++; } else { streak = 0; if (mode === 'test') queue.splice(Math.min(3, queue.length), 0, cur); }
    document.querySelectorAll('.opt').forEach(b => { const x = opts[+b.dataset.i]; b.disabled = true; if (x === cur.a) b.classList.add('ok'); else if (x === o) b.classList.add('bad'); });
    document.getElementById('qq').innerHTML = fill(cur);
    const why = (x, c, h) => `<div class="why ${c}"><b class="h">${h}</b>${fmt(cur.w[x])}</div>`;
    const rest = opts.filter(x => x !== cur.a && x !== o);
    const restHtml = rest.map(x => why(x, '', `Почему не ${nm(x)}`)).join('');
    const ru = cur.ru ? `<p class="mute">${cur.ru}</p>` : '';
    document.getElementById('fb').innerHTML = ok
      ? `<p class="res ok">Верно</p>${ru}${why(cur.a, 'ok', `Почему ${nm(cur.a)}`)}${rest.length ? `<details><summary>Почему не остальные</summary>${restHtml}</details>` : ''}<div class="btns"><button class="btn" id="nx">Дальше</button></div>`
      : `<p class="res bad">${o === null ? 'Время вышло' : 'Неверно'}</p>${ru}${o === null ? '' : why(o, 'bad', `Твой ответ ${nm(o)}: почему не подходит`)}${why(cur.a, 'ok', `Правильно ${nm(cur.a)}: почему`)}${restHtml}<div class="btns"><button class="btn" id="nx">Понятно, дальше</button></div>`;
    const nx = document.getElementById('nx'); nx.onclick = next;
    if (ok && mode === 'drill') auto = setTimeout(next, 900); else nx.scrollIntoView({ block: 'nearest' });
  }

  function finish() {
    stop(); document.onkeydown = null;
    const vals = [...first.values()], good = vals.filter(Boolean).length, p = vals.length ? Math.round(good / vals.length * 100) : 0;
    if (mode === 'test') { const k = t.id + '/' + m.id; T().mods[k] = Math.max(T().mods[k] || 0, p); }
    if (mode === 'exam') T().exam[t.id] = Math.max(T().exam[t.id] || 0, p);
    save();
    const bad = [...first].filter(x => !x[1]).map(x => x[0]), nx = m && t.modules[t.modules.indexOf(m) + 1], pass = p >= PASS;
    show(`<h1>${mode === 'drill' ? 'Тренировка окончена' : pass ? 'Пройдено' : 'Нужно повторить'}</h1>
    <p class="big">${mode === 'drill' ? `${right}/${done ? n : n - 1}` : p + '%'}</p>
    <p class="mute">${mode === 'drill' ? `Верных ответов. Закреплено ${base.filter(isM).length} из ${base.length}.` : `С первой попытки верно ${good} из ${vals.length}. ` + (pass ? '' : `Для зачёта нужно ${PASS}%. Перечитай теорию и попробуй ещё раз.`)}</p>
    ${bad.length ? '<h2>Разбор ошибок</h2>' + bad.map(q => `<div class="why"><b>${fill(q)}</b>${q.q.includes('___') ? '' : `<p>${nm(q.a)}</p>`}<p>${fmt(q.w[q.a])}</p></div>`).join('') : ''}
    <div class="btns">${nx && pass ? `<a class="btn" href="#/g/${t.id}/${nx.id}">Следующий модуль</a>` : ''}<button class="btn ${nx && pass ? 'alt' : ''}" id="again">Ещё раз</button>${m ? `<a class="btn alt" href="#/g/${t.id}/${m.id}">Теория</a>` : ''}<a class="btn alt" href="#/g/${t.id}">Все модули</a></div>`, cr);
    document.getElementById('again').onclick = () => runner(id, mode, mid);
  }

  document.onkeydown = e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (done && (e.key === 'Enter' || e.key === ' ')) {
      const el = document.activeElement;
      if (el && el.matches('a,summary,input,#stop,#again')) return;
      e.preventDefault(); if (!e.repeat && document.getElementById('nx')) next(); return;
    }
    if (!done && /^[1-9]$/.test(e.key) && opts && opts[e.key - 1] !== undefined) answer(opts[e.key - 1]);
  };
  next();
}

export function register() {
  route(/^grammar$/, catalog);
  route(/^g\/([\w-]+)$/, topic);
  route(/^g\/([\w-]+)\/(drill|exam)$/, (id, mode) => runner(id, mode));
  route(/^g\/([\w-]+)\/([\w-]+)\/test$/, (id, mid) => runner(id, 'test', mid));
  route(/^g\/([\w-]+)\/([\w-]+)$/, theory);
}
