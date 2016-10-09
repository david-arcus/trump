(function() {
  'use strict';

  // creates a canvas element using easelJS that can have things drawn on it

  angular
    .module('trump')
    .directive('trumpCanvas', trumpCanvas);

  /** @ngInject */
  function trumpCanvas() {

    var directive = {
      //restrict : 'EAC',
      replace : true,
      templateUrl: 'app/components/trumpCanvas/trumpCanvas.html',
      controller: TrumpCanvasController,
      controllerAs: 'vm',
      link: function (scope, elem, attr) {


      }

    }

    return directive;

    /** @ngInject */
    function TrumpCanvasController($scope, $log) {

      init();

      var vm = this;
      var canvas, stageStatic, stageDrawing;
      var loader, manifest;
      var don, brush, hairCurlyBrunette, hairCurlyBlonde, hairCurlyGinger;
      var hairLength, hairType, hairColour;

      $scope.$on('hairSettings', function(e, data){

        hairLength = data[0];
        // hairType = data[1];
        hairColour = data[2];

      });

      $scope.$on('clearHair', function(e, data) {
        stageDrawing.clear();
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
          //{id: 'hairCurlyBlonde', src:'hair_curly_blonde.png'},
          {id: 'hairCurlyGinger', src:'hair_curly_ginger.png'},
          // {id: 'hairStubblyBrunette', src:'hair_stubbly_brunette.png'},
          // {id: 'hairStubblyBlonde', src:'hair_stubbly_blonde.png'},
          // {id: 'hairStubblyGinger', src:'hair_stubbly_ginger.png'},
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
        //hairCurlyBlonde = new createjs.Bitmap(loader.getResult('hairCurlyBlonde'));
        hairCurlyGinger = new createjs.Bitmap(loader.getResult('hairCurlyGinger'));
        // hairStubblyBrunette = new createjs.Bitmap(loader.getResult('hairStubblyBrunette'));
        // hairStubblyBlonde = new createjs.Bitmap(loader.getResult('hairStubblyBlonde'));
        // hairStubblyGinger = new createjs.Bitmap(loader.getResult('hairStubblyGinger'));

        stageStatic.addChild(don);
        stageStatic.update();

        stageDrawing.addEventListener('stagemousedown', handleMouseDown);
        stageDrawing.addEventListener('stagemouseup', handleMouseUp);


      }

      function handleMouseDown(event) {

        if (!event.primary) { return; }

        stageDrawing.addEventListener('stagemousemove', handleMouseMove);

        switch(hairColour) {
          case('brunette'):
            brush = hairCurlyBrunette;
            break;
          case('ginger'):
            brush = hairCurlyGinger;
            break;
          // case('blonde'):
          //   brush = hairCurlyBlonde;
          //   break;
        }


      }

      function handleMouseMove(event) {

        if (!event.primary) { return; }

        var follicles = hairLength > 0.5 ? 20 : 40;

        //$log.debug(follicles);

        for (var i=1; i<=follicles; i++) {

          var scale = Math.random() * hairLength;

          stageDrawing.addChild(brush);

          brush.x = stageDrawing.mouseX + getRandomInt(-20, 20);
          brush.y = stageDrawing.mouseY + getRandomInt(-20, 20);
          brush.rotation = getRandomInt(0, 360);
          brush.scaleX = scale;
          brush.scaleY = scale;

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
