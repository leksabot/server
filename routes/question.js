'use strict'

const express = require('express')
const router = express.Router()
const QuestionController = require('../controllers/QuestionController')
const {add, show} = QuestionController 

router.post('/',add)
      .post('/list',show)


module.exports = router