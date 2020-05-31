var push = require('web-push');

const pushKeys = require('../config/pushKeys');

module.exports = {
  sendPush: (pushSub, payload) => {
    push.setVapidDetails(
      'mailto:kochbuch-sebastian@web.de',
      pushKeys.vapIDKeys.publicKey,
      pushKeys.vapIDKeys.privateKey,
    );

    console.log('pushSub in push.js: ');

    parsedPushSub = JSON.parse(pushSub);
    console.log(parsedPushSub);

    return push.sendNotification(parsedPushSub, payload);
  },
};
/*
const sub = {};
push.sendNotification(sub, 'test message');
*/
