'use strict'

require('dotenv').config();
const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/leksabotdb', {useNewUrlParser: true})
mongoose.connect(process.env.MONGO_USER,{useNewUrlParser: true})

const IndexRoutes = require('./routes/index')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', IndexRoutes)
app.get('/', (req,res)=> {
    res.send('OK')
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to port `,process.env.PORT)
})

module.exports = app;