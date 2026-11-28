/* «Итоги и динамика» в начале модуля дня: цифры прошлого отчёта, мини-графики по всем отчётам, ошибки по дням.
   Данные: me/progress.js (DAILY и ERRORS веду я после каждого отчёта) + время из виджета плана. */
import { esc, dayName } from './core.js';
import { ERRORS, DAILY } from '../me/progress.js';

/* состояние ошибки на дату (включая тексты этого дня 'ГГГГ-ММ-ДД.1') */
export const errState = (e, upTo = '9999') => {
  const lim = upTo + '.9', seen = e.seen.filter(x => x <= lim), last = seen[seen.length - 1] || '';
  const after = e.clean.filter(c => c > last && c <= lim).length;
  if (!seen.length && !after) return null;
  return after >= 3 ? ['побеждена', 'ok', 2] : after >= 1 ? ['уходит', 'mid', 1] : ['активна', 'bad', 0];
};

const pct = r => r && r[1] ? Math.round(r[0] / r[1] * 100) : null;
const short = d => +d.slice(8) + '.' + d.slice(5, 7);

/* метрики: k = ключ, better = 'up' | 'down', unit */
const METRICS = [
  { k: 'tr', t: 'Перевод с первой попытки', v: x => pct(x.tr), unit: '%', better: 'up', max: 100 },
  { k: 'letter', t: 'Слов в письме Mr. X', v: x => x.letter, unit: '', better: 'up' },
  { k: 'typos', t: 'Опечаток в переводе', v: x => x.typos, unit: '', better: 'down' },
  { k: 'ear', t: 'Видео: не узнал на слух', v: x => x.ear, unit: '', better: 'down', opt: 1 },
  { k: 'act', t: 'Активных ошибок', v: x => ERRORS.filter(e => (errState(e, x.date) || [])[2] === 0).length, unit: '', better: 'down' },
];

function delta(m, cur, prev) {
  if (cur == null || prev == null) return '<small class="mute">нет сравнения</small>';
  const d = cur - prev; if (!d) return '<small class="mute">= как в прошлый раз</small>';
  const good = (d > 0) === (m.better === 'up');
  return `<small class="dl ${good ? 'up' : 'dn'}">${d > 0 ? '▲ +' : '▼ −'}${Math.abs(d)}${m.unit} · ${good ? 'лучше' : 'хуже'}</small>`;
}

/* столбики одной серии: ось, подпись только у последнего, подсказка на каждом */
function bars(m, rows) {
  const vals = rows.map(m.v), max = m.max || Math.max(1, ...vals.filter(v => v != null)) * 1.15;
  const W = 260, H = 84, top = 16, bw = Math.min(28, (W - 8) / rows.length - 6), step = (W - 8) / rows.length;
  const g = rows.map((r, i) => {
    const v = vals[i], x = 4 + i * step + (step - bw) / 2, lab = `<text x="${x + bw / 2}" y="${H + 14}" class="ax">${short(r.date)}</text>`;
    if (v == null) return `<g><title>${short(r.date)}: нет данных</title><text x="${x + bw / 2}" y="${H - 4}" class="ax">–</text>${lab}</g>`;
    const h = Math.max(2, (v / max) * (H - top)), y = H - h, last = i === rows.length - 1;
    return `<g><title>${short(r.date)}: ${v}${m.unit}</title><rect x="${x - 3}" y="${top - 4}" width="${bw + 6}" height="${H - top + 4}" fill="transparent"/>` +
      `<path d="M${x},${H} V${y + 4} Q${x},${y} ${x + 4},${y} H${x + bw - 4} Q${x + bw},${y} ${x + bw},${y + 4} V${H} Z" class="bar${last ? ' last' : ''}"/>` +
      (last ? `<text x="${x + bw / 2}" y="${y - 4}" class="val">${v}${m.unit}</text>` : '') + `${lab}</g>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H + 18}" class="mini" role="img" aria-label="${esc(m.t)} по дням"><line x1="0" x2="${W}" y1="${H}" y2="${H}" class="base"/>${g}</svg>`;
}

export function dynamicsHtml(dayDate, minutesOf) {
  const rows = DAILY.filter(x => x.date < dayDate).map(x => ({ ...x, min: x.min != null ? x.min : (minutesOf(x.date) || null) }));
  if (!rows.length) return '<p class="mute">Это первый модуль: сравнивать пока не с чем. С завтрашнего дня здесь будут итоги и графики.</p>';
  const cur = rows[rows.length - 1], prev = rows[rows.length - 2];

  const tiles = METRICS.filter(m => !m.opt || m.v(cur) != null).concat([{ k: 'min', t: 'Минут за день', v: x => x.min, unit: '', better: 'up' }]).map(m => {
    const v = m.v(cur);
    return `<div class="kpi"><small class="mute">${m.t}</small><b>${v == null ? '?' : v + m.unit}</b>${m.k === 'tr' && cur.tr ? `<small class="mute">${cur.tr[0]} из ${cur.tr[1]}</small>` : ''}${m.k === 'ear' && cur.word != null ? `<small class="mute">и не знал слова: ${cur.word}</small>` : ''}${delta(m, v, prev && m.v(prev))}</div>`;
  }).join('');

  const charts = METRICS.filter(m => !m.opt || rows.some(r => m.v(r) != null)).map(m => `<figure class="mfig"><figcaption>${m.t}<small class="mute"> · ${m.better === 'up' ? 'выше = лучше' : 'ниже = лучше'}</small></figcaption>${bars(m, rows)}</figure>`).join('');

  /* ошибки: строки = ошибки, столбцы = отчёты */
  const dates = rows.map(r => r.date);
  const cell = (e, d) => e.seen.some(x => x.startsWith(d)) ? '<td class="ed bad" title="была">●</td>' : e.clean.some(x => x.startsWith(d)) ? '<td class="ed ok" title="чисто">○</td>' : '<td class="ed mute" title="не проверялась">·</td>';
  const live = ERRORS.map(e => ({ e, st: errState(e, cur.date) })).filter(x => x.st).sort((a, b) => a.st[2] - b.st[2] || b.e.seen.length - a.e.seen.length);
  const row = ({ e, st }) => `<tr><td>${esc(e.title)}</td>${dates.map(d => cell(e, d)).join('')}<td><span class="pill ${st[1]}">${st[0]}</span></td></tr>`;
  const head = `<tr><th>Ошибка</th>${dates.map(d => `<th class="ed">${short(d)}</th>`).join('')}<th>Сейчас</th></tr>`;
  const now = live.filter(x => x.st[2] < 2), won = live.filter(x => x.st[2] === 2);
  const cnt = k => live.filter(x => x.st[2] === k).length;

  const totalMin = rows.reduce((a, r) => a + (r.min || 0), 0), noMin = rows.filter(r => r.min == null).length;

  return `<p class="mute">Итог отчёта за ${dayName(cur.date)}${prev ? `, в сравнении с ${dayName(prev.date)}` : ''}.</p>
  <div class="kpis">${tiles}</div>
  <h2>Динамика по всем отчётам</h2><div class="mfigs">${charts}</div>
  <h2>Ошибки по дням</h2><p class="mute">● была · ○ был шанс ошибиться, но ошибки не было · · не проверялась. Побеждена = 3 чистых отчёта подряд.</p>
  <div class="scroll"><table class="ex etl">${head}${now.map(row).join('')}</table></div>
  ${won.length ? `<details><summary>Побеждённые (${won.length})</summary><table class="ex etl">${head}${won.map(row).join('')}</table></details>` : ''}
  <h2>Всего</h2><table class="ex"><tr><td>Отчётов</td><td><b>${rows.length}</b></td></tr>
  <tr><td>Минут по отчётам</td><td><b>${totalMin}</b>${noMin ? ` <span class="mute">(в ${noMin} отч. не указано)</span>` : ''}</td></tr>
  <tr><td>Ошибки</td><td><span class="pill bad">активна ${cnt(0)}</span> <span class="pill mid">уходит ${cnt(1)}</span> <span class="pill ok">побеждена ${cnt(2)}</span></td></tr></table>
  <p class="mute"><a href="#/progress">Весь прогресс →</a></p>`;
}
