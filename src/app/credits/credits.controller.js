(function() {
  'use strict';

  angular
    .module('trump')
    .controller('CreditsController', CreditsController);

  /** @ngInject */
  function CreditsController($log) {
   
    $log.debug('Credits');
  
  }
})();
