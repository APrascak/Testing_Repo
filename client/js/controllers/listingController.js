angular.module('listings').controller('ListingsController', ['$scope', '$window','Listings', 
  function($scope, $window, Listings) {
    $scope.detailedInfo = undefined;
	
	$scope.errors = [];
	
	$scope.existingProfile = undefined;
	
	$scope.newProfile = undefined;
	
	$scope.comm = [];
	
	$scope.time = [];
	
	$scope.userProfile= undefined;
	
	$scope.changedProfile = undefined;
	
    $scope.ratings = [{
        current: 3,
        max: 5
    }];
	
	$scope.rating = {
		username: String,
		rating: Number
	};
	
	
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
		  $window.location.href = '/dashboard';
		}, function(error) {
		  
		  $scope.errors.push("Email or username is already in use.");
		});

    };

	$scope.googleRegister = function() {
		$scope.errors = [];
		
		if(!$scope.newProfile){
			$scope.errors.push("Please fill out the form below.");
		}else{
			if(!$scope.newProfile.username)
				$scope.errors.push("Please enter a username.");
			
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
    Listings.google($scope.newProfile).then(function(response) {
	  $window.location.href = '/dashboard';
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
	
    Listings.login($scope.existingProfile).then(function(response) {
	  $window.location.href = '/dashboard';
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
			
		Listings.update($scope.userProfile).then(function(response) {
			if($scope.userProfile.usertype.mentee){
				Listings.algorithm().then(function(response) {
				  console.log("Updated matches.");
				  $window.location.href = '/profile';
				}, function(error) {
				  	$scope.errors.push("Error with algorithm.");
				});
			}else{
				$window.location.href = '/profile';
			}
			}, function(error) {
				$scope.errors.push("There was an error updating your profile.");
			  //console.log('Unable to update listings:', error);
			  
			});

    };
	
	$scope.profileLoad = function() {
		Listings.profile().then(function(response) {
			$scope.userProfile = response.data;
			$scope.comm = $scope.userProfile.communication;
			$scope.time = $scope.userProfile.hours;
			$scope.rating.username = $scope.userProfile.username;
			$scope.ratings.current = $scope.userProfile.curr_rating;
			console.log("rating " + $scope.userProfile.curr_rating);
		}, function(error) {
			$scope.errors.push("There was an error loading your profile.");
		});

    };
	
	$scope.getSignUp = function(){
		$window.location.href = '/signup';
	};
	
	$scope.checkGoogle = function(){
		Listings.profile().then(function(response) {
			$scope.userProfile = response.data;
			if($scope.userProfile.username){
				$window.location.href = '/dashboard';
			}
		}, function(error) {
			$scope.errors.push("There was an error updating your profile.");
		});
	};
		
	$scope.getSelectedRating = function (newRating) {
		$scope.rating.rating = newRating;
		$scope.rating.username = "Trying";
		console.log($scope.rating);
		Listings.rating($scope.rating).then(function(response) {
			console.log(response);
		}, function(error) {
			$scope.errors.push("There was an error saving your rating.");
		});
	};
	
	$scope.viewOtherUser = function(){
		Listings.viewProfile("test3").then(function(response) {
			console.log(response);
		}, function(error) {
			$scope.errors.push("There was an error get mentor/mentee.");
		});
	}
	  
  }
]);


angular.module('listings').directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});