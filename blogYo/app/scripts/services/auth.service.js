(function(){
'use strict';

angular.module('blogYoApp')
.factory('AuthService',['$resource', function($resource){
  return $resource('blog-api/auth/:event',{event:''},{
    logar : {
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
