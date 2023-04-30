const express = require('express');
const router = express.Router();
const {
  createNewOrder,
  getPendingOrderByUser,
  updateOrderStatus,
  getCanceledOrderByUser,
  getPendingOrderByAdmin,
  getOnGoingOrderByAdmin,
  getFinishedOrderByAdmin,
} = require('../controllers/Order.controller');

router.post('/create', createNewOrder);
router.get('/', getPendingOrderByUser);
router.post('/update-status', updateOrderStatus);
router.get('/canceled', getCanceledOrderByUser);
router.get('/admin', getPendingOrderByAdmin);
router.get('/admin/going', getOnGoingOrderByAdmin);
router.get('/admin/finished', getFinishedOrderByAdmin);

module.exports = router;
