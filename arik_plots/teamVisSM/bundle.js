(function (d3) {
  'use strict';

  /*
  <select>
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </select>
  */

  const dropdownMenu = (selection, props) => {
    const {
      options,
      onOptionClicked,
      selectedOption
    } = props;
    
    let select = selection.selectAll('select').data([null]);
    select = select.enter().append('select')
      .merge(select)
        .on('change', function() {
          onOptionClicked(this.value);
        });
    
    const option = select.selectAll('option').data(options);
    option.enter().append('option')
      .merge(option)
        .attr('value', d => d)
        .property('selected', d => d === selectedOption)
        .text(d => d);
  };

  const scatterPlot = (selection, props) => {
    const {
      xValue,
      xAxisLabel,
      yValue,
      circleRadius,
      yAxisLabel,
      margin,
      width,
      height,
      data
    } = props;
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();
    
    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0])
      .nice();
    
    const g = selection.selectAll('.container').data([null]);
    const gEnter = g
      .enter().append('g')
        .attr('class', 'container');
    gEnter
      .merge(g)
        .attr('transform',
          `translate(${margin.left},${margin.top})`
        );
    
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);
    
    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);
    
    const yAxisG = g.select('.y-axis');
    const yAxisGEnter = gEnter
      .append('g')
        .attr('class', 'y-axis');
    yAxisG
      .merge(yAxisGEnter)
        .call(yAxis)
        .selectAll('.domain').remove();
    
    const yAxisLabelText = yAxisGEnter
      .append('text')
        .attr('class', 'axis-label')
        .attr('y', -93)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
      .merge(yAxisG.select('.axis-label'))
        .attr('x', -innerHeight / 2)
        .text(yAxisLabel);
    
    
    const xAxisG = g.select('.x-axis');
    const xAxisGEnter = gEnter
      .append('g')
        .attr('class', 'x-axis');
    xAxisG
      .merge(xAxisGEnter)
        .attr('transform', `translate(0,${innerHeight})`)
        .call(xAxis)
        .selectAll('.domain').remove();
    
    const xAxisLabelText = xAxisGEnter
      .append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('fill', 'black')
      .merge(xAxisG.select('.axis-label'))
        .attr('x', innerWidth / 2)
        .text(xAxisLabel);

    
    const circles = g.merge(gEnter)
      .selectAll('circle').data(data);
    circles
      .enter().append('circle')
        .attr('cx', innerWidth / 2)
        .attr('cy', innerHeight / 2)
        .attr('r', 0)
      .merge(circles)
      .transition().duration(2000)
      .delay((d, i) => i * 10)
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circleRadius);
  };

  const svg = d3.select('svg');

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
    
    d3.select('#x-menu')
      .call(dropdownMenu, {
        options: data.columns,
        onOptionClicked: onXColumnClicked,
        selectedOption: xColumn
      });
    
    d3.select('#y-menu')
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



  d3.csv('team1.csv')
    .then(loadedData => {
      data = loadedData;
      data.forEach(d => {
        d.mpg = +d.mpg;
        d.cylinders = +d.cylinders;
        d.displacement = +d.displacement;
        d.horsepower = +d.horsepower;
        d.weight = +d.weight;
        d.acceleration = +d.acceleration;
        d.year = +d.year;  
      });
      xColumn = data.columns[4];
      yColumn = data.columns[0];
      render();
    });

}(d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2Ryb3Bkb3duTWVudS5qcyIsIi4uL3NjYXR0ZXJQbG90LmpzIiwiLi4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbjxzZWxlY3Q+XG4gIDxvcHRpb24gdmFsdWU9XCJ2b2x2b1wiPlZvbHZvPC9vcHRpb24+XG4gIDxvcHRpb24gdmFsdWU9XCJzYWFiXCI+U2FhYjwvb3B0aW9uPlxuICA8b3B0aW9uIHZhbHVlPVwibWVyY2VkZXNcIj5NZXJjZWRlczwvb3B0aW9uPlxuICA8b3B0aW9uIHZhbHVlPVwiYXVkaVwiPkF1ZGk8L29wdGlvbj5cbjwvc2VsZWN0PlxuKi9cblxuZXhwb3J0IGNvbnN0IGRyb3Bkb3duTWVudSA9IChzZWxlY3Rpb24sIHByb3BzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBvcHRpb25zLFxuICAgIG9uT3B0aW9uQ2xpY2tlZCxcbiAgICBzZWxlY3RlZE9wdGlvblxuICB9ID0gcHJvcHM7XG4gIFxuICBsZXQgc2VsZWN0ID0gc2VsZWN0aW9uLnNlbGVjdEFsbCgnc2VsZWN0JykuZGF0YShbbnVsbF0pO1xuICBzZWxlY3QgPSBzZWxlY3QuZW50ZXIoKS5hcHBlbmQoJ3NlbGVjdCcpXG4gICAgLm1lcmdlKHNlbGVjdClcbiAgICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIG9uT3B0aW9uQ2xpY2tlZCh0aGlzLnZhbHVlKTtcbiAgICAgIH0pO1xuICBcbiAgY29uc3Qgb3B0aW9uID0gc2VsZWN0LnNlbGVjdEFsbCgnb3B0aW9uJykuZGF0YShvcHRpb25zKTtcbiAgb3B0aW9uLmVudGVyKCkuYXBwZW5kKCdvcHRpb24nKVxuICAgIC5tZXJnZShvcHRpb24pXG4gICAgICAuYXR0cigndmFsdWUnLCBkID0+IGQpXG4gICAgICAucHJvcGVydHkoJ3NlbGVjdGVkJywgZCA9PiBkID09PSBzZWxlY3RlZE9wdGlvbilcbiAgICAgIC50ZXh0KGQgPT4gZCk7XG59OyIsImltcG9ydCB7XG4gIHNlbGVjdCxcbiAgY3N2LFxuICBzY2FsZUxpbmVhcixcbiAgZXh0ZW50LFxuICBheGlzTGVmdCxcbiAgYXhpc0JvdHRvbVxufSBmcm9tICdkMyc7XG5cbmV4cG9ydCBjb25zdCBzY2F0dGVyUGxvdCA9IChzZWxlY3Rpb24sIHByb3BzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICB4VmFsdWUsXG4gICAgeEF4aXNMYWJlbCxcbiAgICB5VmFsdWUsXG4gICAgY2lyY2xlUmFkaXVzLFxuICAgIHlBeGlzTGFiZWwsXG4gICAgbWFyZ2luLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBkYXRhXG4gIH0gPSBwcm9wcztcbiAgXG4gIGNvbnN0IGlubmVyV2lkdGggPSB3aWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBjb25zdCBpbm5lckhlaWdodCA9IGhlaWdodCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuICBcbiAgY29uc3QgeFNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oZXh0ZW50KGRhdGEsIHhWYWx1ZSkpXG4gICAgLnJhbmdlKFswLCBpbm5lcldpZHRoXSlcbiAgICAubmljZSgpO1xuICBcbiAgY29uc3QgeVNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oZXh0ZW50KGRhdGEsIHlWYWx1ZSkpXG4gICAgLnJhbmdlKFtpbm5lckhlaWdodCwgMF0pXG4gICAgLm5pY2UoKTtcbiAgXG4gIGNvbnN0IGcgPSBzZWxlY3Rpb24uc2VsZWN0QWxsKCcuY29udGFpbmVyJykuZGF0YShbbnVsbF0pO1xuICBjb25zdCBnRW50ZXIgPSBnXG4gICAgLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdjb250YWluZXInKTtcbiAgZ0VudGVyXG4gICAgLm1lcmdlKGcpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJyxcbiAgICAgICAgYHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwke21hcmdpbi50b3B9KWBcbiAgICAgICk7XG4gIFxuICBjb25zdCB4QXhpcyA9IGF4aXNCb3R0b20oeFNjYWxlKVxuICAgIC50aWNrU2l6ZSgtaW5uZXJIZWlnaHQpXG4gICAgLnRpY2tQYWRkaW5nKDE1KTtcbiAgXG4gIGNvbnN0IHlBeGlzID0gYXhpc0xlZnQoeVNjYWxlKVxuICAgIC50aWNrU2l6ZSgtaW5uZXJXaWR0aClcbiAgICAudGlja1BhZGRpbmcoMTApO1xuICBcbiAgY29uc3QgeUF4aXNHID0gZy5zZWxlY3QoJy55LWF4aXMnKTtcbiAgY29uc3QgeUF4aXNHRW50ZXIgPSBnRW50ZXJcbiAgICAuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICd5LWF4aXMnKTtcbiAgeUF4aXNHXG4gICAgLm1lcmdlKHlBeGlzR0VudGVyKVxuICAgICAgLmNhbGwoeUF4aXMpXG4gICAgICAuc2VsZWN0QWxsKCcuZG9tYWluJykucmVtb3ZlKCk7XG4gIFxuICBjb25zdCB5QXhpc0xhYmVsVGV4dCA9IHlBeGlzR0VudGVyXG4gICAgLmFwcGVuZCgndGV4dCcpXG4gICAgICAuYXR0cignY2xhc3MnLCAnYXhpcy1sYWJlbCcpXG4gICAgICAuYXR0cigneScsIC05MylcbiAgICAgIC5hdHRyKCdmaWxsJywgJ2JsYWNrJylcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgcm90YXRlKC05MClgKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgLm1lcmdlKHlBeGlzRy5zZWxlY3QoJy5heGlzLWxhYmVsJykpXG4gICAgICAuYXR0cigneCcsIC1pbm5lckhlaWdodCAvIDIpXG4gICAgICAudGV4dCh5QXhpc0xhYmVsKTtcbiAgXG4gIFxuICBjb25zdCB4QXhpc0cgPSBnLnNlbGVjdCgnLngtYXhpcycpO1xuICBjb25zdCB4QXhpc0dFbnRlciA9IGdFbnRlclxuICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3gtYXhpcycpO1xuICB4QXhpc0dcbiAgICAubWVyZ2UoeEF4aXNHRW50ZXIpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgwLCR7aW5uZXJIZWlnaHR9KWApXG4gICAgICAuY2FsbCh4QXhpcylcbiAgICAgIC5zZWxlY3RBbGwoJy5kb21haW4nKS5yZW1vdmUoKTtcbiAgXG4gIGNvbnN0IHhBeGlzTGFiZWxUZXh0ID0geEF4aXNHRW50ZXJcbiAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzLWxhYmVsJylcbiAgICAgIC5hdHRyKCd5JywgNzUpXG4gICAgICAuYXR0cignZmlsbCcsICdibGFjaycpXG4gICAgLm1lcmdlKHhBeGlzRy5zZWxlY3QoJy5heGlzLWxhYmVsJykpXG4gICAgICAuYXR0cigneCcsIGlubmVyV2lkdGggLyAyKVxuICAgICAgLnRleHQoeEF4aXNMYWJlbCk7XG5cbiAgXG4gIGNvbnN0IGNpcmNsZXMgPSBnLm1lcmdlKGdFbnRlcilcbiAgICAuc2VsZWN0QWxsKCdjaXJjbGUnKS5kYXRhKGRhdGEpO1xuICBjaXJjbGVzXG4gICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgLmF0dHIoJ2N4JywgaW5uZXJXaWR0aCAvIDIpXG4gICAgICAuYXR0cignY3knLCBpbm5lckhlaWdodCAvIDIpXG4gICAgICAuYXR0cigncicsIDApXG4gICAgLm1lcmdlKGNpcmNsZXMpXG4gICAgLnRyYW5zaXRpb24oKS5kdXJhdGlvbigyMDAwKVxuICAgIC5kZWxheSgoZCwgaSkgPT4gaSAqIDEwKVxuICAgICAgLmF0dHIoJ2N5JywgZCA9PiB5U2NhbGUoeVZhbHVlKGQpKSlcbiAgICAgIC5hdHRyKCdjeCcsIGQgPT4geFNjYWxlKHhWYWx1ZShkKSkpXG4gICAgICAuYXR0cigncicsIGNpcmNsZVJhZGl1cyk7XG59OyIsImltcG9ydCB7XG4gIHNlbGVjdCxcbiAgY3N2LFxuICBzY2FsZUxpbmVhcixcbiAgZXh0ZW50LFxuICBheGlzTGVmdCxcbiAgYXhpc0JvdHRvbVxufSBmcm9tICdkMyc7XG5pbXBvcnQgeyBkcm9wZG93bk1lbnUgfSBmcm9tICcuL2Ryb3Bkb3duTWVudSc7XG5pbXBvcnQgeyBzY2F0dGVyUGxvdCB9IGZyb20gJy4vc2NhdHRlclBsb3QnO1xuXG5jb25zdCBzdmcgPSBzZWxlY3QoJ3N2ZycpO1xuXG5jb25zdCB3aWR0aCA9ICtzdmcuYXR0cignd2lkdGgnKTtcbmNvbnN0IGhlaWdodCA9ICtzdmcuYXR0cignaGVpZ2h0Jyk7XG5cbmxldCBkYXRhO1xubGV0IHhDb2x1bW47XG5sZXQgeUNvbHVtbjtcblxuY29uc3Qgb25YQ29sdW1uQ2xpY2tlZCA9IGNvbHVtbiA9PiB7XG4gIHhDb2x1bW4gPSBjb2x1bW47XG4gIHJlbmRlcigpO1xufTtcblxuY29uc3Qgb25ZQ29sdW1uQ2xpY2tlZCA9IGNvbHVtbiA9PiB7XG4gIHlDb2x1bW4gPSBjb2x1bW47XG4gIHJlbmRlcigpO1xufTtcblxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICBcbiAgc2VsZWN0KCcjeC1tZW51JylcbiAgICAuY2FsbChkcm9wZG93bk1lbnUsIHtcbiAgICAgIG9wdGlvbnM6IGRhdGEuY29sdW1ucyxcbiAgICAgIG9uT3B0aW9uQ2xpY2tlZDogb25YQ29sdW1uQ2xpY2tlZCxcbiAgICAgIHNlbGVjdGVkT3B0aW9uOiB4Q29sdW1uXG4gICAgfSk7XG4gIFxuICBzZWxlY3QoJyN5LW1lbnUnKVxuICAgIC5jYWxsKGRyb3Bkb3duTWVudSwge1xuICAgICAgb3B0aW9uczogZGF0YS5jb2x1bW5zLFxuICAgICAgb25PcHRpb25DbGlja2VkOiBvbllDb2x1bW5DbGlja2VkLFxuICAgICAgc2VsZWN0ZWRPcHRpb246IHlDb2x1bW5cbiAgICB9KTtcbiAgXG4gIHN2Zy5jYWxsKHNjYXR0ZXJQbG90LCB7XG4gICAgeFZhbHVlOiBkID0+IGRbeENvbHVtbl0sXG4gICAgeEF4aXNMYWJlbDogeENvbHVtbixcbiAgICB5VmFsdWU6IGQgPT4gZFt5Q29sdW1uXSxcbiAgICBjaXJjbGVSYWRpdXM6IDEwLFxuICAgIHlBeGlzTGFiZWw6IHlDb2x1bW4sXG4gICAgbWFyZ2luOiB7IHRvcDogMTAsIHJpZ2h0OiA0MCwgYm90dG9tOiA4OCwgbGVmdDogMTUwIH0sXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIGRhdGFcbiAgfSk7XG59O1xuXG5cblxuY3N2KCdodHRwczovL3Zpemh1Yi5jb20vY3VycmFuL2RhdGFzZXRzL2F1dG8tbXBnLmNzdicpXG4gIC50aGVuKGxvYWRlZERhdGEgPT4ge1xuICAgIGRhdGEgPSBsb2FkZWREYXRhO1xuICAgIGRhdGEuZm9yRWFjaChkID0+IHtcbiAgICAgIGQubXBnID0gK2QubXBnO1xuICAgICAgZC5jeWxpbmRlcnMgPSArZC5jeWxpbmRlcnM7XG4gICAgICBkLmRpc3BsYWNlbWVudCA9ICtkLmRpc3BsYWNlbWVudDtcbiAgICAgIGQuaG9yc2Vwb3dlciA9ICtkLmhvcnNlcG93ZXI7XG4gICAgICBkLndlaWdodCA9ICtkLndlaWdodDtcbiAgICAgIGQuYWNjZWxlcmF0aW9uID0gK2QuYWNjZWxlcmF0aW9uO1xuICAgICAgZC55ZWFyID0gK2QueWVhcjsgIFxuICAgIH0pO1xuICAgIHhDb2x1bW4gPSBkYXRhLmNvbHVtbnNbNF07XG4gICAgeUNvbHVtbiA9IGRhdGEuY29sdW1uc1swXTtcbiAgICByZW5kZXIoKTtcbiAgfSk7Il0sIm5hbWVzIjpbInNjYWxlTGluZWFyIiwiZXh0ZW50IiwiYXhpc0JvdHRvbSIsImF4aXNMZWZ0Iiwic2VsZWN0IiwiY3N2Il0sIm1hcHBpbmdzIjoiOzs7RUFBQTs7Ozs7Ozs7O0FBU0EsRUFBTyxNQUFNLFlBQVksR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLEtBQUs7SUFDaEQsTUFBTTtNQUNKLE9BQU87TUFDUCxlQUFlO01BQ2YsY0FBYztLQUNmLEdBQUcsS0FBSyxDQUFDOztJQUVWLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4RCxNQUFNLEdBQUcsTUFB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