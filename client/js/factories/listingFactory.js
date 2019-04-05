angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/listings');
    },
	
	create: function(listing) {
	  return $http.post('http://localhost:8080/api/listings', listing);
    }, 
	
	signUp: function(listing) {
	  return $http.post('http://localhost:8080/signup', listing);
    }, 

	login: function(listing) {
	  return $http.post('http://localhost:8080/login', listing);
    },
	
	profile: function(){
		return $http.get('http://localhost:8080/api/listings');
	},
	
	algorithm: function() {
      return $http.get('http://localhost:8080/api/listings/algorithm');
    }
  };

  return methods;
});
