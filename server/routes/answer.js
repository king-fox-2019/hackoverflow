const routes = require('express').Router()
const AnswerController = require('../controllers/answer')
const { authenticate, authorize } = require('../middlewares/auth')

routes.use(authenticate)
routes.get('/:id', AnswerController.getQuestionAnswer)
routes.post('/', AnswerController.addAnswer)
routes.patch('/:id', AnswerController.commentToAnswer)
routes.delete('/:id',authorize('Answer'), AnswerController.deleteAnswer)
routes.put('/:id',authorize('Answer'), AnswerController.updateAnswer)
routes.patch('/upvotes/:id', AnswerController.addUpvotes)
routes.patch('/downvotes/:id', AnswerController.addDownvotes)

module.exports = routes