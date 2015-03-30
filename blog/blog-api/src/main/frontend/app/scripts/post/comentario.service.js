(function(){
'use strict';

angular.module('post.app').factory('ComentarioService',ComentarioService);

ComentarioService.$inject = ['$resource','postUrlApi'];

function ComentarioService($resource,postUrlApi){

  var resource = $resource(postUrlApi+'/:id/comentarios',{},{
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
