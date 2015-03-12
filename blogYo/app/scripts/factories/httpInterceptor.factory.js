(function(){
'use strict';

angular.module('blogYoApp')
.factory('HttpInterceptor',['$q', function($q){
  return {
    'responseError': function(rejection) {
      console.log('HttpInterceptor: '+rejection);
      return $q.reject(rejection);
    }
  };
}]);
})();
