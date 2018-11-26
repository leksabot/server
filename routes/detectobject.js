'use strict'

const router = require('express').Router();
const {DetectInfo,DetectText, AutoGCP , AutoNoGCP} = require('../controllers/detectObject');
const helpers = require('../helpers/images')
const filemulter = require('../helpers/filemulter')

// router.post('/',  filemulter.multer.single('imagefile'), AutoNoGCP);
// router.post('/gcp',  filemulter.multer.single('imagefile'), helpers.sendUploadToGCS, AutoGCP);
// router.post('/object',  helpers.multer.single('imagefile'), helpers.sendUploadToGCS, DetectInfo);
// router.post('/text',  helpers.multer.single('imagefile'), helpers.sendUploadToGCS, DetectText);


router.post('/',  (req,res) => { 
    filemulter.multer.single('imagefile') (req,res, function (err) {
        if(!err) {
            AutoNoGCP(req,res)
        } else if (err) {
            res.status(500).json({
                err: 'Only .jpg, .jpeg, and .png files allowed'
            })
        }
    })
});
router.post('/gcp',  (req,res, next) => {
    filemulter.multer.single('imagefile') (req,res, function (err){
        if(!err) {
            // console.log('send to gcs----------------')
            helpers.sendUploadToGCS (req,res, next)
        } else if (err) {
            res.status(500).json({
                err: 'Only .jpg, .jpeg, and .png files allowed'
            })
        }
    })}, AutoGCP);

router.post('/object',  (req,res, next) => {
    filemulter.multer.single('imagefile') (req,res, function (err){
        if(!err) {
            // console.log('send to gcs----------------')
            helpers.sendUploadToGCS (req,res, next)
        } else if (err) {
            res.status(500).json({
                err: 'Only .jpg, .jpeg, and .png files allowed'
            })
        }
    })}, DetectInfo);

router.post('/text',  (req,res, next) => {
    filemulter.multer.single('imagefile') (req,res, function (err){
        if(!err) {
            // console.log('send to gcs----------------')
            helpers.sendUploadToGCS (req,res, next)
        } else if (err) {
            res.status(500).json({
                err: 'Only .jpg, .jpeg, and .png files allowed'
            })
        }
    })}, DetectText);


module.exports = router;