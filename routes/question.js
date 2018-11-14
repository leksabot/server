'use strict'

const express = require('express')
const router = express.Router()
const QuestionController = require('../controllers/QuestionController')
const {add, show, remove} = QuestionController 
const isAuthorized = require('../middlewares/isAuthorized')

router.post('/',isAuthorized, add)
      .post('/list',show)
      .delete('/:id', isAuthorized, remove)


module.exports = router