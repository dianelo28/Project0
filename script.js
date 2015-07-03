$(document).ready(function(){

// $('#myModal').on('shown.bs.modal', function () {
//   $('#myInput').focus()
// }) //modal focus

var BlogPost = function (inputName,inputPost){
	this.inputName = inputName;
	this.inputPost = inputPost;
};
var blogPost1 = new BlogPost('Zombie Impsum','lskdhfkjhsf')
var blogPost2 = new BlogPost('Zombie Impsum','lskdhfkjhsf')

BlogPost.all=[blogPost1,blogPost2]
console.log(BlogPost.all)

var blogTemplate = _.template($('#blogTemplate').html());

var $blog = $('#blog')

// _.each(BlogPost.all, function(blogPost,index){
// 	// var $blogPostAdd = $(blogTemplate(blogPost));
// 	// $blogPostAdd.attr('data-index', index);
// 	// $blog.prepend($blogPostAdd);
// });


BlogPost.prototype.save = function(){
	BlogPost.all.push(this);
	console.log(BlogPost.all)
};

BlogPost.prototype.render = function(){
	var $blogPost = $(blogTemplate(this));
	$blog.prepend($blogPost);
}

_.each(BlogPost.all, function(blogPost,index){
	blogPost.render();
});

var $newPost = $('#postForm');
	$newPost.on('submit', function(event){
		event.preventDefault();
		var $inputName = $('#inputName').val();
		var $inputPost = $('#inputPost').val();
		var blogPost = new BlogPost($inputName,$inputPost);
		blogPost.save();
		blogPost.render();
		$("form").trigger("reset");
		$('#inputName').focus();
	})

});