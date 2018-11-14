'use strict'

const Question = require('../models/question')

module.exports = {
    add: function (req,res){
        Question.create({
            problem: req.body.problem,
            choice1: req.body.choice1,
            choice2: req.body.choice2,
            choice3: req.body.choice3,
            choice4: req.body.choice4,
            answer: req.body.answer,
            language: req.body.language
        })
          .then(question => {
              res.status(201).json({
                  msg: 'Question created',
                  data: question
              })
          })
          .catch(error=> {
              res.status(500).json({
                  msg: 'Error create question',
                  err: error
              })
          })
    },
    show: function (req,res) {
        let size = Number(req.body.size)
        Question.aggregate([{$match: {language: req.body.language}},{$sample: {size: size}}])
            .then(listquestions => {
                res.status(200).json({
                    msg: 'List of random questions',
                    data: listquestions
                })
            })
            .catch(error => {
                res.status(500).json({
                    msg: 'ERROR Get random question',
                    err: error
                })
            })
    },
    remove: function (req,res) {
        Question.findOneAndDelete({_id: req.params.id})
            .then(question => {
                res.status(201).json({
                    msg: 'Question deleted',
                    data: question 
                })
            })
            .catch(error => {
                res.status(500).json({
                    msg: 'ERROR Delete Question',
                    err: error
                })
            })
    }
}