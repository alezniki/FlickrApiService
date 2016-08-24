(function(){
	"use strict";

	angular
		.module('flickr-api.core')
		.config(config);

	config.$inject = ['$stateProvider','$urlRouterProvider','$urlMatcherFactoryProvider'];
	function config($stateProvider,$urlRouterProvider,$urlMatcherFactoryProvider){
		$urlRouterProvider.otherwise('/home');
		$urlMatcherFactoryProvider.caseInsensitive(true);

		$stateProvider
			.state('main',{
				abstract:true,
				views:{
					'header':{
						templateUrl:'app/components/core/header.html'
					}
				}
			});			
	} /* config*/
})();