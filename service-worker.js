/* ShoreScore PWA Service Worker (V9.0.0 Deep Cache Policy) */
const CACHE_NAME = 'shorescore-core-cache-v9.0.0';

const UI_ASSETS = [
    '/',
    '/app.html',
    '/index.html',
    '/version.json',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap'
];

self.addEventListener('install', event => {
    // Force immediate UI assets caching for deep offline support
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] PWA Assets Primed for Offline Usage');
                return cache.addAll(UI_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    // Cleanup old caches automatically on version bump (V9.0.0)
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Clearing Old Cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    // Ignore non-standard network requests (e.g., Firebase real-time onValue streams)
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && UI_ASSETS.includes(event.request.url.replace(self.location.origin, "")))) {
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(networkResponse => {
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') { 
                        return networkResponse; 
                    }
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                    return networkResponse;
                });
            })
        );
    }
});
