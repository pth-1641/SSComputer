const express = require('express');
const router = express.Router();
const {
  getAllMainboards,
  getMainboard,
  createMainboard,
  deleteMainboard,
} = require('../controllers/Mainboard.model');

router.get('/', getAllMainboards);
router.get('/:id', getMainboard);
router.post('/create', createMainboard);
router.post('/delete', deleteMainboard);

module.exports = router;
