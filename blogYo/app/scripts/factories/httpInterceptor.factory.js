(function(){
'use strict';

angular.module('blogYoApp')
.factory('HttpInterceptor',HttpInterceptor);

HttpInterceptor.$inject = ['$q'];

function HttpInterceptor($q){
  return {
    'responseError': function(rejection) {
      console.log('HttpInterceptor: '+rejection);
      return $q.reject(rejection);
    }
  };
}
})();
