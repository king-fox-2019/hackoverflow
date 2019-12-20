if(process.env.NODE_ENV === 'development'){ require('dotenv').config() }
const routes = require('../server/routes')
const errorHandler = require('../server/middlewares/errorHandler')
const cronxNodeMailer = require("./helpers/cron");
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000

require('../server/config/mongoose')
cronxNodeMailer()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/',routes)
app.use(errorHandler)

app.listen(port,(_=>{ console.log('listen to port',port)}))