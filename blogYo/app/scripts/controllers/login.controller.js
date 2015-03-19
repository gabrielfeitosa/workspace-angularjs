(function(){
'use strict';

angular.module('blogYoApp').controller('LoginController',LoginController);

LoginController.$inject = ['$scope','AuthFactory'];

function LoginController($scope,AuthFactory){
  var vm = this;
  vm.user = AuthFactory.getUser();

  vm.isLogged = isLogged;
  vm.doLogin = doLogin;
  vm.doLogout = doLogout;

  iniciar();

  //////////////////////////
  function iniciar(){
    $scope.$watch(function() {
      return vm.user;
    }, function(newValue) {
      AuthFactory.setUser(newValue);
    });
  }

  function isLogged(){
    return AuthFactory.isLogged();
  }

	function doLogin(email,pass){
    AuthFactory.logar(email, pass).then(function(data){
      vm.user = data;
    });
  }

  function doLogout(){
    AuthFactory.logout();
    vm.user = {};
  }
}
})();
