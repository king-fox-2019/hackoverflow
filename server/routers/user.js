const router = require('express').Router();
const controllerUser = require('../controller/user');

router.post('/register', controllerUser.register);
router.get('/confirmation?', controllerUser.confirmation);
router.patch('/activate/:id', controllerUser.activate);
router.post('/login', controllerUser.login);

module.exports = router;