'use strict';

angular.module('blogYoApp')
.controller('NavController', [ '$scope','$state','$cookieStore', function($scope,$state,$cookieStore) {

	$scope.menu = [{item: 'Home',state:'home'},{item: 'Novo Post',state:'newPost'}];

  console.log($cookieStore.get('JSESSIONID'));

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
