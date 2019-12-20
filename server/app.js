if(process.env.NODE_ENV==='development'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
mongoose.connect('mongodb+srv://richard123:richard123@cluster0-7i904.gcp.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
// const a = require('./cron')

// a()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',router)
app.use(errorHandler)

module.exports = app