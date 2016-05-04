var app =  angular.module('dHomeApp',[]);
app.controller('dHomeController',function($scope, $http){
	$scope.isDisabled = false;
	$scope.isHide = false;
	$scope.admin_check = true;
	$scope.init = function() {
		console.log("Inside init");
		//$scope.fetchDriverMapDetails();
		$scope.fetchDriverStatus();
	};
	$scope.fetchDriverStatus = function() {
		console.log("Inside fetchDriverDetails");
		$http({
	        method : "GET",
	        url : "/driverStatus"  
	    }).success(function(data){
	    	console.log("Inside Success"+JSON.stringify(data));
	    	if(data.delivered == "Success"){
	    		if(data.status == 'Inactive'){
	    			$scope.admin_check = false;
	    		}else{
	    			$scope.admin_check = true;
	    			if(data.available == 'Yes'){
		    			$scope.isHide = true;
		    		}
		    		else{
		    			fetchDriverMapDetails();
		    		}
	    		}
	    	}
	    });
	};
	$scope.fetchDriverMapDetails = function() {
		console.log("Inside fetchDriverMapDetails");
		$http({
	        method : "GET",
	        url : "/fetchDriverMapDetails"  
	    }).success(function(data){
	    	console.log("Inside Success"+JSON.stringify(data));
	    	if(data.delivered == "Success"){
    			initiate(data.name, data.address, data.truckReg, data.product, data.price);
	    	}
	    });
	};
	$scope.delivered = function() {
		$scope.isDisabled = true;
		$scope.isHide = true;
		console.log("Inside delivered");
		$http({
	        method : "GET",
	        url : "/driverDelivered"  
	    }).success(function(data){
	    	console.log("Inside Success");
	    	if(data.delivered == "Success"){
	    		 console.log("cool");
	    	}
	    });
	}; 
});
