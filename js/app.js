angular.module('myApp', [])
  .directive('markdown', function() {
    var converter = new Showdown.converter();
    var editTemplate = '<textarea ng-show="isEditMode" ng-dblclick="switchToPreview()" rows="10" cols="10" ng-model="markdown"></textarea>';
    var previewTemplate = '<div ng-hide="isEditMode" ng-dblclick="switchToEdit()">preview</div>';
    return {
      restrict: 'E',
      scope: {}, // <- Creates an isolated scope
      compile: function( tElement, tAttrs, transclude) {
        var markdown = tElement.text();

        tElement.html(editTemplate);

        var previewElement = angular.element(previewTemplate);
        tElement.append(previewElement);

        return function(scope, element, attrs) {
          scope.markdown = markdown;
          scope.isEditMode = true;

          scope.switchToPreview = function() {
            var makeHtml = converter.makeHtml(scope.markdown);
            previewElement.html(makeHtml);

            scope.isEditMode = false;
          };

          scope.switchToEdit = function() {
            scope.isEditMode = true;
          };
        }
      }
    }
  });
