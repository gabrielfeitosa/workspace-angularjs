(function(){
'use strict';

angular.module('blogYoApp').factory('AuthService', AuthService);

AuthService.$inject = ['$resource','urlApi'];
function AuthService($resource,urlApi){
  var resource = $resource(urlApi+'auth/:event',{event:''},{
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

  function promise(ch){
    return ch.$promise;
  }

  return {
    logar: function(email,pass){
      return promise(resource.logar({email: email, senha: pass}));
    },
    logout: function(){
      return promise(resource.logout());
    }
  };
}
})();
