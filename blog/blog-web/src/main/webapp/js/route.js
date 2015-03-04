'use strict';

blogApp.config(function($stateProvider, $urlRouterProvider) {
	  $urlRouterProvider.otherwise("/home");

	  $stateProvider
	    .state('home', {
	      url: "/home",
	      templateUrl: "partials/listPost.html",
	      controller:'PostListController'
	    })
	    .state('newPost', {
	      url: "/post",
	      templateUrl: "partials/formPost.html",
	      controller:'PostEditController'
	    })
	    .state('viewPost', {
	      url: "/post/:id",
	      templateUrl: "partials/viewPost.html",
	      controller: 'PostDetailController',
	      params: {
	    	  edit: true
	      }
	    	  
	    })
	    .state('editPost', {
	      url: "/post/:id/edit",
	      templateUrl: "partials/formPost.html",
	      controller:'PostEditController'
	    });
	});