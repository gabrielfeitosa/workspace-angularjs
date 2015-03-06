'use strict';

angular.module('blogYoApp')
.controller('NavController', [ '$scope','$state', function($scope,$state) {

	$scope.menu = [{item: 'Home',state:'home'},{item: 'Novo Post',state:'newPost'}];

	$scope.activeClass = function(state){
		return $state.is(state);
	};
}])
.controller('ModalController',['$scope','$modalInstance', function ($scope, $modalInstance) {

	  $scope.ok = function () {
	    $modalInstance.close(true);
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
	}]);
