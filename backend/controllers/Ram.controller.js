const Ram = require('../models/Ram.model');

const getAllRams = async (req, res, next) => {
  try {
    const itemPerPage = 15;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await Ram.countDocuments();
    const startIdx = (page - 1) * itemPerPage;
    const screens = await Ram.find().skip(startIdx).limit(itemPerPage);
    res.status(200).json({
      totalItems,
      items: screens,
      totalPages: Math.ceil(totalItems / itemPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getRams = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Ram.findById(id);
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
  getAllRams,
  getRams,
};
