(function(){
	"use strict";

	angular
		.module('flickr-api.main')
		.config(config);

	config.$inject = ['$stateProvider','$urlRouterProvider','$urlMatcherFactoryProvider','LightboxProvider'];
	function config($stateProvider,$urlRouterProvider,$urlMatcherFactoryProvider,LightboxProvider){
		$urlRouterProvider.otherwise('/home');
		$urlMatcherFactoryProvider.caseInsensitive(true);

		LightboxProvider.templateUrl = "app/components/main/views/lightbox.html";
		LightboxProvider.getImageUrl = function(image){ return image.url_o; };

		$stateProvider
			.state('main.photo',{
				url:'/home',
				views:{
					'content@':{
						templateUrl:'app/components/main/views/recent-photo.html',
						controller:"RecentPhotoController",
						controllerAs:'rpc'
					}
				}
			})
			.state('main.search',{
				url:'/search/:id',
				views:{
					'content@':{
						templateUrl:'app/components/main/views/search-photo.html',
						controller:"SearchPhotoController",
						controllerAs:'spc'
					}
				}
			});			
	} /* config*/
})();