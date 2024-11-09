const CACHE_NAME = "whack-a-dummy-v1.0.0";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/images/awakened-wellness-warrior.svg",
  "/images/bewitched-office-diva.svg",
  "/images/lifeless-team-player.svg",
  "/images/monster-of-moneymaking.svg",
  "/images/phantom-of-the-ledger.svg",
  "/images/scarecrow-of-accountability.svg",
  "/images/shadowy-executive.svg",
  "/images/wrap-it-up-worrywart.svg",
  "/sounds/end.mp3",
  "/sounds/start.mp3",
  "/sounds/whack.mp3",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
