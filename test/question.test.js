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
                language: 'lang'
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
                expect(res.body.data.language).to.equal('lang')
                expect(res.body.data.answer).to.equal(3)
                done()
            })
    })

    it('should give a success message if question is deleted', (done)=> {
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
                language: 'lang'
            })
            .end((err,res)=> {
                deleteId = res.body.data._id
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
                expect(res.body.data.language).to.equal('lang')
                expect(res.body.data.answer).to.equal(3)
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
                        expect(res.body.data.choice1).to.equal('choice1')
                        expect(res.body.data.choice2).to.equal('choice2')
                        expect(res.body.data.choice3).to.equal('choice3')
                        expect(res.body.data.choice4).to.equal('choice4')
                        expect(res.body.data.language).to.equal('lang')
                        expect(res.body.data.answer).to.equal(3)
                        done()
                    })
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