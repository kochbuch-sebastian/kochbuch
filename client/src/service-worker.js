import { precacheAndRoute } from 'workbox-precaching';
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

precacheAndRoute(self.__WB_MANIFEST);

self.__precacheManifest = [].concat(self.__precacheManifest || [])

workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerRoute(
  new RegExp('items/'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'v2',
    method: 'GET',
    plugins: [],
    cacheableResponse: { statuses: [0, 200, 201, 202, 203, 204] },
  })
)

workbox.routing.registerRoute(
  new RegExp('icons/'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'v2',
    method: 'GET',
    plugins: [],
    cacheableResponse: { statuses: [0, 200, 201, 202, 203, 204] },
  })
)

workbox.routing.registerRoute(
  new RegExp('images/'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'v2',
    method: 'GET',
    plugins: [],
    cacheableResponse: { statuses: [0, 200, 201, 202, 203, 204] },
  })
)

workbox.routing.registerRoute(
  new RegExp('users/'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'v2',
    method: 'GET',
    plugins: [],
    cacheableResponse: { statuses: [0, 200, 201, 202, 203, 204] },
  })
)

self.addEventListener('push', event => {
  // let message = event.data.text();
  let notification = event.data.text()

  const splitter = new RegExp('%%', 'g')
  const notificationPayloads = notification.split(splitter)

  let link = ''
  switch (notificationPayloads[2]) {
    case 'recipe':
      link = `#/recipes/${notificationPayloads[1]}`
      break
    case 'user':
      link = `#/user/${notificationPayloads[1]}`
      break
    case 'image':
      link = `api/images/image/name/${notificationPayloads[1]}`
      break
    default:
      link = `#/`
      break
  }

  const click_open_url = `https://kochbuch.sthomas.ch/${link}`

  const options = {
    body: `${notificationPayloads[0]}`,
    icon: './img/icons/android-chrome-192x192.png',
    data: { url: click_open_url },

    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: 'vibration-sample',
  }
  event.waitUntil(self.registration.showNotification('kochbuch', options))
})

self.addEventListener('notificationclick', event => {
  const clickedNotification = event.notification

  const openUrl = event.notification.data.url

  clickedNotification.close()
  if (openUrl) {
    event.waitUntil(clients.openWindow(openUrl))
  }
})

if ('wakeLock' in navigator) {
  ;(async () => {
    await navigator.wakeLock.request('screen')
  })()
}
