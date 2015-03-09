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
      'ngCookies',
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
  .factory('MyModal',['$modal', function($modal){
     var modal = $modal;

     modal.show = function(typeModal){
       var urlTemplate = 'views/components/';
       if(typeModal === 'login'){
         urlTemplate += 'modalLogin.html';
       }else{
         urlTemplate +='modalConfirm.html';
       }

       return $modal.open({
  		      templateUrl: urlTemplate,
  		      controller: 'ModalController',
  		      size: 'sm'
  		    });
     };

 		 return modal;

  }])
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',function($stateProvider, $urlRouterProvider,$httpProvider) {

    $httpProvider.defaults.withCredentials = true;
    
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
  }]);
