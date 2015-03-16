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

   var ctrl, $httpBackend;

   beforeEach(inject(function(_$httpBackend_, $controller,RouterFactory) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('blog-api/posts/1').
      respond({id:1,usuario:'fulano',titulo:'Primeiro Post',texto:'Texto do primeiro post',dataRegistro:1426506988126});
    spyOn(RouterFactory, 'getParam').and.returnValue(1);
    ctrl = $controller('PostDetailController');
  }));

   it('deveria criar controlador com sucesso', function () {
      expect(ctrl).toBeDefined();
   });//

   it('resgatando o post do serviço', function() {
      expect(ctrl.post).toEqualData({});
      $httpBackend.flush();
      // expect(ctrl.post).toBeDefined();
      // expect(ctrl.post).toEqualData({id:1,usuario:'fulano',titulo:'Primeiro Post',texto:'Texto do primeiro post',dataRegistro:1426506988126});
   });

 });
 })();
