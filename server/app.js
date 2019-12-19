if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

require('./config/mongoose')

const cors = require('cors'),
    morgan = require('morgan'),
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    routes = require('./routes'),
    cron = require('./helpers/cronjob'),
    { errorHandler } = require('./middlewares/errorHandler');


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
cron()
app.use(errorHandler)

module.exports = app