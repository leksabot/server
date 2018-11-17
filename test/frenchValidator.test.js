const assert = require('assert')
const frenchValidator = require('../helpers/frenchValidator')

describe('French Validator', () => {
    
    it(`should give status true if the question is started with 
        qu'-est-ce que c'est`, (done)=> {
            var obj = frenchValidator('qu\'est-ce que c\'est un ', 
                'qu\'est-ce que c\'est un maison')

            assert.equal(obj.status, true)
            assert.equal(obj.word, 'maison')
            // console.log('result------',obj)
            done()    
        })

    it(`should give status false if the question is started with 
        qu'-est-ce que c'est`, (done)=> {
            var obj = frenchValidator('qu\'est-ce que c\'est un', 
                `what is dog`)

            assert.equal(obj.status, false)
            assert.equal(obj.word, '')
            done()    
        })    
})
