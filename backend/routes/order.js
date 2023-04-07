const express = require('express');
const router = express.Router();
const {
  createNewOrder,
  getPendingOrderByUser,
  updateOrderStatus,
  getCanceledOrderByUser,
} = require('../controllers/Order.controller');

router.post('/create', createNewOrder);
router.get('/', getPendingOrderByUser);
router.post('/update-status', updateOrderStatus);
router.get('/canceled', getCanceledOrderByUser);

module.exports = router;
