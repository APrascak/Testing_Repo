/*angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/listings');
    },
	
	update: function(listing) {
	  return $http.post('http://localhost:8080/api/listings', listing);
    }, 
	
	signUp: function(user) {
	  return $http.post('http://localhost:8080/signup', user);
    }, 

	login: function(listing) {
	  return $http.post('http://localhost:8080/login', listing);
    },
	profile: function(){
		return $http.get('http://localhost:8080/api/listings');
	}

  };
  return methods;
});*/

angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('https://apple-shortcake-58416.herokuapp.com/api/listings');
    },
	
	update: function(listing) {
	  return $http.post('http://localhost:8080/api/listings', listing);
    }, 
	
	signUp: function(user) {
	  return $http.post('http://localhost:8080/signup', user);
    }, 

	login: function(listing) {
	  return $http.post('https://apple-shortcake-58416.herokuapp.com//login', listing);
    },
	profile: function(){
		return $http.get('https://apple-shortcake-58416.herokuapp.com/api/listings');
	}
  };

  return methods;
});