/* SEA DIARY: MATCH EDITION 
   VERSION 4.3.8 - CLOCK HARDENING
   FULL VOLUME SERVICE WORKER
*/

const CACHE_NAME = 'match-edition-v4.3.8-sync-fix';

const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];

self.addEventListener('install', (event) => {
  /* Force immediate takeover to apply the synchronized timer logic */
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching Gold Master 4.3.8 Assets');
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
            console.log('SW: Purging Legacy Version Cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  /* Ensure all open windows/tabs synchronize immediately */
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      /* Priority 1: Instant load from cache for offshore reliability */
      if (response) {
        return response;
      }
      
      /* Priority 2: Real-time fetch for Firebase synchronization */
      return fetch(event.request);
    })
  );
});
