/* ShoreScore V10.2.0 Service Worker */
const CACHE_NAME = 'shorescore-v10.2.0';

self.addEventListener('install', event => {
    self.skipWaiting(); // Force activation
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)))
    );
});

self.addEventListener('fetch', event => {
    // Network-First for HTML to ensure version numbers always update instantly
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
