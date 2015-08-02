//server side JS

// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require("underscore"),
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10);

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

//mongoose/models

var mongoose = require('mongoose');
var db = require ('./models/models');
var User = require('./models/Users');
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/blogPosts' // plug in the db name you've been using
);


//sessions

var session = require('express-session');


// app.use(session({
// 	secret:'super secret',
// 	resave: false,
// 	saveUninitialized: true
// }));

// app.get('/login', function (req, res) {
//   var html = '<form action="/api/sessions" method="post">' +
//                'Your email: <input type="text" name="email"><br>' +
//                'Your password: <input type="text" name="password"><br>' +
//                '<button type="submit">Submit</button>' +
//                '</form>';
//   if (req.session.user) {
//     html += '<br>Your email from your session is: ' + req.session.user.email;
//   }
//   console.log(req.session);
//   console.log(req.sessionID); 
//   res.send(html);
// })

// app.post('/api/sessions', function (req, res) {
//   User.authenticate(req.body.email, req.body.password, function(error, user) {
//     req.session.user = user;
//     res.redirect('/login');
//   });
// });



// built in phrasing

// var blogPosts = [
// 	{id: 1, inputName:'Zombie Impsum', authorName: 'http://www.zombieipsum.com/', inputPost:'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.'},
// 	{id: 2, inputName:'Marvel Impsum', authorName:'http://www.marvelipsum.com/', inputPost:'Like a sci fi Lone Wolf & Cub, the new Cable series is packed with action, adventure, humor and everything else an X-Men fan could ask for. Marvels mighty mutants go worldwide and beyond in this series following Cyclops, Wolverine, Beast, Emma Frost and more in their astonishing adventures. Looking for the one superhero comic you just have to read. This is where youll find all the big-time action, major storylines and iconic Spider-Man magic youd come to expect from the Wall-Crawler.'},
// 	{id: 3, inputName:'Hipster Ipsum', authorName:'http://hipsum.co/', inputPost:'Typewriter roof party +1, chia Brooklyn Marfa four dollar toast Godard hella XOXO actually. Distillery PBR retro pug slow-carb plaid. Yr direct trade selfies Shoreditch Truffaut mixtape 90s readymade, farm-to-table Portland Banksy migas trust fund. Retro Pinterest leggings squid mlkshk crucifix. Deep v slow-carb McSweeneys brunch, bespoke cliche Odd Future Helvetica salvia. VHS artisan quinoa, heirloom Carles meditation lomo. Health goth Vice small batch, selvage gluten-free Banksy locavore umami VHS craft beer tote bag roof party sustainable viral keytar.' }
// ];

// var comments = [
// 	{id: 1, commentAuthor: 'Diane', comment: 'muhahaha'}
// ]

// set up root route to respond with 'project0 front page'

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// blogPosts index

app.get('/api/blog', function (req, res) {
	db.Post.find(function(err, posts){
		res.json(posts);
	});
});

app.get('/api/posts', function(req,res){
	// db.Post.find({}).populate('author').exec(function(err, allPosts){
		console.log("all posts");
		console.log(allPosts);
		res.json(allPosts)
	});
});
//get by ID

app.get("/api/posts/:id",function(req,res){
	var targetId = req.params.id;
	db.Post.findOne({_id: targetId}, function(err, foundPost){
		res.json(foundPost);
	});
});

//create

app.post('/api/posts', function (req, res) {
  	var author = new db.Author({
  		name: req.body.authorName
  	});


  	author.save(function(err, author) {
	  	var post = new db.Post ({
		  	inputName: req.body.inputName,
		  	author: author._id,
		  	inputPost: req.body.inputPost
	  	});
  		
  		post.save(function(err, post){
  			res.json(post);
  		});
  	});

 });

// app.post('/api/blog', function (req,res){
// 	var newComment = new Comment({
// 		commentAuthor: req.body.commentAuthor,
// 		commentPost: req.body.commentPost,
// 		// posts.push(Comments);
// 		// posts.save();
// 	})

// 	newComment.save(function(err, savedComments){
// 		console.log(newComment);
// 		res.json(savedComments)
// 	});
// });
  // 	if (blogPosts.length>0){
  // 		newPost.id = blogPosts[blogPosts.length - 1].id + 1;
 	// } else {
 	// 	newPost.id = 0;
 	// };

//  	res.json(newPost);

// });

//update/edit blog posts

app.put('/api/post/:id', function(req,res){
	var targetId = (req.params.id)
	db.Post.findOne({_id:targetId}, function(err, foundPost){			authorName: $('#editAuthorName').val(),


	foundPost.inputName = req.body.inputName || foundPost.inputName;
	foundPost.authorName = req.body.authorName || foundPost.authorName;
	foundPost.inputPost = req.body.inputPost || foundPost.inputPost;

	foundPost.save(function(err,savedPosts){
	res.json(savedPosts);
		});
	});
});

//delete

app.delete ('/api/posts/:id', function(req,res){
	var targetId = (req.params.id);
	db.Post.findOneAndRemove({_id: targetId}, function(err, deletedPost){
		res.json(deletedPost);
	});
});

//get all comments for one post

app.get('/api/posts/:postid/comments', function(req,res){
	db.Post.findOne({_id: req.params.postid}, function (err, post){
		res.json(post.comments);
	});
});

//add a new comment to a post

app.post('/api/posts/:postid/comments', function(req,res){
	db.Post.findOne({_id:req.params.postid},function(err,post){
		var newComment = new db.Comment({commentPost: req.body.commentPost, _id: req.params.postid});
			post.comments.push(newComment);
			res.json(newComment);
	});
});

//update single comment

app.put('/api/posts/:postid/comments/:commentid', function(req,res){
	db.Comments.findOne({_id:req.params.commentid},function(err, foundComment){
		foundComment.commentPost = req.body.commentPost || foundPost.commentPost;

		foundComment.save(function(err,savedComments){
		res.json(savedComments);
		});
	});
});	

//delete a comment

app.delete('/api/posts/:postid/comments/:commentid', function(req,res){
	db.Comments.findOneAndRemove({_id: req.params.commentid}, function(err, deletedComment){
		res.json(deletedComment);
	});
});

// get all authors

app.get('/api/authors', function(req,res){
	db.Author.find({}), function(err, authors){
		res.json(authors);
	};
});

//create a new author

app.post('/api/authors', function(req,res){
	var newAuthor = new db.Author({authorName: req.body.commentAuthor});
	newAuthor.save(function(err, author){
		res.json(author);
	});
});

//assign a specific author to a specific post

app.put('/api/posts/:postid/authors/:authorid', function(req,res){
	db.Author.find({_id: req.params.authorid}, function(err, author){
		db.Post.find({_id: req.params.postid}, function(err, post){
			post.author = author._id;
			post.save(function(err, savedPost){
				res.json(savedPost);
			});
		});
	});
});


// listen on port 3000
app.listen(process.env.PORT || 3000);
  console.log('server started on localhost:3000');
