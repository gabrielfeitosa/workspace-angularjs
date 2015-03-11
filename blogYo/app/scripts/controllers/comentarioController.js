(function(){
'use strict';

function ComentarioController($stateParams,ComentarioService) {
  var vm = this;

  vm.comentarios = ComentarioService.query({id: $stateParams.id});
  vm.comentario = {};

  function adicionarComentario(){
    ComentarioService.save({id: $stateParams.id},vm.comentario, function(data){
      if(!vm.comentarios){
          vm.comentarios= [];
      }
      vm.comentarios.push(data);
    });
    vm.comentario = {};
  }

  vm.adicionarComentario = adicionarComentario;
}

ComentarioController.$inject = ['$stateParams','ComentarioService'];

angular.module('blogYoApp').controller('ComentarioController', ComentarioController);
})();
