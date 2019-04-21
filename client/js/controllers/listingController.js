angular.module('listings').controller('ListingsController', ['$scope', '$window','Listings', 
  function($scope, $window, Listings) {
    $scope.detailedInfo = undefined;
	
	$scope.errors = [];
	
	$scope.existingProfile = undefined;
	
	$scope.newProfile = undefined;
	
	$scope.comm = [];
	
	$scope.time = [];
	
	$scope.userProfile= undefined;
	
<<<<<<< HEAD
=======
	$scope.changedProfile = undefined;
	
>>>>>>> 5a1e3a917a118fd57bc16f765872c3021a7e8472
	
	$scope.signUp = function() {
		$scope.errors = [];
		
		if(!$scope.newProfile){
			$scope.errors.push("Please fill out the form below.");
		}else{
			if(!$scope.newProfile.username)
				$scope.errors.push("Please enter a username.");
			
			if(!$scope.newProfile.email)
				$scope.errors.push("Please enter an email.");
			
			if(!angular.equals($scope.newProfile.email,$scope.newProfile.emailCheck))
				$scope.errors.push("The emails you entered are different.");
			
			if(!$scope.newProfile.password)
				$scope.errors.push("Please enter a password.");
			
			if(!angular.equals($scope.newProfile.password,$scope.newProfile.passwordCheck))
				$scope.errors.push("The passwords you entered are different.");
			
			if(!$scope.newProfile.age)
				$scope.errors.push("Please enter your age.");
			
			if(!$scope.newProfile.gender)
				$scope.errors.push("Please enter your gender.");
			
			if(!$scope.newProfile.ethnicity)
				$scope.errors.push("Please enter your Ethinicty/Race.");
				
		}
			
		if($scope.errors.length > 0){
			console.log();
			return;
		}
    Listings.signUp($scope.newProfile).then(function(response) {
	  $window.location.href = '/profile.html';
    }, function(error) {
      
	  $scope.errors.push("Email or username is already in use.");
	  
	  //console.log('Unable to update listings:', error);
    });

    };
	
	
	$scope.login = function() {
		$scope.errors = [];
		
		if(!$scope.existingProfile){
			$scope.errors.push("Please enter an email and password");
		}else{
			if(!$scope.existingProfile.email)
				$scope.errors.push("Please enter an email.");
			
			if(!$scope.existingProfile.password)
				$scope.errors.push("Please enter a password.");
		}
			
		if($scope.errors.length > 0){
			return;
		}
	
<<<<<<< HEAD
    Listings.login($scope.newListing).then(function(response) {
=======
    Listings.login($scope.existingProfile).then(function(response) {
>>>>>>> 5a1e3a917a118fd57bc16f765872c3021a7e8472
	  $window.location.href = '/profile.html';
	  console.log(response);
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
	
	$scope.profileUpdate = function() {
		//need to add validation
		$scope.errors = [];
		if(!$scope.userProfile){
			$scope.errors.push("Please fill out the required information.");
		}
		
		if(!$scope.userProfile.usertype.mentor)
			$scope.userProfile.usertype.mentor = false;
		
		if(!$scope.userProfile.usertype.mentee)
			$scope.userProfile.usertype.mentee = false;

		$scope.userProfile.communication = $scope.comm;
		
		$scope.userProfile.hours = $scope.time;
		
		
		console.log($scope.userProfile);
			
		Listings.update($scope.userProfile).then(function(response) {
			console.log(response);
		$window.location.href = '/profile.html';
    }, function(error) {
		$scope.errors.push("There was an error updating your profile.");
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
	
<<<<<<< HEAD
	
	$scope.checkMatches = function(e) {
		Listings.algorithm().then(function(response) {
			console.log(response);
		}, function(error) {
      //console.log('Unable to update listings:', error);
	  
    });
    };
	
	
=======
	$scope.getSignUp = function(){
		$window.location.href = '/signup.html';
	};
>>>>>>> 5a1e3a917a118fd57bc16f765872c3021a7e8472
  }
]);