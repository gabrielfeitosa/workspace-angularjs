(function(){
'use strict';

angular.module('login.app')
.factory('AuthFactory',AuthFactory);

AuthFactory.$inject = ['$q','localStorageService','AuthService'];

function AuthFactory($q,localStorageService,AuthService){

  function get(){
    var user = localStorageService.get('user');
    if(!user){
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
      return AuthService.logout().then(function(){
        localStorageService.remove('user');
        return $q.defer().resolve();
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
