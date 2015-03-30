(function(){
'use strict';

describe('Controlador: LoginController', function(){

  beforeEach(module('blog.app'));
  var usuarioMock = {login: 'gabrielfeitosa', email: 'test@xpto.tt'};

  var $rootScope,deferred,state;
  beforeEach(inject(function(_$state_,$q, _$rootScope_){
      state = _$state_;
      spyOn(state,'go');
      spyOn(state,'transitionTo');
      $rootScope = _$rootScope_;
      deferred = $q.defer();
    })
  );

  var ctrl,createController, AuthFactory,RouterFactory;
  beforeEach(inject(function($controller,_AuthFactory_,_RouterFactory_){
    AuthFactory = _AuthFactory_;
    RouterFactory = _RouterFactory_;
    spyOn(RouterFactory,'reload');
    spyOn(AuthFactory, 'logar').and.returnValue(deferred.promise);
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
      expect(ctrl.user).toEqualData({});
    });


    it('Usuário já está logado', function(){
      spyOn(AuthFactory,'getUser').and.returnValue(usuarioMock);
      expect(ctrl.user).toEqualData({});
      ctrl = createController();
      expect(ctrl.user).toEqualData(usuarioMock);
      expect(AuthFactory.getUser).toHaveBeenCalled();
    });

  });

  describe('Validar as regras do controlador', function(){

    it('Deveria retornar que não está logado', function(){
      spyOn(AuthFactory,'isLogado').and.returnValue(false);
      expect(ctrl.isLogado()).toBeFalsy();
      expect(AuthFactory.isLogado).toHaveBeenCalled();
    });

    it('Deveria dar erro ao fazer login', function(){
      spyOn(AuthFactory,'getUser');
      expect(ctrl.user).toEqualData({});
      deferred.reject();
      ctrl.doLogin('test@xpto.tt','blog');
      $rootScope.$apply();
      expect(AuthFactory.logar).toHaveBeenCalledWith('test@xpto.tt','blog');
      expect(ctrl.user).toEqualData({});
      expect(AuthFactory.getUser).not.toHaveBeenCalled();
    });

    it('Deveria fazer login com sucesso', function(){
      expect(ctrl.user).toEqualData({});
      spyOn(AuthFactory,'getUser').and.returnValue(usuarioMock);
      deferred.resolve(usuarioMock);
      ctrl.doLogin('test@xpto.tt','blog');
      $rootScope.$apply();
      expect(AuthFactory.logar).toHaveBeenCalledWith('test@xpto.tt','blog');
      expect(AuthFactory.getUser).toHaveBeenCalled();
      expect(ctrl.user).toEqualData(usuarioMock);
    });

    it('Deveria fazer logout',function(){
      spyOn(AuthFactory,'logout');
      ctrl.user = usuarioMock;
      expect(AuthFactory.logout).not.toHaveBeenCalled();
      expect(ctrl.user).toEqualData(usuarioMock);
      ctrl.doLogout();
      expect(AuthFactory.logout).toHaveBeenCalled();
    });
  });
});
})();
