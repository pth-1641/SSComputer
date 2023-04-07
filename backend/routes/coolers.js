const express = require('express');
const router = express.Router();
const {
  getAllCoolers,
  getCooler,
} = require('../controllers/Cooler.controller');

router.get('/', getAllCoolers);
router.get('/:id', getCooler);

module.exports = router;
