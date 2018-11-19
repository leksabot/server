'use strict'

const User = require('../models/user')
const jwt = require('jsonwebtoken')

function isLogin(req,res,next) {
    jwt.verify(req.headers.token,process.env.SECRET_TOKEN,(err,decoded) => {
        if(decoded){
            req.decoded = decoded
            User.findOne({
                name: decoded.name,
                email: decoded.email
            })
             .then(user=> {
                if(user){
                    next()
                } else {
                    res.status(400).json({
                        msg: 'User Not Found - Token',
                        err: error            
                    })
                }
             })
             .catch(error => {
                res.status(500).json({
                    msg: 'User Not Found - Token',
                    err: error
                })
             })
        }else {
            res.status(403).json({
                msg: 'User is not authorized',
                err: err
            })
        }
    })
}

module.exports = isLogin