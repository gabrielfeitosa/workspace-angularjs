(function(){
'use strict';

angular.module('blogYoApp').controller('PostDetailController',PostDetailController);

PostDetailController.$inject = ['$state','$stateParams','$window','MyModalFactory','PostService','AuthFactory'];
/*jshint latedef: false */
function PostDetailController($state,$stateParams,$window,MyModalFactory,PostService,AuthFactory){

	var vm = this;

	vm.deletar = deletar;
	vm.isEditable = isEditable;

	iniciar();

	/////////////////////////////////

	function iniciar(){
		PostService.get($stateParams.id).then(function(data){
			vm.post = data;
		});
	}

	function deletar(){
		MyModalFactory.show().result.then(function () {
			PostService.remove(vm.post.id);
			$state.go('home');
		});
	}

	function isEditable(){
		if(angular.isUndefined(vm.post)){
			return false;
		}
		return AuthFactory.isLogged() &&	(vm.post.usuario === AuthFactory.getUser().login);
	}
}
})();
