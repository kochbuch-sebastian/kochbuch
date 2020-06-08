importScripts("/precache-manifest.4aaca6a1c4d3beb61e601922d0ee8dbf.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  new RegExp('items/'),
  workbox.strategies.networkFirst({
    cacheName: 'v2',
    method: 'GET',
    plugins: [],
    cacheableResponse: { statuses: [0, 200, 201, 202, 203, 204] },
  }),
);

workbox.routing.registerRoute(
  new RegExp('icons/'),
  workbox.strategies.networkFirst({
    cacheName: 'v2',
    method: 'GET',
    plugins: [],
    cacheableResponse: { statuses: [0, 200, 201, 202, 203, 204] },
  }),
);

workbox.routing.registerRoute(
  new RegExp('images/'),
  workbox.strategies.networkFirst({
    cacheName: 'v2',
    method: 'GET',
    plugins: [],
    cacheableResponse: { statuses: [0, 200, 201, 202, 203, 204] },
  }),
);

workbox.routing.registerRoute(
  new RegExp('users/'),
  workbox.strategies.networkFirst({
    cacheName: 'v2',
    method: 'GET',
    plugins: [],
    cacheableResponse: { statuses: [0, 200, 201, 202, 203, 204] },
  }),
);

let click_open_url;
self.addEventListener('push', (event) => {
  let message = event.data.text();

  click_open_url = 'https://kochbuch-sebastian.herokuapp.com';

  const options = {
    body: message,
    text: 'This here might not exist: the text',
    icon: './img/icons/android-chrome-192x192.png',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: 'vibration-sample',
  };
  event.waitUntil(self.registration.showNotification('kochbuch', options));
});

self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();
  if (click_open_url) {
    const promiseChain = clients.openWindow(click_open_url);
    event.waitUntil(promiseChain);
  }
});

