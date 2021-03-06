var app = angular.module('myCtrl', ['rangeTreeService', 'avlTreeService']);
app.controller('myCtrl', function($scope, rangeTreeService, avlTreeService) {
	$scope.operations = [{op:'access', param:1}, {op:'rank', param:1}, {op:'select', param:1}, {op:'modify', param:2}];
	$scope.bitVectorsSize = 32;
	$scope.leafSize = 4;
	
	$scope.perform = false;
	
	$scope.operationChange = function(item){
		//console.log(item);
		//if(item.op != null) {$scope.selectedOp = item.op;}
		$scope.perform = $scope.performOperation(item);
	}
	$scope.performOperation = function(item){
		if(item.op){	
			if((item.op.param==2 && item.index!=null && item.val!=null)
				||(item.op.param==1 && item.index!=null)){
				//console.log(true);
				return true;	
			}
		}
				//console.log(false);
		return false;	
	}
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
		console.log("Passs!!!");
	}

	$scope.randomBitVector();

	//rangeTreeServiceDraw();
	function rangeTreeServiceDraw(){
		rangeTreeService.draw($scope.bitVectorsSize, $scope.leafSize, $scope.bitVectors);
	}

	avlTreeService.draw($scope.bitVectorsSize, $scope.leafSize, $scope.bitVectors);
});
