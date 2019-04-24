var mongoose = require('mongoose'), 
    User = require('../models/users.server.model.js'),
	Match = require('../models/matching.server.model.js'),
	bcrypt = require('bcrypt-nodejs');

exports.ratings = function(req, res) {
	Match.findOne({$or: [{mentee_name:req.body.username},{mentor_name:req.body.username}], $or: [{mentee_name:req.body.matchname},{mentor_name:req.body.matchname}],
	status: "accepted"}, function(err, match){
		console.log("in ratings");
		if(err){
			console.log(err);
			throw err;
		}
		
		if(!match){
			console.log("No accepted match found");
			res.status(400).send("No accepted match found");
		}else{
			User.findOne({username: req.body.matchname, 'ratings.username': req.body.username},{ratings: 1},function(error,user){
				if(error){
					console.log("Internal error\n" + error);
					throw err;
				}
			
				if(user){
					User.update({_id : user._id}, {$set:{ratings: {username: req.body.username, rating: req.body.rating }}}, {new: true}, function(err,updated){
						if(err){
							console.log(err);
							throw err;
						}
						if(updated){
							User.aggregate([
								{ $match: { _id: user._id }},
								{$unwind: "$ratings"},
								{$group:{ _id: null, avgRating: {$avg: "$ratings.rating"}}}
							], function(err, result){
								if(err){
									console.log("Error\n" + err);
									throw err;
								}
								console.log("Result " + JSON.stringify(result));
								User.update({_id: user._id}, {$set: {curr_rating: result[0].avgRating}}, function(err, upd){
									if(err){
										console.log("Error\n" + err);
										throw err;
									}
									res.send();
								});
							});
						}
					});
				}else{
					User.findOne({username : req.body.matchname}, function(error, user){
						if(user.ratings.length == 0){
							User.update({username : req.body.matchname},{$push: { ratings:  [{username: req.body.username, rating: req.body.rating }]}}, {new:true}, function(err,updated){
								if(err){
									console.log("Error\n" + err);
									throw err;
								}
								if(updated){
									if
									User.aggregate([
										{ $match: {"username" : req.body.matchname }},
										{$unwind: "$ratings"},
										{$group:{ _id: null, avgRating: {$avg: "$ratings.rating"}}}
									], function(err, result){
										if(err){
											console.log("Error\n" + err);
											throw err;
										}
										console.log("Result " + JSON.stringify(result));
										User.update({username : req.body.matchname}, {$set: {curr_rating: result[0].avgRating}}, function(err, upd){
											if(err){
												console.log("Error\n" + err);
												throw err;
											}
											res.send();
										});
									});
								}
								
							});	
						}else{
							User.update({username : req.body.matchname},{$push: { ratings:  {username: req.body.username, rating: req.body.rating }}}, {new:true}, function(err,updated){
								if(err){
									console.log("Error\n" + err);
									throw err;
								}
								if(updated){
									if
									User.aggregate([
										{ $match: {"username" : req.body.matchname }},
										{$unwind: "$ratings"},
										{$group:{ _id: null, avgRating: {$avg: "$ratings.rating"}}}
									], function(err, result){
										if(err){
											console.log("Error\n" + err);
											throw err;
										}
										console.log("Result " + JSON.stringify(result));
										User.update({username : req.body.matchname}, {$set: {curr_rating: result[0].avgRating}}, function(err, upd){
											if(err){
												console.log("Error\n" + err);
												throw err;
											}
											res.send();
										});
									});
								}
								
							});	
						}
					});
				}
			});
		}
		
		
	});
	/*let obj;
	User.find({_id : req.session.passport.user}, {ratings:1}, function(err,ratingslist){
		if (err)
			res.status(400).send(err);
		
		//console.log(ratings[0].ratings);
		let obj = ratingslist[0].ratings.find(o => o.username === req.body.username);
		if(obj){
			ratingslist[0].ratings.find((o, i) => {
				if (o => o.username === req.body.username) {
					ratingslist[0].ratings[i].rating = req.body.rating;
					//console.log(ratingslist[0].ratings[i]);
				}
			});
			
			User.findOneAndUpdate({_id : req.session.passport.user}, {$set:{ratings: ratingslist[0].ratings}}, {new: true}, function(err,updatedRatings){
				console.log( updatedRatings);
			});
		}else{
			User.update({_id : req.session.passport.user},{$push: { ratings: req.body}}, function(err,updatedRatings){
				console.log( updatedRatings);
			});
		}
	});*/
};

exports.update = function(req, res) {
	
	var existingUser = new User(req.body);

	User.findOneAndUpdate({_id : req.session.passport.user }, {$set:{usertype: existingUser.usertype, available: existingUser.available, mentor_topic: existingUser.mentor_topic, 
	mentee_topic: existingUser.mentee_topic, topic_level: existingUser.topic_level, hours: existingUser.hours, city: existingUser.city, communication: existingUser.communication, 
	add_info: existingUser.add_info, scrumble_goals: existingUser.scrumble_goals, career_goals: existingUser.career_goals, industry_exp: existingUser.industry_exp,
	strengths: existingUser.strengths, ethnicity: existingUser.ethnicity, occupation: existingUser.occupation, university: existingUser.university }}, {new: true}, function(err,updated){
		if (err)
			res.status(400).send(err);
	   res.send();
	});
};

exports.google = function(req, res) {
	
	
	User.findOne({username : req.body.username},function(err,user){
		if (err){
			console.log("Error " + err);
			res.status(400).send(err);
		}
		
		if(user){
			console.log("Username already exists");
			res.status(400).send();
		} else{

			User.findOneAndUpdate({_id : req.session.passport.user }, {$set:{username: req.body.username, age: req.body.age, 
			gender: req.body.gender, ethnicity: req.body.ethnicity}}, {new: true}, function(err,updated){
				if (err){
					console.log("Error " + err);
					res.status(400).send(err);
				}
			   res.send();
			});
		}
	
	});
};

exports.profile = function(req,res){
	User.findOne({_id : req.session.passport.user }, { _id: 0, local: 0, google:0 }, function(err,info){
		if (err)
		res.status(400).send(err);
	   res.json(info);
	});
	
};

exports.loadUser = function(req,res){
	User.findOne({username : req.params.username }, { _id: 0, 'local.password': 0, google:0 }, function(err,info){
		if (err)
			res.status(400).send(err);
	   res.json(info);
	});
	
};

exports.mentors = function(req,res){
	Match.find({mentee_id : req.session.passport.user, status: 'new' }, function(err,mentors){
		if (err)
		res.status(400).send(err);
		res.json(mentors);
	});
	
};

exports.mentess = function(req,res){
	Match.find({mentor_id : req.session.passport.user, status : {$ne: 'new' }}, function(err,mentees){
		if (err){
			console.log(err);
		res.status(400).send(err);
		}
		res.json(mentees);
	});
	
};

exports.matches = function(req,res){
	Match.find({mentee_id : req.session.passport.user, status : {$ne: 'new' }}, function(err,matches){
		if (err)
		res.status(400).send(err);
		res.json(matches);
	});
	
};

exports.make = function(req,res){
	//console.log(req.body.id);
	Match.findOneAndUpdate({_id : req.body.id, status: "new"}, {$set: {status: "pending"}},{new: true}, function(err,match){
		if (err){
			console.log(err);
			res.status(400).send(err);
		}
		res.json(match);
	});
	
};

exports.accept = function(req,res){
	//console.log(req.body.id);
	Match.findOneAndUpdate({_id : req.body.id, status: "pending"}, {$set: {status: "accepted"}},{new: true}, function(err,match){
		if (err){
			console.log(err);
			res.status(400).send(err);
		}
		res.json(match);
	});
	
}

exports.reject = function(req,res){
	//console.log(req.body.id);
	Match.findOneAndUpdate({_id : req.body.id, status: "pending"}, {$set: {status: "rejected"}},{new: true}, function(err,match){
		if (err){
			console.log(err);
			res.status(400).send(err);
		}
		res.json(match);
	});
	
}


exports.algorithm = function(req, res){
	console.log(">>>>>>>>>>>>got here");
  //variables
  var mentee;
  var users = [];
  var mentor;
  //var matchingMentorid;

  var isMatch = true;


  //get mentee
  User.findOne({_id : req.session.passport.user, "usertype.mentee" : true }, function(err, mentee) {
    if (err){
      res.status(400).send(err);
    };
	
  //console.log("Mentee \n" + mentee);
	
	  //get ALL users
	User.find({"usertype.mentor": true, _id : { $ne: mentee._id}}, function(err, mentors) {
    if (err){
      res.status(400).send(err);
    };
	//console.log("Mentors \n" + mentors);
	
	Match.find({}, function(err, matching){
    if(err){
      res.status(400).send(err);
    };

    //loop through users and find where usertype.mentor = true
  //also check to make sure it isn't our current mentee
  for(var userCount = 0; userCount < mentors.length; userCount++){
    //console.log("inside forloop");
    var user = mentors[userCount];
    //console.log("Mentors: \n" + user);
    if(user.available == true){
      //console.log("user is available?: ", user.available);
      //console.log("user ", user.username);
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
      }
      else{
        isMatch = false;
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
      var exists = false;
      var matchid;
      for(var i = 0; i < matching.length; i++){
        matchid = matching[i];

        if(matchid.mentor_name == user.username && matchid.mentee_name == mentee.username){
          console.log("match exists");
          exists = true;
        }
      }

      if(exists == false){
        console.log("Got a match!");
        console.log("You", mentee.username, "matched with", user.username);
        var match = new Match();
		match.mentee_name = mentee.username;
		match.mentor_name = user.username;
        match.mentor_id = user._id;
		match.mentee_id = mentee._id;
        match.status = "new";
        match.save(function(err){
          if (err){
            console.log(err);
            throw err;
          }
        });
      }
    
    }
    
    
  }

  });

	});

  });

};