const express = require('express')
const router = express.Router()
const UserRouter = require('./userRouter')
const AnswerRouter = require('./answerRouter')
const QuestionRouter = require('./questionRouter')

router.use('/users', UserRouter)

router.use('/answers', AnswerRouter)

router.use('/questions', QuestionRouter)

module.exports = router