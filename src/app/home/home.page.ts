import { AuthService } from '../shared/services/auth.service';
import { WeightService } from '../shared/services/weight.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeightEntry } from '../shared/weight-entry';
import * as fromStore from './store';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  weightEntries$: Observable<WeightEntry[]>;
  chart: Chart;
  range: Date;

  constructor(private store: Store<fromStore.WeightState>, public authService: AuthService) {}

  ngOnInit(): void {
    this.weightEntries$ = this.store.select(fromStore.getAllWeightEntries);
  }

  dateRangeChange(startDate: Date) {
    this.range = startDate;
  }

}
