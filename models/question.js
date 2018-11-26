'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    problem: {
        type: String,
        required: [true, 'Question can\'t be empty']
    },
    choice1: {
        type: String,
        required: [true, 'Choice1 can\'t be empty']
    },
    choice2: {
        type: String,
        required: [true, 'Choice2 can\'t be empty']
    },
    choice3: {
        type: String,
        required: [true, 'Choice3 can\'t be empty']
    },
    choice4: {
        type: String,
        required: [true, 'Choice4 can\'t be empty']
    },
    answer: {
        type: Number,
        required: [true, 'Answer can\'t be empty']
    },
    language: {
        type: String,
        required: [true, 'Language can\'t be empty']
    }
},{
    timestamps: true
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question