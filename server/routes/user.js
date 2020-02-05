const routes = require('express').Router()
const userController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')
const unggah = require('unggah')
const storageConfig = unggah.gcs({
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILE, // this can also be set using GOOGLE_APPLICATION_CREDENTIALS environment variable
    bucketName: process.env.CLOUD_BUCKET,
    rename: (req, file) => {
        return `${Date.now()}-${file.originalname}`;
    },
});

const upload = unggah({
    storage: storageConfig
});

routes.post('/register', upload.array('image') ,userController.register)
routes.post('/login', userController.login)
routes.use(authentication)
routes.get('/myaccount', userController.findOne)
routes.patch('/addWatchedTags', userController.updateWatchedTags)

module.exports = routes