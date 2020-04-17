const express = require('express');
const router = express.Router();

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
// @desc    Get one Items
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
  });

  newItem.save().then((item) => res.json(item));
});

// @route   Patch/Update one item
// @desc    Update an item
// @access  Public
router.patch('/:id', (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    ingredients: req.body.ingredients,
    description: req.body.description,
    recipeType: req.body.recipeType,
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
    console.error(err);
  }
});

// @route   DELETE api/items/:id
// @desc    Delete item
// @access  Public
router.delete('/:id', (req, res) => {
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
});

module.exports = router;
