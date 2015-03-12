(function(){
'use strict';

angular.module('blogYoApp')
.factory('AuthFactory',['localStorageService','AuthService', function(localStorageService,AuthService){

  var Auth = {};

  function get(){
    return localStorageService.get('user');
  }

  Auth.logar = function(email,pass){
    return AuthService.logar({email: email, senha: pass}).$promise;
  };

  Auth.logout = function(){
    AuthService.logout(function(res){
      console.log('AuthFactory.logout: '+angular.toJson(res));
    });
  };


  Auth.getUser = function(){
    var u = get();
    return u || [];
  };

  Auth.isLogged = function(){
    return !angular.equals(angular.toJson(get()),'[]');
  };

  Auth.setUser = function(u){
    localStorageService.set('user',u);
  };

  return Auth;
}])
.factory('HttpInterceptor',['$q', function($q){
  return {
    'responseError': function(rejection) {
      console.log('HttpInterceptor: '+rejection);
      return $q.reject(rejection);
    }
  };
}]);
})();
