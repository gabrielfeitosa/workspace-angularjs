(function(){
   'use strict';

   describe('Controlador: ModalController', function(){

      beforeEach(module('blog.app'));

      var modalInstance;
      beforeEach(function(){
        modalInstance = {
          close: jasmine.createSpy('modalInstance.close'),
          dismiss: jasmine.createSpy('modalInstance.dismiss'),
          result: {
            then: jasmine.createSpy('modalInstance.result.then')
          }
        };
      });

      var ctrl;
      beforeEach(inject(function($controller){
        ctrl = $controller('ModalController',{$modalInstance: modalInstance});
      }));

      describe('Validar inicialização do Controlador', function(){
        it('Deveria instanciar o controlador',function(){
          expect(ctrl).toBeDefined();
        });
      });

      describe('Validar as regras de negócio', function(){
        it('Deveria fechar o modal', function(){
          expect(modalInstance.close).not.toHaveBeenCalled();
          ctrl.ok();
          expect(modalInstance.close).toHaveBeenCalledWith(true);
        });

        it('Deveria cancelar o modal', function(){
          expect(modalInstance.dismiss).not.toHaveBeenCalled();
          ctrl.cancel();
          expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
        });
      });

   });
})();
