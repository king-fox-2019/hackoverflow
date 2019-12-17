'use strict'
if(process.env.NODE_ENV='development') require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const errHandling = require('./middlewares/errHandling');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(_ => console.log(`Connected to ${MONGO_URI}`))
  .catch(_ => console.log(`Connection failed!`));

// Routing
const user = require('./routes/user');
const question = require('./routes/question');
app.use('/user', user);
app.use('/questions', question);

app.use(errHandling);
module.exports = app
