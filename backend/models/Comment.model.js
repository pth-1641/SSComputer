const mongoose = require('mongoose');

const commentModel = mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
  },
  name: {
    type: String,
    require: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    require: true,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
  updatedAt: {
    type: Date,
    require: true,
    trim: true,
  },
  message: {
    type: String,
    require: true,
    trim: true,
  },
  repliedTo: {
    type: String,
    require: true,
    trim: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  itemId: {
    type: String,
    require: true,
    trim: true,
  },
  itemType: {
    type: String,
    require: true,
    trim: true,
  },
});

const CommentModel = mongoose.model('comment', commentModel);

module.exports = CommentModel;
