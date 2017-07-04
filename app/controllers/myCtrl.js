var app = angular.module('myApp', ['rangeTreeService', 'avlTreeService']);
app.controller('myCtrl', function($scope, rangeTreeService, avlTreeService) {
	
	$scope.bitVectorsSize = 32;
	$scope.leafSize = 4;
	
	$scope.randomBitVector = function(){
		if($scope.bitVectorsSize!==null){
			$scope.bitVectors = [];
			for(var i = 0; i < parseInt($scope.bitVectorsSize); i++){
				$scope.bitVectors.push(Math.floor(Math.random() * (2)));
			}
		}
	}
	$scope.flip = function(index, bit){
		$scope.bitVectors[index] = 1-bit;
		 rangeTreeServiceDraw();
	}
	$scope.inputN = function(){
		if($scope.bitVectorsSize!==null){
			$scope.randomBitVector();
			if(($scope.leafSize !== null && $scope.leafSize)){
				rangeTreeServiceDraw();
			}
		}
	}
	$scope.inputB = function(){
		if(($scope.leafSize !== null && $scope.leafSize) && $scope.bitVectorsSize!==null){
				rangeTreeServiceDraw();
		}
	}

	$scope.tryDraw = function(){
		rangeTreeServiceDraw();
	}

	$scope.generateAndDraw = function(){
		//$scope.drawBitVector();
		//rangeTreeServiceDraw();
	}

	$scope.randomBitVector();

	//rangeTreeServiceDraw();
	function rangeTreeServiceDraw(){
		rangeTreeService.draw($scope.bitVectorsSize, $scope.leafSize, $scope.bitVectors);
	}

	avlTreeService.draw($scope.bitVectorsSize, $scope.leafSize, $scope.bitVectors);
});