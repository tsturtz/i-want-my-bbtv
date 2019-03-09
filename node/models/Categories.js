const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  title: String,
  type: Schema.Types.Mixed,
  value: Schema.Types.Mixed,
  icon: String,
  iconType: String,
});

module.exports = mongoose.model('Categories', CategoriesSchema);