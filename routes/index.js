var express  = require('express'),
	router	 = express.Router(),
	passport = require('passport'),
	User 	 = require('../models/user');

// home page 
router.get('/', function(req, res){
	if(req.user == undefined){
		res.render('home', {currentUser: false});
	}else{
		res.render('home', {currentUser: req.user});
	}
});

// middlewares
function isLoggedIn(req, res, next){

	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}



// logging routes
// ==============

// Sign up Route -- A form to sign up
router.get('/signup', function(req, res){
	if(req.isAuthenticated()){
		req.logout();
	}
	res.render('signup', {currentUser: req.isAuthenticated()});
});

// Sign up ROUTE -- The Sign up form submits here
router.post('/signup', function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, newUser){
		if(err){
			console.log(err);
			return res.render('signup', {currentUser: req.isAuthenticated()});
		}
		passport.authenticate('local')(req, res, function(){
			res.redirect('/campgrounds');
		});
	});
});

// login ROUTE -- A form to log user in
router.get('/login', function(req, res){
	if(req.isAuthenticated()){
		res.send("already logged in!!");
	}else{
		res.render('login', {currentUser: req.isAuthenticated()});
	}
});

// login Route -- The 'Sign in' form submits here
router.post('/login', passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/'
	}), function(req, res){
		// This won't execute
});

// logout ROUTE
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});


module.exports = router;