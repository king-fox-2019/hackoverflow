const router = require('express').Router()
const answerController = require('../controllers/answer')
const { authentication, answerAuthorization } = require('../middlewares/auth')


router.use(authentication)
router.get('/', answerController.findAll)
router.post('/', answerController.create)
router.get('/:id', answerController.findOne)

router.patch('/upvote/:id', answerController.upVote)
router.patch('/downvote/:id', answerController.downVote)
router.patch('/:id', answerAuthorization, answerController.update)

module.exports = router