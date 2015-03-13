(function(){
'use strict';
angular.module('blogYoApp').controller('PostEditController', PostEditController);

PostEditController.$inject = ['PostService','RouterFactory'];

function PostEditController(PostService,RouterFactory) {

	var vm = this;

	vm.salvar = salvar;

	iniciar();

	/////////////////////////////////
	function iniciar(){
		vm.post = {};
		var id =RouterFactory.getParam('id');
		if(id){
			PostService.get(id).then(function(data){
				vm.post = data;
			});
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
		PostService.update(vm.post);
		var id = vm.post.id;
		vm.post = {};
		RouterFactory.go('post.detail',{ 'id': id});
	}

	function save() {
		PostService.save(vm.post).then(function(){
			RouterFactory.go('home');
		});
		vm.post = {};

	}
}
})();
