const chai = require('chai')
const frenchValidator = require('../helpers/frenchValidator')
const assert = require('assert')

describe('French Validator', () => {

    it(`should give status true if the question is started with 
        qu'-est-ce que c'est`, (done)=> {
            var obj = frenchValidator(`
            qu'est-ce que c'est`, `qu'est-ce que c'est un maison`)

            assert.equal(obj.status, false)
                
        })

})
