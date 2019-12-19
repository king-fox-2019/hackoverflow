const routes = require('express').Router()
const QuestionController = require('../controllers/question')
const { authenticate, authorize } = require('../middlewares/auth')

routes.get('/', QuestionController.getAllQuestion)
routes.use(authenticate)
routes.get('/user', QuestionController.getUserQuestion)
routes.get('/:id', QuestionController.getOneQuestion)
routes.post('/', QuestionController.AddQuestion)
routes.patch('/upvotes/:id', QuestionController.addUpvotes)
routes.patch('/downvotes/:id', QuestionController.addDownvotes)
routes.put('/:id',authorize('Question'), QuestionController.updateQuestion)
routes.delete('/:id',authorize('Question'), QuestionController.deleteQuestion)
module.exports = routes