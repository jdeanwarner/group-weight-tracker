import { Chart } from 'chart.js';
import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { WeightEntry } from 'src/app/shared/weight-entry';
import { User } from '../user';
import * as shape from 'd3-shape';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

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
  period: string;

  formGroup: FormGroup = new FormGroup({
    period: new FormControl()
  });

  chart: Chart;
  @ViewChild('container', {static: true}) container: ElementRef;

  chartEl = null;

  setUsers: User[];
  weightMap: { [userId: string]: WeightEntry[] } | WeightEntry[][];

  @Input() users: User[];
  @Input() weightEntriesMap: { [userId: string]: WeightEntry[] } | WeightEntry[][];

  getUserName(entries: WeightEntry[], users: User[]) {
    let userName = '';
    if (users && entries && entries.length > 0) {
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

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnChanges(): void {
    if (
      this.users &&
      this.users.length > 0 &&
      this.weightEntriesMap &&
      Object.values(this.weightEntriesMap).length > 0 &&
      Object.values(this.weightEntriesMap)[0].length > 0
    ) {
      this.loadDateRange(this.period);
      this.legend = true;
      if (this.users.length === 1) {
        this.legend = false;
      }
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: {groupId: string, period: string}) => {
      let period = '';
      if (params.period) {
        period = params.period;
      } else {
        period = 'all';
      }

      this.period = period;
      this.loadDateRange(period);
      this.formGroup.get('period').patchValue(period);
    });
  }

  loadDateRange(range: string) {
    if (range === 'all') {
      this.loadChart(this.weightEntriesMap, this.users);
    } else if (range === 'year') {
      const date = new Date();
      date.setDate( date.getDate() - 6 );
      date.setFullYear( date.getFullYear() - 1 );
      this.filterDate(date);
    } else if (range === 'month') {
      const date = new Date();
      date.setDate( date.getDate() - 6 );
      date.setMonth( date.getMonth() - 1 );
      this.filterDate(date);
    } else if (range === 'week') {
      const date = new Date();
      date.setDate( date.getDate() - 7 );
      this.filterDate(date);
    }
  }

  dateRangeChange(event: CustomEvent) {
    this.router.navigate([], {
      queryParams: {
        period: event.detail.value
      }
    });
  }

  filterDate( maxDate: Date ) {
    const keysArr: string[] = Object.keys(this.weightEntriesMap);
    const weightEntries: { [userId: string]: WeightEntry[] } = {};
    Object.values(this.weightEntriesMap).map((entries: WeightEntry[], index: number) => {
      const filteredEntries: WeightEntry[] = entries.filter((entry: WeightEntry) => entry.date.toDate() >= maxDate);
      if (filteredEntries.length > 0 ) {
        weightEntries[keysArr[index]] = filteredEntries;
      }
    });

    this.loadChart(weightEntries, this.users);
  }
}
