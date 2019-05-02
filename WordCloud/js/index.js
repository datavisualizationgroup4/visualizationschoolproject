let adjectives  = ['elusive', 'holistic', 'defensive', 'offensive', 'team-player', 'aggressive', 'flashy', 'passive-aggressive', 'dunk-kings', 'three-point-kings', 'Percentage-kings',  'dynamic',

  'dysfunctional',

  'eager'];
let teams = ['TEAM 1', 'TEAM 2', 'TEAM 3'];


  
var words = adjectives
		.map(function(d,i) {
			//console.log(d);
        	return {text: d, size: -i};
        });

var fontName = "Impact",
	cWidth = 800,
	cHeight = 400,
	svg,
	wCloud,
	bbox,
	ctm,
	bScale,
	bWidth,
	bHeight,
	bMidX,
	bMidY,
	bDeltaX,
	bDeltaY;

var cTemp = document.createElement('canvas'),
	ctx = cTemp.getContext('2d');
	ctx.font = "100px " + fontName;

var fRatio = Math.min(cWidth, cHeight) / ctx.measureText(words[0].text).width,
	fontScale = d3.scale.linear()
		.domain([
			d3.min(words, function(d) { return d.size; }), 
			d3.max(words, function(d) { return d.size; })
		])
		//.range([20,120]),
		.range([20,100*fRatio/2]), // tbc
	fill = d3.scale.category20();

d3.layout.cloud()
	.size([cWidth, cHeight])
	.words(words)
	//.padding(2) // controls
	.rotate(function() { return ~~(Math.random() * 2) * 90; })
	.font(fontName)
	.fontSize(function(d) { return fontScale(d.size) })
	.on("end", draw)
	.start();

function draw(words, bounds) {
	// move and scale cloud bounds to canvas
	// bounds = [{x0, y0}, {x1, y1}]
	bWidth = bounds[1].x - bounds[0].x;
	bHeight = bounds[1].y - bounds[0].y;
	bMidX = bounds[0].x + bWidth/2;
	bMidY = bounds[0].y + bHeight/2;
	bDeltaX = cWidth/2 - bounds[0].x + bWidth/2;
	bDeltaY = cHeight/2 - bounds[0].y + bHeight/2;
	bScale = bounds ? Math.min( cWidth / bWidth, cHeight / bHeight) : 1;
	
	console.log(
		"bounds (" + bounds[0].x + 
		", " + bounds[0].y + 
		", " + bounds[1].x + 
		", " + bounds[1].y + 
		"), width " + bWidth +
		", height " + bHeight +
		", mid (" + bMidX +
		", " + bMidY +
		"), delta (" + bDeltaX +
		", " + bDeltaY +
		"), scale " + bScale
	);
	
	// the library's bounds seem not to correspond to reality?
	// try using .getBBox() instead?
	
	svg = d3.select(".cloud").append("svg")
		.attr("width", cWidth)
		.attr("height", cHeight);
	
	wCloud = svg.append("g")
		//.attr("transform", "translate(" + [bDeltaX, bDeltaY] + ") scale(" + 1 + ")") // nah!
		.attr("transform", "translate(" + [bWidth>>1, bHeight>>1] + ") scale(" + bScale + ")") // nah!
		.selectAll("text")
		.data(words)
		.enter().append("text")
		.style("font-size", function(d) { return d.size + "px"; })
		.style("font-family", fontName)
		.style("fill", function(d, i) { return fill(i); })
		.attr("text-anchor", "middle")
		.transition()
		.duration(500)
		.attr("transform", function(d) {
			return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		})
		.text(function(d) { return d.text; });
	
	// TO DO: function to find min and max x,y of all words
	// and use it as the group's bbox
	// then do the transformation
	bbox = wCloud.node(0).getBBox();
	//ctm = wCloud.node().getCTM();
	console.log(
		"bbox (x: " + bbox.x + 
		", y: " + bbox.y + 
		", w: " + bbox.width + 
		", h: " + bbox.height + 
		")"
	);
	
};

var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden")
	.text(`String text ${teams}`);

d3.select("svg > *").on("mouseover", function(){return tooltip.style("visibility", "visible");})
.on("mousemove", function(){return tooltip.style("top",
    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
.on("mouseout", function(){return tooltip.style("visibility", "hidden");});


function sortByFrequency(arr) {
	var f = {};
	arr.forEach(function(i) { f[i] = 0; });
	var u = arr.filter(function(i) { return ++f[i] == 1; });
	return u.sort(function(a, b) { return f[b] - f[a]; });
}
let findMaxPosition = function(arrayInput)

{

    let maxVal = Math.max(...arrayInput);

    let counter = 0;

    
    while(arrayInput[counter] != maxVal)

    {

        counter++;

        console.log("hi");

    }

    console.log("hi");

    return counter;

}

//let convertObjToArray

d3.csv("finalData.csv").then(function(data) {

 

let totalSumFG = new Array(14);

let totalSumFGA = new Array(14);

let totalSumFGPer = new Array(14);

let totalSum3P = new Array(14);

let totalSum3PA = new Array(14);

let totalSum3Per = new Array(14);

let totalSumFT = new Array(14);

let totalSumFTA = new Array(14);

let totalSumFTPer = new Array(14);

let totalSumORB = new Array(14);

let totalSumDRB = new Array(14);

let totalSumTRB = new Array(14);

let totalSumAST = new Array(14);

let totalSumSTL = new Array(14);

let totalSumBLK = new Array(14);

let totalSumTOV = new Array(14);

let totalSumPF = new Array(14);

    //data.forEach(function(d) {

// console.log(data); // [{"Hello": "world"}, …]

//console.log(data[0]);

data.forEach(function(d) {

  

    d["FG"] = parseFloat(d["FG"]);

    d["FGA"] = parseFloat(d["FGA"]);

    d["FG%"] = parseFloat(d["FG%"]);
	d["3P"] = parseFloat(d["3P"]);
	d["3PA"] = parseFloat(d["3PA"]);
	d["3P%"] = parseFloat(d["3P%"]);
	d["FT"] = parseFloat(d["FT"]);
	d["FT%"] = parseFloat(d["FT%"]);
	d["ORB"] = parseFloat(d["ORB"]);
	d["DRB"] = parseFloat(d["DRB"]);
	d["TRB"] = parseFloat(d["TRB"]);
	d["AST"] = parseFloat(d["AST"]);
	d["STL"] = parseFloat(d["STL"]);
	d["BLK"] = parseFloat(d["TOV"]);
	d["PF"] = parseFloat(d["PF"]);

    /*

    totalSumFG[0] = [d3.sum(data.map(function(d){ if(d["TEAM"] == 1) return parseFloat(d["FG"]

     );}))];

     totalSumFG[1] = [d3.sum(data.map(function(d){ if(d["TEAM"] == 2) return parseFloat(d["FG"]

     );}))];*/

//if (d["TEAM"] == 1){

    //console.log("hisok");

   for (let i = 0; i < 14; i++){

 

   let teamNum = i + 1;

     totalSumFG[i] = d3.sum(data.map(function(d){ if(d["TEAM"] == teamNum) return parseFloat(d["FG"]

     );}));

     totalSumFGA[i] = d3.sum(data.map(function(d){ if(d["TEAM"] == teamNum) return parseFloat(d["FGA"]

    );}));

    totalSumFGPer[i] = d3.sum(data.map(function(d){ if(d["TEAM"] == teamNum) return parseFloat(d["FG%"]

);}));
	totalSum3P[i] = d3.sum(data.map(function(d){ if(d["TEAM"] == teamNum) return parseFloat(d["3P"]

);}));
totalSumFGPer[i] = d3.sum(data.map(function(d){ if(d["TEAM"] == teamNum) return parseFloat(d["FG%"]

);}));

/*

totalSum3P[i] = [d3.sum(data.map(function(d){ if(d["TEAM"] == teamNum) return parseFloat(d["3P"]

);}))];

totalSum3PA[i] = [d3.sum(data.map(function(d){ if(d["TEAM"] == teamNum) return parseFloat(d["FG"]

);}))];

totalSum3Per[i] = [d3.sum(data.map(function(d){ if(d["TEAM"] == teamNum) return parseFloat(d["FG"]

);}))];

let totalSumFT[i] = [d3.sum(data.map(function(d){ if(d["TEAM"] == teamNum) return parseFloat(d["FG"]

);}))];

totalSumFG[i] = [d3.sum(data.map(function(d){ if(d["TEAM"] == teamNum) return parseFloat(d["FG"]

);}))];

totalSumFG[i] = [d3.sum(data.map(function(d){ if(d["TEAM"] == teamNum) return parseFloat(d["FG"]

);}))];

totalSumFG[i] = [d3.sum(data.map(function(d){ if(d["TEAM"] == teamNum) return parseFloat(d["FG"]

);}))];*/

   }

      /* d3.sum(data.map(function(d){ return d.})),

       d3.sum(data.map(function(d){ return d.march}))];

 

    console.log(totalSum);//[4, 9, 12]

*/

 

   

//} 

//

 

    // d["FG"] = parseFloat(d["FG"]);




  });

  console.log("hi");

  console.log(totalSumFG[13]);

  console.log((totalSumFG));

  console.log(array);

 console.log(findMaxPosition(totalSumFG));
 //console.log(Math.max(...totalSumFG));

//  console.log(data[0]);

// console.log(totalSum);

// document.getElementById("textData2").innerHTML = data[0];

});