(function() {
  'use strict';

  angular.module('login.app',['core.app','ngResource','LocalStorageModule'])
  .constant('authUrlApi', 'blog-api/api/auth')
  .config(StorageConfig);

  StorageConfig.$inject = ['localStorageServiceProvider'];

  function StorageConfig(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('blogLs');
  }
})();
