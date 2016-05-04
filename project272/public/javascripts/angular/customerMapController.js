var app =  angular.module('customerMapApp',[]);
app.controller('customerMapController',function($scope, $http){
	$scope.isHide = false;
    $scope.init = function() {
		console.log("Inside init");
		$scope.fetchCustomerMapDetails();
	};
	$scope.fetchCustomerMapDetails = function() {
		console.log("Inside fetchCustomerMapDetails");
		$http({
	        method : "GET",
	        url : "/fetchCustomerMapDetails"  
	    }).success(function(data){
	    	console.log("Inside Success"+JSON.stringify(data));
	    	if(data.map == "Success"){
	    		if(data.driverIsAvailable == 'Yes'){
	    			$scope.isHide = true;
	    		}
	    		else{
	    			initiate(data.name, data.address, data.truckReg);
	    			setTimeout(function(){
	    				   window.location.reload(1);
	    			}, 30000);
	    		}
	    	}
	    });
	};
});
