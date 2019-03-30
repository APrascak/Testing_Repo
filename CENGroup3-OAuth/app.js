const express = require('express');
const authRoutes = require('./routes/auth-routes.js');
const profileRoutes = require('./routes/profile-routes.js');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// set up view engine
app.set('view engine','ejs');

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookieKey]
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('Connected to mongodb');
});

// Setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Create home route
app.get('/', (req, res) => {
  res.render('home', {user: req.user});
});

app.listen(3000, () => {
  console.log('app now listening for requests on port 3000');
});
