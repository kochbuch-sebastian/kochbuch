const express = require('express');
const router = express.Router();

const push = require('../../push/push');

const path = require('path');

router.post('/', (req, res) => {
  push
    .sendPush(req.body.pushSub, 'Subscription should have worked')
    .then(() => {
      res.status(200).json({});
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
