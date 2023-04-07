const Headphone = require('../models/Headphone.model');

const getAllHeadphones = async (req, res) => {
  try {
    const itemPerPage = 15;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await Headphone.countDocuments();
    const startIdx = (page - 1) * itemPerPage;
    const headphones = await Headphone.find().skip(startIdx).limit(itemPerPage);
    res.status(200).json({
      totalItems,
      items: headphones,
      totalPages: Math.ceil(totalItems / itemPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getHeadphone = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Headphone.findById(id);
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
  getAllHeadphones,
  getHeadphone,
};
