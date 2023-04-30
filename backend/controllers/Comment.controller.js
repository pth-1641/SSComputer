const Comment = require('../models/Comment.model');
const createError = require('http-errors');
const JWT = require('jsonwebtoken');

const getCommentsById = async (req, res, next) => {
  try {
    const itemId = req.query.id;
    const comments = await Comment.find({ itemId });
    res.status(200).json({
      items: comments,
      totalItems: comments.length,
    });
  } catch (err) {
    next(err);
  }
};

const createComment = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw createError.Unauthorized('Chưa đăng nhập');
    }
    const isValidToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!isValidToken) {
      throw createError.Unauthorized('Chưa đăng nhập');
    }
    // const { role } = isValidToken;
    // if (role !== 'admin') {
    //   throw createError.Unauthorized('Admin chưa đăng nhập');
    // }
    await Comment.create(req.body);
    res.json({ status: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCommentsById,
  createComment,
};
