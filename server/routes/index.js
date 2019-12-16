const routes = require('express').Router()
const { authenticate } = require('../middlewares/auth')

routes.post('/signup')
routes.post('/signin')

routes.use(authenticate)
routes.get('/checksession')

module.exports = routes
