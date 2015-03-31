(function(){
   'use strict';

  describe('Service Autenticação', function(){

    beforeEach(module('login.app'));

    var AuthService,$httpBackend;
    beforeEach(inject(function(_AuthService_,_$httpBackend_){
      AuthService = _AuthService_;
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Validar inicialização do Service', function(){
      it('Deveria instanciar o Service',function(){
        expect(AuthService).toBeDefined();
      });
      it('logar deveria ser uma função',function(){
        expect(angular.isFunction(AuthService.logar)).toBeDefined();
      });
      it('logout deveria ser uma função',function(){
        expect(angular.isFunction(AuthService.logout)).toBeDefined();
      });
    });

    describe('Validar logar', function(){
      it('Deveria dar error ao logar', function(){
        var statusMock = 404;
        var dataMock = 'error ao logar';
        $httpBackend.expectPOST('blog-api/api/auth/login').respond(statusMock,dataMock);
        var promise = AuthService.logar('gabriel@teste.com','pass');
        $httpBackend.flush();
        promise.then(function(){
          expect(false).toBeTruthy();
        },function(response){
          expect(response.status).toEqual(statusMock);
          expect(response.data).toEqual(dataMock);
        });
      });
      it('Deveria logar com sucesso', function(){
        var statusMock = 202;
        var dataMock = {login: 'gabrielfeitosa',nome:'Gabriel'};
        $httpBackend.expectPOST('blog-api/api/auth/login').respond(statusMock,dataMock);
        var promise = AuthService.logar('gabriel@teste.com','1234');
        $httpBackend.flush();
        promise.then(function(data){
          expect(data).toEqualData(dataMock);
        },function(){
          expect(false).toBeTruthy();
        });
      });
    });

    describe('Validar logout', function(){
      it('Deveria dar error ao fazer logout', function(){
        var statusMock = 404;
        var dataMock = 'error ou fazer logout';
        $httpBackend.expectPOST('blog-api/api/auth/logout').respond(statusMock,dataMock);
        var promise = AuthService.logout();
        $httpBackend.flush();
        promise.then(function(){
          expect(false).toBeTruthy();
        },function(response){
          expect(response.status).toEqual(statusMock);
          expect(response.data).toEqual(dataMock);
        });
      });
      it('Deveria fazer logout com sucesso', function(){
        var statusMock = 202;
        $httpBackend.expectPOST('blog-api/api/auth/logout').respond(statusMock);
        var promise = AuthService.logout();
        $httpBackend.flush();
        promise.then(function(){
          expect(true).toBeTruthy();
        },function(){
          expect(false).toBeTruthy();
        });
      });
    });
  });
})();
