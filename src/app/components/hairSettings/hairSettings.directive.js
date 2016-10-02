(function() {
  'use strict';

  // creates a canvas element using easelJS that can have things drawn on it

  angular
    .module('trump')
    .directive('hairSettings', hairSettings);

  /** @ngInject */
  function hairSettings() {

    var directive = {
      //restrict : 'EAC',
      templateUrl: 'app/components/hairSettings/hairSettings.html',
      controller: HairSettingsController,
      controllerAs: 'vm',
      link: function (scope, elem, attr) {

      }

    }

    return directive;

    /** @ngInject */
    function HairSettingsController($log, $scope) {

      var vm = this;

      vm.hairSize = 1;
      vm.hairType = 'curly';
      vm.hairColour = 'brunette';

      //$scope.$emit('hairSize', vm.hairSize);

      $scope.$watchGroup(['vm.hairSize', 'vm.hairType', 'vm.hairColour'], function change(value) {
        $scope.$emit('hairSettings', value);
      });

    }

  }

})();
