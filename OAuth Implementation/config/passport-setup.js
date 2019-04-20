const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys.js');
const User = require('../models/user-model.js');

// User serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// User deserialization
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


// Passport implementation
passport.use(
  new GoogleStrategy({
  // Parameters for Google Strategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
    // Try to find user in existing DB.
    User.findOne({googleID: profile.id}).then((currUser) => {
      if (currUser) {
        // Log user information if already exists.
        console.log('User is: ' + currUser);
        done(null, currUser);
      } else {
        // When user does not exist, create new user and log information.
        new User({
          username: profile.displayName,
          googleID: profile.id,
          thumbnail: profile._json.picture
        }).save().then((newUser) => {
          console.log('New user has been created:' + newUser);
          done(null, newUser);
        });
      }
    });
  })
)
