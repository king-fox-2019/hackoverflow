const router = require('express').Router()
const answerController = require('../controllers/answerController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/',answerController.create)
router.get('/',answerController.get)
router.delete('/',answerController.delete)
router.put('/',answerController.update)
router.put('/:id',answerController.vote)

module.exports = router