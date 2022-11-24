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
self.addEventListener("fetch", async(e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request); 
    })
  );
});


// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     caches.match(e.request).then((response) => {
//       return response || fetch(e.request);
//     })
//   );
// });



