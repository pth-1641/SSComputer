const Drive = require('../models/Drive.model');
const createError = require('http-errors');
const JWT = require('jsonwebtoken');

const getAllDrives = async (req, res, next) => {
  try {
    const itemPerPage = 15;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await Drive.countDocuments();
    const startIdx = (page - 1) * itemPerPage;
    const drives = await Drive.find().skip(startIdx).limit(itemPerPage);
    res.status(200).json({
      totalItems,
      items: drives,
      totalPages: Math.ceil(totalItems / itemPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getDrive = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Drive.findById(id);
    if (!item) {
      res.json({
        status: 404,
        message: 'Not Found',
      });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const createDrive = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw createError.Unauthorized('Admin chưa đăng nhập');
    }
    const isValidToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!isValidToken) {
      throw createError.Unauthorized('Admin chưa đăng nhập');
    }
    const { role } = isValidToken;
    if (role !== 'admin') {
      throw createError.Unauthorized('Admin chưa đăng nhập');
    }
    await Drive.create(req.body);
    res.json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

const deleteDrive = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw createError.Unauthorized('Admin chưa đăng nhập');
    }
    const isValidToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!isValidToken) {
      throw createError.Unauthorized('Admin chưa đăng nhập');
    }
    const { role } = isValidToken;
    if (role !== 'admin') {
      throw createError.Unauthorized('Admin chưa đăng nhập');
    }
    await Drive.findByIdAndDelete(req.body.id);
    res.json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllDrives,
  getDrive,
  createDrive,
  deleteDrive,
};
