const CACHE_NAME = 'match-scorer-v7.4.0';
const ASSETS = [
  '/',
  '/index.html',
  '/app.html',
  '/manifest.json',
  '/version.json',
  '/icon-192.png',
  '/icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install event: Cache the initial assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('v7.4.0 Cache Initialized:', CACHE_NAME);
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event: Purge all old versions (v200 and older)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Purging legacy cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Single Source of Truth Logic
self.addEventListener('fetch', (event) => {
  // 1. Version Check: Always try network first so version.json is never "stale"
  if (event.request.url.includes('version.json')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // 2. Standard Assets: Serve from cache for speed, fallback to network
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((networkResponse) => {
        return networkResponse;
      });
    })
  );
});
