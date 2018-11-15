'use strict'

function frenchValidator(inputRegex, input){
    // let regex1 = new RegExp('Qu\'est-ce que c\'est')
    // let regex2 = new RegExp('qu\'est-ce que c\'est')
    
    // console.log('regex----', inputRegex)
    // console.log('input------', input)
    let regex = new RegExp(`${inputRegex}`)

    let inputLength = input.length
    let questionMark = inputRegex.length
    let word = input.slice(questionMark,inputLength)
   
    // console.log(questionMark,'-----')
    // // console.log(inputLength - questionMark)
    // console.log('kata--------', word)
    // console.log('kata.length----', word.length)
    let obj = {}
    // let frenchWord = ''

    if(regex.test(input)) {
        // console.log(word.length,'-1', word)
        obj.status = true
        obj.word = word
    } else {
        obj.status = false
        obj.word = ''
    }
    return obj

    // // console.log(word.substr(0,2))
    // if(regex1.test(input)){

    //     if (word.substr(0,3)==='une'){
    //         frenchWord = word.slice(4,word.length)
    //     } else  {
    //         frenchWord = word.slice(3,word.length)
    //     }
    //     // console.log(frenchWord.length,'-1', frenchWord)
    //     obj.status = true
    //     obj.word = frenchWord
    //     return obj

    // } else if(regex2.test(input)){

    //     if (word.substr(0,3)==='une'){
    //         frenchWord = word.slice(4,word.length)
    //     } else  {
    //         frenchWord = word.slice(3,word.length)
    //     }
    //     // console.log(frenchWord.length,'-2', frenchWord)
    //     obj.status = true
    //     obj.word = frenchWord
    //     return obj

    // } else {
    //     obj.status = false
    //     obj.word = ''
    //     return obj
    // }
}

module.exports = frenchValidator