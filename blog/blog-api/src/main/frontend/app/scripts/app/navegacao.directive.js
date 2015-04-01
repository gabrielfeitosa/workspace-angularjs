(function() {
    'use strict';

    angular
        .module('blog.app')
        .directive('navegacao', navegacao);

    function navegacao() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'views/nav.tpl.html',
            controller: 'NavController',
            controllerAs: 'navCtrl',
            bindToController: true
        };
        return directive;
    }

    angular
        .module('blog.app')
        .controller('NavController',NavController);

    NavController.$inject = ['RouterFactory'];

    function NavController(RouterFactory) {
    	var vm = this;

    	vm.activeClass = activeClass;
    	iniciar();

    	//////////////////////

    	function iniciar(){
    		vm.menu = [{item: 'Home',state:'home'},{item: 'Novo Post',state:'post.new'},{item:'About',state:'about'}];
    	}

    	function activeClass(state){
    		return RouterFactory.isState(state);
    	}
    }

})();
