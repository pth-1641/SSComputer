const express = require('express');
const router = express.Router();
const { getAllCases, getCase } = require('../controllers/Case.controller');

router.get('/', getAllCases);
router.get('/:id', getCase);

module.exports = router;
