import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeightEntry } from '../shared/weight-entry';
import * as fromStore from './store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  weightEntries$: Observable<WeightEntry[]>;

  constructor(private store: Store<fromStore.WeightState>) {}

  ngOnInit(): void {
    this.weightEntries$ = this.store.select(fromStore.getAllWeightEntries);
  }

}
