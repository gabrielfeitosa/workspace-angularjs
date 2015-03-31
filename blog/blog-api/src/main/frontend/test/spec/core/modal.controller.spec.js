(function(){
  'use strict';

 describe('Controller Modal', function(){

    beforeEach(module('core.app'));
    var modalInstanceMock = {
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    };
    var ctrl;
    beforeEach(inject(function($controller){
      ctrl = $controller('ModalController',{$modalInstance: modalInstanceMock});
    }));

    describe('Validar inicialização do controller', function(){
      it('Deveria instanciar o controller',function(){
        expect(ctrl).toBeDefined();
      });
      it('ok deveria ser uma função',function(){
        expect(angular.isFunction(ctrl.ok)).toBeTruthy();
      });
      it('cancel deveria ser uma função',function(){
        expect(angular.isFunction(ctrl.cancel)).toBeTruthy();
      });
    });

    describe('Validar funções',function(){
      it('Deveria aceitar o termo do modal ', function(){
        expect(modalInstanceMock.close).not.toHaveBeenCalled();
        ctrl.ok();
        expect(modalInstanceMock.close).toHaveBeenCalledWith(true);
      });

      it('Deveria cancelar o termo do modal ', function(){
        expect(modalInstanceMock.dismiss).not.toHaveBeenCalled();
        ctrl.cancel();
        expect(modalInstanceMock.dismiss).toHaveBeenCalledWith('cancel');
      });
    });
  });
})();
