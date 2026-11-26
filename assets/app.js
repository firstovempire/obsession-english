/* Движок: сам находит темы в window.TOPICS. Для новых тем менять этот файл не нужно. */
(function () {
const app = document.getElementById('app'), crumbs = document.getElementById('crumbs'), KEY = 'eng-tests-v1';
const PASS = 85, MASTER = 3; // зачёт в %, быстрых верных ответов подряд для закрепления
let S = { mods: {}, q: {}, exam: {}, timer: true };
try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const cls = x => ({ a: 'a', an: 'a', 'a / an': 'a', the: 'the', '—': 'zero', this: 'a', these: 'a', that: 'the', those: 'the', do: 'a', "don't": 'a', does: 'the', "doesn't": 'the', '-s': 'the' })[x.toLowerCase()];
const tag = x => cls(x) ? `<span class="ar ar-${cls(x)}">${x}</span>` : x;
const nm = x => cls(x) ? tag(x) : `«${x}»`;
const fmt = s => s.replace(/\[(a \/ an|an|a|doesn't|don't|does|do|-s|these|those|this|that|the|—)\]/gi, (m, x) => tag(x));
const label = x => x === '—' ? tag('—') + ' <small class="mute">ничего</small>' : tag(x);

TOPICS.forEach(t => t.modules.forEach(m => m.questions.forEach(q => {
  q.id = t.id + '|' + q.q + '|' + q.a; q.keys = Object.keys(q.w); q.long = q.keys.some(k => k.length > 8);
})));
const all = t => t.modules.reduce((r, m) => r.concat(m.questions), []);
const isM = q => ((S.q[q.id] || {}).s || 0) >= MASTER;

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
  const r = S.q[q.id] || (S.q[q.id] = { s: 0, w: 0 });
  if (!ok) { r.s = 0; r.w++; } else if (fast) r.s = Math.min(r.s + 1, MASTER);
  save();
}

let cleanup = null, onKey = null;
document.addEventListener('keydown', e => { if (onKey && !e.ctrlKey && !e.metaKey && !e.altKey) onKey(e); });
function show(html, cr) { app.innerHTML = html; crumbs.innerHTML = cr || ''; }
const link = (h, t) => `<a href="${h}">${t}</a>`;

function home() {
  const groups = [...new Set(TOPICS.map(t => t.group || 'Другое'))];
  const row = (t, i) => {
    const n = all(t).length, k = all(t).filter(isM).length;
    return `<a class="row" href="#/${t.id}"><span class="num">${i + 1}</span><span><b>${t.title}</b><small>${t.desc}</small></span><span class="badge ${k === n ? 'ok' : ''}">${k} из ${n} на автомате</span></a>`;
  };
  show((window.DAYUI ? DAYUI.home() : '<h1>Грамматика</h1>') + `<p class="mute">В каждой теме: теория, тест, тренажёр на скорость, экзамен.</p>` +
    groups.map(g => `<h2>${g}</h2><div class="list">` + TOPICS.filter(t => (t.group || 'Другое') === g).map(t => row(t, TOPICS.indexOf(t))).join('') + '</div>').join(''));
  if (window.DAYUI) DAYUI.wire();
}

function topic(t) {
  const qs = all(t), k = qs.filter(isM).length, ex = S.exam[t.id];
  show(`<h1>${t.title}</h1><p class="mute">${t.desc}</p>
  <p>На автомате: <b>${k} из ${qs.length}</b></p><div class="bar"><i style="width:${k / qs.length * 100}%"></i></div>
  <h2>Модули</h2><div class="list">` + t.modules.map((m, i) => {
    const b = S.mods[t.id + '/' + m.id];
    return `<a class="row" href="#/${t.id}/${m.id}"><span class="num">${i + 1}</span><span><b>${fmt(m.title)}</b><small>${m.desc}. Вопросов: ${m.questions.length}</small></span><span class="badge ${b >= PASS ? 'ok' : ''}">${b == null ? 'не пройден' : b >= PASS ? '✓ ' + b + '%' : b + '%, нужно ' + PASS + '%'}</span></a>`;
  }).join('') + `</div>
  <h2>Закрепление</h2><div class="list">
  <a class="row" href="#/${t.id}/drill"><span class="num">⚡</span><span><b>Тренажёр автоматизма</b><small>Все вопросы вперемешку на время. Ошибки возвращаются чаще. Вопрос закреплён после ${MASTER} быстрых верных ответов подряд</small></span><span></span></a>
  <a class="row" href="#/${t.id}/exam"><span class="num">★</span><span><b>Экзамен</b><small>25 случайных вопросов без повторов</small></span><span class="badge ${ex >= PASS ? 'ok' : ''}">${ex == null ? '' : 'лучший: ' + ex + '%'}</span></a></div>` + (window.DAYUI ? DAYUI.backlinks(t.id) : ''), link('#/', 'Главная'));
}

function theory(t, m) {
  show(`<h1>${fmt(m.title)}</h1>${fmt(m.theory)}<div class="btns"><a class="btn" href="#/${t.id}/${m.id}/test">Начать тест</a><a class="btn alt" href="#/${t.id}">Все модули</a></div>`,
    link('#/', 'Главная') + ' / ' + link('#/' + t.id, t.title));
}

function runner(t, mode, m) {
  const base = mode === 'test' ? m.questions : all(t);
  const queue = mode === 'test' ? shuffle(base) : mode === 'exam' ? shuffle(base).slice(0, 25) : [];
  const total = queue.length, first = new Map(), last = [];
  let cur, opts, done = false, t0, raf, auto, streak = 0, n = 0, right = 0;
  const cr = link('#/', 'Главная') + ' / ' + link('#/' + t.id, t.title) + (m ? ' / ' + link(`#/${t.id}/${m.id}`, 'теория') : '');
  const stop = () => { clearTimeout(raf); clearTimeout(auto); };
  cleanup = stop;

  function pick() {
    if (mode !== 'drill') return queue.shift();
    const pool = base.filter(q => !last.includes(q.id));
    const wt = q => { const r = S.q[q.id]; return !r ? 3 : r.s >= MASTER ? .4 : r.w && r.s === 0 ? 8 : 4; };
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
    ${mode === 'drill' && S.timer ? '<div class="bar time"><i id="tm" style="width:100%"></i></div>' : ''}
    <p class="q" id="qq">${gap(cur)}</p>${cur.hint ? `<p class="mute">${cur.hint}</p>` : ''}
    <div class="opts ${cur.long ? 'long' : ''}">${opts.map((o, i) => `<button class="opt" data-i="${i}"><kbd class="kb">${i + 1}</kbd><span>${label(o)}</span></button>`).join('')}</div>
    <div class="fb" id="fb" aria-live="polite"></div>
    ${mode === 'drill' ? `<div class="btns"><button class="btn alt" id="stop">Закончить</button><label class="sw"><input type="checkbox" id="tsw" ${S.timer ? 'checked' : ''}> таймер</label></div>` : ''}`, cr);
    app.querySelectorAll('.opt').forEach(b => b.onclick = () => answer(opts[+b.dataset.i]));
    const st = document.getElementById('stop'); if (st) st.onclick = finish;
    const sw = document.getElementById('tsw');
    if (sw) sw.onchange = () => { S.timer = sw.checked; save(); if (!S.timer) { clearTimeout(raf); const x = document.querySelector('.time'); if (x) x.remove(); } };
    t0 = performance.now();
    if (mode === 'drill' && S.timer) {
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
    app.querySelectorAll('.opt').forEach(b => { const x = opts[+b.dataset.i]; b.disabled = true; if (x === cur.a) b.classList.add('ok'); else if (x === o) b.classList.add('bad'); });
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
    stop(); onKey = null;
    const vals = [...first.values()], good = vals.filter(Boolean).length, p = vals.length ? Math.round(good / vals.length * 100) : 0;
    if (mode === 'test') { const k = t.id + '/' + m.id; S.mods[k] = Math.max(S.mods[k] || 0, p); }
    if (mode === 'exam') S.exam[t.id] = Math.max(S.exam[t.id] || 0, p);
    save();
    const bad = [...first].filter(x => !x[1]).map(x => x[0]), nx = m && t.modules[t.modules.indexOf(m) + 1], pass = p >= PASS;
    show(`<h1>${mode === 'drill' ? 'Тренировка окончена' : pass ? 'Пройдено' : 'Нужно повторить'}</h1>
    <p class="big">${mode === 'drill' ? `${right}/${done ? n : n - 1}` : p + '%'}</p>
    <p class="mute">${mode === 'drill' ? `Верных ответов. Закреплено ${base.filter(isM).length} из ${base.length}.` : `С первой попытки верно ${good} из ${vals.length}. ` + (pass ? '' : `Для зачёта нужно ${PASS}%. Перечитай теорию и попробуй ещё раз.`)}</p>
    ${bad.length ? '<h2>Разбор ошибок</h2>' + bad.map(q => `<div class="why"><b>${fill(q)}</b>${q.q.includes('___') ? '' : `<p>${nm(q.a)}</p>`}<p>${fmt(q.w[q.a])}</p></div>`).join('') : ''}
    <div class="btns">${nx && pass ? `<a class="btn" href="#/${t.id}/${nx.id}">Следующий модуль</a>` : ''}<button class="btn ${nx && pass ? 'alt' : ''}" id="again">Ещё раз</button>${m ? `<a class="btn alt" href="#/${t.id}/${m.id}">Теория</a>` : ''}<a class="btn alt" href="#/${t.id}">Все модули</a></div>`, cr);
    document.getElementById('again').onclick = route;
    scrollTo(0, 0);
  }

  onKey = e => {
    if (done && (e.key === 'Enter' || e.key === ' ')) {
      const el = document.activeElement;
      if (el && el.matches('a,summary,input,#stop')) return;
      e.preventDefault(); if (!e.repeat) next(); return;
    }
    if (!done && /^[1-9]$/.test(e.key) && opts[e.key - 1] !== undefined) answer(opts[e.key - 1]);
  };
  next();
}

function route() {
  if (cleanup) cleanup(); cleanup = onKey = null; scrollTo(0, 0);
  const bk = document.getElementById('back'), path = location.hash.replace('#/', '').split('/').filter(Boolean);
  // Назад = на уровень выше: тест → теория → тема → все темы
  if (path.length) { bk.href = '#/' + path.slice(0, -1).join('/'); bk.removeAttribute('aria-disabled'); } else { bk.removeAttribute('href'); bk.setAttribute('aria-disabled', 'true'); }
  const [tid, mid, act] = location.hash.replace(/^#\//, '').split('/'), t = TOPICS.find(x => x.id === tid);
  if (window.DAYUI && DAYUI.route(tid, mid, show, link)) return;
  if (!t) return home();
  if (!mid) return topic(t);
  if (mid === 'drill' || mid === 'exam') return runner(t, mid);
  const m = t.modules.find(x => x.id === mid);
  if (!m) return topic(t);
  act === 'test' ? runner(t, 'test', m) : theory(t, m);
}
addEventListener('hashchange', route); route();
})();
