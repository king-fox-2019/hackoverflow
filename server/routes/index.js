const router = require('express').Router()
const UserRouter = require('./user')
const QuestionRouter = require('./question')
const AnswerRouter = require('./answer')

router.use('/user', UserRouter)
router.use('/question', QuestionRouter)
router.use('/answer', AnswerRouter)

module.exports = router