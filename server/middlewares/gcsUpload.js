const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
  gcsConfig: {
    keyFilename: process.env.GOOGLE_KEYFILE_PATH,
    bucketName: process.env.GOOGLE_BUCKET_NAME
  }
})

module.exports = upload