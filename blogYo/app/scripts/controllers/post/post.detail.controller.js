(function(){
'use strict';

angular.module('blogYoApp').controller('PostDetailController',PostDetailController);

PostDetailController.$inject = ['ModalFactory','PostService','AuthFactory','RouterFactory'];

function PostDetailController(ModalFactory,PostService,AuthFactory,RouterFactory){

	var vm = this;

	vm.deletar = deletar;
	vm.isEditable = isEditable;

	iniciar();

	/////////////////////////////////

	function iniciar(){
		vm.post = {};
		PostService.get(RouterFactory.getParam('id')).then(function(data){
			vm.post = data;
		});
	}

	function deletar(){
		ModalFactory.show().result.then(function () {
			PostService.remove(vm.post.id);
			RouterFactory.go('home');
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
