'use strict';

angular.module('blogYoApp')
.factory('Post', ['$resource', function($resource){
  var resource = $resource('blog-api/posts/:id',{},{
	  update:{method: 'PUT'}
  });

  return resource;

}])
.factory('Comentario',['$resource', function($resource){
  return $resource('blog-api/posts/:id/comentarios',{},{
  });
}]);
