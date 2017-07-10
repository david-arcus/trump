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
      controller: ToolsController,
      controllerAs: 'tools',
      link: function(scope, elem, attr) {


      }

    };

    return directive;

    /** @ngInject */
    function ToolsController($log, $scope, ModalService) {

      var vm = this;


      vm.showHairStyles = function() {

        vm.hairModalActive = true;


        ModalService.showModal({
          templateUrl: 'app/hairStyle/hairStyle.html',
          controller: 'HairStyleController',
          controllerAs: 'hairStyle'
        }).then(function(modal) {

          modal.close.then(function() {
            vm.hairModalActive = false;
            //$log.debug('modal promise');
          });
        });

      };

      vm.showMouthStyles = function() {

        ModalService.showModal({
          templateUrl: 'app/mouthStyle/mouthStyle.html',
          controller: 'MouthStyleController',
          controllerAs: 'mouthStyle'
        }).then(function(modal) {

          modal.close.then(function() {
            //$log.debug('modal promise');
          });
        });

      };

      vm.showEyeStyles = function() {

        ModalService.showModal({
          templateUrl: 'app/eyeStyle/eyeStyle.html',
          controller: 'EyeStyleController',
          controllerAs: 'eyeStyle'
        }).then(function(modal) {

          modal.close.then(function() {
            //$log.debug('modal promise');
          });
        });

      };

    }

  }

})();
