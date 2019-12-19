const router = require('express').Router()
const UserController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.patch('/', authentication, UserController.addTag)
router.patch('/removeTag', authentication, UserController.removeTag)
router.get('/', authentication, UserController.getUserData)

module.exports = router
