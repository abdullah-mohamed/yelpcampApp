var express = require('express'),
	router  = express.Router(),
	Camp 	= require('../models/camp'),
	Comment = require('../models/comment');

// middleware
// ==========
function isLoggedIn(req, res, next){

	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

// comments routes
// ===============

// NEW route - displays a form to make a new comment, submits to '/camprounds/:id/comment'
router.get('/campgrounds/:id/comments/new', isLoggedIn ,function(req, res){
	// get camp details from DB
	var camp = Camp.findOne({_id: req.params.id}, function(err, camp){
		if (err){
			console.log(err);
		}else{
			// send camp details to the template
			res.render('comments/new', {camp: camp, currentUser: req.user});
		}
	});
});

// CREATE route - adds the comment to the DB, redirects to '/campgrounds/:id'
router.post('/campgrounds/:id/comments', isLoggedIn, function(req, res){
	// get variables from the form
	var campId = req.params.id;
	var commentAuthor = {
		id: req.user._id,
		username: req.user.username
	};
	var commentContent = req.body.commentContent;

	// make a new comment entity and push it to the campground entity
	Comment.create({author: commentAuthor, text: commentContent}, function(err, createdComment){
		if(err){
			console.log(err);
		}else{
			Camp.findOne({_id: campId}, function(err, foundCamp){
				if(err){
					console.log(err);
				}else{
					foundCamp.comments.push(createdComment);
					foundCamp.save(function(err){
						if(err){
							console.log(err);
						}else{
							// redirect back
							res.redirect('/campgrounds/' + campId);
						}
					});
				}
			});
		}
	});
});

// EDIT route -- shows a form to edit a comment
router.get('/campgrounds/:campId/comments/:commentId/edit', isLoggedIn, function(req, res){

});

module.exports = router;