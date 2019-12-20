const router = require('express').Router()
const questionController = require('../controllers/questionController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/',questionController.get)
router.post('/',questionController.create)
router.put('/',questionController.update)
router.delete('/',questionController.delete)
router.put('/:id',questionController.vote)

module.exports = router