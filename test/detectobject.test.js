const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
chai.use(chaiHttp)
const expect = chai.expect

describe('Google Vision Upload Test', ()=> {

    let boundary = Math.random()
    let filename = 

    it('should give success message for NoGCP cases', (done)=> {
        chai.request(app)
            .post('/detectobject')
            .set('Content-Type', 'multipart/form-data; boundary=' + boundary)
            .write('--' + boundary + '\r\n')
            .write('Content-Disposition: form-data; name="imagefile"; filename="'+filename+'"\r\n')
            .write('Content-Type: image/jpg\r\n')
            .write('\r\n')
            .write(fs.readFileSync('test/'+filename))
            .write('\r\n--' + boundary + '--')
            .end((err,res)=>{
                
                expect(res).to.have.status(200)
                console.log('error------------------', err)
                console.log('res.body---------------',res.body)
                done()
            })

        })        
})