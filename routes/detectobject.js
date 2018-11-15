const helpers = require('../helpers/images')
module.exports = {
    
    Createimage: (req, res) => {  
        if (req.hasOwnProperty('file')){
            
          //      imageurl: req.file.cloudStoragePublicUrl
            
        }else
        {
            console.log('Image not found')
        }
    }
}