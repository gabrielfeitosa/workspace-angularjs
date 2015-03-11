(function(){
'use strict';

angular.module('blogYoApp')
.factory('PostService', ['$resource', function($resource){
  var resource = $resource('blog-api/posts/:id',{},{
	  update:{method: 'PUT'}
  });

  return resource;
}])
.factory('ComentarioService',['$resource', function($resource){
  return $resource('blog-api/posts/:id/comentarios',{},{
  });
}])
.factory('LoginService',['$resource', function($resource){
  return $resource('blog-api/auth/:event',{event:''},{
    login : {
        method : 'POST',
        params: {
            event: 'login'
        },
        headers : {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj){
              str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
            return str.join('&');
        }
    },
    logout: {
      method: 'POST',
      params: {
          event: 'logout'
      }
    }
  });
}]);


})();
