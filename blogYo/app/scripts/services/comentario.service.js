(function(){
'use strict';

angular.module('blogYoApp').factory('ComentarioService',ComentarioService);

ComentarioService.$inject = ['$resource'];

function ComentarioService($resource){

  var resource = $resource('blog-api/posts/:id/comentarios',{},{
  });

  function promise(ch){
    return ch.$promise;
  }

  return {
    save : function(_id,comentario){
      return promise(resource.save({id: _id},comentario));
    },
    query: function(_id){
      return promise(resource.query({id: _id}));
    }
  };
}
})();
