(function() {
  'use strict';

  angular
    .module('trump')
    .controller('HairStyleController', HairStyleController);

  /** @ngInject */
  function HairStyleController($log, $rootScope, close) {
    
    var vm = this;
   
    vm.closeModal = function() {
      
      close(); // close
      
    };

    vm.addHairStyle = function(hairStyle) {
      
      $log.debug(hairStyle);
      
      // http://stackoverflow.com/questions/11252780/whats-the-correct-way-to-communicate-between-controllers-in-angularjs/19498009#19498009
      
      $rootScope.$emit('hairStyle', hairStyle);
      vm.closeModal();
      
    };
    
    vm.removeHairStyle = function() {
      $rootScope.$emit('removeHairStyle', true);
      vm.closeModal(); 
    }

  }
  
})();