var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    usersRouter = require('../routes/users.server.routes'),
	passport = require('passport'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	LocalStrategy = require('passport-local').Strategy,
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	passport = require('passport'),
	session = require('express-session');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);
  

  //initialize app
  var app = express();

require('./passport')(passport);
  //enable request logging for development debugging
  app.use(morgan('dev'));
  
  app.use(cookieParser()); // read cookies (needed for auth)

  //body parsing middleware 
  app.use(bodyParser.json());

	// required for passport
	app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions

  /**TODO
  Serve static files */
	
	app.use('/api/listings/', usersRouter); 
	
	app.use('/', express.static('client'));
	
	app.get('/create', function(req, res){
		res.redirect('index.html');
	});

	app.get('/signup', function(req, res){
		res.redirect('index.html');
	});
	
	app.post('/signup', passport.authenticate('local-signup'),function(req, res) {
		res.send();
	});

	app.get('/login', function(req, res){
		res.redirect('index.html');
	});
	
	app.post('/login', passport.authenticate('local-login'),function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
	//If it doesn't the listingController will display error
    res.send();
  });
	
	 // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile',isLoggedIn, function(req, res) {
        /*res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });*/
		res.redirect('/profile.html');
    });
	
  /**TODO 
  Go to homepage for all routes not specified */ 
  	app.all('/*', function(req, res){
		res.redirect('/index.html');
	});
  return app;
};  

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}