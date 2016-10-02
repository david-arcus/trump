(function() {
  'use strict';

  // creates a canvas element using easelJS that can have things drawn on it

  angular
    .module('trump')
    .directive('drawOnCanvas', drawOnCanvas);

  /** @ngInject */
  function drawOnCanvas() {

    var directive = {
      //restrict : 'EAC',
      replace : true,
      templateUrl: 'app/components/drawOnCanvas/drawOnCanvas.html',
      controller: DrawOnCanvasController,
      controllerAs: 'vm',
      link: function (scope, elem, attr) {


      }

    }

    return directive;

    /** @ngInject */
    function DrawOnCanvasController($scope, $log) {

      init();

      var vm = this;
      var canvas, stageStatic, stageDrawing;
      var loader, manifest;
      var don, brush, hairCurlyBrunette, hairCurlyBlonde, hairCurlyGinger, hairStubblyBrunette, hairStubblyBlonde, hairStubblyGinger;
      var hairSize, hairType, hairColour;

      $scope.$on('hairSettings', function(e, data){

        hairSize = data[0];
        hairType = data[1];
        hairColour = data[2];

      });

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function init() {

        stageStatic = new createjs.Stage('the-don');
        stageDrawing = new createjs.Stage('the-don');
        stageDrawing.autoClear = false;

        createjs.Touch.enable(stageDrawing, stageStatic);

        // load our initial assets

        manifest = [
          {id: 'hairCurlyBrunette', src:'hair_curly_brunette.png'},
          {id: 'hairCurlyBlonde', src:'hair_curly_blonde.png'},
          {id: 'hairCurlyGinger', src:'hair_curly_ginger.png'},
          {id: 'hairStubblyBrunette', src:'hair_stubbly_brunette.png'},
          {id: 'hairStubblyBlonde', src:'hair_stubbly_blonde.png'},
          {id: 'hairStubblyGinger', src:'hair_stubbly_ginger.png'},
          {id: 'don', src:'don_bald.png'}
        ];

        loader = new createjs.LoadQueue(false);
        loader.addEventListener('complete', handleComplete);
        loader.loadManifest(manifest, true, '../../assets/images/');


      }

      function handleComplete() {

        don = new createjs.Bitmap(loader.getResult('don'));
        don.scaleX = 0.5;
        don.scaleY = 0.5;
        hairCurlyBrunette = new createjs.Bitmap(loader.getResult('hairCurlyBrunette'));
        hairCurlyBlonde = new createjs.Bitmap(loader.getResult('hairCurlyBlonde'));
        hairCurlyGinger = new createjs.Bitmap(loader.getResult('hairCurlyGinger'));
        hairStubblyBrunette = new createjs.Bitmap(loader.getResult('hairStubblyBrunette'));
        hairStubblyBlonde = new createjs.Bitmap(loader.getResult('hairStubblyBlonde'));
        hairStubblyGinger = new createjs.Bitmap(loader.getResult('hairStubblyGinger'));

        stageStatic.addChild(don);
        stageStatic.update();

        stageDrawing.addEventListener('stagemousedown', handleMouseDown);
        stageDrawing.addEventListener('stagemouseup', handleMouseUp);


        // hairSize = data[3];
        //
        // if (data[1] == 'curly' && data[2] == 'brunette') {
        //   $log.debug('hairCurlyBrunette');
        // }
        //
        $log.debug(hairSize + hairType + hairColour);


      }

      function handleMouseDown(event) {

        if (!event.primary) { return; }

        stageDrawing.addEventListener('stagemousemove', handleMouseMove);

      }

      function handleMouseMove(event) {

        if (!event.primary) { return; }

        brush = hairCurlyBrunette;

        for (var i=1; i<=20; i++) {

          var scale = Math.random() * hairSize;

          brush.x = stageDrawing.mouseX + getRandomInt(-20, 20);
          brush.y = stageDrawing.mouseY + getRandomInt(-20, 20);
          brush.rotation = getRandomInt(0, 360);
          brush.scaleX = scale;
          brush.scaleY = scale;

          stageDrawing.addChild(brush);

          stageDrawing.update();
          // brush.alpha = Math.random() * (1 - 0.5) + 0.1;

        }

      }

      function handleMouseUp(event) {

        if (!event.primary) { return; }
        stageDrawing.removeEventListener('stagemousemove', handleMouseMove);

      }

    }

  }

})();
