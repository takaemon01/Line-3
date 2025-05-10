const cacheName = 'line-chat-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  // 必要な他のファイル
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
