'use strict';

/**
 * @ngdoc overview
 * @name blogYoApp
 * @description
 * # blogYoApp
 *
 * Main module of the application.
 */
angular
  .module('blogYoApp', [
      'ngResource',
      'ui.router',
      'ui.bootstrap'
  ])
  .filter('limitarTexto', function () {
  	  return function (item,limit) {
  		  if(item.length > limit){
  			  return item.substring(0, limit) + '...';
  		  }
  	    return item;
  	  };
  })
  .config(function($stateProvider, $urlRouterProvider) {
	  $urlRouterProvider.otherwise('/home');

	  $stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: 'views/listPost.html',
	      controller:'PostListController'
	    })
	    .state('newPost', {
	      url: '/post',
	      templateUrl: 'views/formPost.html',
	      controller:'PostEditController'
	    })
	    .state('viewPost', {
	      url: '/post/:id',
	      templateUrl: 'views/viewPost.html',
	      controller: 'PostDetailController',
	      params: {
	    	  edit: true
	      }

	    })
	    .state('editPost', {
	      url: '/post/:id/edit',
	      templateUrl: 'views/formPost.html',
	      controller:'PostEditController'
	    });
  });
