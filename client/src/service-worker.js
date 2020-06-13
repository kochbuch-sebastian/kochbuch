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
  // let message = event.data.text();
  let notification = event.data.text();

  const notificationPayloads = notification.split(/||/g);

  let link = '';
  switch (notificationPayloads[2]) {
    case 'recipe':
      link = `#/recipes/${notificationPayloads[1]}`;
      break;
    case 'user':
      link = `#/user/${notificationPayloads[1]}`;
      break;
    case 'image':
      link = `api/images/image/name/${notificationPayloads[1]}`;
      break;
    default:
      link = `#/${notificationPayloads[2]}`;
      break;
  }

  click_open_url = `https://kochbuch-sebastian.herokuapp.com/${link}`;

  const options = {
    body: `${notificationPayloads[0]}\nLink: ${click_open_url}`,
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
