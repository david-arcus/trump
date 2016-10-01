(function() {
  'use strict';

  // creates a canvas element using easelJS that can have things drawn on it
  
  angular
    .module('trump')
    .directive('drawOnCanvas', drawOnCanvas);

  /** @ngInject */
  function drawOnCanvas($log) {
    
    var directive = {
        restrict : 'EAC',
        replace : true,
        template: '<canvas id="the-don" width="550" height="586"></canvas>',
        link: function (scope, element, attribute) {
          
          init();  

          var canvas, stage, container;
          var drawingCanvas;
          var queue;
          var update = true;
          
          function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }

          function stop() {
	           createjs.Ticker.removeEventListener("tick", tick);
          }

          function tick(event) {
            // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
            if (update) {
              update = false; // only update once
              stage.update(event);
            }
          }

          function init() {
            
            $log.debug('canvas init');        
            
            canvas = document.getElementById('the-don');
            
            stage = new createjs.Stage(canvas);
                        
            stage.autoClear = false;
            //stage.enableDOMEvents(true);

            createjs.Touch.enable(stage);
            createjs.Ticker.setFPS(24);
            
            // load our initial assets
            
            queue = new createjs.LoadQueue();
            queue.on('complete', handleComplete, this);
            
            //$log.debug(queue);
            
            queue.loadManifest([
              {id: 'brush', src:'../../assets/images/hair3.png'},
              {id: 'don', src:'../../assets/images/don_bald.png'}
            ]);

            
            
            // brush = new createjs.Bitmap("../../assets/images/hair3.png");
            // don = new createjs.Bitmap("../../assets/images/don_bald.png");
            
            // stage.addChild(don);
            
           
          }

          function handleComplete() {
            //var don = queue.getResult('don');
            //stage.addChild(don);
            stage.addEventListener('stagemousedown', handleMouseDown);
            stage.addEventListener('stagemouseup', handleMouseUp);
            createjs.Ticker.addEventListener("tick", tick);
            
            
            $log.debug('load complete');
            var donImage = queue.getResult('don');
            var brushImage = queue.getResult('brush');
            var container = new createjs.Container();
            var brush;
	          stage.addChild(container);
            
            var don = new createjs.Bitmap(donImage);
            
            // $log.debug(queue);
            //stage.addChild(don);

            //don.scaleX = 0.5;
            //don.scaleY = 0.5;

            //stage.update();
            
            function handleMouseDown(event) {
              
              if (!event.primary) { return; }

              stage.addEventListener('stagemousemove', handleMouseMove);


            }

            function handleMouseMove(event) {
              
              if (!event.primary) { return; }
              

              //for (var i=1; i<=20; i++) {

                var scale = Math.random();
                brush = new createjs.Bitmap(brushImage);

                brush.x = stage.mouseX + getRandomInt(-30, 30);
                brush.y = stage.mouseY + getRandomInt(-30, 30);
                brush.rotation = getRandomInt(0, 360);
                brush.scaleX = scale;
                brush.scaleY = scale;

                container.addChild(brush);
              
                update = true;


                //stage.update();            
                // brush.alpha = Math.random() * (1 - 0.5) + 0.1;

              //$log.debug(stage.getNumChildren());

              //}


            }

            function handleMouseUp(event) {
              if (!event.primary) { return; }
              stage.removeEventListener('stagemousemove', handleMouseMove);
            }
            
          }
          
       }
      
    }

    return directive;

    /** @ngInject */
    function ExampleController() {
      
        
    }
    
  }

})();