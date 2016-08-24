(function(){
	'use strict';

	angular
		.module('flickr-api.main')
		.controller("RecentPhotoController",RecentPhotoController);

	RecentPhotoController.$inject = ['FlickrService','Lightbox'];
	function RecentPhotoController(FlickrService,Lightbox){
		
		var rpc = this;
		rpc.Lightbox = Lightbox;

		FlickrService.getPhotos().then(function(response){
			// console.log(response);
			rpc.photos = response.photos.photo;
		}); /* getPhotos */

	  	rpc.openLightboxModal = function (id,index) {
	  		// console.log(rpc.photos[index]);
	  		Lightbox.tags = rpc.photos[index].tags;

	  		FlickrService.getComments(id).then(function(response){
  				// console.log(response.comments);
  				
				Lightbox.openModal(rpc.photos, index);
				var str = "";

				if(typeof(response.comments.comment) != "undefined"){
					response.comments.comment.forEach(function(obj){
						console.log(obj);
						str += obj._content;
					});
				}else{
					str = "No comments for this photo yet";
				}
				Lightbox.comments = str;
			}); /* getComments */
	  	}; /* openLightboxModal */	
	}; /* RecentPhotoController*/
})();