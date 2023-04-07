const express = require('express');
const router = express.Router();
const { getAllDrives, getDrive } = require('../controllers/Drives.controller');

router.get('/', getAllDrives);
router.get('/:id', getDrive);

module.exports = router;
