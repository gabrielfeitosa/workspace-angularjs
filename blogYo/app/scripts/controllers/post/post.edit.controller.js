(function(){
'use strict';
angular.module('blogYoApp').controller('PostEditController', PostEditController);

PostEditController.$inject = ['PostService','RouterFactory','AuthFactory'];

function PostEditController(PostService,RouterFactory,AuthFactory) {

	var vm = this;

	vm.salvar = salvar;

	iniciar();

	/////////////////////////////////
	function iniciar(){
		vm.post = {};
		var id = RouterFactory.getParam('id');
		if(id){
			PostService.get(id).then(function(data){
				vm.post = data;
			});
		}else if(AuthFactory.isLogado()){
			vm.post.usuario = AuthFactory.getUser().login;
		}
	}

	function salvar(){
		if(vm.post.id){
			update();
		}else{
			save();
		}
	}

	function update(){
		PostService.update(vm.post).then(function(){
			var id = vm.post.id;
			vm.post = {};
			RouterFactory.go('post.detail',{ 'id': id});
		});
	}

	function save() {
		PostService.save(vm.post).then(function(){
			vm.post = {};
			RouterFactory.go('home');
		});
	}
}
})();
