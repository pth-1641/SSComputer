const Computer = require('../models/Computer.model');

const getAllComputers = async (req, res, next) => {
  try {
    const itemPerPage = 15;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await Computer.countDocuments();
    const startIdx = (page - 1) * itemPerPage;
    const computers = await Computer.find().skip(startIdx).limit(itemPerPage);
    res.status(200).json({
      totalItems,
      items: computers,
      totalPages: Math.ceil(totalItems / itemPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getComputer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Computer.findById(id);
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
  getAllComputers,
  getComputer,
};
