'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')

const UserSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		unique: [true, 'Email should be unique']
	},
	password: {
		type: String,
		minlen: [6, 'Password should have minimum 6 characters']
	},
	language: {
		type: String
	}
})
	
UserSchema.post('validate', (doc) => {
	let hash = hashPassword(doc.password)
	doc.password = hash
})

const User = mongoose.model('User', UserSchema)

module.exports = User