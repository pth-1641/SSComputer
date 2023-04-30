const express = require('express');
const router = express.Router();
const {
  getAllLaptops,
  getLaptop,
  createLaptop,
  deleteLaptop,
} = require('../controllers/Laptop.controller');

router.get('/', getAllLaptops);
router.get('/:id', getLaptop);
router.post('/create', createLaptop);
router.post('/delete', deleteLaptop);

module.exports = router;
