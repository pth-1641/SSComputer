require('dotenv').config();
const { accessToken } = require('../helpers/create-token');

const loginAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await accessToken({
      role: 'admin',
      email,
    });
    res.status(200).json({
      status: 200,
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { loginAdmin };
