if(process.env.NODE_ENV==='development')
{
    require('dotenv').config()
}
require('./config/mongoose')
require('./config/cron')


const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(require('morgan')())
app.use(require('cors')())


app.use(require('./router'))
app.use(require('./middleware/errorHandler'))



module.exports = app