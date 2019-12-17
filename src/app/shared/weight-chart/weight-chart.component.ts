import { Chart } from 'chart.js';
import { Component, OnInit, Input } from '@angular/core';
import { WeightEntry } from 'src/app/shared/weight-entry';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss'],
})
export class WeightChartComponent implements OnInit {

  chart: Chart;

  @Input() set weightEntriesMap( entriesMap: { [userId: string]: WeightEntry[] } ) {

    console.log(entriesMap);
    if (entriesMap) {
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          datasets: []
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              type: 'time',
              ticks: {
                  autoSkip: true,
                  maxTicksLimit: 20
              }
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });

      Object.values(entriesMap).forEach((entries: WeightEntry[]) => {
        this.chart.data.datasets.push({
          data: entries.map(entry => {
            return { x: entry.date.toDate(), y: entry.value  };
          }),
          borderColor: '#00AEFF',
          fill: false,
          spanGaps: true,
          lineTension: 0,
          pointRadius: 1
        });
      });
    }
  }

  constructor() { }

  ngOnInit() {

  }

}
