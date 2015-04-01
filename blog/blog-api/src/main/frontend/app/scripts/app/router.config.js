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
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.tpl.html',
      controller: 'AboutController',
      controllerAs: 'vm'
    });

}]);
})();
