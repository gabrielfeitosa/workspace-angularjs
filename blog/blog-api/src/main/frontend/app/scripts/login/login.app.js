(function() {
  'use strict';

  angular.module('login.app',['core.app','ngResource','LocalStorageModule'])
  .constant('authUrlApi', 'blog-api/api/auth')
  .config(StorageConfig)
  .run(InitApp);

  StorageConfig.$inject = ['localStorageServiceProvider'];

  function StorageConfig(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('blogLs');
  }

  InitApp.$inject = ['$rootScope','toastr','AuthFactory'];

  function InitApp($rootScope,toastr,AuthFactory) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if(angular.isDefined(next.data) && next.data.requireLogin){
        console.log('Logado '+AuthFactory.isLogado());
      }      
    });
  }

})();
