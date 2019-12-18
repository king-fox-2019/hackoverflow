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

router.post('/login',UserController.login)
router.post('/register',upload.single('file'),UserController.register)

module.exports = router