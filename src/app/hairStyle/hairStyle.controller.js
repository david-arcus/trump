(function() {
  'use strict';

  angular
    .module('trump')
    .controller('HairStyleController', HairStyleController);

  /** @ngInject */
  function HairStyleController($log, close, updateCanvas) {
    
    var vm = this;
   
    vm.closeModal = function() {
      
      close(); // close
      
    };

    vm.addHairToCanvas = function(hairId) {
      
      updateCanvas.hair(hairId);
      vm.closeModal();
      
    };

  }
  
})();