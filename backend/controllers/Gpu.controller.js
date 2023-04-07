const Gpu = require('../models/Vga.model');

const getAllGpus = async (req, res, next) => {
  try {
    const itemPerPage = 15;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await Gpu.countDocuments();
    const startIdx = (page - 1) * itemPerPage;
    const gpus = await Gpu.find().skip(startIdx).limit(itemPerPage);
    res.status(200).json({
      totalItems,
      items: gpus,
      totalPages: Math.ceil(totalItems / itemPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getGpu = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Gpu.findById(id);
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
  getAllGpus,
  getGpu,
};