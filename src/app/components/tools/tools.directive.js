(function() {
  'use strict';

  angular
    .module('trump')
    .directive('tools', tools);

  /** @ngInject */
  function tools($log) {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/tools/tools.html',
      link: function(scope, elem, attr) {


      }

    };

    return directive;

  }

})();
