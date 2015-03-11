(function(){
'use strict';

function NavController($state) {
	var vm = this;
	vm.menu = [{item: 'Home',state:'home'},{item: 'Novo Post',state:'newPost'}];

	vm.activeClass = function(state){
		return $state.is(state);
	};
}
NavController.$inject = ['$state'];
/*NavController - end*/

angular.module('blogYoApp').controller('NavController',NavController);
})();
