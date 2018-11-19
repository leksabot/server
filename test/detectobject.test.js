const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const fs = require('fs')

chai.use(chaiHttp)
const expect = chai.expect

describe('Google Vision Upload Test', ()=> {

    // let boundary = Math.random()
    // let filename = fs.readFileSync('~/Hacktiv8/finalproject/quotetest.jpg')
   
    // it('should give success message for NoGCP cases', (done)=> {
    //     let file = {
    //         fileName: "quotetest.jpg",
    //     }
    //     chai.request(app)
    //         .post('/detectobject')
    //         .set('Content-Type', 'multipart/form-data')
    //         .field('Content-Type', 'multipart/form-data')
    //         .field('imagefile', 'quotetest.jpg')
    //         .attach('files', "/home/esadeli/Hacktiv8/finalproject/quotetest.jpg")
    //         .field('motherlanguage', 'id')
    //         // .send({
    //         //     file,
    //         //     motherlanguage: 'id'
    //         // })
    //         // .write('--' + boundary + '\r\n')
    //         // .write('Content-Disposition: form-data; name="imagefile"; filename="'+'quotetest.jpg'+'"\r\n')
    //         // .write('Content-Type: image/jpg\r\n')
    //         // .write('\r\n')
    //         // .write(fs.readFileSync('/home/esadeli/Hacktiv8/finalproject/quotetest.jpg'))
    //         // .write('\r\n--' + boundary + '--')
    //         .end((err,res)=>{
                
    //             expect(res).to.have.status(200)
    //             //console.log('error------------------', err)
    //             //console.log('res.body---------------',res.body)
    //             done()
    //         })

    //     })
        
    // Negative test

    it('should give error message if invalid input for NoGCP cases', (done)=> {
        chai.request(app)
            .post('/detectobject')
            .set('Content-Type', 'multipart/form-data')
            .field('Content-Type', 'multipart/form-data')
            .field('imagefile', 'quotetest.jpg')
            .attach('files', "/home/esadeli/Hacktiv8/finalproject/quotetest.jpg")
            .field('motherlanguage', 'id')
            .end((err,res)=>{
                //console.log('error------------------', err)
                //console.log('res.body---------------',res)
                expect(res).to.have.status(500)
                done()
            })

        })
        
    it('should give error message if invalid input  for AutoGCP cases', (done)=> {
        chai.request(app)
            .post('/detectobject/gcp')
            .set('Content-Type', 'multipart/form-data')
            .field('Content-Type', 'multipart/form-data')
            .field('imagefile', 'quotetest.jpg')
            .attach('files', "/home/esadeli/Hacktiv8/finalproject/quotetest.jpg")
            .field('motherlanguage', 'id')
            .end((err,res)=>{
                //console.log('error 1------------------', err)
                //console.log('res.body 1---------------',res.body)
                expect(res).to.have.status(500)
                done()
            })

        })    

    it('should give error message if invalid input  for AutoGCP cases | detect info', (done)=> {
        chai.request(app)
            .post('/detectobject/object')
            .set('Content-Type', 'multipart/form-data')
            .field('Content-Type', 'multipart/form-data')
            .field('imagefile', 'quotetest.jpg')
            .attach('files', "/home/esadeli/Hacktiv8/finalproject/quotetest.jpg")
            .field('motherlanguage', 'id')
            .end((err,res)=>{
                //console.log('error 2------------------', err)
                //console.log('res.body 2---------------',res.body)
                expect(res).to.have.status(500)
                done()
            })

        })        

    it('should give error message if invalid input  for AutoGCP cases | detect text', (done)=> {
        chai.request(app)
            .post('/detectobject/text')
            .set('Content-Type', 'multipart/form-data')
            .field('Content-Type', 'multipart/form-data')
            .field('imagefile', 'quotetest.jpg')
            .attach('files', "/home/esadeli/Hacktiv8/finalproject/quotetest.jpg")
            .field('motherlanguage', 'id')
            .end((err,res)=>{
                //console.log('error 3------------------', err)
                //console.log('res.body 3---------------',res.body)
                expect(res).to.have.status(500)
                done()
            })

        })    
})