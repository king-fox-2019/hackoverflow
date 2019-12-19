const router = require('express').Router()
const questionController = require('../controllers/question')
const { authentication, questionAuthorization } = require('../middlewares/auth')

router.get('/', questionController.findAll)
router.get('/:id', questionController.findOne)

router.use(authentication)
router.post('/', questionController.create)
router.patch('/upvote/:id', questionController.upVote)
router.patch('/downvote/:id', questionController.downVote)

router.use('/:id', questionAuthorization)
router.patch('/:id', questionController.update)
router.delete('/:id', questionController.delete)

module.exports = router