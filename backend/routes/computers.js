const express = require('express');
const router = express.Router();
const {
  getAllComputers,
  getComputer,
} = require('../controllers/Computer.controller');

router.get('/', getAllComputers);
router.get('/:id', getComputer);

module.exports = router;
