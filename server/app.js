if(process.env.NODE_ENV === 'development'){
    require ('dotenv').config()
}

const express =require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()


mongoose.connect('mongodb://localhost:27017/gitOverflow',{useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('connect to database')
        })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',routes)

app.use(errorHandler)

module.exports = app