const router = require('express').Router(),
  userRoute = require('./user'),
  questionRoute = require('./question'),
  answerRoute = require('./answer')
  
router.use('/user', userRoute)
router.use('/question', questionRoute)
router.use('/answer', answerRoute)

module.exports = router