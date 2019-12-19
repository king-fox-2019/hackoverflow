const router = require('express').Router();
const UserController = require('../controllers/user.js');
const questionRoutes = require('../routes/questions');
const answerRoutes = require('../routes/answers');
const tagRoutes = require('../routes/tags');
const gcsUpload = require('../middlewares/gcsUpload');
const authenticate = require('../middlewares/authenticate');

router.get('/', (req, res) => {
    res.send('Hello world!')
})

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);
router.post('/imageUploader', authenticate, gcsUpload.single('image'), UserController.upload);

router.use('/tags', tagRoutes)
router.use('/questions', questionRoutes);
router.use('/answers', answerRoutes);

module.exports = router;