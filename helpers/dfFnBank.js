const axios = require('axios')

module.exports = {

    searchMW (res, kwReal) {
        if (kwReal[kwReal.length - 1] === '?') {
            kwReal = kwReal.slice(0, kwReal.length - 1)
        }
        axios({
            url: `https://dictionaryapi.com/api/v3/references/sd2/json/${kwReal}?key=87fd2933-68d1-4068-9196-89cef3d32419`
        })
        .then(({data}) => {
            if (data && data.length > 0) {
                res.status(200).json({reply: `According to Merriam-Webster, ${kwReal} can be defined as ${data[0].shortdef[0]}.`})
            } else {
                res.status(200).json({reply: "Sorry, but I didn't get it, could you rephrase it please?"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err})
        })
    },

    searchTMDB (req, res, n1Val, n2Val) {
        if (n1Val.length > 0) {
            if (n1Val[n1Val.length - 1] === '?') {
                n1Val = n1Val.slice(0, n1Val.length - 1)
            }
            let nameQuery = n1Val
            if (n2Val.length > 0) {
                if (n2Val[n2Val.length - 1] === '?') {
                    n2Val = n2Val.slice(0, n2Val.length - 1)
                }
                nameQuery += `%20${n2Val}`
            }
            axios({
                url: `https://api.themoviedb.org/3/search/person?api_key=${process.env.TMDB_API_KEY}&language=${req.body.langcode}&query=${nameQuery}&page=1&include_adult=true`
            })
            .then(({data}) => {
                axios({
                    url: `https://api.themoviedb.org/3/person/${data.results[0].id}?api_key=${process.env.TMDB_API_KEY}&language=${req.body.langcode}`
                })
                .then(({data}) => {
                    let { biography } = data
                    if (biography.length > 0) {
                        let bioSplit = biography.split('.')
                        let validBio = ''
                        let i = 0
                        let loop = true
                        while (validBio.length < 150 && loop) {
                            if (i < bioSplit.length) {
                                validBio += `${bioSplit[i]}.`
                                i++
                            } else {
                                loop = false
                            }
                        }
                        validBio = validBio.split('\n')
                        validBio = validBio.join(' ')
                        res.status(200).json({reply: validBio})
                    } else {
                        res.status(200).json({reply: "Sorry, but it seems that we can't find anything that matches your search."})
                    }
                })
                .catch(err => {
                    res.status(500).json({message: err})
                })
            })
            .catch(err => {
                res.status(500).json({message: err})
            })
        } else {
            res.status(200).json({reply: "Sorry, but it seems that we can't find anything that matches your search."})
        }
    }
}