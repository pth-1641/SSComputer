const mongoose = require('mongoose');

const userModel = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  address: {
    type: String,
    require: true,
    trim: true,
  },
  status: {
    type: Number,
    require: true,
  },
  cart: [
    {
      _id: false,
      itemId: { type: String, require: true, trim: true },
      type: {
        type: String,
        require: true,
        trim: true,
      },
      title: { type: String, require: true, trim: true },
      thumbnail: { type: String, require: true, trim: true },
      quantity: { type: Number, require: true },
      price: { type: Number, require: true },
    },
  ],
});

const UserModel = mongoose.model('user', userModel);

module.exports = UserModel;
