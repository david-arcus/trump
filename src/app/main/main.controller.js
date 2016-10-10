(function() {
  'use strict';

  angular
    .module('trump')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, ModalService, Facebook) {

    var vm = this;

    $log.debug('Main');

    vm.share = function() {

      FB.ui({
        method: 'feed',
        link: 'https://developers.facebook.com/docs/',
        caption: 'Trump',
      }, function(response){});
    
    }

  }
  
})();
