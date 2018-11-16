'use strict'

const router = require('express').Router();
const {DetectInfo,DetectText, AutoGCP , AutoNoGCP} = require('../controllers/detectObject');
const helpers = require('../helpers/images')
const filemulter = require('../helpers/filemulter')

router.post('/',  filemulter.multer.single('imagefile'), AutoNoGCP);
router.post('/gcp',  filemulter.multer.single('imagefile'), helpers.sendUploadToGCS, AutoGCP);
router.post('/object',  helpers.multer.single('imagefile'), helpers.sendUploadToGCS, DetectInfo);
router.post('/text',  helpers.multer.single('imagefile'), helpers.sendUploadToGCS, DetectText);


module.exports = router;