const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce')
// const Sauce = require('../models/Sauce');

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

router.post('/', auth, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;