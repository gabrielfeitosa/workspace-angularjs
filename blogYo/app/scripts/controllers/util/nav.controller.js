(function(){
'use strict';
angular.module('blogYoApp').controller('NavController',NavController);

NavController.$inject = ['RouterFactory'];

function NavController(RouterFactory) {
	var vm = this;

	vm.activeClass = activeClass;

	iniciar();

	//////////////////////

	function iniciar(){
		vm.menu = [{item: 'Home',state:'home'},{item: 'Novo Post',state:'post.new'}];
	}

	function activeClass(state){
		return RouterFactory.isState(state);
	}
}
})();
