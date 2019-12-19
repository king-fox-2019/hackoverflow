const express = require('express')
const router = express.Router()
const userRoutes = require('./user.js')
const questionRoutes = require('./question.js')
const answerRoutes = require('./answer.js')

router.use('/users', userRoutes)
router.use('/questions', questionRoutes)
router.use('/answers', answerRoutes)

module.exports = router