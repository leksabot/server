const axios = require('axios')

module.exports = {
    
    DetectInfo: (req, res) => {  
        if (req.hasOwnProperty('file')){
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
            axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API}`, body)
            .then(data => {
                //console.log('data',data.data.responses)
                // console.log('result',data.data.responses == null)
                // console.log('result222',Array.isArray(data.data.responses) )
                // console.log('result22233',data.data.responses[0].hasOwnProperty('localizedObjectAnnotations') )
                var tempResult=[]
                if(data.data.responses.length>0 && data.data.responses[0].hasOwnProperty('localizedObjectAnnotations'))
                {
                    for (let i = 0; i < data.data.responses[0].localizedObjectAnnotations.length; i++) {
                        tempResult.push({ object: data.data.responses[0].localizedObjectAnnotations[i].name})
                    }                   
                }
                res.status(200).json({ 
                    message : 'object detected',
                    data : tempResult
                })
            })
            .catch(err => {
                res.status(500).json({message: `error detect object ${err}`})
            })
        }else
        {
            res.status(500).json({message: `Image not found`})
            console.log('Image not found')
        }
    },
    DetectText: (req, res) => {  
        if (req.hasOwnProperty('file')){
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
            axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API}`, body)
            .then(data => {
                //console.log('data',data.data.responses)
                var tempResult=''
                if(data.data.responses.length>0 && data.data.responses[0].hasOwnProperty('fullTextAnnotation') )
                {
                        tempResult.push({ object: data.data.responses[0].fullTextAnnotation.text})               
                }
                res.status(200).json({ 
                    message : 'detect object successfully',
                    data : tempResult
                })
            })
            .catch(err => {
                res.status(500).json({message: `error detect object ${err}`})
            })
        }else
        {
            res.status(500).json({message: `Image not found`})
            console.log('Image not found')
        }
    }
}