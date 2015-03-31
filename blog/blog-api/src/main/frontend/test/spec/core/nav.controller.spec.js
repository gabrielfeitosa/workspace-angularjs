(function(){
   'use strict';

   describe('Controlador: NavController', function(){

      beforeEach(module('core.app'));

      var ctrl,RouterFactory;
      beforeEach(inject(function($controller,_RouterFactory_){
        RouterFactory = _RouterFactory_;
        ctrl = $controller('NavController');
      }));

      describe('Validar inicialização do Controlador', function(){
        it('Deveria instanciar o controlador ',function(){
          expect(ctrl).toBeDefined();
        });

        it('Deveria possuir o menu preenchido',function(){
          expect(ctrl.menu).toBeDefined();
          expect(ctrl.menu.length).toBeGreaterThan(0);
        });
      });

      describe('Validar o estado da navegação', function(){
        it('A classe deveria ser inativa', function(){
          spyOn(RouterFactory,'isState').and.returnValue(false);
          expect(RouterFactory.isState).not.toHaveBeenCalled();
          var retorno = ctrl.activeClass('home');
          expect(RouterFactory.isState).toHaveBeenCalledWith('home');
          expect(retorno).toBeFalsy();
        });

        it('A classe deveria ser ativa', function(){
          spyOn(RouterFactory,'isState').and.returnValue(true);
          expect(RouterFactory.isState).not.toHaveBeenCalled();
          var retorno = ctrl.activeClass('home');
          expect(RouterFactory.isState).toHaveBeenCalledWith('home');
          expect(retorno).toBeTruthy();
        });
      });
   });
})();
