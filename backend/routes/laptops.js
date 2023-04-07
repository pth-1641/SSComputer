const express = require('express');
const router = express.Router();
const {
  getAllLaptops,
  getLaptop,
} = require('../controllers/Laptop.controller');

router.get('/', getAllLaptops);
router.get('/:id', getLaptop);

module.exports = router;
