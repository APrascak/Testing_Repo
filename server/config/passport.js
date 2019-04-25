// config/passport.js
var passport = require('passport');
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User = require('../models/users.server.model.js');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./config');


module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err){
				console.log("Error " + err);
                return done(err);
			}

            // check to see if theres already a user with that email
            if (user) {
				console.log("User email taken: " + user);
                return done(null, false );
            } else {

				 User.findOne({ 'username' :  req.body.username }, function(error, username) {

					if (error){
						console.log("Error " + error);
						return done(error);
					}

					if(username){
						console.log("Username taken: " + req.username);
						return done(null, false );
					}else{

						// if there is no user with that email
						// create the user
						var newUser = new User();

						// set the user's local credentials
						newUser.local.email = req.body.email;
						newUser.local.password = newUser.generateHash(password);
						newUser.gender = req.body.gender;
						newUser.ethnicity = req.body.ethnicity;
						newUser.available = false;
						newUser.username = req.body.username;
						newUser.age = req.body.age;

						// save the user
						newUser.save(function(err) {
							if (err){
								console.log(err);
								throw err;
							}
							return done(null, newUser);
						});
					}
				});
            }

        });

        });

    }));

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err){
				console.log(err);
                return done(err);
			}

            // if no user is found, return the message
            if (!user){
				console.log("No user.");
                return done(null, false); // req.flash is the way to set flashdata using connect-flash
			}

            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
				console.log("wrong password");
                return done(null, false) // create the loginMessage and save it to session as flashdata
			}

            // all is well, return successful user
			console.log("succesful login");
            return done(null, user);
        });

    }));

	// Passport Implementation for Google Login
    passport.use('google', new GoogleStrategy({
      callbackURL: '/auth/google/redirect',
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret
    }, function(accessToken, refreshToken, profile, done) {
      User.findOne({gmail: {id: profile.id}}).then((currUser) => {
        //console.log(profile);
        if (currUser) {
          console.log('Current user');
          done(null, currUser);
        } else {
          new User({
              gmail: {
                id: profile.id
              }
          }).save().then(function(newUser){
            console.log('New User has been created');
          });
        }
      });
    }));


};
