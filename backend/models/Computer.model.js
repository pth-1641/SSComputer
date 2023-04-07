const mongoose = require('mongoose');

const computerModel = mongoose.Schema({
  title: {
    require: true,
    type: String,
    trim: true,
  },
  price: {
    require: true,
    type: Number,
  },
  brand: {
    require: true,
    type: String,
    trim: true,
  },
  thumbnail: {
    require: true,
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  features: [
    {
      type: { require: true, type: String, trim: true },
      name: { require: true, type: String, trim: true },
    },
  ],
  type: {
    type: String,
    trim: true,
  },
  details: {
    gallery: [{ type: String, require: true, trim: true }],
    basic: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
    commodity: [
      {
        label: { require: true, type: String, trim: true },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
    design: [
      {
        label: {
          require: true,
          type: String,
          trim: true,
        },
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
    accessory: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
    process: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
    main: [
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
    connect: [
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
    power: [
      {
        label: { require: true, type: String },
        detail: { require: true, type: mongoose.Schema.Types.Mixed },
      },
    ],
  },
});

const ComputerModel = mongoose.model('computer', computerModel);

module.exports = ComputerModel;
