var sobRingChart = dc.pieChart("#sob"),
    PUchart = dc.compositeChart("#pu");


var spendData = [
    {Source: 'Web', RNs: '40', Segment: 'V1'},
    {Source: 'Web', RNs: '10', Segment: 'V2'},
    {Source: 'Web', RNs: '20', Segment: 'V3'},
    {Source: 'Web', RNs: '50', Segment: 'V5'},
    {Source: 'Internet', RNs: '90', Segment: 'V1'},
    {Source: 'Internet', RNs: '10', Segment: 'V3'},
    {Source: 'Internet', RNs: '70', Segment: 'V4'},
    {Source: 'Internet', RNs: '10', Segment: 'V2'},
    {Source: 'Internet', RNs: '10', Segment: 'V5'},
    {Source: 'FX', RNs: '20', Segment: 'V1'},
    {Source: 'FX', RNs: '40', Segment: 'V3'},
    {Source: 'FX', RNs: '45', Segment: 'V4'},
    {Source: 'FX', RNs: '50', Segment: 'V2'},
    {Source: 'FX', RNs: '48', Segment: 'V5'},
    {Source: 'FDS', RNs: '20', Segment: 'V1'},
    {Source: 'FDS', RNs: '40', Segment: 'V4'},
    {Source: 'FDS', RNs: '40', Segment: 'V5'}
];
// normalize/parse data
spendData.forEach(function(d) {
    d.RNs = d.RNs.match(/\d+/);
});

// set crossfilter
var ndx = crossfilter(spendData),
    sourceDim  = ndx.dimension(function(d) {return d.Source;}),
    SourceGrp = sourceDim.group().reduceSum(function(d) {return +d.RNs;}),
		all = ndx.groupAll().reduceSum(function(d) {return +d.RNs;});

sobRingChart
    .dimension(sourceDim)
    .group(SourceGrp)
    .innerRadius(50)
    .controlsUseVisibility(true)	
		.label(function (d) {
      if (sobRingChart.hasFilter() && !sobRingChart.hasFilter(d.key)) {
        return d.key + '(0%)';
      }
      var label = d.key;
      if (all.value()) {
        label += '\n(' + Math.floor(d.value / all.value() * 100) + '%)';
      }
      return label;
	})	
	
var spendData2 = crossfilter([
    {Source: 'Web', CY: 40, T: 120, LY: 120},
    {Source: 'Web', CY: 90, T: 100, LY: 120},
    {Source: 'Web', CY: 90, T: 119, LY: 50},
    {Source: 'Web', CY: 90, T: 50, LY: 60},
    {Source: 'Web', CY: 10, T: 0, LY: 60},
    {Source: 'Web', CY: 90,  T: 120, LY: 60},
    {Source: 'Web', CY: 10,  T: 0, LY: 60},
    {Source: 'FDS', CY: 20,  T: 120, LY: 60},
    {Source: 'FDS', CY: 40, T: 0, LY: 60},
    {Source: 'FDS', CY: 80, T: 120, LY: 60},
    {Source: 'FDS', CY: 47, T: 0, LY: 60},
    {Source: 'FX', CY: 20, T: 120, LY: 60},
    {Source: 'FX', CY: 40, T: 0, LY: 60},
		{Source: 'FX', CY: 50, T: 0, LY: 60},
    {Source: 'FX', CY: 95,  T: 120, LY:60},
    {Source: 'FX', CY: 15,  T: 0, LY: 60},
    {Source: 'FX', CY: 25,  T: 120, LY: 60},
    {Source: 'FX', CY: 45, T: 0, LY: 60},
    {Source: 'Internet', CY: 85, T: 120, LY: 60},
    {Source: 'Internet', CY: 45, T: 0, LY:60},
    {Source: 'Internet', CY: 25, T: 120, LY: 60}
]);

  // var TDimension = spendData2.dimension(function(d) { return [d.T, d.Source]; });
  var TDimension = spendData2.dimension(function(d) { return d.T;});
  var sourceDim2 = spendData2.dimension(function(d) { return d.Source; })
  var LY = TDimension.group().reduceSum(function(d) { return d.LY; });
  var CY = TDimension.group().reduceSum(function(d) { return d.CY; });
  

  PUchart
      .transitionDuration(500)
      .brushOn(false)
      .elasticY(true)
      .renderLabel(true)
      .renderHorizontalGridLines(true)
	    .x(d3.scaleLinear().domain([0,120]))
      .dimension(TDimension)
      .compose([
        dc.lineChart(PUchart).group(CY, 'CY'),
        dc.lineChart(PUchart).group(LY, 'LY')
		  ]);
		  
dc.renderAll();

sobRingChart.on('filtered', function(chart) { 
	if(chart.filters().length) sourceDim2.filterFunction(function(k) { 					return chart.filters().indexOf(k) !== -1; }); 
  else {
  	sourceDim2.filter(null);
  }
  dc.redrawAll() 
});