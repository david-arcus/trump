'use strict';

angular.module('trumpApp').controller('HairController', function($scope, close, updateCanvas) {

//  console.log('hi');
  
  $scope.closeModal = function() {
//   console.log('dismissModal');
    close(); // close
 };
  
  $scope.addHairToCanvas = function(hairId) {
    
    console.log('hair id: ' + hairId);
    
    updateCanvas.hair();
    
  };

});
