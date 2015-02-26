var blogApp = angular.module('blogApp', ['ngResource','ngRoute','ui.bootstrap']);

blogApp.filter('limitarTexto', function () {
	  return function (item,limit) {
		  if(item.length > limit){
			  return item.substring(0, limit) + '...'; 
		  }
	    return item;
	  };
	});