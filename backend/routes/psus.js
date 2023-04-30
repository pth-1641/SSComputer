const express = require('express');
const router = express.Router();
const {
  getAllPsus,
  getPsus,
  createPsu,
  deletePsu,
} = require('../controllers/Psu.controller');

router.get('/', getAllPsus);
router.get('/:id', getPsus);
router.post('/create', createPsu);
router.post('/delete', deletePsu);

module.exports = router;
