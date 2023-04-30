const express = require('express');
const router = express.Router();
const {
  getAllCoolers,
  getCooler,
  createCooler,
  deleteCooler,
} = require('../controllers/Cooler.controller');

router.get('/', getAllCoolers);
router.get('/:id', getCooler);
router.post('/create', createCooler);
router.post('/delete', deleteCooler);

module.exports = router;
