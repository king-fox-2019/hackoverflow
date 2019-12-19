'use strict'

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/index.js')
const morgan = require('morgan')
const { errorHandler } = require('./middlewares/errorHandler')
const sendEmails = require('./cron')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(_ => console.log("connected to database."))
  .catch(_ => console.log("database connection failed."));

app.use(morgan("dev"));
app.use('/', router)

app.use((req, res, next) => {
  const err = {
    msg: "Not Found.",
    status: 404
  };
  next(err);
});

app.use(errorHandler)
sendEmails()

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));

module.exports = app;