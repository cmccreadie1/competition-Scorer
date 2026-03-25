const CACHE_NAME = 'live-sea-score-v6.0.0';

// List of files required for offline use
const ASSETS = [
    '/',
    '/index.html',
    '/app.html',
    '/manifest.json',
    '/icon-512.png',
    '/icon-512.jpg',
    '/icon.png'
];

// Install event - caching the assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(ASSETS);
        })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate event - cleaning up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Ensure the service worker takes control of all pages immediately
    self.clients.claim();
});

// Fetch event - serving from cache or falling back to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return the cached response if found
            if (cachedResponse) {
                return cachedResponse;
            }
            
            // Otherwise, fetch from the network
            return fetch(event.request).catch(() => {
                // If both the cache and network fail, and it's a navigation request, 
                // fallback to the app.html page to keep the app shell alive
                if (event.request.mode === 'navigate') {
                    return caches.match('/app.html');
                }
            });
        })
    );
});
