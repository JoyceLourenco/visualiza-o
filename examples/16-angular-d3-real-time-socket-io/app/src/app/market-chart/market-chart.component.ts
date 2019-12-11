import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Input,
  OnChanges,
  ViewChild
} from '@angular/core';
import * as d3 from 'd3';

import { MarketPrice } from './../market-price';

@Component({
  selector: 'app-market-chart',
  templateUrl: './market-chart.component.html',
  styleUrls: ['./market-chart.component.css'],
  // Add the onPush change detection strategy so that our chart is only re-rendered when the input changes
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketChartComponent implements OnChanges {
  @Input() marketStatus: MarketPrice[];

  // Notice that we have a local reference to #chart in our HTML file
  @ViewChild('chart', { static: true }) chartElement: ElementRef;

  private svgElement: HTMLElement;
  private chartProps: any;

  parseDate = d3.timeParse('%d-%m-%Y');

  constructor() {}

  ngOnChanges() {}

  formatDate() {
    this.marketStatus.forEach(ms => {
      // Remember - our MarketPrice class defines date as either a string or a Date
      if (typeof ms.date === 'string') {
        ms.date = this.parseDate(ms.date);
      }
    });
  }
}
