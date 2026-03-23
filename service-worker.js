/* SEA DIARY: MATCH EDITION 
   VERSION 5.1.6 - THE VAULT & UI FOCUS UPDATE
   FULL VOLUME SERVICE WORKER
*/


const CACHE_NAME = 'match-edition-v5.1.6-gold';


const ASSETS = [
  './',
  './index.html',
  '/competition-Scorer/manifest.json',
  '/competition-Scorer/icon.png'
];


self.addEventListener('install', (event) => {


  /* Force immediate takeover for zero-lag workflow */
  self.skipWaiting();
  
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching Gold Master 5.1.6 Assets');
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
  
  
  /* Synchronize all clients for real-time history stability */
  self.clients.claim();


});


self.addEventListener('fetch', (event) => {


  event.respondWith(
    caches.match(event.request).then((response) => {
      /* Priority 1: Speed - Instant load from cache */
      if (response) {
        return response;
      }
      
      
      /* Priority 2: Sync - Live fetch for cloud updates */
      return fetch(event.request);
    })
  );


});
