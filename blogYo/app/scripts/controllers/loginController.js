'use strict';

angular.module('blogYoApp')
.controller('LoginController',['$scope','UserFactory','LoginService', function($scope,UserFactory, LoginService){

  var usuario = UserFactory.getUser();
  $scope.user = usuario || [];

  $scope.$watch('user', function () {
    UserFactory.setUser($scope.user);
  }, true);

  $scope.isLogged = function(){
    return UserFactory.isLogged();
  };

	$scope.doLogin = function(email,pass){
    LoginService.login({email: email, senha: pass}, function(data){
      $scope.user = data;
    });
  };

  $scope.doLogout = function(){
    $scope.user = [];
  };

}]);
