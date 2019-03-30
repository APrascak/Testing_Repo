const router = require('express').Router();
const passport = require('passport');

// Auth login
router.get('/login', (req, res) => {
  res.render('login', {user: req.user });
});

// Auth logout
router.get('/logout', (req, res) => {
  // Handle this with Passport.js
  req.logout();
  res.redirect('/');
});

// Auth with Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// Callback route for Google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile/');
});

module.exports = router;
