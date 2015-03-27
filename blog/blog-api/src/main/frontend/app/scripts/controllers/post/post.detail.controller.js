(function(){
'use strict';

angular.module('blogYoApp').controller('PostDetailController',PostDetailController);

PostDetailController.$inject = ['ModalFactory','PostService','AuthFactory','RouterFactory','toastr'];

function PostDetailController(ModalFactory,PostService,AuthFactory,RouterFactory,toastr){

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
			toastr.error(' Erro ao iniciar o detalhamento do post: '+angular.toJson(err));
			RouterFactory.go('home');
		});
	}

	function deletar(){
		ModalFactory.showConfirmar().then(function () {
			PostService.remove(vm.post.id).then(function(){
				toastr.info('Oxe, me deletou pq?');
				RouterFactory.go('home');
			});
		});
	}

	function isEditable(){
		return AuthFactory.isLogado() &&
			(vm.post.usuario === AuthFactory.getUser().login);
	}
}
})();
