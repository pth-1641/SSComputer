const Mainboard = require('../models/Mainboard.model');

const getAllMainboards = async (req, res, next) => {
  try {
    const itemPerPage = 15;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await Mainboard.countDocuments();
    const startIdx = (page - 1) * itemPerPage;
    const mice = await Mainboard.find().skip(startIdx).limit(itemPerPage);
    res.status(200).json({
      totalItems,
      items: mice,
      totalPages: Math.ceil(totalItems / itemPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getMainboard = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Mainboard.findById(id);
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
  getAllMainboards,
  getMainboard,
};
