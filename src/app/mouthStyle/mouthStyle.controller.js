(function() {
  'use strict';

  angular
    .module('trump')
    .controller('MouthStyleController', MouthStyleController);

  /** @ngInject */
  function MouthStyleController($log, $rootScope, close) {
    
    var vm = this;
   
    vm.closeModal = function() {
      
      close(); // close
      
    };

    vm.addMouthStyle = function(mouthStyle) {
      
      $log.debug(mouthStyle);
      
      // http://stackoverflow.com/questions/11252780/whats-the-correct-way-to-communicate-between-controllers-in-angularjs/19498009#19498009
      
      $rootScope.$emit('mouthStyle', mouthStyle);
      vm.closeModal();
      
    };
    
    vm.removeMouthStyle = function() {
      $rootScope.$emit('removeMouthStyle', true);
      vm.closeModal(); 
    }

  }
  
})();