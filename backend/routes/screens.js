const express = require('express');
const router = express.Router();
const {
  getAllScreens,
  getScreen,
  createScreen,
  deleteScreen,
} = require('../controllers/Screen.controller');

router.get('/', getAllScreens);
router.get('/:id', getScreen);
router.post('/create', createScreen);
router.post('/delete', deleteScreen);

module.exports = router;
