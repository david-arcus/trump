(function() {
  'use strict';

  angular
    .module('trump')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($sce) {

    var vm = this;

    function prepareImage() {

      // TODO: make into directive
      var canvas = document.getElementById('the-don');
      var hair = document.getElementById('the-hair');
      var output = document.createElement('canvas');

      output.width = canvas.width;
      output.height = canvas.height;

      var ctx = output.getContext("2d");

      // add hair canvas to the don canvas
      ctx.drawImage(canvas, 0, 0)
      ctx.drawImage(hair, 0, 0)

      return $sce.trustAsResourceUrl(output.toDataURL('image/jpeg', 0.8));

    }
    
    vm.share = function() {
      
      vm.sharing = true;
      
      var image = prepareImage();
        
      vm.download = image;
            
    }

  }
  
})();
