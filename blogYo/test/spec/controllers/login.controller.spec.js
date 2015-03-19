(function(){
'use strict';

describe('Controlador: LoginController', function(){

  beforeEach(module('blogYoApp'));
  var ctrl,createController,scope;
  beforeEach(inject(function($controller,$rootScope){
    scope = $rootScope.$new();
    createController = function(){
      return $controller('LoginController',{$scope: scope});
    }
    ctrl = createController();
  }));

  describe('Validar a inicialização do Controlador', function(){
    it('Deveria instanciar o controlador com sucesso',function(){
      expect(ctrl).toBeDefined();
    });

    // it('watches the name and updates the counter', function () {
    //         expect(scope.counter).toBe(0);
    //         scope.name = 'Batman';
    //         scope.$digest();
    //         expect(scope.counter).toBe(1);
    //     });
  });
});
})();
