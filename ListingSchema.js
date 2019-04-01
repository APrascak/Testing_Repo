/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
    /* your code here */
    password: String,
    email: String,
    username: String,
    type: {
        mentee: Boolean,
        mentor: Boolean
    },
    available: Boolean,
    topics: [String],
    city: String,
    hours: [String],
    communication: [String]
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function (next) {
    /* your code here */
    //get current date
    var currentDate = new Date();

    //change the updated_at field to current date
    this.updated_at = currentDate;

    //if create_at doesn't exist
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;