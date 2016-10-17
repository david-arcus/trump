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
    function TrumpCanvasController($scope, $rootScope, $log) {

      init();

      var vm = this;
      
      // canvas elements
      var canvas, stageStatic, stageDrawing, flagBg;
      // asset loading elements
      var loader, manifest;
      // brushes (for drawing hair)
      var don, brush, hairCurlyBrunette, hairCurlyBlonde, hairCurlyGinger;
      // values sent from hair settings toolkit
      var hairLength, hairType, hairColour;
      
      // vars to hold user selected elements
      var styles = [];
      var eyesFurtive, eyesSurprised;
      var hairGursling, hairHallary, hairLernal, hairOrlundo, hairPowell, hairFirrel;
      var mouthSad, mouthShouty;
      
      // hold currently selected hairstyle, eyes and mouth
      var currentHair, currentEyes, currentMouth;
      
      // broadcasted events

      $scope.$on('hairSettings', function(e, data) {
        // change settings for drawing hair

        hairLength = data[0];
        // hairType = data[1];
        hairColour = data[2];

      });

      $scope.$on('clearHair', function(e, data) {
        
        // remove drawn hair from canvas
        stageDrawing.clear();
        stageStatic.update();
        
      });

      
      $rootScope.$on('hairStyle', function(e, data) {
        
        // add hair style to canvas
        stageStatic.removeChild(currentHair);
        stageStatic.addChild(styles[data]);
        currentHair = styles[data];
        stageStatic.update();
        
      });
      
      $rootScope.$on('eyeStyle', function(e, data) {
        
        // add eye style to canvas
        stageStatic.removeChild(currentEyes);
        stageStatic.addChild(styles[data]);
        currentEyes = styles[data];
        stageStatic.update();
        
      });
      
      $rootScope.$on('mouthStyle', function(e, data) {
        
        // add mouth style to canvas
        stageStatic.removeChild(currentMouth);
        stageStatic.addChild(styles[data]);
        currentMouth = styles[data];
        stageStatic.update();
        
      });
      
      $rootScope.$on('removeHairStyle', function(e, data) {
        
        // make don bald
        stageStatic.removeChild(currentHair);
        stageStatic.update();
        
      });
      
      $rootScope.$on('removeEyeStyle', function(e, data) {
        
        // default eyes
        stageStatic.removeChild(currentEyes);
        stageStatic.update();
        
      });
      
      $rootScope.$on('removeMouthStyle', function(e, data) {
        
        // default mouth
        stageStatic.removeChild(currentMouth);
        stageStatic.update();
        
      });
      
      function getRandomInt(min, max) {
        
        return Math.floor(Math.random() * (max - min + 1)) + min;
        
      }

      function init() {

        stageStatic             = new createjs.Stage('the-don');
        stageDrawing            = new createjs.Stage('the-hair');
        
        stageDrawing.autoClear  = false;
        
        createjs.Touch.enable(stageDrawing, stageStatic);


        // load our initial assets

        manifest = [
          {id: 'hairCurlyBrunette', src:'hair_curly_brunette.png'},
          {id: 'hairCurlyGinger', src:'hair_curly_ginger.png'},
          
          {id: 'eyesFurtive', src:'tools/eyes/furtive.png'},
          {id: 'eyesSurprised', src:'tools/eyes/surprised.png'},
          
          {id: 'hairGursling', src:'tools/hairstyles/gursling.png'},
          {id: 'hairHallary', src:'tools/hairstyles/hallary.png'},
          {id: 'hairLernal', src:'tools/hairstyles/lernal.png'},
          {id: 'hairOrlundo', src:'tools/hairstyles/orlundo.png'},
          {id: 'hairPowell', src:'tools/hairstyles/powell.png'},
          {id: 'hairFirrel', src:'tools/hairstyles/wall_firrel.png'},
          
          {id: 'mouthSad', src:'tools/mouth/sad.png'},
          {id: 'mouthShouty', src:'tools/mouth/shouty.png'},
          {id: 'flagBg', src:'flag-bg.jpg'},
          
          {id: 'don', src:'don_bald.png'}
        ];

        loader = new createjs.LoadQueue(false);
        loader.addEventListener('complete', handleComplete);
        loader.loadManifest(manifest, true, 'assets/images/');
        
      }

      function handleComplete() {

        don                 = new createjs.Bitmap(loader.getResult('don'));
        flagBg              = new createjs.Bitmap(loader.getResult('flagBg'));
        hairCurlyBrunette   = new createjs.Bitmap(loader.getResult('hairCurlyBrunette'));
        hairCurlyGinger     = new createjs.Bitmap(loader.getResult('hairCurlyGinger'));
        
        eyesFurtive         = new createjs.Bitmap(loader.getResult('eyesFurtive'));
        eyesSurprised       = new createjs.Bitmap(loader.getResult('eyesSurprised'));
        hairGursling        = new createjs.Bitmap(loader.getResult('hairGursling'));
        hairHallary         = new createjs.Bitmap(loader.getResult('hairHallary'));
        hairLernal          = new createjs.Bitmap(loader.getResult('hairLernal'));
        hairOrlundo         = new createjs.Bitmap(loader.getResult('hairOrlundo'));
        hairPowell          = new createjs.Bitmap(loader.getResult('hairPowell'));
        hairFirrel          = new createjs.Bitmap(loader.getResult('hairFirrel'));
        mouthSad            = new createjs.Bitmap(loader.getResult('mouthSad'));
        mouthShouty         = new createjs.Bitmap(loader.getResult('mouthShouty'));
        
        styles = {
          'eyesFurtive': eyesFurtive,
          'eyesSurprised': eyesSurprised,
          'hairGursling': hairGursling,
          'hairHallary': hairHallary,
          'hairLernal': hairLernal,
          'hairOrlundo': hairOrlundo,
          'hairPowell': hairPowell,
          'hairFirrel': hairFirrel,
          'mouthSad': mouthSad,
          'mouthShouty': mouthShouty,
        }
        
        stageStatic.addChild(flagBg);
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

          brush.x         = stageDrawing.mouseX + getRandomInt(-20, 20);
          brush.y         = stageDrawing.mouseY + getRandomInt(-20, 20);
          brush.rotation  = getRandomInt(0, 360);
          brush.scaleX    = scale;
          brush.scaleY    = scale;

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
