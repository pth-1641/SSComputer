const Cpu = require('../models/Cpu.model');

const getAllCpus = async (req, res) => {
  try {
    const itemPerPage = 15;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await Cpu.countDocuments();
    const startIdx = (page - 1) * itemPerPage;
    const drives = await Cpu.find().skip(startIdx).limit(itemPerPage);
    res.status(200).json({
      totalItems,
      items: drives,
      totalPages: Math.ceil(totalItems / itemPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getCpu = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Cpu.findById(id);
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
  getAllCpus,
  getCpu,
};