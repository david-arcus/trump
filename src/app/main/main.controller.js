(function() {
  'use strict';

  angular
    .module('trump')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, ModalService, Facebook, Api) {

    var vm = this;
    var shareImage;
    
    vm.uploaded = false;
    vm.share = function() {
      
      vm.loading = true;
      
      var imageName;
      var canvas = document.getElementById('the-don');
      var image = canvas.toDataURL('image/jpeg');

      Api.uploadImage(image).then(function(result) {

        vm.loading = false;
        vm.uploaded = true;
        
        $log.debug(result.data);

        shareImage = result.data.image_path;
        
        vm.sharePath = result.data.image_path;
        
        

      });
    
    }
    
    vm.shareFacebook = function() {
      FB.ui({
        method: 'feed',
        link: 'http://www.trumpsformation.com',
        caption: 'Trumpsformation',
        description: 'Give Don the hair he needs.',
        picture: vm.sharePath
      }, function(response){});
    }

  }
  
})();
