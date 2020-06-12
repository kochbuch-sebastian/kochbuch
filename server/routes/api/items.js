const express = require('express');
const router = express.Router();

const push = require('../../push/push');

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: 1 }) // Oldest at the top
    .then((items) => res.json(items));
});

// @route   GET api/items/:id
// @desc    Get one Item
// @access  Public
router.get('/:id', (req, res) => {
  Item.findById(req.params.id).then((items) => res.json(items));
});

// @route   POST api/items
// @desc    Create new Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    ingredients: req.body.ingredients,
    description: req.body.description,
    recipeType: req.body.recipeType,
    username: req.body.username,
    pictures: [],
  });

  newItem.save().then((item) => {
    /* push.sendPushForEachToRecipe(
      `Ein neues Rezept (id: ${item._id}) wurde von ${item.username} erstellt. `,
      item._id,
    ); */
    push.sendPushForEach(
      `Ein neues Rezept (id: ${item._id}) wurde von ${item.username} erstellt. `,
    );
    return res.json(item);
  });
});

// @route   Patch/Update one item
// @desc    Update an item
// @access  Public
router.patch('/:id', (req, res) => {
  Item.findById(req.params.id).then((oldItem) => {
    const newItem = new Item({
      title: req.body.title,
      ingredients: req.body.ingredients,
      description: req.body.description,
      recipeType: req.body.recipeType,
      username: req.body.username,
      pictures: oldItem.pictures,
    });

    const upsertData = newItem.toObject();

    delete upsertData._id;

    if (newItem.username === oldItem.username) {
      try {
        Item.updateOne(
          { _id: req.params.id },
          upsertData,
          { upsert: true },
          (err, updatedDoc) => {
            if (err) return res.status(500).send({ error: err });
            return res.send(updatedDoc);
          },
        ).catch((err) => {
          throw err;
        });
      } catch (err) {
        res.status(500).json({ success: false, error: err });
      }
    } else {
      res.status(405).json({ success: false, error: 'Not allowed' });
    }
  });
});

// @route   DELETE api/items/:id
// @desc    Delete item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then((oldItem) => {
      if (req.body.username === oldItem.username) {
        Item.findById(req.params.id)
          .then((item) => {
            item.remove().then(() => {
              res.status(200).json({ success: true });
            });
          })
          .catch((err) => {
            console.log(`ERROR: \n${err}\n`);
            return res.json({ success: false });
          });
      } else {
        res.status(405).json({ success: false, error: 'Not allowed' });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err });
    });
});

router.patch('/addimage/:id', (req, res) => {
  if (!req.body.imageName) {
    res.status(401).json({ success: false, error: 'No imageName provided' });
  }

  console.log('Patching addimage/:id');
  Item.findById(req.params.id).then((oldItem) => {
    const pictures = oldItem.pictures ? oldItem.pictures : [];

    pictures.push(req.body.imageName);

    const newItem = new Item({
      title: oldItem.title,
      ingredients: oldItem.ingredients,
      description: oldItem.description,
      recipeType: oldItem.recipeType,
      username: oldItem.username,
      pictures: pictures,
    });

    const upsertData = newItem.toObject();

    delete upsertData._id;

    try {
      Item.updateOne(
        { _id: req.params.id },
        upsertData,
        { upsert: true },
        (err, updatedDoc) => {
          if (err) return res.status(500).send({ error: err });
          return res.send(updatedDoc);
        },
      ).catch((err) => {
        throw err;
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  });
});

module.exports = router;
