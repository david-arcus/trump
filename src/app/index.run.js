(function() {
  'use strict';

  angular
    .module('trump')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
