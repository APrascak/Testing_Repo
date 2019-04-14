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
	
	$scope.newProfile = undefined;
	
	$scope.comm = [];
	
	$scope.time = [];
	
	$scope.userProfile= undefined;
	
	$scope.changedProfile = undefined;
	
	
	$scope.signUp = function() {
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
    Listings.signUp($scope.newListing).then(function(response) {
	  $window.location.href = '/create.html';
	  //console.log(response);
    }, function(error) {
      
	  $scope.errors.push("Email is already in use.");
	  
	  //console.log('Unable to update listings:', error);
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
	  console.log(respose);
	  return response;
    }, function(error) {
		$scope.errors.push("Email or password is wrong.");
      //console.log('Unable to update listings:', error);
	  
    });

    };
	
	$scope.addComm = function(e) {
		if(!$scope.comm){
			$scope.comm.push(e);
			return;
		}
		
		if($scope.comm.indexOf(e) == -1)
			$scope.comm.push(e);
		else
			$scope.comm.splice($scope.comm.indexOf(e),1);
	};
	
	$scope.addTime = function(e) {
		if(!$scope.time){
			$scope.time.push(e);
			return;
		}
		
		if($scope.time.indexOf(e) == -1)
			$scope.time.push(e);
		else
			$scope.time.splice($scope.time.indexOf(e),1);
	};
	
	$scope.profileAdd = function() {
		//need to add validation
		$scope.errors = [];
		if(!$scope.newProfile){
			$scope.errors.push("Please fill out the required information.");
		}
		
		if(!$scope.newProfile.usertype.mentor)
			$scope.newProfile.usertype.mentor = false;
		
		if(!$scope.newProfile.usertype.mentee)
			$scope.newProfile.usertype.mentee = false;

		$scope.newProfile.communication = $scope.comm;
		
		$scope.newProfile.hours = $scope.time;
		
		
		console.log($scope.newProfile);
			
		Listings.create($scope.newProfile).then(function(response) {
			console.log(response);
		$window.location.href = '/profile.html';
    }, function(error) {
		$scope.errors.push("There was an error.");
      //console.log('Unable to update listings:', error);
	  
    });

    };
	
	$scope.profileLoad = function() {
		console.log("called");
		Listings.profile().then(function(response) {
			$scope.userProfile = response.data;
		}, function(error) {
		$scope.errors.push("There was an error loading your profile.");
      //console.log('Unable to update listings:', error);
	  
		});

    };
	
	$scope.profileUpdate = function(){
		console.log($scope.userProfile);
	}
	
  }
]);