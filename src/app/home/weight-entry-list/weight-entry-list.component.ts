import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WeightEntry } from 'src/app/shared/weight-entry';

@Component({
  selector: 'app-weight-entry-list',
  templateUrl: './weight-entry-list.component.html',
  styleUrls: ['./weight-entry-list.component.scss'],
})
export class WeightEntryListComponent implements OnInit {

  @Input() weightEntries: WeightEntry[];
  @Input() set range( startDate: Date) {
    this.listToShow = this.weightEntries
      .filter(entry => entry.date.toDate() > startDate)
      .sort(this.sortByDate);
  }

  listToShow: WeightEntry[];

  constructor() { }

  ngOnInit() {}


  sortByDate(a: WeightEntry, b: WeightEntry) {
    return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
  }

}
