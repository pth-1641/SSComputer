const express = require('express');
const router = express.Router();
const { getAllGpus, getGpu } = require('../controllers/Gpu.controller');

router.get('/', getAllGpus);
router.get('/:id', getGpu);

module.exports = router;
