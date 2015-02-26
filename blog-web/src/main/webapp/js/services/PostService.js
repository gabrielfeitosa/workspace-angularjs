blogApp.factory('Post', ['$resource', function($resource){
  var resource = $resource('http://localhost:8080/blog-api/posts/:postId/:comentario',{comentario:''},{
	  update:{method: 'PUT'}
  });
  

  resource.addComentario = function (postId, comentario) {
      return this.save(
        {
          comentario: "comentario",
          postId: postId
        },
        comentario
      );
    };

  return resource;

}]);