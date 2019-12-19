const router = require('express').Router()
const ControllerUser = require('../controllers/user')
const authenticate = require('../middlewares/authenticate')

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)

router.use(authenticate)
router.get('/user', ControllerUser.findById)
router.post('/tags', ControllerUser.watchTags)
router.delete('/tags/:tag', ControllerUser.unwatchATag)

module.exports = router