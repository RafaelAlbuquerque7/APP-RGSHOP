let cacheName = "APP-RGSHOP";
let filesToCache = ["/", "favicon.ico","/index.html", "/fallback/offline.html",
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

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)))
    })
  )
})


// /* disponibilizando o conteudo quando estiver offline */
// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     caches.match(e.request).then((response) => {
//       return response || fetch(e.request).then(fetchRes => {
//         return caches.open(cacheArmazena).then(cache =>{
//           console.log(cacheArmazena)
//          cache.put(e.request.url, fetchRes.clone())
//          return fetchRes;
//         })
//       })
//     }).catch(() => {return caches.match("/fallback/offline.html");})     
//   );
// });

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});


// self.addEventListener("fetch", (e) => {
//     e.respondWith(
//       (async () => {
//         try {
//           const resposta = await e.resposta;
//           console.log(resposta);
//           if (resposta) {
//             return resposta;
//           }
//           const networkResponse = await fetch(e.request);
//           return networkResponse;
//         } catch (error) {
//           console.log("Fetch failed; returning offline page instead.", error);
//           const cache = await caches.open(cacheName);
//           const cachedResponse = await cache.match('/fallback/offline.html');
//           return cachedResponse;
//         }
//       })
//     );
  
// });
