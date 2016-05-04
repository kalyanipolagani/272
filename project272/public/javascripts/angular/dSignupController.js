var app =  angular.module('signUpApp',[]);
app.controller('dSignupController',function($scope,$http, $window){
	$scope.invalid_signup = true;
	$scope.email_exist = true;
	$scope.checked= false;
    $scope.signUp = function (){
        $http({
            method : "POST",
            data :{
				"ssn" : $scope.ssn,
                "firstName" : $scope.firstName,
                "lastName" : $scope.lastName,
                "email" : $scope.email,
                "password" : $scope.password,
                "license": $scope.license,
                "address" : $scope.address,
                "city" : $scope.city,
                "state" : $scope.state,
                "zipcode": $scope.zipcode,
                "phone" : $scope.phone,
                "truckRegister" : $scope.truckRegister
            },
            url : '/signUpAsDrivers'
        }).success(function (data) {
        	console.log("Inside success of signup controller");
        	if (data.signUp == "Fail") {
				console.log("Not signed up successfully");
				$scope.invalid_signup = true;
				$scope.checked= true;
				$scope.email_exist = true;
                //window.location.assign("/firstPage");
            }else if(data.signUp == "Email already exist"){
            	$scope.email_exist = false;
            	$scope.invalid_signup = true;
				$scope.checked=false;
            } 
        	else {
        		$scope.invalid_signup = false;
				$scope.checked=true;
				$scope.email_exist = true;
                //window.location.assign("/logInAsDrivers");
            }
        }).error(function(error) {
			$scope.unexpected_error = false;
			//$scope.invalid_login = true;
		});
    };
});
