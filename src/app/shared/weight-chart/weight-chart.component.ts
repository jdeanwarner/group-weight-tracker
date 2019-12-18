import { Chart } from 'chart.js';
import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { WeightEntry } from 'src/app/shared/weight-entry';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss'],
})
export class WeightChartComponent implements OnInit, OnDestroy {

  chart: Chart;
  chartColor = ['#00AEFF', '#DC143C', '#B8860B', '#006400', '#2F4F4F', '#FFD700'];

  @Input() set weightEntriesMap( entriesMap: { [userId: string]: WeightEntry[] } ) {

    if (entriesMap && Object.values(entriesMap).length > 0 && Object.values(entriesMap)[0].length > 0) {

      this.chart = new Chart('chart', {
        type: 'line',
        data: {
          datasets: Object.values(entriesMap).map((entries: WeightEntry[], index: number) => {
            return {
              data: entries.map(entry => {
                return { x: entry.date.toDate(), y: entry.value  };
              }),
              borderColor: this.chartColor[index],
              fill: false,
              spanGaps: true,
              lineTension: 0,
              pointRadius: 1
            };
          })
        },
        options: {
         responsive: true,
          animation: {
              duration: 0
          },
          hover: {
              animationDuration: 0
          },
          responsiveAnimationDuration: 0,
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
    }
  }

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.chart = null;
  }

}
