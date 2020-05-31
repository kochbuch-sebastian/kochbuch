const express = require('express');
const router = express.Router();

const push = require('../../push/push');

const path = require('path');

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'From here, you can subscribe with a post request and the pushSub. ',
  });
});

router.post('/', (req, res) => {
  if (!req.body.pushSub) {
    res.status(400).json({ err: 'Push Subscription not sent' });
  }
  push
    .sendPush(req.body.pushSub, 'Subscription should have worked')
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

module.exports = router;
