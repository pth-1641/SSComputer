const express = require('express');
const router = express.Router();
const { getAllMice, getMouse } = require('../controllers/Mouse.controller');

router.get('/', getAllMice);
router.get('/:id', getMouse);

module.exports = router;
