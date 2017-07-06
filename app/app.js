var app = angular.module('myApp', ['myCtrl']);
//angular.module('dataStructure', [])
app.directive('myDataStructure', function(){
    return {
        restrict: 'E',
        scope: {
            title: '=',
            inputN: '=',
            inputB: '=',
            generateAndDraw: '=',
            flip: '=',
            bitVectorsSize: '=',
            leafSize: '=',
            bitVectors: '=',
            operations: '=',
			operationChange: '=',
			perform: '=',
            selectedOp: '=',
            titleOfTree: '='
        },
        //template: "<h1>{{title}}</h1>",
        templateUrl: 'data-structure.html',
        replace: true,        
        link: function(scope, elm, attrs) {             
        }
    }
});

app.directive('test', function() {
    return {
        restrict: 'E',
        scope:{name: '='},
        template: "<h1>Hello word! {{name}}</h1>",
        replace: true,        
        link: function(scope, elm, attrs) {             
        }
    }
});
