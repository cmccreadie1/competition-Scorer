/* ShoreScore V10.9.1 Service Worker */
const CACHE_NAME = 'shorescore-v10.9.1';

self.addEventListener('install', event => {
    self.skipWaiting(); 
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)))
    );
});

self.addEventListener('fetch', event => {
    if (event.request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(response => response || fetch(event.request))
        );
    }
});
