const routes = require('express').Router()
const { UserController } = require('../controllers')

routes.post('/signup', UserController.signUp)
routes.post('/signin', UserController.signIn)

routes.use('/user', require('./user'))
routes.use('/questions', require('./questions'))
routes.use('/answers', require('./answers'))

module.exports = routes
