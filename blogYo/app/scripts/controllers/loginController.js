'use strict';

angular.module('blogYoApp')
  .controller('LoginController', ['$scope', 'UserFactory', 'LoginService', 'toasterFactory', function ($scope, UserFactory, LoginService, toasterFactory) {

    var usuario = UserFactory.getUser();
    $scope.user = usuario || [];

    $scope.$watch('user', function () {
      UserFactory.setUser($scope.user);
    }, true);

    $scope.isLogged = function () {
      return UserFactory.isLogged();
    };

    $scope.doLogin = function (email, pass) {
      LoginService.login({email: email, senha: pass}, function (data) {
        $scope.user = data;
      }).$promise.then(function () {
          toasterFactory.successMsg('Foiiiiiiii Brasil!!!');
        }).catch(function (response) {
          //toasterFactory.errorMsg('ERRO: ' + response.status + response.data);
          toasterFactory.errorMsg('ERRO: ' + response.status);
        });
    };

    $scope.doLogout = function () {
      $scope.user = [];
    };

  }]);
