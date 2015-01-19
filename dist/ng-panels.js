(function(){
  'use strict';

  angular.module('ngPanels', [])

    .directive('panelView', function() {
      return {
        restrict: 'EA',
        transclude: true,
        template: '<div ng-transclude></div><div class="ng-panel-mask" ng-click="panelOptions.unmask()" ng-if="panelOptions.masked"></div>',
        scope: {
          panelOptions: '=',
          path: '='
        },
        controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
          $element.addClass('ng-panel-view');

          if (!$element.hasClass('panel-static')) {
            $scope.$watch('panelOptions.active', function (isActive, wasActive) {
              if (isActive) {
                $element.addClass('active');
              } else {
                $element.removeClass('active');
              }
            });
          }

          $scope.$watch('panelOptions.masked', function (isMasked, wasMasked) {
            if (isMasked) {
              $element.addClass('masked');
              if ($element.css('right') !== 'auto' && !$element.hasClass('panel-static')) {
                var x = $element.parent()[0].offsetWidth;
                $element.css('transform', 'translate3d(-'+x+'px, 0, 0)');
                $element.css('-webkit-transform', 'translate3d(-'+x+'px, 0, 0)');
                $element.css('-moz-transform', 'translate3d(-'+x+'px, 0, 0)');
              }
            } else {
              $element.removeClass('masked');
              $element.css('transform', '');
              $element.css('-webkit-transform', '');
              $element.css('-moz-transform', '');
            }
          });
        }]
      };
    });
})();

(function(){
  'use strict';

  angular.module('ngPanels')

    .factory('ngPanels', function() {
      var panelGroup = {
        panels: [],

        /**
         * Sets the panels to be used in a view
         * @param {Array} panels Array of panel names with options
         *
         * Options:
         *   masks  – List of panel names to mask when panel is opened
         *   unmask – A custom function to modify the behaviour when a panel is unmasked. By default this will close the any panels that list this panel in thier `masks` option.
         */
        setPanels: function(panels) {
          var self = this;
          self.panels = panels;

          angular.forEach(self.panels, function(panel, panelName) {
            if (!angular.isFunction(panel.unmask)) {
              panel.unmask = function() {
                angular.forEach(self.panels, function(closePanel, closePanelName) {
                  if (angular.isArray(closePanel.masks) && closePanel.masks.indexOf(panelName) >= 0) {
                    self.close(closePanelName);
                  }
                });
                self.unmask(panelName);
              };

            }
          });
          return this;
        },

        /**
         * Returns the specified pannel options
         * @param  {string} panel Panel Name
         * @return {Object}       panel Options
         */
        get: function(panel) {
          return this.panels[panel];
        },

        /**
         * Sets the active property of a panel to true
         * @param  {Mixed} panels String panel name or array of panel names
         * @return {panelGroup}   Returns a chainable reference
         */

        open: function(panels) {
          var self = this;
          if (!angular.isArray(panels)) {
            panels = [panels];
          }

          angular.forEach(panels, function(panel) {
            if (angular.isArray(self.panels[panel].masks)) {
              self.mask(self.panels[panel].masks);
            }
            self.panels[panel].active = true;
            self.panels[panel].masked = false;
          });
          return this;
        },

        /**
         * Sets the active property of a panel to false
         * @param  {Mixed} panels String panel name or array of panel names
         * @return {panelGroup}   Returns a chainable reference
         */
        close: function(panels) {
          var self = this;
          if (!angular.isArray(panels)) {
            panels = [panels];
          }

          angular.forEach(panels, function(panel) {
            self.panels[panel].active = false;
            self.panels[panel].masked = false;
            if (angular.isArray(self.panels[panel].masks)) {
              self.unmask(self.panels[panel].masks);
            }
          });
          return this;
        },

        /**
         * Sets the masked propery of a panel to true
         * @param  {Mixed} panels String panel name or array of panel names
         * @return {panelGroup}   Returns a chainable reference
         */
        mask: function(panels) {
          var self = this;
          if (!angular.isArray(panels)) {
            panels = [panels];
          }

          angular.forEach(panels, function(panel) {
            self.panels[panel].masked = true;
            self.panels[panel].active = true;
          });
          return this;
        },

        /**
         * Sets the masked propery of a panel to false
         * @param  {Mixed} panels String panel name or array of panel names
         * @return {panelGroup}   Returns a chainable reference
         */
        unmask: function(panels) {
          var self = this;
          if (!angular.isArray(panels)) {
            panels = [panels];
          }

          angular.forEach(panels, function(panel) {
            self.panels[panel].masked = false;
          });
          return this;
        },

        /**
         * Sets the active propery of the specified panels to true and all others to false
         * @param  {Mixed} panels String panel name or array of panel names
         * @return {panelGroup}   Returns a chainable reference
         */
        only: function(panels) {
          var self = this;
          if (!angular.isArray(panels)) {
            panels = [panels];
          }

          angular.forEach(self.panels, function(panel) {
            panel.active = false;
            panel.masked = false;
          });

          angular.forEach(panels, function(panel) {
            self.panels[panel].masked = false;
          });
          return this;
        },

        /**
         * Sets the active property of all the panels to false
         * @return {panelGroup}   Returns a chainable reference
         */
        none: function() {
          var self = this;
          angular.forEach(self.panels, function(panel) {
            panel.active = false;
            panel.masked = false;
          });
          return this;
        }
      };

      return {
        panelGroups: [],
        newGroup: function(groupName, panels) {
          if (!angular.isDefined(this.panelGroups[groupName])) {
            this.panelGroups[groupName] = angular.copy(panelGroup);
            if (panels) {
              this.panelGroups[groupName].setPanels(panels);
            }
          }

          return this.panelGroups[groupName];
        }
      };
    });
})();
