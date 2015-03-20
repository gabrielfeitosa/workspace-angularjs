(function(){
   'use strict';

   describe('Factory : ModalFactory', function(){

      var fakeModal = {
         result: {
             then: function(confirmCallback, cancelCallback) {
                 //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                 this.confirmCallBack = confirmCallback;
                 this.cancelCallback = cancelCallback;
             }
         },
         close: function( item ) {
             //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
             this.result.confirmCallBack( item );
         },
         dismiss: function( type ) {
             //The user clicked cancel on the modal dialog, call the stored cancel callback
             this.result.cancelCallback( type );
         }
      };

      beforeEach(module(function ($provide) {
        $provide.value('$modal', fakeModal);
      }));

      beforeEach(module('blogYoApp'));

      var modalFactory;

      beforeEach(inject(function(_ModalFactory_){
        modalFactory = _ModalFactory_;
      }));

      describe('Validar funcionalidades da Factory', function(){
        var mockPromiseSucesso = {
          then: function(successFn,nok) {
            nok({});
            }
        };
        it('Deveria instanciar a factory',function(){
          expect(modalFactory).toBeDefined();
        });

        it('Deveria confirmar a função showConfirmar', function(){
          spyOn(modalFactory,'showConfirmar').and.returnValue(mockPromiseSucesso);
          modalFactory.showConfirmar().then(function(){
            console.log('ddd');
          }, function(){
            console.log('dkldkl');
          });

        });

      });
   });
})();
