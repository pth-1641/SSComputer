const Laptop = require('../models/Laptop.model');
const createError = require('http-errors');

const getAllLaptops = async (req, res, next) => {
  try {
    const itemPerPage = 15;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await Laptop.countDocuments();
    const startIdx = (page - 1) * itemPerPage;
    const laptops = await Laptop.find().skip(startIdx).limit(itemPerPage);
    res.status(200).json({
      totalItems,
      items: laptops,
      totalPages: Math.ceil(totalItems / itemPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getLaptop = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Laptop.findById(id);
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

module.exports = {
  getAllLaptops,
  getLaptop,
};
