(function(){
'use strict';

angular.module('blog.app')
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',function($stateProvider, $urlRouterProvider,$httpProvider) {

  $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push('HttpInterceptor');
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/post/post.list.html',
      controller: 'PostListController',
      controllerAs: 'vm'
    })
    .state('post',{
      url: '/post',
      abstract: true,
      templateUrl: 'views/post/post.html'
    })
    .state('post.new', {
      url: '',
      templateUrl: 'views/post/post.form.html',
      controller: 'PostEditController',
      controllerAs: 'editCtrl'
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
