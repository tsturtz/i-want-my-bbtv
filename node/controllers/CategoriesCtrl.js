const Categories = require('../models/Categories');

const badlyFormattedError = {
  status: false,
  error: 'Badly formatted request body.',
}

// GET /selections
exports.getAllCategories = (req, res) => {
  Categories.find({}, '-_id', (err, categories) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(categories);
  });
};
