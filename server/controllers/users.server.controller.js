var mongoose = require('mongoose'), 
    User = require('../models/users.server.model.js'),
	bcrypt = require('bcrypt-nodejs');

exports.update = function(req, res) {
	
	var existingUser = new User(req.body);

	User.findOneAndUpdate({_id : req.session.passport.user }, {$set:{username: existingUser.username, usertype: existingUser.usertype, available: existingUser.available, mentor_topic: existingUser.mentor_topic, 
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