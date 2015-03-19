(function(){
'use strict';

angular.module('blogYoApp')
.factory('AuthFactory',AuthFactory);

AuthFactory.$inject = ['localStorageService','AuthService'];

function AuthFactory(localStorageService,AuthService){

  function get(){
    var user = localStorageService.get('user');
    if(user === null){
      user = {};
    }
    return user;
  }

  return {
    logar: function(email,pass){
      return AuthService.logar(email,pass);
    },
    logout: function(){
      AuthService.logout().then(function(){
        localStorageService.remove('user');
      });
    },
    getUser: function(){
      return get();
    },
    isLogged: function(){
      return !angular.equals(angular.toJson(get()),'{}');
    },
    setUser: function(u){
      localStorageService.set('user',u);
    }
  };
}

})();
