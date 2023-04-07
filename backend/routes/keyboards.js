const express = require('express');
const router = express.Router();
const {
  getAllKeyboards,
  getKeyboard,
} = require('../controllers/Keyboard.controller');

router.get('/', getAllKeyboards);
router.get('/:id', getKeyboard);

module.exports = router;
