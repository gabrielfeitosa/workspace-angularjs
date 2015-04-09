(function(){
'use strict';

angular.module('core.app')
.factory('HttpInterceptor',HttpInterceptor);

HttpInterceptor.$inject = ['$q','toastr'];

function HttpInterceptor($q,toastr){
  return {
    'responseError': function(rejection) {
      console.log(rejection);
      toastr.error('HttpInterceptor: '+rejection.data);
      console.log('HttpInterceptor: '+rejection.data);
      return $q.reject(rejection);
    }
  };
}
})();
