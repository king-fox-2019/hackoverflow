require('dotenv').config()
require('./config/mongoose')

const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')
const port = process.env.PORT || 3000
const { errorHandler } = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/', router)

app.get((req, res, next) => {
    const err = {
        msg: 'Not Found.',
        status: 404
    }
    next(err)
})

app.use(errorHandler)

app.listen(port, () => console.log('listening to ' + port))