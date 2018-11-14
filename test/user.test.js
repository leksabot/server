'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
chai.use(chaiHttp)
const expect = chai.expect

describe('User register and login test', ()=> {
    it('should give a success message and token if register is successful', (done)=> {
        chai.request(app)
            .post('/user/register')
            .send({
                name: 'Indro',
                email: 'indro@mail.com',
                password: '123456',
                language: 'ID'
            })
            .end((err,res)=>{
                expect(res).to.have.status(201)
                expect(res.body).to.haveOwnProperty('msg')
                expect(res.body).to.haveOwnProperty('token')
                expect(res.body).to.haveOwnProperty('lang')
                expect(res.body.lang).to.equal('ID')
                expect(res.body.msg).to.equal('Registration success')
                done()
            })
    })

    it('should give a success message and token if login is successfull', (done) => {
        chai.request(app)
            .post('/user/register')
            .send({
                name: 'Kasino',
                email: 'kasino@mail.com',
                password: '123456',
                language: 'ID'
            })
            .end((err,res)=> {
                expect(res).to.have.status(201)
                expect(res.body).to.haveOwnProperty('msg')
                expect(res.body).to.haveOwnProperty('token')
                expect(res.body).to.haveOwnProperty('lang')
                expect(res.body.lang).to.equal('ID')
                expect(res.body.msg).to.equal('Registration success')
                chai.request(app)
                    .post('/user/login')
                    .send({
                        email: 'kasino@mail.com',
                        password: '123456'
                    })
                    .end((err,res)=> {
                        expect(res).to.have.status(201)
                        expect(res.body).to.haveOwnProperty('msg')
                        expect(res.body).to.haveOwnProperty('token')
                        expect(res.body).to.haveOwnProperty('lang')
                        expect(res.body.lang).to.equal('ID')
                        expect(res.body.msg).to.equal('Login success')
                        done()
                    })
            })
    })


    // Negative Test
    it('should give error message if email is not unique', (done)=> {
        chai.request(app)
        .post('/user/register')
        .send({
            name: 'Dora',
            email: 'dora@mail.com',
            password: '123456',
            language: 'ID'
        })
        .end((err,res)=>{
            expect(res).to.have.status(201)
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('token')
            expect(res.body).to.haveOwnProperty('lang')
            expect(res.body.lang).to.equal('ID')
            expect(res.body.msg).to.equal('Registration success')
            chai.request(app)
                .post('/user/register')
                .send({
                    name: 'Jandi',
                    email: 'dora@mail.com',
                    password: '123456',
                    language: 'ID'
                })
                .end((err,res)=>{
                    expect(res).to.have.status(500)
                    expect(res.body).to.haveOwnProperty('msg')
                    expect(res.body.msg).to.equal('ERROR Registration')
                    expect(res.body.err).to.be.an('object')
                    expect(res.body.err.errmsg).to.equal('E11000 duplicate key error collection: leksabotdbtesting.users index: email_1 dup key: { : "dora@mail.com" }')
                    done()
                })
        })
    })  

    it('should give error message if email format is non standard', (done)=> {
        chai.request(app)
        .post('/user/register')
        .send({
            name: 'Dora',
            email: 'doramail.com',
            password: '123456',
            language: 'ID'
        })
        .end((err,res)=>{
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('err')
            expect(res.body.msg).to.equal('ERROR Registration')
            expect(res.body.err).to.haveOwnProperty('errors')
            expect(res.body.err.errors).to.haveOwnProperty('email')
            expect(res.body.err.errors.email).to.haveOwnProperty('message')
            expect(res.body.err.errors.email.message).to.equal('Please Check your email')
            expect(res.body.err.errors.email.properties.value).to.equal('doramail.com')
            done()
        })
    })

    it('should give error message if password length is less than 6', (done)=> {
        chai.request(app)
        .post('/user/register')
        .send({
            name: 'Dora',
            email: 'dora@mail.com',
            password: '123',
            language: 'ID'
        })
        .end((err,res)=>{
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.haveOwnProperty('msg')
            expect(res.body).to.haveOwnProperty('err')
            expect(res.body.msg).to.equal('ERROR Registration')
            expect(res.body.err).to.haveOwnProperty('errors')
            expect(res.body.err.errors).to.haveOwnProperty('password')
            expect(res.body.err.errors.password).to.haveOwnProperty('message')
            expect(res.body.err.errors.password.message).to.equal('Password should have minimum 6 characters')
            expect(res.body.err.errors.password.properties.value).to.equal('123')
            done()
        })
    })

    it('should give an error message if user give wrong email when login', (done) => {
        chai.request(app)
            .post('/user/register')
            .send({
                name: 'Kasino',
                email: 'kasino@mail.com',
                password: '123456',
                language: 'ID'
            })
            .end((err,res)=> {
                expect(res).to.have.status(201)
                expect(res.body).to.haveOwnProperty('msg')
                expect(res.body).to.haveOwnProperty('token')
                expect(res.body).to.haveOwnProperty('lang')
                expect(res.body.lang).to.equal('ID')
                expect(res.body.msg).to.equal('Registration success')
                chai.request(app)
                    .post('/user/login')
                    .send({
                        email: 'ka@mail.com',
                        password: '123456'
                    })
                    .end((err,res)=> {
                        expect(res).to.have.status(500)
                        expect(res.body).to.haveOwnProperty('msg')
                        expect(res.body).to.haveOwnProperty('err')
                        expect(res.body.msg).to.equal('ERROR Login')
                        expect(res.body.err).to.be.a('object')
                        done()
                    })
            })
    })

    it('should give an error message if user give wrong password when login', (done) => {
        chai.request(app)
            .post('/user/register')
            .send({
                name: 'Kasino',
                email: 'kasino@mail.com',
                password: '123456',
                language: 'ID'
            })
            .end((err,res)=> {
                expect(res).to.have.status(201)
                expect(res.body).to.haveOwnProperty('msg')
                expect(res.body).to.haveOwnProperty('token')
                expect(res.body).to.haveOwnProperty('lang')
                expect(res.body.lang).to.equal('ID')
                expect(res.body.msg).to.equal('Registration success')
                chai.request(app)
                    .post('/user/login')
                    .send({
                        email: 'kasino@mail.com',
                        password: '123'
                    })
                    .end((err,res)=> {
                        expect(res).to.have.status(500)
                        expect(res.body).to.haveOwnProperty('msg')
                        expect(res.body).to.haveOwnProperty('err')
                        expect(res.body.msg).to.equal('ERROR Login')
                        expect(res.body.err).to.be.a('object')
                        done()
                    })
            })
    })


    afterEach((done)=> {
        User.deleteMany()
          .then(user=> {
              done()
          })
          .catch(error => {
              console.log('ERROR Aftereach')
              done()
          })
    })
})
