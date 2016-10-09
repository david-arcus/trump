(function() {
  'use strict';

  angular
    .module('trump')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/credits', {
        templateUrl: 'app/credits/credits.html',
        controller: 'CreditsController',
        controllerAs: 'credits'
      })
      .otherwise({
        redirectTo: '/'
      });

      //$locationProvider.html5Mode(true);
  }

})();
