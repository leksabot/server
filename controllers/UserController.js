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
                userid: user._id,
                name: user.name,
                email: user.email,
                language: user.language
            },process.env.SECRET_TOKEN, (err,token)=>{
                if(!err){
                    res.status(201).json({
                        msg: 'Registration success',
                        token: token,
                        name: user.name,
                        email: user.email,
                        lang: nativeLang
                    })
                } else {
                    /* istanbul ignore next */
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
            if(user) {
                let nativeLang = user.language
                jwt.sign({
                    userid: user._id,
                    name: user.name,
                    email: user.email,
                    language: user.language
                },process.env.SECRET_TOKEN, (err,token)=>{
                    if(!err){
                        res.status(201).json({
                            msg: 'Login success',
                            token: token,
                            name: user.name,
                            email: user.email,
                            lang: nativeLang
                        })
                    } 
                    /* istanbul ignore next */
                    else {
                        res.status(500).json({
                            msg: 'ERROR GET TOKEN - Login',
                            err: err
                        })
                    }
                })
            } else if (user=== null) {
                res.status(400).json({
                    err: 'User is not found'
                })    
            }
          })
          .catch(error => {
            res.status(500).json({
                msg: 'ERROR Login',
                err: error
            })
          })
    },
    updatelanguage: function (req,res) {
        let updatelanguage = req.body.language.toUpperCase()
        
        // check if update language input is not valid
        if(updatelanguage.length === 2) {
            User.findOneAndUpdate({
                _id: req.decoded.userid
            }, {
                language: updatelanguage
            })
              .then(user => {
                // get the latest information of user
                User.findOne({
                    _id: req.decoded.userid
                })
                  .then(user=> {
                    res.status(201).json({
                        msg: 'Update language success',
                        lang: user.language
                    }) 
                  })
                  .catch(error=> {
                    res.status(500).json({
                        msg: 'ERROR find user after Update Language',
                        err: error
                    })    
                  })
              })
              .catch(error => {
                res.status(500).json({
                    msg: 'ERROR Update Language User',
                    err: error
                })
              })
        } else {
            res.status(500).json({
                err: 'Language code should have maximum 2 characters'
            })
        }
    }
}