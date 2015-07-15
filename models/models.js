var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
//Authors

var AuthorSchema = new Schema({
	commentAuthor: String
})

var Author = mongoose.model('Author', AuthorSchema);


//comments

var CommentSchema = new Schema({
	commentPost: String
});

var Comment = mongoose.model('Comment', CommentSchema);

//blogposts

var BlogPostSchema = new Schema({
	inputName: String,
	authorName: {type: Schema.Types.ObjectId, ref:"Author"},
	inputPost: String,
	comments:[CommentSchema]
})

var Post = mongoose.model('Post', BlogPostSchema);

// BlogPostSchema.path('inputName').required(true,'Type in a title!');
// BlogPostSchema.path('authorName').required(true,'Let us know who you are!');
// BlogPostSchema.path('inputPost').required(true,"Don't forget to leave your thought!");


module.exports.Post = Post;
module.exports.Author = Author;
module.exports.Comment = Comment

