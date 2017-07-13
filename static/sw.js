importScripts('serviceworker-cache-polyfill.js');

var CACHE_NAME = 'houaa-pwa-v2.0.1';

// File want to cache
var urlsToCache = [
  // '/',
  '/index.html',
  '/manifest.json',
  // './src/assets/img/blank-thumbnail.png',
  '/favicon.png',
  '/favicon.ico',
  '/',
  // '/app.js',
  // './build.js',
];


// Set the callback for the install step
self.oninstall = function (e) {
  console.log('[serviceWorker]: Installing...');
  // perform install steps
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('[serviceWorker]: Cache All');
        return cache.addAll(urlsToCache);
      })
      .then(function () {
        console.log('[serviceWorker]: Intalled And Skip Waiting on Install');
        return self.skipWaiting();
      })
  );
};


self.onfetch = function (e) {
  e.respondWith(
    caches.match(e.request)
      .then(function (response) {
        if (response) {
          console.log('[serviceWorker]: cache hit with ', response)
          return response
        }
        let fetchRequest = e.request.clone();
        return fetch(fetchRequest).then(
          function (response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              console.log('[serviceWorker]: invalid cache')
              return response
            }

            let response2Cache = response.clone()
            caches.open(CACHE_NAME).then(
              function (cache) {
                console.log('[serviceWorker]: cache new resource ', response2Cache)
                cache.put(e.request, response2Cache)
              }
            )
            return response
          }
        )
      })
  )
};


self.onactivate = function (e) {

  console.log('[serviceWorker]: Actived');

  var whiteList = ['simple-pwa-v2'];

  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (whiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    }).then(function () {
      console.log('[serviceWorker]: Clients Claims');
      return self.clients.claim();
    })
  );

};