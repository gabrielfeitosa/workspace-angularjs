(function(){
 'use strict';

angular.module('blogYoApp').factory('RouterFactory',RouterFactory);

RouterFactory.$inject = ['$state','$stateParams'];

function RouterFactory($state,$stateParams){

  return {
    go : function(state,json){
      $state.go(state,json);
    },
    getParam: function(param){
      return $stateParams[param];
    }
  };
}

 })();
