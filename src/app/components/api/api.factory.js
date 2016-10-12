(function() {
  'use strict';

  // return an environment variable and url
  
  angular
    .module('trump')
    .factory('Api', Api);

  /** @ngInject */
  function Api($log, $http, Environment) {
    
    var ENV = Environment.apiURL;

    return {
      
      uploadImage: function (image) {
        
        return $http.post(ENV + '/save-image', {
          image: image
        });
        
      }
            
    };
    
  }

})();