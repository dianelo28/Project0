var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BlogPostSchema = new Schema({
	inputName: String,
	authorName: String,
	inputPost: String
})

var posts = mongoose.model('posts', BlogPostSchema);

BlogPostSchema.path('inputName').required(true,'Type in a title!');
BlogPostSchema.path('authorName').required(true,'Let us know who you are!');
BlogPostSchema.path('inputPost').required(true,"Don't forget to leave your thought!");


module.exports = posts;