/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

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
  local: {
		email: String,
		password: String
	},
	gmail: {
		id: String
	},
	username: String,
	usertype: {
        mentee: Boolean,
        mentor: Boolean
    },
    available: Boolean,
    mentor_topic: String,
	mentee_topic: String,
	topic_level: String,
	year: String,
    city: String,
    hours: [String],
    communication: [String],
	add_info: String
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

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', userSchema);
//var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;
