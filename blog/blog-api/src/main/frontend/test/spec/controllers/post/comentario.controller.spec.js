(function(){
   'use strict';

   describe('Controller: ComentarioController', function(){

      beforeEach(module('blog.app'));

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

      var ctrl,createController,RouterFactory,ComentarioService;
      beforeEach(inject(function($controller,_RouterFactory_,_ComentarioService_){
        RouterFactory = _RouterFactory_;
        ComentarioService = _ComentarioService_;
        createController = function(){
          return $controller('ComentarioController');
        };
        ctrl = createController();
      }));

      describe('Validar injeção de dependência do controlador...',function(){
        it('Deveria instanciar o controlador', function(){
          expect(ctrl).toBeDefined();
        });

        it('Comentario deveria estar vazio', function(){
          expect(ctrl.comentario).toEqualData({});
        });

        it('Deveria dar erro sem id na rota para resgatar o parâmetro', function(){
          spyOn(RouterFactory,'getParam');
          expect(ctrl.comentarios).toBeUndefined();
          spyOn(ComentarioService,'query').and.returnValue(mockPromiseErro);
          ctrl = createController();
          expect(RouterFactory.getParam).toHaveBeenCalledWith('id');
          expect(ComentarioService.query).toHaveBeenCalled();
          expect(ctrl.comentarios).toBeUndefined();
        });

        describe('Adicionando o parâmetro id da rota',function(){
          beforeEach(function(){
            spyOn(RouterFactory,'getParam').and.returnValue(1);
          });

          it('Deveria dar erro no serviço query', function(){
            expect(ctrl.comentarios).toBeUndefined();
            spyOn(ComentarioService,'query').and.returnValue(mockPromiseErro);
            ctrl = createController();
            expect(RouterFactory.getParam).toHaveBeenCalledWith('id');
            expect(ComentarioService.query).toHaveBeenCalledWith(1);
            expect(ctrl.comentarios).toBeUndefined();
          });


          it('Deveria preencher os comentarios', function(){
            expect(ctrl.comentarios).toBeUndefined();
            spyOn(ComentarioService,'query').and.returnValue(mockPromiseSucesso);
            ctrl = createController();
            expect(RouterFactory.getParam).toHaveBeenCalledWith('id');
            expect(ComentarioService.query).toHaveBeenCalledWith(1);
          });
        });
      });

      describe('Validar a adição de um novo comentário', function(){
        beforeEach(function(){
          spyOn(RouterFactory,'getParam').and.returnValue(1);
          ctrl = createController();
        });

        it('Deveria dar erro no serviço ao tentar adicionar comentário', function(){
          expect(ctrl.comentario).toEqualData({});
          spyOn(ComentarioService,'save').and.returnValue(mockPromiseErro);
          ctrl.adicionarComentario();
          expect(ComentarioService.save).toHaveBeenCalledWith(1,{});
          expect(ctrl.comentario).toEqualData({});
        });

        it('Deveria salvar um novo comentário com sucesso', function(){
          var comentarioMock = {texto: 'um comentário'};
          ctrl.comentario = comentarioMock;
          spyOn(ComentarioService,'save').and.returnValue(mockPromiseSucesso);
          expect(ctrl.comentarios).toBeUndefined();
          ctrl.adicionarComentario();
          expect(ComentarioService.save).toHaveBeenCalledWith(1,comentarioMock);
          expect(ctrl.comentarios.length).toBe(1);
        });

        it('Deveria salvar um novo comentário com sucesso, outros comentários já foram adicionados', function(){
          var comentarioMock = {texto: 'um comentário'};
          ctrl.comentario = comentarioMock;
          ctrl.comentarios = [comentarioMock];
          spyOn(ComentarioService,'save').and.returnValue(mockPromiseSucesso);
          expect(ctrl.comentarios.length).toBe(1);
          ctrl.adicionarComentario();
          expect(ComentarioService.save).toHaveBeenCalledWith(1,comentarioMock);
          expect(ctrl.comentarios.length).toBe(2);
        });


      });
   });
   })();
