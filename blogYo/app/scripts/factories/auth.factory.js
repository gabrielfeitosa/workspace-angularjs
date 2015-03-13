(function(){
'use strict';

angular.module('blogYoApp')
.factory('AuthFactory',AuthFactory);

AuthFactory.$inject = ['localStorageService','AuthService'];

function AuthFactory(localStorageService,AuthService){

  function get(){
    return localStorageService.get('user');
  }

  return {
    logar: function(email,pass){
      return AuthService.logar(email,pass);
    },
    logout: function(){
      AuthService.logout().then(function(res){
        console.log('AuthFactory.logout: '+angular.toJson(res));
      });
    },
    getUser: function(){
      var u = get();
      return u || [];
    },
    isLogged: function(){
      return !angular.equals(angular.toJson(get()),'[]');
    },
    setUser: function(u){
      localStorageService.set('user',u);
    }
  };
}

})();
