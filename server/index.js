const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const enforce = require('express-sslify');

const passport = require('passport');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const images = require('./routes/api/images');
const icons = require('./routes/api/icons');
const send = require('./routes/api/send');
const subscribe = require('./routes/api/subscribe');

const app = express();

app.use(express.json());
app.use(cors());

app.use(enforce.HTTPS({ trustProtoHeader: true }));

// Not needed!!! following 15 lines...
/*
// Add headers

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.2.100:8080');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
*/

// DB Config
const db = require('./config/keys').mongoURI;

//Connect to DB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Passport Config
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/images', images);
app.use('/api/icons', icons);

app.use('/api/send', send);
app.use('/api/subscribe', subscribe);

// Handle production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));

  // Handle Single Page Application
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
