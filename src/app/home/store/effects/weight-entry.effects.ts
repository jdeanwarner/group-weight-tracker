import { WeightService } from './../../../shared/weight.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as weightEntryActions from '../actions/weight-entry.actions';
import { DocumentReference } from '@angular/fire/firestore';
import { WeightEntry } from 'src/app/shared/weight-entry';

@Injectable()
export class WeightEntryEffects {

  constructor(
    private actions$: Actions,
    private weightService: WeightService,
  ) {}

  loadWeightEntries$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(weightEntryActions.LOAD_WEIGHT_ENTRIES),
      switchMap(() => {
        return this.weightService.getWeightEntries()
          .pipe(
            map((weightEntries: WeightEntry[]) => (new weightEntryActions.LoadWeightEntriesSuccess(weightEntries))),
            catchError(error => of(new weightEntryActions.LoadWeightEntriesFail(error)))
          );
        }
      )
    )
  );

  insertWeightEntry$: Observable<Action> =  createEffect(() => this.actions$.pipe(
      ofType(weightEntryActions.INSERT_WEIGHT_ENTRIES),
      mergeMap((activity: weightEntryActions.InsertWeightEntries) => this.weightService.insertWeightEntry(activity.playload)
          .then( (ref: DocumentReference) => new weightEntryActions.InsertWeightEntriesSuccess(ref))
          .catch((error) => new weightEntryActions.InsertWeightEntriesFail(error))
      )
    )
  );

  updateWeightEntry$: Observable<Action> =  createEffect(() => this.actions$.pipe(
      ofType(weightEntryActions.UPDATE_WEIGHT_ENTRIES),
      mergeMap((activity: weightEntryActions.UpdateWeightEntries) => this.weightService.updateWeightEntry(activity.playload)
          .then( () => new weightEntryActions.UpdateWeightEntriesSuccess())
          .catch((error) => new weightEntryActions.UpdateWeightEntriesFail(error))
      )
    )
  );

  deleteWeightEntry$: Observable<Action> =  createEffect(() => this.actions$.pipe(
      ofType(weightEntryActions.DELETE_WEIGHT_ENTRIES),
      mergeMap((activity: weightEntryActions.DeleteWeightEntries) => this.weightService.deleteWeightEntry(activity.playload)
          .then( () => new weightEntryActions.DeleteWeightEntriesSuccess())
          .catch((error) => new weightEntryActions.DeleteWeightEntriesFail(error))
      )
    )
  );
}
