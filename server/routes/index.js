const routes = require('express').Router()
const { authenticate } = require('../middlewares/auth')
const { UserController } = require('../controllers')

routes.post('/signup', UserController.signUp)
routes.post('/signin', UserController.signIn)

routes.use(authenticate)
routes.use('/user', require('./user'))

module.exports = routes
