(function(){
 'use strict';

 describe('Controller: PostDetailController', function(){

   var customMatchers = {
     toEqualData: function() {
       return {
         compare: function(actual, expected) {
           var result = {};
           result.pass = angular.equals(actual, expected);
           return result;
         }
       };
     }
   };

   var $rootScope,deferred,state;

   function getPostJson(){
     var post = {id:1,usuario:'fulano',titulo:'Primeiro Post',texto:'Texto do primeiro post',dataRegistro:1426506988126};
     return post;
   }

   function carregarPost(obj){
     deferred.resolve(obj);
     $rootScope.$apply();
   }

   beforeEach(function() {
       jasmine.addMatchers(customMatchers);
       module('blogYoApp');
   });

   beforeEach(inject(function(_$state_,$q, _$rootScope_){
       state = _$state_;
       spyOn(state,'go');
       spyOn(state,'transitionTo');
       $rootScope = _$rootScope_;
       deferred = $q.defer();
     }));

   var spyPromise,ctrl,PostService,AuthFactory,RouterFactory,mockModalFactory;

   beforeEach(function() {
       mockModalFactory = {
           showConfirmar: function() {
               return deferred.promise;
           }
       };
   });

   beforeEach(inject(function($controller,_PostService_,_RouterFactory_,_AuthFactory_) {
     PostService = _PostService_;
     AuthFactory = _AuthFactory_;
     RouterFactory = _RouterFactory_;

     spyOn(PostService, 'get').and.returnValue(deferred.promise);
     spyOn(RouterFactory, 'getParam').and.returnValue(1);
     ctrl = $controller('PostDetailController',{ModalFactory: mockModalFactory});
   }));

   it('deveria criar controlador com sucesso', function () {
      expect(ctrl).toBeDefined();
   });

   it('deveria possuir um post vazio', function() {
      expect(ctrl.post).toEqualData({});
   });

   it('deveria preecher conteúdo no post', function() {
    carregarPost(getPostJson());
    expect(ctrl.post).toEqualData(getPostJson());
   });

   it('deveria verificar que o post não é editável, usuário não está logado', function(){
    carregarPost(getPostJson());
    spyOn(AuthFactory, 'isLogged').and.returnValue(false);
    expect(ctrl.isEditable()).toBeFalsy();
   });

   it('deveria verificar que o post não é editável, usuário não é proprietário do post', function(){
     carregarPost(getPostJson());
     spyOn(AuthFactory, 'isLogged').and.returnValue(true);
     spyOn(AuthFactory, 'getUser').and.returnValue({login: 'alguem'});
     expect(ctrl.isEditable()).toBeFalsy();
   });

   it('deveria verificar que o post é editável', function(){
     carregarPost(getPostJson());
     spyOn(AuthFactory, 'isLogged').and.returnValue(true);
     spyOn(AuthFactory, 'getUser').and.returnValue({login: 'fulano'});
     expect(ctrl.isEditable()).toBeTruthy();
   });

   it('deveria tentar deletar o post e recusar', function(){
     spyOn(mockModalFactory, 'showConfirmar').and.callThrough();
    //  carregarPost(getPostJson());
     expect(ctrl.modalCancelado).toBeUndefined();
     ctrl.deletar();
     deferred.reject();
     $rootScope.$apply();
     expect(ctrl.modalCancelado).toBeTruthy();

   });
 });
 })();
