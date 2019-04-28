
var focusChart = dc.seriesChart("#test");
var overviewChart = dc.seriesChart("#test-overview");
var teams = ['Boston 1986', 'Boston 2008', 'Chicago 1991', 'Chicago 1996', 'Chicago 1997', 
'Cleveland 2016', 'Dallas 2011', 'Golden State 2015', 'Golden State 2017', 'Los Angeles 1987', 
'Los Angeles 2002', 'Los Angeles 2009', 'Miami 2013', 'San Antonio 2014'];
var cvsNdx, runDimension, runGroup, overviewRunDimension, overviewRunGroup;
d3.csv("finalData.csv").then(function(experiments) {

  ndx = crossfilter(experiments);

  runDimension = ndx.dimension(function(d) {return [+d.TEAM, +d.GAME]; });

  // console.log(runDimension.top(Infinity));
  // var gamesDomain = Math.floor(runDimension.top(Infinity).length / teams.length);

  overviewRunDimension = ndx.dimension(function(d) {return [+d.TEAM, +d.GAME]; });
  runGroup = runDimension.group().reduceSum(function(d) { return +d.FG; });
  overviewRunGroup = overviewRunDimension.group().reduceSum(function(d) { return +d.FG; });
  focusChart
    .width(768)
    .height(480)
    .chart(function(c) { return dc.lineChart(c).curve(d3.curveCardinal).evadeDomainFilter(true); })
    .x(d3.scaleLinear().domain([0,82]))
    .brushOn(false)
    .yAxisLabel("Field Goals")
    .yAxisPadding("5%")
    .xAxisLabel("Games Played")
    .elasticY(true)
    .dimension(runDimension)
    .group(runGroup)
    .mouseZoomable(true)
    .rangeChart(overviewChart)
    .seriesAccessor(function(d) {return teams[d.key[0] - 1];})
    .keyAccessor(function(d) {return +d.key[1];})
    .valueAccessor(function(d) {return +d.value;})
    // .legend(dc.legend().x(350).y(350).itemHeight(13).gap(5).horizontal(1).legendWidth(140).itemWidth(70));
    .legend(dc.htmlLegend().container('#legend').horizontal(false).highlightSelected(true));
  focusChart.yAxis().tickFormat(function(d) {return d3.format(',d')(d);});
  focusChart.margins().left += 40;
  
  overviewChart
    .width(768)
    .height(100)
    .chart(function(c) { return dc.lineChart(c).curve(d3.curveCardinal); })
    .x(d3.scaleLinear().domain([0,82]))
    .brushOn(true)
    .xAxisLabel("Run")
    .clipPadding(10)
    .dimension(runDimension)
    .group(runGroup)
    .seriesAccessor(function(d) {return teams[d.key[0] - 1];})
    .keyAccessor(function(d) {return +d.key[1];})
    .valueAccessor(function(d) {return +d.value;});



  var pieChart = dc.pieChart("#piechart");

  var statsDimension = ndx.dimension(function (d) {
    // console.log(Object.keys(d));
    // console.log([teams[d.TEAM - 1]]);
    return [teams[d.TEAM - 1]];
  });

  var sumGroup = statsDimension.group().reduceSum(function(d) {
    return d.GAME;
  });

  pieChart
    .width(768)
    .height(480)
    .slicesCap(teams.length)
    .innerRadius(100)
    .externalLabels(50)
    .externalRadiusPadding(50)
    .drawPaths(true)
    .dimension(statsDimension)
    .group(sumGroup)
    .legend(dc.legend());
  pieChart.on('pretransition', function(chart) {
      pieChart.selectAll('.pie-slice')
          .on('click', function(d) {
            // runGroup = runDimension.group().reduceSum(function(d) { return +d['3P%']; });
            // overviewRunGroup = overviewRunDimension.group().reduceSum(function(d) { return +d['3P%']; });
            // focusChart
            //   .group(runGroup)
            //   .redraw()
            // console.log(teams[d.index]);
          });
  })

  dc.renderAll();
});

