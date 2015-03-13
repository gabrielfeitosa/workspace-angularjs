'use strict';

/*global toastr*/
angular.module('blogYoApp').value('ngToastr', toastr);

angular.module('blogYoApp')
  .factory('toasterFactory', ['ngToastr', function (ngToastr) {

    ngToastr.options = {
      'closeButton': false,
      'debug': false,
      'newestOnTop': false,
      'progressBar': true,
      'positionClass': 'toast-top-right',
      //'preventDuplicates': true,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '10000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    };

    return {
      successMsg: function (msg) {
        return ngToastr.success(msg);
      },
      infoMsg: function (msg) {
        return ngToastr.info(msg);
      },
      errorMsg: function (msg) {
        return ngToastr.error(msg);
      },
      successWrng: function (msg) {
        return ngToastr.warning(msg);
      }
    };
  }]);
