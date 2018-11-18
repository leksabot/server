const axios = require('axios')
const apiYandex=process.env.YANDEX_API
const apiKey=process.env.GOOGLE_VISION_API
var googleTranslate = require('google-translate')(apiKey); 
module.exports = {
    TranslateFrom: (req, res) => { 
        if (req.body.text!==undefined && req.body.motherlanguage!==undefined){
            googleTranslate.translate([req.body.text], req.body.originalLanguage , req.body.motherlanguage, function(err, translations) {
                res.status(200).json({ 
                    message : 'translate successfully',
                    data : translations
                })         
            });
        }else
        {
            res.status(500).json({message: `invalid input parameter translate`})
        }
    },
    TranslateDetect: (req, res) => {  
        if (req.body.text!==undefined && req.body.motherlanguage!==undefined){
            googleTranslate.translate(req.body.text, req.body.motherlanguage, function(err, translation) {
                if(translation.detectedSourceLanguage =='en'){
                    axios.get(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiYandex}&lang=en-en&text=${req.body.text}`)            
                    .then(dataEnToEn => {
                        axios.get(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiYandex}&lang=en-fr&text=${req.body.text}`)            
                        .then(dataEnToFr => {                                   
                            res.status(200).json({ 
                                message : 'translate successfully',
                                data : translation,
                                translate1:dataEnToEn.data.def,
                                translate2:dataEnToFr.data.def
                            })            
                        })
                        .catch(err => {
                            res.status(500).json({message: `invalid input parameter translate at Yandex Fr`})
                        })                                         
                    })
                    .catch(err => {
                        res.status(500).json({message: `invalid input parameter translate at Yandex En`})
                    })
                }else if(translation.detectedSourceLanguage =='fr'){
                    //console.log('franceeeee')
                    axios.get(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiYandex}&lang=fr-en&text=${req.body.text}`)            
                    .then(dataFrToEn => {
                        res.status(200).json({ 
                            message : 'translate successfully',
                            data : translation,
                            translate1:dataFrToEn.data.def,
                            translate2:{}
                        })                                        
                    })
                    .catch(err => {
                        res.status(500).json({message: `invalid input parameter translate at Yandex En`})
                    })
                }
                else{
                    res.status(200).json({ 
                        message : 'translate successfully',
                        data : translation,
                        translate1:{},
                        translate2:{}
                    })  
                }
            });
        }else
        {
            res.status(500).json({message: `invalid input parameter translate`})
        }
    }
}