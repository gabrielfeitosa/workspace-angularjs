'use strict';

/**
 * @ngdoc function
 * @name blogYoApp.controller:ComentariosCtrl
 * @description
 * # ComentariosCtrl
 * Controller of the blogYoApp
 */
angular.module('blogYoApp')
  .controller('ComentarioController', ['$scope','$stateParams','ComentarioService', function ($scope,$stateParams,ComentarioService) {
    $scope.comentarios = ComentarioService.query({id: $stateParams.id});
    $scope.comentario = {};

    $scope.adicionarComentario = function(){
      ComentarioService.save({id: $stateParams.id},$scope.comentario, function(data){
      if(!$scope.comentarios){
     		 $scope.comentarios= [];
     	}
      $scope.comentarios.push(data);
    });
 		 $scope.comentario = {};
 	 };
  }]);
