'use strict'
require('dotenv').config()
/* istanbul ignore file */

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
  multer
}