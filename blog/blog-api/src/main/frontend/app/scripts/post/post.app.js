(function(){
 'use strict';

 angular.module('post.app',['login.app','core.app','ui.router','ngResource','textAngular'])
 .constant('postUrlApi', 'blog-api/api/posts');
 })();
