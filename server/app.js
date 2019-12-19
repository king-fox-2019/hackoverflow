if (process.env.NODE_ENV === 'development') require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

mongoose
  .connect('mongodb://localhost:27017/hackoverflow', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log('connected to db'))
  .catch(() => console.log('error occur when connecting to db'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', routes);
app.use(errorHandler);

module.exports = app;
