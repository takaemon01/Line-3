// キャッシュの名前
const CACHE_NAME = 'line-chat-pwa-cache-v1';

// キャッシュするファイルのリスト
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles.css',
  '/script.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// インストールイベント
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  // キャッシュをインストール
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching files');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// アクティベートイベント
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  
  // 不要なキャッシュを削除
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
});

// フェッチイベント（リソースの取得）
self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // キャッシュがあればそれを返す、なければネットワークから取得
      return cachedResponse || fetch(event.request);
    })
  );
});
