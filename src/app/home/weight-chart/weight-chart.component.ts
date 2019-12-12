import { Chart } from 'chart.js';
import { Component, OnInit, Input } from '@angular/core';
import { WeightEntry } from 'src/app/shared/weight-entry';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss'],
})
export class WeightChartComponent implements OnInit {

  @Input() set weightEntries( entries: WeightEntry[]) {
    console.log(entries.map((entry => entry.date.toDate().toISOString())));
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: entries.map((entry => entry.date.toDate().toDateString())),
        datasets: [
          {
            data: entries.map((entry => entry.value)),
            borderColor: '#00AEFF',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  chart: Chart;

  constructor() { }

  ngOnInit() {

  }

}
