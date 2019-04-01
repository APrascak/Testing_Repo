const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys.js');
const User = require('../models/user-model.js');



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
  // Options for the strategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
    // Verify that User does not already exist
    User.findOne({googleID: profile.id}).then((currUser) => {
      if (currUser) {
        // User already exists
        console.log('User is: ' + currUser);
        done(null, currUser);
      } else {
        // If not, place user in database
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
