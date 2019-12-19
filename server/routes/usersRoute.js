const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/auth.js');

router.get('/user', authentication, UserController.findById)
router.post('/login', UserController.login)
router.post('/register', UserController.register)

module.exports = router