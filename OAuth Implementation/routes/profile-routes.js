const router = require('express').Router();

// Checks if user is authorized to view profile page.
const authCheck = (req,res,next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

// Go to profile page if user is authenticated.
router.get('/', authCheck, (req,res) => {
  res.render('profile', {user: req.user});
});

module.exports = router;
