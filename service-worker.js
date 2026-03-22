/* SEA DIARY: MATCH EDITION 
   VERSION 4.9.2 - THE VISUAL FIELD GUIDE
   FULL VOLUME SERVICE WORKER
*/

const CACHE_NAME = 'match-edition-v4.9.2-gold';

const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];


self.addEventListener('install', (event) => {
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching Gold Master 4.9.2 Assets');
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
      /* Return cached version or fetch from live cloud */
      return response || fetch(event.request);
    })
  );
});
