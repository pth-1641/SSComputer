const Case = require('../models/Case.model');
const JWT = require('jsonwebtoken');

const getAllCases = async (req, res, next) => {
  try {
    const itemPerPage = 15;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await Case.countDocuments();
    const startIdx = (page - 1) * itemPerPage;
    const cases = await Case.find().skip(startIdx).limit(itemPerPage);
    res.status(200).json({
      totalItems,
      items: cases,
      totalPages: Math.ceil(totalItems / itemPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getCase = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Case.findById(id);
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

const createCase = async (req, res, next) => {
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
    await Case.create(req.body);
    res.json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

const deleteCase = async (req, res, next) => {
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
    await Case.findByIdAndDelete(req.body.id);
    res.json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCases,
  getCase,
  createCase,
  deleteCase,
};
