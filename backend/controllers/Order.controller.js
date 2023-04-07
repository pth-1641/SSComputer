const Order = require('../models/Order.model');
const User = require('../models/User.model');
const JWT = require('jsonwebtoken');

const createNewOrder = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw createError.Unauthorized('Người dùng chưa đăng nhập');
    }
    const isValidToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!isValidToken) {
      throw createError.Unauthorized('Người dùng chưa đăng nhập');
    }
    const { email } = isValidToken;
    await Order.create({
      ...req.body,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    });
    await User.findOneAndUpdate({ email }, { cart: [] });
    res.json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

const getPendingOrderByUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw createError.Unauthorized('Người dùng chưa đăng nhập');
    }
    const isValidToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!isValidToken) {
      throw createError.Unauthorized('Người dùng chưa đăng nhập');
    }
    const { email } = isValidToken;
    const orders = await Order.find({ email, status: 1 });
    res.status(200).json({ orders, status: 200 });
  } catch (err) {
    next(err);
  }
};

const getCanceledOrderByUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw createError.Unauthorized('Người dùng chưa đăng nhập');
    }
    const isValidToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!isValidToken) {
      throw createError.Unauthorized('Người dùng chưa đăng nhập');
    }
    const { email } = isValidToken;
    const orders = await Order.find({ email, status: 0 });
    res.status(200).json({ orders, status: 200 });
  } catch (err) {
    next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw createError.Unauthorized('Người dùng chưa đăng nhập');
    }
    const isValidToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!isValidToken) {
      throw createError.Unauthorized('Người dùng chưa đăng nhập');
    }
    const { id, status } = req.body;
    await Order.findOneAndUpdate(
      { _id: id },
      { status, updatedAt: new Date().getTime() }
    );
    res.status(200).json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewOrder,
  getPendingOrderByUser,
  updateOrderStatus,
  getCanceledOrderByUser,
};
