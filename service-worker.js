const CACHE_NAME = 'sea-diary-v1.0.5';
const PRECACHE_ASSETS = [
    '/competition-Scorer/',
    '/competition-Scorer/index.html',
    '/competition-Scorer/app.html',
    '/competition-Scorer/manifest.json',
    '/competition-Scorer/icon.png',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install Event: Caches all essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Pre-caching offline assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Event: Cleans up old versions of the cache
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Removing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event: Serves files from cache first, then the network
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version if found
                if (response) {
                    return response;
                }

                // Otherwise, try to fetch from the network
                return fetch(event.request).then((networkResponse) => {
                    // Don't cache if not a valid response
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }

                    // Clone the response to store it in the cache
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                    return networkResponse;
                });
            }).catch(() => {
                // If both fail (offline), and it's a page request, show index.html
                if (event.request.mode === 'navigate') {
                    return caches.match('/competition-Scorer/index.html');
                }
            })
    );
});
