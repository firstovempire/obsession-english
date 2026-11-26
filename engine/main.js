/* Точка входа: главная «Сегодня», настройки (бэкап), верхнее меню, запуск. */
import { S, CAT, loadCatalog, route, render, show, esc, dayName, exportState, importState, hasData, setNavHook, DAY, plural } from './core.js';
import * as grammar from './grammar.js';
import * as srs from './srs.js';
import * as days from './days.js';
import * as method from './method.js';
import * as progress from './progress.js';
import * as search from './search.js';

const BACKUP_DAYS = 7;

function todayPage() {
  const last = days.latest(), due = srs.dueList().length, errs = progress.activeErrors();
  const stale = hasData() && Date.now() - (S.backupAt || 0) > BACKUP_DAYS * DAY;
  show(`${stale ? `<div class="trap warn"><b>Сделай бэкап прогресса.</b> ${S.backupAt ? 'Последний был ' + plural(Math.floor((Date.now() - S.backupAt) / DAY), 'день', 'дня', 'дней') + ' назад.' : 'Ты ещё ни разу его не делал.'} Прогресс хранится только в этом браузере. <a href="#/settings">Сохранить в файл →</a></div>` : ''}
  <h1>Сегодня</h1>${method.planWidget()}
  <div class="list">
  ${last ? `<a class="row" href="#/day/${last.id}"><span class="num">☀</span><span><b>${dayName(last.date)} · ${esc(last.title)}</b><small>${esc(last.focus)}</small></span>${days.badge(last.id)}</a>` : ''}
  <a class="row" href="#/review"><span class="num">↻</span><span><b>Повторение фраз</b><small>Каждый день первым делом</small></span><span class="badge ${due ? '' : 'ok'}">${due ? 'к повтору: ' + due : 'всё повторено'}</span></a>
  <a class="row" href="#/progress"><span class="num">↗</span><span><b>Мой прогресс</b><small>Ошибки, точность перевода, фразы, срезы</small></span><span class="badge ${errs ? '' : 'ok'}">активных ошибок: ${errs}</span></a>
  </div>`, '');
  method.wirePlan();
}

function settings() {
  const n = (o) => Object.keys(o || {}).length;
  show(`<h1>Настройки и бэкап</h1>
  <div class="rule">Прогресс (тесты, карточки, ответы, галочки плана) хранится <b>только в этом браузере</b> на этом устройстве. На GitHub его нет. Очистка истории или новый браузер = потеря. Поэтому раз в неделю сохраняй файл и клади его в папку <code>backups</code> проекта или в облако.</div>
  <table class="ex"><tr><td>Последний бэкап</td><td><b>${S.backupAt ? new Date(S.backupAt).toLocaleString('ru-RU') : 'не было'}</b></td></tr>
  <tr><td>Ответов в тестах</td><td>${n(S.tests.q)}</td></tr><tr><td>Модулей дня начато</td><td>${n(S.days)}</td></tr><tr><td>Карточек</td><td>${n(S.srs)}</td></tr></table>
  <div class="btns"><button class="btn" id="exp">Сохранить прогресс в файл</button><label class="btn alt" for="imp">Восстановить из файла</label><input type="file" id="imp" accept=".json,application/json" hidden></div>
  <p class="mute" id="msg" aria-live="polite"></p>
  <h2>Перенос на другое устройство</h2><p class="mute">На старом: «Сохранить в файл». Перекинь файл на новое устройство (телефон, другой ПК). На новом: открой сайт и нажми «Восстановить из файла». Восстановление заменяет весь прогресс на этом устройстве.</p>`, '');
  document.getElementById('exp').onclick = () => { exportState(); document.getElementById('msg').textContent = 'Файл сохранён в «Загрузки».'; };
  document.getElementById('imp').onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    if (hasData() && !confirm('Заменить весь текущий прогресс на этом устройстве данными из файла?')) return;
    f.text().then(t => { importState(JSON.parse(t)); document.getElementById('msg').textContent = 'Прогресс восстановлен.'; setTimeout(() => location.hash = '#/', 800); })
      .catch(err => { document.getElementById('msg').textContent = 'Не получилось: ' + err.message; });
  };
}

/* ---------- меню ---------- */
const NAV = [['', 'Сегодня'], ['days', 'Дни'], ['grammar', 'Грамматика'], ['review', 'Повторение'], ['progress', 'Прогресс'], ['method', 'Методика'], ['search', '🔍', 'Поиск'], ['settings', '⚙', 'Настройки и бэкап']];
function nav(path) {
  const top = path.split('/')[0], sect = top === 'g' ? 'grammar' : top === 'day' ? 'days' : top;
  const due = srs.dueList().length;
  document.getElementById('nav').innerHTML = NAV.map(([h, t, title]) => `<a href="#/${h}" class="${sect === h ? 'on' : ''}" ${title ? `title="${title}" aria-label="${title}"` : ''}>${t}${h === 'review' && due ? `<span class="dot">${due}</span>` : ''}</a>`).join('');
}

(async function start() {
  try { await loadCatalog(); } catch (e) {
    document.getElementById('app').innerHTML = `<h1>Сайт не загрузился</h1><p>Не удалось прочитать <code>content/catalog.json</code>. Если открываешь файл с диска, открой сайт по ссылке GitHub Pages: модули работают только через сервер.</p>`; return;
  }
  srs.enrollDecks();
  [grammar, srs, days, method, progress, search].forEach(m => m.register());
  route(/^$/, todayPage);
  route(/^settings$/, settings);
  // старые ссылки вида #/to-be/need/test → #/g/to-be/need/test
  route(/^([\w-]+)(\/.*)?$/, (id, rest) => { if (CAT.grammar.some(t => t.id === id && t.ready)) location.replace('#/g/' + id + (rest || '')); else location.replace('#/'); });
  setNavHook(nav);
  addEventListener('hashchange', render);
  render();
})();
