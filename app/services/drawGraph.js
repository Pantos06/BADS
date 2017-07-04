angular.module('drawGraph', [])
  .factory('drawGraph', function(){
      function graphToURL() {
		    return '';
	    }	

    // Set up zoom support
    var svg = d3.select("svg"),
      inner = d3.select("svg g"),
      zoom = d3.behavior.zoom().on("zoom", function() {
      inner.attr("transform", "translate(" + d3.event.translate + ")" +
                                    "scale(" + d3.event.scale + ")");
      });
    
    svg.call(zoom);

    // Create and configure the renderer
    var render = dagreD3.render();

    var oldInputGraphValue;
    var graphLink = d3.select("#graphLink");

    return {
      draw: function (value) {
        var digraph = "digraph {/* Note: HTML labels do not work in IE, which lacks support for &lt;foreignObject&gt; tags. */" +
		                  "node [rx=5 ry=5 labelStyle=\"font: 300 14px 'Helvetica Neue', Helvetica\" shape=circle  ]" +
		                  "edge [labelStyle=\"font: 300 14px 'Helvetica Neue', Helvetica\" arrowhead= \"undirected\"] \n" +
                      value +
                      " }"
        var g = graphlibDot.read(digraph);
        // Save link to new graph
        graphLink.attr("href", graphToURL());

        // Set margins, if not present
        if (!g.graph().hasOwnProperty("marginx") &&
          !g.graph().hasOwnProperty("marginy")) {
          g.graph().marginx = 20;
          g.graph().marginy = 20;
        }
        g.graph().transition = function(selection) {
          //console.log(selection);
          //selection[0].parentNode.className = "modify";
          return selection.transition().duration(500);
        };
        // Render the graph into svg g
        d3.select("svg g").call(render, g);
      }
    };
       
  });
