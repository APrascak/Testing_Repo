
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js'),
	bcrypt = require('bcrypt-nodejs'),
	Match = require('../models/matching.server.model.js');
	

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */
/*==================ALGORITHM================
exports.algorithm = function(req,res){

get mentee with -> req.session.passport.user
findOne to get mentee (see profile fucntion)

//find to get all mentees

loop through mentors check where usertype.mentor = true

comapre it if match

MatchSchema{
	mentee_id = req.session.passport.user
	mentor = get from query
	status = pending
}

var match = new Match();
match (set values)
match.save
};

===============================================*/

//do i need to implement a callback?? maybe 
//clalback
//getMentors(complete);

/* Matching Algorithm */

//variables
var mentee;
var users = [];
var mentor;
//var matchingMentorid;

var isMatch = true;

    
//begin matching algorithm after setting variables
console.log("beginning algorithm");

//doFirst(thenThis);




//do this first
//sets variables
//var app = express();


exports.algorithm = function doFirst(req, res, callback){
  console.log("inside function"); 

  
    //console.log("inside if statement");
    //get mentee
    Listing.findOne({_id : req.session.passport.user }, function first(err, listings) {
      if (err){
        res.status(400).send(err);
      };
      console.log("found mentee");
      mentee = listings;
      //callback();
      //response();
      //next(); 
      //callback();
      //callback1();

    });
    //callback();
    Listing.find({_id : req.session.passport.user }, function second(err, listings) {
      if (err){
        res.status(400).send(err);
      };
      
      console.log("found users");
      users = listings;

      //exports.algorithm.foo();
      //callback();
      //then();
      //callback();

    });

  
  callback();
  
  //console.log("Outside of the if statement");
};

function thisAlg(){

  doFirst(function() {
    console.log('done finding mentee and users');
  });
    //loop through users and find where usertype.mentor = true
  //also check to make sure it isn't our current mentee
  for(var userCount = 0; userCount < users.length; userCount++){
    console.log("inside for loop");
    var user = users[userCount];
    //check if user is mentor
    if(user.usertype.mentor == true){
      mentor = users[userCount];
      //check and see if mentor is available && not the mentee
      if(mentor.available == true && user._id != mentee._id){
          
        /* Begin Matching! */
        //check if mentee and mentor topics match
        if(mentee.mentee_topic != mentor.mentor_topic){
          isMatch = false;
        } else{
          isMatch = true;
          //put mentee hours in my variable so i can check its length
          var menteeHours = [];
          menteeHours = mentee.hours;
  
          var mentorHours = [];
          mentorHours = mentor.hours;
  
          var matchingHours = [];
          var falseCount = 0;
  
          //check for matching hours
          for(var i = 0; i < mentorHours.length; i++){
            for(var j = 0; i < menteeHours.length; j++){
              if(mentorHours[i] == menteeHours[j]){
                matchingHours[i] = true;
              } else{
                matchingHours[i] = false;
              }
            }
          }
  
          //count number of false in matchingHours
          for(var i = 0; i < matchingHours.length; i++){
            if(matchingHours[i] != true){
              falseCount++;
            }
          }
  
          //if all the matchingHours is false, then none of the times matched
          if(falseCount == matchingHours.length){
            isMatch = false;
          } else{
            isMatch = true;
          }
        }
  
        //check if match is still true then check for communication
        if(isMatch != false){
          
          var matchingComm = 0;;
          var falseComm = 0;

          //check matching communication
          for (var i = 0; i < menteeComm.length; i++) {
            for (var j = 0; j < mentorComm.length; j++) {
              if (menteeComm[j] != mentorComm[i]) {
                //update what communications match with mentor and mentee
                //matchingComm[commCount] = true;
                matchingComm++;
                falseComm++;
              } else{
                matchingComm++;
              }
            }
          }

          //check if false exists in matchingComm
          if(falseComm == matchingComm){
            isMatch = false;
          } else{
            isMatch = true;
          }
        }
      }
    }
    
    //if mentor and mentee matches, update matchSchema
    if(match == true){
      var match = new Match();
      match.mentor_id = mentor._id;
      match.status = "pending"
      match.save;
    }
    
    console.log("you matched with this mentor", mentor.username);
    
  };
};

thisAlg();

/* Create a listing */
exports.create = function(req, res) {
	
  /* Instantiate a Listing */
	var listing = new Listing(req.body);
	console.log(req.body);
	//add user name check
	Listing.findOneAndUpdate({_id : req.session.passport.user }, {$set:{username: listing.username, availaeble: true, mentor_topic: listing.mentor_topic, 
	mentee_topic: listing.mentee_topic, topic_level: listing.topic_level, hours: listing.hours, city: listing.city, communication: listing.communication, 
	add_info: listing.add_info}}, {new: true}, function(err,updated){
		if (err)
			res.status(400).send(err);
	   res.send();
	});
};

exports.profile = function(req,res){
	Listing.findOne({_id : req.session.passport.user }, { id: 0, local: 0, google:0 }, function(err,updated){
		if (err)
		res.status(400).send(err);
		console.log(updated);
	   res.json(updated);
	});
	
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.body;
  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
  var id = req.params.listingId;
	Listing.findOneAndUpdate({_id : id}, {$set:{code: listing.code, name: listing.name, latitude: listing.latitude, 
	longitude: listing.longitude, address: listing.address}}, {new: true}, function(err,updated){
		if (err)
			res.status(400).send(err);
	   res.json(updated);
	});
};

/* Delete a listing */
exports.delete = function(req, res) {
  var id = req.params.listingId;
  /** TODO **/
  /* Remove the article */
   Listing.deleteOne({_id: id}, function(err,listing){
	   if (err)
			res.status(400).send(err);
	   res.json(listing);
   });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */
   Listing.find({}, function(err,listing){
    if (err) throw err;
    res.json(listing);
   }).sort( { code: 1 } );

};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};
