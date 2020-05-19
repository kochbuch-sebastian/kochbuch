const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
  res.json({
    msg: 'From here, you can send emails with a single post request',
  });
});

// @route   POST api/users
// @desc    Create new User
// @access  Public
router.post('/plain', (req, res) => {
  console.log('In post');

  const address = req.body.address;
  const subject = req.body.subject;
  const content = req.body.content;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL

    auth: {
      user: 'kochbuch.sebastian.liste@gmail.com',
      pass: 'KochbuchList#04',
    },
  });

  const mailOptions = {
    from: 'kochbuch.sebastian.liste@gmail.com',
    to: address + ', kochbuch.sebastian.liste@gmail.com',
    subject: subject,
    text: content,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(`err: ${err}`);
      res
        .status(500)
        .json({ error: 'Something did not work as it should have worked.' });
    } else {
      console.log('Email sent: ' + info.response);
      console.log('worked');
      res.status(200).json(`Email sent to ${address}`);
    }
  });
});

router.post('/html', (req, res) => {
  console.log('In post');

  const address = req.body.address;
  const subject = req.body.subject;
  const htmlContent = req.body.htmlContent;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL

    auth: {
      user: 'kochbuch.sebastian.liste@gmail.com',
      pass: 'KochbuchList#04',
    },
  });

  const mailOptions = {
    from: 'kochbuch.sebastian.liste@gmail.com',
    to: address + ', kochbuch.sebastian.liste@gmail.com',
    subject: subject,
    html: `<!DOCTYPE html>${htmlContent}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(`err: ${err}`);
      res
        .status(500)
        .json({ error: 'Something did not work as it should have worked.' });
    } else {
      console.log('Email sent: ' + info.response);
      console.log('worked');
      res.status(200).json(`Email sent to ${address}`);
    }
  });
});

module.exports = router;
