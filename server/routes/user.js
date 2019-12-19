const routes = require('express').Router()
const UserController = require('../controllers/user')
const { authenticate } = require('../middlewares/auth')

routes.post('/', UserController.register)
routes.post('/login', UserController.login)
routes.get('/',authenticate, UserController.fetchTag)
routes.put('/', authenticate, UserController.addTag)

module.exports = routes