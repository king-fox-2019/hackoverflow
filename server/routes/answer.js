const routes = require('express').Router()
const answerController = require('../controllers/answer')
const { authentication, authorizationAnswer } = require('../middlewares/auth')

routes.use(authentication)
routes.get('/', answerController.findAll)
routes.get('/:id', answerController.findOne)
routes.post('/:id', answerController.created)
routes.put('/:id/updated', answerController.updated)
routes.patch('/:id/upvotes', answerController.upvotes)
routes.patch('/:id/downvotes', answerController.downvotes)
routes.delete('/:id', authorizationAnswer , answerController.delete)

module.exports = routes