const router = require('express').Router()
const UserController =  require('../controller/UserController')


router.get('/test', UserController.test)
router.delete('/master', UserController.MASTER_DELETE_ALL)

router.get('/', UserController.findAllUser)


router.post('/register', UserController.register)
router.post('/login', UserController.logIn)


module.exports = router