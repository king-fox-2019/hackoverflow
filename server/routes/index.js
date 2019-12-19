const router = require('express').Router()
const UserRoutes = require('./user')
const QuestionRoutes = require('./question')
const AnswerRoutes = require('./answer')


router.use('/users',UserRoutes)
router.use('/questions',QuestionRoutes)
router.use('/answers', AnswerRoutes)

module.exports = router