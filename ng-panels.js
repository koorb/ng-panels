angular.module('ngPanels', [])

  .directive('panelView', function() {
    return {
      restrict: 'EA',
      transclude: true,
      template: '<div class="navigation-mask" ng-click="panelOptions.unmask()" ng-if="panelOptions.masked"></div><div ng-transclude></div>',
      scope: {
        panelOptions: '=',
        path: '='
      },
      controller: function($scope, $element, $attrs) {
  
        $scope.$watch('panelOptions.active', function (isActive, wasActive) {
          if (isActive) {
            $element.addClass('active');
          } else {
            $element.removeClass('active');
          }
        });
        
        $scope.$watch('panelOptions.masked', function (isMasked, wasMasked) {
          if (isMasked) {
            $element.addClass('masked');
            if ($element.css('right') !== 'auto') {
              var x = $element.parent().width();
              $element.css('-webkit-transform', 'translate3d(-'+x+'px, 0, 0)');
            }
          } else {
            $element.removeClass('masked');
            $element.css('-webkit-transform', '');
          }
        });
      }
    };
  });