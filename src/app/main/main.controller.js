(function() {
  'use strict';

  angular
    .module('trump')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log) {
   
    $log.debug('Main');
    
  }
})();
