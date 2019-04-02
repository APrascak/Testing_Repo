angular.module('listings').controller('ListingsController', ['$scope', '$window','Listings', 
  function($scope, $window, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });
	
	$scope.errors = [];
	
	$scope.userProfile = undefined;
	
	$scope.profileLoad = function() {
		console.log("yah");
		Listings.profile().then(function(response) {
			console.log(response);
			$scope.userProfile = response;
	
		}, function(error) {
		$scope.errors.push("There was an error.");
      //console.log('Unable to update listings:', error);
	  
		});

    };
	
	$scope.$on('$stateChangeSuccess', function () {
    //call it here
			Listings.profile().then(function(response) {
			console.log(response);
			$scope.userProfile = response;
	
		}, function(error) {
		$scope.errors.push("There was an error.");
      //console.log('Unable to update listings:', error);
	  
		});
	
	});
	
  }
]);