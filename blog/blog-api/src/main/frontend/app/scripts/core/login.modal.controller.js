(function(){
'use strict';

angular.module('core.app').controller('LoginModalController',LoginModalController);

LoginModalController.$inject = ['$modalInstance','AuthFactory','RouterFactory'];

function LoginModalController($modalInstance,AuthFactory,RouterFactory){

	var vm = this;

	vm.submit = submit;
	vm.cancel = cancel;

	//////////////////////////

	function submit(email, senha){
		AuthFactory.logar(email,senha).then(function(){
			$modalInstance.close(true);
			RouterFactory.reload();
		});

	}

	function cancel(){
		$modalInstance.dismiss('cancel');
	}
}
})();
