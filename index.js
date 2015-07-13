// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    _ = require("underscore");

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// built in phrasing

var blogPosts = [
	{id: 1, inputName:'Zombie Impsum', authorName: 'http://www.zombieipsum.com/', inputPost:'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.'},
	{id: 2, inputName:'Marvel Impsum', authorName:'http://www.marvelipsum.com/', inputPost:'Like a sci fi Lone Wolf & Cub, the new Cable series is packed with action, adventure, humor and everything else an X-Men fan could ask for. Marvels mighty mutants go worldwide and beyond in this series following Cyclops, Wolverine, Beast, Emma Frost and more in their astonishing adventures. Looking for the one superhero comic you just have to read. This is where youll find all the big-time action, major storylines and iconic Spider-Man magic youd come to expect from the Wall-Crawler.'},
	{id: 3, inputName:'Hipster Ipsum', authorName:'http://hipsum.co/', inputPost:'Typewriter roof party +1, chia Brooklyn Marfa four dollar toast Godard hella XOXO actually. Distillery PBR retro pug slow-carb plaid. Yr direct trade selfies Shoreditch Truffaut mixtape 90s readymade, farm-to-table Portland Banksy migas trust fund. Retro Pinterest leggings squid mlkshk crucifix. Deep v slow-carb McSweeneys brunch, bespoke cliche Odd Future Helvetica salvia. VHS artisan quinoa, heirloom Carles meditation lomo. Health goth Vice small batch, selvage gluten-free Banksy locavore umami VHS craft beer tote bag roof party sustainable viral keytar.' }
];

// set up root route to respond with 'project0 front page'

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// blogPosts index

app.get('/blog', function (req, res) {
	res.json(blogPosts);
})

//get bt ID

app.get("/blog/:id",function(req,res){
	var targetId = parseInt(req.params.id);
	console.log(targetId);
	var foundPost = _.findWhere(blogPosts, {id: targetId})
	console.log(foundPost);
	res.json(foundPost);
})

//create

app.post('/blog', function (req, res) {
  	var newPost = req.body;

  	if (blogPosts.length>0){
  		newPost.id = blogPosts[blogPosts.length - 1].id + 1;
 	} else {
 		newPost.id = 0;
 	};

 	console.log(newPost);
 	blogPosts.push(newPost);
 	res.json(newPost);

});

//update/edit blog posts

app.put('/blog/:id', function(req,res){
	var targetId = parseInt(req.params.id)
	var foundPost = _.findWhere(blogPosts, {id: targetId});

	foundPost.inputName = req.body.inputName || foundPost.inputName;
	foundPost.authorName = req.body.authorName || foundPost.authorName;
	foundPost.inputPost = req.body.inputPost || foundPost.inputPost;

	res.json(foundPost);

});

//delete

app.delete ('/blog/:id', function(req,res){
	var targetId = parseInt(req.params.id);
	var foundPost = _.findWhere(blogPosts, {id: targetId})
	console.log(foundPost);

	if (foundPost){
		var index = blogPosts.indexOf(foundPost);
		console.log(index);
		blogPosts.splice(index,1);
		res.json(foundPost);
	} else {
		res.json(blogPosts)
	}
})


// listen on port 3000
var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});