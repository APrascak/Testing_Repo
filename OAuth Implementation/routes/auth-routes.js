const router = require('express').Router();
const passport = require('passport');

// Auth login page.
router.get('/login', (req, res) => {
  res.render('login', {user: req.user });
});

// Auth logout, redirects to homepage afterwards.
router.get('/logout', (req, res) => {
  // Handle this with Passport.js
  req.logout();
  res.redirect('/');
});

// Authorization through Google with Passport.
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// Call back from Google that redirects to profile page.
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile/');
});

module.exports = router;
