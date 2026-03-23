/* SEA DIARY: MATCH EDITION 
   VERSION 5.5.0 - THE PRECISION MATCH BUILD
   FULL VOLUME SERVICE WORKER
*/


const CACHE_NAME = 'match-edition-v5.5.0-gold';


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
      console.log('SW: Caching Gold Master 5.5.0 Assets');
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
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );


});
