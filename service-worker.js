/* SEA DIARY: MATCH EDITION 
   VERSION 5.2.4 - THE CACHE-BUSTER UPDATE
   NETWORK-FIRST STRATEGY
*/

const CACHE_NAME = 'match-edition-v5.2.4';

/* Cache-busting query strings force the phone to download fresh files */
const ASSETS = [
  './?v=5.2.4',
  './index.html?v=5.2.4',
  '/competition-Scorer/manifest.json?v=5.2.4',
  '/competition-Scorer/icon.png?v=5.2.4'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching V5.2.4 Assets');
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
            console.log('SW: Purging old cache ->', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

/* NETWORK FIRST, FALLBACK TO CACHE */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        /* If we get a good response from the internet, update the offline cache silently */
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        /* If there is no internet signal (or fetch fails), pull from the offline cache */
        console.log('SW: Network failed, falling back to cache');
        return caches.match(event.request, { ignoreSearch: true });
      })
  );
});
