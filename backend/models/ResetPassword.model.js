const mongoose = require('mongoose');

const resetPasswordModel = mongoose.Schema({
  code: {
    type: Number,
    require: true,
  },
  ttl: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
});

const ResetPasswordModel = mongoose.model('reset-password', resetPasswordModel);

module.exports = ResetPasswordModel;
