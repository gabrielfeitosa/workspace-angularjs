(function(){
'use strict';

angular.module('blogYoApp').controller('ComentarioController', ComentarioController);

ComentarioController.$inject = ['$stateParams','ComentarioService'];

function ComentarioController($stateParams,ComentarioService) {
  var vm = this;

  vm.adicionarComentario = adicionarComentario;

  iniciar();

  //////////////////////////////

  function iniciar(){
    vm.comentario = {};
    ComentarioService.query($stateParams.id).then(function(data){
      vm.comentarios = data;
    });
  }

  function adicionarComentario(){
    ComentarioService.save($stateParams.id,vm.comentario).then(function(data){
      if(!vm.comentarios){
          vm.comentarios= [];
      }
      vm.comentarios.push(data);
    });
    vm.comentario = {};
  }
}
})();
