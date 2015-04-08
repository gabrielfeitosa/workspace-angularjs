(function() {
    'use strict';

    angular
        .module('auth.app')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$scope','USER_ROLES','AuthFactory'];

    function ApplicationController($scope,USER_ROLES,AuthFactory) {
      $scope.currentUser = null;
      $scope.userRoles = USER_ROLES;
      $scope.isAuthorized = AuthFactory.isAuthorized;

      $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
      };
    }
})();
