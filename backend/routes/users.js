const express = require('express');
const router = express.Router();
const {
  createUser,
  resetUserPassword,
  loginUser,
  updateUserProfile,
  updateUserPassword,
  updateUserCart,
  getAllUsers,
  updateUserStatus,
} = require('../controllers/User.controller');

router.post('/', loginUser);
router.post('/create', createUser);
router.post('/reset-password', resetUserPassword);
router.post('/update-profile', updateUserProfile);
router.post('/update-status', updateUserStatus);
router.post('/update-password', updateUserPassword);
router.post('/add-to-cart', updateUserCart);
router.get('/', getAllUsers);

module.exports = router;
