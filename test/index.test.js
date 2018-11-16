const chai = require('chai')
const chaiHttp = require('chai-http')
const jwt = require('jsonwebtoken')
const app = require('../app')
const User = require('../models/user')
const Question = require('../models/question')
chai.use(chaiHttp)
const expect = chai.expect

describe ('App.js', () => {

    it ('should have status 200', (done) => {
        chai
        .request(app)
        .get('/')
        .end((err, res) => {
            expect(res).to.have.status(200)
            done()
        })
    })
})