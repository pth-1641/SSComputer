const express = require('express');
const router = express.Router();
const {
  getAllDrives,
  getDrive,
  createDrive,
  deleteDrive,
} = require('../controllers/Drives.controller');

router.get('/', getAllDrives);
router.get('/:id', getDrive);
router.post('/create', createDrive);
router.post('/delete', deleteDrive);

module.exports = router;
