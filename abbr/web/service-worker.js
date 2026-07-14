const CACHE_NAME = 'abbr-app-v1';
const ASSETS = [
  '/abbr/index.html',
  '/abbr/manifest.json',
  '/abbr/config.json',
  '/abbr/terms.csv',
  '/abbr/ads.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if(url.pathname.endsWith('/terms.csv') || url.pathname.endsWith('/ads.json')){
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request).catch(()=>caches.match('/abbr/index.html'))));
});
