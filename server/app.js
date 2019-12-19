console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development')require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const errorHandling = require('./middlewares/errorHandling').errorHandler
const port = process.env.PORT


mongoose.connect(`mongodb://dwitamaalfred:${process.env.ATLASPASSWORD}@cluster0-shard-00-00-dehxs.gcp.mongodb.net:27017,cluster0-shard-00-01-dehxs.gcp.mongodb.net:27017,cluster0-shard-00-02-dehxs.gcp.mongodb.net:27017/hacktivOverflow?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`, { useCreateIndex: true,useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true}, function(err) {
  if(err) console.log('failed connect database')
  else console.log('successfully connected connect database')
})



app.use(cors())
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)


app.use(errorHandling)

app.listen(port,()=>{
    console.log('this app running on port',port);
})
