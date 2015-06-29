'use strict';

/**
 * @ngdoc function
 * @name trumpApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the trumpApp
 */
angular.module('trumpApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
