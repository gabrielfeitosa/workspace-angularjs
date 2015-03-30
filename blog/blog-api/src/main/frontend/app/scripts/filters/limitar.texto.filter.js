(function(){
'use strict';

angular.module('blog.app').filter('limitarTexto', limitarTexto);

function limitarTexto() {
  return function (item,limit) {
	  if(item.length > limit){
		  return item.substring(0, limit) + '...';
	  }
  	return item;
  };
}
})();
