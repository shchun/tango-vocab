const CACHE = 'tango-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = req.url;

  // 외부 API(시트/Apps Script)는 네트워크 우선
  if (url.includes('googleapis.com') || url.includes('google')) {
    e.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  // HTML/네비게이션은 네트워크 우선 → 배포가 즉시 반영, 오프라인 시 캐시 폴백
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(req).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(req, clone));
        return res;
      }).catch(() => caches.match(req).then(c => c || caches.match('/')))
    );
    return;
  }

  // 그 외 정적 자산(아이콘 등)은 캐시 우선
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(req, clone));
      return res;
    }))
  );
});
