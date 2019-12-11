import { InsertWeightEntry } from './../store/actions/weight-entry.actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firestore } from 'firebase';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-weight-entry',
  templateUrl: './add-weight-entry.page.html',
  styleUrls: ['./add-weight-entry.page.scss'],
})
export class AddWeightEntryPage implements OnInit {

  maxDate: string;
  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    date: new FormControl(new Date().toISOString(), [Validators.required]),
    value: new FormControl([Validators.required])
  });

  constructor(
    private store: Store<fromStore.WeightState>,
    private router: Router) { }

  ngOnInit() {
    this.maxDate = new Date().toISOString();
  }

  save() {
    if (this.formGroup.valid) {
      this.store.dispatch(new InsertWeightEntry({
        ...this.formGroup.value,
        date: firestore.Timestamp.fromDate(new Date(this.formGroup.get('date').value))
      }));

      this.router.navigate(['./home']);
    }
  }

}
