
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
                res.status(200).json({ 
                    message : 'translate successfully',
                    data : translation
                })            
            });
        }else
        {
            res.status(500).json({message: `invalid input parameter translate`})
        }
    }
}