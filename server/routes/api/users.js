const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');
const passport = require('passport');

router.use(expressValidator());

const bcrypt = require('bcryptjs');

// Middleware to use req.checkBody()
// router.use(expressValidator());

// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get All Users
// @access  Public
router.get('/', (req, res) => {
  User.find()
    .sort({ date: 1 }) // Oldest at the top
    .then((users) => res.json(users));
});

// @route   GET api/users/:id
// @desc    Get one User
// @access  Public
router.get('/:id', (req, res) => {
  User.findById(req.params.id).then((users) => res.json(users));
});

router.post(
  '/login',
  (req, res, next) => {
    console.log(`Login try for ${req.body.username}`);
    next();
  },
  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        console.log(
          `Login try for ${req.body.username} failed: ${info.message}`,
        );
        return res.status(401).send(info);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        console.log(`Login try for ${req.body.username} successfull`);
        return res.status(200).send(user);
      });
    })(req, res, next);
  },
);

// @route   POST api/users
// @desc    Create new User
// @access  Public
router.post('/', (req, res) => {
  const username = req.body.username;
  const password1 = req.body.password1;
  const password2 = req.body.password2;
  const description = req.body.description;
  const favorites = req.body.favorites;

  User.find().then((users) => {
    const filtered = users.filter((user) => user.username === username);
    const exists = typeof filtered !== 'undefined' && filtered.length > 0;

    if (exists) {
      return res.status(400).json({
        success: false,
        errors: `There is already a user with the username ${username}; please try an other one!`,
      });
    }

    req.checkBody('username', 'Username is required!').notEmpty();
    req.checkBody('password1', 'Password1 is required!').notEmpty();
    req
      .checkBody('password2', 'Passwords do not match!')
      .equals(req.body.password1);

    const errors = req.validationErrors();

    if (!errors) {
      const newUser = new User({
        username,
        password: password1,
        description,
        favorites,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(500).json({
            success: false,
            errors:
              'Server internal error while generating salt for password, please try again!',
          });
        } else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              return res.status(500).json({
                success: false,
                errors:
                  'Server internal error while hashing password, please try again!',
              });
            } else {
              newUser.password = hash;

              newUser
                .save()
                .then((user) => res.status(201).json(user))
                .catch((err) => {
                  res.status(500).json({
                    success: false,
                    errors: err,
                  });
                });
            }
          });
        }
      });
    } else {
      console.log(errors);
      return res.status(400).json({ success: false, errors: errors });
    }
  });
});

router.patch('/:id', (req, res) => {
  if (req.body.password1 !== req.body.password2) {
    res
      .status(405)
      .json({ success: false, err: 'The two passwords do not match!' });
  } else {
    User.findById(req.params.id).then((oldUser) => {
      const newUser = new User({
        username: oldUser.username,
        password: req.body.password1,
        description: req.body.description,
        favorites: oldUser.favorites,
      });

      if (newUser.username === oldUser.username) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res.status(500).json({
              success: false,
              errors:
                'Server internal error while generating salt for password, please try again!',
            });
          } else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  errors:
                    'Server internal error while hashing password, please try again!',
                });
              } else {
                newUser.password = hash;

                const upsertData = newUser.toObject();
                delete upsertData._id;

                User.updateOne(
                  { _id: req.params.id },
                  upsertData,
                  { upsert: false },
                  (err, updatedDoc) => {
                    if (err) return res.status(500).json({ error: err });
                    return res.status(200).json(updatedDoc);
                  },
                ).catch((err) => {
                  throw err;
                });
              }
            });
          }
        });
      } else {
        res
          .status(405)
          .json({ success: false, error: 'The username has changed..?' });
      }
    });
  }
});

router.patch('/:id/password', (req, res) => {
  if (req.body.password1 !== req.body.password2) {
    res
      .status(405)
      .json({ success: false, err: 'The two passwords do not match!' });
  } else {
    User.findById(req.params.id).then((oldUser) => {
      const newUser = new User({
        username: oldUser.username,
        password: req.body.password1,
        description: oldUser.description,
        favorites: oldUser.favorites,
      });

      if (newUser.username === oldUser.username) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res.status(500).json({
              success: false,
              errors:
                'Server internal error while generating salt for password, please try again!',
            });
          } else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  errors:
                    'Server internal error while hashing password, please try again!',
                });
              } else {
                newUser.password = hash;

                const upsertData = newUser.toObject();
                delete upsertData._id;

                User.updateOne(
                  { _id: req.params.id },
                  upsertData,
                  { upsert: false },
                  (err, updatedDoc) => {
                    if (err) return res.status(500).json({ error: err });
                    return res.status(200).json(updatedDoc);
                  },
                ).catch((err) => {
                  throw err;
                });
              }
            });
          }
        });
      } else {
        res
          .status(405)
          .json({ success: false, error: 'The username has changed..?' });
      }
    });
  }
});

router.patch('/:id/description', (req, res) => {
  User.findById(req.params.id).then((oldUser) => {
    const newUser = new User({
      username: oldUser.username,
      password: oldUser.password,
      description: req.body.description,
      favorites: oldUser.favorites,
    });

    if (newUser.username === oldUser.username) {
      const upsertData = newUser.toObject();
      delete upsertData._id;

      User.updateOne(
        { _id: req.params.id },
        upsertData,
        { upsert: false },
        (err, updatedDoc) => {
          if (err) return res.status(500).json({ error: err });
          return res.status(200).json(updatedDoc);
        },
      ).catch((err) => {
        throw err;
      });
    } else {
      res
        .status(405)
        .json({ success: false, error: 'The username has changed..?' });
    }
  });
});

router.patch('/favorite/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      const newUser = new User({
        username: user.username,
        password: user.password,
        description: user.description,
        favorites: user.favorites,
      });

      if (newUser.favorites.includes(req.body.recipeId.toString())) {
        return res.status(400).json({
          success: false,
          err: `${req.body.recipeId.toString()} is already a favourite!`,
        });
      } else {
        newUser.favorites.push(req.body.recipeId.toString());
      }
      newUser.favorites = newUser.favorites.filter((el) => el !== '');

      const upsertData = newUser.toObject();

      delete upsertData._id;

      try {
        User.updateOne(
          { _id: req.params.id },
          upsertData,
          { upsert: true },
          (err, updatedDoc) => {
            if (err) return res.status(500).send({ error: err });
            return res.status(200).json({ success: true, user: updatedDoc });
          },
        ).catch((err) => {
          throw err;
        });
      } catch (err) {
        res.status(500).json({ success: false, error: err });
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.patch('/removeFavorite/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      const newUser = new User({
        username: user.username,
        password: user.password,
        description: user.description,
        favorites: user.favorites,
      });

      if (!newUser.favorites.includes(req.body.recipeId.toString())) {
        console.log(
          `${id}'s favorites do not include ${req.body.recipeId.toString()}`,
        );
        return res.status(400).json({
          success: false,
          err: `${req.body.recipeId.toString()} is not a favorite!`,
        });
      } else {
        newUser.favorites = newUser.favorites.filter(
          (el) => el !== req.body.recipeId.toString(),
        );
      }
      newUser.favorites = newUser.favorites.filter((el) => el !== '');

      const upsertData = newUser.toObject();

      delete upsertData._id;

      try {
        User.updateOne(
          { _id: req.params.id },
          upsertData,
          { upsert: true },
          (err, updatedDoc) => {
            if (err) return res.status(500).send({ error: err });
            return res.status(200).json({ success: true, user: updatedDoc });
          },
        ).catch((err) => {
          throw err;
        });
      } catch (err) {
        res.status(500).json({ success: false, error: err });
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

// @route   DELETE api/users/:id
// @desc    Delete user
// @access  Public
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.remove().then(() => {
        res.status(200).json({ success: true });
      });
    })
    .catch((err) => {
      console.log(`ERROR: \n${err}\n`);
      return res.json({ success: false });
    });
});

module.exports = router;
