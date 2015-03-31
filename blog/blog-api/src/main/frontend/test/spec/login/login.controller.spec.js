(function(){
'use strict';

describe('Controlador Login', function(){

  beforeEach(module('login.app'));

  var usuarioMock = {login: 'gabrielfeitosa', email: 'test@xpto.tt'};

  var $rootScope,deferred;
  beforeEach(inject(function(_$state_,$q, _$rootScope_){
      spyOn(_$state_,'go');
      spyOn(_$state_,'transitionTo');
      $rootScope = _$rootScope_;
      deferred = $q.defer();
    })
  );

  var ctrl,createController, AuthFactory,RouterFactory;
  beforeEach(inject(function($controller,_AuthFactory_,_RouterFactory_){
    AuthFactory = _AuthFactory_;
    RouterFactory = _RouterFactory_;
    createController = function(){
      return $controller('LoginController');
    };
    ctrl = createController();
  }));

  describe('Validar a inicialização do Controlador', function(){

    it('Deveria instanciar o controlador com sucesso',function(){
      expect(ctrl).toBeDefined();
    });

    it('Usuário deveria ser vazio', function(){
      spyOn(AuthFactory,'getUser').and.returnValue({});
      ctrl = createController();
      expect(ctrl.user).toEqualData({});
    });

    it('Usuário já está logado', function(){
      spyOn(AuthFactory,'getUser').and.returnValue(usuarioMock);
      ctrl = createController();
      expect(ctrl.user).toEqualData(usuarioMock);
      expect(AuthFactory.getUser).toHaveBeenCalled();
    });

  });

  describe('Validar as regras do controlador', function(){

    it('Deveria retornar que não está logado', function(){
      spyOn(AuthFactory,'isLogado').and.returnValue(false);
      expect(ctrl.isLogado()).toBeFalsy();
    });

    describe('Validar regras de login', function(){

      beforeEach(function(){
        spyOn(AuthFactory, 'logar').and.returnValue(deferred.promise);
      });
      it('Deveria dar erro ao fazer login', function(){
        spyOn(AuthFactory,'getUser').and.returnValue({});
        ctrl = createController();
        expect(ctrl.user).toEqualData({});
        deferred.reject();
        ctrl.doLogin('test@xpto.tt','blog');
        $rootScope.$apply();
        expect(AuthFactory.logar).toHaveBeenCalledWith('test@xpto.tt','blog');
        expect(ctrl.user).toEqualData({});
      });

      it('Deveria fazer login com sucesso', function(){
        spyOn(AuthFactory,'getUser').and.returnValue({});
        ctrl = createController();
        expect(ctrl.user).toEqualData({});
        deferred.resolve(usuarioMock);
        ctrl.doLogin('test@xpto.tt','blog');
        $rootScope.$apply();
        expect(AuthFactory.logar).toHaveBeenCalledWith('test@xpto.tt','blog');
        expect(AuthFactory.getUser).toHaveBeenCalled();
        expect(ctrl.user).toEqualData(usuarioMock);
      });
    });

    describe('Validar regras para logout', function(){
      beforeEach(function(){
        spyOn(RouterFactory,'reload');
        spyOn(AuthFactory, 'logout').and.returnValue(deferred.promise);
        ctrl = createController();
        ctrl.user = usuarioMock;
      });
      it('Não deveria fazer logout', function(){
        expect(AuthFactory.logout).not.toHaveBeenCalled();
        expect(ctrl.user).toEqualData(usuarioMock);
        deferred.reject();
        ctrl.doLogout();
        $rootScope.$apply();
        expect(AuthFactory.logout).toHaveBeenCalled();
        expect(RouterFactory.reload).not.toHaveBeenCalled();
      });

      it('Deveria fazer logout',function(){
        expect(AuthFactory.logout).not.toHaveBeenCalled();
        expect(ctrl.user).toEqualData(usuarioMock);
        deferred.resolve();
        ctrl.doLogout();
        $rootScope.$apply();
        expect(AuthFactory.logout).toHaveBeenCalled();
        expect(RouterFactory.reload).toHaveBeenCalled();
      });
    });
  });
});
})();
