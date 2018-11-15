'use strict'

const router = require('express').Router();
const {DetectInfo} = require('../controllers/detectObject');

const helpers = require('../helpers/images')

router.post('/',  helpers.multer.single('imagefile'), helpers.sendUploadToGCS, DetectInfo);


module.exports = router;