(function(){
'use strict';

function PostDetailController($state,$stateParams,$window,MyModalFactory,PostService,AuthFactory){

	var vm = this;
	vm.post = PostService.get({id: $stateParams.id});

	function deletar(){

		MyModalFactory.show().result.then(function () {
			PostService.remove({ id: vm.post.id });
			$state.go('home');
		});
	}

	function isEditable(){
		return AuthFactory.isLogged() &&	(vm.post.usuario === AuthFactory.getUser().login);
	}

	vm.deletar = deletar;
	vm.isEditable = isEditable;
}

PostDetailController.$inject = ['$state','$stateParams','$window','MyModalFactory','PostService','AuthFactory'];

angular.module('blogYoApp').controller('PostDetailController',PostDetailController);
})();
