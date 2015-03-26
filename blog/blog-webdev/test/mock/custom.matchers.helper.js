(function(){
 'use strict';
 beforeEach(function() {

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
   jasmine.addMatchers(customMatchers);
 });

 })();
