/*
	this module exports the comment model to be used in "../app8.js"
*/
var mongoose = require('mongoose');

// camp schema
var commentSchema = mongoose.Schema({
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	text: String
});

// compiling the schema into a model
module.exports = mongoose.model('Comment', commentSchema);
