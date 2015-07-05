'use strict';

angular.module('trumpApp').factory('updateCanvas', function() {

      var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
  
      var updateCanvas = {
        /**
         * draw a square on the canvas
         */
        hair: function(hairId) {
            var canvas = document.getElementById('the-don');
            var ctx = canvas.getContext('2d');
  
            if (canvas.getContext) {
                console.log('updating hair with id: ' + hairId);
                //clear the canvas
                
                //ctx.clearRect(20,20, canvas.width, canvas.height);

                ctx.fillRect(getRandomInt(20, 50), getRandomInt(50,100), 100, 100);
            }
        },
        eyes: function() {
            var canvas = document.getElementById('the-don');
            var ctx = canvas.getContext('2d');
  
            if (canvas.getContext) {
                console.log('updating eyes');
                //clear the canvas
                
                //ctx.clearRect(0,0, canvas.width, canvas.height);

                ctx.fillRect(100, 100, 100, 100);
            }
        }
    };

    return updateCanvas;

});
