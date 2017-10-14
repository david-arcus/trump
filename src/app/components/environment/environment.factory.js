(function() {
  'use strict';

  // return an environment variable and url

  angular
    .module('trump')
    .factory('Environment', Environment);

  /** @ngInject */
  function Environment($log) {

    var environment = {
      'mode':'production',
      'apiURL':'http://dapi.us-east-1.elasticbeanstalk.com/api'

    };

    return environment;
  }

})();
