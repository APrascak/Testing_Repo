const express = require('express');
const authRoutes = require('./routes/auth-routes.js');
const profileRoutes = require('./routes/profile-routes.js');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// Sets view engine to ejs.
app.set('view engine','ejs');

// Cookie session.
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookieKey]
}));

// Initialize passportJS.
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB.
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('Connected to mongodb');
});

// Setup routes for auth and profile.
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Create home route.
app.get('/', (req, res) => {
  res.render('home', {user: req.user});
});

// Setup server to listen on port 3000.
app.listen(3000, () => {
  console.log('app now listening for requests on port 3000');
});
