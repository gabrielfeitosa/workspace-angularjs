(function(){
'use strict';

angular.module('blogYoApp')
.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('blogLs');
}]);
})();
