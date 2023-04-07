const express = require('express');
const router = express.Router();
const {
  createUser,
  resetUserPassword,
  loginUser,
  updateUserProfile,
  updateUserPassword,
  updateUserCart,
} = require('../controllers/User.controller');

router.post('/', loginUser);
router.post('/create', createUser);
router.post('/reset-password', resetUserPassword);
router.post('/update-profile', updateUserProfile);
router.post('/update-password', updateUserPassword);
router.post('/add-to-cart', updateUserCart);

module.exports = router;
