const CACHE_NAME = 'customer-portal-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/portal.html',
  '/manifest.webmanifest',
  // Add any other static assets you want to cache here, e.g. CSS, JS, images
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => cachedResponse || fetch(event.request))
  );
});
