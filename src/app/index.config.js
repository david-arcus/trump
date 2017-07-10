(function() {
  'use strict';

  angular
    .module('trump')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // init facebook app
    // FacebookProvider.init('302835310090558');
  }

})();
