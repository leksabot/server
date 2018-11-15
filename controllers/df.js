const projectId = 'leksabot-68263';
const sessionId = 'leksabot' + Date.now();
 
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const { searchMW, searchTMDB }  = require('../helpers/dfFnBank')

module.exports = {
    
    reply (req, res) {
        if (req.body.message) {
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
                let { keyword, name1, name2 } = result.parameters.fields
                // console.log(result.parameters)
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
                } else if (result.intent.displayName === 'custom.agent.recommendation') {

                } else {
                    res.status(200).json({reply: result.fulfillmentText, result: result})
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