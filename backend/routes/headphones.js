const express = require('express');
const router = express.Router();
const {
  getAllHeadphones,
  getHeadphone,
} = require('../controllers/Headphone.controller');

router.get('/', getAllHeadphones);
router.get('/:id', getHeadphone);

module.exports = router;
