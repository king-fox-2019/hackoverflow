const router = require('express').Router()


router.use('/users', require('./userRouter'))
router.use('/questions', require('./questionRouter'))
router.use('/answers', require('./answerRouter'))


module.exports = router