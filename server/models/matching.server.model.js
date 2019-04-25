/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

var matchSchema = new Schema({
	mentee_id: String,
	mentor_id: String,
	mentor_name: String,
	mentee_name: String,
    status: String
});


/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
matchSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});



/* Use your schema to instantiate a Mongoose model */
var Match = mongoose.model('Match', matchSchema);
//var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Match;
