const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
chai.use(chaiHttp)
const expect = chai.expect

describe('Translate route test', ()=>{

    it('should translate This is a cat to Ini adalah kucing', (done)=> {
        chai.request(app)
            .post('/translate')
            .send({
                text: 'This is a cat',
                motherlanguage: 'id'
            })
            .end((err,res)=> {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.haveOwnProperty('message')
                expect(res.body).to.haveOwnProperty('data')
                expect(res.body.message).to.equal('translate successfully')
                expect(res.body.data).to.be.a('object')
                expect(res.body.data).to.haveOwnProperty('translatedText')
                expect(res.body.data).to.haveOwnProperty('detectedSourceLanguage')
                expect(res.body.data).to.haveOwnProperty('originalText')
                expect(res.body.data.translatedText).to.equal('Ini adalah kucing')
                expect(res.body.data.detectedSourceLanguage).to.equal('en')
                done()
            })
    })

    it('should translate This is a dog to Ini adalah anjing', (done)=> {
        chai.request(app)
            .post('/translate/from')
            .send({
                text: 'This is a dog',
                motherlanguage: 'id'
            })
            .end((err,res)=> {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.haveOwnProperty('message')
                expect(res.body.message).to.equal('translate successfully')
                done()
            })
    })

    // negative test
    it('should give error message if text input is not available | translate', (done)=> {
        chai.request(app)
            .post('/translate/')
            .send({
                motherlanguage: 'id'
            })
            .end((err,res)=> {
                expect(res).to.have.status(500)
                expect(res.body).to.be.a('object')
                expect(res.body).to.haveOwnProperty('message')
                expect(res.body.message).to.equal('invalid input parameter translate')
                done()
            })
    })

    it('should give error message if motherlanguage input is not available | translate', (done)=> {
        chai.request(app)
            .post('/translate/')
            .send({
                text: 'This is a cat'
            })
            .end((err,res)=> {
                expect(res).to.have.status(500)
                expect(res.body).to.be.a('object')
                expect(res.body).to.haveOwnProperty('message')
                expect(res.body.message).to.equal('invalid input parameter translate')
                done()
            })
    })

    it('should give error message if motherlanguage input is not available | translate from', (done)=> {
        chai.request(app)
            .post('/translate/from')
            .send({
                text: 'This is a dog'
            })
            .end((err,res)=> {
                expect(res).to.have.status(500)
                expect(res.body).to.be.a('object')
                expect(res.body).to.haveOwnProperty('message')
                expect(res.body.message).to.equal('invalid input parameter translate')
                done()
            })
    })

    it('should give error message if text input is not available | translate from', (done)=> {
        chai.request(app)
            .post('/translate/from')
            .send({
                motherlanguage: 'id'
            })
            .end((err,res)=> {
                expect(res).to.have.status(500)
                expect(res.body).to.be.a('object')
                expect(res.body).to.haveOwnProperty('message')
                expect(res.body.message).to.equal('invalid input parameter translate')
                done()
            })
    })
})