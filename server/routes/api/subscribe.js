const express = require('express');
const router = express.Router();

const Subscription = require('../../models/Subscription');

const push = require('../../push/push');

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'From here, you can subscribe with a post request and the pushSub. ',
  });
});

router.post('/', (req, res) => {
  if (!req.body.pushSub) {
    res.status(400).json({ err: 'Push Subscription not sent' });
  }

  parsedPushSub = JSON.parse(req.body.pushSub);

  const newSub = new Subscription(parsedPushSub);

  newSub.save().then(
    push
      .sendPush(req.body.pushSub, 'Sie bekommen jetzt Benachrichtigungen. ')
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err });
      }),
  );
});

router.get('/all', (req, res) => {
  Subscription.find().then((subs) => res.json(subs));
});

router.get('/sendTest', (req, res) => {
  console.log('testing');
  push.sendPushForEach('Test');

  res.status(200).json({ msg: 'worked' });
});

module.exports = router;
