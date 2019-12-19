if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require ('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3002
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/overflow', {useNewUrlParser: true});
const errorHandler = require('./middlewares/errorHandler')
const Question = require('./routes/question')
const Answer = require('./routes/answer')
const User = require('./routes/user')

const {cron} = require('./helpers/cron')

cron()
// main().catch(console.log)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/user', User)
app.use('/question', Question)
app.use('/answer', Answer)
app.use(errorHandler)

app.listen(port)