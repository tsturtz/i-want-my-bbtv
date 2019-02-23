const express = require('express');
const router = express.Router();

const SelectionsCtrl = require('../controllers/SelectionsCtrl');

router.get('/', SelectionsCtrl.getAllSelections);
router.get('/:selection', SelectionsCtrl.getSelection);

router.post('/option', SelectionsCtrl.addToSelection);
router.delete('/option', SelectionsCtrl.deleteFromSelection);

module.exports = router;
