import { Component, OnInit, Input } from '@angular/core';
import { DataModel } from './../data/data.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input() data: DataModel[];

  constructor() { }

  ngOnInit() {
  }

}
