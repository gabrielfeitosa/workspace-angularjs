'use strict';

angular.module('blogYoApp')
.controller('PostListController',['$scope','Post', function($scope, Post){

	$scope.posts = Post.query();

}])
.controller('PostDetailController',['$scope','$state','$stateParams','$window','MyModal','Post', function($scope,$state,$stateParams,$window,MyModal,Post){

	 $scope.post = Post.get({id: $stateParams.id});

	 $scope.deletar = function() {

		  MyModal.show().result.then(function () {
	    	Post.remove({ id: $scope.post.id });
				$state.go('home');
	    });

		};


}])
.controller('PostEditController', ['$scope','$state','$stateParams', 'Post', function($scope,$state,$stateParams,Post) {

	$scope.post = {};

	if($stateParams.id){
		$scope.post = Post.get({id: $stateParams.id});
	}

	$scope.salvar = function(){
		if($scope.post.id){
			update();
		}else{
			save();
		}
	};

	function update(){
		Post.update({id: $scope.post.id}, $scope.post);
		var id = $scope.post.id;
		$scope.post = {};
		$state.go('viewPost',{ 'id': id});
	}

	function save() {
		Post.save($scope.post,function(data){
			$scope.posts.push(data);
		});
		$scope.post = {};
		$state.go('home');
	}

}]);
