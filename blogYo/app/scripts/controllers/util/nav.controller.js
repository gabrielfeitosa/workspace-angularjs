(function(){
'use strict';
angular.module('blogYoApp').controller('NavController',NavController);

NavController.$inject = ['$state'];
/*jshint latedef: false */
function NavController($state) {
	var vm = this;

	vm.activeClass = activeClass;

	iniciar();

	//////////////////////

	function iniciar(){
		vm.menu = [{item: 'Home',state:'home'},{item: 'Novo Post',state:'newPost'}];
	}

	function activeClass(state){
		return $state.is(state);
	}
}
})();
