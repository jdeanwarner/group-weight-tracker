import { Chart } from 'chart.js';
import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { WeightEntry } from 'src/app/shared/weight-entry';
import { User } from '../user';
import * as shape from 'd3-shape';
import { firestore } from 'firebase';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss'],
})
export class WeightChartComponent implements OnInit, OnChanges {

  multi: any[];
  view: any[] = null;

  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = false;
  yAxisLabel = 'Weight';
  yScaleMin = 100;
  yScaleMax = 300;
  curve: any = shape.curveBasis;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  chart: Chart;
  @ViewChild('container', {static: true}) container: ElementRef;

  chartEl = null;

  setUsers: User[];
  weightMap: { [userId: string]: WeightEntry[] } | WeightEntry[][];

  @Input() users: User[];
  @Input() weightEntriesMap: { [userId: string]: WeightEntry[] } | WeightEntry[][];

  getUserName(entries: WeightEntry[], users: User[]) {
    let userName = '';
    if (users) {
      const filteredUsers = users.filter(user => user  && user.uid === entries[0].uid);
      if (filteredUsers && filteredUsers.length > 0) {
        userName = filteredUsers[0].displayName;
      }
    }

    return userName;
  }

  loadChart(entriesMap: { [userId: string]: WeightEntry[] } | WeightEntry[][], users: User[]) {
      this.view = [ this.container.nativeElement.offsetWidth ];

      this.multi = Object.values(entriesMap)
        .map((entries: WeightEntry[], index: number) => {
          return {
            name: this.getUserName(entries, users),
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
  }


  constructor() {

  }

  ngOnChanges(): void {
    if (
      this.users &&
      this.users.length > 0 &&
      this.weightEntriesMap &&
      Object.values(this.weightEntriesMap).length > 0 &&
      Object.values(this.weightEntriesMap)[0].length > 0
    ) {
      this.loadChart(this.weightEntriesMap, this.users);
    }
  }

  ngOnInit() {

  }

  dateRangeChange(event: CustomEvent) {
    if (event.detail.value === 'all') {
      this.loadChart(this.weightEntriesMap, this.users);
    } else if (event.detail.value === 'year') {
      const date = new Date();
      date.setDate( date.getDate() - 6 );
      date.setFullYear( date.getFullYear() - 1 );
      this.filterDate(date);
    } else if (event.detail.value === 'month') {
      const date = new Date();
      date.setDate( date.getDate() - 6 );
      date.setMonth( date.getMonth() - 1 );
      this.filterDate(date);
    }
  }

  filterDate( maxDate: Date ) {
    const keysArr: string[] = Object.keys(this.weightEntriesMap);
    const weightEntries: { [userId: string]: WeightEntry[] } = {};
    Object.values(this.weightEntriesMap).map((entries: WeightEntry[], index: number) => {
      weightEntries[keysArr[index]] = entries.filter((entry: WeightEntry) => entry.date.toDate() >= maxDate);
    });

    this.loadChart(weightEntries, this.users);
  }

}
