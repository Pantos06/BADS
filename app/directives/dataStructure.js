angular.module('dataStructure', [])
.directive('dataStructure', function(dataStructure){
    return {
        restrict: 'E',
        scope: {
            title: '=',
            inputN: '&',
            inputB: '&',
            generateAndDraw: '&',
            flip: '&',
            bitVectorsSize: '=',
            leafSize: '=',
            bitVectors: '='
        },
        templateUrl: 'data-structure.html'
    }
});