const router = require('express').Router()
const authentication = require('../middlewares/authentication').authentication
const question = require('../controllers/questionController')

router.use(authentication)
router.post('/', question.create)
router.get('/', question.findAll)
router.get('/:id', question.findOne)
router.delete('/:id', question.deleteQuestion)
router.post('/:id/upvotes', question.upVotes)
router.post('/:id/downvotes', question.downVotes)


module.exports = router