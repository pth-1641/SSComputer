const mongoose = require('mongoose');

const vgaModel = mongoose.Schema({
  title: {
    require: true,
    type: String,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
  features: [
    {
      type: { require: true, type: String, trim: true },
      name: { require: true, type: String, trim: true },
    },
  ],
  quantity: {
    type: Number,
    require: true,
  },
  price: {
    require: true,
    type: Number,
    trim: true,
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
  details: {
    gallery: [{ type: String, require: true, trim: true }],
    design: [
      {
        label: { require: true, type: String, trim: true },
        detail: {
          require: true,
          type: mongoose.Schema.Types.Mixed,
          trim: true,
        },
      },
    ],
    specifications: [
      {
        label: { require: true, type: String, trim: true },
        detail: {
          require: true,
          type: mongoose.Schema.Types.Mixed,
          trim: true,
        },
      },
    ],
    basic: [
      {
        label: { require: true, type: String, trim: true },
        detail: {
          require: true,
          type: mongoose.Schema.Types.Mixed,
          trim: true,
        },
      },
    ],
    review: {
      shortDescription: {
        title: { type: String, require: true, trim: true },
        thumbnail: {
          type: String,
          require: true,
          trim: true,
        },
      },
      features: [
        {
          title: { type: String, trim: true },
          detail: { type: String, trim: true },
          thumbnail: { type: String, trim: true },
        },
      ],
    },
  },
});

const VgaModel = mongoose.model('vga', vgaModel);

module.exports = VgaModel;
