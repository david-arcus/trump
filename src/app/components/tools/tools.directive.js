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
        
        $log.debug('hairstyles');

        ModalService.showModal({
          templateUrl: 'app/hairStyle/hairStyle.html',
          controller: 'HairStyleController',
          controllerAs: 'hairStyle'
        }).then(function(modal) {

          modal.close.then(function() {
            //$log.debug('modal promise');
          });
        });

      };

      vm.showDrawModal = function() {

        ModalService.showModal({
          templateUrl: 'templates/draw.html',
          controller: 'DrawController'
        }).then(function(modal) {
          modal.close.then(function() {

          });
        });

      };

    }

  }

})();
