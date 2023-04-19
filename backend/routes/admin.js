const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/Admin.controller');

router.post('/', loginAdmin);

module.exports = router;
