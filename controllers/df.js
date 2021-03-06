const projectId = 'leksabot-68263'
let sessionId = String(Date.now())

const dialogflow = require('dialogflow')
const sessionClient = new dialogflow.SessionsClient()

const { searchMW, searchTMDB, tasteDive_movie, frenchSearch }  = require('../helpers/dfFnBank')
const frenchValidator = require('../helpers/frenchValidator')

module.exports = {
    
    reply (req, res) {

        let now = Date.now()
        if(Number(now) - Number(sessionId) > 1800000) {
           sessionId = String(now)                      
        }
        
        if (req.body.message && req.body.langcode) {    
            const sessionPath = sessionClient.sessionPath(projectId, sessionId);
            const request = {
                session: sessionPath,
                queryInput: {
                    text: {
                        text: req.body.message,
                        languageCode: req.body.langcode
                    }
                }
            }
            sessionClient
            .detectIntent(request)
            .then(responses => {
                let result = responses[0].queryResult;
                let intentType = result.intent.displayName
                let { keyword, name1, name2, title } = result.parameters.fields
                let languageQuery = result.languageCode
                switch (intentType) {
                    case 'custom.agent.search': {
                        let kwVal = keyword.stringValue
                        if (languageQuery === 'fr') {
                            let frenchQuestion = result.queryText.toLowerCase()
                            let frenchValue = keyword.stringValue.toLowerCase()
                            let inputRegex = frenchValue.slice(0, frenchValue.length-8)
                            let frenchCheck = frenchValidator(inputRegex,frenchQuestion)
                            if(frenchCheck.status) {
                                frenchSearch(res, frenchCheck.word)
                            } else {
                                res.status(200).json({
                                    msg: 'Je ne comprends pas votre question'
                                })
                            }
                        } else if (kwVal && kwVal.length > 0 && result.queryText.slice(0,3) !== 'who' && result.queryText.slice(0,3) !== 'Who') {
                            qLen = kwVal.slice(0, kwVal.length-8).length
                            kwReal = result.queryText.slice(qLen)
                            searchMW(res, kwReal)
                        } else {
                            let kwStruct = keyword.structValue
                            if (kwStruct) {
                                name1 = kwStruct.fields.name1
                                name2 = kwStruct.fields.name2
                            }
                            if (name2 && name2.stringValue.length < 1) {
                                let name1FirstIndex = result.queryText.indexOf(name1.stringValue)
                                let name1LastIndex = name1FirstIndex + name1.stringValue.length + 1
                                if (result.queryText[name1LastIndex]) {
                                    name2.stringValue = result.queryText.slice(name1LastIndex)
                                }
                            }
                            let n1Val = name1.stringValue
                            let n2Val = ''
                            if (name2) {
                                n2Val = name2.stringValue
                            }
                            searchTMDB(req, res, n1Val, n2Val)
                        }
                        break
                    }
                    case 'custom.agent.recommendation.movie': {
                        let { stringValue } = title
                        if (stringValue.length > 0) {
                            tasteDive_movie(res, stringValue)
                        } else {
                            res.status(200).json({reply: result.fulfillmentText})
                        }
                        break
                    }
                    case 'custom.agent.uninstall':
                    case 'smalltalk.agent.annoying':
                    case 'smalltalk.agent.boring':
                    case 'smalltalk.agent.be_clever':
                    case 'smalltalk.appraisal.bad':
                    case 'smalltalk.agent.bad': {
                        res.status(200).json({reply: result.fulfillmentText, emotion: 'sad'})
                        break
                    }
                    case 'smalltalk.agent.funny':
                    case 'smalltalk.agent.good':
                    case 'smalltalk.appraisal.good':
                    case 'smalltalk.appraisal.well_done':
                    case 'smalltalk.user.misses_agent':
                    case 'smalltalk.agent.clever': {
                        res.status(200).json({reply: result.fulfillmentText, emotion: 'happy'})
                        break
                    }
                    case 'smalltalk.agent.beautiful':
                    case 'smalltalk.user.loves_agent': {
                        res.status(200).json({reply: result.fulfillmentText, emotion: 'flattered'})
                        break
                    }
                    default: {
                        res.status(200).json({reply: result.fulfillmentText})
                    }
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: err})
            })
        } else {
            res.status(500).json({message: "Hey, really? What's happening on the front-end? ('message' & 'langcode' is needed)"})
        }
    },

    define (req, res) {
        searchMW(res, req.body.keyword, 'long')
    },

    definefrench (req,res) {
        frenchSearch(res, req.body.keyword)
    }
}