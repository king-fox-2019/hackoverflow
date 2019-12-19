const router = require('express').Router()
const authentication = require('../middlewares/authentication').authentication
const question = require('../controllers/questionController')

router.post('/topthree', question.createTopThree)

router.use(authentication)
router.get('/topthree', question.GetTopThree)
router.get('/unanswered', question.unansweredQuestion)
router.get('/popular', question.popular)
router.get('/', question.findAll)
router.post('/', question.create)
router.get('/:id', question.findOne)
router.post('/:filter', question.filteredByTag)
router.delete('/:id', question.deleteQuestion)
router.post('/:id/upvotes', question.upVotes)
router.post('/:id/downvotes', question.downVotes)


module.exports = router