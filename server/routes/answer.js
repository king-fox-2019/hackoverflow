const router = require('express').Router()
const Answer = require('../controllers/answerController')
const authentication = require('../middlewares/authentication').authentication


router.use(authentication)
router.post('/:id',Answer.addAnswer)
router.delete('/:id',Answer.deleteAnswer)
router.post('/:id/upVotes', Answer.upVotes)
router.post('/:id/downVotes', Answer.downVotes)

module.exports = router