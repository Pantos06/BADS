angular.module('avlTreeService', ['AVLTree', 'drawGraph', 'utils'])

.service('avlTreeService', function(AVLTree, drawGraph, utils){
    this.draw = function(N, B, bitVectors){
        var start = 0;
        var N = parseInt(N);
	    var B = parseInt(B);
        var nodes = [{'length': B, 'start': start, 'offset': 0, 'nodeInfo': utils.getNodeInfos(0, B-1, bitVectors)}];
        var myAVLTree = AVLTree.build({'node': nodes[0], 'attr':'start'});
        while((start + B) < N){
            start += B;
            var node = {'length': B, 'start': start, 'offset': 0, 'nodeInfo': utils.getNodeInfos(start, (start + B-1), bitVectors)};
            nodes.push(node);
            myAVLTree.add(node);
        }
        var value = myAVLTree.toString();
        var names ="";
        for(var i = 0; i < nodes.length; i++){
           var node = nodes[i];
            names += node.start + 
                " [labelType=\"html\" label=\"" +
                    /*"<span class='bit_count'>1's: " + node.nodeInfo.sum + "</span><br/>" +
                    "<span class='bit_count'>length: " + node.nodeInfo.size + "</span><br/>" +
                    "<span class='bit_count'>start: " + node.start + "</span><br/>" +
                    "<span class='bit_count'>offset: " + node.offset + "</span><br/>" +
                    "<span class ='range'>" + node.nodeInfo.value + "</span> \" " +*/
                    "<table border ='1px solid black' class='tabInfo'>"+
                    "<tr> <th> SumOf1s </th> <th> Length </th> <th> Start </th> <th> Offset </th> </tr>"+
                    "<tr>"+
                        "<td> " + node.nodeInfo.sum + "</td> <td>" + node.nodeInfo.size + "</td>"+
                        "<td> " + node.start + "</td> <td>" + node.offset + "</td> "+
                    "</tr>"+
                    "<tr><th>Data Block</th><td colspan=3 ><data>" + node.nodeInfo.value + "</data></td></tr>"+
                    "</table> \" "+
                    "shape=rect"+
                " ]; \n";
        }
        value += names;
        drawGraph.draw(value);
    }
});