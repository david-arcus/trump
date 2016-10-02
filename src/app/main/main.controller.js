(function() {
  'use strict';

  angular
    .module('trump')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, ModalService) {

    var vm = this;

    $log.debug('Main');

    vm.showHairModal = function() {

      ModalService.showModal({
        templateUrl: 'app/hairModal/hairModal.html',
        controller: 'HairModalController'
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
})();
