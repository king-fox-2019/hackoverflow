'use strict'

const express = require('express')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    res.send(`Server Ready`)
})

app.use(router)

mongoose.connect(`mongodb://localhost:27017/hacktiv-overflow`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(
        () => {
            console.log(`Connected To MongoDB`)
        },
        err => {
            `Failed Connect To MongoDB`
        }
    )

app.use(errorHandler)
app.listen(3000, () => {
    console.log(`Listening on Port 3000`)
})