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
  		      size: 'sm'
  		    });
     };

 		 return modal;

  }])
  .factory('UserFactory',['localStorageService', function(localStorageService){

    var User = {};

    function get(){
      return localStorageService.get('user');
    }

    User.getUser = function(){
      var u = get();
      return u || [];
    };

    User.isLogged = function(){
      return !angular.equals(angular.toJson(get()),'[]');
    };

    User.setUser = function(u){
      localStorageService.set('user',u);
    };

    return User;

  }]);
