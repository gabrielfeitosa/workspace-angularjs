/*
'use strict';

describe('Controller: PostListController', function () {

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
  // load the controller's module
  beforeEach(module('blog.app'));

  var PostListController,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,_$httpBackend_) {

    $httpBackend = _$httpBackend_;

    $httpBackend.expectGET('blog-api/posts').
        respond([{id:0,usuario:'fulano',titulo:'Primeiro Post',texto:'Texto do primeiro post',dataRegistro:1425661464525}]);

    scope = $rootScope.$new();
    PostListController = $controller('PostListController', {
      $scope: scope
    });

  }));

  it('Listando os posts', function() {
    expect(scope.posts).toEqualData([]);

    $httpBackend.flush();
    expect(scope.posts).toEqualData(
        [{id:0,usuario:'fulano',titulo:'Primeiro Post',texto:'Texto do primeiro post',dataRegistro:1425661464525}]);
  });
});
*/
