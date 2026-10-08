const CACHE_NAME = "kanban-v3";
const FILES_TO_SAVE = [
  "./",
  "index.html",
  "style.css",
  "script.js",
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
];

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      const requests = FILES_TO_SAVE.map(function (file) {
        return new Request(file, { cache: "reload" });
      });
      return cache.addAll(requests);
    }),
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (names) {
        return Promise.all(
          names.map(function (name) {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          }),
        );
      })
      .then(function () {
        return self.clients.claim();
      }),
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (saved) {
      return saved || fetch(event.request);
    }),
  );
});
