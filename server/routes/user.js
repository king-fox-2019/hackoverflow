const router = require('express').Router()
const UserController = require('../controllers/user')
const { authenticate } = require('../middlewares/auth')

// register
router.post('/register', UserController.register)

// login
router.post('/login', UserController.login)

// get one user
router.get('/info', authenticate, UserController.getInfo)

// get all user
router.get('/', authenticate ,UserController.getAllUser)

module.exports = router