'use strict'

require('dotenv').config();
const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
// const getObject = require('./routes/detectobject.js');
// const getTranslate = require('./routes/translate.js');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// app.use('/detectobject', getObject);
// app.use('/translate', getTranslate);

app.listen(3000, () => {
    console.log(`Listening to port 3000`)
})

module.exports = app;