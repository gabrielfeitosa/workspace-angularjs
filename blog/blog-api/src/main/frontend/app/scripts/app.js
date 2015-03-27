(function(){
'use strict';

angular.module('blogYoApp', [
    'ngResource',
    'ngCookies',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'LocalStorageModule',
    'angular-loading-bar',
    'textAngular'
])
.constant('urlApi', 'blog-api/api/');
})();
