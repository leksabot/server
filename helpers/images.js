'use strict'
/* istanbul ignore file */
require('dotenv').config()

const Storage = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  // console.log('uploaded to GCS-------------')
  if (!req.file) {
    return next()
  }

  const gcsname = Date.now() + req.file.originalname
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      // console.log('finish------------------')
      next()
    })
    .catch (()=> {
      console.log('error while uploading to gcs')
    }) 
  })

  stream.end(req.file.buffer)
}

const Multer = require('multer'),
      multer = Multer({
        fileFilter: function(req,file,cb){
          //console.log('FILE-----', file.mimetype)
          //console.log('Type of-----', typeof file.mimetype)

          if(file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
              
              cb(null,true)
          }else{
              cb(new Error('Only .jpg, .jpeg, and .png files allowed'))
          }
        }, 
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
      })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}