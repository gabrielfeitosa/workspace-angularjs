(function(){
'use strict';

angular.module('blogYoApp').controller('PostDetailController',PostDetailController);

PostDetailController.$inject = ['$window','MyModalFactory','PostService','AuthFactory','RouterFactory'];

function PostDetailController($window,MyModalFactory,PostService,AuthFactory,RouterFactory){

	var vm = this;

	vm.deletar = deletar;
	vm.isEditable = isEditable;

	iniciar();

	/////////////////////////////////

	function iniciar(){
		PostService.get(RouterFactory.getParam('id')).then(function(data){
			vm.post = data;
		});
	}

	function deletar(){
		MyModalFactory.show().result.then(function () {
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
