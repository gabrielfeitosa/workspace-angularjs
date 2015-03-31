(function(){
   'use strict';

   describe('Factory : ModalFactory', function(){

      beforeEach(module('core.app'));

      var modalInstanceMock = {
        result: {
          then: function(confirmCallback, cancelCallback) {
              console.log(confirmCallback+' '+ cancelCallback);
              this.confirmCallBack = confirmCallback;
              this.cancelCallback = cancelCallback;
          }
        },
        close: function( item ) {
            console.log('close');
            //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
            this.result.confirmCallBack( item );
        },
        dismiss: function( type ) {
          console.log('dismiss '+type);
            //The user clicked cancel on the modal dialog, call the stored cancel callback
            this.result.cancelCallback( type );
        }
      };

      var $modalMock;
      beforeEach(module(function($provide){
        $modalMock = {
          open: function(){
            return modalInstanceMock;
          }
        };
        $provide.value('$modal',$modalMock);
      }));

      var ModalFactory;
      beforeEach(inject(function(_ModalFactory_){
        ModalFactory = _ModalFactory_;
      }));

      describe('Validar funcionalidades da Factory', function(){
        it('Deveria instanciar a factory', function(){
          expect(ModalFactory).toBeDefined();
        });
        it('showConfirmar deveria ser uma função',function(){
          expect(angular.isFunction(ModalFactory.showConfirmar)).toBeTruthy();
        });
        // it('Deveria abrir o modal', function(){
        //   var result = ModalFactory.showConfirmar();
        //   modalInstanceMock.dismiss('cancel');
        //   result.then(
        //     function(data){
        //       console.log('s'+data);
        //     },
        //     function(data){
        //       console.log('e'+data);
        //     }
        //   );
        //
        // });
      });
   });
})();
