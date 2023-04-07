const Psu = require('../models/Psu.model');

const getAllPsus = async (req, res, next) => {
  try {
    const itemPerPage = 15;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await Psu.countDocuments();
    const startIdx = (page - 1) * itemPerPage;
    const screens = await Psu.find().skip(startIdx).limit(itemPerPage);
    res.status(200).json({
      totalItems,
      items: screens,
      totalPages: Math.ceil(totalItems / itemPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getPsus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Psu.findById(id);
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
  getAllPsus,
  getPsus,
};
