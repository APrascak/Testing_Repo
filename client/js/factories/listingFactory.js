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
<<<<<<< HEAD
	
	profile: function(){
		return $http.get('http://localhost:8080/api/listings');
	},
	
	algorithm: function() {
      return $http.get('http://localhost:8080/api/listings/algorithm');
    }
=======
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
	  return $http.post('https://apple-shortcake-58416.herokuapp.com/login', listing);
    },
	profile: function(){
		return $http.get('https://apple-shortcake-58416.herokuapp.com/api/listings');
	}
>>>>>>> 5a1e3a917a118fd57bc16f765872c3021a7e8472
  };

  return methods;
});