'use strict';

/**
 * @ngdoc overview
 * @name trumpApp
 * @description
 * # trumpApp
 *
 * Main module of the application.
 */
angular
  .module('trumpApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularModalService'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/credits', {
        templateUrl: 'views/credits.html'
       // controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
