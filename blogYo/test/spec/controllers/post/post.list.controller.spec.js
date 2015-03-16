(function(){
 'use strict';

 describe('Controller: PostListController', function(){

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

   var ctrl, $httpBackend;

   beforeEach(inject(function(_$httpBackend_, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('blog-api/posts').
      respond([{id:1,usuario:'fulano',titulo:'Primeiro Post',texto:'Texto do primeiro post',dataRegistro:1426506988126},
               {id:2,usuario:'maria',titulo:'Outro Post',texto:'Mais um post para teste',dataRegistro:1426506988126}]);
      ctrl = $controller('PostListController');
   }));

   it('deveria criar controlador com sucesso', function () {
      expect(ctrl).toBeDefined();
   });

   it('Recebendo 2 posts do serviço', function() {
      expect(ctrl.posts).toEqualData([]);
      $httpBackend.flush();
      expect(ctrl.posts.length).toEqual(2);
      expect(ctrl.posts).toEqualData([{id:1,usuario:'fulano',titulo:'Primeiro Post',texto:'Texto do primeiro post',dataRegistro:1426506988126},
               {id:2,usuario:'maria',titulo:'Outro Post',texto:'Mais um post para teste',dataRegistro:1426506988126}]);
   });

 });
 })();
