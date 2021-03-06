import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from '@angular/core';
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

  @ViewChild('container', {static: true}) container: ElementRef;

  @Input() users: User[];
  @Input() weightEntriesMap: { [userId: string]: WeightEntry[] } | WeightEntry[][];
  @Output() rangeChange: EventEmitter<Date> = new EventEmitter<Date>();

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
    if (this.container.nativeElement.offsetWidth && this.container.nativeElement.offsetWidth > 0) {
      this.view = [ this.container.nativeElement.offsetWidth ];
    }

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
    let date = new Date();
    switch (range) {
      case 'all':
        const minDateWeights: WeightEntry[] = Object.values(this.weightEntriesMap)
        .reduce((flat, toFlatten) => flat.concat(toFlatten))
        .sort((a: WeightEntry, b: WeightEntry) => a.date.toDate().getTime() - b.date.toDate().getTime())
        .filter((item: WeightEntry, index: number, array: WeightEntry[]) =>
          item.date.toDate().getTime() === array[0].date.toDate().getTime()
        );
        date = minDateWeights && minDateWeights[0] ? minDateWeights[0].date.toDate() : new Date();
        break;
      case 'year':
        date.setDate( date.getDate() - 6 );
        date.setFullYear( date.getFullYear() - 1 );
        break;
      case 'month':
        date.setDate( date.getDate() - 6 );
        date.setMonth( date.getMonth() - 1 );
        break;
      case 'week':
        date.setDate( date.getDate() - 7 );
        break;
    }

    this.rangeChange.emit(date);
    this.filterDate(date);
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
