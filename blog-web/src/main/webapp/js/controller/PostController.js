blogApp.controller('PostController', ['$scope', 'Post','$window','$routeParams', function($scope, Post, $window, $routeParams) {
	$scope.posts = [];
	$scope.post = new Post();
	
	$scope.recuperar = function(id){
		Post.get({ postId: id },function(data){
			$scope.post = data;
		});
	}
	
	$scope.listar = function(){
		$scope.posts =[];
		$scope.posts = Post.query();
	}

	$scope.prepararEdicao = function(){
		$window.location.href = '#/post/'+$scope.post.id;
	}
	
	$scope.ver = function(post){
		$window.location.href = '#/post/'+post.id;
	}
	
	
	$scope.save = function() {
		if($scope.post.id){
			Post.update({postId: $scope.post.id}, $scope.post);
		}else{
			Post.save($scope.post,function(data){
				$scope.posts.push(data);
			});
		}
        $scope.post = new Post();
        $window.location.href = '';
    }
	
	 $scope.deletar = function() {
         Post.remove({ postId: $scope.post.id });
         $scope.listar();
         $window.location.href = '#/';
     }
	 
	 $scope.adicionarComentario = function(c){
		 $scope.post.comentarios.push(Post.addComentario($scope.post.id,c));
		 $scope.comentario = {};
	 }

	 if($routeParams.postId !== undefined){
		 $scope.recuperar($routeParams.postId);
	 }

	$scope.listar();
}]);