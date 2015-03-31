(function(){
'use strict';

angular.module('core.app')
.factory('HttpInterceptor',HttpInterceptor);

HttpInterceptor.$inject = ['$q'];

function HttpInterceptor($q){
  return {
    'responseError': function(rejection) {
      console.log('HttpInterceptor: '+rejection.data);
      return $q.reject(rejection);
    }
  };
}
})();
