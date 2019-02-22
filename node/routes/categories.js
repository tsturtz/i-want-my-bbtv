const express = require('express');
const router = express.Router();

const CategoriesCtrl = require('../controllers/CategoriesCtrl');

router.get('/', CategoriesCtrl.getAllCategories);

module.exports = router;
