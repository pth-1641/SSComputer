const express = require('express');
const router = express.Router();
const {
  getAllGpus,
  getGpu,
  createGpu,
  deleteGpu,
} = require('../controllers/Gpu.controller');

router.get('/', getAllGpus);
router.get('/:id', getGpu);
router.post('/create', createGpu);
router.post('/delete', deleteGpu);

module.exports = router;
