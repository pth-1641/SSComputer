const createError = require('http-errors');

const notFound = (req, res, next) => {
  next(createError.NotFound('Not Found'));
};

module.exports = { notFound };
