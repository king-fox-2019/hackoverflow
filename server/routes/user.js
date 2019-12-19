const router = require('express').Router()
const UserController = require('../controllers/userController')


const gcsUpload = require('gcs-upload')

const upload = gcsUpload({  
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: './credentials-gcs.json',
      bucketName: 'bucket-alfred'
    }
  })

router.get('/',UserController.findAllUser)
router.post('/login',UserController.login)
router.get('/info',UserController.getUserInfo)
router.post('/tags',UserController.addUserTag)
router.post('/register',upload.single('file'),UserController.register)

module.exports = router