const express = require('express');
const router = express.Router();
const {
  getAllRams,
  getRams,
  createRam,
  deleteRam,
} = require('../controllers/Ram.controller');

router.get('/', getAllRams);
router.get('/:id', getRams);
router.post('/create', createRam);
router.post('/delete', deleteRam);

module.exports = router;
