(function(){
'use strict';

angular.module('blogYoApp').controller('ModalController',ModalController);

ModalController.$inject = ['$modalInstance'];
/*jshint latedef: false */
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
