(function(){
'use strict';

angular.module('blogYoApp')
.config(StorageConfig);

StorageConfig.$inject = ['localStorageServiceProvider'];

function StorageConfig(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('blogLs');
}

})();
