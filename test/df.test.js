const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
chai.use(chaiHttp)
const expect = chai.expect

describe ('Reply System Test', () => {

    it ('en | valid input | should return the reply', (done) => {
        chai
        .request(app)
        .post('/df')
        .send({
            message: 'Test',
            langcode: 'en'
        })
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('reply')
            expect(res.body.reply).to.be.a('string')
            expect(res.body.reply).not.to.have.length(0)
            done()
        })
    })

    it ('fr | valid input | should return the reply', (done) => {
        chai
        .request(app)
        .post('/df')
        .send({
            message: 'Test',
            langcode: 'fr'
        })
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('reply')
            expect(res.body.reply).to.be.a('string')
            expect(res.body.reply).not.to.have.length(0)
            done()
        })
    })

    it ('en | invalid input | should return status 500', (done) => {
        chai
        .request(app)
        .post('/df')
        .send({
            message: '',
            langcode: 'en'
        })
        .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.haveOwnProperty('message')
            expect(res.body.message).to.be.a('string')
            expect(res.body.message).not.to.have.length(0)
            done()
        })
    })

    it ('fr | invalid input | should return status 500', (done) => {
        chai
        .request(app)
        .post('/df')
        .send({
            message: '',
            langcode: 'fr'
        })
        .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.haveOwnProperty('message')
            expect(res.body.message).to.be.a('string')
            expect(res.body.message).not.to.have.length(0)
            done()
        })
    })

    it ('invalid language | valid input | should return status 500', (done) => {
        chai
        .request(app)
        .post('/df')
        .send({
            message: 'Test',
            langcode: ''
        })
        .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.haveOwnProperty('message')
            expect(res.body.message).to.be.a('string')
            expect(res.body.message).not.to.have.length(0)
            done()
        })
    })

    it ('invalid language | invalid input | should return status 500', (done) => {
        chai
        .request(app)
        .post('/df')
        .send({
            message: '',
            langcode: ''
        })
        .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.haveOwnProperty('message')
            expect(res.body.message).to.be.a('string')
            expect(res.body.message).not.to.have.length(0)
            done()
        })
    })

    describe('intent test', function () {

        this.timeout(10000)

        it('search | what is something', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'What is car?',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                done()
            })
        })

        it('search | what is something | not found', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'What is blablabla?',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                done()
            })
        })

        it('search | who is someone | recognized last name | 2 words', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'Who is Will Smith?',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                done()
            })
        })

        it('search | who is someone | recognized last name | 1 words', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'Who is James?',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                done()
            })
        })

        it('search | who is someone | unrecognized first name', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'Who is Kanye West?',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                done()
            })
        })

        it('search | who is someone | unrecognized last name', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'Who is Kim Kardashian?',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                done()
            })
        })

        it('search | who is someone | result not found', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'Who is James Smith?',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                done()
            })
        })

        it('search | what is someone | 2 words', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'What is Will Smith?',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                done()
            })
        })

        it('search | what is someone | 1 word', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'What is Kim?',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                done()
            })
        })

        it('movie recommendation | with valid title', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'Recommend me a movie based on Avengers',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body).to.haveOwnProperty('type')
                expect(res.body.reply).to.be.a('object')
                expect(res.body.type).to.be.a('string')
                expect(res.body.reply).to.haveOwnProperty('title')
                expect(res.body.reply).to.haveOwnProperty('summary')
                expect(res.body.type).to.equal('card')
                done()
            })
        })

        it('movie recommendation | with invalid title', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'Recommend me a movie based on dsadjsjdbfhjsbfjsd',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                done()
            })
        })

        it('movie recommendation | with no title', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'Recommend me a movie',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                done()
            })
        })

        it('flattered emotion | love agent', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'I love you',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body).to.haveOwnProperty('emotion')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.emotion).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                expect(res.body.emotion).to.equal('flattered')
                done()
            })
        })

        it('happy emotion | clever', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'You are so clever',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body).to.haveOwnProperty('emotion')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.emotion).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                expect(res.body.emotion).to.equal('happy')
                done()
            })
        })

        it('sad emotion | annoying', (done) => {
            chai
            .request(app)
            .post('/df')
            .send({
                message: 'You are so annoying',
                langcode: 'en'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('reply')
                expect(res.body).to.haveOwnProperty('emotion')
                expect(res.body.reply).to.be.a('string')
                expect(res.body.emotion).to.be.a('string')
                expect(res.body.reply).not.to.have.length(0)
                expect(res.body.emotion).to.equal('sad')
                done()
            })
        })
    })
})