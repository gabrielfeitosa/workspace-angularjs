(function(){
'use strict';

angular.module('blogYoApp')
.factory('ComentarioService',['$resource', function($resource){
  return $resource('blog-api/posts/:id/comentarios',{},{
  });
}]);
})();
