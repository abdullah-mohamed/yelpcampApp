/*
	this module exports the camp model to be used in "../app3.js"
*/
var mongoose = require('mongoose');

// camp schema
var campSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	creator: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});


// compiling the schema into a model
module.exports = mongoose.model('Camp', campSchema);
