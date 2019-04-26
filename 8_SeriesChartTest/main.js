
var focusChart = dc.seriesChart("#test");
var overviewChart = dc.seriesChart("#test-overview");
var teams = ['Boston', 'Cleaveland', 'Warriors', 'Bulls', 'Magics', 'Knicks']
var ndx, runDimension, runGroup, overviewRunDimension, overviewRunGroup;
d3.csv("morley2.csv").then(function(experiments) {
  ndx = crossfilter(experiments);
  runDimension = ndx.dimension(function(d) {return [+d.Expt, +d.Run]; });
  overviewRunDimension = ndx.dimension(function(d) {return [+d.Expt, +d.Run]; });
  runGroup = runDimension.group().reduceSum(function(d) { return +d.Speed; });
  overviewRunGroup = overviewRunDimension.group().reduceSum(function(d) { return +d.Speed; });
  focusChart
    .width(768)
    .height(480)
    .chart(function(c) { return dc.lineChart(c).curve(d3.curveCardinal).evadeDomainFilter(true); })
    .x(d3.scaleLinear().domain([0,20]))
    .brushOn(false)
    .yAxisLabel("Measured Team Elo")
    .yAxisPadding("5%")
    .xAxisLabel("Game")
    .elasticY(true)
    .dimension(runDimension)
    .group(runGroup)
    .mouseZoomable(true)
    .rangeChart(overviewChart)
    .seriesAccessor(function(d) {
    	return teams[d.key[0]-1];
    })    
    .keyAccessor(function(d) {return +d.key[1];})
    .valueAccessor(function(d) {return +d.value;})
    .legend(dc.legend().x(350).y(350).itemHeight(13).gap(5).horizontal(1).legendWidth(140).itemWidth(70));
  focusChart.yAxis().tickFormat(function(d) {return d3.format(',d')(d);});
  focusChart.margins().left += 40;
  
  overviewChart
    .width(768)
    .height(100)
    .chart(function(c) { return dc.lineChart(c).curve(d3.curveCardinal); })
    .x(d3.scaleLinear().domain([0,20]))
    .brushOn(true)
    .xAxisLabel("Game")
    .clipPadding(10)
    .dimension(runDimension)
    .group(runGroup)
    .seriesAccessor(function(d) {
    	return teams[d.key[0]-1];
    })
    .keyAccessor(function(d) {return +d.key[1];})
    .valueAccessor(function(d) {return +d.value;});

  overviewChart.yAxis().tickFormat(function(d) {return null;});
  overviewChart.margins().left += 40;
  dc.renderAll();
});

