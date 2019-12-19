const router = require('express').Router()
const QuestionController = require('../controllers/questionController')
const {authentication, questionAuthorization} = require('../middlewares/auth')

router.get('/', QuestionController.getAll)
router.get('/:id', QuestionController.getOne)
router.get('/test', QuestionController.testError)
router.use(authentication)
router.patch('/:id', questionAuthorization, QuestionController.updateOne)
router.patch('/:id/vote', QuestionController.vote)
router.post('/', QuestionController.create)
router.delete('/', questionAuthorization, QuestionController.delete)

module.exports = router