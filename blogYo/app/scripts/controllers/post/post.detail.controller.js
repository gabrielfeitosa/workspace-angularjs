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
		}, function(err){
			RouterFactory.go('home');
		});
	}

	function deletar(){
		ModalFactory.showConfirmar().then(function () {
			PostService.remove(vm.post.id).then(function(){
				RouterFactory.go('home');
			});
		});
	}

	function isEditable(){
		return AuthFactory.isLogged() &&
			(vm.post.usuario === AuthFactory.getUser().login);
	}
}
})();
