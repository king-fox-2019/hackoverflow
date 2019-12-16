const router = require('express').Router()
const UserRouter = require('./user')
const QuestionRouter = require('./question')

router.use('/user', UserRouter)
router.use('/question', QuestionRouter)

module.exports = router