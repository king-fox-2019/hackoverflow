'use strict'

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/',userController.getAllUser)
router.post('/',userController.register)
router.post('/user/login',userController.login)

module.exports = router