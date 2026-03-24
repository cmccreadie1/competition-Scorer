/**
 * Sea Diary: Match Pro - Service Worker
 * Version: 5.2.6-Gold-Master
 * Purpose: Ensures full offline functionality for shore matches.
 */

const CACHE_NAME = 'sea-diary-match-pro-v1';

// The list of files the app needs to work without internet
const ASSETS_TO_CACHE = [
  './',
  './index.html',    // The Landing Page
  './app.html',      // The Match Engine
  './manifest.json',
  './icon.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// 1. INSTALL: Save all files into the phone's cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Match Pro: Caching app assets for offline use');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. ACTIVATE: Clean up old versions of the app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Match Pro: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. FETCH: Serve files from cache first, then try the internet
// This is what makes the app work on a beach with 0 bars of signal.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached file if we have it, otherwise use the network
      return response || fetch(event.request).catch(() => {
        // If both fail (no signal AND not in cache), 
        // we can optionally return a 'you are offline' page here.
      });
    })
  );
});
