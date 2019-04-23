angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    algorithm: function() {
      return $http.get('http://localhost:8080/api/listings/algorithm');
    },
	logout: function() {
      return $http.get('http://localhost:8080/logout');
    },
	rating: function(newRating) {
	  return $http.post('http://localhost:8080/api/listings/rating', newRating);
    }, 
	update: function(user) {
	  return $http.post('http://localhost:8080/api/listings', user);
    }, 
	signUp: function(user) {
	  return $http.post('http://localhost:8080/signup', user);
    }, 
	google: function(user) {
	  return $http.post('http://localhost:8080/api/listings/google', user);
    }, 	
	login: function(user) {
	  return $http.post('http://localhost:8080/login', user);
    },
	profile: function(){
		return $http.get('http://localhost:8080/api/listings');
	},
	getProfile: function(name){
		return $http.get('http://localhost:8080/api/listings/'+name);
	},
	viewProfile: function(user){
		return $http.post('http://localhost:8080/viewprofile',user);
	},
	mentors: function(){
		return $http.get('http://localhost:8080/api/listings/mentors');
	},
	mentees: function(){
		return $http.get('http://localhost:8080/api/listings/mentees');
	},
	matches: function(){
		return $http.get('http://localhost:8080/api/listings/matches');
	},
	makeRequest: function(id){
		return $http.post('http://localhost:8080/api/listings/make',id);
	},
	acceptRequest: function(id){
		return $http.post('http://localhost:8080/api/listings/accept',id);
	},
	rejectRequest: function(id){
		return $http.post('http://localhost:8080/api/listings/reject',id);
	}
  };
  return methods;

});

/*
angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    algorithm: function() {
      return $http.get('https://apple-shortcake-58416.herokuapp.com/api/listings/algorithm');
    },
	logout: function() {
      return $http.get(''https://apple-shortcake-58416.herokuapp.com/logout');
    },
	rating: function(newRating) {
	  return $http.post(''https://apple-shortcake-58416.herokuapp.com/api/listings/rating', newRating);
    }, 
	
	update: function(user) {
	  return $http.post(''https://apple-shortcake-58416.herokuapp.com/api/listings', user);
    }, 
	
	signUp: function(user) {
	  return $http.post(''https://apple-shortcake-58416.herokuapp.com/signup', user);
    }, 
	
	google: function(user) {
	  return $http.post(''https://apple-shortcake-58416.herokuapp.com/api/listings/google', user);
    }, 	

	login: function(user) {
	  return $http.post(''https://apple-shortcake-58416.herokuapp.com/login', user);
    },
	profile: function(){
		return $http.get(''https://apple-shortcake-58416.herokuapp.com/api/listings');
	},
	viewProfile: function(name){
		return $http.get('https://apple-shortcake-58416.herokuapp.com/api/listings/'+name);
	}

  };
  return methods;

});

*/
