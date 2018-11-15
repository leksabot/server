'use strict'

const router = require('express').Router();
const {DetectInfo,DetectText} = require('../controllers/detectObject');
const helpers = require('../helpers/images')

router.post('/',  helpers.multer.single('imagefile'), helpers.sendUploadToGCS, DetectInfo);
router.post('/text',  helpers.multer.single('imagefile'), helpers.sendUploadToGCS, DetectText);

module.exports = router;