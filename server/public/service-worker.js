importScripts("/precache-manifest.e28c5b04484db1e0b6a1d6fdb8170df4.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  new RegExp('*items*'),
  workbox.strategies.networkFirst({
    cacheName: 'v2',
    method: 'GET',
    cacheableResponse: { statuses: [0, 200, 201, 202, 203, 204] },
  }),
);

