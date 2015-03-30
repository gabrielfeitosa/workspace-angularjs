(function(){
'use strict';

angular.module('blog.app').controller('ComentarioController', ComentarioController);

ComentarioController.$inject = ['RouterFactory','ComentarioService'];

function ComentarioController(RouterFactory,ComentarioService) {
  var vm = this;

  vm.adicionarComentario = adicionarComentario;

  iniciar();

  //////////////////////////////

  function iniciar(){
    vm.comentario = {};
    ComentarioService.query(RouterFactory.getParam('id')).then(function(data){
      vm.comentarios = data;
    });
  }

  function adicionarComentario(){
    ComentarioService.save(RouterFactory.getParam('id'),vm.comentario).then(function(data){
      if(!vm.comentarios){
          vm.comentarios= [];
      }
      vm.comentarios.push(data);
    });
    vm.comentario = {};
  }
}
})();
