(function(){
'use strict';

function ModalController($modalInstance){

	var vm = this;

	function ok(){
		$modalInstance.close(true);
	}

	function cancel(){
		$modalInstance.dismiss('cancel');
	}

	vm.ok = ok;
	vm.cancel = cancel;
}

ModalController.$inject = ['$modalInstance'];

angular.module('blogYoApp').controller('ModalController',ModalController);
})();
