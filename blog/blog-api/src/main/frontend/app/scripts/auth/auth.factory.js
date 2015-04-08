(function() {
    'use strict';

  angular
      .module('auth.app')
      .factory('AuthFactory', AuthFactory);

  AuthFactory.$inject = ['$http', 'Session'];

  function AuthFactory($http, SessionService) {
    var service = {
        login: login,
        isAuthenticated: isAuthenticated,
        isAuthorized: isAuthorized
    };

    return service;

    function login(credentials) {
      return $http
        .post('/login', credentials)
        .then(function (res) {
          SessionService.create(res.data.id, res.data.user.id,
                         res.data.user.role);
          return res.data.user;
        });
    }

    function isAuthenticated() {
      return !!SessionService.userId;
    }

    function isAuthorized(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (isAuthenticated() && authorizedRoles.indexOf(SessionService.userRole) !== -1);
    }
  }

})();
