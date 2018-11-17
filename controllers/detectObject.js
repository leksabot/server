const axios = require('axios')
const Translate = require('./translateController')
const apiKey=process.env.GOOGLE_VISION_API
var googleTranslate = require('google-translate')(apiKey); 
const fs = require('fs');
module.exports = {
    AutoNoGCP: (req, res) => { 
        console.log('req.file--------------------',req.file)
        console.log('req.body--------------------',req.body)
        if (req.hasOwnProperty('file')==undefined || req.body.motherlanguage ==undefined){
            res.status(500).json({message: `file not found/invalid mother language`})
        }
        let imageTosend = req.file.buffer.toString('base64')
        let body = {
            "requests": [
                {
                "image": {
                    "content": imageTosend
                },
                "features": [
                    {
                    "type": "TEXT_DETECTION"
                    }
                ]
                }
            ]
        }
        axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, body)
        .then(data => {
            //console.log('data',data.data.responses)
            var tempResult=''
            if(data.data.responses.length>0 && data.data.responses[0].hasOwnProperty('fullTextAnnotation') )
            {
                    tempResult=data.data.responses[0].fullTextAnnotation.text
                    googleTranslate.translate(tempResult, req.body.motherlanguage, (err, translation) => {                                                   
                        res.status(200).json({ 
                            message : 'object detected',
                            data : translation
                        })      
                    });                 
            }
            else{ //check object
                let body = {
                    "requests": [
                        {
                        "image": {
                            "content": imageTosend
                        },
                        "features": [
                            {
                            "type": "OBJECT_LOCALIZATION"
                            }
                        ]
                        }
                    ]
                }
                axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, body)
                .then(data => {
                    //console.log('data',data.data.responses[0])                
                    if(data.data.responses.length>0 && data.data.responses[0].hasOwnProperty('localizedObjectAnnotations'))
                    {
                        var tempResult=[]
                        for (let i = 0; i < data.data.responses[0].localizedObjectAnnotations.length; i++) {                     
                            tempResult.push(data.data.responses[0].localizedObjectAnnotations[i].name)             
                        }    
                        googleTranslate.translate(tempResult, req.body.motherlanguage, (err, translation) => {                                                   
                            //console.log(translation)  
                            res.status(200).json({ 
                                message : 'object detected',
                                data : translation
                            })      
                        });                
                    }                
                })
                .catch(err => {
                    res.status(500).json({message: `error detect object ${err}`})
                })
            }
        })
        .catch(err => {
            res.status(500).json({message: `error detect object ${err}`})
        })
    },
    AutoGCP: (req, res) => {
        if (req.hasOwnProperty('file') && req.body.motherlanguage !==undefined ){
            let body = {
                "requests":[
                    {
                        "image":{
                            "source":{
                                "imageUri": req.file.cloudStoragePublicUrl
                            }
                        },
                        "features":[
                            {
                                "type": "TEXT_DETECTION"
                            }
                        ]
                    } 
                ]
            }
            axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, body)
            .then(data => {
                //console.log('data',data.data.responses)
                var tempResult=''
                if(data.data.responses.length>0 && data.data.responses[0].hasOwnProperty('fullTextAnnotation') )
                {
                        tempResult=data.data.responses[0].fullTextAnnotation.text
                        googleTranslate.translate(tempResult, req.body.motherlanguage, (err, translation) => {                                                   
                            //console.log(translation)  
                            res.status(200).json({ 
                                message : 'object detected',
                                data : translation
                            })      
                        });                 
                }
                else{
                    let body = {
                        "requests":[
                            {
                                "image":{
                                    "source":{
                                        "imageUri": req.file.cloudStoragePublicUrl
                                    }
                                },
                                "features":[
                                    {
                                        "type":"OBJECT_LOCALIZATION"
                                    }
                                ]
                            } 
                        ]
                    }  
                    axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, body)
                    .then(data => {
                        //console.log('data',data.data.responses[0])  
                        if(data.data.responses.length>0 && data.data.responses[0].hasOwnProperty('localizedObjectAnnotations'))
                        {
                            var tempResult=[]
                            for (let i = 0; i < data.data.responses[0].localizedObjectAnnotations.length; i++) {                     
                                tempResult.push(data.data.responses[0].localizedObjectAnnotations[i].name)             
                            }    
                            googleTranslate.translate(tempResult, req.body.motherlanguage, (err, translation) => {                                                   
                                //console.log(translation)  
                                res.status(200).json({ 
                                    message : 'object detected',
                                    data : translation
                                })      
                            });                
                        }                
                    })
                    .catch(err => {
                        res.status(500).json({message: `error detect object ${err}`})
                    })
                }
            })
            .catch(err => {
                res.status(500).json({message: `error detect object ${err}`})
            })
        }else
        {
            res.status(500).json({message: `Image not found/Invalid input`})
            console.log('Image not found')
        }
    },
    TestImage: (req, res) => { 
        try {
            console.log(req.file.buffer.toString('base64'))          
             res.status(200).json({ 
                message : 'object detected',
                data : req.file.buffer.toString('base64')
            })   
        } catch (error) {
            res.status(500).json({message: `error ${error}`})
            console.log(error)
        }
    },
    DetectInfo: (req, res) => {  
        if (req.hasOwnProperty('file') && req.body.motherlanguage !==undefined){
            const fs = require('fs');
            let body = {
                "requests":[
                    {
                        "image":{
                            "source":{
                                "imageUri": req.file.cloudStoragePublicUrl
                            }
                        },
                        "features":[
                            {
                                "type":"OBJECT_LOCALIZATION"
                            }
                        ]
                    } 
                ]
            }  
            axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, body)
            .then(data => {
                console.log('data',data.data.responses[0])
                // console.log('result22233',data.data.responses[0].hasOwnProperty('localizedObjectAnnotations') )
                
                if(data.data.responses.length>0 && data.data.responses[0].hasOwnProperty('localizedObjectAnnotations'))
                {
                    var tempResult=[]
                    for (let i = 0; i < data.data.responses[0].localizedObjectAnnotations.length; i++) {                     
                        tempResult.push(data.data.responses[0].localizedObjectAnnotations[i].name)             
                    }    
                    googleTranslate.translate(tempResult, req.body.motherlanguage, (err, translation) => {                                                   
                        //console.log(translation)  
                        res.status(200).json({ 
                            message : 'object detected',
                            data : translation
                        })      
                    });                
                }                
            })
            .catch(err => {
                res.status(500).json({message: `error detect object ${err}`})
            })
        }else
        {
            res.status(500).json({message: `Image not found/Invalid input`})
            console.log('Image not found')
        }
    },
    DetectText: (req, res) => {  
        if (req.hasOwnProperty('file') && req.body.motherlanguage !==undefined ){
            let body = {
                "requests":[
                    {
                        "image":{
                            "source":{
                                "imageUri": req.file.cloudStoragePublicUrl
                            }
                        },
                        "features":[
                            {
                                "type": "TEXT_DETECTION"
                            }
                        ]
                    } 
                ]
            }
            axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, body)
            .then(data => {
                //console.log('data',data.data.responses)
                var tempResult=''
                if(data.data.responses.length>0 && data.data.responses[0].hasOwnProperty('fullTextAnnotation') )
                {
                        tempResult=data.data.responses[0].fullTextAnnotation.text
                        googleTranslate.translate(tempResult, req.body.motherlanguage, (err, translation) => {                                                   
                            //console.log(translation)  
                            res.status(200).json({ 
                                message : 'object detected',
                                data : translation
                            })      
                        });                 
                }
                else{
                    res.status(500).json({ 
                        message : 'no text found',
                        data : ''
                    })
                }
            })
            .catch(err => {
                res.status(500).json({message: `error detect object ${err}`})
            })
        }else
        {
            res.status(500).json({message: `Image not found/Invalid input`})
            console.log('Image not found')
        }
    }
}