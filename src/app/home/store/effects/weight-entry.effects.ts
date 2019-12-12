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
            catchError(error => {
                console.log(error);
                return of(new weightEntryActions.LoadWeightEntriesFail(error));
            })
          );
        }
      )
    )
  );

  insertWeightEntry$: Observable<Action> =  createEffect(() => this.actions$.pipe(
      ofType(weightEntryActions.INSERT_WEIGHT_ENTRIES),
      mergeMap((activity: weightEntryActions.InsertWeightEntry) => this.weightService.insertWeightEntry(activity.playload)
          .then( (ref: DocumentReference) => new weightEntryActions.InsertWeightEntrySuccess(ref))
          .catch((error) => new weightEntryActions.InsertWeightEntryFail(error))
      )
    )
  );

  updateWeightEntry$: Observable<Action> =  createEffect(() => this.actions$.pipe(
      ofType(weightEntryActions.UPDATE_WEIGHT_ENTRIES),
      mergeMap((activity: weightEntryActions.UpdateWeightEntry) => this.weightService.updateWeightEntry(activity.playload)
          .then( () => new weightEntryActions.UpdateWeightEntrySuccess())
          .catch((error) => new weightEntryActions.UpdateWeightEntryFail(error))
      )
    )
  );

  deleteWeightEntry$: Observable<Action> =  createEffect(() => this.actions$.pipe(
      ofType(weightEntryActions.DELETE_WEIGHT_ENTRIES),
      mergeMap((activity: weightEntryActions.DeleteWeightEntry) => this.weightService.deleteWeightEntry(activity.playload)
          .then( () => new weightEntryActions.DeleteWeightEntrySuccess())
          .catch((error) => new weightEntryActions.DeleteWeightEntryFail(error))
      )
    )
  );
}
