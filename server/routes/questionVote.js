'use strict'

const express = require('express')
const router = express.Router()

const questionVote = require('../controllers/questionVoteController')
const auth = require('../middlewares/auth');

router.use(auth.authenticating)
router.post('/upvote/:questionId', questionVote.voteUp)
router.post('/downvote/:questionId', questionVote.voteDown)

module.exports = router