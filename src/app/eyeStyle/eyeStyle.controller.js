(function() {
  'use strict';

  angular
    .module('trump')
    .controller('EyeStyleController', EyeStyleController);

  /** @ngInject */
  function EyeStyleController($log, $rootScope, close) {
    
    var vm = this;
   
    vm.closeModal = function() {
      
      close(); // close
      
    };

    vm.addEyeStyle = function(eyeStyle) {
      
      $log.debug(eyeStyle);
      
      // http://stackoverflow.com/questions/11252780/whats-the-correct-way-to-communicate-between-controllers-in-angularjs/19498009#19498009
      
      $rootScope.$emit('eyeStyle', eyeStyle);
      vm.closeModal();
      
    };
    
    vm.removeEyeStyle = function() {
      $rootScope.$emit('removeEyeStyle', true);
      vm.closeModal(); 
    }

  }
  
})();