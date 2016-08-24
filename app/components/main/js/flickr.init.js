(function(){
	"use strict";
	
	angular
		.module('flickr-api.main')
		.run(init);
		
	init.$inject = ['$rootScope'];
	function init($rootScope){
		$rootScope.$on("$stateChangeError",errorFunction);
		
		function errorFunction(event, toState, toParams, fromState, fromParams, error){
			console.log(error);
		}
	}
})();