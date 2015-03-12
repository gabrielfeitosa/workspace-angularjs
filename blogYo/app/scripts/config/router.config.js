(function(){
'use strict';

angular.module('blogYoApp')
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',function($stateProvider, $urlRouterProvider,$httpProvider) {

  $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push('HttpInterceptor');

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/listPost.html',
      controller: 'PostListController',
      controllerAs: 'vm'
    })
    .state('newPost', {
      url: '/post',
      templateUrl: 'views/formPost.html'
    })
    .state('viewPost', {
      url: '/post/:id',
      templateUrl: 'views/viewPost.html',
      controller: 'PostDetailController',
      controllerAs: 'vm',
      params: {
    	  edit: true
      }
    })
    .state('editPost', {
      url: '/post/:id/edit',
      templateUrl: 'views/formPost.html'
    });
}]);
})();
