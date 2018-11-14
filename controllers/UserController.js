'use strict'

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const hashPassword = require('../helpers/hashPassword')

module.exports = {
    register: function (req,res) {
        
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            language: req.body.language
        })
         .then(user => {
            let nativeLang = user.language
            jwt.sign({
                name: user.name,
                email: user.email,
                language: user.language
            },process.env.SECRET_TOKEN, (err,token)=>{
                if(!err){
                    res.status(201).json({
                        msg: 'Registration success',
                        token: token,
                        lang: nativeLang
                    })
                } else {
                    res.status(500).json({
                        msg: 'ERROR GET TOKEN - Registration',
                        err: err
                    })
                }
            })
         })
         .catch(error => {
             res.status(500).json({
                 msg: 'ERROR Registration',
                 err: error
             })
         })
    },
    login: function(req,res) {
        let hash = hashPassword(req.body.password)
        User.findOne({
            email: req.body.email,
            password: hash
        })
          .then(user => {
            let nativeLang = user.language
            jwt.sign({
                name: user.name,
                email: user.email,
                language: user.language
            },process.env.SECRET_TOKEN, (err,token)=>{
                if(!err){
                    res.status(201).json({
                        msg: 'Login success',
                        token: token,
                        lang: nativeLang
                    })
                } else {
                    res.status(500).json({
                        msg: 'ERROR GET TOKEN - Login',
                        err: err
                    })
                }
            })
          })
          .catch(error => {
            res.status(500).json({
                msg: 'ERROR Login',
                err: error
            })
          })
    }
}