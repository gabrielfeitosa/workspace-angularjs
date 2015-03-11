(function(){
'use strict';

function PostListController(PostService){
	var vm = this;
	vm.posts = {};
	vm.posts = PostService.query();
}
PostListController.$inject = ['PostService'];

angular.module('blogYoApp').controller('PostListController',PostListController)
})();
