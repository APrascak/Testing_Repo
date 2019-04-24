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

	app.use(morgan('dev'));     // Enable request logging for development debugging
	app.use(cookieParser());    // Need for auth, reading cookies
	app.use(bodyParser.json()); //Body parsing middleware

	// required for passport
	app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions



	app.use('/api/listings/', usersRouter);

	app.use('/', express.static('client'));

	// GET & POST Methods for 'signup'
	app.get('/signup', function(req, res){
		res.redirect('index.html');
	});

	app.post('/signup', passport.authenticate('local-signup'),function(req, res) {
		res.send();
	});

	// GET & POST Methods for 'signup'
	app.get('/login', function(req, res){
		res.redirect('index.html');
	});

	app.post('/login', passport.authenticate('local-login'),function(req, res) {
		res.send();
	});

	// Implementation for Google OAuth
	app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
	app.get('/auth/google/redirect', passport.authenticate('google'), function(req,res){
		res.redirect('/create/');
	});

	app.get('/create', function(req, res) {
		res.redirect('/create.html');
	});

	//Profile Check
	app.get('/dashboard',isLoggedIn, function(req, res) {
		res.redirect('/dashboard.html');
    });

    app.get('/profile',isLoggedIn, function(req, res) {
		res.redirect('/profile.html');
    });
	
    app.get('/mentors',isLoggedIn, function(req, res) {
		res.redirect('/matchresults.html');
    });
	
	app.get('/mentees',isLoggedIn, function(req, res) {
		res.redirect('/requests.html');
    });
	
	app.get('/matches',isLoggedIn, function(req, res) {
		res.redirect('/matches.html');
    });

	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
	
	// view engine setup
	app.set('views', path.join('client/views'));
	app.set('view engine', 'ejs');
	
	var hold;
	app.post('/viewprofile', function(req, res) {
		hold = req.body;
		console.log("set variable");
		res.send();
	});
	
	app.get('/viewprofile', function(req, res) {
		console.log("hopeful\n " + hold.username);
		var displayRating = 5
		if(hold.ratings){
			if(hold.ratings.length > 5)
				displayRating = username.curr_rating;
		}
	  res.render('viewprofile',{
		 username :hold.username,
		 city: hold.city,
		 university: hold.university,
		 rating: displayRating,
		 communication: hold.communication,
		 topic: hold.mentor_topic,
		 scrumble_goals: hold.scrumble_goals,
		 career_goals: hold.career_goals,
		 industry_exp: hold.industry_exp,
		 age: hold.age,
		 ethnicity: hold.ethnicity,
		 topic_level: hold.topic_level,
		 hours: hold.hours,
		 add_info: hold.add_info,
		 strengths: hold.strengths,
		 gender: hold.gender,
		 occupation: hold.occupation,
		 matchStat: hold.status,
		 email: hold.local.email,
	  });
	});

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
    res.redirect('/index.html');
}
