(function(){
  'use strict';

  angular.module('ngPanelsDemo', ['ngPanels'])

    .controller('mainCtrl', function($scope, ngPanels) {

      $scope.panels = ngPanels.newGroup('demo', {
        one: {},
        two: {
          masks: ['one']
        },
        three: {
          masks: ['two']
        },
        four: {
          masks: ['three']
        }
      });

      $scope.openPanelTwo = function() {
        $scope.panels.open('two');
      };

      $scope.openPanelThree = function() {
        $scope.panels.open('three');
      };

      $scope.openPanelFour = function() {
        $scope.panels.open('four');
      };

    });

})();
