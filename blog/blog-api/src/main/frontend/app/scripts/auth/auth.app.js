(function() {
  'use strict';

  angular.module('auth.app', [])
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    guest: 'guest'
  })
  .run(function ($rootScope, AUTH_EVENTS, AuthFactory) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthFactory.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if (AuthFactory.isAuthenticated()) {
          // user is not allowed
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        } else {
          // user is not logged in
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      }
    });
  }) ;

})();
