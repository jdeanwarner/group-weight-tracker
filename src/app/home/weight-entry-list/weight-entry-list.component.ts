import { Component, OnInit, Input } from '@angular/core';
import { WeightEntry } from 'src/app/shared/weight-entry';

@Component({
  selector: 'app-weight-entry-list',
  templateUrl: './weight-entry-list.component.html',
  styleUrls: ['./weight-entry-list.component.scss'],
})
export class WeightEntryListComponent implements OnInit {

  @Input() weightEntries: WeightEntry[];

  constructor() { }

  ngOnInit() {}

  sortByDate(a: WeightEntry, b: WeightEntry) {
    return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
  }

}
