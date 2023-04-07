const mongoose = require('mongoose');

const orderModel = mongoose.Schema({
  items: [
    {
      thumbnail: {
        type: String,
        require: true,
        trim: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
      title: {
        type: String,
        require: true,
        trim: true,
      },

      price: {
        type: Number,
        require: true,
      },
    },
  ],
  status: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  createdAt: {
    type: Number,
    require: true,
  },
  updatedAt: {
    type: Number,
    require: true,
  },
  customer: {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    address: {
      type: String,
      require: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      require: true,
      trim: true,
    },
  },
});

const OrderModel = mongoose.model('order', orderModel);

module.exports = OrderModel;
