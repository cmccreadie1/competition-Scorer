// ================================================================================
// SHORESCORE v15.2.0 CORE OFFLINE SEAMLESS SERVICE WORKER INFRASTRUCTURE
// ================================================================================
const CACHE_IDENTIFIER = 'shorescore-v16.1.0-matrix-cache';
const STATIC_ASSET_MANIFEST = [
  './',
  './index.html',
  './manifest.json',
  './icon-512.png'
];

// Installation Runtime Hook Handler
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_IDENTIFIER)
      .then((activeCacheContainer) => {
        return activeCacheContainer.addAll(STATIC_ASSET_MANIFEST);
      })
      .then(() => self.skipWaiting())
  );
});

// Cache Eviction & Cleanup Operations Routing Loop Context Flags
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((allRegisteredCacheKeys) => {
      return Promise.all(
        allRegisteredCacheKeys.map((key) => {
          if (key !== CACHE_IDENTIFIER) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interception Logic Pipelines (Stale-While-Revalidate Structural Network Optimization Pattern)
self.addEventListener('fetch', (event) => {
  // Guard network requests handling to prioritize inner storage arrays components layers
  if (event.request.method !== 'GET') return;

  // STRICT BYPASS: Never cache the version file so the app always sees the Netlify update
  if (event.request.url.includes('version.json')) {
      event.respondWith(fetch(event.request));
      return;
  }

  event.respondWith(
    caches.open(CACHE_IDENTIFIER).then((cacheStorage) => {
      return cacheStorage.match(event.request).then((cachedAssetResponse) => {
        const backgroundFetchDeployment = fetch(event.request).then((freshNetworkResponse) => {
          if (freshNetworkResponse.status === 200) {
            cacheStorage.put(event.request, freshNetworkResponse.clone());
          }
          return freshNetworkResponse;
        }).catch(() => {
          // Silent catch to handle deep offline states elegantly
        });

        return cachedAssetResponse || backgroundFetchDeployment;
      });
    })
  );
});
