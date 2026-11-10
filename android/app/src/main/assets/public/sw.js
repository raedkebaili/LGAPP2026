/* ═══════════════════════════════════════════════════════════════
   Service worker — rend l'app installable et 100 % jouable hors-ligne.
   C'est la pièce qui permet d'avoir l'app sur iPhone SANS Mac :
   Safari → Partager → « Sur l'écran d'accueil ».
   ═══════════════════════════════════════════════════════════════ */
const V = 'lgbt-v6';
const CORE = ['/', '/index.html', '/manifest.webmanifest'];

/** Chemins qui ne doivent JAMAIS être mis en cache (serveur de dev Vite). */
const SKIP = [/^\/src\//, /^\/@vite/, /^\/@react-refresh/, /^\/@fs\//, /^\/@id\//, /^\/node_modules\//];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(V)
      .then(c => c.addAll(CORE).catch(() => { }))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // le salon LAN doit toujours passer par le réseau
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/ws')) return;
  // modules du serveur de dev : jamais de cache
  if (SKIP.some(re => re.test(url.pathname)) || url.search.includes('import')) return;

  // Navigation : réseau d'abord, repli sur le cache (app shell)
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(r => { caches.open(V).then(c => c.put('/index.html', r.clone())); return r; })
        .catch(() => caches.match('/index.html').then(r => r || caches.match('/')))
    );
    return;
  }

  // Tout le reste (JS/CSS/images/polices) : cache d'abord
  e.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req).then(r => {
        if (r.ok && r.type === 'basic') {
          const copy = r.clone();
          caches.open(V).then(c => c.put(req, copy));
        }
        return r;
      }).catch(() => hit);
    })
  );
});
