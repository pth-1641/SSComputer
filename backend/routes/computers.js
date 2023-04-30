const express = require('express');
const router = express.Router();
const {
  getAllComputers,
  getComputer,
  createComputer,
  deleteComputer,
} = require('../controllers/Computer.controller');

router.get('/', getAllComputers);
router.get('/:id', getComputer);
router.post('/create', createComputer);
router.post('/delete', deleteComputer);

module.exports = router;
