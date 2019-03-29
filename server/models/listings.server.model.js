/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
  name: {
    type: String, 
    required: true
  }, 
  code: {
    type: String, 
    required: true, 
    unique: true
  }, 
  address: String, 
  coordinates: {
    latitude: Number, 
    longitude: Number
  },
  created_at: Date,
  updated_at: Date
});

var userSchema = new Schema({
    email:{
		type: String,
		required: true
	},
    username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}/*,
	usertype: {
        mentee: Boolean,
        mentor: Boolean
    },
    available: Boolean,
    topics: [String],
    city: String,
    hours: [String],
    communication: [String]*/ 
});


/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
userSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', userSchema);
//var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;
