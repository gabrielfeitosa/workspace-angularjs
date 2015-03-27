(function(){
   'use strict';

   describe('Controller: PostEditController', function(){

      beforeEach(module('blogYoApp'));

      var mockPromiseErro = {
        then: function(successFn, errorFn) {
            expect(errorFn).toBeUndefined();
          }
      };

      var mockPromiseSucesso = {
        then: function(successFn) {
            successFn({});
          }
      };

      var ctrl, createCtrl,PostService,RouterFactory;
      beforeEach(inject(function($controller,_PostService_,_RouterFactory_){
        PostService = _PostService_;
        RouterFactory = _RouterFactory_;

        spyOn(RouterFactory, 'go');
        createCtrl = function(){
          return $controller('PostEditController');
        };
        ctrl = createCtrl();
      }));

      describe('Validar injeção de dependência do controlador', function(){
        it('deveria criar controlador com sucesso', function () {
            expect(ctrl).toBeDefined();
         });
      });

      describe('Validar o cadastro de um novo post',function(){

        it('post deveria estar vazio',function(){
          spyOn(RouterFactory, 'getParam');
          spyOn(PostService,'get');
          expect(ctrl.post).toEqualData({});
          expect(PostService.get).not.toHaveBeenCalled();
        });

        it('deveria dar erro ao salvar o post', function(){
          spyOn(PostService,'save').and.returnValue(mockPromiseErro);
          ctrl.salvar();
          expect(RouterFactory.go).not.toHaveBeenCalled();
        });

        it('deveria salvar o post com sucesso', function(){
          spyOn(PostService,'save').and.returnValue(mockPromiseSucesso);
          ctrl.salvar();
          expect(RouterFactory.go).toHaveBeenCalledWith('home');

        });
      });

      describe('Validar a atualização de um post',function(){

        var postMock = {id: 1};

        it('post deveria estar preenchido',function(){
          spyOn(RouterFactory,'getParam').and.returnValue(1);
          spyOn(PostService,'get').and.returnValue({then: function(successFn){successFn(postMock);}});
          ctrl = createCtrl();
          expect(ctrl.post).toEqualData(postMock);
        });

        it('deveria dar error no update do post', function(){
          spyOn(PostService,'update').and.returnValue(mockPromiseErro);
          ctrl.post = postMock;
          ctrl.salvar();
          expect(RouterFactory.go).not.toHaveBeenCalled();
        });

        it('deveria atualizar o post com sucesso', function(){
          spyOn(PostService,'update').and.returnValue(mockPromiseSucesso);
          ctrl.post = postMock;
          ctrl.salvar();
          expect(RouterFactory.go).toHaveBeenCalledWith('post.detail',{'id': 1});
        });
      });
   });
   })();
