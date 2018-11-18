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
                //console.log(translation.translatedText);
                axios.post(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiYandex}&lang=en-en&text=${req.body.text}`)
                .then(data => {
                    console.log('data------------------',data.data.def)   
                    //console.log('data------------------',data.data.responses[0])                                     
                    res.status(200).json({ 
                        message : 'translate successfully',
                        data : translation
                    })            
                })
                .catch(err => {
                    res.status(500).json({message: `invalid input parameter translate`})
                })
            });
        }else
        {
            res.status(500).json({message: `invalid input parameter translate`})
        }
    }
}