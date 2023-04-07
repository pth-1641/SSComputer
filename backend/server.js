require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const routes = require('./routes/index');
const { notFound } = require('./middlewares/error-handlers');

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/v1/', routes);
app.use('/verify', require('./routes/verify'));

// Error handler
app.use(notFound);

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 400,
    message: err.message || 'Bad Request',
  });
});

// Start
app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server running at http://localhost:${port}`);
  } catch (err) {
    console.log(err);
  }
});
