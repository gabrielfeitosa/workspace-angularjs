(function(){
'use strict';

angular.module('core.app').factory('ModalFactory',ModalFactory);

ModalFactory.$inject = ['$modal'];

function ModalFactory($modal){
  var urlTemplate = 'views/core/';
  return {
    showConfirmar: function(){
      var url = urlTemplate+'modal.confirm.tpl.html';
      return $modal.open({
  		  templateUrl: url,
  		  controller: 'ModalController',
        controllerAs: 'modalCtrl',
  		  size: 'sm'
      }).result;
    }
  };
}
})();
