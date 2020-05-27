self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  new RegExp('*'),
  workbox.strategies.networkFirst({
    cacheName: 'v2',
    method: 'GET',
    cacheableResponse: { statuses: [0, 200, 201, 202, 203, 204] },
  }),
);
