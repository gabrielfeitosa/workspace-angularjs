(function(){
'use strict';

angular.module('blog.app').controller('ModalController',ModalController);

ModalController.$inject = ['$modalInstance'];

function ModalController($modalInstance){

	var vm = this;
	
	vm.ok = ok;
	vm.cancel = cancel;

	//////////////////////////

	function ok(){
		$modalInstance.close(true);
	}

	function cancel(){
		$modalInstance.dismiss('cancel');
	}
}
})();
