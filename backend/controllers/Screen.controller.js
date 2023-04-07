const Screen = require('../models/Screen.model');

const getAllScreens = async (req, res, next) => {
  try {
    const itemPerPage = 15;
    const page = parseInt(req.query.page) || 1;
    const totalItems = await Screen.countDocuments();
    const startIdx = (page - 1) * itemPerPage;
    const screens = await Screen.find().skip(startIdx).limit(itemPerPage);
    res.status(200).json({
      totalItems,
      items: screens,
      totalPages: Math.ceil(totalItems / itemPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getScreen = async (req, res, next) => {
  const id = req.params.id;
  const item = await Screen.findById(id);
  if (!item) {
    next(createError.NotFound('Not Found'));
  }
  res.json(item);
};

module.exports = {
  getAllScreens,
  getScreen,
};
