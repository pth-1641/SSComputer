const express = require('express');
const router = express.Router();
const { getAllPsus, getPsus } = require('../controllers/Psu.controller');

router.get('/', getAllPsus);
router.get('/:id', getPsus);

module.exports = router;
