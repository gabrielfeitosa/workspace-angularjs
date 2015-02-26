blogApp.config(function($routeProvider,$httpProvider){
	$routeProvider
	.when("/",{templateUrl:'view/listPost.html',controller:'PostController'})
	.when("/post",{templateUrl:'view/formPost.html',controller:'PostController'})
	.when("/post/:postId",{templateUrl:'view/viewPost.html',controller:'PostController'})
	.otherwise("/");
});