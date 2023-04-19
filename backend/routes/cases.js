const express = require('express');
const router = express.Router();
const {
  getAllCases,
  getCase,
  createCase,
  deleteCase,
} = require('../controllers/Case.controller');

router.get('/', getAllCases);
router.post('/create', createCase);
router.post('/delete', deleteCase);
router.get('/:id', getCase);

module.exports = router;
