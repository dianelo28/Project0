var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CommentSchema = new Schema({
	commentAuthor: String,
	commentPost: String
})

var Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;