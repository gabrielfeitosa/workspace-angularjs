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

    var $rootScope,ctrl,PostService,deferred;

    beforeEach(inject(function ($q, _$rootScope_) {
        $rootScope = _$rootScope_;
        deferred = $q.defer();
        deferred.resolve([{id:1,usuario:'fulano',titulo:'Primeiro Post',texto:'Texto do primeiro post',dataRegistro:1426506988126},
                 {id:2,usuario:'maria',titulo:'Outro Post',texto:'Mais um post para teste',dataRegistro:1426506988126}]); //  always resolved, you can do it from your spec
      })
    );

   beforeEach(inject(function($controller,_PostService_) {
     PostService = _PostService_;
     spyOn(PostService, 'query').and.returnValue(deferred.promise);
     ctrl = $controller('PostListController');
   }));

   it('deveria criar controlador com sucesso', function () {
      expect(ctrl).toBeDefined();
   });

   it('deveria possuir um array vazio', function() {
     expect(ctrl.posts).toEqualData([]);
     expect(ctrl.posts.length).toEqual(0);
   });

   it('deveria adicionar 2 post na lista de posts', function() {
      $rootScope.$apply();
      expect(ctrl.posts.length).toEqual(2);
      expect(ctrl.posts).toEqualData([{id:1,usuario:'fulano',titulo:'Primeiro Post',texto:'Texto do primeiro post',dataRegistro:1426506988126},
               {id:2,usuario:'maria',titulo:'Outro Post',texto:'Mais um post para teste',dataRegistro:1426506988126}]);
   });
 });
 })();
