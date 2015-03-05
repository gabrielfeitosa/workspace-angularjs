'use strict';

angular.module('blogYoApp')
.factory('Post', ['$resource', function($resource){
  var resource = $resource('/blog-api/posts/:id/:comentario',{comentario:''},{
	  update:{method: 'PUT'}
  });

  resource.addComentario = function (id, comentario) {
      return this.save(
        {
          comentario: "comentario",
          id: id
        },
        comentario
      );
    };

  return resource;

}]);
