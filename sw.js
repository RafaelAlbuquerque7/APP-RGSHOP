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

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
        return response || fetch(e.request);
    }).catch(() => {
      console.log("Fetch failed; returning offline page instead.");
      const cachedResponse = caches.open(cacheName).match('/fallback/offline.html');
    //  const cachedResponse = caches.match('/fallback/offline.html');
      return cachedResponse;
  })
  );
});


// self.addEventListener("fetch", (e) => {
//     e.respondWith(()=>{
//         try {
//         caches.match(e.request).then((response) => {
//            return response || fetch(e.request);
//         })
//         } catch (error) {
//           console.log("Fetch failed; returning offline page instead.", error);
//           const cache = caches.open(cacheName);
//           const cachedResponse = cache.match('/fallback/offline.html');
//           return cachedResponse;
//         }     
//       });
// });

