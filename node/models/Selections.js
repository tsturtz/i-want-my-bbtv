const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SelectionsSchema = new Schema({
  selection: String,
  options: [],
});

module.exports = mongoose.model('Selections', SelectionsSchema);