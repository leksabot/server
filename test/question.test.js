'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const jwt = require('jsonwebtoken')
const app = require('../app')
const User = require('../models/user')
const Question = require('../models/question')
chai.use(chaiHttp)
const expect = chai.expect

describe('Question CRUD test', ()=> {
    let deleteId;

    beforeEach((done)=> {
      Question.create({
        problem: 'This is dummy question',
          choice1: 'dummy choice1',
          choice2: 'dummy choice2',
          choice3: 'dummy choice3',
          choice4: 'dummy choice4',
          answer: 4,
          language: 'EN'
      })
        .then(question => {
          deleteId = question._id
          done()
        })
        .catch(error => {
          console.log('ERROR Create article before each ',error)
        })
    })

    it('should give a success message if question is created', (done)=> {
      chai.request(app)
          .post('/question')
          .set('authorization', process.env.AUTHORIZATION)
          .send({
            problem: 'This is question',
            choice1: 'choice1',
            choice2: 'choice2',
            choice3: 'choice3',
            choice4: 'choice4',
            answer: 3,
            language: 'EN'
          })
          .end((err,res)=> {
            expect(res).to.have.status(201)
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('data')
            expect(res.body.msg).to.equal('Question created')
            expect(res.body.data).to.be.a('object')
            expect(res.body.data).to.haveOwnProperty('_id')
            expect(res.body.data).to.haveOwnProperty('problem')
            expect(res.body.data).to.haveOwnProperty('choice1')
            expect(res.body.data).to.haveOwnProperty('choice2')
            expect(res.body.data).to.haveOwnProperty('choice3')
            expect(res.body.data).to.haveOwnProperty('choice4')
            expect(res.body.data).to.haveOwnProperty('answer')
            expect(res.body.data).to.haveOwnProperty('language')
            expect(res.body.data.choice1).to.equal('choice1')
            expect(res.body.data.choice2).to.equal('choice2')
            expect(res.body.data.choice3).to.equal('choice3')
            expect(res.body.data.choice4).to.equal('choice4')
            expect(res.body.data.language).to.equal('EN')
            expect(res.body.data.answer).to.equal(3)
            done()
          })
    })

    it('should give a success message if question is deleted', (done)=> {
      chai.request(app)
          .delete(`/question/${deleteId}`)
          .set('authorization', process.env.AUTHORIZATION)
          .end((err,res)=>{
            expect(res).to.have.status(201)
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('data')
            expect(res.body.msg).to.equal('Question deleted')
            expect(res.body.data).to.be.a('object')
            expect(res.body.data).to.haveOwnProperty('_id')
            expect(res.body.data).to.haveOwnProperty('problem')
            expect(res.body.data).to.haveOwnProperty('choice1')
            expect(res.body.data).to.haveOwnProperty('choice2')
            expect(res.body.data).to.haveOwnProperty('choice3')
            expect(res.body.data).to.haveOwnProperty('choice4')
            expect(res.body.data).to.haveOwnProperty('answer')
            expect(res.body.data).to.haveOwnProperty('language')
            expect(res.body.data.choice1).to.equal('dummy choice1')
            expect(res.body.data.choice2).to.equal('dummy choice2')
            expect(res.body.data.choice3).to.equal('dummy choice3')
            expect(res.body.data.choice4).to.equal('dummy choice4')
            expect(res.body.data.language).to.equal('EN')
            expect(res.body.data.answer).to.equal(4)
            done()
      })
    })

    it('should give a list of questions if request succeed', (done)=> {
      chai.request(app)
          .post('/question/list')
          .send({
            size: 1,
            language: 'EN'
          })
          .end((err,res)=> {
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('data')
            expect(res.body.msg).to.equal('List of random questions')
            expect(res.body.data).to.be.a('array')
            expect(res.body.data).to.have.length(1)
            expect(res.body.data[0]).to.be.a('object')
            expect(res.body.data[0]).to.haveOwnProperty('_id')
            expect(res.body.data[0]).to.haveOwnProperty('problem')
            expect(res.body.data[0]).to.haveOwnProperty('choice1')
            expect(res.body.data[0]).to.haveOwnProperty('choice2')
            expect(res.body.data[0]).to.haveOwnProperty('choice3')
            expect(res.body.data[0]).to.haveOwnProperty('choice4')
            expect(res.body.data[0]).to.haveOwnProperty('answer')
            expect(res.body.data[0]).to.haveOwnProperty('language')
            expect(res.body.data[0].choice1).to.equal('dummy choice1')
            expect(res.body.data[0].choice2).to.equal('dummy choice2')
            expect(res.body.data[0].choice3).to.equal('dummy choice3')
            expect(res.body.data[0].choice4).to.equal('dummy choice4')
            expect(res.body.data[0].language).to.equal('EN')
            expect(res.body.data[0].answer).to.equal(4)
            done()
          })
    })

    it('should give empty array of questions if parameter is not exist', (done)=> {
      chai.request(app)
          .post('/question/list')
          .send({
            size: 1,
            language: 'FR'
          })
          .end((err,res)=> {
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('data')
            expect(res.body.msg).to.equal('List of random questions')
            expect(res.body.data).to.be.a('array')
            expect(res.body.data).to.have.length(0)
            done()
          })
    })

    // Negative test
    it('should give error message if user is not authorized to create question', (done)=> {
      chai.request(app)
          .post('/question')
          .send({
            problem: 'This is question',
            choice1: 'choice1',
            choice2: 'choice2',
            choice3: 'choice3',
            choice4: 'choice4',
            answer: 3,
            language: 'EN'
          })
          .end((err,res)=> {
            expect(res).to.have.status(403)
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body.msg).to.equal('ERROR You don\'t have Admin authorization')
            done()
          })
    })      

    it('should give error message if problem field is empty', (done)=> {
      chai.request(app)
          .post('/question')
          .set('authorization', process.env.AUTHORIZATION)
          .send({
            choice1: 'choice1',
            choice2: 'choice2',
            choice3: 'choice3',
            choice4: 'choice4',
            answer: 3,
            language: 'EN'
          })
          .end((err,res)=> {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('err')
            expect(res.body.msg).to.equal('Error create question')
            expect(res.body.err).to.haveOwnProperty('errors')
            expect(res.body.err.errors).to.haveOwnProperty('problem')
            expect(res.body.err.errors.problem).to.haveOwnProperty('message')
            expect(res.body.err.errors.problem.message).to.equal('Question can\'t be empty')
            done()
          })
    })

    it('should give error message if choice1 field is empty', (done)=> {
      chai.request(app)
          .post('/question')
          .set('authorization', process.env.AUTHORIZATION)
          .send({
            problem: 'problem',
            choice2: 'choice2',
            choice3: 'choice3',
            choice4: 'choice4',
            answer: 3,
            language: 'EN'
          })
          .end((err,res)=> {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('err')
            expect(res.body.msg).to.equal('Error create question')
            expect(res.body.err).to.haveOwnProperty('errors')
            expect(res.body.err.errors).to.haveOwnProperty('choice1')
            expect(res.body.err.errors.choice1).to.haveOwnProperty('message')
            expect(res.body.err.errors.choice1.message).to.equal('Choice1 can\'t be empty')
            done()
          })
    })

    it('should give error message if choice2 field is empty', (done)=> {
      chai.request(app)
          .post('/question')
          .set('authorization', process.env.AUTHORIZATION)
          .send({
            problem: 'problem',
            choice1: 'choice1',
            choice3: 'choice3',
            choice4: 'choice4',
            answer: 3,
            language: 'EN'
          })
          .end((err,res)=> {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('err')
            expect(res.body.msg).to.equal('Error create question')
            expect(res.body.err).to.haveOwnProperty('errors')
            expect(res.body.err.errors).to.haveOwnProperty('choice2')
            expect(res.body.err.errors.choice2).to.haveOwnProperty('message')
            expect(res.body.err.errors.choice2.message).to.equal('Choice2 can\'t be empty')
            done()
          })
    })

    it('should give error message if choice3 field is empty', (done)=> {
      chai.request(app)
          .post('/question')
          .set('authorization', process.env.AUTHORIZATION)
          .send({
            problem: 'problem',
            choice1: 'choice1',
            choice2: 'choice2',
            choice4: 'choice4',
            answer: 3,
            language: 'EN'
          })
          .end((err,res)=> {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('err')
            expect(res.body.msg).to.equal('Error create question')
            expect(res.body.err).to.haveOwnProperty('errors')
            expect(res.body.err.errors).to.haveOwnProperty('choice3')
            expect(res.body.err.errors.choice3).to.haveOwnProperty('message')
            expect(res.body.err.errors.choice3.message).to.equal('Choice3 can\'t be empty')
            done()
          })
    })

    it('should give error message if choice4 field is empty', (done)=> {
      chai.request(app)
          .post('/question')
          .set('authorization', process.env.AUTHORIZATION)
          .send({
            problem: 'problem',
            choice1: 'choice1',
            choice2: 'choice2',
            choice3: 'choice3',
            answer: 3,
            language: 'EN'
          })
          .end((err,res)=> {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('err')
            expect(res.body.msg).to.equal('Error create question')
            expect(res.body.err).to.haveOwnProperty('errors')
            expect(res.body.err.errors).to.haveOwnProperty('choice4')
            expect(res.body.err.errors.choice4).to.haveOwnProperty('message')
            expect(res.body.err.errors.choice4.message).to.equal('Choice4 can\'t be empty')
            done()
          })
    })

    it('should give error message if answer field is empty', (done)=> {
      chai.request(app)
          .post('/question')
          .set('authorization', process.env.AUTHORIZATION)
          .send({
            problem: 'problem',
            choice1: 'choice1',
            choice2: 'choice2',
            choice3: 'choice3',
            choice4: 'choice4',
            language: 'EN'
          })
          .end((err,res)=> {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('err')
            expect(res.body.msg).to.equal('Error create question')
            expect(res.body.err).to.haveOwnProperty('errors')
            expect(res.body.err.errors).to.haveOwnProperty('answer')
            expect(res.body.err.errors.answer).to.haveOwnProperty('message')
            expect(res.body.err.errors.answer.message).to.equal('Answer can\'t be empty')
            done()
          })
    })

    it('should give error message if answer field is not a number', (done)=> {
      chai.request(app)
          .post('/question')
          .set('authorization', process.env.AUTHORIZATION)
          .send({
            problem: 'problem',
            choice1: 'choice1',
            choice2: 'choice2',
            choice3: 'choice3',
            choice4: 'choice4',
            answer: 'answer',
            language: 'EN'
          })
          .end((err,res)=> {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('err')
            expect(res.body.msg).to.equal('Error create question')
            expect(res.body.err).to.haveOwnProperty('errors')
            expect(res.body.err.errors).to.haveOwnProperty('answer')
            expect(res.body.err.errors.answer).to.haveOwnProperty('message')
            expect(res.body.err.errors.answer.message).to.equal('Cast to Number failed for value "answer" at path "answer"')
            done()
          })
    })

    it('should give error message if language field is empty', (done)=> {
      chai.request(app)
          .post('/question')
          .set('authorization', process.env.AUTHORIZATION)
          .send({
            problem: 'problem',
            choice1: 'choice1',
            choice2: 'choice2',
            choice3: 'choice3',
            choice4: 'choice4',
            answer: 4
          })
          .end((err,res)=> {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('err')
            expect(res.body.msg).to.equal('Error create question')
            expect(res.body.err).to.haveOwnProperty('errors')
            expect(res.body.err.errors).to.haveOwnProperty('language')
            expect(res.body.err.errors.language).to.haveOwnProperty('message')
            expect(res.body.err.errors.language.message).to.equal('Language can\'t be empty')
            done()
          })
    })

    it('should give error message if user is not authorized to delete question', (done)=> {
      chai.request(app)
          .delete(`/question/${deleteId}`)
          .end((err,res)=>{
            expect(res).to.have.status(403)
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body.msg).to.equal('ERROR You don\'t have Admin authorization')
            done()
      })
    })

    it('should give error message if delete id is not exist', (done)=> {
      chai.request(app)
          .delete(`/question/dummyid`)
          .set('authorization', process.env.AUTHORIZATION)
          .end((err,res)=>{
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('err')
            expect(res.body.msg).to.equal('ERROR Delete Question')
            expect(res.body.err).to.haveOwnProperty('message')
            expect(res.body.err.message).to.equal('Cast to ObjectId failed for value "dummyid" at path "_id" for model "Question"')
            expect(res.body.err.stringValue).to.equal('"dummyid"')
            done()
      })
    })

    it('should give error message if size of question is negative', (done)=> {
      chai.request(app)
          .post('/question/list')
          .send({
            size: -2,
            language: 'EN'
          })
          .end((err,res)=> {
            expect(res).to.have.status(500)
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('err')
            expect(res.body.msg).to.equal('ERROR Get random question')
            expect(res.body.err).to.be.a('object')
            expect(res.body.err.errmsg).to.equal('size argument to $sample must not be negative')
            done()
          })
    })

    afterEach((done)=> {
      Question.deleteMany()
        .then(question=> {
          done()
        })
        .catch(error => {
          console.log('ERROR Delete All Question after test ',error)
        })
    })
})