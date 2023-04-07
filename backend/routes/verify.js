const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const User = require('../models/User.model');
require('dotenv').config();

router.get('/', async (req, res, next) => {
  try {
    const token = req.query.token;
    const { name, redirectUrl } = JWT.verify(
      token,
      process.env.NODEMAILER_SECRET_KEY
    );
    console.log(name);
    if (!name) {
      throw new Error('Invalid Token');
    }
    const result = await User.findOneAndUpdate({ name }, { status: 2 });
    if (result) res.redirect(redirectUrl + '/signin');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
