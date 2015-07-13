var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BlogPostSchema = new Schema({
	inputName: String,
	authorName: String,
	inputPost: String
})

var posts = mongoose.model('posts', BlogPostSchema);

module.exports = posts;