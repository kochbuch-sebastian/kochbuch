const Axios = require('axios');

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

subscribeToPush()
  .then((pushSub) => {
    console.log('Finished subscribing');
  })
  .catch((err) => {
    console.log(err);
  });

async function subscribeToPush() {
  console.log('SubscribeToPush');
  const push = await self.PushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(
      'BJ7W-pBAXF91XktUlW4smzlr5DKSn3HZI5ubRO2FL9xzvo3s5r0duXXKCH1o6MWgegXat4JT7uM0eooeYO0xpzE',
    ),
  });
  pushSub = JSON.stringify(push);
  console.log(pushSub);

  await Axios.post('/api/subscribe', {
    pushSub,
  });
  return pushSub;
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
