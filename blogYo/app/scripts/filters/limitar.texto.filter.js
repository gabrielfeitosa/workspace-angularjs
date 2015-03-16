(function(){
'use strict';

angular.module('blogYoApp').filter('limitarTexto', limitarTexto);

function limitarTexto() {
  return function (item,limit) {
	  if(item.length > limit){
		  return item.substring(0, limit) + '...';
	  }
  	return item;
  };
}
})();
