/* Офлайн-режим. Стратегия «сначала сеть»: с интернетом всегда берётся свежая версия (контент меняется каждый день),
   без интернета (или если сеть не ответила за 4 секунды) открывается последняя сохранённая.
   Каждый раз, когда приходит свежий content/catalog.json, докачиваются новые модули дня и темы, которых ещё нет в кэше.
   Чужие адреса (Firebase и т. п.) не трогаем. */
const CACHE = 'english-v1', TIMEOUT = 4000;
const CORE = ['./', 'index.html', 'engine/style.css', 'engine/main.js', 'engine/core.js', 'engine/grammar.js', 'engine/srs.js',
  'engine/days.js', 'engine/method.js', 'engine/progress.js', 'engine/search.js', 'engine/sync.js', 'engine/dynamics.js',
  'engine/firebase-config.js', 'content/method/week.js', 'content/method/guides.js', 'content/method/plan.js', 'content/method/books.js',
  'me/progress.js', 'content/catalog.json', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable.png', 'apple-touch-icon.png'];

/* один ключ в кэше на файл, без ?v=... (иначе кэш растёт с каждой сборкой) */
const key = r => { const u = new URL(typeof r === 'string' ? r : r.url, self.location.href); u.search = ''; return u.href; };

/* сохранить файлы, которых ещё нет в кэше (force: перекачать все) */
async function precache(list, force) {
  const c = await caches.open(CACHE);
  await Promise.all(list.map(async u => {
    try {
      if (!force && await c.match(key(u))) return;
      const res = await fetch(u, { cache: 'no-cache' });
      if (res.ok && !res.redirected) await c.put(key(u), res);
    } catch (e) { /* нет сети или файла: сохранится, когда его откроют */ }
  }));
}
const fromCatalog = cat => [...(cat.grammar || []).filter(t => t.ready && t.file).map(t => t.file), ...(cat.days || []).map(d => d.file)];

self.addEventListener('install', e => e.waitUntil((async () => {
  await precache(CORE, true);
  try { const c = await caches.open(CACHE), r = await c.match(key('content/catalog.json')); if (r) await precache(fromCatalog(await r.json())); } catch (err) {}
  await self.skipWaiting();
})()));

self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
  await self.clients.claim();
})()));

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  /* no-cache: браузер всё равно проверит файл на сервере (дешёвый ответ 304), поэтому код и контент всегда свежие */
  /* передаём сам Request: у навигации сохраняется redirect: 'manual', и редирект /obsession-english → /obsession-english/ не ломает страницу */
  const net = fetch(req, { cache: 'no-cache' }).then(res => {
    if (res.ok && res.type === 'basic' && !res.redirected) {
      /* сохранение в кэш идёт в фоне: ответ странице не ждёт, пока докачаются модули */
      const copy = res.clone(), json = url.pathname.endsWith('/content/catalog.json') ? res.clone() : null;
      e.waitUntil((async () => {
        const c = await caches.open(CACHE);
        await c.put(key(req), copy).catch(() => {});
        if (json) await precache(fromCatalog(await json.json()).filter(Boolean)).catch(() => {});
      })().catch(() => {}));
    }
    return res;
  });
  e.waitUntil(net.catch(() => {}));
  e.respondWith((async () => {
    const cached = () => caches.open(CACHE).then(c => c.match(key(req)).then(hit => hit || (req.mode === 'navigate' ? c.match(key('index.html')) : undefined)));
    const offline = () => new Response('Нет интернета, и этот файл ещё не сохранён офлайн.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    /* сеть быстрее таймера → свежий ответ; сеть упала или тормозит → кэш; кэша нет → ждём сеть до конца */
    const timer = new Promise(r => setTimeout(r, TIMEOUT, 'slow'));
    try {
      const first = await Promise.race([net, timer]);
      if (first !== 'slow') return first;
      return (await cached()) || await net;
    } catch (err) {
      return (await cached()) || offline();
    }
  })());
});
