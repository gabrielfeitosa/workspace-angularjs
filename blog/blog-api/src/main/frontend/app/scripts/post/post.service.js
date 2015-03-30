(function(){
'use strict';

angular.module('blog.app').factory('PostService',PostService);

PostService.$inject = ['$resource','postUrlApi'];

function PostService($resource,postUrlApi){

  var resource = $resource(postUrlApi+'/:id',{},{
    update:{method: 'PUT'}
  });

  function promise(data){
    return data.$promise;
  }

  return {
    save : function(post){
      return promise(resource.save(post));
    },
    query: function(){
      return promise(resource.query());
    },
    get: function(id){
      return promise(resource.get({id: id}));
    },
    update: function(post){
      return promise(resource.update({id: post.id},post));
    },
    remove: function(id){
      return promise(resource.delete({id: id}));
    }
  };
}
})();
