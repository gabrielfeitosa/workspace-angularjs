(function(){
'use strict';

angular.module('login.app').controller('LoginController',LoginController);

LoginController.$inject = ['AuthFactory','RouterFactory'];

function LoginController(AuthFactory,RouterFactory){
  var vm = this;

  vm.isLogado = isLogado;
  vm.doLogin = doLogin;
  vm.doLogout = doLogout;
  vm.viewTemplate = 'views/core/login.tpl.html';

  iniciar();

  //////////////////////////
  function iniciar(){
    vm.user = AuthFactory.getUser();
  }

  function isLogado(){
    return AuthFactory.isLogado();
  }

	function doLogin(email,pass){
    AuthFactory.logar(email, pass).then(function(data){
      vm.user = data;
      RouterFactory.reload();
    });
  }

  function doLogout(){
    AuthFactory.logout().then(function(){
      RouterFactory.reload();
    });
  }
}
})();
