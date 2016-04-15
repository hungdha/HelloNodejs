var helloApp = angular.module("helloApp", []);
helloApp.controller("ContactController", function( $scope, $http ){	
	$scope.isShow	= false;

	$scope.onChanged = function(){	
		if(this.name == "")	
			$scope.classForName = "has-error";
		else
			$scope.classForName = "";
		console.log(this);
	}
	$scope.submit = function(item, event){
				
		var formData = {
			name: $scope.name, 
			email: $scope.email, 
			phone: $scope.phone,
			address: $scope.address,
			message: $scope.message 
		}
	 	var responsePromise = $http({
			method : "POST",
			url : "/contact",
			data : formData	
		});
		responsePromise.success(function (data, status, headers, config) {			  				
			$scope.isShow = true;	
			if(data.status == 1 ){
				$scope.msgClass = "bg-success";				
				$scope.name = '';
				$scope.email = '';
				$scope.phone = '';
				$scope.address = '';
				$scope.message = '';
			}else if(data.status == 0){
				$scope.msgClass = "bg-danger";	
			}		
			$scope.msgs = data.msgs;
		});
		responsePromise.error(function (data, status, headers, config){			
			alert("AJAX failed!");
		});
	}
});

// contact form directive 
helloApp.directive("my1", function() {
    return {
    	restrict: 'E', // ELement Name
        template : "<h1>This is directive using restrict <b>Element</b></h1>"		
    };
});
helloApp.directive("my2", function() {
    return {
    	restrict: 'A', // Attribute Name
        template : "<h2>This is directive using restrict <b>Attribute</b> </h2>"		
    };
});
helloApp.directive("my3", function() {
    return {
    	restrict: 'C', // Class Name
        template : "<h3>This is directive using restrict <b>Class Name</b> </h3>"		
    };
});

// Directive load template url
helloApp.directive("my4", function(){
	return{
		restrict: 'A', // Attribute Name
		templateUrl: 'social-media.html'
	}
})


