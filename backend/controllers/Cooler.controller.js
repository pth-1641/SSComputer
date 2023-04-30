const Cooler = require('../models/Cooler.model');
const createError = require('http-errors');
const JWT = require('jsonwebtoken');

const getAllCoolers = async (req, res) => {
  try {
    const itemPerPage = 15;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await Cooler.countDocuments();
    const startIdx = (page - 1) * itemPerPage;
    const drives = await Cooler.find().skip(startIdx).limit(itemPerPage);
    res.status(200).json({
      totalItems,
      items: drives,
      totalPages: Math.ceil(totalItems / itemPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getCooler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Cooler.findById(id);
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

const createCooler = async (req, res, next) => {
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
    await Cooler.create(req.body);
    res.json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

const deleteCooler = async (req, res, next) => {
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
    await Cooler.findByIdAndDelete(req.body.id);
    res.json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCoolers,
  getCooler,
  createCooler,
  deleteCooler,
};
