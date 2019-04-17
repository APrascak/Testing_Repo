
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js'),
	bcrypt = require('bcrypt-nodejs');


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
