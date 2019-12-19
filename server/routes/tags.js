const router = require('express').Router();
const UserController = require('../controllers/user.js');
const authenticate = require('../middlewares/authenticate');

router.use(authenticate)
router.get('/', UserController.getTags);
router.put('/', UserController.addUserTag);
router.patch('/', UserController.removeUserTag);

module.exports = router;