(function(){
 'use strict';

 describe('Controller: PostDetailController', function(){

   var _post = {id:1,usuario:'fulano',titulo:'Primeiro Post',texto:'Texto do primeiro post',dataRegistro:1426506988126};

   var mockModalFactory,_mockPromiseModal;
   beforeEach(function() {
       mockModalFactory = {
           showConfirmar: function() {
               return _mockPromiseModal;
           }
       };
   });

  beforeEach(module('blogYoApp'));

   var $rootScope,deferred,state;
   beforeEach(inject(function(_$state_,$q, _$rootScope_){
       state = _$state_;
       spyOn(state,'go');
       spyOn(state,'transitionTo');
       $rootScope = _$rootScope_;
       deferred = $q.defer();
     })
   );


   var ctrl,PostService,AuthFactory,RouterFactory;
   beforeEach(inject(function($controller,_PostService_,_RouterFactory_,_AuthFactory_) {
     PostService = _PostService_;
     AuthFactory = _AuthFactory_;
     RouterFactory = _RouterFactory_;

     spyOn(PostService, 'get').and.returnValue(deferred.promise);
     spyOn(RouterFactory, 'getParam').and.returnValue(1);
     ctrl = $controller('PostDetailController',{ModalFactory: mockModalFactory});
   }));

   describe('Validar injeção de dependência do controlador', function(){
     it('deveria criar controlador com sucesso', function () {
         expect(ctrl).toBeDefined();
      });
   });

   describe('Validar se post está sendo preenchido...',function(){
     it('deveria possuir um post vazio', function() {
       expect(ctrl.post).toEqualData({});
     });

     it('deveria preencher conteúdo no post', function() {
       expect(ctrl.post).toEqualData({});
       deferred.resolve(_post);
       $rootScope.$apply();
       expect(ctrl.post).toEqualData(_post);
     });
   });

   describe('Validar se post editável ou não...',function(){
     it('deveria verificar que o post não é editável, usuário não está logado', function(){
      ctrl.post = _post;
      spyOn(AuthFactory, 'isLogged').and.returnValue(false);
      expect(ctrl.isEditable()).toBeFalsy();
     });

     it('deveria verificar que o post não é editável, usuário não é proprietário do post', function(){
       ctrl.post = _post;
       spyOn(AuthFactory, 'isLogged').and.returnValue(true);
       spyOn(AuthFactory, 'getUser').and.returnValue({login: 'alguem'});
       expect(ctrl.isEditable()).toBeFalsy();
     });

     it('deveria verificar que o post é editável', function(){
       ctrl.post = _post;
       spyOn(AuthFactory, 'isLogged').and.returnValue(true);
       spyOn(AuthFactory, 'getUser').and.returnValue({login: 'fulano'});
       expect(ctrl.isEditable()).toBeTruthy();
     });
   });

   describe('Validar a remoção de um post...', function(){
     var mockPromiseSucesso = {
       then: function(successFn, errorFn) {
            successFn();
        }
     };
     var mockPromiseErro = {
       then: function(successFn, errorFn) {
           expect(errorFn).toBeUndefined();
         }
     };
     it('deveria tentar deletar o post, mas desistir da remoção', function(){
       _mockPromiseModal = mockPromiseErro;
        spyOn(PostService, 'remove');
        spyOn(RouterFactory, 'go');
        ctrl.deletar();
        expect(PostService.remove).not.toHaveBeenCalled();
        expect(RouterFactory.go).not.toHaveBeenCalled();
     });

     it('deveria tentar deletar o post,mas o serviço abortou a remoção', function(){
       ctrl.post = _post;
       _mockPromiseModal = mockPromiseSucesso;
        spyOn(PostService, 'remove').and.returnValue(mockPromiseErro);
        spyOn(RouterFactory, 'go');
        ctrl.deletar();
        expect(PostService.remove).toHaveBeenCalledWith(1);
        expect(RouterFactory.go).not.toHaveBeenCalled();
     });

     it('deveria deletar o post e concluir a operação ',function(){
       _mockPromiseModal = mockPromiseSucesso;
       spyOn(PostService, 'remove').and.returnValue(mockPromiseSucesso);
       spyOn(RouterFactory, 'go');
       ctrl.deletar();
       expect(RouterFactory.go).toHaveBeenCalledWith('home');
     });
   });

 });
 })();
