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
		var promise = ModalFactory.showConfirmar();

		promise.then(function (data) {
			// PostService.remove(vm.post.id).then(function(){
			// 	RouterFactory.go('home');
			// });
			vm.modalCancelado = false;
			console.log(angular.toJson(data) + ' '+vm.modalCancelado);
		},function(){
			vm.modalCancelado = true;
			console.log(vm.modalCancelado);
		});
	}

	function isEditable(){
		return AuthFactory.isLogged() &&	(vm.post.usuario === AuthFactory.getUser().login);
	}
}
})();
