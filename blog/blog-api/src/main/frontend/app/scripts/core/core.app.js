(function(){
 'use strict';

 angular.module('core.app',[
   'ui.bootstrap',
   'ngAnimate',
   'ui.router',
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
