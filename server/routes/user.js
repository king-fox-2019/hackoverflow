const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { authentication } = require('../middlewares/auth')
router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.patch('/', UserController.updateTag)
router.get('/', UserController.getUserData)

module.exports = router