if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoUri = process.env.MONGO_URI
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { errorHandler } = require('./middlewares/errorHandler.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then( _=> {
        console.log('connected to database.');
    })
    .catch( error => {
        console.log('connection to database failed.');
    })

app.use(morgan('dev'));
app.use('/', routes);

app.use((req, res, next) => {
    let err = {
        status: 404,
        msg: 'Not found.'
    }
    next(err);
})

app.use(errorHandler);

module.exports = app;