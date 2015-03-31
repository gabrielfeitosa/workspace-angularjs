(function(){
 'use strict';

 describe('Controller: PostListController', function(){

    beforeEach(module('blog.app'));

    var $rootScope,ctrl,PostService,deferred;
    var postsMock = [{id:1,usuario:'fulano',titulo:'Primeiro Post',texto:'Texto do primeiro post',dataRegistro:1426506988126},
             {id:2,usuario:'maria',titulo:'Outro Post',texto:'Mais um post para teste',dataRegistro:1426506988126}];

    beforeEach(inject(function ($q, _$rootScope_) {
        $rootScope = _$rootScope_;
        deferred = $q.defer();
        deferred.resolve(postsMock);
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
      expect(ctrl.posts).toEqualData(postsMock);
   });
 });
 })();
