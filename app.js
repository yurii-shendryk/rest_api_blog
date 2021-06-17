const express = require('express');
const app = express();
require('dotenv').config(); // використовуємо для отримання даних з файлу .env
const { connectMongo } = require('./src/db/connection');
const { router } = require('./src/routers/postsRouter');

const PORT = process.env.PORT || 8081;

app.use(express.json());

app.use('/api/posts', router);

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : 500;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  });
});

// create async function for db connection
const start = async () => {
  try {
    await connectMongo();
    app.listen(PORT, err => {
      if (err) console.log('Error at aserver launch', err);
      console.log(`Server run at port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
  }
};

start();
