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
}])
.factory('AuthFactory',['localStorageService', function(localStorageService){
  var Auth = {};

  function get(){
    return localStorageService.get('user');
  }

  Auth.getUser = function(){
    var u = get();
    return u || [];
  };

  Auth.isLogged = function(){
    return !angular.equals(angular.toJson(get()),'[]');
  };

  Auth.setUser = function(u){
    localStorageService.set('user',u);
  };

  return Auth;
}])
.factory('HttpInterceptor',['$q', function($q){
  return {
    'responseError': function(rejection) {
      console.log('HttpInterceptor: '+rejection);
      return $q.reject(rejection);
    }
  };
}]);
})();
