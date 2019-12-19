const router = require('express').Router()
const UserController = require('../controllers/userController')
const questionRouter = require('./questionRouter')
const answerRouter = require('./answerRouter')

router.get(
   '/secretEndpointGetUsers',
   function(req, res, next) {
      if(!req.headers.secret_token && req.headers.secret_token != 'secret_token') next({
         errorCode: 400,
         message: 'You are not authorized to perform this action'
      })
      else next()
}, UserController.readAll)

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/question', questionRouter)
router.use('/answer', answerRouter)

module.exports = router