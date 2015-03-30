(function(){
'use strict';

angular.module('blog.app').controller('LoginController',LoginController);

LoginController.$inject = ['AuthFactory','RouterFactory'];

function LoginController(AuthFactory,RouterFactory){
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
    AuthFactory.logar(email, pass).then(function(){
      iniciar();
      RouterFactory.reload();
    });
  }

  function doLogout(){
    AuthFactory.logout();
  }
}
})();
