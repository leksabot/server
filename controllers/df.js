const projectId = 'leksabot-68263'
let sessionId = String(Date.now())

const dialogflow = require('dialogflow')
const sessionClient = new dialogflow.SessionsClient()

const { searchMW, searchTMDB, tasteDive_movie }  = require('../helpers/dfFnBank')

module.exports = {
    
    reply (req, res) {
        if (req.body.message) {
            
            let now = Date.now()
            if (Number(now) - Number(sessionId) > 1800000) {
                sessionId = String(now)
            }

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
                let { keyword, name1, name2, title } = result.parameters.fields
                if (result.intent.displayName === 'custom.agent.search') {
                    let kwVal = keyword.stringValue
                    if (kwVal && kwVal.length > 0) {
                        qLen = kwVal.slice(0, kwVal.length-8).length
                        kwReal = result.queryText.slice(qLen)
                        searchMW(res, kwReal)
                    } else {
                        let kwStruct = keyword.structValue
                        if (kwStruct) {
                            name1 = kwStruct.fields.name1
                            name2 = kwStruct.fields.name2
                        }
                        let n1Val = name1.stringValue
                        let n2Val = name2.stringValue
                        searchTMDB(req, res, n1Val, n2Val)
                    }
                } else if (result.intent.displayName === 'custom.agent.recommendation.movie') {
                    let { stringValue } = title
                    if (stringValue.length > 0) {
                        tasteDive_movie(res, stringValue)
                    } else {
                        res.status(200).json({reply: result.fulfillmentText})
                    }
                } else {
                    res.status(200).json({reply: result.fulfillmentText})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: err})
            });
        } else {
            res.status(500).json({message: 'Hey, really? Wtf is happening on the front-end?'})
        }
    }


}