'use strict'

require('dotenv').config();
const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose')

if(process.env.NODE_ENV !== 'test'){
    // mongoose.connect('mongodb://localhost:27017/leksabotdb', {useNewUrlParser: true})
    mongoose.connect(process.env.MONGO_USER,{useNewUrlParser: true})
} else {
    mongoose.connect('mongodb://localhost:27017/leksabotdbtesting', {useNewUrlParser: true})
}

const IndexRoutes = require('./routes/index')
const QuestionRoutes = require('./routes/question')
const df = require('./routes/df')

const getObject = require('./routes/detectobject.js');
// const getTranslate = require('./routes/translate.js');

const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/user', IndexRoutes)
    app.use('/question', QuestionRoutes)
    app.use('/df', df)
    app.get('/', (req,res)=> {
        res.send('OK')
})

app.use('/detectobject', getObject);
// app.use('/translate', getTranslate);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening to port `, process.env.PORT || 3000)
})

module.exports = app;