'use strict'

const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const {register, login, updatelanguage} = UserController
const isLogin = require('../middlewares/isLogin')

router.post('/register', register)
      .post('/login', login)
      .put('/updatelanguage', isLogin, updatelanguage)

module.exports = router