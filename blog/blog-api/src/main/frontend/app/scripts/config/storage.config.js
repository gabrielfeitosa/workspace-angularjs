(function(){
'use strict';

angular.module('blog.app')
.config(StorageConfig);

StorageConfig.$inject = ['localStorageServiceProvider'];

function StorageConfig(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('blogLs');
}

})();
