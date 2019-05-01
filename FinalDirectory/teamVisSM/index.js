import {
  select,
  csv,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom
} from 'd3';
import { dropdownMenu } from './dropdownMenu';
import { scatterPlot } from './scatterPlot';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

let data;
let xColumn;
let yColumn;

const onXColumnClicked = column => {
  xColumn = column;
  render();
};

const onYColumnClicked = column => {
  yColumn = column;
  render();
};

const render = () => {
  
  select('#x-menu')
    .call(dropdownMenu, {
      options: data.columns,
      onOptionClicked: onXColumnClicked,
      selectedOption: xColumn
    });
  
  select('#y-menu')
    .call(dropdownMenu, {
      options: data.columns,
      onOptionClicked: onYColumnClicked,
      selectedOption: yColumn
    });
  
  svg.call(scatterPlot, {
    xValue: d => d[xColumn],
    xAxisLabel: xColumn,
    yValue: d => d[yColumn],
    circleRadius: 10,
    yAxisLabel: yColumn,
    margin: { top: 10, right: 40, bottom: 88, left: 150 },
    width,
    height,
    data
  });
};



csv('data.csv')
  .then(loadedData => {
    data = loadedData;
    data.forEach(d => {
			d.movie_title = +d.movie_title;
   		d.budget = +d.budget;
    	d.gross = +d.gross;
      d.imdb_Score = +d.imdb_score;
    });
  
    xColumn = data.columns[0];
    yColumn = data.columns[1];
    render();