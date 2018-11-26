'use strict'

function isAuthorized (req,res,next) {
    if(req.headers.authorization === process.env.AUTHORIZATION) {
        next()
    } else {
        res.status(403).json({
            msg: 'ERROR You don\'t have Admin authorization'
        })
    }
}

module.exports = isAuthorized