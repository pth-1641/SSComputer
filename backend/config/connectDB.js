const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
require('dotenv').config();

const mongoDBUri = process.env.MONGODB_URI;

const connectDB = () => {
  mongoose.connect(
    mongoDBUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    
  );
};

module.exports = connectDB;
