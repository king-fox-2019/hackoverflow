const router = require('express').Router()
const userRoutes = require('./userRoutes')
const threadRoutes = require('./threadRoutes')
const replyRoutes = require('./replyRoutes')

router.use('/', userRoutes)
router.use('/thread', threadRoutes)
router.use('/reply', replyRoutes)

module.exports = router