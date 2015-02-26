blogApp.controller('NavController', [ '$scope', function($scope) {
	$scope.menu = [{item: 'Home',href:'#/'},{item: 'Novo Post',href:'#/post'}];

	$scope.selectedIndex = 0;

	$scope.itemClicked = function($index) {
		$scope.selectedIndex = $index;
	}
} ]);