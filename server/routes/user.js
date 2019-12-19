const router = require('express').Router(),
  UserController = require('../controllers/user'),
  { authenticate } = require('../middlewares/auth')

router.get('/', authenticate, UserController.one)
router.post('/register', UserController.create)
router.post('/login', UserController.login)

module.exports = router