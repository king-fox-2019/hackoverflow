if (process.env.NODE_ENV === `development`) {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cron = require('./helpers/cron')

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
  .then(() => console.log('connected to database'))
  .catch(err => console.log('failed to connect to database'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.use('/', routes)
app.use(errorHandler)

console.log(process.env.EMAIL);


cron()

app.listen(PORT, () => console.log('this app is running on PORT', PORT))