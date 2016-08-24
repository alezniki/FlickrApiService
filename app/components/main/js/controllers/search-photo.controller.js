(function(){
	'use strict';

	angular
		.module('flickr-api.main')
		.controller("SearchPhotoController", SearchPhotoController);

	SearchPhotoController.$inject = ['FlickrService','Lightbox'];
	function SearchPhotoController(FlickrService, Lightbox){
		var spc = this;
		spc.Lightbox = Lightbox;


		spc.tags = []; 
		spc.checkedTags = []; // po defaultu prazan jer nijedan checkbox nije cekiran

		FlickrService.getHotList().then(function(response){
			spc.tags = response.hottags.tag;
			
			spc.tags.forEach(function(obj){
					// console.log(obj);
					obj.checked = false; // checked property
				});
		});


		spc.searchByText = function(){
			var tagString = spc.getTagString();

			FlickrService.searchPhotos(spc.textSearch, tagString).then(function(response){
				spc.photos = response.photos.photo;
			});
		}; 

		spc.getTagString = function(){
			var tagString = '';

	  		spc.checkedTags.forEach(function(singleTag){
	  			tagString += singleTag + ','; // url network iz niza u string
	  		});
	  		tagString = tagString.slice(0, -1);

	  		if(spc.tagSearch){
	  			tagString += ',' + spc.tagSearch;
	  		}

	  		return tagString;
		};

		spc.searchByTag = function(){
			var tagString = '';

	  		spc.checkedTags.forEach(function(singleTag){
	  			tagString += singleTag + ',';
	  		});
	  		
	  		tagString = tagString.slice(0, -1);
	  		tagString += ',' + spc.tagSearch;

	  		FlickrService.searchPhotos(spc.textSearch, tagString).then(function(response){
				spc.photos = response.photos.photo;
			});
		}; 


	  // spc.isChecked = false; // inicijalno nije cekiran

	  spc.searchByCheckedTag = function(tag,index){
	  		console.log(spc.tags[index].checked, tag);
	  		if(spc.tags[index].checked === true){
	  			spc.checkedTags.push(tag); // true
	  		}else{
	  			var ind = spc.checkedTags.indexOf(tag);
	  			if (ind > -1) {
 				   spc.checkedTags.splice(ind, 1); // false
				}
	  		}

	  		var tagString = spc.getTagString();
	  		FlickrService.searchPhotos(spc.textSearch, tagString).then(function(response){
				if(typeof(response.photos) !== 'undefined'){
					spc.photos = response.photos.photo;
				}
			});
 		}

 		spc.openLightboxModal = function (id,index) {
			console.log(spc.photos[index]);
			Lightbox.tags = spc.photos[index].tags;

		  	FlickrService.getComments(id).then(function(response){
				Lightbox.openModal(spc.photos, index);
				var str = "";

				if(typeof(response.comments.comment) != "undefined"){
					response.comments.comment.forEach(function(obj){
						// console.log(obj);
						str += obj._content;
					});
				}else{
					str = "No comments for this photo yet";
				}
				
				Lightbox.comments = str;
			}); /* getComments */

	  }; /* openLightboxModal */

	} /* SearchPhotoController */
})();