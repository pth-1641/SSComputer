const express = require('express');
const router = express.Router();
const {
  createResetPassword,
} = require('../controllers/ResetPassword.controller');

router.post('/', createResetPassword);

module.exports = router;
