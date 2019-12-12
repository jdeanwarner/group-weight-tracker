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

  @Input() set weightEntries( entries: WeightEntry[]) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.getLabels(entries),
        datasets: [
          {
            data: this.getDataSet(entries),
            borderColor: '#00AEFF',
            fill: false,
            spanGaps: true,
            lineTension: 0,
            pointRadius: 1
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

  constructor() { }

  ngOnInit() {

  }

  getLabels(entries: WeightEntry[]): string[] {
    const days: string[] = [];
    if (entries.length > 0) {
      const date = entries[0].date.toDate();
      const lastDate = entries[entries.length - 1].date.toDate();

      while (date <= lastDate) {
        days.push(date.toDateString());
        date.setDate(date.getDate() + 1);
      }
    }

    return days;

  }

  getDataSet(entries: WeightEntry[]): number[] {
    const data: number [] = [];
    if (entries.length > 0) {
      entries.forEach((entry, index) => {
        if (index === 0 || index === entries.length) {
          data.push(entry.value);
        } else {
          const nextDate = entries[index - 1].date.toDate();
          nextDate.setDate(nextDate.getDate() + 1);
          while (nextDate.getDate() !== entry.date.toDate().getDate()) {
            data.push(null);
            nextDate.setDate(nextDate.getDate() + 1);
          }

          data.push(entry.value);
        }
      });
    }

    return data;
  }

}
