(function(){
   'use strict';

   describe('Factory : ModalFactory', function(){

      var fakeModal = {
         result: {
             then: function(confirmCallback, cancelCallback) {
                 this.confirmCallBack = confirmCallback;
                 this.cancelCallback = cancelCallback;
             }
         }
      };

      beforeEach(module(function ($provide) {
        $provide.value('$modal', fakeModal);
      }));

      beforeEach(module('blog.app'));

      var modalFactory;

      beforeEach(inject(function(_ModalFactory_){
        modalFactory = _ModalFactory_;
      }));

      describe('Validar funcionalidades da Factory', function(){
        var mockPromiseSucesso = {
          then: function(successFn) {
            successFn('ok');
            }
        };

        var mockPromiseErro = {
          then: function(successFn,erroFn) {
            erroFn('nok');
            }
        };
        it('Deveria instanciar a factory',function(){
          expect(modalFactory).toBeDefined();
        });

        it('Deveria confirmar a função showConfirmar', function(){
          spyOn(modalFactory,'showConfirmar').and.returnValue(mockPromiseSucesso);
          modalFactory.showConfirmar().then(function(data){
            expect(data).toMatch('ok');
          });
        });

        it('Deveria cancelar a função showConfirmar', function(){
          spyOn(modalFactory,'showConfirmar').and.returnValue(mockPromiseErro);
          modalFactory.showConfirmar().then(function(){},
          function(err){
            expect(err).toMatch('nok');
          });
        });

      });
   });
})();
