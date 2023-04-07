const Drive = require('../models/Drive.model');

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

module.exports = {
  getAllDrives,
  getDrive,
};
