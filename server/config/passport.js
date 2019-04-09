// config/passport.js
var passport = require('passport');
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./config');

// load up the user model
var User = require('../models/listings.server.model.js');
// expose this function to our app using module.exports
module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

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
				console.log("User exits " + err);
                return done(null, false );
            } else {

                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);

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

        });

    }));

	// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

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
    passport.use(new GoogleStrategy({
      callbackURL: '/auth/google/redirect',
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret
    }, function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOne({googleID: profile.id}).then((currUser) => {
        if (currUser) {
          console.log('User Information: ' + currUser);
          done(null, currUser);
        } else {
          new User({
              gmail: {
                id: profile.displayName
              }
          }).save().then(function(newUser){
            console.log('New User has been created: ' + newUser);
          });
        }
      });
    }));

};
