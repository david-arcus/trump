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
      
      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: 'app/hairModal/hairModal.html',
        controller: 'HairModalController'
      }).then(function(modal) {
          // The modal object has the element built, if this is a bootstrap modal
          // you can call 'modal' to show it, if it's a custom modal just show or hide
          // it as you need to.
          // modal.element.modal();
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
