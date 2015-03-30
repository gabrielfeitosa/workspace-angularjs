(function(){
 'use strict';

angular.module('core.app').factory('RouterFactory',RouterFactory);

RouterFactory.$inject = ['$state','$stateParams'];

function RouterFactory($state,$stateParams){

  return {
    go : function(state,json){
      $state.go(state,json);
    },
    getParam: function(param){
      return $stateParams[param];
    },
    isState: function(state){
      return $state.is(state);
    },
    reload: function(){
      $state.go($state.current, {}, {reload: true});
    }
  };
}

 })();
