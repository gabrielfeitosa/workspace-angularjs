(function(){
 'use strict';

 angular.module('core.app',[
   'ui.bootstrap',
   'ui.router',
   'angular-loading-bar',
   'ngResource',
   'ngCookies',
   'ngAnimate'
]);
 /* jshint ignore:start */
 toastr.options = {
   'closeButton': true,
   'progressBar': true,
   'positionClass': 'toast-top-right',
   'timeOut': '2000'
 };
 angular.module('core.app').constant('toastr', toastr);
 /* jshint ignore:end */
 })();
