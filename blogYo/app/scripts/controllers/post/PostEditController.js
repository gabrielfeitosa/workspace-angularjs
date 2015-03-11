(function(){
'use strict';

function PostEditController($scope,$state,$stateParams,PostService) {

	var vm = this;
	vm.post = {};

	if($stateParams.id){
		vm.post = PostService.get({id: $stateParams.id});
	}

	function salvar(){
		if(vm.post.id){
			update();
		}else{
			save();
		}
	};

	function update(){
		PostService.update({id: vm.post.id}, vm.post);
		var id = vm.post.id;
		vm.post = {};
		$state.go('viewPost',{ 'id': id});
	}

	function save() {
		PostService.save(vm.post);
		vm.post = {};
		$state.go('home');
	}

	vm.salvar = salvar;
}
PostEditController.$inject = ['$scope','$state','$stateParams', 'PostService'];

angular.module('blogYoApp').controller('PostEditController', PostEditController);
})();
