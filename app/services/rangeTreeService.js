var service = angular.module('rangeTreeService', ['drawGraph', 'utils']);

service.service('rangeTreeService', function(drawGraph, utils){

    function computeRangeTree(N, B, bitVectors){
	    var numberOfNodes = Math.trunc(N/B);
		var size = (2 * numberOfNodes) -1;
		var tree = [{'min': 0, 'max': N-1, 'children':[], 'name':'Root', 'nodeInfo': utils.getNodeInfos(0, N-1, bitVectors)}];
		for(var i = 1; i < numberOfNodes ; i++){
			tree[i-1].children =[2*i - 1,2*i];
			var val = tree[i-1];
			var min1 = val.min;
			var max1 = Math.trunc((min1 + val.max)/2);
			var min2 = max1 +1;
			var max2 = val.max;
			var left = 'L' + i;
			var right = 'R' + i;
			
			tree[2*i - 1] ={'min': min1, 'max': max1, 'name': left, 'nodeInfo': utils.getNodeInfos(min1, max1, bitVectors)};
			tree[2*i] ={'min': min2 , 'max': max2, 'name': right, 'nodeInfo': utils.getNodeInfos(min2, max2, bitVectors)};
			
			tree[i-1].graph = [tree[i-1].name + ' -> ' + left, tree[i-1].name + ' -> ' + right];
		}
		return tree;
	}

    function computeGraphRangeTree(tree){
		var digraph = "";
		var edges = "";
		for(var i = 0; i < tree.length ; i++){
			var node = tree[i];
			if(node.graph !== undefined){
				digraph += node.name + " [labelType=\"html\" label=\" <center><span class='bit_count'>"+ node.nodeInfo.sum + " </span></center>\"]; \n"
				edges += node.graph[0] + "\n" +node.graph[1] + "\n";
			}else{
				digraph += node.name + " [labelType=\"html\" label=\" "+
					"<table border ='1px solid black' class='tabInfo'>"+
						"<tr>"+
							"<th>SumOf1s</th> <td> " + node.nodeInfo.sum + "</td>"+
						"</tr>"+
						"<tr>"+
							"<th>Data Block</th> <td><data> " + node.nodeInfo.value + "</data></td>"+
						"</tr>"+
                    "</table> \" "+
                    "shape=rect"+
                " ]; \n";
				//"<center><span class='bit_count'>"+ node.nodeInfo.sum + "</span><br/><span class ='range'>" + node.nodeInfo.value+ "</span> </center>\" shape=rect]; \n"
			}
		}
		digraph += edges ;
		//console.log(digraph);
		return digraph;
	}
	
	this.draw = function (N, B, bitVectors) {
		var N = parseInt(N);
	    var B = parseInt(B);
		if(!utils.power_of_2(N)  || !utils.power_of_2(B) || (N % B)!= 0) { return; }
		var value = computeGraphRangeTree(computeRangeTree(N, B, bitVectors));
        drawGraph.draw(value);
	}
});