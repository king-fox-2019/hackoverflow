const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/userController')
const { authenticating, authorizating } = require('../middlewares/auth')

router.get('/', ControllerUser.getAllUser)

router.post('/register', ControllerUser.register)

router.post('/login', ControllerUser.login)

router.patch('/:id', authenticating, authorizating, ControllerUser.updating)

module.exports = router