/* SEA DIARY: MATCH EDITION 
   VERSION 4.9.3 - THE VISUAL ANCHOR
   FULL VOLUME SERVICE WORKER
*/

const CACHE_NAME = 'match-edition-v4.9.3-gold';

const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];


self.addEventListener('install', (event) => {
  /* Force immediate takeover */
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching Gold Master 4.9.3 Assets');
      return cache.addAll(ASSETS);
    })
  );
});


self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Purging Legacy Logic');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  self.clients.claim();
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      /* Priority load from cache for beach performance */
      return response || fetch(event.request);
    })
  );
});
