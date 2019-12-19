const routes = require('express').Router()
const questionController = require('../controllers/question')
const { authentication, authorizationQuestion } = require('../middlewares/auth')

routes.use(authentication)
routes.get('/', questionController.findAll)
routes.get('/:id', questionController.findOne)
routes.post('/', questionController.created)
routes.patch('/:id/upvotes', questionController.upvotes)
routes.patch('/:id/downvotes', questionController.downvotes)
routes.delete('/:id', authorizationQuestion ,questionController.delete)

module.exports = routes