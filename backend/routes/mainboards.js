const express = require('express');
const router = express.Router();
const {
  getAllMainboards,
  getMainboard,
} = require('../controllers/Mainboard.model');

router.get('/', getAllMainboards);
router.get('/:id', getMainboard);

module.exports = router;
