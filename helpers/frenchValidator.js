'use strict'

function frenchValidator(inputRegex, input){
    
    let regex = new RegExp(`${inputRegex}`)

    let inputLength = input.length
    let questionMark = inputRegex.length
    let word = input.slice(questionMark,inputLength)
   
    let obj = {}
    console.log('testing-------------', inputRegex, input)
    if(regex.test(input)) {
        obj.status = true
        obj.word = word
    } else {
        obj.status = false
        obj.word = ''
    }
    return obj
}

module.exports = frenchValidator