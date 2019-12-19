const router = require('express').Router()
const replyController = require('../controllers/ReplyController')
const { authenticate, authorizeReply } = require('../middlewares/auth')

router.get('/', authenticate, replyController.getAll)
router.post('/:threadId', authenticate, replyController.create)
router.patch('/:id/upvote', authenticate, replyController.upvote)
router.patch('/:id/downvote', authenticate, replyController.downvote)
router.patch('/:id', authenticate, authorizeReply, replyController.edit)
router.delete('/:id', authenticate, authorizeReply, replyController.delete)
// router.patch('/:id', authenticate, replyController.setAnswer)

module.exports = router