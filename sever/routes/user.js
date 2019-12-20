const router = require('express').Router()
const userController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')


router.post('/register', userController.register)
router.post('/login', userController.login)
router.use(authentication)
router.get('/specific', userController.findUser)
router.patch('/tag', userController.addTag)
router.patch('/tag/remove', userController.removeTag)
router.get('/tag', userController.findTags)


module.exports = router