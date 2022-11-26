let cacheName = "APP-RGSHOP";
let cacheArmazena = "APP-RGSHOP-V1"
let filesToCache = ["/", "/index.html", "/fallback/offline.html",
                "/css/style.css", "/js/main.js"];
                

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
// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     caches.match(e.request).then((response) => {
//       return response || fetch(e.request).then(fetchRes => {
//         return caches.open(cacheArmazena).then(cache =>{
//           cache.put(e.request.url, fetchRes.clone())
//           return fetchRes
//         })
//       })
//     }).catch(() => { 
//       if(e.request.url.indexOf('.html') > -1){
//         return caches.match("/fallback/offline.html");
//       }})
//   );
// });

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

