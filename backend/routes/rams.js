const express = require('express');
const router = express.Router();
const { getAllRams, getRams } = require('../controllers/Ram.controller');

router.get('/', getAllRams);
router.get('/:id', getRams);

module.exports = router;
