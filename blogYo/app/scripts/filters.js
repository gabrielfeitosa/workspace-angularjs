(function(){
'use strict';

angular.module('blogYoApp')
.filter('limitText', function () {
  return function (item,limit) {
	  if(item.length > limit){
		  return item.substring(0, limit) + '...';
	  }
  	return item;
  };
});
})();
