'use strict';

angular.module('blogYoApp')
.controller('PostListController',['$scope','Post', function($scope, Post){

	$scope.posts = Post.query();

}])
.controller('PostDetailController',['$scope','$state','$stateParams','$window','$modal','Post', function($scope,$state,$stateParams,$window,$modal,Post){

	 $scope.post = Post.get({id: $stateParams.id});

	 $scope.deletar = function() {

		 var modalInstance = $modal.open({
		      templateUrl: 'partials/components/modalConfirm.html',
		      controller: 'ModalController',
		      size: 'sm'
		    });

	    modalInstance.result.then(function (del) {
	    	Post.remove({ id: $scope.post.id });
			$state.go('home');
	    });

     }

	 $scope.adicionarComentario = function(c){
		 if($scope.post.comentarios === null){
			 $scope.post.comentarios= [];
		 }
		 $scope.post.comentarios.push(Post.addComentario($scope.post.id,c));
		 $scope.comentario = {};
	 }

}])
.controller('PostEditController', ['$scope','$state','$stateParams', 'Post', function($scope,$state,$stateParams,Post) {

	$scope.post = new Post();

	if($stateParams.id){
		$scope.post = Post.get({id: $stateParams.id});
	}

	$scope.salvar = function(){
		if($scope.post.id){
			update();
		}else{
			save();
		}
	}

	function update(){
		Post.update({id: $scope.post.id}, $scope.post);
		var id = $scope.post.id;
		$scope.post = new Post();
		$state.go('viewPost',{ "id": id});
	}

	function save() {
		Post.save($scope.post,function(data){
			$scope.posts.push(data);
		});
		$scope.post = new Post();
		$state.go('home');
	}

}])
.controller('NavController', [ '$scope','$state', function($scope,$state) {

	$scope.menu = [{item: 'Home',state:'home'},{item: 'Novo Post',state:'newPost'}];

	$scope.activeClass = function(state){
		return $state.is(state);
	}
}])
.controller('ModalController',['$scope','$modalInstance', function ($scope, $modalInstance) {

	  $scope.ok = function () {
	    $modalInstance.close(true);
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
	}]);
