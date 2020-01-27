import { UpdateWeightEntry, DeleteWeightEntry } from './../store/actions/weight-entry.actions';
import { Observable } from 'rxjs';
import { InsertWeightEntry } from '../store/actions/weight-entry.actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firestore } from 'firebase';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { Router } from '@angular/router';
import { WeightEntry } from 'src/app/shared/weight-entry';

@Component({
  selector: 'app-weight-entry',
  templateUrl: './weight-entry.page.html',
  styleUrls: ['./weight-entry.page.scss'],
})
export class WeightEntryPage implements OnInit {

  maxDate: string;
  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    date: new FormControl(new Date().toISOString(), [Validators.required]),
    value: new FormControl([Validators.required]),
    uid: new FormControl()
  });

  selectedEntry$: Observable<WeightEntry>;

  constructor(
    private store: Store<fromStore.WeightState>,
    private router: Router) {
      this.selectedEntry$ = this.store.select(fromStore.getSelectedWeightEntry);
    }

  ngOnInit() {
    this.maxDate = new Date().toISOString();
    this.selectedEntry$.subscribe((entry: WeightEntry) => {
      if ( entry ) {
        this.formGroup.setValue({
          id: entry.id,
          date: entry.date.toDate().toISOString(),
          value: entry.value,
          uid: entry.uid
        });
      }
    });
  }

  save() {
    if (this.formGroup.valid) {
      const saveValue: WeightEntry = {
        ...this.formGroup.value,
        date: firestore.Timestamp.fromDate(new Date(this.formGroup.get('date').value))
      };

      if (saveValue.id) {
        this.store.dispatch(new UpdateWeightEntry(saveValue));
      } else {
        this.store.dispatch(new InsertWeightEntry(saveValue));
      }

      this.router.navigate(['./home']);
    }
  }

  delete() {
    this.store.dispatch(new DeleteWeightEntry(this.formGroup.value.id));
    this.router.navigate(['./home']);
  }

}
