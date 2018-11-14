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
		unique: [true, 'Email should be unique'],
		validate : {
			validator: function (v) {
				let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return regex.test(v)
			},
			message: 'Please Check your email'
		}
	},
	password: {
		type: String,
		minlength: [6, 'Password should have minimum 6 characters']
	},
	language: {
		type: String
	}
},{
	timestamps: true
})
	
UserSchema.post('validate', (doc) => {
	let hash = hashPassword(doc.password)
	doc.password = hash
})

const User = mongoose.model('User', UserSchema)

module.exports = User