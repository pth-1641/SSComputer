const mongoose = require('mongoose');

const laptopModel = mongoose.Schema({
  title: {
    require: true,
    type: String,
  },
  features: [
    {
      type: { require: true, type: String },
      name: { require: true, type: String },
    },
  ],
  quantity: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
    trim: true,
  },
  brand: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    require: true,
    type: Number,
  },
  type: {
    require: true,
    type: String,
  },
  thumbnail: {
    require: true,
    type: String,
  },
  details: {
    gallery: [{ type: String, require: true }],
    design: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
    commodity: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
    battery: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
    review: {
      shortDescription: {
        title: { type: String, require: true, default: '' },
        thumbnail: { type: String, require: true, default: '' },
      },
      features: [
        {
          title: { type: String },
          detail: { type: String },
          thumbnail: { type: String },
        },
      ],
    },
    accessory: [{ type: String }],
    process: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
    ram: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
    card: [
      {
        label: {
          require: true,
          type: String,
          default: '',
        },
        detail: {
          require: true,
          type: mongoose.Schema.Types.Mixed,
          default: '',
        },
      },
    ],
    storage: [
      {
        label: {
          require: true,
          type: String,
          default: '',
        },
        detail: {
          require: true,
          type: mongoose.Schema.Types.Mixed,
          default: '',
        },
      },
    ],
    os: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
    screen: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
    security: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
    sound: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
    keyboard: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
  },
});

const LaptopModel = mongoose.model('laptop', laptopModel);

module.exports = LaptopModel;
