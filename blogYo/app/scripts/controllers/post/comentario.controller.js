(function(){
'use strict';

angular.module('blogYoApp').controller('ComentarioController', ComentarioController);

ComentarioController.$inject = ['$stateParams','ComentarioService'];
/*jshint latedef: false */
function ComentarioController($stateParams,ComentarioService) {
  var vm = this;

  vm.adicionarComentario = adicionarComentario;

  iniciar();

  //////////////////////////////

  function iniciar(){
    vm.comentario = {};
    vm.comentarios = ComentarioService.query({id: $stateParams.id});
  }

  function adicionarComentario(){
    ComentarioService.save({id: $stateParams.id},vm.comentario, function(data){
      if(!vm.comentarios){
          vm.comentarios= [];
      }
      vm.comentarios.push(data);
    });
    vm.comentario = {};
  }
}
})();
