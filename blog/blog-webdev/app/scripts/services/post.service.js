(function(){
'use strict';

angular.module('blogYoApp').factory('PostService',PostService);

PostService.$inject = ['$resource'];

function PostService($resource){

  var resource = $resource('blog-api/posts/:id',{},{
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
