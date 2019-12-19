if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler.js')
const mongoose = require('mongoose')
require('./cron.js')

const options = {
  'useNewUrlParser': true,
  'useFindAndModify': false,
  'useCreateIndex': true,
  'useUnifiedTopology': true
}

mongoose.connect(process.env.MONGO_URI, options)
.then(
  () => {console.log(`Success connect to DB`)},
  err => {console.log(`Error connect to DB`)}
);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})