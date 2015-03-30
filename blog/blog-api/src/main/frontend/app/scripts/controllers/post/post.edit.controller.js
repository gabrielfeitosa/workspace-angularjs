(function(){
'use strict';
angular.module('blog.app').controller('PostEditController', PostEditController);

PostEditController.$inject = ['PostService','RouterFactory','AuthFactory','toastr'];

function PostEditController(PostService,RouterFactory,AuthFactory,toastr) {

	var vm = this;

	vm.salvar = salvar;
	vm.isHabilitarCampoUsuario = isHabilitarCampoUsuario;

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

	function isHabilitarCampoUsuario(){
		return AuthFactory.isLogado();
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
			toastr.success('Atualizado...');
			RouterFactory.go('post.detail',{ 'id': id});
		});
	}

	function save() {
		PostService.save(vm.post).then(function(){
			vm.post = {};
			toastr.success('Novo post na parada \\o/');
			RouterFactory.go('home');
		});
	}
}
})();
