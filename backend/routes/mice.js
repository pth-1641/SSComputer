const express = require('express');
const router = express.Router();
const {
  getAllMice,
  getMouse,
  createMouse,
  deleteMouse,
} = require('../controllers/Mouse.controller');

router.get('/', getAllMice);
router.get('/:id', getMouse);
router.post('/create', createMouse);
router.post('/delete', deleteMouse);

module.exports = router;
