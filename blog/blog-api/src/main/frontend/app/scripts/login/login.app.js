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

  InitApp.$inject = ['$rootScope','$state','AuthFactory','ModalFactory'];

  function InitApp($rootScope,$state,AuthFactory,ModalFactory) {
    $rootScope.$on('$stateChangeStart', function (event,toState, toParams) {
      if(angular.isDefined(toState.data) && toState.data.requireLogin && !AuthFactory.isLogado()){
        event.preventDefault();
        ModalFactory.showLogin().then(function(){
          $state.go(toState.name, toParams);
        });
      }
    });
  }

})();
