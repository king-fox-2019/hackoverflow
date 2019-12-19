const express = require('express')
const router = express.Router()
const user = require('./user')
const question = require('./question')
const answer = require('./answer')

router.use('/',user)
router.use('/question',question)
router.use('/answer',answer)

module.exports = router