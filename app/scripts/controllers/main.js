'use strict';

/**
 * @ngdoc function
 * @name trumpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trumpApp
 */
angular.module('trumpApp')
  .controller('MainCtrl', function ($scope, ModalService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.showHairModal = function() {
      
      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: 'templates/hair.html',
        controller: 'HairController'
      }).then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal
        // you can call 'modal' to show it, if it's a custom modal just show or hide
        // it as you need to.
//        modal.element.modal();
        modal.close.then(function() {
//          console.log('modal promise');
        });
      });

    };
  
    $scope.showDrawModal = function() {
      
      ModalService.showModal({
        templateUrl: 'templates/draw.html',
        controller: 'DrawController'
      }).then(function(modal) {
        modal.close.then(function() {
          
        });
      });

    };
  
  });
