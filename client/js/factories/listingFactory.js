angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    algorithm: function() {
      return $http.get('http://localhost:8080/api/listings/algorithm');
    },
	algorithm: function() {
      return $http.get('http://localhost:8080/logout');
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
	}

  };
  return methods;

});

/*angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('https://apple-shortcake-58416.herokuapp.com/api/listings');
    },
	
	update: function(user) {
	  return $http.post('https://apple-shortcake-58416.herokuapp.com/api/listings', user);
    }, 
	
	signUp: function(user) {
	  return $http.post('https://apple-shortcake-58416.herokuapp.com/signup', user);
    }, 

	login: function(user) {
	  return $http.post('https://apple-shortcake-58416.herokuapp.com//login', user);
    },
	profile: function(){
		return $http.get('https://apple-shortcake-58416.herokuapp.com/api/listings');
	}
  };

  return methods;
});*/
