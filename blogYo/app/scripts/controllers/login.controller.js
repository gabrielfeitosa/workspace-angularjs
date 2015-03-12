(function(){
'use strict';

angular.module('blogYoApp').controller('LoginController',LoginController);

LoginController.$inject = ['$scope','AuthFactory'];
/*jshint latedef: false */
function LoginController($scope,AuthFactory){
  var vm = this;
  var usuario = AuthFactory.getUser();
  vm.user = usuario || [];

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
    vm.user = [];
  }
}
})();
