const router = require('express').Router()
const ThreadControl = require('../controllers/ThreadController')
const { authenticate, authorizeThread } = require('../middlewares/auth')

router.get('/', ThreadControl.getAll)
router.get('/:id', ThreadControl.getOne)
router.post('/', authenticate, ThreadControl.create)
router.delete('/:id', authenticate, authorizeThread, ThreadControl.delete)
router.patch('/:id/upvote', authenticate, ThreadControl.upvote)
router.patch('/:id/downvote', authenticate, ThreadControl.downvote)
router.patch('/:id', authenticate, ThreadControl.edit)

module.exports = router