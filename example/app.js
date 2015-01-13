var app = angular.module('ngPanelsDemo', ['ngPanels']);

app.controller('MainCtrl', function($scope) {
  
  $scope.panels = {
    one: {
      masked: false
    },
    two: {
      active: false,
      masked: false
    },
    three: {
      active: false,
      masked: false
    },
    four: {
      active: false,
      masked: false
    }
  };
  
  $scope.openPanelTwo = function() {
    $scope.panels.two.active = true;
    $scope.panels.one.masked = true;
    $scope.panels.one.unmask = $scope.closePanelTwo;
  };
  
  $scope.closePanelTwo = function() {
    $scope.panels.two.active = false;
    $scope.panels.one.masked = false;
  };
  
  $scope.openPanelThree = function() {
    $scope.panels.three.active = true;
    $scope.panels.two.masked = true;
    $scope.panels.two.unmask = $scope.closePanelThree;
  };
  
  $scope.closePanelThree = function() {
    $scope.panels.three.active = false;
    $scope.panels.two.masked = false;
  };
  
  $scope.openPanelFour = function() {
    $scope.panels.four.active = true;
    $scope.panels.three.masked = true;
    $scope.panels.three.unmask = $scope.closePanelFour;
  };
  
  $scope.closePanelFour = function() {
    $scope.panels.four.active = false;
    $scope.panels.three.masked = false;
  };
});
