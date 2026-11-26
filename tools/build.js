/* Проверка контента + сборка оглавления content/catalog.json.
   Запуск из корня проекта:  node tools/build.js
   Запускать после ЛЮБОГО изменения в content/. При ошибках каталог не пишется и выход с кодом 1. */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const C = p => path.join(ROOT, 'content', p);
const errors = [], warns = [];
const err = (where, msg) => errors.push(`✗ ${where}: ${msg}`);
const warn = (where, msg) => warns.push(`! ${where}: ${msg}`);
const load = async f => (await import(pathToFileURL(f).href + '?t=' + Date.now()));
const walk = d => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.js') ? [path.join(d, e.name)] : []) : [];
const rel = f => path.relative(ROOT, f).split(path.sep).join('/');

/* та же нормализация, что на сайте */
const CON = { "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "that's": 'that is', "what's": 'what is', "there's": 'there is', "don't": 'do not', "doesn't": 'does not', "isn't": 'is not', "aren't": 'are not', "can't": 'cannot', "i've": 'i have', "let's": 'let us', "i'd": 'i would', "won't": 'will not' };
const norm = s => String(s).toLowerCase().replace(/<[^>]+>/g, ' ').replace(/\[(a \/ an|an|a|the|—|-s)\]/g, '$1').replace(/[’`]/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim().split(' ').map(w => CON[w] || w).join(' ');
/* английские предложения из html теории/разбора: ищем куски латиницы длиной от 3 слов */
const sentences = html => {
  const txt = String(html || '').replace(/<s>.*?<\/s>/g, ' ').replace(/<\/(td|p|li|div|h2|h3)>/g, ' | ').replace(/<br\s*\/?>/g, ' | ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
  const out = new Set();
  (txt.match(/[A-Z][A-Za-z'’ ,\-\[\]]+[.?!]/g) || []).forEach(m => { const n = norm(m); if (n.split(' ').length >= 3) out.add(n); });
  return out;
};

/* ---------- грамматика ---------- */
const roadmapMod = await load(C('grammar/roadmap.js'));
const roadmap = roadmapMod.default, GROUPS = roadmapMod.GROUPS;
const grammar = [], topicIndex = {};
for (const f of walk(C('grammar')).filter(f => !f.endsWith('roadmap.js'))) {
  const where = rel(f), t = (await load(f)).default, level = path.basename(path.dirname(f));
  if (!t || !t.id) { err(where, 'нет export default с id'); continue; }
  if (t.id !== path.basename(f, '.js')) err(where, `id '${t.id}' не совпадает с именем файла`);
  if (t.level !== level) err(where, `level '${t.level}' не совпадает с папкой ${level}`);
  if (!GROUPS.includes(t.group)) err(where, `группа '${t.group}' не из списка GROUPS в roadmap.js`);
  if (!roadmap.some(r => r.id === t.id)) warn(where, 'темы нет в roadmap.js');
  const mids = new Set(), qkeys = new Set();
  let total = 0;
  for (const m of t.modules || []) {
    const mw = `${where} › ${m.id}`;
    if (mids.has(m.id)) err(mw, 'повтор id модуля'); mids.add(m.id);
    const theory = sentences(m.theory);
    (m.questions || []).forEach((q, i) => {
      const qw = `${mw} › вопрос ${i + 1}`, keys = Object.keys(q.w || {});
      if (keys.length < 2) err(qw, 'меньше двух вариантов');
      if (!keys.includes(q.a)) err(qw, `ответ '${q.a}' не среди вариантов`);
      const k = q.q + '|' + q.a; if (qkeys.has(k)) err(qw, 'повтор вопроса в теме'); qkeys.add(k);
      const full = q.q.includes('___') ? q.q.replace('___', q.a === '—' ? '' : q.a) : (q.a.split(' ').length >= 3 ? q.a : '');
      if (full && theory.has(norm(full))) err(qw, `предложение совпадает с примером из теории: «${full}»`);
      total++;
    });
  }
  const entry = { id: t.id, level: t.level, group: t.group, title: t.title, desc: t.desc, file: rel(f), ready: true, total,
    modules: (t.modules || []).map(m => ({ id: m.id, title: m.title, desc: m.desc, n: (m.questions || []).length })) };
  grammar.push(entry); topicIndex[t.id] = entry;
}
const LV = ['A1', 'A2', 'B1', 'B2', 'C1'];
const ordered = roadmap.map(r => topicIndex[r.id] || { ...r, ready: false })
  .concat(grammar.filter(g => !roadmap.some(r => r.id === g.id)))
  .sort((a, b) => LV.indexOf(a.level) - LV.indexOf(b.level));

/* ---------- модули дня ---------- */
const refOk = r => { const [tid, mid] = r.split('/'), t = topicIndex[tid]; return t && (!mid || t.modules.some(m => m.id === mid)); };
const days = [], cards = [], seenCards = new Map();
const addCard = (c, src, where, day) => {
  if (!c.en || !c.ru) return err(where, 'карточка без en или ru');
  const k = norm(c.en);
  if (seenCards.has(k)) return warn(where, `фраза уже есть (${seenCards.get(k)}): «${c.en}»`);
  seenCards.set(k, where); cards.push({ en: c.en, ru: c.ru, note: c.note || '', src, day: day || '' });
};
for (const f of walk(C('decks'))) { const where = rel(f), deck = (await load(f)).default || []; const name = (await load(f)).title || 'Из твоих отчётов'; deck.forEach(c => addCard(c, name, where)); }
const MONG = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
for (const f of walk(C('days')).sort()) {
  const where = rel(f), d = (await load(f)).default, m = where.match(/days\/(\d{4})\/(\d{2})\/(\d{2})\.js$/);
  if (!m) { err(where, 'путь должен быть content/days/ГГГГ/ММ/ДД.js'); continue; }
  const date = `${m[1]}-${m[2]}-${m[3]}`;
  if (!d) { err(where, 'нет export default'); continue; }
  if (d.id !== date || d.date !== date) err(where, `id и date должны быть '${date}'`);
  if (!['regular', 'review', 'snapshot'].includes(d.type)) err(where, `type: regular | review | snapshot, а не '${d.type}'`);
  (d.related || []).forEach(r => { if (!refOk(r)) err(where, `related '${r}' не найден в грамматике`); });
  const known = new Set([...sentences(d.theory), ...sentences(d.review)]);
  (d.phrases || []).forEach(p => known.add(norm(p.en)));
  [...(d.translate || []), ...(d.warmup || [])].forEach((t, i) => {
    if (!t.ru || !t.a || !t.a.length) return err(where, `перевод ${i + 1}: нужны ru и a[]`);
    t.a.forEach(a => { if (known.has(norm(a))) err(where, `перевод «${t.ru}»: ответ «${a}» совпадает с теорией или фразами дня`); });
  });
  (d.warmup || []).forEach(t => { if (t.topic && !refOk(t.topic)) err(where, `warmup topic '${t.topic}' не найден`); });
  const label = `${+m[3]} ${MONG[+m[2] - 1]} · ${d.title}`;
  (d.phrases || []).forEach(p => addCard(p, label, where, date));
  days.push({ id: date, date, type: d.type, title: d.title, focus: d.focus || '', related: d.related || [], file: where,
    nTr: (d.translate || []).length, nPh: (d.phrases || []).length, hasLetter: !!d.letter });
}

/* ---------- итог ---------- */
warns.forEach(w => console.log(w));
if (errors.length) { errors.forEach(e => console.log(e)); console.log(`\nОшибок: ${errors.length}. Каталог НЕ обновлён.`); process.exit(1); }
const catalog = { built: new Date().toISOString(), groups: GROUPS, levels: LV, grammar: ordered, days, cards };
fs.writeFileSync(C('catalog.json'), JSON.stringify(catalog, null, 1) + '\n');
console.log(`✓ Каталог собран: тем ${grammar.length} готово из ${ordered.length}, вопросов ${grammar.reduce((a, g) => a + g.total, 0)}, дней ${days.length}, карточек ${cards.length}.`);
