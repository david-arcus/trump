(function () {
  'use strict';

  // share canvas

  angular
    .module('trump')
    .directive('shareButton', shareButton);

  /** @ngInject */
  function shareButton() {

    var directive = {
      //restrict : 'EAC',
      templateUrl: 'app/components/shareButton/shareButton.html',
      controller: ShareButtonController,
      controllerAs: 'share',
      link: function (scope, elem, attr) {

      }

    }

    return directive;

    /** @ngInject */
    function ShareButtonController($sce) {

      var vm = this;
      vm.imageData;

      function prepareImage() {

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

      vm.getDownload = function () {
        vm.imageData = prepareImage();
        
      }

    }

  }

})();
