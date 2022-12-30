var push = require('web-push')

const Subscription = require('../models/Subscription')

const pushKeys = require('../config/pushKeys')

const pushError = async (sub, payload) => {
  await Subscription.deleteOne(sub.endpoint)
  console.log('Successfully deleted subscription.')
}

module.exports = {
  sendPush: (pushSub, payload) => {
    push.setVapidDetails(
      'mailto:kochbuch-push@sthomas.ch',
      pushKeys.vapIDKeys.publicKey,
      pushKeys.vapIDKeys.privateKey
    )

    parsedPushSub = JSON.parse(pushSub)

    try {
      return push.sendNotification(parsedPushSub, payload)
    } catch (err) {
      pushError(parsedPushSub, payload)
    }
  },
  sendPushForEach: payload => {
    push.setVapidDetails(
      'mailto:kochbuch-push@sthomas.ch',
      pushKeys.vapIDKeys.publicKey,
      pushKeys.vapIDKeys.privateKey
    )

    Subscription.find().then(subs => {
      subs.forEach(sub => {
        try {
          push.sendNotification(sub, payload)
        } catch (err) {
          pushError(parsedPushSub, payload)
        }
      })
    })
  },
  sendPushForEachToRecipe: (payload, recipeId) => {
    push.setVapidDetails(
      'mailto:kochbuch-push@sthomas.ch',
      pushKeys.vapIDKeys.publicKey,
      pushKeys.vapIDKeys.privateKey
    )

    Subscription.find().then(subs => {
      subs.forEach(sub => {
        try {
          push.sendNotification(sub, `${payload}%%${recipeId}%%recipe`)
        } catch (err) {
          pushError(parsedPushSub, payload)
        }
      })
    })
  },
  sendPushForEachToUser: (payload, username) => {
    push.setVapidDetails(
      'mailto:kochbuch-push@sthomas.ch',
      pushKeys.vapIDKeys.publicKey,
      pushKeys.vapIDKeys.privateKey
    )

    Subscription.find().then(subs => {
      subs.forEach(sub => {
        try {
          push.sendNotification(sub, `${payload}||${username}||user`)
        } catch (err) {
          pushError(parsedPushSub, payload)
        }
      })
    })
  },
  sendPushForEachToImage: (payload, filename) => {
    push.setVapidDetails(
      'mailto:kochbuch-push@sthomas.ch',
      pushKeys.vapIDKeys.publicKey,
      pushKeys.vapIDKeys.privateKey
    )

    Subscription.find().then(subs => {
      subs.forEach(sub => {
        try {
          push.sendNotification(sub, `${payload}||${filename}||image`)
        } catch (err) {
          pushError(parsedPushSub, payload)
        }
      })
    })
  },
}
