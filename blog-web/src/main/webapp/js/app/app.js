var blogApp = angular.module('blogApp', ['ngResource','ngRoute','ui.bootstrap']);

blogApp.filter('cortarTexto', function () {
	  return function (item) {
		  if(item.length > 500){
			  return item.substring(0, 500) + '...'; 
		  }
	    return item;
	  };
	});