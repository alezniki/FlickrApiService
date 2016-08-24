(function(){
	'use strict';

	angular
		.module('flickr-api.main')
		.factory("FlickrService",FlickrService);

	FlickrService.$inject = ['$http'];
	function FlickrService($http){
		var api = 'https://api.flickr.com/services/rest/?';
		var api_key = 'api_key=5d32484cd85d87c6e477693e3d62885a';
		var per_page = 'per_page=50';
		var extras = 'extras=tags,url_m,url_o';
		var format="format=json";
		var callback = 'nojsoncallback=?';
		
		var service = {
			getPhotos:getPhotos,
			searchPhotos:searchPhotos,
			getComments:getComments,
			getHotList:getHotList
		}

		return service;

		function getPhotos(){
			var method = 'method=flickr.photos.getRecent';
			var url = api+method+'&'+api_key+'&'+per_page+'&'+extras+'&'+format+'&'+callback;

			return $http.get(url).then(function(response){
				return response.data;
			});
		}

		function searchPhotos(search, tagString){
			var method = 'method=flickr.photos.search';
			var text = 'text='+search;
			var tags = 'tags='+tagString;
			var url = api+method+'&'+api_key;
			if(search){ // ako je setovan
				url+='&'+text;
			}
			if(tagString && tagString.length>0){
				url+='&'+tags;
			}
			url+='&'+extras+'&'+format+'&'+callback;

			// if(tagString){
			// 	url = url + '&' + tags;
			// }

			return $http.get(url).then(function(response){
				return response.data;
			});
		}
		
		function getComments(id){
			var method = 'method=flickr.photos.comments.getList';
			var photo_id="photo_id="+id;
			// var photo_id="photo_id=27908598765";
			var url = api+method+'&'+api_key+'&'+photo_id+'&'+format+'&'+callback;

			return $http.get(url).then(function(response){
				return response.data;
			});
		}

		function getHotList(){
			var method = 'method=flickr.tags.getHotList';
			var period = 'period=week';

			var url = api+method+'&'+api_key+'&'+period+'&'+format+'&'+callback;

			return $http.get(url).then(function(response){
				return response.data;
			});

		}
	}; /*FlickrService*/
})();