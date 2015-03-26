(function(){
'use strict';

angular.module('blogYoApp').controller('LoginController',LoginController);

LoginController.$inject = ['$scope','AuthFactory'];

function LoginController($scope,AuthFactory){
  var vm = this;

  vm.isLogado = isLogado;
  vm.doLogin = doLogin;
  vm.doLogout = doLogout;

  iniciar();

  //////////////////////////
  function iniciar(){
    vm.user = AuthFactory.getUser();
  }

  function isLogado(){
    return AuthFactory.isLogado();
  }

	function doLogin(email,pass){
    AuthFactory.logar(email, pass);
  }

  function doLogout(){
    AuthFactory.logout();
  }
}
})();
