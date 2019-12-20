import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Chart } from 'chart.js';
import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { WeightEntry } from 'src/app/shared/weight-entry';
import { User } from '../user';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss'],
})
export class WeightChartComponent implements OnInit, OnDestroy {

  multi: any[];
  view: any[] = null;

  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Weight';
  yScaleMin = 100;
  yScaleMax = 300;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  chart: Chart;
  name = ['Jordan', 'Zach', 'Dan'];

  @ViewChild('container', {static: true}) container: ElementRef;

  chartEl = null;

  setUsers: User[];

  @Input() users: User[];
  @Input() set weightEntriesMap( entriesMap: { [userId: string]: WeightEntry[] } | WeightEntry[][] ) {

    if (entriesMap && Object.values(entriesMap).length > 0 && Object.values(entriesMap)[0].length > 0) {

      this.view = [ this.container.nativeElement.offsetWidth ];

      this.multi = Object.values(entriesMap)
        .map((entries: WeightEntry[], index: number) => {
          return {
            name: this.users ? this.users.filter(user => user.uid === entries[0].uid)[0].displayName : '',
            series: entries
              .sort((a, b) =>
                a.date.seconds > b.date.seconds ? 1 : a.date.seconds < b.date.seconds ? -1 : 0
              )
              .map(entry => {
              return {
                name: entry.date.toDate(),
                value: entry.value
              };
            })
          };
      });

      if (this.setUsers) {
        this.multi.map( value => {
          value.name = this.setUsers.filter(a => a.uid === value.series[0].uid)[0].displayName;
        });
      }
    }
  }


  constructor() {

  }

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

}
