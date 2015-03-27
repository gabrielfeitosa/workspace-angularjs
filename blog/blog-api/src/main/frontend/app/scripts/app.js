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

/* jshint ignore:start */
toastr.options = {
  'closeButton': true,
  'progressBar': true,
  'positionClass': 'toast-top-right',
  'timeOut': '4000'
};
angular.module('blogYoApp').constant('toastr', toastr);
/* jshint ignore:end */

})();
