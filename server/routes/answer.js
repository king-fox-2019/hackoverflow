const express = require('express')
const router = express.Router()
const { answer } = require('../controllers')

router.post('/:id', answer.createAnswer)
router.get('/', answer.read)
router.patch('/upvotes/:id', answer.upVotes)
router.patch('/downvotes/:id', answer.downVotes)

module.exports = router