(function(){
'use strict';
angular.module('blogYoApp').controller('PostListController',PostListController);

PostListController.$inject = ['PostService'];

function PostListController(PostService){
	var vm = this;
	iniciar();

	//////////////////////

	function iniciar(){
		vm.posts = [];
		PostService.query().then(function(data){
			vm.posts = data;
		});
	}
}
})();
