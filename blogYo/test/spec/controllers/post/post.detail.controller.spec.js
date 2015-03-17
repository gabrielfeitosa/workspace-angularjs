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

   beforeEach(function() {
       jasmine.addMatchers(customMatchers);
   });

   beforeEach(module('blogYoApp'));

   var ctrl, $httpBackend, _AuthFactory;

   beforeEach(inject(function(_$httpBackend_, $controller,RouterFactory,AuthFactory) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('blog-api/posts/1').
      respond({id:1,usuario:'fulano',titulo:'Primeiro Post',texto:'Texto do primeiro post',dataRegistro:1426506988126});
    //Gambiarra!!!!
    $httpBackend.expectGET('views/post/post.list.html').respond('');
    _AuthFactory = AuthFactory;
    spyOn(RouterFactory, 'getParam').and.returnValue(1);
    ctrl = $controller('PostDetailController');
  }));

   it('deveria criar controlador com sucesso', function () {
      expect(ctrl).toBeDefined();
   });

   it('resgatando o post do serviço', function() {
      expect(ctrl.post).toEqualData({});
      $httpBackend.flush();
      expect(ctrl.post).toEqualData({id:1,usuario:'fulano',titulo:'Primeiro Post',texto:'Texto do primeiro post',dataRegistro:1426506988126});
   });

   it('verificando se o post é editavel por um usuário não logado', function(){
     $httpBackend.flush();
     expect(ctrl.isEditable()).toBeFalsy();
   });

   it('verificando se o post é editavel por um usuário logado e que não é dono do post', function(){
     $httpBackend.flush();
     spyOn(_AuthFactory, 'isLogged').and.returnValue(true);
     spyOn(_AuthFactory, 'getUser').and.returnValue({login: 'XPTO'});
     expect(ctrl.isEditable()).toBeFalsy();
   });

   it('verificando se o post é editavel por um usuário logado e que é dono do post', function(){
     $httpBackend.flush();
     spyOn(_AuthFactory, 'isLogged').and.returnValue(true);
     spyOn(_AuthFactory, 'getUser').and.returnValue({login: 'fulano'});
     expect(ctrl.isEditable()).toBeTruthy();
   });
 });
 })();
