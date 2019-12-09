import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import { DataModel } from './../data/data.model';

@Component({
  selector: 'app-bar-chart',
  // Dynamic modifications to the DOM by D3 do not play well with default Angular styling; set ViewEncapsulation.None
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges {
  @ViewChild('chart', { static: true })
  private chartContainer: ElementRef;

  @Input() data: DataModel[];

  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  constructor() {}

  ngOnChanges(): void {
    if (!this.data) {
      return;
    }
    this.createChart();
  }

  onResize() {
    this.createChart();
  }

  private createChart(): void {
    d3.select('svg').remove();

    // Use our HTML container element to determine the width and height of our D3 generated chart
    const element = this.chartContainer.nativeElement;

    // Use the data supplied via our Input property
    const data = this.data;

    // Draw our SVG chart using the container element's width and height
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // Calculate our content width based on our container element and left and right margins
    const contentWidth =
      element.offsetWidth - this.margin.left - this.margin.right;

    // Calculate our content height based on our container element and top and bottom margins
    const contentHeight =
      element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.letter));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.frequency)]);

    const g = svg
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ', ' + this.margin.top + ')'
      );

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.letter))
      .attr('y', d => y(d.frequency))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.frequency));
  }
}
