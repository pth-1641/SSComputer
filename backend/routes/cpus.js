const express = require('express');
const router = express.Router();
const {
  getAllCpus,
  getCpu,
  createCpu,
  deleteCpu,
} = require('../controllers/Cpu.controller');

router.get('/', getAllCpus);
router.get('/:id', getCpu);
router.post('/create', createCpu);
router.post('/delete', deleteCpu);

module.exports = router;
