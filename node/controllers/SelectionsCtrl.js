const Selections = require('../models/Selections');

const forbidden = {
  status: false,
  error: 'Forbidden.',
}
const badlyFormatted = {
  status: false,
  error: 'Badly formatted request body.',
}

// GET /selections
exports.getAllSelections = (req, res) => {
  Selections.find({}, '-_id', (err, selection) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(selection);
  });
};
// GET /selections/:selection
exports.getSelection = (req, res) => {
  Selections.find({ selection: req.params.selection }, '-_id', (err, selection) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(selection);
  });
};

// POST /selections/option
// example request body:
// {
//   selection: tv_comedy
//   option: The Office
// }
exports.addToSelection = (req, res) => {
  if (req.body.key === process.env.KEY) {
    if (req.body.selection && req.body.option) {
      Selections.findOneAndUpdate(
        { selection: req.body.selection },
        { $addToSet: { options: req.body.option } },
        { new: true },
        (err, selection) => {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).json({
            status: true,
            payload: selection,
          });
        }
      );
    } else {
      res.status(200).send(badlyFormatted)
    }
  } else {
    res.status(403).send(forbidden)
  }
};

// DELETE /selections/option
// example request body:
// {
//   selection: tv_comedy
//   option: The Office
// }
exports.deleteFromSelection = (req, res) => {
  if (req.body.key === process.env.KEY) {
    if (req.body.selection && req.body.option) {
      Selections.findOneAndUpdate(
        { selection: req.body.selection },
        { $pull: { options: req.body.option } },
        { new: true },
        (err, selection) => {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).json({
            status: true,
            payload: selection,
          });
        }
      );
    } else {
      res.status(200).send(badlyFormatted)
    }
  } else {
    res.status(403).send(forbidden)
  }
};
