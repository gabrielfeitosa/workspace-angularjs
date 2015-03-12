(function(){
'use strict';

angular.module('blogYoApp')
.factory('MyModalFactory',['$modal', function($modal){
  var modal = $modal;
  modal.show = function(){
    var urlTemplate = 'views/components/';
    urlTemplate +='modalConfirm.html';
    return $modal.open({
		  templateUrl: urlTemplate,
		  controller: 'ModalController',
      controllerAs: 'modalCtrl',
		  size: 'sm'
		 });
  };
	return modal;
}]);
})();
