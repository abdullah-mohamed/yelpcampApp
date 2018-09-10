var express = require('express'),
	router  = express.Router(),
	Camp 	= require('../models/camp');

// middleware
// ==========

// Checks if there is a user?
function isLoggedIn(req, res, next){

	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

// checks if the user who wants to edit/delete a campground is its creator
function isCreator(req, res, next){
	// get camp data from db
	Camp.findById(req.params.campId, function(err, foundCamp){
		if(err){
			console.log(err);
			console.log("Can't find camp!! routes/campgrounds.js");
		}else{
			let current =  req.user._id.toString();
			let newCurr=  foundCamp.creator.id.toString();
			if( current === newCurr){
				console.log('User is the creator!');
				return next();
			}
			res.redirect('/campgrounds/' + req.params.campId);
		}
	})

	
}

// Routes
// ======
// INDEX route - campgrounds page
router.get('/campgrounds', function(req, res){
	// get campgrounds from database
	Camp.find({}, function(err, campgrounds){
		if(err){
			console.log("Error");
		} else {
			// send campgrounds data and render the file 
			if(req.user == undefined){
				res.render('campgrounds/index', {campgrounds: campgrounds, currentUser: false});
			}else{
				res.render('campgrounds/index', {campgrounds: campgrounds, currentUser: req.user});
			}
		}
	});
});

// NEW route - add new camp form route
router.get('/campgrounds/new', isLoggedIn, function(req, res){
	res.render('campgrounds/new', {currentUser: req.user});
});

// CREATE route - adds new campground to the DB
router.post('/campgrounds', isLoggedIn, function(req, res){
	// get variables from req object
	var campName = req.body.campName;		
	var campImage = req.body.campImage;
	var campDescription = req.body.campDescription;
	var campCreator = {id: req.user.id, username: req.user.username};

	// add data to database
	var newCamp = new Camp({
		name: campName,
		image: campImage,
		description: campDescription,
		creator: campCreator
	});
	//newCamp.creator.username = req.user.username;
	newCamp.save(function(err, camp){
		if(err){
			console.log('camp not saved');
		}else{
			console.log("camp saved successfully to the DB");
			console.log(camp);
		}
	});

	// redirect back to the campgrounds page
	res.redirect('/campgrounds'); 
});

// SHOW route - show info about one camp
router.get('/campgrounds/:campId', function(req, res){
	var campId = req.params.campId;

	// get camp object from the db
	Camp.find({_id: campId}).populate('comments').exec(function(err, campWithComments){
		if(err){
			console.log(err);
		}else{
			// send the camp object to the template
			if(req.user == undefined){
				res.render('campgrounds/show', {camp: campWithComments, currentUser: false});
			}else{
				res.render('campgrounds/show', {camp: campWithComments, currentUser: req.user});
			}
		}
	});
});

// EDIT route -- shows a form to edit a campground
router.get('/campgrounds/:campId/edit', isLoggedIn, isCreator, function(req, res){
	// get camp from DB
	Camp.find({_id: req.params.campId}, function(err, foundCamp){
		if(err){
			console.log(err);
			res.send('Camp not found!!');
		}else{
			// render the edit form
			res.render('campgrounds/edit', {camp: foundCamp, currentUser: req.user});
		}
	})
});

// UPDATE route -- edit route submits here
router.put('/campgrounds/:campId', isLoggedIn, isCreator, function(req, res){
	// update date in DB
	Camp.findByIdAndUpdate(req.params.campId, req.body.camp, function(err, updatedBlog){
		if(err){
			console.log(err);
			console.log("couldn't update camp");
		}else{
			res.redirect('/campgrounds/' + req.params.campId);
		}
	});
});

// DELETE route -- deletes a campground
router.delete('/campgrounds/:campId', isLoggedIn, isCreator, function(req, res){
	// find a camp in db and delete it
	Camp.findByIdAndDelete(req.params.campId, function(err){
		if(err){
			console.log(err);
			console.log("couldn't delete camp.");
		}else{
			res.redirect('/campgrounds');
		}
	});
});

module.exports = router;