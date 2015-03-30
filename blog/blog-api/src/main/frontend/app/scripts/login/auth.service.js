(function(){
'use strict';

angular.module('login.app').factory('AuthService', AuthService);

AuthService.$inject = ['$resource','authUrlApi'];
function AuthService($resource,authUrlApi){
  var resource = $resource(authUrlApi+'/:event',{event:''},{
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

  return {
    logar: function(email,pass){
      return resource.logar({email: email, senha: pass}).$promise;
    },
    logout: function(){
      return resource.logout().$promise;
    }
  };
}
})();
