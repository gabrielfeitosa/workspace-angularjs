(function(){
'use strict';

angular.module('blogYoApp')
.filter('limitarTexto', function () {
  return function (item,limit) {
	  if(item.length > limit){
		  return item.substring(0, limit) + '...';
	  }
  	return item;
  };
});
})();
