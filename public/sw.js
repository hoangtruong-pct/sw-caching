self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open("static").then(function (cache) {
      console.log("[Service Worker] Precaching App Shell");
      cache.addAll([
        "/",
        "/src/js/app.js",
        "/src/css/app.css",
        "/src/images/main-image.jpg",
      ]);
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) return response;
      return fetch(response.request);
    })
  );
});
