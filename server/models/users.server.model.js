/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

/* Create your schema */
var userSchema = new Schema({
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
	img: String,
	scrumble_goals: String,
	career_goals: String,
	industry_exp: String,
	strengths: String,
    available: Boolean,
    mentor_topic: String,
	mentee_topic: String,
	topic_level: String,
	year: String,
    city: String,
	age: Number,
	gender: String,
	ethnicity: String,
    hours: [String],
    communication: [String],
	add_info: String,
	ratings: [Number],
	curr_rating: Number
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

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


var User = mongoose.model('User', userSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;
