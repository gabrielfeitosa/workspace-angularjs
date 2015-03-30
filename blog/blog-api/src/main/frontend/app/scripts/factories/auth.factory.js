(function(){
'use strict';

angular.module('blog.app')
.factory('AuthFactory',AuthFactory);

AuthFactory.$inject = ['$q','localStorageService','AuthService','RouterFactory'];

function AuthFactory($q,localStorageService,AuthService,RouterFactory){

  function get(){
    var user = localStorageService.get('user');
    if(user === null){
      user = {};
    }
    return user;
  }

  function set(u){
    localStorageService.set('user',u);
  }

  return {
    logar: function(email,pass){
      return AuthService.logar(email,pass).then(function(data){
        set(data);
        return $q.defer().resolve(data);
      });
    },
    logout: function(){
      AuthService.logout().then(function(){
        localStorageService.remove('user');
        RouterFactory.reload();
      });
    },
    getUser: function(){
      return get();
    },
    isLogado: function(){
      return !angular.equals(angular.toJson(get()),'{}');
    }
  };
}

})();
