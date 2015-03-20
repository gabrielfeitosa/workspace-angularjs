(function(){
'use strict';

describe('Controlador: LoginController', function(){

  var mockPromiseErro = {
    then: function(successFn, errorFn) {
        expect(errorFn).toBeUndefined();
      }
  };

  var mockPromiseSucesso = {
    then: function(successFn) {
        successFn(usuarioMock);
      }
  };

  beforeEach(module('blogYoApp'));
  var usuarioMock = {login: 'gabrielfeitosa', email: 'test@xpto.tt'};

  var ctrl,createController,scope, AuthFactory;
  beforeEach(inject(function($controller,$rootScope,_AuthFactory_){
    scope = $rootScope.$new();
    AuthFactory = _AuthFactory_;

    createController = function(){
      return $controller('LoginController',{$scope: scope});
    };
    ctrl = createController();
  }));

  describe('Validar a inicialização do Controlador', function(){
    it('Deveria instanciar o controlador com sucesso',function(){
      expect(ctrl).toBeDefined();
    });

    it('Usuário deveria ser vazio', function(){
      expect(ctrl.user).toEqualData({});
    });

    it('Preencher usuário',function(){
      expect(ctrl.user).toEqualData({});
      spyOn(AuthFactory,'setUser');
      usuarioMock = {login: 'gabrielfeitosa', email: 'test@xpto.tt'};
      ctrl.user = usuarioMock;
      expect(AuthFactory.setUser).not.toHaveBeenCalled();
      scope.$digest();
      expect(AuthFactory.setUser).toHaveBeenCalledWith(usuarioMock);
    });

    it('Usuário já está logado', function(){
      spyOn(AuthFactory,'getUser').and.returnValue(usuarioMock);
      spyOn(AuthFactory,'setUser');
      expect(ctrl.user).toEqualData({});
      ctrl = createController();
      expect(ctrl.user).toEqualData(usuarioMock);
      expect(AuthFactory.setUser).not.toHaveBeenCalled();
    });

  });

  describe('Validar as regras do controlador', function(){

    it('Deveria retornar que não está logado', function(){
      spyOn(AuthFactory,'isLogged').and.returnValue(false);
      expect(ctrl.isLogged()).toBeFalsy();
      expect(AuthFactory.isLogged).toHaveBeenCalled();
    });

    it('Deveria dar erro ao fazer login', function(){
      spyOn(AuthFactory,'logar').and.returnValue(mockPromiseErro);
      expect(ctrl.user).toEqualData({});
      ctrl.doLogin('test@xpto.tt','blog');
      expect(ctrl.user).toEqualData({});
      expect(AuthFactory.logar).toHaveBeenCalledWith('test@xpto.tt','blog');
    });

    it('Deveria fazer login com sucesso', function(){
      spyOn(AuthFactory,'logar').and.returnValue(mockPromiseSucesso);
      expect(ctrl.user).toEqualData({});
      ctrl.doLogin('test@xpto.tt','blog');
      expect(ctrl.user).toEqualData(usuarioMock);
    });

    it('Deveria fazer logout',function(){
      spyOn(AuthFactory,'logout');
      ctrl.user = usuarioMock;
      expect(AuthFactory.logout).not.toHaveBeenCalled();
      expect(ctrl.user).toEqualData(usuarioMock);
      ctrl.doLogout();
      expect(AuthFactory.logout).toHaveBeenCalled();
      expect(ctrl.user).toEqualData({});
    });
  });
});
})();
