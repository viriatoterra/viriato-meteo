// Service worker de Viriato Méteo: deja la web lista para abrirse sin cobertura.
// Los mapas y la previsión los guarda la propia página (Cache API y localStorage).
const SHELL = 'vm-shell-v3';
const INDEX = new URL('./', self.location).href; // copia canónica de la página
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './gear.js',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/apple-touch-icon.png',
  'https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.0/dist/maplibre-gl.js',
  'https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.0/dist/maplibre-gl.css',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => Promise.allSettled(PRECACHE.map(u => c.add(u)))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('vm-shell-') && k !== SHELL).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  // Web, fichas, GPX y logos: primero la red (para tener lo último) y, sin cobertura, lo guardado.
  if (sameOrigin && !url.pathname.includes('/api/')) {
    const nav = req.mode === 'navigate';
    e.respondWith(fetch(req).then(res => {
      if (res.ok) {
        const copy = res.clone();
        // la página siempre se guarda también como copia canónica: sin cobertura se abre la última versión
        caches.open(SHELL).then(c => nav ? c.put(INDEX, copy) : c.put(req, copy));
      }
      return res;
    }).catch(() => nav ? caches.match(INDEX, { cacheName: SHELL }).then(r => r || caches.match(INDEX))
                       : caches.match(req)));
    return;
  }
  // Librería del mapa y tipografías: lo guardado primero.
  if (/^(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(SHELL).then(c => c.put(req, copy)); }
      return res;
    })));
  }
});
