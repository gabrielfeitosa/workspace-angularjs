(function(){
 'use strict';

angular.module('blog.app')
  .controller('AboutController', AboutController);


function AboutController() {
  var vm = this;

  iniciar();

  //////////////////////////////

  function iniciar(){
    vm.titulo ='Nova página';
  }
}
})();
