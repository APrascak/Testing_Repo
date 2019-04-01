angular.module('listings').controller('ListingsController', ['$scope', '$window','Listings', 
  function($scope, $window, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;
	
	$scope.errors = [];

	$scope.signUp = function() {
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
	
    Listings.signUp($scope.newListing).then(function(response) {
	  //$window.location.href = '/index.html';
	  console.log(response);
    }, function(error) {
      console.log('Unable to update listings:', error);
    });

    };
	
	$scope.login = function() {
		$scope.errors = [];
		
		if(!$scope.newListing){
			$scope.errors.push("Please enter an email and password");
		}else{
			if(!$scope.newListing.email)
				$scope.errors.push("Please enter an email.");
			
			if(!$scope.newListing.password)
				$scope.errors.push("Please enter a password.");
		}
			
		if($scope.errors.length > 0){
			return;
		}
	
    Listings.login($scope.newListing).then(function(response) {
	  $window.location.href = '/profile.html';
    }, function(error) {
		$scope.errors.push("Username or password is wrong.");
      //console.log('Unable to update listings:', error);
	  
    });

    };
	
	$scope.profile
	
    $scope.addListing = function() {
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
	
    Listings.create($scope.newListing).then(function(response) {
	  $window.location.href = '/index.html';
    }, function(error) {
		//change this so that it shows error message
      console.log('Password or email is incorrect', error);
    });

    };

    $scope.deleteListing = function(id) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */	   
	   Listings.delete(id).then(function(response) {
      $window.location.href = '/index.html';
    }, function(error) {
      console.log('Unable to delete listings:', error);
    });
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);