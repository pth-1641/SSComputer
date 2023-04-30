const express = require('express');
const router = express.Router();
const {
  getAllKeyboards,
  getKeyboard,
  createKeyboard,
  deleteKeyboard,
} = require('../controllers/Keyboard.controller');

router.get('/', getAllKeyboards);
router.get('/:id', getKeyboard);
router.post('/create', createKeyboard);
router.post('/delete', deleteKeyboard);

module.exports = router;
