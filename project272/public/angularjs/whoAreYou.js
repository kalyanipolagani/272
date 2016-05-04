//loading the 'login' angularJS module
var whoAreYou = angular.module('whoAreYou', []);
//defining the login controller
whoAreYou.controller('whoAreYou', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	$scope.voterPanel=true;
	//$scope.patient="abc";
	$scope.selectChoice=function(){
		//$scope.abc="abhi";
		$scope.abc="abhi";
		//$scope.choice="abhi";
	}
	
})
