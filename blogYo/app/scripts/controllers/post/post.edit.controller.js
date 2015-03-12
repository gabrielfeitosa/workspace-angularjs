(function(){
'use strict';
angular.module('blogYoApp').controller('PostEditController', PostEditController);

PostEditController.$inject = ['$scope','$state','$stateParams', 'PostService'];
/*jshint latedef: false */
function PostEditController($scope,$state,$stateParams,PostService) {

	var vm = this;

	vm.salvar = salvar;

	iniciar();

	/////////////////////////////////
	function iniciar(){
		vm.post = {};
		if($stateParams.id){
			vm.post = PostService.get({id: $stateParams.id});
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
		$state.go('viewPost',{ 'id': id});
	}

	function save() {
		PostService.save(vm.post).then(function(){
			$state.go('home');
		});
		vm.post = {};

	}
}
})();
