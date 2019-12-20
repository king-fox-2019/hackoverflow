'use strict'

const express = require('express')
const router = express.Router()

const UserRouter = require('./user')
const QuestionRouter = require('./question')
const AnswerRouter = require('./answer')
const QuestionVoteRouter = require('./questionVote');

router.use('/users', UserRouter)
router.use('/questions', QuestionRouter)
router.use('/answers', AnswerRouter)
router.use('/questionVote', QuestionVoteRouter)

module.exports = router