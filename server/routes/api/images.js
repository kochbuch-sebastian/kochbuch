const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const path = require('path');

const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const axios = require('axios');

// DB Config
const db = require('../../config/keys').mongoURI;

//Connect to DB
mongoose.set('useUnifiedTopology', true);

const conn = mongoose.createConnection(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Init gfs
let gfs;

conn.once('open', () => {
  //Init gfs
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('images');
});

// Create storage engine
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          reject(err);
        } else {
          const filename =
            buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename,
            bucketName: 'images',
          };
          resolve(fileInfo);
        }
      });
    });
  },
});
const upload = multer({ storage });

// @route   GET api/images
// @desc    Get All Images
// @access  Public
router.get('/', (req, res) => {
  console.log('Found files');
  gfs.files.find().then((items) => res.status(200).send(items));
});

router.post('/', upload.single('file'), (req, res) => {
  console.log('Posted');
  res.json({ file: req.file });
});

module.exports = router;
