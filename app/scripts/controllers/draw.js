'use strict';

angular.module('trumpApp').controller('DrawController', function($scope, close) {

  //  console.log('hi');
  
  $scope.closeModal = function() {
  //   console.log('dismissModal');
      close(); // close
   };
  
  
});

