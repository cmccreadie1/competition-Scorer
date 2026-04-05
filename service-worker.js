const CACHE_NAME = 'sea-score-pro-v7.4.2';

// List of assets to store immediately for offline use
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/app.html',
    '/manifest.json',
    '/version.json',
    '/icon-512.png',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// 1. INSTALL: Pre-cache all essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Pre-caching offline assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// 2. ACTIVATE: Clean up old caches to save user storage
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Clearing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 3. FETCH: The "Offline-First" Strategy
self.addEventListener('fetch', (event) => {
    // Only handle GET requests (don't cache form submissions or API posts)
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return from cache if found, otherwise fetch from network
            const networkFetch = fetch(event.request).then((networkResponse) => {
                // If it's a valid response, update the cache with the new version
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Network failed (offline) and not in cache
                // You could return a custom offline.html here if you had one
            });

            return cachedResponse || networkFetch;
        })
    );
});
