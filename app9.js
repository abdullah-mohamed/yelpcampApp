// libraries and DB models
var express 		      = require('express'),
	app 	  			  = express(),
	bodyParser 			  = require('body-parser'),
	mongoose  			  = require('mongoose'),
	passport 		      = require('passport'),
	localStrategy 		  = require('passport-local').Strategy,
	passportLocalMongoose = require('passport-local-mongoose'),
	expressSession		  = require('express-session'),
	methodOverride		  = require('method-override'),
	User 				  = require('./models/user'),
	Comment   			  = require('./models/comment'),
	Camp 	  			  = require('./models/camp'),
	seedDb    			  = require('./seed.js');

// routes
var commentRoutes = require('./routes/comments'),
	campRoutes	  = require('./routes/campgrounds'),
	indexRoutes   = require('./routes/index');


// configurations
// =============

// mongoose configurations
mongoose.connect('mongodb://localhost:27017/yelpcamp_app', {useNewUrlParser: true});

// server configurations
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/puplic'));
app.use(methodOverride("_method"));						// for handling PUT and DELETE requests
app.use(expressSession({								// keep user logged in using a session
	secret: "I am a software engineer",					// for encryption
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());							// passport initialization
app.use(passport.session());
app.use(commentRoutes);									// routes
app.use(campRoutes);
app.use(indexRoutes);

// passport config
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());			// to encrypt data before sending
passport.deserializeUser(User.deserializeUser());		// to decrypt recieved data

// seeding the DB
//seedDb();

// PORT config
app.listen(3000, function(){ 
	console.log('The YelpCamp server is activated at PORT 3000.');
});
