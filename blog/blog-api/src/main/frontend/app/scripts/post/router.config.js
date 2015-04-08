(function(){
'use strict';

angular.module('post.app')
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',function($stateProvider, $urlRouterProvider,$httpProvider) {

  $httpProvider.defaults.withCredentials = true;

  $stateProvider
    .state('post',{
      url: '/post',
      abstract: true,
      templateUrl: 'views/post/post.html'
    })
    .state('post.new', {
      url: '',
      templateUrl: 'views/post/post.form.html',
      controller: 'PostEditController',
      controllerAs: 'editCtrl',
      data: {
        requireLogin: true
      }
    })
    .state('post.detail', {
      url: '/:id',
      templateUrl: 'views/post/post.detail.html',
      controller: 'PostDetailController',
      controllerAs: 'vm'
    })
    .state('post.edit', {
      url: '/:id/edit',
      templateUrl: 'views/post/post.form.html',
      controller: 'PostEditController',
      controllerAs: 'editCtrl'
    });

}]);
})();
