let cacheName = "APP-RGSHOP";
let filesToCache = ["/", "/index.html", "/offline.html",
                "/css/style.css", "/js/main.js"];
                
const OFFLINE_VERSION = 1;
const OFFLINE_URL = "offline.html"

/* inicializando a service worker e fazendo o 
download do conteúdo da aplicação */
self.addEventListener("install", (e) => {
  e.waitUntil(
      caches.open(cacheName).then(function (cache) {
        return cache.addAll(filesToCache);
      })
     );
});


/* disponibilizando o conteudo quando estiver offline */
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// if (event.request.mode === "navigate") {
//   event.respondWith(
//     (async () => {
//       try {
//         // First, try to use the navigation preload response if it's supported.
//         const preloadResponse = await event.preloadResponse;
//         if (preloadResponse) {
//           return preloadResponse;
//         }

//         // Always try the network first.
//         const networkResponse = await fetch(event.request);
//         return networkResponse;
//       } catch (error) {
//         // catch is only triggered if an exception is thrown, which is likely
//         // due to a network error.
//         // If fetch() returns a valid HTTP response with a response code in
//         // the 4xx or 5xx range, the catch() will NOT be called.
//         console.log("Fetch failed; returning offline page instead.", error);

//         const cache = await caches.open(CACHE_NAME);
//         const cachedResponse = await cache.match(OFFLINE_URL);
//         return cachedResponse;
//       }
//     })()
//   );

