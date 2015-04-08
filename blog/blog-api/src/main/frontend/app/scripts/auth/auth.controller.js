(function() {
  'use strict';

  angular.module('auth.app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthFactory'];

  function LoginController($scope, $rootScope, AUTH_EVENTS, AuthFactory) {
    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.login = function (credentials) {
      AuthFactory.login(credentials).then(function (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
  }
})();
