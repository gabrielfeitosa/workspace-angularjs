'use strict';

angular.module('blogYoApp')
.controller('PostListController',['$scope','PostService', function($scope, PostService){

	$scope.posts = PostService.query();

}])
.controller('PostDetailController',['$scope','$state','$stateParams','$window','MyModalFactory','PostService','UserFactory',
	function($scope,$state,$stateParams,$window,MyModalFactory,PostService,UserFactory){

		$scope.post = PostService.get({id: $stateParams.id});

	 	$scope.deletar = function() {

			MyModalFactory.show().result.then(function () {
	    	PostService.remove({ id: $scope.post.id });
				$state.go('home');
	    });

		};

		$scope.isEditable = function(){
			return UserFactory.isLogged() &&	($scope.post.usuario === UserFactory.getUser().login);
		};
}])
.controller('PostEditController', ['$scope','$state','$stateParams', 'PostService', function($scope,$state,$stateParams,PostService) {

	$scope.post = {};

	if($stateParams.id){
		$scope.post = PostService.get({id: $stateParams.id});
	}

	$scope.salvar = function(){
		if($scope.post.id){
			update();
		}else{
			save();
		}
	};

	function update(){
		PostService.update({id: $scope.post.id}, $scope.post);
		var id = $scope.post.id;
		$scope.post = {};
		$state.go('viewPost',{ 'id': id});
	}

	function save() {
		PostService.save($scope.post);
		$scope.post = {};
		$state.go('home');
	}

}]);
