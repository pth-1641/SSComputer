const express = require('express');
const router = express.Router();
const { getAllCpus, getCpu } = require('../controllers/Cpu.controller');

router.get('/', getAllCpus);
router.get('/:id', getCpu);

module.exports = router;
