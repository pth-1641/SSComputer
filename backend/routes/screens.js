const express = require('express');
const router = express.Router();
const {
  getAllScreens,
  getScreen,
} = require('../controllers/Screen.controller');

router.get('/', getAllScreens);
router.get('/:id', getScreen);

module.exports = router;
