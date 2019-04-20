var mongoose = require('mongoose'), 
    User = require('../models/users.server.model.js'),
	bcrypt = require('bcrypt-nodejs');

exports.update = function(req, res) {
	
	var existingUser = new User(req.body);

	User.findOneAndUpdate({_id : req.session.passport.user }, {$set:{usertype: existingUser.usertype, available: existingUser.available, mentor_topic: existingUser.mentor_topic, 
	mentee_topic: existingUser.mentee_topic, topic_level: existingUser.topic_level, hours: existingUser.hours, city: existingUser.city, communication: existingUser.communication, 
	add_info: existingUser.add_info}}, {new: true}, function(err,updated){
		if (err)
			res.status(400).send(err);
	   res.send();
	});
};

exports.profile = function(req,res){
	User.findOne({_id : req.session.passport.user }, { id: 0, local: 0, google:0 }, function(err,info){
		if (err)
		res.status(400).send(err);
		info._id = null;
	   res.json(info);
	});
	
};

exports.algorithm = function(req, res){
	console.log(">>>>>>>>>>>>got here");
  //variables
  var mentee;
  var users = [];
  var mentor;
  //var matchingMentorid;

  var isMatch = true;


  //get mentee
  Listing.findOne({_id : req.session.passport.user, "usertype.mentee" : true }, function(err, mentee) {
    if (err){
      res.status(400).send(err);
    };
	
  console.log("Mentee \n" + mentee);
	
	  //get ALL users
	Listing.find({"usertype.mentor": true, _id : { $ne: mentee._id}}, function(err, mentors) {
    if (err){
      res.status(400).send(err);
    };
    //users = listings;
	console.log("Mentors \n" + mentors);
	
	//loop through users and find where usertype.mentor = true
  //also check to make sure it isn't our current mentee
  for(var userCount = 0; userCount < mentors.length; userCount++){
    //console.log("inside forloop");
    var user = mentors[userCount];
    //console.log("Mentors: \n" + user);
    
        var menteeTopic = mentee.mentee_topic;
        var mentorTopic = user.mentor_topic;
        if(menteeTopic.localeCompare(mentorTopic) != 0){
          isMatch = false;
        } else{
          //console.log("mentee and mentor topics match\n");
          isMatch = true;
          //put mentee hours in my variable so i can check its length
          var menteeHours = [];
          menteeHours = mentee.hours;
  
          var mentorHours = [];
          mentorHours = user.hours;
  
          var matchingHours = [];
          var falseCount = 0;
          var count = 0;
  
          //check for matching hours
          for(var i = 0; i < mentorHours.length; i++){
            for(var j = 0; j < menteeHours.length; j++){
              //var torHours = mentorHours[i];
              //var teeHours = menteeHours[j];
              //console.log("MentorHours length is: ", mentorHours.length);
              //console.log("MenteeHours length is: ", menteeHours.length);
              //menteeHours[j].localeCompare(mentorHours[i]) == 0
              if((Object.is(menteeHours[j], mentorHours[i])) == true){
                //console.log("mentee hours and mentor horus matched at this point");
                matchingHours[count] = true;
                //console.log("matchingHours now has ", matchingHours[count]);
                count++;
              } else{
                //console.log("no match");
                matchingHours[count] = false;
                count++;
              }
            }
          }
          //console.log("matchingHours: ", matchingHours);
          //count number of false in matchingHours
          //console.log("count number of false in matchingHours");
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
          var menteeComm = mentee.communication;
          var mentorComm = user.communication;

          //check matching communication
          for (var i = 0; i < menteeComm.length; i++) {
            for (var j = 0; j < mentorComm.length; j++) {
              //var teeComm = menteeComm[j];
              //var torComm = mentorComm[i];
              //(Object.is(menteeComm[j], mentorComm[i])) == true
              if ((Object.is(menteeComm[j], mentorComm[i])) == true) {
                //console.log("mentor and mentee comm matched at this point");
                //update what communications match with mentor and mentee
                //matchingComm[commCount] = true;
                matchingComm++;
                //falseComm++;
              }
            }
          }

          //check if false exists in matchingComm
          if(matchingComm >= 1){
            isMatch = true;
          } else{
            isMatch = false;
          }
        }
    
    //if mentor and mentee matches, update matchSchema
    if(isMatch == true){
    console.log("Got a match!");
    console.log("You", mentee.username, "matched with", user.username);
      var match = new Match();
      match.mentor_id = user._id;
      match.status = "pending"
      match.save(function(err){
        if (err){
          console.log(err);
          throw err;
        }
      });
    }
    
    
  }

	});

  });

};
