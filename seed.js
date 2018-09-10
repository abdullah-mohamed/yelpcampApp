var mongoose   = require('mongoose'),
	Campground = require('./models/camp'),
	Comment    = require('./models/comment');

var data = [
		{name: "Marsa Matroh", 
		 image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/CreepingPhlox-CentralMA-20140513.jpg/243px-CreepingPhlox-CentralMA-20140513.jpg", 
		 description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
		{name: "Ras Elbar", 
		 image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/CreepingPhlox-CentralMA-20140513.jpg/243px-CreepingPhlox-CentralMA-20140513.jpg", 
		 description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
		{name: "Alex", 
		 image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/CreepingPhlox-CentralMA-20140513.jpg/243px-CreepingPhlox-CentralMA-20140513.jpg", 
		 description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		}
];


function seedDb(){
	// remove all campgrounds from the database
	Comment.remove({}, function(err){
		/*if(err){
			console.log(err);
		}else{
			console.log('deleted all comments!');
			Campground.remove({}, function(err){
			if(err){
				console.log(err);
			}else{
				console.log("removed all campgrounds!");
				data.forEach(function(seed){
					Campground.create(seed, function(err, returnedCamp){
						if(err){
							console.log(err);
						}else{
							console.log("created a camp!");
							Comment.create(
								{
									author: "homer",
									text: "hope there is internet!"
								}, function(err, returnedComment){
									returnedCamp.comments.push(returnedComment);
									returnedCamp.save();
							});
						}
					})
				})
			}
		});
		}*/
	});
}

module.exports = seedDb;