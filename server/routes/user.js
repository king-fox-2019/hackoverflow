const routes = require('express').Router()
const userController = require('../controllers/user')
const gcsUpload = require('gcs-upload')
const { authentication } = require('../middlewares/auth')

const upload = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: "keyfile.json",
        bucketName: "imagebucket-stunoverflow"
    }
})

routes.post('/register', upload.array('image') ,userController.register)
routes.post('/login', userController.login)
routes.use(authentication)
routes.get('/myaccount', userController.findOne)
routes.patch('/addWatchedTags', userController.updateWatchedTags)


module.exports = routes