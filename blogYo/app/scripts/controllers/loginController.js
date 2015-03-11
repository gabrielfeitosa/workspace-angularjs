(function(){
'use strict';

function LoginController($scope,AuthFactory, LoginService){
  var vm = this;
  var usuario = AuthFactory.getUser();
  vm.user = usuario || [];

  $scope.$watch(function() {
    return vm.user;
  }, function(newValue, oldValue) {
    AuthFactory.setUser(newValue);
  });

  function isLogged(){
    return AuthFactory.isLogged();
  }

	function doLogin(email,pass){
    LoginService.login({email: email, senha: pass}, function(data){
      vm.user = data;
    });
  }

  function doLogout(){
    LoginService.logout(function(res){
      console.log('LoginController.doLogout: '+angular.toJson(res));
    });
    vm.user = [];
  }

  vm.isLogged = isLogged;
  vm.doLogin = doLogin;
  vm.doLogout = doLogout;
}

LoginController.$inject = ['$scope','AuthFactory','LoginService'];

angular.module('blogYoApp').controller('LoginController',LoginController);
})();
