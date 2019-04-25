angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    algorithm: function() {
      return $http.get('https://apple-shortcake-58416.herokuapp.com/api/listings/algorithm');
    },
	logout: function() {
      return $http.get('https://apple-shortcake-58416.herokuapp.com/logout');
    },
	rating: function(newRating) {
	  return $http.post('https://apple-shortcake-58416.herokuapp.com/api/listings/rating', newRating);
    }, 
	update: function(user) {
	  return $http.post('https://apple-shortcake-58416.herokuapp.com/api/listings', user);
    }, 
	signUp: function(user) {
	  return $http.post('https://apple-shortcake-58416.herokuapp.com/signup', user);
    }, 
	google: function(user) {
	  return $http.post('https://apple-shortcake-58416.herokuapp.com/api/listings/google', user);
    }, 	
	login: function(user) {
	  return $http.post('https://apple-shortcake-58416.herokuapp.com/login', user);
    },
	profile: function(){
		return $http.get('https://apple-shortcake-58416.herokuapp.com/api/listings');
	},
	getProfile: function(name){
		return $http.get('https://apple-shortcake-58416.herokuapp.com/api/listings/'+name);
	},
	viewProfile: function(user){
		return $http.post('https://apple-shortcake-58416.herokuapp.com/viewprofile',user);
	},
	mentors: function(){
		return $http.get('https://apple-shortcake-58416.herokuapp.com/api/listings/mentors');
	},
	mentees: function(){
		return $http.get('https://apple-shortcake-58416.herokuapp.com/api/listings/mentees');
	},
	matches: function(){
		return $http.get('https://apple-shortcake-58416.herokuapp.com/api/listings/matches');
	},
	makeRequest: function(id){
		return $http.post('https://apple-shortcake-58416.herokuapp.com/api/listings/make',id);
	},
	acceptRequest: function(id){
		return $http.post('https://apple-shortcake-58416.herokuapp.com/api/listings/accept',id);
	},
	rejectRequest: function(id){
		return $http.post('https://apple-shortcake-58416.herokuapp.com/api/listings/reject',id);
	}
  };
  return methods;

});