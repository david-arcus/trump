(function() {
  'use strict';

  angular
    .module('trump')
    .controller('HairModalController', HairModalController);

  /** @ngInject */
  function HairModalController($log, $scope, close, updateCanvas) {
   
    $scope.closeModal = function() {
      $log.debug('dismissModal');
      close(); // close
    };

    $scope.addHairToCanvas = function(hairId) {
      updateCanvas.hair(hairId);
      $scope.closeModal();
    };

  }
  
})();