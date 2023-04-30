const express = require('express');
const router = express.Router();
const {
  getAllHeadphones,
  getHeadphone,
  createHeadphone,
  deleteHeadphone,
} = require('../controllers/Headphone.controller');

router.get('/', getAllHeadphones);
router.get('/:id', getHeadphone);
router.post('/create', createHeadphone);
router.post('/delete', deleteHeadphone);

module.exports = router;
