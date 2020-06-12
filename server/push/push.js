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

    const sub2 = {
      _id: { $oid: '5ee33280e01d3a0017157ebf' },
      endpoint:
        'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABe4zJ_heU-2G0rdIID_IZ_8bOlmd7x6MnVUY42M8spwlMk4of_KU3ZabprXRHPcsDTKCX_kV9ogscdVh8CemHnUnieiQjikh-1W7qAsRE8DvSaPjxXI_SvoLYmtDb-H0HPZgpNaisGQeb9thHQeR298zgI-B7ADNrByRYnz467c7OmkSA',
      keys: {
        auth: 'H9u-aF1ybDMA25QIlXgCkQ',
        p256dh:
          'BH6UvvU2y7Ha4owMYDR2MpPgtpoB5UKVk3bCjOvQZfOHf0OXQFyyFGpAg8aDF94n7KuQOle0emFi9_sdvwp8A10',
      },
      date: { $date: '2020-06-12T07:45:04.029Z' },
      __v: 0,
    };
    push.sendNotification(sub, {
      type: 'Test',
      payload: 'This is a test',
      testName: 'Testname',
    });
    push.sendNotification(sub2, {
      type: 'Test',
      payload: 'This is a test',
      testName: 'Testname',
    });
  },
};
