(function(){
   'use strict';

  describe('Factory Autenticação', function(){

    var usuarioLogado = {nome: 'Gabriel', login: 'gabrielfeitosa'};

    beforeEach(module('login.app'));

    var AuthServiceMock,localStorageServiceMock,AuthFactory,$rootScope,deferred;
    beforeEach(module(function ($provide) {
      AuthServiceMock = {
        logar: function () {
          return deferred.promise;
        },
        logout: function(){
          return deferred.promise;
        }
      };
      localStorageServiceMock = jasmine.createSpyObj('localStorageService',['get','set','remove']);
      $provide.value('AuthService', AuthServiceMock);
      $provide.value('localStorageService', localStorageServiceMock);
    }));


    beforeEach(inject(function(_AuthFactory_,_$q_, _$rootScope_) {
      AuthFactory = _AuthFactory_;
      deferred = _$q_.defer();
      $rootScope = _$rootScope_;
    }));

    describe('Validar inicialização da Factory', function(){
      it('Deveria instanciar a factory',function(){
        expect(AuthFactory).toBeDefined();
      });
      it('logar deveria ser uma função',function(){
        expect(angular.isFunction(AuthFactory.logar)).toBeTruthy();
      });
      it('logout deveria ser uma função',function(){
        expect(angular.isFunction(AuthFactory.logout)).toBeTruthy();
      });
      it('getUser deveria ser uma função',function(){
        expect(angular.isFunction(AuthFactory.getUser)).toBeTruthy();
      });
      it('isLogado deveria ser uma função',function(){
        expect(angular.isFunction(AuthFactory.isLogado)).toBeTruthy();
      });
      it('set não deveria ser uma função',function(){
        expect(angular.isFunction(AuthFactory.set)).toBeFalsy();
      });
      it('get não deveria ser uma função',function(){
        expect(angular.isFunction(AuthFactory.get)).toBeFalsy();
      });
    });

    describe('Validar logar', function(){

      it('Deveria dar error ao logar', function(){
        expect(localStorageServiceMock.set).not.toHaveBeenCalled();
        AuthFactory.logar('gabriel@test.com','pass');
        deferred.reject();
        $rootScope.$apply();
        expect(localStorageServiceMock.set).not.toHaveBeenCalled();
      });


      it('Deveria dar error ao logar', function(){
        expect(localStorageServiceMock.set).not.toHaveBeenCalled();
        AuthFactory.logar('gabriel@test.com','pass');
        deferred.resolve(usuarioLogado);
        $rootScope.$apply();
        expect(localStorageServiceMock.set).toHaveBeenCalledWith('user',usuarioLogado);
      });

    });

    describe('Validar logout', function(){
      it('Deveria dar erro ao fazer logout', function(){
        expect(localStorageServiceMock.remove).not.toHaveBeenCalled();
        AuthFactory.logout();
        deferred.reject();
        $rootScope.$apply();
        expect(localStorageServiceMock.remove).not.toHaveBeenCalled();
      });

      it('Deveria fazer logout', function(){
        expect(localStorageServiceMock.remove).not.toHaveBeenCalled();
        AuthFactory.logout();
        deferred.resolve();
        $rootScope.$apply();
        expect(localStorageServiceMock.remove).toHaveBeenCalledWith('user');
      });
    });

    describe('Validar serviços com mock no storage',function(){
      var user;
      beforeEach(function(){
        localStorageServiceMock.get = function(){
          return user;
        };
      });

      afterEach(function(){
        user = undefined;
      });

      describe('Validar getUser', function(){
        it('Deveria retornar vazio', function(){
          expect(AuthFactory.getUser()).toEqualData({});
          user = undefined;
          expect(AuthFactory.getUser()).toEqualData({});
          user = null;
          expect(AuthFactory.getUser()).toEqualData({});
        });

        it('Deveria retornar um usuário', function(){
          expect(AuthFactory.getUser()).toEqualData({});
          user = usuarioLogado;
          expect(AuthFactory.getUser()).toEqualData(usuarioLogado);
        });
      });

      describe('Validar isLogado', function(){
        it('Deveria retornar false', function(){
          expect(AuthFactory.isLogado()).toBeFalsy();
        });
        it('Deveria retornar true', function(){
          user = usuarioLogado;
          expect(AuthFactory.isLogado()).toBeTruthy();
        });
      });
    });
   });
})();
