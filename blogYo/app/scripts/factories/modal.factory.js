(function(){
'use strict';

angular.module('blogYoApp').factory('ModalFactory',ModalFactory);

ModalFactory.$inject = ['$modal'];

function ModalFactory($modal){
  var modal = $modal;
  var urlTemplate = 'views/components/';

  modal.showConfirmar = function(){
    var url = urlTemplate+'modalConfirm.html';
    return $modal.open({
		  templateUrl: url,
		  controller: 'ModalController',
      controllerAs: 'modalCtrl',
		  size: 'sm'
    }).result;
  };
	return modal;
}
})();
