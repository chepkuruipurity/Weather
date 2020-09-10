const FILES_TO_CACHE = [
    '',
  
    'index.html',
    'app.js',
    'install.js',
    'style.css'
  ];
  const CACHE_NAME='static-cache-v1'
  const DATA_CACHE_NAME = 'data-cache-v1';

self.addEventListener('install',(e)=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            return cache.addAll(FILES_TO_CACHE)
        })
    )
    
  self.skipWaiting();
});
self.addEventListener('activate', (evt )=> {
    console.log('Service worker activating...');
    //remove previous cache data
    evt.waitUntil(
        caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
    );

    self.clients.claim();
  });
self.addEventListener('fetch',(e)=>{

if (e.request.mode !== 'navigate') {
  
    return;
  }
  e.respondWith(
      fetch(e.request)
          .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                  return cache.match('offline.html');
                });
          })
  );
 
    e.respondWith(caches.match(e.request)
    .then((response)=>{
        if(response) return response;
        return fetch(e.request)
    })
    )
})