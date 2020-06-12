var push = require('web-push');

const pushKeys = require('../config/pushKeys');

module.exports = {
  sendPush: (pushSub, payload) => {
    push.setVapidDetails(
      'mailto:kochbuch-sebastian@web.de',
      pushKeys.vapIDKeys.publicKey,
      pushKeys.vapIDKeys.privateKey,
    );

    parsedPushSub = JSON.parse(pushSub);

    return push.sendNotification(parsedPushSub, payload);
  },
  sendPushForEach: (payload) => {
    push.setVapidDetails(
      'mailto:kochbuch-sebastian@web.de',
      pushKeys.vapIDKeys.publicKey,
      pushKeys.vapIDKeys.privateKey,
    );

    Subscription.find().then((subs) => {
      subs.forEach((sub) => {
        push.sendNotification(sub, payload);
      });
    });
  },
  sendPushForEachToRecipe: (payload, recipeId) => {
    push.setVapidDetails(
      'mailto:kochbuch-sebastian@web.de',
      pushKeys.vapIDKeys.publicKey,
      pushKeys.vapIDKeys.privateKey,
    );

    Subscription.find((subs) => {
      subs.forEach((sub) => {
        push.sendNotification(sub, { type: 'recipe', payload, recipeId });
      });
    });
  },
  sendPushForEachToUser: (payload, username) => {
    push.setVapidDetails(
      'mailto:kochbuch-sebastian@web.de',
      pushKeys.vapIDKeys.publicKey,
      pushKeys.vapIDKeys.privateKey,
    );

    Subscription.find((subs) => {
      subs.forEach((sub) => {
        push.sendNotification(sub, { type: 'user', payload, username });
      });
    });
  },
  sendPushForEachToImage: (payload, filename) => {
    push.setVapidDetails(
      'mailto:kochbuch-sebastian@web.de',
      pushKeys.vapIDKeys.publicKey,
      pushKeys.vapIDKeys.privateKey,
    );

    Subscription.find((subs) => {
      subs.forEach((sub) => {
        push.sendNotification(sub, { type: 'image', payload, filename });
      });
    });
  },
  sendTestPushAsTest: () => {
    push.setVapidDetails(
      'mailto:kochbuch-sebastian@web.de',
      pushKeys.vapIDKeys.publicKey,
      pushKeys.vapIDKeys.privateKey,
    );

    const sub = {
      _id: { $oid: '5ee32f2dce5e2c0017882fe8' },
      endpoint:
        'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABe4y8t3ub7hEs5y1qgzO0HgU7uK-rLiiClLXmywPdNGRSUXnZm3GCQLe00BFxw4B351cDsqjSlJeC6sHiwTvickwlxYfuWIvtqOZFwdotZJ9ybwT8xu62KM1PXv9S1wVPcXivg5_fN6sNSjsCMo6FSKixkpCB6jo4BxJDC_fUSuzVRQb4',
      keys: {
        auth: 'UaXLTwCUNQ5Lk8GLh6wDvA',
        p256dh:
          'BLDQhwvqxPrplqsoXkMfkBg5eH-teB2esT40BWCyLjV0uvN22-D8BeLLq3C5KqLFMocmeurHKMKIlTrSmRGcrK8',
      },
      date: { $date: '2020-06-12T07:30:53.905Z' },
      __v: 0,
    };

    push.sendNotification(sub, {
      type: 'Test',
      payload: 'This is a test',
      testName: 'Testname',
    });
  },
};
